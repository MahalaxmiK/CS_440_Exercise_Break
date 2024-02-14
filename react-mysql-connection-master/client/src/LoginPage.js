import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import login_logo from './assets/exercise.png';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
        window.location.href = "/maps";
      } else {
        // Redirect to the workout page after successful login
        window.location.href = "/maps";
      }
    });
  };

  return (
    <div className="container">
      <div className="loginForm">
        <form>
          <h4>Login Here</h4>
          <img src={login_logo} alt="#" className="app-logo" />
          <label htmlFor="username">Email<i className="fas fa-envelope"></i> {/* Font Awesome user icon */}</label>
          <input
            className="textInput"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            required
          />
          <label htmlFor="password">Password<i className="fas fa-lock"></i> {/* Font Awesome user icon */}</label>
          <input
            className="textInput"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            required
          />
          <input
            className="button"
            type="submit"
            onClick={login}
            value="Login"
          />
          <h1 style={{ color: "red", fontSize: "15px", textAlign: "center", marginTop: "20px" }}>{loginStatus}</h1>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;