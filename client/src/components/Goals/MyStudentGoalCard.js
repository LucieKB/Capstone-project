import React, {useState} from "react";
import StarConditional from "./StarConditional";

function MyStudentGoalCard({goal, student, user, setUser}){
    const [errors, setErrors] = useState([]);
    
console.log(user)
    const onUpdateGoal = (updatedGoal) =>{
        const modifiedGoal = 
        goal.id == updatedGoal.id?
            ( updatedGoal) : (goal)
        
        const updatedStudent = {...student, goals: modifiedGoal }
        setUser({...user, students: updatedStudent})
        //update user
    }
    

    // const onUpdatePost = (thisUpdatedPost) => {
    //     const modifiedPosts = user.posts.map((post)=>{
    //         if (post.id === thisUpdatedPost.id) {
    //             return thisUpdatedPost;
    //         } else {
    //             return post
    //         }
    //     })
    //     const updatedUser = {...user, posts: modifiedPosts};
    //     setUser(updatedUser);
    //     navigate(`/users/${user.id}/posts`)
    // }

    function handleValidate(){
        console.log("clicked")
        fetch(`students/${student.id}/goals/${goal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                validated_by_parent: true
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedGoal) => (onUpdateGoal(updatedGoal)));
            } else {
                r.json().then((err)=>setErrors(err.errors))  
            }
            
        });
    }

    console.log(goal)
    console.log(student.goals)
    return(
        <div>
           
            <div>
                {student.goals.map((g)=>{
                    return(
                <div key={g.id}>
                                <em> Created on {g.created_at}</em>
                                <li>Title : {g.title}</li>
                                <li>Description : {g.description}</li>
                                <li>Deadline : {g.deadline}</li>
                                <li>Category : {g.goal_category}</li>
                                <li>Value : 
                                    <span>
                                        {Array(5)
                                        .fill()
                                        .map((_, index) => (
                                        <StarConditional 
                                        key={index} 
                                        filled={index < g.value}
                                        goal = {g} />
                                        ))}
                                    </span>
                                </li>
                                <button onClick={handleValidate}>Validate this goal</button>
                                <button>Add Message</button>
                            </div>
                )})}
            </div> 
     </div>                            

)}

export default MyStudentGoalCard
