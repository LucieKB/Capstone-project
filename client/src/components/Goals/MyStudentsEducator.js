import React, {useEffect, useState, useContext} from "react"
import {UserContext} from "../../contexts/UserContext";
import {useParams, Link} from "react-router-dom";
import dateFormat from "dateformat";

function MyStudentsEducator(){
    const [students, setStudents] = useState([])
    const {user, setUser} = useContext(UserContext)
    const gradeObj = useParams()
    const grade = Object.values(gradeObj)[0]
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")

    useEffect(()=>{
       
        fetch(`/educators/mystudents/${grade}`)
        .then(r => r.json())
        .then(students => setStudents(students))
      
      }, [grade])

    function suffix(){
        
        
        if (grade === "2"){
            return ("nd")}
            else if(grade === "3"){
            return  ("rd")}
        else if(grade === "1"){
            return ("st")
        }
            else{
            return ("th")
            }
           
            }


    const filteredStudentLinks = students.map((s)=>{
        const myStudentsGoals = s.goals
        const myStudentsActiveGoals = myStudentsGoals.filter((goal)=>{
            const deadline = dateFormat(goal.deadline, "isoDateTime")
                    return(goal.achieved === false && deadline>today)
                })
                const validationNeeded = myStudentsActiveGoals.filter((g)=>g.validated_by_educator === false)
                const paymentNeeded = myStudentsGoals.filter((g)=>g.achieved_by_educator === false && g.achieved === true)
                
                
                function actionNeeded(){
                if (validationNeeded.length>0 && paymentNeeded.length === 0){
                    return("✅")
                }
                else if (paymentNeeded.length>0 && validationNeeded.length === 0){
                    return("💰")
                }
                else if (validationNeeded.length>0 && paymentNeeded.length>0){
                    return(["✅", "💰"])
                }
                else{return("")}
                }
        
        return( 
            <ul>
                 <Link to = {`/parents/${user.id}/students/${s.id}`} style={{fontSize:"20px"}}>{s.username} {actionNeeded()}</Link>
            </ul>       
           )})
     

      return(
        <div>
            <h1> My {grade}{suffix()} Grade Students </h1>
            <div>
                {filteredStudentLinks}
            </div>
        </div>
      )
}

export default MyStudentsEducator