import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
// import { GoalsContext } from "../contexts/GoalsContext";
import { Link } from "react-router-dom";
import StudentSignUpForm from "./SignUpForms/StudentSignUpForm";
import UpdateStudentEdId from "./Associations/UpdateStudentEdId";
import Student from "./Student_View/Student"

function Home(){
    const {user, setUser} = useContext(UserContext)
    // const {goals, setGoals} = useContext(GoalsContext)
    const [goals, setGoals] = useState([])
    const [showStudentForm, setShowStudentForm] = useState(false)
    const [showButtonAddStudent, setShowButtonAddStudent] = useState(false)
    const [showAddEducatorId, setShowAddEducatorId] = useState(false)
    const [showStudentHome, setShowStudentHome] = useState(false)


    useEffect(() => {
    //    if (user.type === "Parent" && user.number_of_children > user.students.length){
        if (user.type === "Parent"){
        setShowButtonAddStudent(true) 
    }
    },[])

    useEffect(() => {
            if (user.type === "Student"){
            user.educator_id? (setShowAddEducatorId(false)) : (setShowAddEducatorId(true))
            setShowStudentHome(true)  
        }
        },[])

        useEffect(()=>{
            fetch (`/goals`).then((r)=> {
                if (r.ok) {
                  r.json().then((goals)=>{
                    setGoals(goals)})
                }
              });
            }, []);

   const handleRegisterStudent = () =>{
    setShowStudentForm(true)
   }

   const handleShowHome = () =>{
    setShowStudentHome(!showStudentHome)
   }

   

    return(
        <div>
            <h1>Welcome {user.username}</h1>
            {showButtonAddStudent?
           (<button onClick = {handleRegisterStudent}>Register a Child</button>):(null)
            }

            {/* {showStudentHome?
            (<button onClick={(handleShowHome)}>I'm ready to reach my goals !</button>):(null)
            }    */}
        
            
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

            {showStudentHome?
            (<Student goals = {goals}/>) : (null)}

           
           
        </div>  
    )
}

export default Home