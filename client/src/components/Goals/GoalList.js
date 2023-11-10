import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

function GoalList(){
    const {user, setUser} = useContext(UserContext)
    const [validatedGoals, setValidatedGoals] = useState([])
    const [halfValidatedGoals, setHalfValidatedGoals] = useState([])
    const [notValidatedGoals, setNotValidatedGoals] = useState([])
    
    const studentGoals = user.goals

    useEffect(() => {
        studentGoals.map((g)=> {
            if (g.validated_by_parent === false && g.validated_by_educator === false){
                setNotValidatedGoals([...notValidatedGoals, g])
            }
            else if (g.validated_by_parent === false && g.validated_by_educator === true || g.validated_by_parent === true && g.validated_by_educator === false){
                setHalfValidatedGoals([...halfValidatedGoals, g])
            }
            else if (g.validated_by_parent === true && g.validated_by_educator === true){
                setValidatedGoals([...validatedGoals, g])
            }
        })
    }, [])

    console.log(studentGoals)
    console.log(notValidatedGoals)

    return(
        <div>
            <h1>List of My Goals</h1>
            <div>
            <Link to={"/goals/new"}> Create a New Goal </Link>
            </div>
            <div>
                <ul>
                    <div>
                        <h3><u>My Validated Goals</u></h3>
                        {validatedGoals.map((g)=> 
                        <div key={g.id}>
                        <Link to={`/goals/${g.id}`}>
                            <p>{g.deadline}</p>
                            <p>{g.title}</p>
                            <p>{g.value}</p>
                        </Link>
                    </div>)}
                    </div>

                    <div>
                        <h3><u>Goals Awaiting Validation</u></h3>
                        <li> From one adult :
                        {halfValidatedGoals.map((g)=> 
                        <div key={g.id}>
                            <Link to={`/goals/${g.id}`}>
                                <p>{g.title}</p>
                                <p>{g.value}</p>
                                <p>{g.deadline}</p>
                            </Link>
                        </div>)}
                        </li>
                        <li> From both adults :
                        {notValidatedGoals.map((g)=> 
                        <span key={g.id}>
                        <Link to={`/goals/${g.id}`}>
                            {g.title} 
                        </Link>
                         : {g.value} stars / {g.deadline}
                    </span>)}
                        </li>
                    </div>

                </ul>
            </div>
        </div>
    )
}

export default GoalList;