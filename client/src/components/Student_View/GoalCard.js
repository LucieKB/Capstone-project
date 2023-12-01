import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";
import { useNavigate } from "react-router-dom";
import StarConditional from "../Goals/StarConditional";
import NewMessageForm from "../Messages/NewMessageForm";

function GoalCard(){
    const {user, setUser} = useContext(UserContext)
    const {id} = useParams()
    const {goals, setGoals} = useContext(GoalsContext)
    const [showAchieved, setShowAchieved] = useState(false)
    const [errors, setErrors] = useState([]);
    const [buttonColor, setButtonColor] = useState("")
    const [showMessageForm, setShowMessageForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
   
    const navigate = useNavigate()

    if(!goals){
        setIsLoading(!isLoading)
    }

    const goal = goals.find(goal => goal.id === parseInt(id))
    const [achieved, setAchieved] = useState (goal.achieved)
    // useEffect(()=>{
    //     const goal = goals.find(goal => goal.id === parseInt(id))
    // }, [goals])

    useEffect(()=>{
        if (goal.validated_by_educator == true && goal.validated_by_parent == true){
            setShowAchieved(true)
        }
    }, [])

    useEffect(()=>{
        if (achieved == true){
            setButtonColor("green")
        }
    }, [goal.achieved])

    const onUpdategoal = (updatedgoal) =>{
        const modifiedgoal = user.goals.map((goal)=>{
            if(goal.id === updatedgoal.id){
                return updatedgoal
            }else{
                return goal
            }
            })
        setGoals(modifiedgoal)
        setUser({...user, goals: modifiedgoal})   
    }

    

    function handleGoalAchieved(){
        fetch(`${goal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                achieved: true
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedgoal) => (onUpdategoal(updatedgoal)));
            } else {
                r.json().then((err)=>setErrors(err.errors))  
            }
            
        });
        navigate(`/students/${user.id}/me`)
        }
    
    const handleShowMessageForm = () =>{
        setShowMessageForm(!showMessageForm)
     }  
     
    const addMessageToGoal = (goalWithMessage) =>{
        const modifiedGoals = goals.map((goal)=>{
            if (goal.id === goalWithMessage.id) {
                return goalWithMessage;
            } else {
                return goal
            }
        })
        const updatedGoals = {...goals, goalWithMessage};
        setGoals(updatedGoals);
        navigate(`/students/${user.id}/me`)
        }

        const handleBackHome = () => {
            navigate(`/students/${user.id}/goals`)
           }

    return(
        <div>
        <h2> {user.username}'s Goal #{goal.id}</h2>
        <button onClick={handleBackHome}> 🔙 </button>
        <em> Created on {goal.created_at.split('T')[0]}</em>
        <li>Title : {goal.title}</li>
        <li>Description : {goal.description}</li>
        <li>Deadline : {goal.deadline}</li>
        <li>Category : {goal.goal_category}</li>
        <li>Value : 
        <span>
                {Array(5)
                .fill()
                .map((_, index) => (
                <StarConditional 
                key={index} 
                filled={index < goal.value}
                goal = {goal} />
                ))}
            </span>
        </li>
        {/* <li>Messages : <em>{goal.messages}</em></li> */}
        
            {showAchieved?
                (<button 
                onClick={handleGoalAchieved}
                style = {{backgroundColor:buttonColor}}> Goal Achieved </button>) : (null)}

                <button onClick={handleShowMessageForm}>Add Message</button>
                {showMessageForm?
                (<div>
                    <NewMessageForm goal={goal} onAddNewMessage={addMessageToGoal}/>
                </div>): (<button>Read my messages</button>)}
        </div>

    )
}

export default GoalCard;