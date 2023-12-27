import React, { useState, useEffect, useContext, createContext } from 'react';
import { UserContext } from "./UserContext.js";

const RewardsContext = createContext();

const RewardsProvider = ({children}) =>{
    const [rewards, setRewards] = useState([]);
    const {user} = useContext(UserContext) 
    useEffect(()=>{
        fetch (`/rewards`).then((r)=> {
            if (r.ok) {
              r.json().then((rewards)=>{
                setRewards(rewards)})
            }
          });
        }, []);

     console.log(rewards) 
       
    return(
        <RewardsContext.Provider value={{rewards, setRewards}}>
            {children}
        </RewardsContext.Provider>
    )
}

export {RewardsContext, RewardsProvider}