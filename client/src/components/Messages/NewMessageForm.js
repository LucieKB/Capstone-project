import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function NewMessageForm({goal, onAddNewMessage, setShowMessageForm, showMessageForm}){
    const {user, setUser} = useContext(UserContext)
    const [newContent, setNewContent]=useState("")
    const [newRecipient, setNewRecipient] = useState("")
    const [errors, setErrors] = useState([])
    const [recipients, setRecipients] = useState([" "])
    const navigate = useNavigate()

    useEffect(()=>{
        // if (user.type === "Parent" || user.type === "Educator"){
        //     const possibleRecipients = user.students.map((s)=> s.username)
        //     setRecipients(possibleRecipients)
        // }
        // if (user.type === "Parent"){
        //     const student_id = goal.user_id
        //     fetch (`/parents/${student_id}/mycontacts`).then((r)=> {
        //         if (r.ok) {
        //           r.json().then((names)=>{
        //             console.log(names)
        //             setRecipients(names)})
        //         }
        //     })}
        if (user.type === "Student"){
           fetch (`/students/${user.id}/myadults`).then((r)=> {
            if (r.ok) {
              r.json().then((names)=>{
                setRecipients(names)})
            }
        })};
    }, []);

      const handleChangeRecipient = (e) =>{
        setNewRecipient(e.target.value)
    } 

    const handleSubmitMessage = (e) =>{
        e.preventDefault()
        console.log(newRecipient)
        const messageData ={
            content:newContent,
            recipient:newRecipient,
            user_id:user.id,
            goal_id:goal.id,
            read: false
        }
        fetch (`/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
               },
               body: JSON.stringify(messageData),
    })
    .then((r) => {
        if (r.ok) {
        r.json().then((newMessage) => onAddNewMessage(newMessage));
        } else {
        r.json().then((err)=>setErrors(err.errors))
        }
    })
    
    setNewContent("");
    setShowMessageForm(!showMessageForm)
   
    }

  

    return(
        <div>
            <form onSubmit={handleSubmitMessage}>
            <div className="form-wrapper">
                <ul>
                <strong><u> Message : </u>&nbsp;</strong>
                <input
                className="form-control"
                    type="text"
                    name="text"
                    value= {newContent}
                    placeholder="Write your comment here"
                    onChange={(e)=> setNewContent(e.target.value)}
                />

            <label><strong><u>Who do you want to send that message to?</u>&nbsp;</strong>
              <select onChange={handleChangeRecipient}>
                {recipients.map((r)=> {
                  return (
                    <option key={r} value={r} >
                      {r}
                    </option>
                  )
                })}
              </select>
            </label>
            <br /> 
                </ul>
                <button className="inner-btn">Send &nbsp;&nbsp; ✉️ </button>
                </div>
            </form>
        </div>
    )
}

export default NewMessageForm;