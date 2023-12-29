import React from "react";
import "./HomeElts.css"
import {useNavigate} from "react-router-dom"
import NewGoal from "./images/NewGoal.png"
import Validation from "./images/Validation.png"

function SetAGoal(){
    const navigate = useNavigate()

    const handleBackHome = () => {
        navigate("/")
       }

    return(
        <div>
        <button className="backBtn" onClick={handleBackHome}> 🔙 </button>
        

            <div className="text">
                <h2>How do I rate a goal?</h2>
                    <p>With XXX, the children/students ARE THE ONES SETTING THEIR OWN GOALS. Most "rewards" apps put the reponsability of goal setting in the adult's hands. But who better than the children can decide what they need and want to achieve? </p>
                    <p>With guidance and adult supervision, students create their own goal by filling out a goal form. </p>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <img src={NewGoal} />
                    </div>
                <br></br>    
           
           
                
                    <h3>A step by step explanation for goal-setting in XXX.</h3>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <img style={{border:"4px inset darkgrey", borderRadius:"18px"}} src={Validation} />
                    </div>
                    <br></br>
               
           
        
        </div>
        </div>
    )
}

export default SetAGoal