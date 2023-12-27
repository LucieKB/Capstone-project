import React, {useEffect, useState, useContext} from "react"
import {UserContext} from "../../contexts/UserContext";
import {useParams, Link} from "react-router-dom";

function MyStudentsEducator(){
    const [students, setStudents] = useState([])
    const {user, setUser} = useContext(UserContext)
    const gradeObj = useParams()
    const grade = Object.values(gradeObj)[0]

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
        return( 
            <ul>
                 <Link to = {`/parents/${user.id}/students/${s.id}`}>{s.username}</Link>
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