import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import StudentSignUpForm from "./SignUpForms/StudentSignUpForm";
import NewGoalForm from "./Goals/NewGoalForm";

function Home(){
    const {user, setUser} = useContext(UserContext)
    const [showStudentForm, setShowStudentForm] = useState(false)
    const [showGoalForm, setShowGoalForm] = useState(false)
    const [showButtonAddStudent, setShowButtonAddStudent] = useState(false)
    const [showLinkAddGoal, setShowLinkAddGoal] = useState(false)

    useEffect(() => {
    //    if (user.type === "Parent" && user.number_of_children > user.students.count){
        if (user.type === "Parent"){
        setShowButtonAddStudent(true)  
    }
    },[])

    useEffect(() => {
            if (user.type === "Student"){
            setShowLinkAddGoal(true)  
        }
        },[])


    console.log(user)
   console.log(user.id)
   console.log(user.type)
   console.log(user.number_of_children)
//    console.log(user.students.length)
   console.log(showButtonAddStudent)

   const handleRegisterStudent = () =>{
    setShowStudentForm(true)
   }

   const handleAddGoal = () =>{
    setShowGoalForm(true)
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

            {showLinkAddGoal?
           (<div>
            <Link to={"/goals/new"}> Create a New Goal </Link>
            </div>):(null)
            }

           
           
        </div>  
    )
}

export default Home