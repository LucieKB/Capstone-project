import React, {useState} from "react";
import ParentSignUpForm from "./SignUpForms/ParentSignUpForm";
import EducatorSignUpForm from "./SignUpForms/EducatorSignUpForm";
import BusinessOwnerSignUpForm from "./SignUpForms/BusinessOwnerSignUpForm";

function SignUpHomePage(){
    const [userType, setUserType] = useState("")
    const [showButtonParent, setShowButtonParent] = useState(true)
    const [showButtonEducator, setShowButtonEducator] = useState(true)
    const [showButtonBO, setShowButtonBO] = useState(true)

        const handleSignUpParent = () =>{
            setUserType("parent")
            setShowButtonParent(false)
        }

        const handleSignUpEducator = () =>{
            setUserType("educator")
            setShowButtonEducator(false)
        }

        const handleSignUpBusinessOwner = () =>{
            setUserType("business_owner")
            setShowButtonBO(false)
        }
    
    return(
        <>
         <div >
            {(() => {
                switch (userType){
                    case 'parent' :
                        return <ParentSignUpForm />
                    case 'educator' :
                        return <EducatorSignUpForm />
                    case 'business_owner' :
                        return <BusinessOwnerSignUpForm />
                        default :
                        return <h2 style={{textAlign:"center"}}>Please select a user type to sign-up : </h2>
                }
            })()}
        </div>

        <div className= "bottom-wrap">
            {showButtonParent?
            (<button className="submitBtn" onClick={() => handleSignUpParent()}> I'm a Parent </button>):(null)}
            {showButtonEducator?
            ( <button className="submitBtn" onClick={() => handleSignUpEducator()}> I'm an Educator </button>):(null)}
            {showButtonBO?
            ( <button className="submitBtn" onClick={() => handleSignUpBusinessOwner()}> I'm a Business Owner </button>):(null)}
        </div>
        </>
    )

}

export default SignUpHomePage;