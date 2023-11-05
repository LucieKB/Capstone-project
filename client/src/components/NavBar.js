import React, {useState, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

function NavBar(){
    const {user, setUser} = useContext(UserContext)
   

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
            </nav>
        </div>
        <div>
            <button id="Btn-Logout" onClick={handleLogoutClick}>Logout</button>
        </div>
        </>
    )
}

export default NavBar;