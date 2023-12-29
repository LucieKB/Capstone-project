import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { RewardsContext } from "../../contexts/RewardsContext";
import RewardCard from "./RewardCard"
import { useNavigate } from "react-router-dom";
import "./RewardsList.css"



function RewardsList(){
    const {user} = useContext(UserContext)
    const {rewards, setRewards} = useContext(RewardsContext)
    const [showAddRBtn, setShowAddRBtn] = useState(true)
    const navigate = useNavigate()

    console.log(rewards)

    useEffect(()=>{
        if(user.type === "Student"){
            setShowAddRBtn(false)
        }
    }, [])


    const handleNewRewardForm = () =>{
        console.log("clicked")
       navigate("/rewards/new")
    }

    const handleUpdateReward = (updatedReward) =>{
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
       navigate(`/students/${user.id}/myItems`)
    } 
   

    const availableRewards = rewards.filter((r)=>{
        if(user.type === "Student"){
        if(r.available === true && r.pickup_place === user.school){
            return r
        } }
        else if (user.type === "Parent" || user.type === "Educator" || user.type === "BusinessOwner"){
            if(r.available === true ){
                return r
            } 
        }
    })

    console.log("availableRewards=",availableRewards)

    const techRewards = availableRewards.filter((r)=>r.reward_category === "Tech")
    const techRewardsToDisplay = techRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} onUpdateReward={handleUpdateReward}/>)

    const gameRewards = availableRewards.filter((r)=>r.reward_category === "Games")
    const gameRewardsToDisplay = gameRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} onUpdateReward={handleUpdateReward}/>)

    const bookRewards = availableRewards.filter((r)=>r.reward_category === "Books")
    const bookRewardsToDisplay = bookRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} onUpdateReward={handleUpdateReward}/>)

    const clothingRewards = availableRewards.filter((r)=>r.reward_category === "Clothing")
    const clothingRewardsToDisplay = clothingRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} onUpdateReward={handleUpdateReward}/>)

    const outdoorsRewards = availableRewards.filter((r)=>r.reward_category === "Outdoors")
    const outdoorsRewardsToDisplay = outdoorsRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} onUpdateReward={handleUpdateReward}/>)

    const giftCardRewards = availableRewards.filter((r)=>r.reward_category === "Gift-Card")
    const giftCardRewardsToDisplay = giftCardRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} onUpdateReward={handleUpdateReward}/>)

    const otherRewards = availableRewards.filter((r)=>r.reward_category === "Other")
    const otherRewardsToDisplay = otherRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} onUpdateReward={handleUpdateReward}/>)

    

    return(
        <div className="table-container">
            <br></br>
            <h1 style={{textAlign:"center", backgroundColor:"white"}}><u>Available Items:</u></h1>
            <div>
            <table>
                <thead>
                    <tr>
                        <th>Games</th>
                        <th>Books</th>
                        <th>Tech</th>
                        <th>Clothing</th>
                        <th>Outdoors</th>
                        <th>Gift-Cards</th>
                        <th>Other</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{gameRewardsToDisplay}</td>
                        <td>{bookRewardsToDisplay}</td>
                        <td>{techRewardsToDisplay}</td>
                        <td>{clothingRewardsToDisplay}</td>
                        <td>{outdoorsRewardsToDisplay}</td>
                        <td>{giftCardRewardsToDisplay}</td>
                        <td>{otherRewardsToDisplay}</td>
                    </tr>
                </tbody>
            
            </table>
        </div>
            {showAddRBtn?
            (<button className="submitBtn" style={{marginTop:"20px"}} onClick={handleNewRewardForm}>Add an Item</button>):(null)}
        </div>
    )
}

export default RewardsList

