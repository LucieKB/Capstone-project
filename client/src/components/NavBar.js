import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

function NavBar(){
    const {user, setUser} = useContext(UserContext)
    const [showId, setShowId] = useState(false)

    useEffect(()=>{
        if (user.type === "Educator"){
            setShowId(true)
        }
    })
   

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }

    return (
        <>
        <div className="navbar">
            <nav>
                <Link to ="/">Home</Link>
                {user.type === "Student"?
                (<Link to ="/goals"> My Goals Page </Link>)
                :
                (<Link to ="/parents/mystudent"> My Student's Goals Page </Link>)}
            </nav>
        </div>
            {showId?
                (<div><p style={{color:"red"}}> Id # {user.id} </p></div>)
                :(null)
            }
        <div> 
            <button id="Btn-Logout" onClick={handleLogoutClick}>Logout</button>
        </div>
        </>
    )
}

export default NavBar;