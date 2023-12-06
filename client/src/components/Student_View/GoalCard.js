import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";
import { useNavigate } from "react-router-dom";
import StarConditional from "../Goals/StarConditional";
import NewMessageForm from "../Messages/NewMessageForm";

function GoalCard({onUpdateGoal, messages, setMessages}){
    const {user, setUser} = useContext(UserContext)
    const {id} = useParams()
    const {goals, setGoals} = useContext(GoalsContext)
    const [showAchieved, setShowAchieved] = useState(false)
    const [errors, setErrors] = useState([]);
    const [buttonColor, setButtonColor] = useState("")
    const [showMessageForm, setShowMessageForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const goal = goals.find(goal => goal.id === parseInt(id))
    console.log(goal)
    const [achieved, setAchieved] = useState (false)
    const [goalMessages, setGoalMessages] = useState(goal.messages)
    const navigate = useNavigate()

    if(!goals){
        setIsLoading(!isLoading)
    }

    
   
    useEffect(()=>{
        const thisGoalMessages = messages.filter((m)=> m.goal_id === goal.id)
        console.log("thisGoalMessages=",thisGoalMessages)
        setGoalMessages(thisGoalMessages)
    }, [messages])

    useEffect(()=>{
        if (goal.validated_by_educator === true && goal.validated_by_parent == true){
            setShowAchieved(true)
        }
    }, [])

    useEffect(()=>{
        if (achieved === true){
            setButtonColor("green")
        }
    }, [achieved])

    // const onUpdategoal = (updatedgoal) =>{
    //     const modifiedgoal = user.goals.map((goal)=>{
    //         if(goal.id === updatedgoal.id){
    //             return updatedgoal
    //         }else{
    //             return goal
    //         }
    //         })
    //     setGoals(modifiedgoal)
    //     setUser({...user, goals: modifiedgoal})   
    // }

    

    function handleGoalAchieved(){
        fetch(`/goals/${goal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                achieved: true
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedgoal) => (onUpdateGoal(updatedgoal)));
            } else {
                r.json().then((err)=>setErrors(err.errors))  
            }
            
        });
        navigate(`/students/${user.id}/me`)
        }
    
    const handleShowMessageForm = () =>{
        setShowMessageForm(!showMessageForm)
     } 
     
    //  useEffect(()=>{
    //     const myGoalMessages = goalMessages.map((m)=> {
    //         console.log("message.content=",m.content)
    //             return(<div key={m.id}>
    //                          ➢{m.content} from <em>{m.sender} </em>
    //                     </div>)  
    //     }) 
    //     console.log("myGoalMessages=",myGoalMessages)
    //     setGoalMessages(myGoalMessages)   
    // }, [])

   
        const myGoalMessages = goalMessages.map((m)=> {
            return(<div key={m.id}>
           ➢{m.content} from <em>{m.sender} </em>
       </div>)
        }) 
       
     
     const handleAddMessage = (newMessage) =>{
        setMessages([...messages, newMessage]) 
        setGoalMessages([...goalMessages, newMessage])
        }

        const handleBackHome = () => {
            navigate(`/students/${user.id}/goals`)
           }

        // const receivedMessages = goal.messages.filter((m)=> m.recipient === user.username)
        // const sentMessages = goal.messages.filter((m)=> m.user_id === user.id)

       

        // const goalMessages = goal.messages.map((m)=> 
        // <div key={m.id}>
        //     ➢{m.content} from <em>{m.sender} </em>
        // </div>)
        

        
       

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
        <li>Messages : {myGoalMessages}</li>
        
            {showAchieved?
                (<button 
                onClick={handleGoalAchieved}
                style = {{backgroundColor:buttonColor}}> Goal Achieved </button>) : (null)}

                <button onClick={handleShowMessageForm}>Add Message</button>
                {showMessageForm?
                (<div>
                    <NewMessageForm goal={goal} onAddNewMessage={handleAddMessage}/>
                </div>): (null)}
        </div>

    )
}

export default GoalCard;