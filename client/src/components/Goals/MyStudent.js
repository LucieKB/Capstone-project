import React, {useContext, useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";
import MyStudentGoalsList from "./MyStudentGoalsList";
import dateFormat from "dateformat";
import "./MyStudent.css"

function MyStudent({goals, setGoals}){
    const {user, setUser} = useContext(UserContext)
    
    const {student_id}=useParams()
    const student = user.students.find(student => student.id === parseInt(student_id))
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
    const [otherAdult, setOtherAdult] = useState("")
    const myStudentGoals = goals.filter((g)=> g.user_id === student.id)
    const myStudentActiveGoals = myStudentGoals.filter((goal)=>{
        const deadline = dateFormat(goal.deadline, "isoDateTime")
        return(goal.achieved === false && deadline>today)
    })

    console.log("goals=",goals)

    useEffect(()=>{
        if (user.type === "Parent"){
            setOtherAdult(" my child's teacher")
        }
        else if (user.type === "Educator"){
            setOtherAdult(" my student's parent")
        }
    })

    if(!goals){
        console.log("loading", goals)
        return(
            
            <div>
                ...Loading
            </div>
        )
    }

    const onUpdategoal = (updatedgoal) =>{
        console.log(updatedgoal)
        const modifiedgoals = goals.map((goal)=>{
            if(goal.id === updatedgoal.id){
                return updatedgoal
            }else{
                return goal
            }
            })
        setGoals(modifiedgoals)
        
        const updatedStudent = [...student.goals, modifiedgoals] 
        console.log(updatedStudent)
        const updatedStudents = user.students.map((student) =>{
        if (updatedStudent.id === student_id){
            return updatedStudent
        } else {
            return student
        }
        })
        setUser({...user, students: updatedStudents}) 
    }


const goalsINeedToValidate = myStudentActiveGoals.filter((g) => {
    if (user.type === "Parent" && g.validated_by_parent === false){
        return g
    } else if (user.type === "Educator" && g.validated_by_educator === false){
        return g
    }
})


const goalsIValidated = myStudentActiveGoals.filter((g) => {
    if ((user.type === "Parent" && g.validated_by_parent === true) && (g.validated_by_educator === false)){
        return g
    } else if ((user.type === "Educator" && g.validated_by_educator === true)&&(g.validated_by_parent === false)){
        return g
    }
})

const goalsINeedToPay = myStudentGoals.filter((g) => {
    if ((user.type === "Parent" && g.achieved_by_parent === false) && (g.achieved === true && g.validated_by_educator=== true)) {
        return g
    } else if ((user.type === "Educator" && g.achieved_by_educator === false) && (g.achieved === true && g.validated_by_parent=== true)){
        return g
    }
})

console.log("goalsINeedToPay=",goalsINeedToPay)

const goalsInTheWorks = myStudentActiveGoals.filter((g) => {
    if ((g.validated_by_parent === true && g.validated_by_educator === true) && g.achieved === false) {
        return g
}})

console.log("myStudentGoal in MyStudent=",myStudentGoals)

    return(
        <div style={{height:"100%"}}>
      
        <div className="goal-wrapper">
           
            <div style={{marginTop:"50px"}} className="parentViewActiveGoal-inner">
            <h1>{student.username}'s goals</h1>
<div style={{marginLeft:"10px"}}>
    <p style={{fontSize:"16px"}}> Here is a List of {student.username}'s goals. You can see which goals are awaiting validation, which goals {student.username} is currently working on, and the goals that {student.username} marked as achieved but that you haven't paid yet. </p>
    <p style={{fontSize:"16px"}}><strong>Remember that you are free to validate/pay <u>OR NOT</u>. </strong> If you judge that a goal is either not clearly defined, that maybe the value of the goal was not appropriatly chosen, or that you haven't seen this goal being achieved, you can message {student.username} and tell them so. </p>
    <p style={{fontSize:"16px"}}>If a goal has a < span style={{backgroundColor:"#66FF00"}}> green background</span>, your student still has < span style={{backgroundColor:"#66FF00"}}>over a week</span> before the deadline, the background will then turn < span style={{backgroundColor:"#FFA500"}}>orange</span> meaning that there is < span style={{backgroundColor:"#FFA500"}}>between one and three days</span> for the student to achieve that goal.<u>It might be time for you to message {student.username} and ask for an update ...</u> During the < span style={{backgroundColor:"#FF003F"}}>last 24 hours</span> the background will turn < span style={{backgroundColor:"#FF003F"}}>red</span> and the time remaining will be counted in hours.</p>
</div>
            
            </div>

            <div className="parentViewActiveGoal-inner">
                    <div className="inner-left-left">
<h3 style={{textAlign:"center"}}> 🛑 <u>Goals that I need to validate : </u></h3>
            {goalsINeedToValidate.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentGoalsList goal = {goal} student={student} onUpdategoal={onUpdategoal}/> 
                   </div> 
                )
            })}
            </div>
            <div className="inner-left">
<h3> ⚙️ <u>Goals that I validated but awaiting validation from {otherAdult} : </u></h3>
            {goalsIValidated.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentGoalsList goal = {goal} student={student} onUpdategoal={onUpdategoal}/> 
                   </div>  
                )
            })}</div>

<div className="inner-right">
<h3> ⚙️⚙️ <u>Goals that {student.username} is currently working on : </u></h3>
            {goalsInTheWorks.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentGoalsList goal = {goal} student={student} onUpdategoal={onUpdategoal}/> 
                   </div>  
                )
            })}</div>
<div className="inner-right-right">
<h3> 💰 <u>Goals that {student.username} achieved but that I haven't paid yet : </u></h3>
            {goalsINeedToPay.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentGoalsList goal = {goal} student={student} onUpdategoal={onUpdategoal}/> 
                   </div>  
                )
            })}</div>
           {/* </div> */}
        </div>
        </div>
        </div>
    )
}

export default MyStudent