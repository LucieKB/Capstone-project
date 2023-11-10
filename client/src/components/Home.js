import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import StudentSignUpForm from "./SignUpForms/StudentSignUpForm";
import UpdateStudentEdId from "./Associations/UpdateStudentEdId";

function Home(){
    const {user, setUser} = useContext(UserContext)
    const [showStudentForm, setShowStudentForm] = useState(false)
    const [showButtonAddStudent, setShowButtonAddStudent] = useState(false)
    const [showAddEducatorId, setShowAddEducatorId] = useState(false)

    useEffect(() => {
    //    if (user.type === "Parent" && user.number_of_children > user.students.count){
        if (user.type === "Parent"){
        setShowButtonAddStudent(true)  
    }
    },[])

    useEffect(() => {
            if (user.type === "Student"){
            user.educator_id? (setShowAddEducatorId(false)) : (setShowAddEducatorId(true))
              
        }
        },[])


   console.log(user)
   console.log(user.id)
   console.log(user.type)
   console.log(user.number_of_children)

   console.log(showButtonAddStudent)

   const handleRegisterStudent = () =>{
    setShowStudentForm(true)
   }

   

    return(
        <div>
            <h1>Welcome {user.username}</h1>
            {showButtonAddStudent?
           (<button onClick = {handleRegisterStudent}>Register a Child</button>):(null)
            }
        
            
            {showStudentForm?
            (<StudentSignUpForm parentId={user.id} setShowStudentForm={setShowStudentForm} showStudentForm={showStudentForm}/>):
            (null)
            } 
            {/* replace null with Student Info once StudentCard is created */}

            {showAddEducatorId?
           (<div>
            <UpdateStudentEdId student = {user} setShowAddEducatorId={setShowAddEducatorId}/>
            </div>):(null)
            }

           
           
        </div>  
    )
}

export default Home