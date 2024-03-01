import React from "react";
import "./App.css";
import exercise_logo from './assets/start_workout.png';
import { useNavigate  } from "react-router-dom";

/*
  Mahalaxmi Kalappareddigari Contribution
*/
function WorkOutPage() {
  const navigate = useNavigate();
  return (
    <div className="exercisecontainer">
      <div className="exercise">
        <h1>Exercise Dashboard</h1>
        <img src={exercise_logo} alt="#" className="exercise-logo" />
        <button className="start" onClick={()=> {navigate('/timer');}}>Start Workout</button>
        <button className="exit" onClick={() => {navigate('/');}}>Exit Application</button>
      </div>
    </div>
  );
}

export default WorkOutPage;