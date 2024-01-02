import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link,  useParams } from "react-router-dom";



function MyStudentGoalsList({goal}){
    const {user, setUser} = useContext(UserContext)
    const {student_id} = useParams()
    // const [showGoal, setShowGoal] = useState(false)
    // const student = user.students.find(student => student.id === student_id)
    const goalDeadline = new Date(`${goal.deadline}`)
    const today = (new Date())
    const difference_in_time = goalDeadline.getTime() - today.getTime()
    const difference_in_days = difference_in_time / (1000 * 3600 * 24);
    const difference_in_hours = Math.round(((difference_in_days + Number.EPSILON)*100)/100 * 60) 


        let wordColor;
        if (difference_in_days < 1){
            wordColor = "#FF003F"
        }
        else if (difference_in_days <3 && difference_in_days>1){
            wordColor = "#FFA500"
        }
        else {wordColor = "#66FF00"}

    return(
        <div key={goal.id} id={goal.id}>
           
            <div>
                <div>
                    
                    <p style={{fontSize:"16px"}}><u>
                        <Link to={`/parents/${user.id}/students/${student_id}/goals/${goal.id}`}><strong>{goal.title}</strong></Link>
                                    </u><em> &nbsp; - &nbsp; Created on {goal.created_at.split('T')[0]}</em> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p style={{backgroundColor: `${wordColor}`}}>{(Math.abs(difference_in_days) >= 1) ? (Math.round(difference_in_days)+" days"):(difference_in_hours+" hours")} left to complete</p>
                                    <hr style={{border:"dotted 1px darkgrey"}}></hr>
                    </p>
                </div>                
                           
                                
            
            </div> 
     </div>                            

)}

export default MyStudentGoalsList
