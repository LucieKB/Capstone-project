import React from "react"

function ExpiredGoalCard({goals}){

    const goalsToDisplay = goals.map((goal)=>{
        return(
            <ul key={goal.id}>
                <li>Title : {goal.title}</li>
                <p>Description : {goal.description}</p>
                <p>Expired on : {goal.deadline}</p> 
                <hr />
            </ul>
           
        )})
    
    return(
        <div style={{height:"100%"}}>
      
        <div className="goal-wrapper">
        <div className="archievedGoal-inner">
            <h2 style={{textAlign:"center", top:"0", fontSize:"24px"}}><u>* My Expired Goals *</u></h2>
            {goalsToDisplay}
        </div>
        </div>
        </div>
    )
}

export default ExpiredGoalCard