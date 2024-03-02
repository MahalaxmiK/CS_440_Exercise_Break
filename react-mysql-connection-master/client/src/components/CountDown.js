import React, { useEffect, useRef, useState } from "react";
import '../Home.css';
import { useNavigate  } from "react-router-dom";

/*
    Release 1: Noura Almasri's Contribution
*/
const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)

    if(minutes <= 10 ) minutes = '0' + minutes;
    if(seconds < 10 ) seconds = '0' + seconds;
    return minutes + ':' + seconds
}

export default function CountDown({seconds}){
    const[countdown, setCountdown] = useState(seconds)
    const timerId = useRef()
    const navigate = useNavigate();

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev -1)

        }, 1000)
        return () => clearInterval(timerId.current)

    }, [])

    useEffect(() => {
        if(countdown <= 0){
            clearInterval(timerId.current)
            alert("END Workout")
            setTimeout(() => {
                navigate('/wantDrink');
            }, 1000);
        }
    }, [countdown])


    return (
        <div className="timer-container">
        <h2 className= "timer">  {formatTime(countdown)}</h2>
        </div>
    )
}