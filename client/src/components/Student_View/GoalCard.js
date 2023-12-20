import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";
import { useNavigate } from "react-router-dom";
import StarConditional from "../Goals/StarConditional";
import NewMessageForm from "../Messages/NewMessageForm";
import "./GoalCard.css"

function GoalCard({onUpdateGoal}){
    const {user, setUser} = useContext(UserContext)
    const {id} = useParams()
    const {goals, setGoals} = useContext(GoalsContext)
    const [showAchieved, setShowAchieved] = useState(false)
    const [errors, setErrors] = useState([]);
    const [buttonColor, setButtonColor] = useState("")
    const [showMessageForm, setShowMessageForm] = useState(false)
    const [achieved, setAchieved] = useState (false)
    const [showMessages, setShowMessages] = useState(false)
    // const [goalMessages, setGoalMessages] = useState(goal.messages)
    const navigate = useNavigate()
    const goal = goals.find(goal => goal.id === parseInt(id))
    console.log("goal=",goal)

    useEffect(()=>{
        if (goal.validated_by_educator === true && goal.validated_by_parent == true){
            setShowAchieved(true)
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
    console.log("goals=",goals)

    

    if(!goal){
        console.log("!goal")
        return(
            <div>
                ...Loading
            </div>
        )
    }

    

    

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
     
    //  useEffect(()=>{
    //     const myGoalMessages = goalMessages.map((m)=> {
    //         console.log("message.content=",m.content)
    //             return(<div key={m.id}>
    //                          ➢{m.content} from <em>{m.sender} </em>
    //                     </div>)  
    //     }) 
    //     console.log("myGoalMessages=",myGoalMessages)
    //     setGoalMessages(myGoalMessages)   
    // }, [])

   
        const myGoalMessages = goal.messages.map((m)=> {
            return(<div key={m.id}>
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

        // const receivedMessages = goal.messages.filter((m)=> m.recipient === user.username)
        // const sentMessages = goal.messages.filter((m)=> m.user_id === user.id)

       

        // const goalMessages = goal.messages.map((m)=> 
        // <div key={m.id}>
        //     ➢{m.content} from <em>{m.sender} </em>
        // </div>)
        
        const handleReadMessages = () => {
            // fetch(`/messages/${goal.id}/read`, {
            //     method: "PATCH",
            //     headers: {
            //         "Content-Type": "application/json", 
            //     },
            //     body: JSON.stringify({
            //         read: true
            //     }),
            // }).then((r) => {
            //     if (r.ok) {
            //         r.json().then((updatedMessage) =>
            //         //  console.log(updatedMessage)
            //         handleUpdateMessage(updatedMessage)
            //         // (setMessages([...messages, updatedMessage]))
            //         );
            //         navigate(`/parents/${user.id}/students/${student.id}/goals/${goal.id}`)
            //     } else {
            //         r.json().then((err)=>setErrors(err.errors))  
            //     }   
            // });
            setShowMessages(!showMessages)
            // setMessageStyle("")
        }
       

    return(
        <div>
        <button className="backBtn" onClick={handleBackHome}> 🔙 to {user.username}'s goals </button>
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
        </div>
        <div className = "messages-container">
        {showMessages?
         (<ul> <h3>📬 Messages :</h3> {myGoalMessages}</ul> ):(null)}
         </div>
        </div>
            {showAchieved?
                (<button 
                onClick={handleGoalAchieved}
                style = {{backgroundColor:buttonColor}}> Goal Achieved </button>) : (null)}

                <button  className="submitBtn" onClick = {handleReadMessages}>{showMessages? ("Hide messages"):("Read Messages")}</button>
                <button className="submitBtn" onClick={handleShowMessageForm}>{showMessageForm?("Hide form"):("Add Message")}</button>
                
                {showMessageForm?
                (<div className = "inner-inner-wrapper">
                    <NewMessageForm goal={goal} onAddNewMessage={handleAddMessage}/>
                </div>): (null)}
        </div>
        </div>
    )
}

export default GoalCard;

{/* <button onClick={handleShowMessageForm}>Add Message</button>
                                {showMessageForm?
                (<div>
                    <ParentMessageForm goal={goal} onAddNewMessage={handleAddMessage}/>
                </div>): (<button style={{backgroundColor:messageStyle}} onClick = {handleReadMessages}>{showMessages? ("Hide messages"):("Read Messages")}</button>)}
                            </div> */}