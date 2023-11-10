import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import MyStudentGoalCard from "./MyStudentGoalCard";



function MyStudentsGoals(){
    const {user, setUser} = useContext(UserContext)
    const [showGoals, setShowGoals] = useState(false)
 
const userStudents = user.students
console.log(user.students)
console.log(showGoals)
    const myStudents = Object.keys(userStudents).map((student, i)=>{
   return(
    <div key={i}>
        <li>
            {userStudents[student].username}
            <ul>
                <button onClick={()=>setShowGoals(!showGoals)}>{userStudents[student].username} has {userStudents[student].goals.length} goals.</button>
                {showGoals?
                (userStudents[student].goals.map((goal) => {
                    return(
                <div key = {goal.id}>
                    <MyStudentGoalCard goal={goal} student={goal.user}/>
                </div>)
                })
                ):("")
                }
            </ul>
        </li>
    </div>
    )})


    return(
        <div>
        <h1>🎯 My Student's Goals 🎯</h1>
        <div>
         {myStudents}   
        </div>
        </div>
    )
    
}

export default MyStudentsGoals