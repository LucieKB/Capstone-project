import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import StarConditional from "./StarConditional";
import { useNavigate } from "react-router-dom";
import NewMessageForm from "../Messages/NewMessageForm";

function MyStudentgoalCard({goal}){
    const [errors, setErrors] = useState([]);
    const {user, setUser} = useContext(UserContext)
    const [showValidate, setShowValidate] = useState(true)
    const [showPay, setShowPay] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [showMessageForm, setShowMessageForm] = useState(false)
    const student = user.students.find(student => student.id === goal.user_id)
    const navigate = useNavigate();
    const deadline = goal.deadline
    const goalDeadline = new Date(`${goal.deadline}`)
    const today = (new Date())
    const difference_in_time = goalDeadline.getTime() - today.getTime()
    const difference_in_days = difference_in_time / (1000 * 3600 * 24);
    const difference_in_hours = Math.round(((difference_in_days + Number.EPSILON)*100)/100 * 60) 

    // console.log(goal)
    // console.log(today)
    // console.log(goalDeadline)
    // console.log(difference_in_days)
    // console.log(difference_in_hours)

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
    }, [goal.achieved_by_educator, goal.achieved_by_parent]) 


    const onUpdategoal = (updatedgoal) =>{
        const modifiedgoal = 
        goal.id == updatedgoal.id?
            ( updatedgoal) : (goal)
        
        const updatedStudent = {...student, goals: modifiedgoal }
        setUser({...user, students: updatedStudent})
        
    }

    const onPayGoal = (updatedGoal) =>{
        const modifiedgoal = 
        goal.id == updatedGoal.id?
            ( updatedGoal) : (goal)
        
        const updatedStudent = {...student, goals: modifiedgoal}
        setUser({...user, students: updatedStudent})
        
    }

    function handlePay(){
        if (user.type === "Parent"){
        console.log("clicked")
        fetch(`students/payment/${student.id}/goals/${goal.id}`, {
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
            console.log("clicked")
            fetch(`students/payment/${student.id}/goals/${goal.id}`, {
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
        
    }
    
    const handleShowMessageForm = () =>{
        setShowMessageForm(!showMessageForm)
     }  
     
     const addMessageToGoal = (newMessage) =>{
        console.log(goal)
        const goalWithNewMessage = [...goal.messages, newMessage]
        const copyGoalMessage = {...goal, messages:goalWithNewMessage}
        if (copyGoalMessage.id === goal.id){
            return copyGoalMessage
        } else {
            return goal
        }
        }
    

    function handleValidate(){
        if (user.type === "Parent"){
        console.log("clicked")
        fetch(`students/${student.id}/goals/${goal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                validated_by_parent: true
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedgoal) => (onUpdategoal(updatedgoal)));
            } else {
                r.json().then((err)=>setErrors(err.errors))  
            }
            
        });
        }
        else if (user.type === "Educator"){
            console.log("clicked")
            fetch(`students/${student.id}/goals/${goal.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    validated_by_educator: true
                }),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((updatedgoal) => (onUpdategoal(updatedgoal)));
                } else {
                    r.json().then((err)=>setErrors(err.errors))  
                }   
            });
        }
    }

    
   
    return(
        <div id={goal.id}>
           
            <div>
                <div>
                                <li><strong>Time Left to Complete This Goal: {(Math.abs(difference_in_days) >= 1) ? (Math.round(difference_in_days)+" days"):(difference_in_hours+" hours")}</strong></li>
                                <em> Created on {goal.created_at.split('T')[0]}</em>
                                <li>Title : {goal.title}</li>
                                <li>Description : {goal.description}</li>
                                <li>Deadline : {goal.deadline}</li>
                                <li>Category : {goal.goal_category}</li>
                                <li>Value : 
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
                                </li>
                                {showValidate?
                                (<button onClick={handleValidate}>Validate this goal</button>) : (null)}
                                {showPay?
                                (<button 
                                onClick={handlePay}
                                disabled = {isDisabled}> Pay {student.username} <strong style={{color:"orange"}}>{goal.value/2} ☆</strong></button>) : (null)}
                                <button onClick={handleShowMessageForm}>Add Message</button>
                                {showMessageForm?
                (<div>
                    <NewMessageForm goal={goal} onAddNewMessage={addMessageToGoal}/>
                </div>): (<button>Read my messages</button>)}
                            </div>
               
            </div> 
     </div>                            

)}

export default MyStudentgoalCard
