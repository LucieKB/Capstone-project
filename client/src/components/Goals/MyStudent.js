import React, {useContext, useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import MyStudentgoalCard from "./MyStudentGoalCard";
import dateFormat from "dateformat";

function MyStudent(){
    const {user, setUser} = useContext(UserContext)
    const {id}=useParams()
    const student = user.students.find(student => student.id === parseInt(id))
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
    const [otherAdult, setOtherAdult] = useState("")
    const myStudentGoals = student.goals
    const myStudentActiveGoals = myStudentGoals.filter((goal)=>{
        const deadline = dateFormat(goal.deadline, "isoDateTime")
        return(goal.achieved === false && deadline>today)
    })

    useEffect(()=>{
        if (user.type === "Parent"){
            setOtherAdult(" my child's teacher")
        }
        else if (user.type === "Educator"){
            setOtherAdult(" my student's parent")
        }
    })


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



    return(
        <div>
            <h2>{student.username}'s goals</h2>

<h3> 🛑 <u>Goals that I need to validate : </u></h3>
            {goalsINeedToValidate.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentgoalCard goal = {goal}/> 
                   </div> 
                )
            })}

<h3> ⚙️ <u>Goals that I validated but awaiting validation from {otherAdult} : </u></h3>
            {goalsIValidated.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentgoalCard goal = {goal}/> 
                   </div>  
                )
            })}

<h3> ⚙️⚙️ <u>Goals that {student.username} is currently working on : </u></h3>
            {goalsInTheWorks.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentgoalCard goal = {goal}/> 
                   </div>  
                )
            })}

<h3> 💰 <u>Goals that {student.username} achieved but that I haven't paid yet : </u></h3>
            {goalsINeedToPay.map((goal) => {
                return(
                    <div key={goal.id}>
                   <MyStudentgoalCard goal = {goal}/> 
                   </div>  
                )
            })}
           
        </div>
    )
}

export default MyStudent