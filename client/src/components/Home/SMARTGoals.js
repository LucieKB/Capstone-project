import React from "react";
import S from "./images/S.png"
import M from "./images/M.png"
import A from "./images/A.png"
import R from "./images/R.png"
import T from "./images/T.png"
import "./HomeElts.css"
import {useNavigate} from "react-router-dom"

function SMARTGoals(){
    const navigate = useNavigate()

    const handleBackHome = () => {
        navigate("/")
       }

    return(
        <div>
        <button className="backBtn" onClick={handleBackHome}> 🔙 </button>
        <div className = "Expl-container">
            
            <div className="text">
           <h2>What is a S.M.A.R.T goal?</h2>
           <p>People in general (not only childen), have a tendency to create goals and not achieve them. Why? There are many reasons for that : maybe the goal is not defined clearly, maybe it is too hard to do <em>if not just impossible</em>, or we might not have set a timediv className="image"ne to help us achieve it. <u>S.M.A.R.T goals are here to help us set up goals for ourselves that we can achieve.</u></p> 
           </div>
           <div> 
                <div className="container">
                    <div className="image">  
                     <img id="Home-img" src={S}/>
                    </div >
                    <div className="text">
                        S = Be <u><strong>S</strong>pecific</u>. Your goal should be clear and specific. To do this, you can use the five "W" (Who/What/When/Where/Why).
                    </div> 
                </div> 
                <br></br> 

                <div className="container">
                    <div className="image">  
                        <img id="Home-img" src={M}/>
                    </div >    
                    <div className="text">
                        M = Your goal has to be <u><strong>M</strong>easurable</u>. This will help you keep track of your progress and assess how far you are in achieving it. Make sure you can answer this question when writing your goal : <em>"How will I know when my goal is accompdiv className="image"shed?"</em>
                    </div> 
                </div> 
                <br></br> 

                <div className="container">
                    <div className="image">  
                        <img id="Home-img" src={A}/>
                    </div >    
                        <div className="text">
                            A = Determine if your goal is  <u><strong>A</strong>chievable</u>. It will help to recognize if the goal is within your capabidiv className="image"ties and if you have the resources and time to reach it.
                        </div > 
                </div>
                <br></br> 

                <div className="container">
                    <div className="image">  
                        <img id="Home-img" src={R}/>
                    </div>     
                        <div className="text">
                            R = Your goal also needs to be <u><strong>R</strong>eadiv className="image"stic</u>. Is the goal worth achieving to you? Can you commit to achieving it? Is it reachable?
                        </div >
                </div>
                <br></br> 

                <div className="container">
                    <div className="image"> 
                        <img id="Home-img" src={T}/>
                    </div >    
                    <div className="text">
                        T = Finally, you need to estabdiv className="image"sh a <u><strong>T</strong>ime</u> by which you will reach your goal. A completion date holds you accountable.
                    </div> 
                </div> 
                <br></br>     
            </div>
        </div>
        </div>
    )
}

export default SMARTGoals