import React, {useState} from "react";
import LoginForm from "./LoginForm";
import SignUpHomePage from "./SignUpHomePage";
import RewardsList from "./Rewards/RewardsList";

function GeneralLogin(){
    const [showLogin, setShowLogin] = useState(false)

return(
    <div>
        {showLogin ? 
            (<div>
                <LoginForm />
                <div className= "bottom-wrap">
                    <h3>Don't have an account?</h3>
                    <button className="SignUp-Btn" onClick={() => setShowLogin(false)}>Sign Up</button>
                </div>
            </div>)
            : 
            (<div>
                <SignUpHomePage />
                <div className= "bottom-wrap">
                    <h3>Already have an account?</h3>
                    <button className="SignUp-Btn" onClick={() => setShowLogin(true)}>Log In</button>
                </div>
            </div>)
        }
        {/* <div>
            <RewardsList />
        </div> */}
    </div>
)    

}

export default GeneralLogin;