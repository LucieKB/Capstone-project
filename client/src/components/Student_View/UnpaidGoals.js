import React from "react"

function UnpaidGoals({goals}){

    const goalsToDisplay = goals.map((goal)=>{
        return(
            <ul key={goal.id}>
                <li>Title : {goal.title}</li>
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