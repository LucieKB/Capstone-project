import React, {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Star from "./Star";


function NewGoalForm(){
    const {user, setUser} = useContext(UserContext)
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

    const goals = user.goals

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
            .then(r=>r.json())
            .then ((newGoal) => {
                setUser({...user, goals:[...goals, newGoal]});
                
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
                    achieved_by_parent: (false)
                });
            });
            // setShowGoalForm((showGoalForm) => !showGoalForm)
            navigate(`/students/${user.id}/me`);
    }

    
    return (

        <div>
        
            <div className="Header2">
                <h2> {user.username}'s New Goal !</h2>
            </div>
            <hr />

        <form className="new-goal-form" onSubmit={handleSubmit}>
            <ul className = "categories-list">
                <h3><u> Pick your Goal Category</u></h3>
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
                    name="deadline"
                    value={formData.deadline}
                    placeholder="Deadline to reach my goal"
                    onChange={(e)=>setFormData({...formData, deadline:e.target.value})}/>
            
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
            
            <br />
            <br />

            <button>Submit my New Goal !</button>

        </form>
        </div>
    )
}
export default NewGoalForm;

