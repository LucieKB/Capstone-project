import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";
import dateFormat from "dateformat";



function GoalList(){
    const [validatedGoals, setValidatedGoals] = useState([])
    const [halfValidatedGoals, setHalfValidatedGoals] = useState([])
    const [notValidatedGoals, setNotValidatedGoals] = useState([])
    const {user, setUser} = useContext(UserContext)
    const {goals, setGoals} = useContext(GoalsContext)
    const navigate = useNavigate()
console.log(goals)
    const myGoals = goals.filter((goal) => goal.user_id === user.id)
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
    console.log(myGoals)
    // const myActiveGoals = myGoals.filter((goal) => goal.achieved_by_parent === false || goal.achieved_by_educator === false)
    const myActiveGoals = goals.filter((goal)=>{
        const deadline = dateFormat(goal.deadline, "isoDateTime")
        return(goal.achieved === false && deadline>today)
    })
    
    useEffect(() => {
            const zeroValidation = [];
            const oneValidation = [];
            const twoValidations = [];
        myActiveGoals.map((g)=> {
            
            if (g.validated_by_parent === false && g.validated_by_educator === false){
                zeroValidation.push(g)
            }
            else if ((g.validated_by_parent === false && g.validated_by_educator === true) || (g.validated_by_parent === true && g.validated_by_educator === false)){
                oneValidation.push(g)
            }
            else if (g.validated_by_parent === true && g.validated_by_educator === true){
               twoValidations.push(g)
            }   
        })  
        setNotValidatedGoals(zeroValidation) 
        setHalfValidatedGoals(oneValidation) 
        setValidatedGoals(twoValidations)
    }, [])

    const handleBackHome = () => {
        navigate(`/students/${user.id}/me`)
       }


    return(
        <div>
            <button onClick={handleBackHome}> 🔙 </button>
            <h2>List of My Goals</h2>
            {/* <button onClick={handleBackHome}> 🔙 </button> */}
            <div>
                
                    <div>
                            <h3><u>My Validated Goals</u></h3>
                            {validatedGoals.map((g)=> 
                            <div key={g.id}>
                            <Link to={`/goals/${g.id}`}>
                                    <p>Title: {g.title}</p></Link>
                                    <span>Value: {g.value} ⭐️ / </span>
                                    <span>Deadline : {g.deadline}</span>
                            </div>)}
                        
                    </div>

                    <div>
                        <h3><u>Goals Awaiting Validation</u></h3>
                        <ul><h4> ☝️ <u>From one adult :</u></h4>
                        {halfValidatedGoals.map((g)=> 
                        <div key={g.id}>
                            <Link to={`/goals/${g.id}`}>
                                <p>Title: {g.title}</p></Link>
                                <span>Value: {g.value} ⭐️ / </span>
                                <span>Deadline : {g.deadline}</span>
                            
                        </div>)}
                        </ul>
                        <ul><h4> ✌️ <u>From both adults :</u></h4>
                        {notValidatedGoals.map((g)=> 
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
    )
}

export default GoalList;