import React, {useContext, useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";
import MyStudentGoalsList from "./MyStudentGoalsList";
import dateFormat from "dateformat";

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
    if ((user.type === "Parent" && g.achieved_by_parent === false) && g.achieved === true) {
        return g
    } else if ((user.type === "Educator" && g.achieved_by_educator === false) && g.achieved === true){
        return g
    }
})

const goalsInTheWorks = myStudentActiveGoals.filter((g) => {
    if ((g.validated_by_parent === true && g.validated_by_educator === true) && g.achieved === false) {
        return g
}})

console.log("myStudentGoal in MyStudent=",myStudentGoals)

    return(
        <div>
            <h2>{student.username}'s goals</h2>

<h3> 🛑 <u>Goals that I need to validate : </u></h3>
            {goalsINeedToValidate.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentGoalsList goal = {goal} student={student} onUpdategoal={onUpdategoal}/> 
                   </div> 
                )
            })}

<h3> ⚙️ <u>Goals that I validated but awaiting validation from {otherAdult} : </u></h3>
            {goalsIValidated.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentGoalsList goal = {goal} student={student} onUpdategoal={onUpdategoal}/> 
                   </div>  
                )
            })}

<h3> ⚙️⚙️ <u>Goals that {student.username} is currently working on : </u></h3>
            {goalsInTheWorks.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentGoalsList goal = {goal} student={student} onUpdategoal={onUpdategoal}/> 
                   </div>  
                )
            })}

<h3> 💰 <u>Goals that {student.username} achieved but that I haven't paid yet : </u></h3>
            {goalsINeedToPay.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentGoalsList goal = {goal} student={student} onUpdategoal={onUpdategoal}/> 
                   </div>  
                )
            })}
           
        </div>
    )
}

export default MyStudent