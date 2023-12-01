import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../../contexts/UserContext";
import { RewardsContext } from "../../contexts/RewardsContext";
import { useNavigate } from "react-router-dom";


function NewRewardForm(){
    const {user} = useContext(UserContext)
    const {rewards, setRewards} = useContext(RewardsContext)
    const [newRForm, setNewRForm]=useState({
        title:(""),
        description:(""),
        image: (""),
        pickup_place: (""),
        price: (""), 
        reward_category: (""),
        reward_condition: (""),
        buyer: (""),
        available: true,
        user_id: user.id,
        collected: false
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [schools, setSchools] = useState ("")
    const [schoolSuggestions, setSchoolSuggestions] = useState([])
    const [schoolSearch, setSchoolSearch] = useState("")
    const navigate = useNavigate()

    useEffect(()=> {
        fetch("/schools/name")
        .then(r => r.json())
        .then(schools => setSchools(schools))
    }, [])

    const onSuggest = (sugg) =>
    {console.log(sugg)
        setNewRForm({...newRForm, pickup_place:sugg})
        setSchoolSearch(sugg);
        setSchoolSuggestions([]);
    }

    const categories = [" ", "Games","Books", "Tech", "Clothing", "Outdoors", "Gift-Card", "Other"]
    const handleChangeCategory = (e) =>{
        setNewRForm({...newRForm, reward_category:e.target.value})
    }
    const conditions = ["New", "Used - Good", "Used - Fair"]
    const handleChangeRewardCondition = (e) =>{
        setNewRForm({...newRForm, reward_condition:e.target.value})
    }

    function handleAddNewReward(newReward){
        console.log(newReward)
        setRewards([...rewards, newReward])
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true);

        fetch ("/rewards",{
            method:"POST",
            headers:{
            "Content-Type": "application/json", 
            },
            body: JSON.stringify(newRForm)
        }).then((r)=>{
             console.log(r)   
             setIsLoading(false);
                if (r.ok) {
                    r.json().then ((newReward) => {
                        handleAddNewReward(newReward);
                    setErrors([]);   
                })
                } else {
                    console.log(errors)
                     r.json().then((err) => setErrors(err.errors));
                }
    
            });

        setNewRForm({
            title:(""),
            description:(""),
            image: (""),
            pickup_place: (""),
            price: (""),
            reward_category: (""),
            reward_condition: (""),
            buyer: (""),
            available: true,
            user_id: user.id,
            collected: false 
        });
        
        navigate("/rewards");
    }

    return(
        <form onSubmit={handleOnSubmit}>
        <div>
            <label><strong><u>Title:</u></strong><em style={{color:"red"}}>*</em>
            <input
                    type="text"
                    id="title"
                    autoComplete="off"
                    placeholder="Item's name ..."
                    value={newRForm.title}
                    onChange={(e) => setNewRForm({...newRForm, title:e.target.value})}
                />
            </label>

            <label><strong><u>Item Category:</u>&nbsp;</strong>
              <select onChange={handleChangeCategory}>
                {categories.map((cat)=> {
                  return (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  )
                })}
              </select>
            </label>

            <label><strong><u>Short Description:</u></strong>
            <input
                    type="text"
                    id="description"
                    autoComplete="off"
                    placeholder="Item's description ..."
                    value={newRForm.description}
                    onChange={(e) => setNewRForm({...newRForm, description:e.target.value})}
                />
            </label>

            <label><strong><u>Image :</u></strong><em style={{color:"red"}}>*</em>
            <input
                    type="text"
                    id="image"
                    autoComplete="off"
                    placeholder="Copy image's URL ..."
                    value={newRForm.image}
                    onChange={(e) => setNewRForm({...newRForm, image:e.target.value})}
                />
            </label>

            <label><strong><u>Which school will you drop the item off at? </u></strong><em style={{color:"red"}}>*&nbsp;</em>
                <input
                className="form-control"
                type="text"
                value={schoolSearch}
                onChange={(e) => {
                    setSchoolSearch(e.target.value)
                    const mySchool = schools.filter((school) => {
                    return school.toLowerCase().includes(schoolSearch.toLowerCase()) 
                })
                console.log('mySchool', mySchool)
                setSchoolSuggestions(mySchool)
                }
                }
              />
              {schoolSuggestions.map((sugg, i) => 
              <div key={i} className="sugg justify-content-md-center" onClick={()=>onSuggest(sugg)}>{sugg}</div>
              )}
              
            </label>

            <label>
            {conditions.map((c)=>{
                            return(
                                <div key={c} className="radio-Btn">
                                        <input 
                                        type="radio"
                                        name="condition"
                                        value={c}
                                        checked={newRForm.reward_condition === c}
                                        onChange={handleChangeRewardCondition}
                                        />{c}
                                </div>
                            )
                        })}
            </label>

            <label> <strong><u>Price:</u></strong><em style={{color:"red"}}>*</em>
              <input
                  className="form-control"
                  type="number"
                  pattern="[0-20]*"
                  name="price"
                  value={newRForm.price}
                  placeholder="How many ⭐️ are you asking for this item?"
                  onChange={(e)=>setNewRForm({...newRForm, price:e.target.value})}
              />
            </label>
        </div>
        <button type="submit">{isLoading ? "Loading..." : "Submit My Item"}</button>
              
              <label style={{color:"red"}}>
                {errors.map((err) => (
                  <em key={err}>{err}</em>
                  ))}
                
              </label>
        </form>
        
    )
}

export default NewRewardForm