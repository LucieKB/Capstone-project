import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import StarConditional from "./StarConditional";

function MyStudentgoalCard({goal}){
    const [errors, setErrors] = useState([]);
    const {user, setUser} = useContext(UserContext)
    const [showValidate, setShowValidate] = useState(true)
    const [showPay, setShowPay] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const student = user.students.find(student => student.id === goal.user_id)

    useEffect(()=>{
        const adultType = (user.type)
    console.log(adultType)
    if (adultType == "Parent" && goal.validated_by_parent == true){
        setShowValidate(false)
    } else if 
        (adultType == "Educator" && goal.validated_by_educator == true){
        setShowValidate(false)
    }
    
    }, [])

    useEffect(()=>{
        if (goal.validated_by_educator == true && goal.validated_by_parent == true){
            setShowPay(true)
        }
    }, [])

    useEffect(()=>{
        const adultType = (user.type)
        if (adultType == "Parent" && goal.achieved_by_parent == true){
            setIsDisabled(true)
        }
        else if 
        (adultType == "Educator" && goal.achieved_by_educator == true){
        setIsDisabled(true)
    }
    }, [student.goals])

    
        

console.log(student.wallet)
console.log(goal)
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
        <div>
           
            <div>
                <div>
                                <em> Created on {goal.created_at}</em>
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
                                <button>Add Message</button>
                            </div>
               
            </div> 
     </div>                            

)}

export default MyStudentgoalCard
