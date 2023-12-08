import React from "react"
import { Link } from "react-router-dom"

function UnpaidGoals({goals}){

    const goalsToDisplay = goals.map((goal)=>{
        return(
            <ul key={goal.id}>
            <Link to={`/goals/${goal.id}`}>
            <p>Title: {goal.title}</p></Link>
                <li>Description : {goal.description}</li>
                <li>Value : {goal.value} ⭐️</li> 
            </ul>
           
        )})
    
    return(
        <div>
            <h2>My Goals Awaiting Payment</h2>
            {goalsToDisplay}
        </div>
        
    )
}

export default UnpaidGoals