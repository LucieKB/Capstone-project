import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
// import StudentSignUpForm from "./StudentSignUpForm";

function ParentSignUpForm(){
    const {user, setUser} = useContext(UserContext)
    const [parentFormData, setParentFormData] = useState({
        username:(""),
        password:(""),
        password_confirmation: (""),
        type: ("Parent"),
        email: (""),
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([])
    // const [showParentForm, setShowParentForm] = useState(true);
    // const [showStudentForm, setShowStudentForm] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(parentFormData),
        }).then((r) => {
            setIsLoading(false);
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                } else {
                    r.json().then((err) => {console.log(err.errors)
                    setErrors(err.errors)}
                    )
                  }
              });
            //   setShowParentForm(false)   
      }

    // const handleChildRegistration = () =>{
    //     setShowStudentForm(true)
    // }
      console.log(parentFormData)

    return(
        
        <>
        
        
        <h1>Parent Sign Up Form</h1>
        {/* {showParentForm?
        ( */}
        <form onSubmit={handleSubmit}>
            <div className="form-wrapper">
            <label><strong><u>Username:</u></strong><em style={{color:"red"}}>*</em>
            <input
              className="form-control"
              type="text"
              id="username"
              autoComplete="off"
              value={parentFormData.username}
              onChange={(e) => setParentFormData({...parentFormData, username:e.target.value})}
            />
            </label>
            </div>

            <div className="form-wrapper">
            <label><strong><u>Email address:</u></strong><em style={{color:"red"}}>*</em>
            <input
              className="form-control"
              type="text"
              id="email"
              autoComplete="off"
              value={parentFormData.email}
              onChange={(e) => setParentFormData({...parentFormData, email:e.target.value})}
            />
            </label>
            </div>

            <div className="form-wrapper">
            <label><strong><u>Password:</u></strong><em style={{color:"red"}}>*&nbsp;</em><em style={{fontSize:"9px"}}>Password must be 6-10 characters long, and include at least one number, one capital letter and one symbol.</em>
            <input
                className="form-control"
                type="password"
                id="password"
                value={parentFormData.password}
                onChange={(e) => setParentFormData({...parentFormData, password:e.target.value})}
                autoComplete="current-password"
            />
            </label>
          </div>

          <div className="form-wrapper">
            <label><strong><u>Password Confirmation:</u></strong><em style={{color:"red"}}>*</em>
              <input
                className="form-control"
                type="password"
                id="password_confirmation"
                value={parentFormData.password_confirmation}
                onChange={(e) => setParentFormData({...parentFormData, password_confirmation:e.target.value})}
                autoComplete="current-password"
              />
            </label>
          </div>

          <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>       
             
            <label style={{color:"red"}}>
                {errors.map((err) => (
                  <em key={err}>{err}</em>
                  ))}
                
              </label>

        </form>
        {/* // ) :
        // (<button onClick = {() => {handleChildRegistration}}> Register a Child </button>)
        // (<button onClick = {() => setShowStudentForm(true)}> Register a Child </button>)
        // }
        // {showStudentForm? */}
        {/* // (<StudentSignUpForm parent_id={user.id} setShowStudentForm={setShowStudentForm}/>):
        // ("")
        // (<button onClick = {() => setShowStudentForm(!showStudentForm)}> Get back to Parent Sign Up </button>)
        // } */}
        </>
    )

}

export default ParentSignUpForm;