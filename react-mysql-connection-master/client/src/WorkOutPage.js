import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import exercise_logo from './assets/start_workout.png';


function WorkOutPage() {
  return (
    <div className="exercisecontainer">
      <div className="exercise">
        <Link to="/workout" style={{ textDecoration: 'none' }}><h1>Exercise Dashboard</h1></Link>
        <img src={exercise_logo} alt="#" className="exercise-logo" />
        <Link to="/workout" style={{ textDecoration:'none' }}><button className="start">Start Workout</button></Link>
        <Link to="/workout" style={{ textDecoration:'none' }}><button className="exit">Exit Application</button></Link>
      </div>
    </div>
  );
}

export default WorkOutPage;