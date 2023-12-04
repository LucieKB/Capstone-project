import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import {GoalsContext} from "../../contexts/GoalsContext";
import StarConditional from "./StarConditional";
import { Link, useNavigate, useParams } from "react-router-dom";



function MyStudentGoalsList({goal}){
    const [errors, setErrors] = useState([]);
    const {user, setUser} = useContext(UserContext)
    const {goals, setGoals} = useContext(GoalsContext)
    const {student_id} = useParams()
    // const [showValidate, setShowValidate] = useState(true)
    // const [showPay, setShowPay] = useState(false)
    // const [isDisabled, setIsDisabled] = useState(false)
    // const [showMessageForm, setShowMessageForm] = useState(false)
    // const [showMessages, setShowMessages] = useState(false)
    const student = user.students.find(student => student.id === student_id)
    const navigate = useNavigate();
    const goalDeadline = new Date(`${goal.deadline}`)
    const today = (new Date())
    const difference_in_time = goalDeadline.getTime() - today.getTime()
    const difference_in_days = difference_in_time / (1000 * 3600 * 24);
    const difference_in_hours = Math.round(((difference_in_days + Number.EPSILON)*100)/100 * 60) 


    // useEffect(()=>{
    //     const adultType = (user.type)
    // if (adultType == "Parent" && goal.validated_by_parent == true){
    //     setShowValidate(false)
    // } else if 
    //     (adultType == "Educator" && goal.validated_by_educator == true){
    //     setShowValidate(false)
    // }
    
    // }, [])

    // useEffect(()=>{
    //     if (goal.achieved == true){
    //     if (goal.validated_by_educator == true && goal.validated_by_parent == true){
    //         setShowPay(true)
    //     }}
    // }, [])

    // useEffect(()=>{
    //     if (goal.achieved === true){
    //     const adultType = (user.type)
    //     if (adultType == "Parent" && goal.achieved_by_parent == true){
    //         setIsDisabled(true)
    //     }
    //     else if 
    //     (adultType == "Educator" && goal.achieved_by_educator == true){
    //     setIsDisabled(true)
    // }}
    // }, [goal.achieved_by_educator, goal.achieved_by_parent]) 


    // const onUpdategoal = (updatedgoal) =>{
    //     const modifiedgoal = student.goals.map((goal)=>{
    //         if(goal.id === updatedgoal.id){
    //             return updatedgoal
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

    // function handlePay(){
    //     if (user.type === "Parent"){
    //     fetch(`/payment/${student.id}/goals/${goal.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json", 
    //         },
    //         body: JSON.stringify({
    //             achieved_by_parent: true
    //         }),
    //     }).then((r) => {
    //         if (r.ok) {
    //             r.json().then((updatedGoal) => (onPayGoal(updatedGoal)));
    //         } else {
    //             r.json().then((err)=>setErrors(err.errors))  
    //         }
           
    //     });
    //     }
    //     else if (user.type === "Educator"){
    //         fetch(`/payment/${student.id}/goals/${goal.id}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json", 
    //             },
    //             body: JSON.stringify({
    //                 achieved_by_educator: true
    //             }),
    //         }).then((r) => {
    //             if (r.ok) {
    //                 r.json().then((updatedGoal) => (onPayGoal(updatedGoal)));
    //             } else {
    //                 r.json().then((err)=>setErrors(err.errors))  
    //             }   
    //         });
    //     }
    //    navigate(`/students/${student.id}`) 
    // }
    
    // const handleShowMessageForm = () =>{
    //     setShowMessageForm(!showMessageForm)
    //  }  
     
    //  const addMessageToGoal = (newMessage) =>{
    //     const goalWithNewMessage = [...goal.messages, newMessage]
    //     const copyGoalMessage = {...goal, messages:goalWithNewMessage}
    //     if (copyGoalMessage.id === goal.id){
    //         setGoals({...goals, copyGoalMessage})
    //     } else {
    //         return goal
    //     }
    //     }
    

    // function handleValidate(){
    //     if (user.type === "Parent"){
    //     console.log("clicked")
    //     fetch(`${student.id}/goals/${goal.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json", 
    //         },
    //         body: JSON.stringify({
    //             validated_by_parent: true
    //         }),
    //     }).then((r) => {
    //         if (r.ok) {
    //             r.json().then((updatedgoal) => (onUpdategoal(updatedgoal)));
    //             console.log(user)
    //             console.log(goals)
    //             navigate(`/students/${student.id}`)
    //         } else {
    //             r.json().then((err)=>setErrors(err.errors))  
    //         }
            
    //     });
    //     }
    //     else if (user.type === "Educator"){
    //         console.log("clicked")
    //         debugger
    //         fetch(`${student.id}/goals/${goal.id}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json", 
    //             },
    //             body: JSON.stringify({
    //                 validated_by_educator: true
    //             }),
    //         }).then((r) => {
    //             if (r.ok) {
    //                 r.json().then((updatedgoal) => (onUpdategoal(updatedgoal)));
    //                 navigate(`/students/${student.id}`)
    //             } else {
    //                 r.json().then((err)=>setErrors(err.errors))  
    //             }   
    //         });
    //     }
    // }

        
            let wordColor;
            if (difference_in_days < 1){
                wordColor = "#FF003F"
            }
            else if (difference_in_days <3 && difference_in_days>1){
                wordColor = "#FFA500"
            }
            else {wordColor = "#66FF00"}

   
   
   
    return(
        <div key={goal.id} id={goal.id}>
           
            <div>
                <div>
                    <h4 style={{backgroundColor: `${wordColor}`}}><u>
                        <Link to={`/parents/${user.id}/students/${student_id}/goals/${goal.id}`}>{goal.title}</Link>
                                    </u><em> &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; Created on {goal.created_at.split('T')[0]}</em> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{(Math.abs(difference_in_days) >= 1) ? (Math.round(difference_in_days)+" days"):(difference_in_hours+" hours")} left to complete</h4>
                </div>                
                           
                                
                                {/* <li>Description : {goal.description}</li>
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
                                    {showMessages?
                                    (<li> Messages : </li>):(null)}
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
                    <ParentMessageForm goal={goal} onAddNewMessage={addMessageToGoal}/>
                </div>): (<button onClick = {() =>{setShowMessages(!showMessages)}}>Read messages</button>)}
                            </div>
               <hr></hr> */}
               
            </div> 
     </div>                            

)}

export default MyStudentGoalsList
