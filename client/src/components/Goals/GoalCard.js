import React, {useState, useContext} from "react";
import {useParams} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import StarConditional from "./StarConditional";

function GoalCard(){
    const {user, setUser} = useContext(UserContext)
    const {id} = useParams()
    const goal = user.goals.find(goal => goal.id === parseInt(id))

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

        </div>

    )
}

export default GoalCard;