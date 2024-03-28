import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Axios from "axios";
import login_logo from './assets/logos.png';
import UserContext from './UserContext'; // Import UserContext

/*
  Release 1 & Release 2: Mahalaxmi Kalappareddigari's Contribution
  Release 2: Mahin Patel's Contribution
*/
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const { setUserEmail } = useContext(UserContext); // Access setUserEmail from UserContext

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
        setUserEmail(email); // Set user email using setUserEmail from UserContext
        setTimeout(() => {
          navigate(`/home?email=${encodeURIComponent(email)}`);
        }, 1000);
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
