import React from "react";
import S from "./images/S.png"
import M from "./images/M.png"
import A from "./images/A.png"
import R from "./images/R.png"
import T from "./images/T.png"

function SMARTGoals(){
    return(
        <div style={{border:"solid 2px blue", marginLeft:"20px"}}>
           <h2>What is a S.M.A.R.T goal?</h2>
           <p>People in general (not only childen), have a tendency to create goals and not achieve them. Why? There are many reasons for that : maybe the goal is not defined clearly, maybe it is too hard to do <em>if not just impossible</em>, or we might not have set a timeline to help us achieve it. <u>S.M.A.R.T goals are here to help us set up goals for ourselves that we can achieve.</u></p> 
           
           <div> 
                <li>  
                    <img src={S}/><span>S = Be <u><strong>S</strong>pecific</u>. Your goal should be clear and specific. To do this, you can use the five "W" (Who/What/When/Where/Why).</span> 
                </li> 
                <br></br> 
                <li>  
                    <img src={M}/><span>M = Your goal has to be <u><strong>M</strong>easurable</u>. This will help you keep track of your progress and assess how far you are in achieving it. Make sure you can answer this question when writing your goal : <em>"How will I know when my goal is accomplished?"</em></span> 
                </li> 
                <br></br> 
                <li>  
                    <img src={A}/><span>A = Determine if your goal is  <u><strong>A</strong>chievable</u>. It will help to recognize if the goal is within your capabilities and if you have the resources and time to reach it.</span> 
                </li> 
                <br></br> 
                <li>  
                    <img src={R}/><span>R = Your goal also needs to be <u><strong>R</strong>ealistic</u>. Is the goal worth achieving to you? Can you commit to achieving it? Is it reachable?</span> 
                </li> 
                <br></br> 
                <li>  
                    <img src={T}/><span>T = Finally, you need to establish a <u><strong>T</strong>ime</u> by which you will reach your goal. A completion date holds you accountable. .</span> 
                </li> 
                <br></br> 
                
            </div>
        </div>
    )
}

export default SMARTGoals