import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";


function NavBar(){
    const {user, setUser} = useContext(UserContext)
    const [showId, setShowId] = useState(false)
    const [showMarketPlace, setShowMarketPlace] = useState(true)
    

    useEffect(()=>{
        if (user.type === "Educator"){
            setShowId(true)
            setShowMarketPlace(false)
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
                (<Link to = {`students/${user.id}/me`}> My Goals Page </Link>)
                :
                (<Link to ="/users/mystudent"> My Students Page </Link>)}
                {user.type === "Student"?
                (<p> My Wallet : {user.wallet} 🌟 </p>)
                :
                ("")}
                {user.type === "Student"?
                (<Link to = "/students/:id/myItems"> My Items </Link>):(null)}
                {showMarketPlace?
                (<Link to = "/rewards"> MarketPlace </Link>):(null)}
                
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