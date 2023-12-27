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
    },[ ,myStudents])


    useEffect(() => {
        if (user.type === "BusinessOwner"){
        setGoals([])
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

   const handleStudentSignUp = (data) => {
    setUser({...user, students : [...user.students, data]})}

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


   const handleCreateAvatar = () =>{
    navigate("/students/avatar")
    setShowAvatarGenerator(!showAvatarGenerator)
   }
   console.log(showAddEducatorId)
   console.log(user.educator_id)
 
    return(
        <div className="wrapper">
        <div className="inner-wrapper">
            <div className = "upper-section" style={{display:"block", width:"35 rem"}}>
            <h1 style={{textAlign:"center"}}>Welcome, {user.username}</h1>
            </div> 
            {showAvatarGenerator?
            (<button className="submitBtn" onClick={handleCreateAvatar}>Create My Avatar</button>):(null)}
            {showStudentHome?(
                <div className="avatar-ctn">
                <img className="avatar-img" src={user.avatar} height={"150px"} maxWidth={"200px"}/>
                </div>
            ):( null)}
            {showAdultDirections?(
                <>
                <div className = "leftside-section" style={{display:"block", width:"35 rem"}}>
                    <div className = "leftside-container">
                <div className= "description">
                    <div>
                        <div>
                            <ul className="Goal-container">
                    < MyStudentsGoals />
                    </ul>
                    </div>
                </div>
                </div>
                </div>
                </div>
                <br></br>
                </>
            ):(null)}
               
            
            
            {showButtonAddStudent?
           (<button className="submitBtn" onClick = {handleRegisterStudent}>Register a Child</button>):(null)
            }        
            {showStudentForm?
            (<StudentSignUpForm onStudentSignUp = {handleStudentSignUp} setShowStudentForm={setShowStudentForm} showStudentForm={showStudentForm}/>):
            (null)
            } 
            


            {showAdultDirections?
            (<div className = "bottom-section" style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
            <div className = "bottom-container">
        <div className= "description">
            <div style={{marginBottom: "24px"}}>
                
                    <ul className="Bottom-container">
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
                </ul>
                    </div>
                </div>
                </div>
                
                </div>):(null)
            }
            {showStudentHome?
            (
            <div className = "bottom-container" style={{maxWidth:"80%"}}>
        <div className= "description">
            <div style={{marginBottom: "24px"}}>
                <div>
                    <ul className="Bottom-container">
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
                </ul>
                    </div>
                </div>
                </div>
                
                </div>):(null)
            }
            {showBusinessDirections?
            (<div>
                <h1>Directions for Business</h1>
            </div>):(null)}
            
                

            {showStudentHome?
            (<button className="submitBtn" onClick={()=>navigate(`/students/${user.id}/me`)}> Go To My Goals Page </button>) : (null)}

           

            {showAddEducatorId?
           (<div className="Bottom-container" style={{textAlign:"center"}}>
            <UpdateStudentEdId student = {user} setShowAddEducatorId={setShowAddEducatorId}/>
            </div>):(null)
            }

           
        </div> 
        </div>  
    )
}

export default Home