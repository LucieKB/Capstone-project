import React from "react"

function ArchievedGoalCard({goals}){

    const goalsToDisplay = goals.map((goal)=>{
        return(
            <ul key={goal.id}>
                <li><u>Title :</u> {goal.title}</li>
                <p><u>Description :</u> {goal.description}</p>
                <p><u>Expired on :</u> {goal.deadline}</p> 
                <hr/>
            </ul> 
    )})
    
    return(
        <div style={{height:"100%"}}>
      
        <div className="goal-wrapper">
        <div className="archievedGoal-inner">
            <h2 style={{textAlign:"center", top:"0", fontSize:"24px"}}>* My Archieved Goals *</h2>
            {goalsToDisplay}
        </div>
        </div>
        </div>
    )
}

export default ArchievedGoalCard