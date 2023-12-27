import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { RewardsContext } from "../../contexts/RewardsContext";
import { useNavigate } from "react-router-dom";
import "./RewardCard.css"

function BoughtItemCard({reward, onPickUpReward}){
    const [showBuyBtn, setShowBuyBtn] = useState(false)
    const {user, setUser}= useContext(UserContext)
    const {rewards, setRewards} = useContext(RewardsContext)
    const [errors, setErrors] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false)
    const navigate = useNavigate()

 



    const handlePickUp =() =>{
        fetch(`/rewards/${reward.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  collected: true
              }),
        }).then((r) => {
            if (r.ok) {
            r.json().then((updatedReward) => onPickUpReward(updatedReward));
            } else {
            r.json().then((err)=>setErrors(err.errors))
            }

            setIsUpdating((isUpdating) => !isUpdating)
            navigate(`/rewards`)
        });    
    }

    return(
    <div className="reward-card">
            
        <ul><h3><u>My {reward.title}</u></h3></ul>
        <img src={reward.image} />
       
        <li><u>Pick-Up Location:</u> {reward.pickup_place} </li>
        <br></br>
        <div>  
        <button className="submitBtn" onClick={handlePickUp}> I Picked My {reward.title} Up</button>
        </div>
        <hr></hr>
    </div>
    
    )
}

export default BoughtItemCard