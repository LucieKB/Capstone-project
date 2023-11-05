import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import StudentSignUpForm from "./SignUpForms/StudentSignUpForm";

function Home(){
    const {user, setUser} = useContext(UserContext)
    const [showStudentForm, setShowStudentForm] = useState(false)
    const [showButtonAddStudent, setShowButtonAddStudent] = useState(false)


    useEffect(() => {
       if (user.type === "Parent"){
        setShowButtonAddStudent(true)  
    }
    },[])
    console.log(user)
   console.log(user.id)
   console.log(user.type)

   const handleRegisterStudent = () =>{
    setShowStudentForm(true)
   }

    return(
        <div>
            <h1>Welcome {user.username}</h1>
            {showButtonAddStudent?
           (<button onClick = {handleRegisterStudent}>Register a Student</button>):(null)
        }
            
            {showStudentForm?
            (<StudentSignUpForm parentId={user.id} setShowStudentForm={setShowStudentForm} showStudentForm={showStudentForm}/>):
            (null)
            } 
            {/* replace null with Student Info once StudentCard is created */}

           
        </div>  
    )
}

export default Home