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
        
        <div className= "bottom-wrap">
            {showButtonParent?
            (<button className="SignUp-Btn" onClick={() => handleSignUpParent()}> I'm a Parent </button>):(null)}
            {showButtonEducator?
            ( <button className="SignUp-Btn" onClick={() => handleSignUpEducator()}> I'm an Educator </button>):(null)}
            {showButtonBO?
            ( <button className="SignUp-Btn" onClick={() => handleSignUpBusinessOwner()}> I'm a Business Owner </button>):(null)}
        </div>
        

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
                        return <h3>Please select a user type.</h3>
                }
            })()}
        </div>
        </>
    )

}

export default SignUpHomePage;