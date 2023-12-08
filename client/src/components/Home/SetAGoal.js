import React from "react";
import "./HomeElts.css"
import {useNavigate} from "react-router-dom"

function SetAGoal(){
    const navigate = useNavigate()

    const handleBackHome = () => {
        navigate("/")
       }

    return(
        <div>
        <button className="backBtn" onClick={handleBackHome}> 🔙 </button>
        <div className = "Expl-container">

            <div className="text">
                <h2>How do I rate a goal?</h2>
                    <p>With XXX, the children/students ARE THE ONES SETTING THEIR OWN GOALS. Most "rewards' apps put the reponsability of goal setting in the adult's hands. But who better than the children can decide what they need and want to achieve? </p>
                <br></br>    
            </div> 
            <div className="container">
                <div className="text">
                    <h3>A step by step guide to set a goal with XXX.</h3>
                    <em>Video walkthrough of goal-setting in the app.</em>
                    <br></br>
                </div> 
            </div>
        
        </div>
        </div>
    )
}

export default SetAGoal