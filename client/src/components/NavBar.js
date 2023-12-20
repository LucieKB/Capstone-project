import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../contexts/UserContext";
import { GoalsContext } from "../contexts/GoalsContext";
import { Link, useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import "./NavBar.css"


function NavBar(){
    const {user, setUser} = useContext(UserContext)
    const {goals, setGoals} = useContext(GoalsContext)
    const [showStudentNav, setShowStudentNav] = useState(false)
    const [showParentNav, setShowParentNav] = useState(false)
    const [showEducatorNav, setShowEducatorNav] = useState(false)
    const [showBusinessNav, setShowBusinessNav] = useState(false)
    
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
    const elementaryGrades = ["1st","2nd","3rd","4th","5th"]
    const secondaryGrades = ["6th","7th","8th","9th","10th","11th","12th"]
    const [showSecondary, setShowSecondary] = useState(false)
    const navigate=useNavigate()

  console.log (user.type)
  

    useEffect(()=>{
        if (user.type === "Student"){
            setShowStudentNav(true)
        }
    }, [])

    useEffect(()=>{
        if (user.type === "Parent"){
            setShowParentNav(true)
            
        }
    }, [])

    useEffect(()=>{
        if (user.type === "Educator"){
            setShowEducatorNav(true)
        }
    }, [])

    useEffect(()=>{
        if (user.type === "BusinessOwner"){
            setShowBusinessNav(true)
        }
    }, [])

    if(!user){
        return(
            <div>
                Loading...
            </div>
        )
    }

    const myStudents = user.students
    console.log("user.students=", myStudents)
    if (!myStudents){
        console.log("noStudents")
        const myKidsLink = []
        console.log(myKidsLink)
    } 
    else{
    
            
                const myKidsLink = user.students.map((kid)=>{
                const myKidGoals = kid.goals
                const myKidActiveGoals = myKidGoals.filter((goal)=>{
                    const deadline = dateFormat(goal.deadline, "isoDateTime")
                    return(goal.achieved === false && deadline>today)
                })
                console.log(myKidActiveGoals)
                const validationNeeded = myKidActiveGoals.filter((g)=>g.validated_by_parent === false)
                console.log(validationNeeded.length)
                const paymentNeeded = myKidGoals.filter((g)=>g.achieved_by_parent === false && g.achieved === true)
                console.log(paymentNeeded.length)
                
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
                    <Link to = {`/parents/${user.id}/students/${kid.id}`}>{kid.username} {actionNeeded()}</Link>)})
            }        
      

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
                setGoals(null);
            }
        });
    }

            const myElementaryGradesLink = elementaryGrades.map((grade)=>{
                return(
                    <Link to = {`/educators/mystudents/${grade}`}>{grade} Grade</Link>)})

                    const mySecondaryGradesLink = secondaryGrades.map((grade)=>{
                        return(
                            <a><Link to = {`/educators/mystudents/${grade}`}>{grade} Grade</Link></a>)})
                
            

    


            

    return(
        <>
    <div className="navbar">
        {showStudentNav?
        (
            
            
                <nav>
                    <Link to ="/" style={{fontWeight:"600", marginLeft:"1%", fontSize:"20px"}}>Home</Link>
                    <Link to = {`/students/${user.id}/me`}> My Goals Page </Link>
                    <Link to = "/rewards" style={{fontWeight:"600", marginLeft:"1%", fontSize:"20px"}}> MarketPlace </Link>
                    <Link to = "/students/:id/myItems" style={{fontWeight:"600", marginLeft:"1%", fontSize:"20px"}}> My Items </Link>
                     <span>My Wallet : {user.wallet} 🌟</span> 
                    
            <span><button id="Btn-Logout" onClick={handleLogoutClick}>Logout</button></span>
        

                </nav>
           
            
        ):(null)} 

        {showParentNav?
        (
                <nav>
                    <Link to ="/" style={{fontWeight:"600", marginLeft:"1%", fontSize:"20px"}}>Home</Link>
                    {myKidsLink}
                    <Link to = "/rewards" style={{fontWeight:"600", marginLeft:"1%", fontSize:"20px"}}> MarketPlace </Link>
                    
                    <button id="Btn-Logout" onClick={handleLogoutClick}>Logout</button>
        
                </nav>  
        ):(null)} 

        {showEducatorNav?
        (
                <nav>
                    <Link to ="/" style={{fontWeight:"600", marginLeft:"1%", fontSize:"20px"}}>Home</Link>
                    
                    {showSecondary?
                    (mySecondaryGradesLink):
                    (myElementaryGradesLink)}
                    <button  id="Btn-Grades" onClick={()=>setShowSecondary(!showSecondary)}>{showSecondary?("Show Primary Grades"):("Show Secondary Grades")}</button>
                    
                    {/* <Link to ="/users/mystudents"> My Students Page </Link> */}
                    <span style={{ color:"red", fontSize:"20px", fontWeight:"bolder"}}> Id # {user.id} </span>
                    
            <button id="Btn-Logout" onClick={handleLogoutClick}>Logout</button>
        
                </nav>  
        ):(null)} 

        {showBusinessNav?
        (
                <nav>
                    <Link to ="/" style={{fontWeight:"600", marginLeft:"1%", fontSize:"20px"}}>Home</Link>
                    <Link to = "/rewards"> MarketPlace </Link>
                </nav>  
        ):(null)} 
        </div>
        

        {/* <div className="navbar">
            <nav>
                <Link to ="/">Home</Link>
                {user.type === "Student"? 
                (<Link to = {`/students/${user.id}/me`}> My Goals Page </Link>
                ):(null)}
                {user.type === "Educator" || user.type === "Parent"?
                (<Link to ="/users/mystudents"> My Students Page </Link>):(null)}
                {user.type === "Student"?
                (<p> My Wallet : {user.wallet} 🌟 </p>):(null)}
                {user.type === "Student"?
                (<Link to = "/students/:id/myItems"> My Items </Link>):(null)}
                {showMarketPlace?
                (<Link to = "/rewards"> MarketPlace </Link>):(null)}
                
            </nav>
        </div>
        <div>
            {showId?
                (<div><p style={{color:"red"}}> Id # {user.id} </p></div>)
                :(null)
             }
        </div> */}

        
        </>
    )
}

export default NavBar;