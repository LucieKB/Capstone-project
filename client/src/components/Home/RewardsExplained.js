import React from "react";
import GreenStars from "./images/GreenStars.png"
import OrangeStars from "./images/OrangeStars.png"
import RedStars from "./images/RedStars.png"
import Pay from "./images/Pay.png"

function RewardsExplained(){
    return(
        <div style={{border:"solid 2px yellow", marginLeft:"20px"}}>
            <div>
                <h2>How do rewards work?</h2>
                    <p> Every goal now has a star value : from 1 to 5, depending on how challenging it will be to achieve that goal. </p>. 
                    <p>1. Once a student has created a goal, adults on both sides (parent and educator) MUST validate it for the goal to be active. At that point the goal's value will appear in red. If you think that for some reason the goal is not ready to be validated (not fulfilling the S.M.A.R.T goal requirement, value too high or too low...), you can say so in a message and send it back for the student to review.
                        <img src={RedStars} />
                    </p>
                    <p>2. Once validated by ONE adult, the goals value will turn to orange. You can either validate the goal if you weren't the adult validating it, wait on the other adult to validate it, or send a message to your student/child.
                        <img src={OrangeStars} />
                    </p>
                    <p>3. Once validated by BOTH adults, the goal becomes active and the starts are now green. Your student/child now works on it : you can check in or give feedback using the message button.
                        <img src={GreenStars} />
                    </p>
                    <p>4. The student is in control to change a goal's status to "achieved". You will see a "Pay Student ... ☆" button appear. It is up to you to agree with them and pay half of the goal's value (the other half is given by the other adult), or send a message to the student explaining why you don't think they have achieved their goal yet.
                        <img src={Pay} />
                    </p>
                <br></br>    
            </div>
        </div>
        
    )
}

export default RewardsExplained