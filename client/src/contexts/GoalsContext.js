import React, { useState, useEffect, createContext } from 'react';

const GoalsContext = createContext();

const GoalsProvider = ({children}) =>{
    const [goals, setGoals] = useState([]);
    
    useEffect(()=>{
        fetch (`/goals`).then((r)=> {
            if (r.ok) {
              r.json().then((goals)=>{
                console.log(goals)
                setGoals(goals)})
            }
          });
        }, []);

        
    return(
        <GoalsContext.Provider value={{goals, setGoals}}>
            {children}
        </GoalsContext.Provider>
    )
}

export {GoalsContext, GoalsProvider}
