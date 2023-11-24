import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";

function NewMessageForm({goal, onAddNewMessage}){
    const {user, setUser} = useContext(UserContext)
    const [myMessage, setMyMessage]=useState("")

    const handleSubmitMessage = (e) =>{
        e.preventDefault()
        fetch (`/goals/${goal.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
               },
               body: JSON.stringify({message: myMessage}),
    })
    .then(r=>r.json())
    .then ((newMessage) => {
        onAddNewMessage(newMessage)});
    
    setMyMessage("")
    }

    return(
        <div>
            <form onSubmit={handleSubmitMessage}>
                <ul>
                    Comment : 
                <input
                    type="text"
                    name="text"
                    value={myMessage}
                    placeholder="Write your comment here"
                    onChange={(e)=>setMyMessage(e.target.value)}/>
            <br /> 
                </ul>
                <button>Submit my message</button>
            </form>
        </div>
    )
}

export default NewMessageForm;