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
    const [showGoal, setShowGoal] = useState(false)
    const student = user.students.find(student => student.id === student_id)
    const navigate = useNavigate();
    const goalDeadline = new Date(`${goal.deadline}`)
    const today = (new Date())
    const difference_in_time = goalDeadline.getTime() - today.getTime()
    const difference_in_days = difference_in_time / (1000 * 3600 * 24);
    const difference_in_hours = Math.round(((difference_in_days + Number.EPSILON)*100)/100 * 60) 


  

        
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
                    <p style={{fontSize:"16px"}}><u>
                        {/* <button onClick={()=>setShowGoal(!showGoal)}>{goal.title}</button> */}
                        <Link to={`/parents/${user.id}/students/${student_id}/goals/${goal.id}`}><h4>{goal.title}</h4></Link>
                                    </u><em> &nbsp; - &nbsp; Created on {goal.created_at.split('T')[0]}</em> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{backgroundColor: `${wordColor}`}}>{(Math.abs(difference_in_days) >= 1) ? (Math.round(difference_in_days)+" days"):(difference_in_hours+" hours")} left to complete</span></p>
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
