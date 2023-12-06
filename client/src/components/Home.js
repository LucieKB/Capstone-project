import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { GoalsContext } from "../contexts/GoalsContext";
import { Link, useNavigate } from "react-router-dom";
import StudentSignUpForm from "./SignUpForms/StudentSignUpForm";
import UpdateStudentEdId from "./Associations/UpdateStudentEdId";
import Student from "./Student_View/Student"
import Avatar from "./Avatars/Avatar"
import "./Home.css"
import MyStudentsGoals from "./Goals/MyStudentsGoals";


function Home(){
    const {user, setUser} = useContext(UserContext)
    const {goals, setGoals} = useContext(GoalsContext)
    const [showStudentForm, setShowStudentForm] = useState(false)
    const [showButtonAddStudent, setShowButtonAddStudent] = useState(false)
    const [showAddEducatorId, setShowAddEducatorId] = useState(false)
    const [showStudentHome, setShowStudentHome] = useState(false)
    const [showAvatarGenerator, setShowAvatarGenerator] = useState(false)
    const [showAdultDirections, setShowAdultDirections] = useState(true)
    const [myStudents, setMyStudents] = useState([])
    const [showBusinessDirections, setShowBusinessDirections] = useState(false)
   const navigate = useNavigate()
    


    useEffect(() => {
    
        if (user.type === "Parent" && user.number_of_children > user.students.length){
        setShowButtonAddStudent(true)
        }
        else if (user.type === "Parent") {
        setMyStudents(user.students)
        }
    },[])

    useEffect(() => {
        if (user.type === "BusinessOwner"){
        setShowBusinessDirections(true) 
        setShowAdultDirections(false) 
    }
    },[])

    useEffect(() => {
            if (user.type === "Student"){
            user.educator_id? (setShowAddEducatorId(false)) : (setShowAddEducatorId(true))
            setShowStudentHome(true) 
            setShowAdultDirections(false) 
        }
        },[])
    
    useEffect(() => {
        if (user.type === "Student"){
        user.avatar? (console.log("avatar is generated")) : (setShowAvatarGenerator(true))
        }
    },[])  

   const handleRegisterStudent = () =>{
    setShowStudentForm(true)
   }

//    const handleShowHome = () =>{
//     setShowStudentHome(!showStudentHome)
//    }

   const myKidsName = myStudents.map((student)=>{
    return(
        <th key={student.id}>{student.username}</th>
    )
   } )
   const myKidsAvatar = myStudents.map((student)=> {
    return(
        <td key= {student.id}><img src={student.avatar} height={"80px"}/></td>
    )
   })
 
    return(
        <div className="wrapper">
        <div className="inner-wrapper">
            <h1 style={{textAlign:"center"}}>Welcome to your XXX, {user.username}</h1>
            {showStudentHome?(
                <img src={user.avatar} height={"150px"}/>
            ):( null)}
            {showAdultDirections?(
                <>
                <div className= "description">
                    < MyStudentsGoals />
                </div>
                <br></br>
                </>
            ):(null)}
               
            
            
            {showButtonAddStudent?
           (<button onClick = {handleRegisterStudent}>Register a Child</button>):(null)
            }        
            {showStudentForm?
            (<StudentSignUpForm parentId={user.id} setShowStudentForm={setShowStudentForm} showStudentForm={showStudentForm}/>):
            (null)
            } 
            {showAddEducatorId?
           (<div>
            <UpdateStudentEdId student = {user} setShowAddEducatorId={setShowAddEducatorId}/>
            </div>):(null)
            }


            {showAdultDirections?
            (<div>
            <h2> XXX will help you and your child/student to:</h2>
                <div className = "title">
                    <h2><li>Set <Link to={"/smartGoals"}>S.M.A.R.T goals</Link>,</li></h2> 
                </div>
               
                <div className = "title">
                <h2><li> <Link to={"/setAGoal"}>Evaluate</Link> how challenging they are,</li></h2>
                </div>
                <div className = "title">
                <h2><li> <Link to={"/rewardsExplained"}>Reward your child/student</Link> once they achieve a goal.</li></h2>
                </div>
                
                <h2> As a parent you will also be able to post items to <Link to={"/marketPlaceExplained"}>the market place</Link>.</h2>
                </div>):(null)
            }
            {showStudentHome?
            (<div>
            <h2> XXX will help you to:</h2>
                <div className = "title">
                    <h2><li>Set <Link to={"/smartGoals"}> S.M.A.R.T goals</Link> for yourself,</li></h2> 
                </div>
               
                <div className = "title">
                <h2><li> <Link to={"/setAGoal"}> Evaluate</Link> how challenging they are,</li></h2>
                </div>
                <div className = "title">
                <h2><li> <Link to={"/rewardsExplained"}> Earn some stars </Link> every time you achieve a goal.</li></h2>
                </div>
                
                <h2> You will also be able to buy items on <Link to={"/marketPlaceExplained"}>the market place</Link> !</h2>
                </div>):(null)
            }
            {showBusinessDirections?
            (<div>
                <h1>Directions for Business</h1>
            </div>):(null)}
            
                

            {showStudentHome?
            (<button onClick={()=>navigate(`/students/${user.id}/me`)}> Go To My Goals Page </button>) : (null)}

            {showAvatarGenerator?
            (<Avatar />):(null)}


           
        </div> 
        </div>  
    )
}

export default Home