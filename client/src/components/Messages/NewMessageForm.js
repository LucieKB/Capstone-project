import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";

function NewMessageForm({goal, onAddNewMessage}){
    const {user, setUser} = useContext(UserContext)
    const [messageData, setMessageData]=useState({
        text : (""),
        status: ("unread")
      })

    const handleSubmitMessage = (e) =>{
        e.preventDefault()
        fetch (`/goals/${goal.id}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
               },
               body: JSON.stringify({
                text : messageData.text,
                status : messageData.status,
                goal_id : goal.id
        }),
    })
    .then(r=>r.json())
    .then ((newMessage) => {
        onAddNewMessage(newMessage)});
    
    setMessageData({
        text : (""),
        status: ("unread")
    })
    }

    return(
        <div>
            <form onSubmit={handleSubmitMessage}>
                <ul>
                    Comment : 
                <input
                    type="text"
                    name="text"
                    value={messageData.text}
                    placeholder="Write your comment here"
                    onChange={(e)=>setMessageData({...messageData, text:e.target.value})}/>
            <br /> 
                </ul>
                <button>Submit my message</button>
            </form>
        </div>
    )
}

export default NewMessageForm;