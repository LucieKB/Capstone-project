import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function NewMessageForm({goal, onAddNewMessage}){
    const {user, setUser} = useContext(UserContext)
    const [goalValue, setGoalValue]=useState({...goal, messages:[]}) //added ..goal??
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const handleSubmitMessage = (e) =>{
        e.preventDefault()
        console.log(goalValue)
        fetch (`/goals/${goal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
               },
               body: JSON.stringify(goalValue),
    })
    .then((r) => {
        if (r.ok) {
        r.json().then((newMessage) => console.log(newMessage));
        } else {
        r.json().then((err)=>setErrors(err.errors))
        }
    })
    
    setGoalValue("")
    navigate(`${goal.id}`)
    }

    const handleSetMessages =(e) =>{
        const newMessages = [...goal.messages, e.target.value]
        setGoalValue({...goalValue, messages:newMessages})
    }

    return(
        <div>
            <form onSubmit={handleSubmitMessage}>
                <ul>
                    Comment : 
                <input
                    type="text"
                    name="text"
                    value= {goalValue.messages}
                    placeholder="Write your comment here"
                    onChange={(e)=>handleSetMessages
                        // ...goalValue, messages:[...messages, e.target.value]
                        }/>
            <br /> 
                </ul>
                <button>Submit my message</button>
            </form>
        </div>
    )
}

export default NewMessageForm;