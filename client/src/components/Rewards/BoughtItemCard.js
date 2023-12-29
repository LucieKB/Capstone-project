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
        <div className="reward-card-ctn">
    <div className="boughtReward-card">
            
        <ul><h3><u>My {reward.title}</u></h3></ul>
        <img style={{height:"50px", width:"50px"}} src={reward.image} />
       
        <li><u>Pick-Up Location:</u><p></p> {reward.pickup_place} </li>
        <br></br>
        <div>  
        <button className="submitBtn" onClick={handlePickUp}> I Picked My {reward.title} Up</button>
        </div>
        <hr></hr>
    </div>
    </div>
    )
}

export default BoughtItemCard