import React, { useState, useEffect, createContext, useContext } from 'react';
import {UserContext} from "./UserContext.js"
const GoalsContext = createContext();

const GoalsProvider = ({children}) =>{
    const [goals, setGoals] = useState([]);
    const {user} = useContext(UserContext)
    useEffect(()=>{
        fetch (`/goals`).then((r)=> {
            if (r.ok) {
              r.json().then((goals)=>{
                console.log(goals)
                setGoals(goals)})
            }
          });
        }, [user]);

        console.log(goals)
        
    return(
        <GoalsContext.Provider value={{goals, setGoals}}>
            {children}
        </GoalsContext.Provider>
    )
}

export {GoalsContext, GoalsProvider}
