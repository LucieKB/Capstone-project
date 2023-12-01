import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {GoalsContext} from "../contexts/GoalsContext";
import GeneralLogin from "./GeneralLogin";
import NavBar from "./NavBar";
import Home from "./Home"
import NewGoalForm from "./Goals/NewGoalForm";
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

function App() {
  const {user, setUser} = useContext(UserContext)
  const {goals, setGoals} = useContext(GoalsContext)
  

  if (!user) return <GeneralLogin />
  
  console.log(user)
  console.log(goals)
  
  

  return(
    <>
    <NavBar />
    <main>
      <Routes>
        <Route exact path="/" element = {<Home />}/>
        <Route exact path="/students/:id" element = {<MyStudent />} />
        <Route exact path="/students/:id/me" element = {<Student />} />
        <Route exact path = "/students/:id/goals" element = {<GoalList />} />
        <Route path = "/goals/new" element = {<NewGoalForm />} />
        <Route path = "/users/mystudent" element = {<MyStudentsGoals />} />
        <Route path = "/goals/:id" element = {<GoalCard />} />
        <Route path = "/students/avatar" element = {<Avatar />} />
        <Route path = "/rewards" element = {<RewardsList />} />
        <Route path = "/rewards/new" element = {<NewRewardForm />} />
        <Route path = "/students/:id/myItems" element = {<BoughtItemsList />} />
        <Route path = "/smartGoals" element = {<SMARTGoals />}/>
        <Route path = "/setAGoal" element = {<SetAGoal />} />
        <Route path = "rewardsExplained" element ={<RewardsExplained />} />
        <Route path = "/marketPlaceExplained" element ={<MarketPlaceExplained />} />
      </Routes>
    </main>
    </>
  )
}  

export default App;

// Move the Child Sign Up to the homepage - and then have a dashboard with details :)
// @mui/material/Typography
