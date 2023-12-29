import React from "react";
import "./HomeElts.css"
import {useNavigate} from "react-router-dom"
import ItemForm from "./images/ItemForm.png"
import MarketPlace from "./images/MarketPlace.png"

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
                        <h1>What is XXX's marketPlace?</h1>
                        <p>It is said that :  </p>
                        <p style={{fontFamily:"cursive", textAlign:"center", fontSize:"25px"}}>🗑️ One person's trash is another person's treasure 🪷</p>
                        <p>On XXX, as a parent you are able to post items that you/your children don't use anymore to the marketplace.
                        <div >
                        <img src={MarketPlace} style={{height:"400px", border:"black solid 1px", marginTop:"20px", marginRight:"50px", alignSelf:"center"}}/>
                        
                        <p>Once you click on the "Add an Item" button, you will be able to fill a form to post an item you might have at home.</p>
                        <br></br>
                        <div style={{display:"flex", justifyContent:"center", width:"80%", lineHeight:"40px"}}>
                        <img src={ItemForm} style={{height:"400px", border:"black solid 1px", marginTop:"20px", marginRight:"50px", marginLeft:"50px"}}/>
                        
                        <p>There you can write a description of your item, <strong>set its price</strong><em>(0 - 20) stars</em>, <strong> and choose the school you will drop it off at.</strong>
                        &nbsp;After you submit the item, please <u>drop it off at the school you selected</u>. Then, for all students that go to that school, the item you posted will show up on their marketplace page.  </p>
                        </div>
                    </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarketPlaceExplained