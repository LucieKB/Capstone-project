import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom"


function LoginForm(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()
   

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
             setIsLoading(false);
            if (r.ok) {  
                r.json().then((user) => setUser(user));
            } else {
                r.json().then((err) => setErrors(err.errors))
            } 
            navigate ("./")        
        });
    }

    return (
        <>
        
        <div className="wrapper">
            <div className="inner">

                <form style={{width:"90%"}} onSubmit={handleSubmit}>
                    <div className="form-wrapper">
                        <label>
                            Username: 
                            <input 
                                className="form-control"
                                htmlFor="username"
                                type="text" 
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                        </label>
                    </div>
                        
                    <div className="form-wrapper">
                        <label>
                            Password: 
                            <input 
                                className="form-control"
                                htmlFor="password"
                                type="password" 
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                        </label>
                    </div>
                    
                        <button className="submitBtn" type="submit">{isLoading ? "Loading..." : "Login"}</button>
                        <label>
                            {errors.map((err) => (
                                <p key={err}>{err}</p> 
                            ))}
                        </label>
                </form>
            </div>
        </div>
        </>
    )
}

export default LoginForm