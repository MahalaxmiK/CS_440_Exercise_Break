import React, { useState } from 'react';
import '../Signup.css';
import Axios from 'axios';
import login_logo from '../assets/logos.png';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [registerStatus, setRegisterstatus] = useState('');
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post('http://localhost:3000/register', {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
                gender: gender,
                height: height,
                weight: weight,
                age: age,
            });

            if (response.data.message) {
                setRegisterstatus(response.data.message);
            } else {
                setRegisterstatus('Account Created Successfully!');
                setButtonDisabled(true);

                // Update user dictionary with the new account information
                updateUserDictionary(email, fname, lname);

                setTimeout(() => {
                    navigate('/updateProfile', { state: { fname: fname, lname: lname } });
                }, 1000);
            }
        } catch (error) {
            console.error('Error during registration', error);
        }
    };

    // Release 2 Sprint 3 (Store All Account's Email and Corresponding First & Last Name in Dictionary)
    const updateUserDictionary = (email, fname, lname) => {
        // Get existing user dictionary from localStorage
        const userDictionary = JSON.parse(localStorage.getItem('userDictionary')) || {};

        // Add the new user to the dictionary
        userDictionary[email] = { fname: fname, lname: lname };

        // Store the updated user dictionary in localStorage
        localStorage.setItem('userDictionary', JSON.stringify(userDictionary));
    };

    return (
        <div className="signup-container">
            <form>
                <img src={login_logo} alt="#" className="app-logo" />
                <h4>Exercise Break App</h4>
                <h3>Create New Account!</h3>
                <div className="inputs">
                    <input type="text" onChange={(e) => setFname(e.target.value)} placeholder="Enter your First Name" />
                    <input type="text" onChange={(e) => setLname(e.target.value)} placeholder="Enter your Last Name" />
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
                    <input type="text" onChange={(e) => setGender(e.target.value)} placeholder="Enter your Gender" />
                    <input type="text" onChange={(e) => setHeight(e.target.value)} placeholder="Enter your Height" />
                    <input type="text" onChange={(e) => setWeight(e.target.value)} placeholder="Enter your Weight" />
                    <input type="text" onChange={(e) => setAge(e.target.value)} placeholder="Enter your Age" />
                </div>
                <div className="text-dark">
                    <button name="submit" className="btn" disabled={isButtonDisabled} onClick={register}>
                        Sign Up
                    </button>
                </div>
            </form>
            {registerStatus && <div className="status-message">{registerStatus}</div>}
        </div>
    );
};

export default Signup;
