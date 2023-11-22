import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import MyStudentGoalCard from "./MyStudentGoalCard";
import MyStudentgoalCard from "./MyStudentGoalCard";
import MyStudent from "./MyStudent";
import { useNavigate } from "react-router-dom";



function MyStudentsGoals(){
    const {user, setUser} = useContext(UserContext)
    const [showGoals, setShowGoals] = useState(false)
    
    const navigate = useNavigate()
 
const userStudents = user.students



    const myStudents = userStudents.map((student)=>{
        return(
        <ul key={student.id}>
        <button onClick={()=>{navigate(`/students/${student.id}`)}}> {student.username} has {student.goals.length} goals.</button>
        </ul>
        )
    })

    //     return(
    //         <div key={student.id}>
    //         <MyStudent student={student}/>
    //         </div>
    //     )
    // })
    
console.log(myStudents)
//     const myStudents = Object.keys(userStudents).map((student, i)=>{
//         console.log(userStudents[student].goals)
//    return(
//     <div key={i}>
//         <li>
//             {userStudents[student].username}
//             <ul>
//                 <button onClick={()=>setShowGoals(!showGoals)}>{userStudents[student].username} has {userStudents[student].goals.length} goals.</button>
//                 {/* why doesn't it work after validation_by_parent? */}
                
//                 {showGoals?
//                 (userStudents[student].goals.map((goal) => {
//                     return(
//                 <div key = {goal.id}>
//                     <MyStudentGoalCard goal={goal}/>
//                 </div>)
//                 })
//                 ):("")
//                 }
//             </ul>
//         </li>
//     </div>
//     )})


    return(
        <div>
        <h1>🎯 My Students 🎯</h1>
        <div>
         {myStudents}   
        </div>
        </div>
    )
    
}

export default MyStudentsGoals