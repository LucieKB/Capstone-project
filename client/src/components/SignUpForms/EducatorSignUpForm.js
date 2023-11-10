import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";

function EducatorSignUpForm(){
    const {setUser} = useContext(UserContext)
    const [educatorFormData, setEducatorFormData] = useState({
        username:(""),
        password:(""),
        password_confirmation: (""),
        type: ("Educator"),
        email: (""),
    })

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([])


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(educatorFormData),
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
      }

      console.log(educatorFormData)

    return(
        <>
        <h1>Educator Sign Up Form</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-wrapper">
            <label><strong><u>Username:</u></strong><em style={{color:"red"}}>*</em>
            <input
              className="form-control"
              type="text"
              id="username"
              autoComplete="off"
              value={educatorFormData.username}
              onChange={(e) => setEducatorFormData({...educatorFormData, username:e.target.value})}
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
              value={educatorFormData.email}
              onChange={(e) => setEducatorFormData({...educatorFormData, email:e.target.value})}
            />
            </label>
            </div>

            <div className="form-wrapper">
            <label><strong><u>Password:</u></strong><em style={{color:"red"}}>*&nbsp;</em><em style={{fontSize:"9px"}}>Password must be 6-10 characters long, and include at least one number, one capital letter and one symbol.</em>
            <input
                className="form-control"
                type="password"
                id="password"
                value={educatorFormData.password}
                onChange={(e) => setEducatorFormData({...educatorFormData, password:e.target.value})}
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
                value={educatorFormData.password_confirmation}
                onChange={(e) => setEducatorFormData({...educatorFormData, password_confirmation:e.target.value})}
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
        </>
    )

}

export default EducatorSignUpForm;