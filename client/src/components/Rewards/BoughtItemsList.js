import React, {useEffect, useContext, useState} from "react";
import { RewardsContext } from "../../contexts/RewardsContext";
import { UserContext } from "../../contexts/UserContext";
import BoughtItemCard from "./BoughtItemCard";
import "./BoughtItems.css"

function BoughtItemsList(){
    const {rewards, setRewards} = useContext(RewardsContext)
    const {user} = useContext(UserContext)
    const [myRewards, setMyRewards] = useState([])

    useEffect(()=>{
        const filteredRewards = rewards.filter((r) => r.buyer === user.id && r.collected !== true)
        setMyRewards(filteredRewards)
    },[])

    const handlePickUpReward = (updatedReward) =>{
        console.log(updatedReward)
        const modifiedRewards = rewards.map((r)=>{
                    if (r.id === updatedReward.id){
                        return updatedReward
                    } else {
                        return r
                    }
                })
                console.log(modifiedRewards)
               setRewards(modifiedRewards)
    }

    console.log("myRwards=",myRewards)

    const itemsToDisplay = myRewards.map((r)=>  <BoughtItemCard key={r.id} reward={r} onPickUpReward={handlePickUpReward}/>)

    return(
        <div className="boughtItems-ctn">
            {itemsToDisplay}
        </div>
    )
}

export default BoughtItemsList