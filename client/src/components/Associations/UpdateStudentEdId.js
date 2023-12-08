import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";

function UpdateStudentEdId({student, setShowAddEducatorId}){
    const [EdId, setEdId] = useState("")
    const {user, setUser} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);


    const onUpdateStudent = (updatedStudent) =>{
        const modifiedStudent = 
        student.id == updatedStudent.id?
            ( updatedStudent) : (student)
        
        setUser(modifiedStudent)
        //update user
    }

    const handleAddEdId = (e) =>{
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch(`students/${student.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                educator_id: EdId
            }),
        }).then((r) => {
            setIsLoading(false)
            if (r.ok) {
                r.json().then((updatedStudent) => (onUpdateStudent(updatedStudent)));
            } else {
                r.json().then((err) => {console.log(err.errors)
                setErrors(err.errors)}
                )
              }
           setEdId("") ;
           setShowAddEducatorId(false)
        });
    }

    return(
        <div>
        <h2>Link my profile to my Teacher/Coach.</h2>
        <p>Enter your Educator's Id# underneath:</p>

        <form onSubmit = {handleAddEdId}>
            <input
            type = "number"
            name = "My_Ed_Id"
            value = {EdId}
            onChange = {(e) => setEdId(e.target.value)}
            />
            <div>
                <br></br>
            <button type="submit">{isLoading ? "Loading..." : "Submit"}</button>
            
            </div>  
              <label style={{color:"red"}}>
                {errors.map((err) => (
                  <em key={err}>{err}</em>
                  ))}
                </label>
        </form>
        <br></br>
        </div>
    )
}

export default UpdateStudentEdId