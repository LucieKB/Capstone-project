import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import StarConditional from "./StarConditional";

function GoalCard(){
    const {user, setUser} = useContext(UserContext)
    const {id} = useParams()
    const goal = user.goals.find(goal => goal.id === parseInt(id))
    const [showAchieved, setShowAchieved] = useState(false)
    const [errors, setErrors] = useState([]);
    const [achieved, setAchieved] = useState (goal.achieved)
    const [buttonColor, setButtonColor] = useState("")

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
        const modifiedgoal = 
        goal.id == updatedgoal.id?
            ( updatedgoal) : (goal)
    
        setUser({...user, goals: modifiedgoal})   
    }

    console.log(user.goals)

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
        }
    
        
        

    return(
        <div>
        <h2> {user.username}'s Goal #{goal.id}</h2>
        <em> Created on {goal.created_at}</em>
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
            {showAchieved?
                (<button 
                onClick={handleGoalAchieved}
                style = {{backgroundColor:buttonColor}}> Goal Achieved </button>) : (null)}
                    <button>Add Message</button>
        </div>

    )
}

export default GoalCard;