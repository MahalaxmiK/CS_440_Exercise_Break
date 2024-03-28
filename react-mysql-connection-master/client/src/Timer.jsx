import React from 'react'
import './Home.css';
import CountDown from './components/CountDown.js';

/*
  Release 1: Noura Almasri's Contribution
*/
function Timer() {
  return (
    <div className="Timer">
       <CountDown seconds = {5} />
    </div>
  );
}

export default Timer;