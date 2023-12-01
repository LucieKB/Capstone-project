import React, {useEffect, useContext, useState} from "react";
import { RewardsContext } from "../../contexts/RewardsContext";
import { UserContext } from "../../contexts/UserContext";
import BoughtItemCard from "./BoughtItemCard";

function BoughtItemsList(){
    const {rewards, setRewards} = useContext(RewardsContext)
    const {user} = useContext(UserContext)
    const [myRewards, setMyRewards] = useState([])

    useEffect(()=>{
        const filteredRewards = rewards.filter((r) => r.buyer === user.id && r.collected !== true)
        setMyRewards(filteredRewards)
    },[])

    const itemsToDisplay = myRewards.map((r)=>  <BoughtItemCard key={r.id} reward={r} />)

    return(
        <div>
            {itemsToDisplay}
        </div>
    )
}

export default BoughtItemsList