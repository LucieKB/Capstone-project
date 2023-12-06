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
    const [myKids, setMyKids] = useState([])
    const [actionNeeded, setActionNeeded] = useState([])
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
    const navigate=useNavigate()

    useEffect(()=>{
        if (user.type === "Student"){
            setShowStudentNav(true)
        }
    }, [])

    useEffect(()=>{
        if (user.type === "Parent"){
            setShowParentNav(true)
            setMyKids(user.students)
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

  

            const myKidsLink = myKids.map((kid)=>{
            const myKidGoals = kid.goals
            const myKidActiveGoals = myKidGoals.filter((goal)=>{
                const deadline = dateFormat(goal.deadline, "isoDateTime")
                return(goal.achieved === false && deadline>today)
            })
            console.log(myKidActiveGoals)
            const validationNeeded = myKidActiveGoals.filter((g)=>g.validated_by_parent === false)
            console.log(validationNeeded.length)
            const paymentNeeded = myKidActiveGoals.filter((g)=>g.achieved_by_parent === false && g.achieved === true)
            console.log(paymentNeeded.length)
            
            // if (validationNeeded.length>0 && paymentNeeded.length === 0){
            //     setActionNeeded("✅")
            // }
            // else if (paymentNeeded.length>0 && validationNeeded.length === 0){
            //     setActionNeeded("💰")
            // }
            // else if (validationNeeded.length>0 && paymentNeeded.length>0){
            //     setActionNeeded(["✅", "💰"])
            // }
            // else{setActionNeeded("")}

            return(        
                <Link to = {`/parents/${user.id}/students/${kid.id}`}>{kid.username} {actionNeeded}</Link>)})
    
   

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
            navigate("/")
        });
    }

    

    

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
    //         setActionNeeded("✅")
    //     }
    //     else if (paymentNeeded.length>0 && validationNeeded.length === 0){
    //         setActionNeeded("💰")
    //     }
    //     else if (validationNeeded.length>0 && paymentNeeded.length>0){
    //         setActionNeeded(["✅", "💰"])
    //     }
    //     else{setActionNeeded("")}

        
            

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
                    <p> My Wallet : {user.wallet} 🌟 </p>

                </nav>
           
            
        ):(null)} 

        {showParentNav?
        (
                <nav>
                    <Link to ="/">Home</Link>
                    {myKidsLink}
                    <Link to = "/rewards"> MarketPlace </Link>
                </nav>  
        ):(null)} 

        {showEducatorNav?
        (
                <nav>
                    <Link to ="/">Home</Link>
                    <Link to ="/users/mystudents"> My Students Page </Link>
                    <p style={{color:"red"}}> Id # {user.id} </p>
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

        <div> 
            <button id="Btn-Logout" onClick={handleLogoutClick}>Logout</button>
        </div>
        </>
    )
}

export default NavBar;