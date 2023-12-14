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
    const [mySchoolRewards, setMySchoolReward] = useState([])
    const navigate = useNavigate()

    console.log(rewards)

    useEffect(()=>{
        if(user.type === "Student"){
            setShowAddRBtn(!showAddRBtn)
            const filteredRewards = rewards.filter((r) => r.pickup_place === user.school)
            setRewards(filteredRewards)
        }
        else {setRewards(rewards)}
    }, [])


    const handleNewRewardForm = () =>{
        console.log("clicked")
       navigate("/rewards/new")
    }

    

    const availableRewards = rewards.filter((r)=>{
        if(r.available === true){
            return r
        } 
    })


    const rewardsToDisplay = availableRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} />)

    const techRewards = availableRewards.filter((r)=>r.reward_category === "Tech")
    const techRewardsToDisplay = techRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} />)

    const gameRewards = availableRewards.filter((r)=>r.reward_category === "Games")
    const gameRewardsToDisplay = gameRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} />)

    const bookRewards = availableRewards.filter((r)=>r.reward_category === "Books")
    const bookRewardsToDisplay = bookRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} />)

    const clothingRewards = availableRewards.filter((r)=>r.reward_category === "Clothing")
    const clothingRewardsToDisplay = clothingRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} />)

    const outdoorsRewards = availableRewards.filter((r)=>r.reward_category === "Outdoors")
    const outdoorsRewardsToDisplay = outdoorsRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} />)

    const giftCardRewards = availableRewards.filter((r)=>r.reward_category === "Gift-Card")
    const giftCardRewardsToDisplay = giftCardRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} />)

    const otherRewards = availableRewards.filter((r)=>r.reward_category === "Other")
    const otherRewardsToDisplay = otherRewards.map((reward)=> <RewardCard key={reward.id} reward={reward} />)

    console.log(gameRewardsToDisplay)

    return(
        <div>
            <h1 style={{textAlign:"center"}}>Available Items:</h1>
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
            {showAddRBtn?
            (<button className="submitBtn" onClick={handleNewRewardForm}>Add an Item</button>):(null)}
        </div>
    )
}

export default RewardsList

