import React, {useState} from "react";
import StudentSignUpForm from "./SignUpForms/StudentSignUpForm";
import ParentSignUpForm from "./SignUpForms/ParentSignUpForm";
import EducatorSignUpForm from "./SignUpForms/EducatorSignUpForm";
import BusinessOwnerSignUpForm from "./SignUpForms/BusinessOwnerSignUpForm";

function SignUpHomePage(){
    const [userType, setUserType] = useState("")

    
    return(
        <>
        <div>
        <button onClick={() => setUserType("parent")}> I'm a Parent </button>
        <button onClick={() => setUserType("educator")}> I'm an Educator </button>
        <button onClick={() => setUserType("business_owner")}> I'm a Business Owner </button>
        </div>

        <div>
            {(() => {
                switch (userType){
                    case 'parent' :
                        return <ParentSignUpForm />
                    case 'educator' :
                        return <EducatorSignUpForm />
                    case 'business_owner' :
                        return <BusinessOwnerSignUpForm />
                        default :
                        return <p>Please select a user type.</p>
                }
            })()}
        </div>
        </>
    )

}

export default SignUpHomePage;