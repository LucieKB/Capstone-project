import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext"
import { useNavigate, useParams } from "react-router-dom";
import Star from "../Goals/Star";
import "./NewGoalForm.css"


function UpdateGoalForm({ onUpdateGoal }){
    const {user, setUser} = useContext(UserContext)
    const {goals, setGoals} = useContext(GoalsContext)
    const {id} = useParams()
    const goal = goals.find(goal => goal.id === parseInt(id))
    const [errors, setErrors] = useState([])
    const [goalDescription, setGoalDescription] = useState(goal.description.split("/"))
    const myGoalsDescription = ""
    const [updateFormData, setUpdateFormData ]=useState({
        goal_category : (goal.goal_category),
        title: (goal.title),
        description : (myGoalsDescription),
        deadline: (goal.deadline),
        value:(goal.value), 
      })

    

    const categories = ["Ready", "Respectful", "Responsible", "Academic", "Other"]
    const navigate = useNavigate()

    const handleChangeCategory = (e) => {
        if(e.target.checked)
            {  
                setUpdateFormData({...updateFormData, goal_category:e.target.value})
            }
    }

    console.log("updateFormData=",updateFormData.description)
    console.log("goalDescription=",goalDescription)


    const handleSubmit = (e) => {
        
        e.preventDefault();
        fetch (`/goals/${goal.id}`, {
            method: "PATCH",
            headers: {
             "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                 goal_category: updateFormData.goal_category,
                 title: updateFormData.title,
                 description: goalDescription.join("/"),
                 deadline: updateFormData.deadline,
                 value: updateFormData.value,
                 user_id: user.id,
            }),
        })
            .then(r=>r.json())
            .then ((updatedGoal) => {
                onUpdateGoal(updatedGoal)
            });
            
            navigate(`/goals/${goal.id}`);
    }

    const myGoalMessages = goal.messages.map((m)=> {
        return(<div key={m.id}>
       ➢{m.content} from <em>{m.sender} </em>
   </div>)
    }) 

    // const yesNo = ["Yes", "No", "I'm not sure"]
    // const handleChangeRealistic = (e) => {
    //     if(e.target.checked)
    //         {  
    //             setGoalDescription([goalDescription[0],goalDescription[1],goalDescription[2], e.target.value])
    //             setUpdateFormData({...updateFormData, description: goalDescription})
    //         }
    // }


    
    return (
        <>
        <div className="newGoal-wrapper">
            <div className="inner-inner-wrapper"
            style={{maxWidth:"20%", marginLeft:"3%", marginRight:"3%"}}>
        <ul><span className="text">📬 Messages :</span>  <div className="messages-container" style={{fontFamily:"caveat", fontSize:"24px"}}>{myGoalMessages}</div></ul>
        </div>
        <div className="newGoal-inner" 
        style={{marginTop:"10%", marginLeft:"5%", marginRight:"5%"}}
        >
        
            <div className="Header2">
            
                <h3 style={{textAlign:"center", lineHeight:"40px", fontSize:"30px", transform:"rotate(-90deg)"}}> My "{goal.title}" Goal Update Form</h3>
            </div>
            <hr />

        <form style={{width:"90%"}} className="new-goal-form" onSubmit={handleSubmit}>
        <div className="form-wrapper">
            
                <h3 style={{paddingLeft: "30px"}}><u> Pick your Goal Category</u></h3>
                <ul className = "categories-list">
                {categories.map((catname)=>{
                    return(
                        <div key={catname} className="radio-Btn">
                            <label>
                                <input 
                                type="radio"
                                name="categories-name"
                                value={catname}
                                checked={updateFormData.goal_category === catname}
                                onChange={handleChangeCategory}
                                />{catname}
                            </label>
                        </div>
                     )
                })}
            </ul>
        </div>
                
            <h3 style={{paddingLeft: "30px"}}><u> My New Goal's Title </u></h3>
                <input
                    className="form-control"
                    type="text"
                    name="title"
                    value={updateFormData.title}
                    placeholder={goal.title}
                    onChange={(e)=>setUpdateFormData({...updateFormData, title:e.target.value})}/>
            

            <h3 style={{paddingLeft: "30px"}}><u> Describe your goal and how you will reach it.</u></h3>
            <p><em>S:Specific → What will you do?</em></p>
                <input
                    className="form-control"
                    type="text"
                    name="S"
                    value={goalDescription[0]}
                    // placeholder= {myGoalsDescription[0]}
                    onChange={(e)=>setGoalDescription([e.target.value, goalDescription[1], goalDescription[2]])}/>
            <p><em>M: Measurable  → How will you know when your goal is achieved?</em></p>
            <input
            className="form-control"
                    type="text"
                    name="M"
                    value={goalDescription[1]}
                    placeholder= {myGoalsDescription[1]}
                    onChange={(e)=>setGoalDescription([goalDescription[0], e.target.value], goalDescription[2])}/>
            <p><em>A: Achievable → What do you need to achieve that goal?</em></p>
            <input
            className="form-control"
                    type="text"
                    name="A"
                    value={goalDescription[2]}
                    placeholder={myGoalsDescription[2]}
                    onChange={(e)=>{
                        setGoalDescription([goalDescription[0],goalDescription[1], e.target.value])
                        }}/>
            
            <br />
            
            
            
            <h3 style={{paddingLeft: "30px"}}><u> T: When would you like this goal to be achieved by?</u></h3>
                <input
                    
                    type="date"
                    name="deadline"
                    value={updateFormData.deadline}
                    placeholder={goal.deadline}
                    onChange={(e)=>setUpdateFormData({...updateFormData, deadline:e.target.value})}/>
            
            {/* <ul className = "categories-list">
                <p style={{color:"grey"}}> R: Realistic  → Is your updated goal realistic?</p>
                {yesNo.map((answer)=>{
                    return(
                        <div key={answer} className="radio-Btn">
                            <label>
                                <input 
                                type="radio"
                                name="categories-name"
                                value={answer}
                                checked={goalDescription[3] === answer}
                                onChange={handleChangeRealistic}
                                />{answer}
                            </label>
                        </div>
                     )
                })}
            </ul> */}
            <br />

            <label>
            <h3 style={{paddingLeft: "30px"}}><u> How many starts would you say your goal is worth?</u></h3>
            <span>
                {Array(5)
                .fill()
                .map((_, index) => (
                <Star 
                key={index} 
                filled={index < updateFormData.value} 
                onClick={() => setUpdateFormData({...updateFormData, value:index + 1})} />
                ))}
            </span>
                                
            </label>
            
            <br />
            <br />

            <button className="submitBtn">Submit my New Goal !</button>

            <div className="errors">
              <label id="errors" style={{color:"red"}}>
                {errors.map((err) => (
                  <ul><em key={err}>{err}</em></ul>
                  ))}
                
              </label>
              </div>

        </form>
        </div>
        </div>
        </>
    )
}
export default UpdateGoalForm;

