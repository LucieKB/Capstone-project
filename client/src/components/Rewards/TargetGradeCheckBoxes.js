import React, {useState, useEffect} from "react"

function TargetGradeCheckBoxes({targetGrades, setTargetGrades, newRForm, setNewRForm}){
    const grades = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    const [isDisabled, setIsDisabled]=useState(false)
    
    
    const handleCheck = (e) => {
        let myTargetGrades=[...targetGrades, e.target.name];
        setTargetGrades(myTargetGrades)
        setNewRForm({...newRForm, target_grade: myTargetGrades})
    }


    useEffect(()=>{
        if (targetGrades.length > 3){
            setIsDisabled(!isDisabled)
        }
    }, [targetGrades.length])

    return(
        <div className="checkboxes">
            <strong><u>Target Grades for this Item :</u></strong><em style={{color:"red"}}>*</em><em>(Max 4)</em>
            <ul className="grades-list">
                {grades.map((grade, index)=>{
                        return(
                            <li key={index}>
                                <div>
                                    <input
                                    type="checkbox"
                                    id={index}
                                    name={grade}
                                    disabled = {isDisabled}
                                    onChange={handleCheck}/>
                                    {grade}
                                </div>
                            </li>
                        )
                 })}
            </ul>
        </div>
    )
}

export default TargetGradeCheckBoxes;