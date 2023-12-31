import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";
import { useNavigate, useLocation } from "react-router-dom";
import StarConditional from "./StarConditional";
import ParentMessageForm from "../Messages/ParentMessageForm";


function MyStudentGoalCard({onUpdateGoal, messages, setMessages, onPayGoal}){
    const {user, setUser} = useContext(UserContext)
    const {goal_id} = useParams()
    const {student_id} = useParams()
    const {goals, setGoals} = useContext(GoalsContext)
    const [showAchieved, setShowAchieved] = useState(false)
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false)
    const student = user.students.find(student => student.id === parseInt(student_id))
    const [showMessageForm, setShowMessageForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [achieved, setAchieved] = useState (false)
    const navigate = useNavigate()
    const [showValidate, setShowValidate] = useState(true)
    const [showPay, setShowPay] = useState(false)
    const [showMessages, setShowMessages] = useState(false)
    const [goalMessages, setGoalMessages] = useState([])
    const [messageStyle, setMessageStyle] = useState("")
    // const location = useLocation()
    // const { from } = location.state

    // if(!goals){
    //    return(
    //     <div>
    //         ...Loading
    //     </div>
    //    )
    // }

   console.log(goals)
    console.log(student)
    

    const goal = goals.find(goal => goal.id === parseInt(goal_id))
  
    console.log("goal=",goal)

    useEffect(()=>{
        const thisGoalMessages = messages.filter((m)=> m.goal_id === goal.id)
        setGoalMessages(thisGoalMessages)
    }, [messages])
    
   useEffect(()=>{
    const adultType = (user.type)
    if (adultType == "Parent" && goal.validated_by_parent == true){
        setShowValidate(false)
    } else if 
        (adultType == "Educator" && goal.validated_by_educator == true){
        setShowValidate(false)
    }
    }, [])

    useEffect(()=>{
        if (goal.validated_by_educator === true && goal.validated_by_parent == true){
            setShowAchieved(true)
        }
    }, [])

    useEffect(()=>{
        if (goal.achieved == true){
        if (goal.validated_by_educator == true && goal.validated_by_parent == true){
            setShowPay(true)
        }}
    }, [])

    useEffect(()=>{
        if (goal.achieved === true){
        const adultType = (user.type)
        if (adultType == "Parent" && goal.achieved_by_parent == true){
            setIsDisabled(true)
        }
        else if 
        (adultType == "Educator" && goal.achieved_by_educator == true){
        setIsDisabled(true)
    }}
    // }, [goal.achieved_by_educator, goal.achieved_by_parent]) 
}, []) 

    useEffect(()=>{
        const readStatus = goalMessages.map((g)=> g.read)
        if(readStatus.includes(false)){
            setMessageStyle("green")}
        else{
            setMessageStyle("")
        }
        
    })

    if(!goal){
        console.log("no goal GoalCard")
        return(
            <div>
                Loading...
            </div>
        )
    }

    // const onUpdategoal = (newMessage) =>{
    //     const modifiedgoal = student.goals.map((goal)=>{
    //         if(goal.id === newMessage.id){
    //             return newMessage
    //         }else{
    //             return goal
    //         }
    //         })
    //     setGoals(modifiedgoal)
        
    //     const updatedStudent = [...student.goals, modifiedgoal] 
    //     const updatedStudents = user.students.map((student) =>{
    //     if (updatedStudent.id === student.id){
    //         return updatedStudent
    //     } else {
    //         return student
    //     }
    //     })
    //     setUser({...user, students: updatedStudents}) 
    // }

    // const onUpdategoal = (updatedgoal) =>{
    //     console.log(updatedgoal)
    //     const modifiedgoals = goals.map((goal)=>{
    //         if(goal.id === updatedgoal.id){
    //             return updatedgoal
    //         }else{
    //             return goal
    //         }
    //         })
    //         console.log(modifiedgoals)
    //     setGoals(modifiedgoals)
        
    //     const updatedStudent = [...student.goals, modifiedgoals] 
    //     console.log(updatedStudent)
    //     const updatedStudents = user.students.map((student) =>{
    //     if (updatedStudent.id === student_id){
    //         return updatedStudent
    //     } else {
    //         return student
    //     }
    //     })
    //     console.log(updatedStudents)
    //     setUser({...user, students: updatedStudents}) 
    // }


    // const onUpdategoal = (updatedgoal) =>{
    //     const modifiedgoal = goals.map((goal)=>{
    //         if(goal.id === updatedgoal.id){
    //             return updatedgoal
    //         }else{
    //             return goal
    //         }
    //         })
    //     setGoals(modifiedgoal)
    //     setUser({...user, goals: modifiedgoal})   
    // }

    // const onPayGoal = (updatedGoal) =>{
    //     const modifiedgoal = student.goals.map((goal)=>{
    //         if(goal.id === updatedGoal.id){
    //             return updatedGoal
    //         }else{
    //             return goal
    //         }
    //         })
    //     setGoals(modifiedgoal);

    //     const updatedStudent = [...student.goals, modifiedgoal] 
    //     const updatedStudents = user.students.map((student) =>{
    //     if (updatedStudent.id === student.id){
    //         return updatedStudent
    //     } else {
    //         return student
    //     }
    //     })
    //     setUser({...user, students: updatedStudents})  
        
    // }

    function handlePay(){
        if (user.type === "Parent"){
        fetch(`/payment/${student_id}/goals/${goal_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                achieved_by_parent: true
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedGoal) => (onPayGoal(updatedGoal)));
            } else {
                r.json().then((err)=>setErrors(err.errors))  
            }
           
        });
        }
        else if (user.type === "Educator"){
            fetch(`/payment/${student_id}/goals/${goal_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    achieved_by_educator: true
                }),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((updatedGoal) => (onPayGoal(updatedGoal)));
                } else {
                    r.json().then((err)=>setErrors(err.errors))  
                }   
            });
        }
        // navigate(`/parents/${user.id}/mystudents`) 
       navigate(`/parents/${user.id}/students/${student_id}`) 
    }
    
    const handleShowMessageForm = () =>{
        setShowMessageForm(!showMessageForm)
     }  
     
     const handleAddMessage = (newMessage) =>{
        setMessages([...messages, newMessage]) 
        setGoalMessages([...goalMessages, newMessage])
        }
    

    function handleValidate(){
        if (user.type === "Parent"){
        console.log("clicked")
        fetch(`/students/${student_id}/goals/${goal_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                validated_by_parent: true
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedGoal) => (onUpdateGoal(updatedGoal)));
                // navigate(`/parents/${user.id}/students/${student_id}`)
            } else {
                r.json().then((err)=>setErrors(err.errors))  
            }
            console.log("goalvalidated =", goal)
        });
        }
        else if (user.type === "Educator"){
            console.log("clicked")
            fetch(`/students/${student.id}/goals/${goal.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    validated_by_educator: true
                }),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((updatedgoal) => (onUpdateGoal(updatedgoal)));
                    // navigate(`/parents/${user.id}/students/${student.id}`)
                } else {
                    r.json().then((err)=>setErrors(err.errors))  
                }  
                console.log("goalvalidated =", goal) 
            });
        }
    }
        
    const handleBackHome = () => {
        navigate(`/parents/${user.id}/students/${student_id}`)
       }

    const handleUpdateMessage = (updatedMessage) =>{
        const modifiedMessages = goalMessages.map((m)=>{
            if(m.id === updatedMessage.id){
                return updatedMessage;
            } else {
                return m
            }
        })
        setGoalMessages(modifiedMessages)
        setMessages([...messages, modifiedMessages])
    }
       
    
        const myGoalMessages = goalMessages.map((m)=> {
            return(<div key={m.id} style={{fontFamily:"caveat", fontSize:"24px"}}>
           ➢{m.content} from <em>{m.sender} </em>
       </div>)
        }) 
       
    

    

    const handleReadMessages = () => {
        fetch(`/messages/${goal.id}/read`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                read: true
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedMessage) =>
                //  console.log(updatedMessage)
                handleUpdateMessage(updatedMessage)
                // (setMessages([...messages, updatedMessage]))
                );
                navigate(`/parents/${user.id}/students/${student.id}/goals/${goal.id}`)
            } else {
                r.json().then((err)=>setErrors(err.errors))  
            }   
        });
        setShowMessages(!showMessages)
        setMessageStyle("")
    }

    console.log("messageStyle=", messageStyle)


    return(
        
        <div className="goal-wrapper">
        <div style={{width:"fit-content", alignSelf:"left", marginTop:"10px" }}>
            <div style={{backgroundColor:"white", border: "2px solid lightblue", borderRadius: "18px"}}>
        <button className="backBtn" onClick={handleBackHome}> 🔙 to {student.username}'s goals </button>
        </div>
        </div>
        <div className = "inner-wrapper">
            <div className = "upper-container">
                <div className = "text">
        <h2> {student.username}'s "{goal.title}" Goal</h2>
        <em> Created on {goal.created_at.split('T')[0]}</em>
        <li><span id="titles">Title :</span> {goal.title}</li>
        <li><span id="titles">Description :</span> {goal.description}</li>
        <li><span id="titles">Deadline :</span> {goal.deadline}</li>
        <li><span id="titles">Category :</span> {goal.goal_category}</li>
        <li><span id="titles">Value :</span> 
        <span>
                {Array(5)
                .fill()
                .map((_, index) => (
                <StarConditional 
                key={index} 
                filled={index < goal.value}
                goal = {goal} />
                ))}
            </span>
            {showMessages?
                   (<li><span id="titles">📬 Messages :</span> {myGoalMessages}</li> ):(null)}
        </li>
       
           <div className="btn-container">                       
                                 
                                
                                {showValidate?
                                (<button className="greenSubmitBtn" onClick={handleValidate}> ✅ Validate this goal</button>) : (null)}
                                {showPay?
                                (<button 
                                className="yellowSubmitBtn"
                                onClick={handlePay}
                                disabled = {isDisabled}> Pay {student.username} &nbsp;<strong style={{color:"orange"}}>{goal.value/2} ⭐️</strong></button>) : (null)}
                                <button className="submitBtn" onClick={handleShowMessageForm}>{showMessageForm? ("Hide Form"):("Add Message")}</button>
                                
                            </div>
                            {showMessageForm?
                (<div className = "inner-inner-wrapper">
                    <ParentMessageForm goal={goal} onAddNewMessage={handleAddMessage}/>
                </div>): (<button className="submitBtn" style={{backgroundColor:messageStyle}} onClick = {handleReadMessages}>{showMessages? ("Hide messages"):("Read Messages")}</button>)}
                            </div>
        </div>
        </div>
        </div>
    )
}

export default MyStudentGoalCard;