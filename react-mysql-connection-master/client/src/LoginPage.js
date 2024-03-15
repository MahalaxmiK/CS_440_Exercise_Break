import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Axios from "axios";
import login_logo from './assets/logos.png';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  useEffect(() => {
    // Retrieve user dictionary from localStorage
    const userDictionary = JSON.parse(localStorage.getItem('userDictionary')) || {};
    
    // Check if first and last names are stored in localStorage based on the logged-in user's email
    const storedNames = userDictionary[email];
    
    // If found, set the state variables
    if (storedNames) {
        setFname(storedNames.fname);
        setLname(storedNames.lname);
    }
  }, [email]);

  const navigateToSignUp = () => {
    navigate('/signup');
  }

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.status === 200) {
        setLoginStatus(response.data.message);
        // Check if user information is available in localStorage
        if (fname && lname) {
          // If available, navigate to update profile page with stored first and last name
          navigate("/updateProfile", { state: { fname: fname, lname: lname } });
        } else {
          // If not available, navigate to update profile page with retrieved first and last name
          const { fname: retrievedFname, lname: retrievedLname } = response.data;
          navigate("/updateProfile", { state: { fname: retrievedFname, lname: retrievedLname } });
        }
      } else if (response.status === 401) {
        setLoginStatus(response.data.message);
        console.error("Login failed:", response.data.message);
      }
    }).catch((error) => {
      console.error("Login error:", error);
      setLoginStatus("Error occurred while logging in. Please try again later!");
    });
  };

  return (
    <div className="container">
      <div className="loginForm">
        <form>
          <img src={login_logo} alt="#" className="app-logo" />
          <h4>Exercise Break App</h4>
          <h3>Sign In</h3>
          <label htmlFor="username">Email</label>
          <input className="textInput" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" required/>
          <label htmlFor="password">Password</label>
          <input className="textInput" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" required />
          <input className="button" type="submit" onClick={login} value="Log In"/>
          <h5>New User? <span className="signup-link" onClick={navigateToSignUp}>Sign Up</span></h5>
          <h1 style={{ color: "black", fontSize: "15px", textAlign: "center", marginTop: "20px", fontFamily: 'Georgia' }}>{loginStatus}</h1>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
