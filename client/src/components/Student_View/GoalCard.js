import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";
import { useNavigate } from "react-router-dom";
import StarConditional from "../Goals/StarConditional";
import NewMessageForm from "../Messages/NewMessageForm";
import "./GoalCard.css"
import UpdateGoalForm from "./UpdateGoalForm";

function GoalCard({onUpdateGoal, goals, setGoals}){
    const {user, setUser} = useContext(UserContext)
    const {id} = useParams()
    // const {goals, setGoals} = useContext(GoalsContext)
    const [showAchieved, setShowAchieved] = useState(false)
    const [errors, setErrors] = useState([]);
    const [buttonColor, setButtonColor] = useState("")
    const [showMessageForm, setShowMessageForm] = useState(false)
    const [achieved, setAchieved] = useState (false)
    const [showMessages, setShowMessages] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const navigate = useNavigate()
    console.log("goals in GoalCard=", goals)
    const goal = goals.find(goal => goal.id === parseInt(id))
    console.log("goal=",goal)
    
    console.log("messages=", goal.messages)
    useEffect(()=>{
        if (goal.validated_by_educator === true && goal.validated_by_parent == true){
            setShowAchieved(true)
        }
    }, [goal])

    useEffect(()=>{
        if (goal.validated_by_educator === false && goal.validated_by_parent == false){
            setShowUpdate(true)
        }
    }, [goal])

    useEffect(()=>{
        if (achieved === true){
            setButtonColor("green")
        }
    }, [achieved])


    if(!goals){
        console.log("!goals")
        return(
            <div>
                ...Loading
            </div>
        )
    }
   
    if(!goal){
        console.log("!goal")
        return(
            <div>
                ...Loading
            </div>
        )
    }

    // if(!goal.messages){
    //     goal.messages = []
    // }

    function handleGoalAchieved(){
        fetch(`/goals/${goal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                achieved: true
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedgoal) => (onUpdateGoal(updatedgoal)));
            } else {
                r.json().then((err)=>setErrors(err.errors))  
            }
            
        });
        navigate(`/students/${user.id}/me`)
        }
    
    const handleShowMessageForm = () =>{
        setShowMessageForm(!showMessageForm)
     } 
     
   

   
        const myGoalMessages = goal.messages.map((m)=> {
            return(<div key={m.id} style={{fontFamily:"caveat", fontSize:"24px"}}>
           ➢{m.content} from <em>{m.sender} </em>
       </div>)
        }) 
       
     
     const handleAddMessage = (newMessage) =>{
        console.log("newMessage in handleAddMessages", newMessage)
         let goalMessages=goal.messages
         console.log(goalMessages)
        const modifiedGoals = goals.map((goal)=>{
            if(newMessage.goal_id === goal.id){
                console.log(newMessage)
                goalMessages.push(newMessage)
                console.log(goalMessages)
            return ({...goal, messages: goalMessages}) 
        } else {
            return goal
        }
        })
        setGoals(modifiedGoals)
        } 

        const handleBackHome = () => {
            navigate(`/students/${user.id}/me`)
           }
        
        const handleReadMessages = () => {
          
            setShowMessages(!showMessages)
           
        }

        const handleUpdateGoal = () =>{
            navigate(`/goals/${goal.id}/update`)
        }
       

    return(
        <div className="goal-wrapper">
             
            <div style={{backgroundColor:"white", border: "2px solid lightblue", borderRadius: "18px"}}>
        <button className="backBtn" onClick={handleBackHome}> 🔙 to {user.username}'s goals </button>
        </div>
        <div className = "inner-wrapper">
            <div className = "upper-container">
                <div className = "text">
        <h2> {user.username}'s "{goal.title}" Goal</h2>
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
        </li>
        
        
        {showMessages?
         (<li><span id="titles">📬 Messages :</span>  <div className="messages-container">{myGoalMessages}</div></li> ):(null)}
         </div>
        </div>
        <div className = "btn-container">
            {showAchieved?
                (<button 
                    className="greenSubmitBtn"
                onClick={handleGoalAchieved}
                style = {{backgroundColor:buttonColor}}> Goal Achieved </button>) : (null)}

                {/* <button  className="submitBtn" onClick = {handleReadMessages}>{showMessages? ("Hide messages"):("Read Messages")}</button> */}
                <button className="submitBtn" onClick={handleShowMessageForm}>{showMessageForm?("Hide form"):("Add Message")}</button>
        {showUpdate?
        (<button className= "yellowSubmitBtn"
        style={{marginTop:"10px", marginLeft:"30px"}}
            onClick={handleUpdateGoal}
            > Update my Goal </button>
            ):(null)}
            </div>        
                {showMessageForm?
                (<div className = "inner-inner-wrapper">
                    <NewMessageForm goal={goal} onAddNewMessage={handleAddMessage} setShowMessageForm={setShowMessageForm} showMessageForm={showMessageForm}/>
                </div>): (<button className="submitBtn" onClick = {handleReadMessages}>{showMessages? ("Hide messages"):("Read Messages")}</button>)}
        </div>

        
        </div>
    )
}

export default GoalCard;

