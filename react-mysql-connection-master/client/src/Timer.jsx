import React from 'react'
import './Home.css';
import CountDown from './components/CountDown.js';

/*
  Noura Almasri Contribution
*/
function Timer() {
  return (
    <div className="Timer">
       <CountDown seconds = {5} />
    </div>
  );
}

export default Timer;