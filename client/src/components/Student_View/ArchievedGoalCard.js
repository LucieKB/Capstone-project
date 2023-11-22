import React from "react"

function ArchievedGoalCard({goals}){

    const goalsToDisplay = goals.map((goal)=>{
        return(
            <ul key={goal.id}>
                <li>Title : {goal.title}</li>
                <li>Description : {goal.description}</li>
                <li>Deadline : {goal.deadline}</li> 
            </ul> 
    )})
    
    return(
        <div>
            <h2>My Archieved Goals</h2>
            {goalsToDisplay}
        </div>
    )
}

export default ArchievedGoalCard