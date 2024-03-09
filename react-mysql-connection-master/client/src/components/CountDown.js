import React, { useEffect, useRef, useState } from "react";
//import '../Home.css';
import { useNavigate, useLocation} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";

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

const CountDown = () => {
    const location = useLocation();
    const initialDuration = location.state.initialDuration;
    const intensity = location.state.intensity;
    const navigate = useNavigate();
    const[countdown, setCountdown] = useState(initialDuration)
    const[paused, setPaused] = useState(false);
    const timerId = useRef()

    useEffect(() => {
        console.log("Initial Duration:", initialDuration);
        console.log("Intensity:", intensity);
    }, [initialDuration, intensity]);

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
                //navigate('/');
               
            }, 1000);
        }
    }, [countdown,navigate])

    const pauseTimer = () => {
        clearInterval(timerId.current);
        setPaused(true);
    };

    const resumeTimer = () => {
        timerId.current = setInterval(() => {
        setCountdown(prev => prev -1);
    }, 1000);
    setPaused(false);
    };

    const alertHeartRate = () => {
        window.alert("Your heart rate exceeded the threshold! Please take a break!");
    };

    const menuOptionClick = () => {
        navigate('/menu');
    };

    const logoutClick = () => {
        navigate('/login');
    };

    // const profileClick = () => {
    //     navigate('/profile');
    // };

    // const homeClick = () => {
    //     navigate('/home');
    // };
    const intensityColor = () => {
        switch (intensity){
            case 'Low':
                return 'low-background';
            case 'Moderate':
                return 'moderate-background';
            case 'High':
                return 'high-background';
        }
    }


    return (
        <div className="wrapper">
            <div className="phone-container">
            <div className="phone-screen">
            <div className="menu_button">
        <IoMenu size={35} onClick={menuOptionClick}/>
            </div> 
        <div className={`timer-container ${intensityColor()}`}>
       {/* Apply background color */}
        <h2 className= "timer">  {formatTime(countdown)}</h2>
        </div>
        <div class= "timer_buttons">
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={resumeTimer} disabled={!paused}>Resume</button>
            </div>
            <div class= "timer_endWorkout">
            <button onClick={alertHeartRate}>End Workout</button>
            </div>
          {/* Bottom navigation bar */}
            <div className="bottom-nav">
                <button className="icon-with-text">
                <FaHome />
                <span>Home</span>{/* Text below the icon */}
                </button>
                <button className="icon-with-text">
                <FaUser />
                <span>User</span>{/* Text below the icon */}
                </button>
                <button className="icon-with-text" onClick={logoutClick}>
                <HiOutlineLogout />
                <span>Logout</span>{/* Text below the icon */}
                </button>
            </div>
        </div>
        </div>
    </div>
    )
}
export default CountDown