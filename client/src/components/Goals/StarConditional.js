import { FaStar } from "react-icons/fa";
import React, {useEffect, useState} from "react"

function StarConditional({ filled, goal }) {
    const [starColor, setStarColor] = useState("")

  useEffect (() =>{
        if (goal.validated_by_parent === false && goal.validated_by_educator === false){
            setStarColor("red")
        }
        else if (goal.validated_by_parent === false && goal.validated_by_educator === true || goal.validated_by_parent === true && goal.validated_by_educator === false){
            setStarColor("orange")
        }
        else if (goal.validated_by_parent === true && goal.validated_by_educator === true){
            setStarColor("green")
        }

    }, [goal])
   

  return (
    
    <FaStar 
     color={filled ? `${starColor}` : "lightgray"} 
     />
  );
}
export default StarConditional;