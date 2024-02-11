import React, {useState} from 'react'
import './Signup.css'
import Axios from "axios";


const Signup = () => {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[gender, setGender] = useState("")
    const[height, setHeight] = useState("")
    const[weight, setWeight] = useState("")
    const[age, setAge] = useState("")
    const [registerStatus, setRegisterstatus] = useState("")
    const [isButtonDisabled, setButtonDisabled] = useState(false); // Added state for button disabled status


    const register = (e) => {
        e.preventDefault();
        
        Axios.post("http://localhost:3000/register", {
            email: email,
            password: password,
            gender: gender,
            height: height,
            weight: weight,
            age: age,
        }).then((response) => {
            console.log(response.data);
            if(response.data.message){
                setRegisterstatus(response.data.message)
            } else{
                setRegisterstatus("Account Created Successfully!")
                setButtonDisabled(true);
            }
        }).catch((error) => {
            console.error("error during registration", error)
        });
    }

    return (
        <div className = 'container'>
            <form>
            <div className="header">
                <div className="text">Please Enter All Fields</div>
               
            </div> 
            <div className="inputs">
                <input type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your email" />
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your password" />
                <input type="text"  onChange={(e) => {setGender(e.target.value)}} placeholder="Enter your gender" />
                <input type="text" onChange={(e) => {setHeight(e.target.value)}} placeholder="Enter your height" />
                <input type="text" onChange={(e) => {setWeight(e.target.value)}} placeholder="Enter your weight" />
                <input type="text" onChange={(e) => {setAge(e.target.value)}} placeholder="Enter your age" />
            </div>
            {/* <div className="submit-container"> */}
            <div className="text-dark">
                <button name = 'submit' className = 'btn btn-success' disabled = {isButtonDisabled} onClick={register}> Sign Up
                </button>
            </div>
            </form>
            {registerStatus && (
  <div className="status-message">{registerStatus}</div>
)}



        </div> // container
    )
}
export default Signup