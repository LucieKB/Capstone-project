import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";
import dateFormat from "dateformat";



function GoalList({goals}){
    const [validatedGoals, setValidatedGoals] = useState([])
    const [halfValidatedGoals, setHalfValidatedGoals] = useState([])
    const [notValidatedGoals, setNotValidatedGoals] = useState([])
    const {user, setUser} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    // const {goals, setGoals} = useContext(GoalsContext)
    const navigate = useNavigate()

    const myGoals = goals
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
    console.log("goals in GoalList=",goals)
    console.log("myGoals in GoalList=",myGoals)
    // const myActiveGoals = myGoals.filter((goal) => goal.achieved_by_parent === false || goal.achieved_by_educator === false)
    const myActiveGoals = goals.filter((goal)=>{
        const deadline = dateFormat(goal.deadline, "isoDateTime")
        return(goal.achieved === false && deadline>today)
    })
    // const [showGoalsValidated, setShowGoalsValidated] = useState(true)
    // const [showGoalsOneValidation, setShowGoalsOneValidation] = useState(true)
    // const [showGoalsZeroValidation, setShowGoalsZeroValidation] = useState(true)

    
    
            const zeroValidation = [];
            const oneValidation = [];
            const twoValidations = [];
        myActiveGoals.map((g)=> {
            
            if (g.validated_by_parent === false && g.validated_by_educator === false){
                zeroValidation.push(g)
                console.log("zeroValidations=", zeroValidation)
            }
            else if ((g.validated_by_parent === false && g.validated_by_educator === true) || (g.validated_by_parent === true && g.validated_by_educator === false)){
                oneValidation.push(g)
            }
            else if (g.validated_by_parent === true && g.validated_by_educator === true){
               twoValidations.push(g)
            }   
        })  
   

    // useEffect(()=>{
    //     if (validatedGoals.length === 0){
    //         setShowGoalsValidated(false)
    //     }
    //     if(halfValidatedGoals.length === 0){
    //         setShowGoalsOneValidation(false)
    //     }
    //     if(notValidatedGoals.length === 0){
    //         setShowGoalsZeroValidation(false)
    //     }
    // }, [])

    const handleBackHome = () => {
        navigate(`/students/${user.id}/me`)
       }

       if(!goals){
        return(
            <div>
                Loading...
            </div>
        )
    }
    
    


    return(
<div style={{height:"100%"}}>
      
        <div className="goal-wrapper">
           
            <div className="activeGoal-inner">
                <div>
            <h1 style={{textAlign:"center"}}>List of My Goals</h1>
            {user.educator_id?(null):(
                <div style={{color:"red", textAlign:"center"}}>
                    <em>Don't forget to add your educator's I.d in "Home".</em>
                    </div>)
}
            <br></br>
            
            </div>
           
            
                <div style={{width:"90%"}}>
                    <div className="GoalListinner-left">
                            <h2 style={{ textAlign:"center", top:"0", fontSize:"24px"}}><u>* My Validated Goals *</u></h2>
                            <br/>
                            {twoValidations.map((g)=> 
                            <div key={g.id}>
                            <Link to={`/goals/${g.id}`}>
                                    <p> -  {g.title}</p></Link>
                                    <span>Value: {g.value} ⭐️ / </span>
                                    <span>Deadline : {g.deadline}</span>
                            </div>)}
                        
                    </div>

                    <div className="GoalListinner-right">
                        <h2 style={{textAlign:"center", top:"0", fontSize:"24px"}}><u>* Goals Awaiting Validation *</u></h2>
                        <br />
                        <ul><h4> ☝️ <u>From one adult :</u></h4>
                        {oneValidation.map((g)=> 
                        <div key={g.id}>
                            <Link to={`/goals/${g.id}`}>
                                <p>-  {g.title}</p></Link>
                                <span>Value: {g.value} ⭐️ / </span>
                                <span>Deadline : {g.deadline}</span>
                            
                        </div>)}
                        </ul>
                        <ul><h4> ✌️ <u>From both adults :</u></h4>
                        {zeroValidation.map((g)=> 
                        <div key={g.id}>
                        <Link to={`/goals/${g.id}`}>
                            <p>Title: {g.title}</p></Link>
                            <span>Value: {g.value} ⭐️ / </span>
                            <span>Deadline : {g.deadline}</span>
                        
                    </div>)}
                        </ul>
                    </div>
                </div>
              </div>  
            </div>
            </div>
        
    )
}

export default GoalList;