import React from "react"

function ExpiredGoalCard({goals}){

    const goalsToDisplay = goals.map((goal)=>{
        return(
            <ul key={goal.id}>
                <li><u>Title :</u> {goal.title}</li>
                <p><u>Description :</u> {goal.description}</p>
                <p><u>Expired on :</u> {goal.deadline}</p> 
                <hr />
            </ul>
           
        )})
    
    return(
        <div style={{height:"100%"}}>
      
        <div className="goal-wrapper5">
        <div className="archievedGoal-inner" style={{alignItems:"center", minHeight:"50rem"}}>
        <div className="archievedGoal-inner-inner" style={{margin:"20px"}}>
            <h2 style={{textAlign:"center", top:"0", fontSize:"24px"}}><u>* My Expired Goals *</u></h2>
            {goalsToDisplay}
        </div>
        </div>
        </div>
        </div>
    )
}

export default ExpiredGoalCard