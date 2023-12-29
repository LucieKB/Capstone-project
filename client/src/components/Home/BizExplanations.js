import React from "react";
import "./HomeElts.css"
import {useNavigate} from "react-router-dom"
import ItemForm from "./images/ItemForm.png"
import MarketPlace from "./images/MarketPlace.png"

function BizExplanations(){
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
                <h2>What is XXX?</h2>
                    <p>XXX is a goal setting app where children/students ARE THE ONES SETTING THEIR OWN GOALS. Most "rewards" apps put the reponsability of goal setting in the adult's hands. But who better than the children can decide what they need and want to achieve? </p>
                    <p>With guidance and adult supervision, students create their own goals that get validated and monitored by both <u>parents</u> and <u>educators</u>. </p>
                    <p>Once they achieve their goals, they get "paid" by parents and educators (only if they agree that the goal has been reached).</p>
                    <p>The students earn stars in their wallets that they can later spend in the marketplace.</p>
                    
                    <div style={{display:"flex", justifyContent:"center"}}>
                     
                    </div>
               
                    
                    <div className="text" style={{paddingLeft:"0px"}}>
                        <h2>What is XXX's marketPlace?</h2>
                        <h3><em>How can you help as a local business owner?</em></h3>
                        
                        <p>On XXX, as a business owner in our community, you can post items to the marketplace.</p>
                        <p> Not only will you help the students, motivating them to create and achieve goals, but through posting an item, you will also promote your business.</p>
                        <p><hr style={{border: "dashed grey 1px"}}></hr>
                        A student can earn from 1 to 5 stars per goal achieved : we suggest setting a fair price for the item you are posting, that encourages the student to work hard towards getting it, while not feeling like it is an impossible task.
                        <p> A $5 gift card could thus cost 5 to 7 ⭐️.</p>
                        <div >
                        <img src={MarketPlace} style={{height:"400px", border:"black solid 1px", marginTop:"20px", marginRight:"50px", alignSelf:"center"}}/>
                        
                        <p>Once you click on the "Add an Item" button, you will be able to fill a form to post an item online.</p>
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
                    <br></br>
               
           
        </div>
        </div>
        </div>
        
    )
}

export default BizExplanations