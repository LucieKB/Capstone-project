import React, {useState, useContext} from "react"
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";
import { useNavigate } from "react-router-dom"
import ArchievedGoalCard from "./ArchievedGoalCard";
import dateFormat from "dateformat";
import ExpiredGoalCard from "./ExpiredGoalCard";
import NewGoalForm from "../Goals/NewGoalForm";
import GoalList from "./GoalList"
import UnpaidGoals from "./UnpaidGoals";



function Student(){
    const {user, setUser} = useContext(UserContext)
    const {goals, setGoals} = useContext(GoalsContext)
    const [seeArchived, setSeeArchived] = useState(false)
    const [seeExpired, setSeeExpired] = useState(false)
    const [seeGoalForm, setSeeGoalForm] = useState(false)
    const [seeActiveGoals, setSeeActiveGoals] = useState(false) //doesn't work when set on true
    const [seeUnpaidGoals, setSeeUnpaidGoals] = useState(false)
    const navigate = useNavigate()

    
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
    const myArchievedGoals = goals.filter((goal) => goal.achieved_by_parent === true || goal.achieved_by_educator === true)
    const myExpiredGoals=goals.filter((goal) =>{
        const deadline = dateFormat(goal.deadline, "isoDateTime")
        return(goal.achieved === false && deadline<today)
    })
    const myActiveGoals = goals.filter((goal)=>{
        const deadline = dateFormat(goal.deadline, "isoDateTime")
        return(goal.achieved === false && deadline>today)
    })
    const myAchievedGoals = goals.filter((goal)=>{
        const deadline = dateFormat(goal.deadline, "isoDateTime")
        return(goal.achieved === true && deadline>today)
    })
    const myGoalsAwaitingPayment = myAchievedGoals.filter((goal)=>{
        return(goal.achieved_by_parent !== true || goal.achieved_by_educator !== true)
    })
    console.log(goals)
    console.log(myAchievedGoals)
    console.log(myGoalsAwaitingPayment)


    // const handleClickCreateGoal = () =>{
    //     navigate("/goals/new")
    // }

    // const handleClickMyList = () => {
    //     navigate (`students/${user.id}/goals`)
    // }

    return(
        <div>
            <div>
            <button onClick={() =>{
             setSeeGoalForm(!seeGoalForm) 
             setSeeActiveGoals(false) 
             setSeeArchived(false) 
             setSeeExpired(false)
             setSeeUnpaidGoals(false)
            } }> {seeGoalForm?("Hide the Form"):("Create a New Goal")} </button>
            
            <button onClick={() =>{
              setSeeActiveGoals(!seeActiveGoals) 
              setSeeGoalForm(false) 
              setSeeArchived(false) 
              setSeeExpired(false) 
              setSeeUnpaidGoals(false)
            } }>{seeActiveGoals? ("Hide my Active Goal's List"):("Show Me the Goals I'm Working On!")} </button>

            <button onClick={() => {
                setSeeArchived(!seeArchived)
                setSeeActiveGoals(false) 
                setSeeGoalForm(false) 
                setSeeExpired(false)
                setSeeUnpaidGoals(false)
            }}> {seeArchived? ("Hide My Archieved Goals"):("Show My Archieved Goals")} </button>
            
            <button onClick={() => {
                setSeeExpired(!seeExpired)
                setSeeActiveGoals(false) 
                setSeeArchived(false) 
                setSeeGoalForm(false)
                setSeeUnpaidGoals(false)
            }}> {seeExpired? ("Hide My Expired Goals"):("Show My Expired Goals")} </button>

            <button onClick={() => {
                setSeeExpired(false)
                setSeeActiveGoals(false) 
                setSeeArchived(false) 
                setSeeGoalForm(false)
                setSeeUnpaidGoals(!seeUnpaidGoals)
            }}> {seeExpired? ("Hide My Goals Awaiting Payment"):("Show My Goals Awaiting Payment")} </button>
            </div>
            {seeGoalForm?
            ( <NewGoalForm />
            ):(null)}

            {seeActiveGoals?
            ( <GoalList goals={myActiveGoals}/>
            ):(null)}

            {seeArchived?
            ( <ArchievedGoalCard goals={myArchievedGoals}/>
            ):(null)}

            {seeExpired?
            ( <ExpiredGoalCard goals={myExpiredGoals}/>
            ):(null)}

            {seeUnpaidGoals?
            ( <UnpaidGoals goals={myGoalsAwaitingPayment}/>
            ):(null)}
        </div>
    )
}
export default Student