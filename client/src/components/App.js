import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import GeneralLogin from "./GeneralLogin";
import NavBar from "./NavBar";
import Home from "./Home"
import NewGoalForm from "./Goals/NewGoalForm";
import GoalList from "./Goals/GoalList";
import MyStudentsGoals from "./Goals/MyStudentsGoals";
import GoalCard from "./Goals/GoalCard";
import MyStudentGoalCard from "./Goals/MyStudentGoalCard";

function App() {
  const {user, setUser} = useContext(UserContext)

  if (!user) return <GeneralLogin />

  return(
    <>
    <NavBar />
    <main>
      <Routes>
        <Route exact path="/" element = {<Home />}/>
        <Route path = "/goals" element = {<GoalList />} />
        <Route path = "/goals/new" element = {<NewGoalForm />} />
        <Route path = "/parents/mystudent" element = {<MyStudentsGoals />} />
        {/* <Route path = "/students/:student_id/goals/:id" element = {<MyStudentGoalCard />} />  */}
        <Route path = "/goals/:id" element = {<GoalCard />} />
      </Routes>
    </main>
    </>
  )
}  

export default App;

// Move the Child Sign Up to the homepage - and then have a dashboard with details :)
// @mui/material/Typography
