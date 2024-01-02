import React, {useState, useContext, useRef} from "react";
import { UserContext } from "../../contexts/UserContext";
import Head1 from "./images/Head1.png";
import Head2 from "./images/Head2.png";
import Head3 from "./images/Head3.png";
import Head4 from "./images/Head4.png";
import Ears1 from "./images/Ears1.png";
import Ears2 from "./images/Ears2.png";
import Ears3 from "./images/Ears3.png";
import Ears4 from "./images/Ears4.png";
import Eyes1 from "./images/Eyes1.png";
import Eyes2 from "./images/Eyes2.png";
import Eyes3 from "./images/Eyes3.png";
import Eyes4 from "./images/Eyes4.png";
import Eyes5 from "./images/Eyes5.png";
import EyeBrows1 from "./images/EyeBrows1.png";
import EyeBrows2 from "./images/EyeBrows2.png";
import EyeBrows3 from "./images/EyeBrows3.png";
import EyeBrows4 from "./images/EyeBrows4.png";
import Nose1 from "./images/Nose1.png";
import Nose2 from "./images/Nose2.png";
import Nose4 from "./images/Nose4.png";
import Nose5 from "./images/Nose5.png";
import Mouth1 from "./images/Mouth1.png";
import Mouth2 from "./images/Mouth2.png";
import Mouth3 from "./images/Mouth3.png";
import Mouth4 from "./images/Mouth4.png";
import Hair1 from "./images/Hair1.png";
import Hair2 from "./images/Hair2.png";
import Hair3 from "./images/Hair3.png";
import Hair4 from "./images/Hair4.png";
import Acc0 from "./images/Acc0.png";
import Acc1 from "./images/Acc1.png";
import Acc2 from "./images/Acc2.png";
import Acc3 from "./images/Acc3.png";
import Acc4 from "./images/Acc4.png";
import Acc5 from "./images/Acc5.png";
import Acc6 from "./images/Acc6.png";
import border from "./images/border.png";
import html2canvas from 'html2canvas';
import {useNavigate} from "react-router-dom"
import "./Avatar.css"
import AvatarScreenShot from "./AvatarScreenShot";

function Avatar(){
    const {user, setUser} = useContext(UserContext)
    const [errors, setErrors] = useState([])
    const [head, setHead] = useState("")
    const [showHeads, setShowHeads] = useState(true)
    const [ears, setEars] = useState("")
    const [showEars, setShowEars] = useState(false)
    const [eyes, setEyes] = useState("")
    const [showEyes, setShowEyes] = useState(false)
    const [eyeBrows, setEyeBrows] = useState("")
    const [showEyeBrows, setShowEyeBrows] = useState(false)
    const [nose, setNose] = useState("")
    const [showNose, setShowNose] = useState(false)
    const [mouth, setMouth] = useState("")
    const [showMouth, setShowMouth] = useState(false)
    const [hair, setHair] = useState("")
    const [showHair, setShowHair] = useState(false)
    const [accessories, setAccessories] = useState("")
    const [showAccessories, setShowAccessories] = useState(false)
    const [showSubmitBtn, setShowSubmitBtn] = useState(false)
    const myRef = useRef(null)
    const navigate = useNavigate()


    const allHeads = [Head1, Head2, Head3, Head4];
    const handleChangeHead = (e) =>{
        setHead(e.target.value);
        setShowHeads(!showHeads);
        setShowEars(!showEars)
    }

    const allEars = [Ears1, Ears2, Ears3, Ears4];
    const handleChangeEars = (e) =>{
        setEars(e.target.value);
        setShowEars(!showEars)
        setShowEyes (!showEyes)
    }

    const allEyes = [Eyes1, Eyes2, Eyes3, Eyes4, Eyes5];
    const handleChangeEyes = (e) =>{
        setEyes(e.target.value);
        setShowEyes(!showEyes)
        setShowEyeBrows(!showEyeBrows)
    }

    const allEyeBrows = [EyeBrows1, EyeBrows2, EyeBrows3, EyeBrows4];
    const handleChangeEyeBrows = (e) =>{
        setEyeBrows(e.target.value);
        setShowEyeBrows(!showEyeBrows)
        setShowNose(!showNose)
    }

    const allNoses = [Nose1, Nose2, Nose4, Nose5]
    const handleChangeNose = (e) =>{
        setNose(e.target.value);
        setShowNose(!showNose)
        setShowMouth(!showMouth)
    }

    const allMouths = [Mouth1, Mouth2, Mouth3, Mouth4]
    const handleChangeMouth = (e) =>{
        setMouth(e.target.value);
        setShowMouth(!showMouth)
        setShowHair(!showHair)
    }

    const allHair = [Hair1, Hair2, Hair3, Hair4]
    const handleChangeHair = (e) =>{
        setHair(e.target.value);
        setShowHair(!showHair)
        setShowAccessories(!showAccessories)
    }

    const allAccessories = [Acc0, Acc1, Acc2, Acc3, Acc4, Acc5, Acc6]
    const handleChangeAcc = (e) =>{
        setAccessories(e.target.value)
        setShowAccessories(!showAccessories)
        setShowSubmitBtn(!showSubmitBtn)
    }

    const handleSubmitAvatar = (imgData) => {
        fetch(`/students/avatar/${user.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({avatar: imgData}),
        }).then((r) => {
            if (r.ok) {
                r.json().then((myNewAvatar) => {
                   setUser(myNewAvatar)
                });

                setHead("");
                setEars("");
                setAccessories("");
                setEyes("");
                setMouth("");
                setHair("");
                setNose("");
                setEyeBrows("")

            } else {
                r.json().then((err)=>setErrors(err.errors))
            }   
            navigate("/")
         });    
    }

   

  const saveAvatarURL = () =>{
    const input = myRef.current
    html2canvas(input, {logging:true, letterRendering:1, useCORS:true}).then( canvas =>{
        // const imgWidth = 400;
        // const imgHeight = 400;
        const imgData = canvas.toDataURL(`${user.username}Avatar/png`)
        handleSubmitAvatar(imgData)
    })
  }

    return(
        <div className= "Avatar-background">
            <h1 style = {{alignItems:"center", textAlign:"center", marginTop:"10px", paddingTop:"0px", backgroundColor:"white", width:"fit-content", fontFamily:"Limelight", fontSize:"40px"}}> &nbsp; 📸 <u>Welcome to the Avatar Factory ! </u>🎬 &nbsp;</h1>

            <form >
                {showHeads?
                (<div className="Avatar-form" >
                    <div  className="RadioBtn-container">
                        <div style = {{textAlign:"center"}}>
                            <label><h2>Choose a head: </h2></label>
                        </div>
                        {allHeads.map((h)=>
                            <div className="Avatar-img" key={h}>
                                <input
                                    type="radio"
                                    name="heads"
                                    value={h}
                                    checked={head === h}
                                    onChange={handleChangeHead}
                                />
                                <img src={h} className="radio-btn" alt="Head"/>
                            </div>
                        )}
                    </div>  
                </div>):
                (null)
                }

                {showEars?
                (<div className="Avatar-form" >
                    <div className="RadioBtn-container">
                        <div style = {{textAlign:"center"}}>
                            <label><h2>Choose your ears: </h2></label>
                        </div>
                        {allEars.map((e)=>
                            <div key={e} className="Avatar-img" >
                                <input
                                    type="radio"
                                    name="ears"
                                    value={e}
                                    checked={ears === e}
                                    onChange={handleChangeEars}
                                />
                                <img src={e} className="radio-btn" alt="Ears"/>
                            </div>
                        )}
                    </div>  
                </div>):
                (null)
                }   

                {showEyes?
                (<div className="Avatar-form" >
               
                   <div className="RadioBtn-container"> 
                        <div style = {{textAlign:"center"}}>
                            <label><h2>Choose your eyes: </h2></label>
                        </div>
                        {allEyes.map((ey)=>
                            <div key={ey} className="Avatar-img" >
                                <input
                                    type="radio"
                                    name="eyes"
                                    value={ey}
                                    checked={eyes === ey}
                                    onChange={handleChangeEyes}
                                />
                                <img src={ey} className="radio-btn" alt="Eyes"/>
                            </div>
                        )}
                    </div>  
                </div>):
                (null)
                }    

                {showEyeBrows?
                (<div className="Avatar-form" >
                
                   <div className="RadioBtn-container">
                        <div style = {{textAlign:"center"}}>
                            <label><h2>Choose your eyebrows: </h2></label>
                   </div>
                        {allEyeBrows.map((eb)=>
                            <div key={eb} className="Avatar-img" >
                                <input
                                    type="radio"
                                    name="eyeBrows"
                                    value={eb}
                                    checked={eyeBrows === eb}
                                    onChange={handleChangeEyeBrows}
                                />
                                <img src={eb} className="radio-btn"alt="Eyebrows"/>
                            </div>
                        )} 
                    </div> 
                </div>):
                (null)
                }    

                {showNose?
                (<div className="Avatar-form" >
                   <div className="RadioBtn-container">
                        <div style = {{textAlign:"center"}}>
                            <label><h2>Choose your nose: </h2></label>
                   </div>
                        {allNoses.map((n)=>
                            <div key={n} className="Avatar-img" >
                                <input
                                    type="radio"
                                    name="nose"
                                    value={n}
                                    checked={nose === n}
                                    onChange={handleChangeNose}
                                />
                                <img src={n} className="radio-btn" alt="Nose"/>
                            </div>
                        )}
                    </div>  
                </div>):
                (null)
                }     

                {showMouth?
                (<div className="Avatar-form" >
                    <div className="RadioBtn-container">
                        <div style = {{textAlign:"center"}}>
                            <label><h2>Choose your mouth: </h2></label>
                        </div>
                        {allMouths.map((m)=>
                            <div key={m} className="Avatar-img" >
                                <input
                                    type="radio"
                                    name="mouth"
                                    value={m}
                                    checked={mouth === m}
                                    onChange={handleChangeMouth}
                                />
                                <img src={m} className="radio-btn"alt="Mouth"/>
                            </div>
                        )}
                    </div>  
                </div>):
                (null)
                }   

                {showHair?
                (<div className="Avatar-form" >
                   <div className="RadioBtn-container"> 
                        <div style = {{textAlign:"center"}}>
                            <label><h2>Choose your hair: </h2></label>
                        </div>
                        {allHair.map((h)=>
                            <div key={h} className="Avatar-img" >
                                <input
                                    type="radio"
                                    name="hair"
                                    value={h}
                                    checked={hair === h}
                                    onChange={handleChangeHair}
                                />
                                <img src={h} className="radio-btn" alt="Hair"/>
                            </div>
                        )}
                    </div>  
                </div>):
                (null)
                }                                                  

                {showAccessories?
                (<div className="Avatar-form" style={{flexWrap:"wrap"}}>
                   <div className="RadioBtn-container"> 
                        <div style = {{textAlign:"center"}}>
                            <label><h2 style={{backgroundColor: "transparent"}}>If you want, choose an accessory: </h2>
                                <p style={{marginLeft:"10px", backgroundColor: "transparent", borderRadius:"18px"}}><em >If you don't want any, select the first button.</em></p></label>
                        </div>
                        {allAccessories.map((a)=>
                            <div key={a} className="Avatar-img" >
                                <input
                                    type="radio"
                                    name="accessories"
                                    value={a}
                                    checked={accessories === a}
                                    onChange={handleChangeAcc}
                                />
                                <img src={a} className="radio-btn" alt="Accessories"/>
                            </div>
                        )}
                    </div>  
                </div>):
                (null)
                }

                <div className="errors">
                    <label id="errors" style={{color:"red"}}>
                        {errors.map((err) => (
                        <ul><em key={err}>{err}</em></ul>
                        ))}   
                    </label>
                </div>
            </form>

               <div style={{marginTop:"50px",marginBottom:"50px", display:"flex", justifyContent:"center" }}>
                <img src = {border} className="Film-overlay" alt="border"/>
                <div ref={myRef} style={{marginTop:"10px",marginBottom:"50px", display:"flex", justifyContent:"center" }}> 
                    
                        <AvatarScreenShot head={head} ears={ears} eyes={eyes} eyeBrows={eyeBrows} nose={nose} mouth={mouth} hair={hair} accessories={accessories} />
                </div> 
                </div>
                {showSubmitBtn?(<div>
        <button className="submitBtn" onClick={()=>{saveAvatarURL()}}> Submit my Avatar </button>
        </div> ):(null)}  
             
        
                               
            
      
        </div>

       
    )
}

export default Avatar;