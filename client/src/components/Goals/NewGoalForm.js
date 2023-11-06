import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Star from "./Star";


function NewGoalForm({onAddNewGoal, setShowGoalForm, showGoalForm}){
    const {user, setUser} = useContext(UserContext)
    const [formData, setFormData]=useState({
        goal_category : (""),
        title: (""),
        description : (""),
        goal_date: (""),
        achieved: (false),
        value:(0)
      })

    const categories = ["Ready", "Respectful", "Responsible", "Academic", "Other"]
    const navigate = useNavigate()

    const handleChangeCategory = (e) => {
        if(e.target.checked)
            {  
                setFormData({...formData, goal_category:e.target.value})
            }
    }

    
console.log(formData)

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
                 description: formData.description,
                 goal_date: formData.deadline,
                 achieved: formData.achieved,
                 value: formData.value,
                 user_id: user.id
            }),
        })
            .then(r=>r.json())
            .then ((newGoal) => {
                onAddNewGoal(newGoal);
                
                setFormData({
                    goal_category : (""),
                    title: (""),
                    description : (""),
                    goal_date: (""),
                    achieved: (false),
                    value:(0)
                });
            });
            setShowGoalForm((showGoalForm) => !showGoalForm)
            navigate(`/students/${user.id}`);
    }

    
    return (

        <div>
        
            <div className="Header2">
                <h2> {user.username}'s New Goal !</h2>
            </div>
            <hr />

        <form className="new-goal-form" onSubmit={handleSubmit}>
            <ul className = "category-list">
                <h3><u> Pick your Goal Category</u></h3>
                {categories.map((catname)=>{
                    return(
                        <div key={catname} className="radio-Btn">
                            <label>
                                <input 
                                type="radio"
                                name="category-name"
                                value={catname}
                                checked={formData.goal_category === catname}
                                onChange={handleChangeCategory}
                                />{catname}
                            </label>
                        </div>
                     )
                })}
            </ul>
            <br />

            <h3><u> My New Goal's Title </u></h3>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Title"
                    onChange={(e)=>setFormData({...formData, title:e.target.value})}/>
            <br />

            <h3><u> Describe your goal and how you will reach it.</u></h3>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    placeholder="Briefly describe your goal"
                    onChange={(e)=>setFormData({...formData, description:e.target.value})}/>
            <br />
            
            <h3><u> When would you like this goal to be achieved by?</u></h3>
                <input
                    type="date"
                    name="goal_date"
                    value={formData.goal_date}
                    placeholder="Deadline to reach my goal"
                    onChange={(e)=>setFormData({...formData, goal_date:e.target.value})}/>
            
            <br />

            <label>
            <h3><u> How many starts would you say your goal is worth?</u></h3>
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

            {/* <h3><u> How many starts would you say your goal is worth?</u></h3>
                <input
                    type="radio"
                    name="value"
                    value="5"
                    onChange={(e)=>setFormData({...formData, value:e.target.value})}/> */}
            
            <br />
            <br />

            <button>Submit my New Goal !</button>

        </form>
        </div>
    )
}
export default NewGoalForm;