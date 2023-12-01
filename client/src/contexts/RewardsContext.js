import React, { useState, useEffect, createContext } from 'react';

const RewardsContext = createContext();

const RewardsProvider = ({children}) =>{
    const [rewards, setRewards] = useState([]);
    
    useEffect(()=>{
        fetch (`/rewards`).then((r)=> {
            if (r.ok) {
              r.json().then((rewards)=>{
                console.log(rewards)
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