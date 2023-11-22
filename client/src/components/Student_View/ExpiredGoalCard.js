import React from "react"

function ExpiredGoalCard({goals}){

    const goalsToDisplay = goals.map((goal)=>{
        return(
            <ul key={goal.id}>
                <li>Title : {goal.title}</li>
                <li>Description : {goal.description}</li>
                <li>Expired on : {goal.deadline}</li> 
            </ul>
           
        )})
    
    return(
        <div>
            <h2>My Expired Goals</h2>
            {goalsToDisplay}
        </div>
    )
}

export default ExpiredGoalCard