import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import GeneralLogin from "./GeneralLogin";
import NavBar from "./NavBar";
import Home from "./Home"

function App() {
  const {user, setUser} = useContext(UserContext)

  if (!user) return <GeneralLogin />

  return(
    <>
    <NavBar />
    <main>
      <Routes>
        <Route exact path="/" element = {<Home />}/>
      </Routes>
    </main>
    </>
  )
}  

export default App;

// Move the Child Sign Up to the homepage - and then have a dashboard with details :)
// @mui/material/Typography
