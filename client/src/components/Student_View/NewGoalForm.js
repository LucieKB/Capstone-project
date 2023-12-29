import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { GoalsContext } from "../../contexts/GoalsContext"
import { useNavigate } from "react-router-dom";
import Star from "../Goals/Star";
import "./NewGoalForm.css"


function NewGoalForm({onAddGoal, setSeeGoalForm}){
    const {user, setUser} = useContext(UserContext)
    const {goals, setGoals} = useContext(GoalsContext)
    const [errors, setErrors] = useState([])
    const [goalDescription, setGoalDescription] = useState(["", "", "", "", ""])
    const [formData, setFormData]=useState({
        goal_category : (""),
        title: (""),
        description : (""),
        deadline: (""),
        achieved: (false),
        value:(0), 
        validated_by_educator:(false),
        validated_by_parent:(false),
        achieved_by_educator:(false),
        achieved_by_parent: (false)
      })

    // const goals = user.goals

    const categories = ["Ready", "Respectful", "Responsible", "Academic", "Other"]
    const navigate = useNavigate()

    const handleChangeCategory = (e) => {
        if(e.target.checked)
            {  
                setFormData({...formData, goal_category:e.target.value})
            }
    }

    const yesNo = ["Yes", "No", "I'm not sure"]
    const handleChangeRealistic = (e) => {
        if(e.target.checked && e.target.value === "Yes")
            {  
                setGoalDescription([goalDescription[0],goalDescription[1],goalDescription[2], e.target.value])
                setFormData({...formData, description: goalDescription})
            }
        else{
            alert("If you don't feel that your goal is realistic, modify it. If you need help, ask an adult to assist you in writing that goal.")
        }
    }

    
console.log("formData=",formData)

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData({...formData})
        fetch (`/students/${user.id}/goals`, {
            method: "POST",
            headers: {
             "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                 goal_category: formData.goal_category,
                 title: formData.title,
                 description: (formData.description).join(" / "),
                 deadline: formData.deadline,
                 achieved: formData.achieved,
                 value: formData.value,
                 validated_by_parent: false,
                 validated_by_educator: false,
                 user_id: user.id,
                 achieved_by_educator:(false),
                 achieved_by_parent: (false)
            }),
        })
            .then(r=>{
                if (r.ok){
                    r.json().then ((newGoal) => {
                onAddGoal(newGoal);
                setFormData({
                    goal_category : (""),
                    title: (""),
                    description : (""),
                    deadline: (""),
                    achieved: (false),
                    value:(0),
                    validated_by_educator:(false),
                    validated_by_parent:(false),
                    achieved_by_educator:(false),
                    achieved_by_parent: (false),
                    user_id: user.id
                });
                    });
            setSeeGoalForm(false);
            navigate(`/students/${user.id}/me`);
            }else{
                r.json().then((err) => {console.log(err.errors)
                setErrors(err.errors)
                setGoalDescription([goalDescription[0],goalDescription[1],goalDescription[2],""])}
            )}
                
            
            });
            
            
    }

// }).then((r) => {
//     setIsLoading(false);
//         if (r.ok) {
//             r.json().then((data) => onStudentSignUp(data));
//             setShowStudentForm(!showStudentForm);
//         } else {
//             r.json().then((err) => {console.log(err.errors)
//             setErrors(err.errors)}
//             )
//           }
    

//       });
     
// }

    console.log(goalDescription)

    
    return (
        <>
        <div className="goal-wrapper">
        <div className="newGoal-inner" 
        style={{marginTop:"5%", marginBottom:"100px"}}
        >
        
            <div className="Header2">
                <h2 style={{textAlign:"center", lineHeight:"40px", fontSize:"30px"}}> {user.username}'s New Goal !</h2>
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
                                checked={formData.goal_category === catname}
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
                    value={formData.title}
                    placeholder="Title"
                    onChange={(e)=>setFormData({...formData, title:e.target.value})}/>
            

            <h3 style={{paddingLeft: "30px"}}><u> Describe your goal and how you will reach it.</u></h3>
                <input
                    className="form-control"
                    type="text"
                    name="S"
                    value={goalDescription[0]}
                    placeholder="S: Specific → What will you do?"
                    onChange={(e)=>setGoalDescription([e.target.value])}/>
            
            <input
            className="form-control"
                    type="text"
                    name="M"
                    value={goalDescription[1]}
                    placeholder="M: Measurable  → How will you know when your goal is achieved?"
                    onChange={(e)=>setGoalDescription([goalDescription[0], e.target.value])}/>
            
            <input
            className="form-control"
                    type="text"
                    name="A"
                    value={goalDescription[2]}
                    placeholder="A: Achievable → What do you need to achieve that goal?"
                    onChange={(e)=>setGoalDescription([goalDescription[0],goalDescription[1], e.target.value])}/>
            
            <ul className = "categories-list">
                <p style={{color:"grey"}}> R: Realistic  → Is your goal realistic?</p>
                {yesNo.map((answer)=>{
                    return(
                        <div key={answer} className="radio-Btn">
                            <label>
                                <input 
                                type="radio"
                                name="R"
                                value={answer}
                                checked={goalDescription[3] === answer}
                                onChange={handleChangeRealistic}
                                />{answer}
                            </label>
                        </div>
                     )
                })}
            </ul>
            <br />

     
            <h3 style={{paddingLeft: "30px"}}><u> T: When would you like this goal to be achieved by?</u></h3>
                <input
                    
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    placeholder="Deadline to reach my goal"
                    onChange={(e)=>setFormData({...formData, deadline:e.target.value})}/>
            
            <br />

            <label>
            <h3 style={{paddingLeft: "30px"}}><u> How many starts would you say your goal is worth?</u></h3>
            <span>
                {Array(5)
                .fill()
                .map((_, index) => (
                <Star 
                key={index} 
                filled={index < formData.value} 
                onClick={() => setFormData({...formData, value:index + 1})} />
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
export default NewGoalForm;

