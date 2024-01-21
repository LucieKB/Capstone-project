import React, {useState} from "react";
import LoginForm from "./LoginForm";
import SignUpHomePage from "./SignUpHomePage";
import "./GeneralLogin.css"

function GeneralLogin(){
    const [showLogin, setShowLogin] = useState(false)

return(
    <>
        <div className="header">
            <div className="fixed"><h2>OBJ≡KTV App :</h2></div>
            <ul className="typed">
                <li><span>I will find a name</span></li>
                <li><span>...when everything else works...</span></li>  
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
        <div className="inner-wrapper" style={{marginTop:"20px"}}>
            <h1>What is XXX ?</h1>
<h2>XXX is a student-driven goal setting app, with a strong emphasis on a school / home alignment.</h2>
<h2>In order for positive reinforcement to be effective, all parties involved have to know what behavior is being rewarded !</h2>
            <ul><h3><u>For educators :</u></h3></ul>
            <p><li><strong>Students are the ones that set their own goals</strong>, all you will have to do is validate them if they meet your requirements,</li>
                <li>You can <strong>message the student or their parents</strong> about their goal and how it is going,</li>
                <li>You don't need to spend your classroom budget on rewards anymore, the <strong>marketplace</strong> takes care of it !</li>
            </p>

            <ul><h3><u>For parents :</u></h3></ul>
            <p><li>You will know what your child is working towards <strong>and be part of the process</strong>, not just get notifications about points earned without knowing why,</li>
                <li>You are an <strong>integral part of the process</strong>, validating and rewarding goals hand in hand with your child's educator, </li>
                <li>You can <strong>message your child or their educator</strong> about their goal and how it is going,</li>
                <li>You can support the educator by posting items you no longer need at home to the <strong>marketplace</strong>.</li>
            </p>

            <ul><h3><u>For business-owners :</u></h3></ul>
            <p><li>Whether you have a child in a school or not, you can <strong>support children in your community</strong> ... </li>
                <li>... as well as <strong>promote your business</strong>, by posting items to the <strong>marketplace</strong>.</li>
            </p>

            <ul><h3><u>For students :</u></h3></ul>
            <p><li>You will be the <strong>ones setting up your own goals</strong>, take ownership of your own success !</li>
                <li>You will be able to earn <strong>rewards</strong>, that you can save towards buying anything that is posted to the <strong>marketplace</strong>. </li>
                <li>Your parents will know what is going on at school, and your educators how you are doing at home.</li>
                <li>You can <strong>message your parents or your educator</strong> along the way to inform them of your progress.</li>
            </p>
        </div>
    </div>
    </>
)    

}

export default GeneralLogin;