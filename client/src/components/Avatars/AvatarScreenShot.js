import React, {useRef} from "react";

function AvatarScreenShot({head, ears, eyes, hair, nose, eyeBrows, mouth, accessories}){
    const myRef = useRef(null)

    return(
        <div>
            <img src={head}  className="Avatar-image" />
            <img src={ears}  className="Avatar-overlay" />  
            <img src={eyes}  className="Avatar-overlay" />  
            <img src={eyeBrows}  className="Avatar-overlay" /> 
            <img src={nose} className="Avatar-overlay" /> 
            <img src={mouth} className="Avatar-overlay" />  
            <img src={hair} className="Avatar-overlay" />    
            <img src={accessories} className="Avatar-overlay" />    
        </div >
    )
}

export default AvatarScreenShot