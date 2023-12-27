import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";


function ParentSignUpForm(){
    const {user, setUser} = useContext(UserContext)
    const [parentFormData, setParentFormData] = useState({
        username:(""),
        password:(""),
        password_confirmation: (""),
        type: ("Parent"),
        email: (""),
        number_of_children: ("")
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([])


    const handleSubmit = (e) => {
        e.preventDefault();
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
              setErrors([]);    
      }

      console.log(parentFormData)

    return(
        
        <>
        <div className="wrapper">
          <div className="inner-signUp">
            
            <div className="img-holder">
              <h1 style={{textAlign:"center"}}>Parent Sign Up Form</h1>
              <img id="quote" src="https://i.pinimg.com/736x/35/89/d7/3589d7e7e6e721e534d5faea64ef08c4.jpg" alt="Parent quote"/>
            </div>

            
       
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

              <div className="form-wrapper">
                <label> <strong><u>Number of Children I Want to Register:</u></strong>
                  <input
                      className="form-control"
                      type="number"
                      pattern="[1-12]*"
                      name="children_number"
                      value={parentFormData.number_of_children}
                      placeholder="Number of Children"
                      onChange={(e)=>setParentFormData({...parentFormData, number_of_children:e.target.value})}
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

export default ParentSignUpForm;