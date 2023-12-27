import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext";

function BusinessOwnerSignUpForm(){

    const [businessOwnerFormData, setBusinessOwnerFormData ] = useState({
        username:(""),
        password:(""),
        password_confirmation: (""),
        type: ("BusinessOwner"),
        email: (""),
        business: (""),
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([])
    const {user, setUser} = useContext(UserContext)
    const { setGoals } = useContext(GoalsContext)
    
   


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch("/signup", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(businessOwnerFormData),
        }).then((r) => {
            setIsLoading(false);
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                    setGoals([]);
                } else {
                    r.json().then((err) => {console.log(err.errors)
                    setErrors(err.errors)}
                    )
                  }
              });  
              setErrors([]);
      }

    return(

      <>
      <div className="wrapper">
        <div className="inner-signUp">
          
          <div className="img-holder">
            <h1 style={{textAlign:"center"}}>Business Owner Sign Up Form</h1>
            <img id="quote" src="https://i.pinimg.com/564x/15/77/84/1577845b1cf65209e86510474a1507f0.jpg" alt="Parent quote"/>
          </div>

          
     
          <form onSubmit={handleSubmit} autocomplete="off">
            <div className="form-wrapper">
              <label><strong><u>Username:</u></strong><em style={{color:"red"}}>*</em>
              <input
                className="form-control"
                type="text"
                id="username"
                autoComplete="off"
                value={businessOwnerFormData.username}
                onChange={(e) => setBusinessOwnerFormData({...businessOwnerFormData, username:e.target.value})}
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
                value={businessOwnerFormData.email}
                onChange={(e) => setBusinessOwnerFormData({...businessOwnerFormData, email:e.target.value})}
              />
              </label>
            </div>

            <div className="form-wrapper">
              <label><strong><u>Password:</u></strong><em style={{color:"red"}}>*&nbsp;</em><em style={{fontSize:"9px"}}>Password must be 6-10 characters long, and include at least one number, one capital letter and one symbol.</em>
              <input
                  className="form-control"
                  type="password"
                  id="password"
                  value={businessOwnerFormData.password}
                  onChange={(e) => setBusinessOwnerFormData({...businessOwnerFormData, password:e.target.value})}
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
                  value={businessOwnerFormData.password_confirmation}
                  onChange={(e) => setBusinessOwnerFormData({...businessOwnerFormData, password_confirmation:e.target.value})}
                  autoComplete="current-password"
                />
              </label>
            </div>

            <div className="form-wrapper">
              <label><strong><u>Business Name:</u></strong><em style={{color:"red"}}>*</em>
              <input
                className="form-control"
                type="text"
                id="business_name"
                placeholder="Ex: Mrs M.'s Bookshop - Park City"
                autoComplete="off"
                value={businessOwnerFormData.business}
                onChange={(e) => setBusinessOwnerFormData({...businessOwnerFormData, business:e.target.value})}
              />
              </label>
            </div>

            <button className="submitBtn" type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>       
           
            <div className="errors">
              <label id="errors" style={{color:"red"}}>
                {errors.map((err) => (
                  <ul><em key={err}>{err}</em></ul>
                  ))}
                
              </label>
              </div>

          </form>
        </div>
      </div>
      </>
    
     
  )

}

export default BusinessOwnerSignUpForm;