import React, {useState, useContext} from "react"
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom"
import ArchievedGoalCard from "./ArchievedGoalCard";
import dateFormat from "dateformat";
import ExpiredGoalCard from "./ExpiredGoalCard";
import NewGoalForm from "../Goals/NewGoalForm";
import GoalList from "./GoalList"



function Student({goals}){
    const {user, setUser} = useContext(UserContext)
    const [seeArchived, setSeeArchived] = useState(false)
    const [seeExpired, setSeeExpired] = useState(false)
    const [seeGoalForm, setSeeGoalForm] = useState(false)
    const [seeActiveGoals, setSeeActiveGoals] = useState(false) //doesn't work when set on true
    const navigate = useNavigate()

    
    const now = new Date()
    const today = dateFormat(now, "isoDateTime")
    const myGoals = goals.filter((goals) => goals.user_id === user.id)
    const myArchievedGoals = myGoals.filter((goal) => goal.achieved_by_parent === true || goal.achieved_by_educator === true)
    const myExpiredGoals=myGoals.filter((goal) =>{
        const deadline = dateFormat(goal.deadline, "isoDateTime")
        return(goal.achieved === false && deadline<today)
    })
    const myActiveGoals = myGoals.filter((goal)=>{
        const deadline = dateFormat(goal.deadline, "isoDateTime")
        return(goal.achieved === false && deadline>today)
    })
    console.log(myExpiredGoals)
    console.log(myActiveGoals)


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
            } }> {seeGoalForm?("Hide the Form"):("Create a New Goal")} </button>
            
            <button onClick={() =>{
              setSeeActiveGoals(!seeActiveGoals) 
              setSeeGoalForm(false) 
              setSeeArchived(false) 
              setSeeExpired(false) 
            } }>{seeActiveGoals? ("Hide my Active Goal's List"):("Show Me the Goals I'm Working On!")} </button>

            <button onClick={() => {
                setSeeArchived(!seeArchived)
                setSeeActiveGoals(false) 
                setSeeGoalForm(false) 
                setSeeExpired(false)
            }}> {seeArchived? ("Hide My Archieved Goals"):("Show My Archieved Goals")} </button>
            
            <button onClick={() => {
                setSeeExpired(!seeExpired)
                setSeeActiveGoals(false) 
                setSeeArchived(false) 
                setSeeGoalForm(false)
            }}> {seeExpired? ("Hide My Expired Goals"):("Show My Expired Goals")} </button>
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
        </div>
    )
}
export default Student