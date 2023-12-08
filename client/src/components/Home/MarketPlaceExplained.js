import React from "react";
import "./HomeElts.css"
import {useNavigate} from "react-router-dom"

function MarketPlaceExplained(){
    const navigate = useNavigate()

    const handleBackHome = () => {
        navigate("/")
    }

    return(
        <div>
            <button className="backBtn" onClick={handleBackHome}> 🔙 </button>

            <div className="Expl-container">
                <div className= "container">
                    <div className="text">
                        What is XXX's marketPlace?
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarketPlaceExplained