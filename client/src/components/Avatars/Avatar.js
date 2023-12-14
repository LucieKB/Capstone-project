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
import Nose3 from "./images/Nose3.png";
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

    const allNoses = [Nose1, Nose2, Nose3, Nose4, Nose5]
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
        fetch(`/students/${user.id}`,{
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

    // const getScreenshotOfAvatar = () => {
    //     const avatarImage = myRef.current
    //     console.log(avatarImage)
    //     debugger
    // //     captureScreenshot(avatarImage)
    // //     debugger
    // // };

    // // const captureScreenshot = (avatarImage) =>{
    //     alert("Smile for the picture!");
    //     html2canvas(avatarImage
    //         ,{
    //         useCORS: true,
    //         taintTest: false,
    //         allowTaint: false,
    //         width: "400px",
    //         height: "400px",
    //     }
    //     ).then(canvas =>{
    //         console.log(canvas)
    //         // const handleCanvas = canvas.toDataURL(`${user.username}Avatar/png`);
    //         // console.log(handleCanvas)
    //         // setMyAvatar(handleCanvas)
    //         // handleSubmitAvatar(handleCanvas)
    //         debugger
    //     })
    // }

  const saveAvatarURL = () =>{
    const input = myRef.current
    html2canvas(input, {logging:true, letterRendering:1, useCORS:true}).then( canvas =>{
        const imgWidth = 400;
        const imgHeight = 400;
        const imgData = canvas.toDataURL(`${user.username}Avatar/png`)
        console.log(imgData)
        handleSubmitAvatar(imgData)
    })

  }

    return(
        <div>
            <form >
                {showHeads?
                (<div className="Avatar-form" >
                    <div style = {{textAlign:"center"}}>
                    <label><h2>Choose a head: </h2></label>
                    <br></br>
                    </div>
                    <div  className="Avatar-container">
                    {allHeads.map((h)=>
                    <div className="Avatar-img" key={h}>
                        <input
                            type="radio"
                            name="heads"
                            value={h}
                            checked={head === h}
                            onChange={handleChangeHead}
                        />
                        <img src={h} className="radio-btn"/>
                    </div>
                    )}
                    </div>  
                </div>):
                (null)
                }

                {showEars?
                (<div className="Avatar-form" >
                <div style = {{textAlign:"center"}}>
                <label><h2>Choose your ears: </h2></label>
                <br></br>
                </div>
                    <div className="Avatar-container">
                    {allEars.map((e)=>
                    <div key={e} >
                        <input
                            type="radio"
                            name="ears"
                            value={e}
                            checked={ears === e}
                            onChange={handleChangeEars}
                        />
                        <img src={e} className="radio-btn"/>
                    </div>
                    )}
                    </div>  
                </div>):
                (null)
                }   

                {showEyes?
                (<div>
                    <p>Choose eyes: </p>
                    <div  style = {{
                    width: "fit-content",
                    heigth: "fit-content",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    {allEyes.map((ey)=>
                    <div key={ey}>
                        <input
                            type="radio"
                            name="eyes"
                            value={ey}
                            checked={eyes === ey}
                            onChange={handleChangeEyes}
                        />
                        <img src={ey} className="radio-btn"/>
                    </div>
                    )}
                    </div>  
                </div>):
                (null)
                }    

                {showEyeBrows?
                (<div>
                    <p>Choose eyebrows: </p>
                    <div  style = {{
                    width: "fit-content",
                    heigth: "fit-content",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    {allEyeBrows.map((eb)=>
                    <div key={eb}>
                        <input
                            type="radio"
                            name="eyeBrows"
                            value={eb}
                            checked={eyeBrows === eb}
                            onChange={handleChangeEyeBrows}
                        />
                        <img src={eb} className="radio-btn"/>
                    </div>
                    )} </div> 
                </div>):
                (null)
                }    

                {showNose?
                (<div>
                    <p>Choose nose: </p>
                    <div  style = {{
                    width: "fit-content",
                    heigth: "fit-content",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    {allNoses.map((n)=>
                    <div key={n}>
                        <input
                            type="radio"
                            name="nose"
                            value={n}
                            checked={nose === n}
                            onChange={handleChangeNose}
                        />
                        <img src={n} className="radio-btn"/>
                    </div>
                    )}</div>  
                </div>):
                (null)
                }     

                {showMouth?
                (<div>
                    <p>Choose mouth: </p>
                    <div  style = {{
                    width: "fit-content",
                    heigth: "fit-content",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    {allMouths.map((m)=>
                    <div key={m}>
                        <input
                            type="radio"
                            name="mouth"
                            value={m}
                            checked={mouth === m}
                            onChange={handleChangeMouth}
                        />
                        <img src={m} className="radio-btn"/>
                    </div>
                    )}</div>  
                </div>):
                (null)
                }   

                {showHair?
                (<div>
                    <p>Choose hair: </p>
                    <div  style = {{
                    width: "fit-content",
                    heigth: "fit-content",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    {allHair.map((h)=>
                    <div key={h}>
                        <input
                            type="radio"
                            name="hair"
                            value={h}
                            checked={hair === h}
                            onChange={handleChangeHair}
                        />
                        <img src={h} className="radio-btn"/>
                    </div>
                    )}</div>  
                </div>):
                (null)
                }                                                  

                {showAccessories?
                (<div>
                    <p>Choose an Accessory: </p>
                    <div  style = {{
                    width: "fit-content",
                    heigth: "fit-content",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    {allAccessories.map((a)=>
                    <div key={a}>
                        <input
                            type="radio"
                            name="accessories"
                            value={a}
                            checked={accessories === a}
                            onChange={handleChangeAcc}
                        />
                        <img src={a} className="radio-btn"/>
                    </div>
                    )}</div>  
                </div>):
                (null)
                }
                </form>

                {showSubmitBtn?(<div>
        <button onClick={()=>{saveAvatarURL()}}> Submit my Avatar </button>
        </div> ):(null)}  
                <div ref={myRef}> 
                <AvatarScreenShot head={head} ears={ears} eyes={eyes} eyeBrows={eyeBrows} nose={nose} mouth={mouth} hair={hair} accessories={accessories} />
                </div> 
                {/* <div ref={myRef} className = "Avatar-container">
            <img src={head}  className="Avatar-image" />
            <img src={ears}  className="Avatar-overlay" />  
            <img src={eyes}  className="Avatar-overlay" />  
            <img src={eyeBrows}  className="Avatar-overlay" /> 
            <img src={nose} className="Avatar-overlay" /> 
            <img src={mouth} className="Avatar-overlay" />  
            <img src={hair} className="Avatar-overlay" />    
            <img src={accessories} className="Avatar-overlay" />    
        </div > */}
        
                               
            
      
        </div>

       
    )
}

export default Avatar;