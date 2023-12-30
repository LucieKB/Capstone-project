import React from "react";
import "./HomeElts.css"
import {useNavigate} from "react-router-dom"
import EdId from "./images/EdId.png"


function EdExplanations(){
    const navigate = useNavigate()

    const handleBackHome = () => {
        navigate("/")
       }

    return(
        <div>
        <button className="backBtn" onClick={handleBackHome}> 🔙 </button>

        <div className="Expl-container">
            <div className= "container">
                <div className="text">
                <h2><u>Why XXX?</u></h2>
                    <p>XXX is a goal setting app where children/students ARE THE ONES SETTING THEIR OWN GOALS. Most "rewards" apps put the reponsability of goal setting in the adult's hands. But who better than the children can decide what they need and want to achieve? </p>
                    <p><strong>As educators, we often find ourselves:</strong>
                        <ul><strong>1. Not seeing the same behavior with a student in class and at home.</strong><em>(from what parents say)</em></ul></p>
                        <ul><strong>2. Having to use a behavior management app that doesn't really fit our needs and finding ourselves catching up with point-giving at the end of the week, with students not really able to identify which behavior is supposed to be positively reinforced by the points earned.</strong></ul>
                        <ul><strong>3. Spend a lot of our classroom budget (or our own money) buying rewards.</strong></ul>
                    <p>In XXX, with guidance and adult supervision, students create their own goals that get validated and monitored by both <u>parents</u> and <u>educators</u>. </p>
                    <p>Once they achieve their goals, they get "paid" by parents and educators (only if they agree that the goal has been reached).</p>
                    <p>The students earn stars in their wallets that they can later spend in the marketplace where <u>parents</u> will have posted items.</p>
                    
                    
               
                    
                    <div className="text" style={{paddingLeft:"0px"}}>
                        <h2><u>Getting started with XXX.</u></h2>
                        <h3><em>How do I get students linked to my account?</em></h3>
                        <p> When they are first signed-up by their parents, students will see this box at the bottom of their Homepage. They need to enter the red Id number (<span style={{color:"red", fontWeight:"600" }}>#Id</span>)that you have on the right-hand side of your navigation bar. </p>
                    <div style={{display:"flex", justifyContent:"center"}}>
                    <img src={EdId} style={{border:"black solid 1px", marginTop:"20px", marginRight:"50px", marginLeft:"50px"}}/>
                    </div>
                    <br></br>
                    <h3><em>Who sets the goals, and when do they do it?</em></h3>
                    <p>It is suggested to take some time in class to have students set their goals. </p>
                    <p><strong>Setting a goal weekly on Monday morning</strong> at the beginning of the year can prove to be very efficient. As time goes by, students get used to writing <a href="/smartGoals">S.M.A.R.T goals</a> on their own and you won't have to take time out of your day to guide them.</p>
                    <br></br>
                    <h3><em>As an educator, what do I have to do next?</em></h3>
                    <p> All that you have to do next is click on a grade in your navigation bar, and look at your students list.</p>
                    <p><li> If a student has a goal that <strong>needs to be <a href="/setAGoal">validated</a></strong>, you will see a green check ✅ next to their name.</li></p>
                    <p><li> If a student has a goal that they say they achieved and for which <strong><a href="rewardsExplained">payment</a> is required</strong>, you will see a small money bag 💰 next to their name.</li></p>
                    <p><strong>Remember that you DON'T HAVE to validate of pay for a goal if you don't think it has been achieved or set properly.</strong>In this case <u>send a message</u> to your student to explain the reason for that action, and they can update their goal or keep on working on it.</p>
                    </div>
                        
                    </div>
                </div>
                    <br></br>
               
           
        </div>
        </div>
        
        
    )
}

export default EdExplanations