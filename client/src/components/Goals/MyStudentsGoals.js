import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";

function MyStudentsGoals(){
    const {user, setUser} = useContext(UserContext)
    const [showGoals, setShowGoals] = useState(false)
    const navigate = useNavigate()
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
 
const userStudents = user.students

    const myStudents = userStudents.map((student)=>{
        const myStudentGoals = student.goals
        console.log(myStudentGoals)
        const myStudentActiveGoals = myStudentGoals.filter((goal)=>{
            const deadline = dateFormat(goal.deadline, "isoDateTime")
            if(user.type === "Parent"){
                return goal.achieved_by_parent === false && deadline>today
            }
            else if(user.type === "Educator"){
                return goal.achieved_by_educator === false && deadline>today
            }
        
    })

        console.log(myStudentActiveGoals)
        return(
        <ul key={student.id}>
        <button onClick={()=>{navigate(`/students/${student.id}`)}}> {student.username} has {myStudentActiveGoals.length} goals.</button>
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