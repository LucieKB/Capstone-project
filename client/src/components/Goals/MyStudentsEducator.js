import React, {useEffect, useState, useContext} from "react"
import {UserContext} from "../../contexts/UserContext";
import {useParams, Link} from "react-router-dom";

function MyStudentsEducator(){
    const [students, setStudents] = useState([])
    const {user, setUser} = useContext(UserContext)
    const gradeObj = useParams()
    const grade = Object.values(gradeObj)

    console.log(grade)


    useEffect(()=>{
        const controller = new AbortController();
        fetch(`/educators/mystudents/${grade}`)
        .then(r => r.json())
        .then(students => setStudents(students))
        return()=>{
            controller.abort();
        }
      }, [grade])

      console.log("students in Educator=", students)

    const filteredStudentLinks = students.map((s)=>{
        return( 
            <ul>
                 <Link to = {`/parents/${user.id}/students/${s.id}`}>{s.username}</Link>
            </ul>       
           )})
    

      return(
        <div>
            <h1> My {grade} Grade Students </h1>
            <div>
                {filteredStudentLinks}
            </div>
        </div>
      )
}

export default MyStudentsEducator