import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";

function MyStudentsGoals(){
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
    const [myKids, setMyKids] = useState([])
 
// const myKids = user.students

useEffect(() => {
    
    if (user.type === "Parent" || user.type === "Educator") {
    setMyKids(user.students)
    }
},[user.students])

    const myStudents = myKids.map((student)=>{
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

        console.log("myActiveStudentGoals=",myStudentActiveGoals)
        return(
        <td key={student.id}>
            <img key= {student.id} src={student.avatar} height={"80px"}/>
            <h3>{student.username} has {student.wallet} 🌟</h3>
        <button style={{margin:"30px", marginLeft:"auto", marginRight:"auto"}}onClick={()=>{navigate(`/parents/${user.id}/students/${student.id}`)}}> {student.username} has {myStudentActiveGoals.length} goals.</button>
        </td>
        )
    })

    //     return(
    //         <div key={student.id}>
    //         <MyStudent student={student}/>
    //         </div>
    //     )
    // })
    
//     const myStudents = Object.keys(myKids).map((student, i)=>{
//         console.log(myKids[student].goals)
//    return(
//     <div key={i}>
//         <li>
//             {myKids[student].username}
//             <ul>
//                 <button onClick={()=>setShowGoals(!showGoals)}>{myKids[student].username} has {myKids[student].goals.length} goals.</button>
//                 {/* why doesn't it work after validation_by_parent? */}
                
//                 {showGoals?
//                 (myKids[student].goals.map((goal) => {
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

    const myKidsName = myKids.map((student)=>{
    return(
        <th key={student.id}>{student.username}</th>
    )
   } )
//    const myKidsAvatar = myKids.map((student)=> {
//     return(
//         <td><img key= {student.id} src={student.avatar} height={"80px"}/></td>
//     )
//    })



    return(
        <div>
        <h1>🎯 My Students 🎯</h1>
        <div>
        <div className= "description">
                    <h2 style={{textAlign:"center"}}><u>My Kids:</u></h2>
                    <table>
                        <tr>
                            {myKidsName}
                        </tr>
                        <tr>
                            {myStudents}  
                        </tr>
                    </table>
                </div>
           
        </div>
        </div>
    )
    
}

export default MyStudentsGoals