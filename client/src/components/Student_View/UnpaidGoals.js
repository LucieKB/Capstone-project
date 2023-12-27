import React from "react"
import { Link } from "react-router-dom"

function UnpaidGoals({goals}){

    const goalsToDisplay = goals.map((goal)=>{
        return(
            <ul key={goal.id}>
            <Link to={`/goals/${goal.id}`}>
            <p><u>Title:</u> {goal.title}</p></Link>
                <p><u>Description :</u> {goal.description}</p>
                <p><u>Value :</u> {goal.value} ⭐️</p> 
                <hr />
            </ul>
           
        )})
    
    return(
        <div style={{height:"100%"}}>
      
        <div className="goal-wrapper">
        <div className="archievedGoal-inner">
            <h2 style={{textAlign:"center", top:"0", fontSize:"24px"}}><u>* My Goals Awaiting Payment *</u></h2>
            {goalsToDisplay}
        </div>
        </div>
        </div>
        
    )
}

export default UnpaidGoals