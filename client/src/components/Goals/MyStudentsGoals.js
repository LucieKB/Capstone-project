import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import "./MyStudentsGoals.css"

function MyStudentsGoals(){
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
    const [myKids, setMyKids] = useState([])
    const [showParentView, setShowParentView] = useState(false)
 
// const myKids = user.students

useEffect(() => {
    if (user.type === "Parent") {
    setMyKids(user.students)
    setShowParentView(true)
    }
},[user.students])

useEffect(() => {
    if (user.type === "Educator") {
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
            <h3>🌟 {student.wallet} 🌟</h3>
        <button className="tableBtn" style={{margin:"30px", marginLeft:"auto", marginRight:"auto"}}onClick={()=>{navigate(`/parents/${user.id}/students/${student.id}`)}}> {student.username} has {myStudentActiveGoals.length} goals.</button>
        </td>
        )
    })

    const myKidsName = myKids.map((student)=>{
    return(
        <th key={student.id}>{student.username}</th>
    )
   } )
   





    return(
        <div>
        
        <div>

            
            {showParentView?
            (  <div> 
            {/* <h1>🎯 My Students 🎯</h1> */}
                <div className= "description">
                <h2 style={{textAlign:"center"}}><u>🎯 My Kids 🎯</u></h2>
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
    
            ):(
        <h2>Educator Explanations</h2>
            )}
        
           
        </div>
        </div>
    )
    
}

export default MyStudentsGoals