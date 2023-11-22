import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";



function GoalList({goals}){
    const [validatedGoals, setValidatedGoals] = useState([])
    const [halfValidatedGoals, setHalfValidatedGoals] = useState([])
    const [notValidatedGoals, setNotValidatedGoals] = useState([])
    const {user, setUser} = useContext(UserContext)
    // const {goals, setGoals} = useContext(GoalsContext)
    const navigate = useNavigate()

    const myGoals = goals.filter((goal) => goal.user_id === user.id)
    console.log(myGoals)
    const myActiveGoals = myGoals.filter((goal) => goal.achieved_by_parent === false || goal.achieved_by_educator === false)
    
    
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

//    const handleBackHome = () => {
//     navigate("/")
//    }


    return(
        <div>
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