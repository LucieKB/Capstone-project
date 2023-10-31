import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import GeneralLogin from "./GeneralLogin";

function App() {
  const {user, setUser} = useContext(UserContext)

  if (!user) return <GeneralLogin />
}  

export default App;
