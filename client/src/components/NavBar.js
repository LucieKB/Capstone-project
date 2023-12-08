import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import "./NavBar.css"


function NavBar(){
    const {user, setUser} = useContext(UserContext)
    const [showId, setShowId] = useState(false)
    const [showStudentNav, setShowStudentNav] = useState(false)
    const [showParentNav, setShowParentNav] = useState(false)
    const [showEducatorNav, setShowEducatorNav] = useState(false)
    const [showBusinessNav, setShowBusinessNav] = useState(false)
    
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
    const elementaryGrades = [1,2,3,4,5]
    const secondaryGrades = [6,7,8,9,10,11,12]
    const [showSecondary, setShowSecondary] = useState(false)
    const navigate=useNavigate()

  console.log (user.type)
  let myKidsLink = []

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
    
            if (user.type === "Parent"){
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
            }
            navigate("/")
        });
    }

            const myElementaryGradesLink = elementaryGrades.map((grade)=>{
                return(
                    <Link to = {`/educators/mystudents/${grade}`}>{grade} Grade</Link>)})

                    const mySecondaryGradesLink = secondaryGrades.map((grade)=>{
                        return(
                            <a><Link to = {`/educators/mystudents/${grade}`}>{grade} Grade</Link></a>)})
                
            

    

    

    // const myKidsLink = myKids.map((kid)=>{
    //     const myKidGoals = kid.goals
    //     const myKidActiveGoals = myKidGoals.filter((goal)=>{
    //         const deadline = dateFormat(goal.deadline, "isoDateTime")
    //         return(goal.achieved === false && deadline>today)
    //     })
    //     console.log(myKidActiveGoals)
    //     const validationNeeded = myKidActiveGoals.filter((g)=>g.validated_by_parent === false)
    //     console.log(validationNeeded.length)
    //     const paymentNeeded = myKidActiveGoals.filter((g)=>g.achieved_by_parent === false && g.achieved === true)
    //     console.log(paymentNeeded.length)
        
    //     if (validationNeeded.length>0 && paymentNeeded.length === 0){
    //         return("✅")
    //     }
    //     else if (paymentNeeded.length>0 && validationNeeded.length === 0){
    //         return("💰")
    //     }
    //     else if (validationNeeded.length>0 && paymentNeeded.length>0){
    //         return(["✅", "💰"])
    //     }
    //     else{return("")}

        
            

    return(
        <>
    <div className="navbar">
        {showStudentNav?
        (
            
            
                <nav>
                    <Link to ="/">Home</Link>
                    <Link to = {`/students/${user.id}/me`}> My Goals Page </Link>
                    <Link to = "/rewards"> MarketPlace </Link>
                    <Link to = "/students/:id/myItems"> My Items </Link>
                     <span>My Wallet : {user.wallet} 🌟</span> 
                    
            <button id="Btn-Logout" onClick={handleLogoutClick}>Logout</button>
        

                </nav>
           
            
        ):(null)} 

        {showParentNav?
        (
                <nav>
                    <Link to ="/">Home</Link>
                    {myKidsLink}
                    <Link to = "/rewards"> MarketPlace </Link>
                    
                    <button id="Btn-Logout" onClick={handleLogoutClick}>Logout</button>
        
                </nav>  
        ):(null)} 

        {showEducatorNav?
        (
                <nav>
                    <Link to ="/">Home</Link>
                    
                    {showSecondary?
                    (mySecondaryGradesLink):
                    (myElementaryGradesLink)}
                    <button onClick={()=>setShowSecondary(!showSecondary)}>{showSecondary?("Show Primary Grades"):("Show Secondary Grades")}</button>
                    
                    {/* <Link to ="/users/mystudents"> My Students Page </Link> */}
                    Id for students : <span style={{color:"red", fontSize:"20px", fontWeight:"bolder"}}> Id # {user.id} </span>
                    
            <button id="Btn-Logout" onClick={handleLogoutClick}>Logout</button>
        
                </nav>  
        ):(null)} 

        {showBusinessNav?
        (
                <nav>
                    <Link to ="/">Home</Link>
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