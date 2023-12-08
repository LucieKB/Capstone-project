import React, {useState} from "react";
import LoginForm from "./LoginForm";
import SignUpHomePage from "./SignUpHomePage";
import RewardsList from "./Rewards/RewardsList";
import "./GeneralLogin.css"

function GeneralLogin(){
    const [showLogin, setShowLogin] = useState(false)

return(
    <>
        <div className="header">
            <div className="fixed"><h2>Goals App :</h2></div>
            <ul className="typed">
                <li><span>Le gamin au centre</span></li>
                <li><span>Avec tous les adultes qui l'aident...</span></li>  
            </ul>
        </div>
        < br />  

    <div>
        {showLogin ? 
            (<div>
                <LoginForm />
                <div className= "bottom-wrap">
                    <h3>Don't have an account?</h3>
                    <button className="submitBtn" onClick={() => setShowLogin(false)}>Sign Up</button>
                </div>
            </div>)
            : 
            (<div>
                <SignUpHomePage />
                <div className= "bottom-wrap">
                    <h3>Already have an account?</h3>
                    <button className="submitBtn" onClick={() => setShowLogin(true)}>Log In</button>
                </div>
            </div>)
        }
        {/* <div>
            <RewardsList />
        </div> */}
    </div>
    </>
)    

}

export default GeneralLogin;