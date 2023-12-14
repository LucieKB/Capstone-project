import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { RewardsContext } from "../../contexts/RewardsContext";
import { useNavigate } from "react-router-dom";

import "./RewardCard.css"

function RewardCard({reward}){
    const [showBuyBtn, setShowBuyBtn] = useState(false)
    const {user, setUser}= useContext(UserContext)
    const {rewards, setRewards} = useContext(RewardsContext)
    const [errors, setErrors] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(()=>{
        if(user.type === "Student"){
            setShowBuyBtn(!showBuyBtn)
        }
    }, [])

    const onUpdateReward = (updatedReward) =>{
        const modifiedReward = 
        reward.id === updatedReward.id?
        (updatedReward):(reward)
        setRewards({...rewards, modifiedReward})
    }

    const handleBuyReward =() =>{
        alert(`Are you sure you want to buy the ${reward.title}?`)
        //rescue
        fetch(`/rewards/${reward.id}/buy`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  available: false,
                  buyer: user.id
              }),
        }).then((r) => {
            if (r.ok) {
            r.json().then((updatedReward) => onUpdateReward(updatedReward));
            } else {
            r.json().then((err)=>setErrors(err.errors))
            }

            setIsUpdating((isUpdating) => !isUpdating)
        });    
    }

    return(
        <>
        <div className="reward-card">
            
            <ul><h4>{reward.title}</h4></ul>
            <img src={reward.image} />
            <ul><em> {reward.description} </em></ul>
            <li><u>Item's Condition:</u>{reward.reward_condition}</li>
            <li><u>Price:</u>{reward.price} ⭐️</li>
            <div>
                {showBuyBtn?
            (<button className="buy-Btn" onClick={handleBuyReward}>I Want To Buy This Item !</button>):(null)}
            </div>
            
        </div>
        <hr></hr>
        </>
    )
}

export default RewardCard