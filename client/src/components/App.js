import { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {GoalsContext} from "../contexts/GoalsContext";
import GeneralLogin from "./GeneralLogin";
import NavBar from "./NavBar";
import Home from "./Home"
import NewGoalForm from "./Student_View/NewGoalForm";
import GoalList from "./Student_View/GoalList";
import MyStudentsGoals from "./Goals/MyStudentsGoals";
import GoalCard from "./Student_View/GoalCard";
import MyStudent from "./Goals/MyStudent";
import Student from "./Student_View/Student";
import Avatar from "./Avatars/Avatar";
import RewardsList from "./Rewards/RewardsList";
import NewRewardForm from "./Rewards/NewRewardForm";
import BoughtItemsList from "./Rewards/BoughtItemsList";
import SMARTGoals from "./Home/SMARTGoals";
import SetAGoal from "./Home/SetAGoal";
import RewardsExplained from "./Home/RewardsExplained";
import MarketPlaceExplained from "./Home/MarketPlaceExplained";
import MyStudentGoalCard from "./Goals/MyStudentGoalCard";
import MyStudentGoalsList from "./Goals/MyStudentGoalsList";
import MyStudentsEducator from "./Goals/MyStudentsEducator";
import UpdateGoalForm from "./Student_View/UpdateGoalForm";
import BizExplanations from "./Home/BizExplanations";

function App() {
  const {user, setUser} = useContext(UserContext)
  const {goals, setGoals} = useContext(GoalsContext)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
 
  
 useEffect(()=>{
  fetch("/messages")
  .then(r => r.json())
  .then(messages => setMessages(messages))
}, [])



  if (!user) return <GeneralLogin />



  if((goals.length === 0 && user.type !== "BusinessOwner")&&(user.goals.length !== 0) ){
    console.log("no goals in App line 43")
    return(
        <div>
            Loading...
        </div>
    )
}
  
console.log("Goals in app=",goals) 

  const handleAddGoal = (myNewGoal) =>{
    setGoals([...goals, myNewGoal])
    setUser({...user, goals:[...goals, myNewGoal]})
  }

  const handleUpdateGoal = (updatedGoal) =>{
    console.log("updatedGoal in App=",updatedGoal)
    const modifiedGoals = goals.map((goal)=>{
        if(goal.id === updatedGoal.id){
            return updatedGoal
        }else{
            return goal
        }
        })
        console.log("modifiedGoals in App=",modifiedGoals)
    setGoals(modifiedGoals);
    
    const updatedUser = {...user, goals:modifiedGoals}
    setUser(updatedUser) 
}


const handlePayGoal = (updatedGoal) =>{
  const modifiedGoals = goals.map((goal)=>{
      if(goal.id === updatedGoal.id){
          return updatedGoal
      }else{
          return goal
      }
      })
  setGoals(modifiedGoals);

  const student=
  user.students.find((s)=> s.id = updatedGoal.user_id)
  const updatedStudent = [...student.goals, updatedGoal] 
  const updatedStudents = user.students.map((student) =>{
  if (updatedStudent.id === student.id){
      return updatedStudent
  } else {
      return student
  }
  })
  setUser({...user, students: updatedStudents})  
}
  

  return(
    <>
    <NavBar />
    <main>
      <Routes>
        <Route exact path="/" element = {<Home />}/>
        <Route exact path="/parents/:id/students/:student_id" element = {<MyStudent goals={goals} setGoals = {setGoals}/>} />
        <Route exact path="/students/:id/me" element = {<Student goals={goals} setGoals = {setGoals} messages={messages} setMessages={setMessages}/>} />
        <Route exact path= "/educators/mystudents/:grade" element = {<MyStudentsEducator />} />
        <Route exact path = "/students/:id/goals" element = {<GoalList goals={goals} setGoals = {setGoals}/>} />
        {/* <Route exact path = "/parents/:id/students/:student_id/goals" element = {<MyStudentGoalsList />} /> */}
        <Route exact path = "/parents/:id/students/:student_id/goals/:goal_id" element = {<MyStudentGoalCard onUpdateGoal={handleUpdateGoal} onPayGoal={handlePayGoal}  setGoals = {setGoals} messages={messages} setMessages={setMessages}/>} />
        <Route path = "/goals/new" element = {<NewGoalForm onAddGoal={handleAddGoal}/>} />
        <Route path = "/users/mystudents" element = {<MyStudentsGoals />} />
        <Route path = "/goals/:id" element = {<GoalCard onUpdateGoal={handleUpdateGoal} messages={messages} setMessages={setMessages} goals={goals} setGoals={setGoals}/>} />
        <Route path = "/goals/:id/update" element = {<UpdateGoalForm onUpdateGoal={handleUpdateGoal} />} />
        <Route path = "/students/avatar" element = {<Avatar />} />
        <Route path = "/rewards" element = {<RewardsList />} />
        <Route path = "/rewards/new" element = {<NewRewardForm />} />
        <Route path = "/students/:id/myItems" element = {<BoughtItemsList />} />
        <Route path = "/smartGoals" element = {<SMARTGoals />}/>
        <Route path = "/setAGoal" element = {<SetAGoal />} />
        <Route path = "rewardsExplained" element ={<RewardsExplained />} />
        <Route path = "/marketPlaceExplained" element ={<MarketPlaceExplained />} />
        <Route path= "/businessDirections" element ={<BizExplanations />} />
      </Routes>
    </main>
    </>
  )
}  

export default App;

// Move the Child Sign Up to the homepage - and then have a dashboard with details :)
// @mui/material/Typography
