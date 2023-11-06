import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import "./custom.css"

function StudentSignUpForm(parentId){
    const {user, setUser} = useContext(UserContext)
    const [schools, setSchools] = useState ("")
    const [schoolSuggestions, setSchoolSuggestions] = useState([])
    const [studentFormData, setStudentFormData] = useState({
        username:(""),
        password:(""),
        password_confirmation: (""),
        type: ("Student"),
        email: (""),
        avatar: (""),
        grade: (""),
        school: (""),
        wallet: (0),
        parent_id: (Object.values(parentId)[0])
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([])
    const [schoolSearch, setSchoolSearch] = useState("")

    useEffect(()=> {
        fetch("/schools/name")
        .then(r => r.json())
        .then(schools => setSchools(schools))
    }, [])

    const onSuggest = (sugg) =>
        {console.log(sugg)
            setStudentFormData({...studentFormData, school:sugg})
            setSchoolSearch(sugg);
            setSchoolSuggestions([]);
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/students", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(studentFormData),
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

      console.log(studentFormData)

    return(
        <>
        <h1>Student Sign Up Form</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-wrapper">
            <label><strong><u>Username:</u></strong><em style={{color:"red"}}>*</em>
            <input
              className="form-control"
              type="text"
              id="username"
              autoComplete="off"
              value={studentFormData.username}
              onChange={(e) => setStudentFormData({...studentFormData, username:e.target.value})}
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
              value={studentFormData.email}
              onChange={(e) => setStudentFormData({...studentFormData, email:e.target.value})}
            />
            </label>
            </div>

            <div className="form-wrapper">
            <label><strong><u>Password:</u></strong><em style={{color:"red"}}>*&nbsp;</em><em style={{fontSize:"9px"}}>Password must be 6-10 characters long, and include at least one number, one capital letter and one symbol.</em>
            <input
                className="form-control"
                type="password"
                id="password"
                value={studentFormData.password}
                onChange={(e) => setStudentFormData({...studentFormData, password:e.target.value})}
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
                value={studentFormData.password_confirmation}
                onChange={(e) => setStudentFormData({...studentFormData, password_confirmation:e.target.value})}
                autoComplete="current-password"
              />
            </label>
          </div>

          <div className="form-wrapper">
            <label><strong><u>School: </u></strong><em style={{color:"red"}}>*&nbsp;</em>
                <input
                className="form-control"
                type="text"
                value={schoolSearch}
                onChange={(e) => {
                    setSchoolSearch(e.target.value)
                    const mySchool = schools.filter((school) => {
                    return school.toLowerCase().includes(schoolSearch.toLowerCase()) //Work on letter by letter
                })
                console.log('mySchool', mySchool)
                setSchoolSuggestions(mySchool)
                }
                }
              />
              {schoolSuggestions.map((sugg, i) => 
              <div key={i} className="sugg justify-content-md-center" onClick={()=>onSuggest(sugg)}>{sugg}</div>
              )}
              
            </label>
          </div>

          <div className="form-wrapper">
            <label> <strong><u>Grade:</u></strong>
              <input
                  className="form-control"
                  type="number"
                  pattern="[1-12]*"
                  name="grade"
                  value={studentFormData.grade}
                  placeholder="What grade are you in?"
                  onChange={(e)=>setStudentFormData({...studentFormData, grade:e.target.value})}
              />
            </label>
          </div>

          <div className="form-wrapper">
            <label><strong><u>My avatar:</u></strong>
              <input
                className="form-control"
                type="text"
                // place avatar component here
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

export default StudentSignUpForm