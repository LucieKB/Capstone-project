import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

function MyStudentGoalList(){
    const {user, setUser} = useContext(UserContext);

    return(
        <h1> ... Goals</h1>
    )
}
export default MyStudentGoalList