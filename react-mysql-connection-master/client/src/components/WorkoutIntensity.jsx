import React, { useState, useContext } from "react";
import '../Home.css';
import CountDown from "./CountDown";
import { IoClose } from "react-icons/io5";
import { useNavigate} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";
import UserContext from '../UserContext';
import IntensePic from "../assets/intensepic.png"
/*
    Release 2: Noura Almasri's Contribution
*/
const Workout = () => {
    const navigate = useNavigate();
    const[timeDropDown, setTimeChoosen] = useState(false);
    const[intensityDropDown, setIntensityChoosen] = useState(false);
    const [selectedTime, setTime] = useState('TIME');
    const[selectedTimeVal, setSelectedTimeVal] = useState(null);
    const [selectedIntensity, setIntensity] = useState('INTENSITY');
    const { userEmail } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    console.log(userEmail);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleTimeChange = (label, value) => {
        const minutes = value / 60;
        
        setTime(`${label}`);
        setSelectedTimeVal(value); 
        setTimeChoosen(false);


    };


    const handleWorkoutButton = () => {
        navigate('/intensity')
    };

    const handleRelaxButton = () => {
        navigate('/relax')
    };

    const handleMapButton = () => {
        navigate('/maps')
    };


    const handleIntensityChange = (value) => {
        setIntensity(value);
        setIntensityChoosen(false);

    };
    const handleStart = () => {
        
        console.log("Selected Time:", selectedTime);
        console.log("Selected Intensity:", selectedIntensity);
   
        navigate("/countdown", {state:{initialDuration: selectedTimeVal, intensity: selectedIntensity}});
    };

    // const menuOptionClick = () => {
    //     navigate('/menu');
    // };

    const logoutClick = () => {
        navigate('/login');
    };

    const profileClick = () => {
        navigate(`/personalPage?email=${encodeURIComponent(userEmail)}`);
    };

    const homeClick = () => {
        navigate(`/home?email=${encodeURIComponent(userEmail)}`);
    };
   
return (
    <section className="home-section" style={{ backgroundImage: `url(${IntensePic })`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
    <header>
    <ul className="navigation-WI">
                <li><a href="#"  onClick={homeClick}>
                <div style={{ position: "relative"}}>
                    Home
                    <FaHome style={{ position: "absolute", top: 0, left: -20 }}/> {/* Using FaHome icon */}
                </div>
                </a></li>
                <li><a href="#"  onClick={profileClick}>
                    <div style={{ position: "relative" }}>
                        User
                         <FaUser style={{ position: "absolute", top: 0, left: -20 }}/>{/* Using FaHome icon */}
                     </div>
                </a></li>
                <li><a href="#"  onClick={logoutClick}>
                    <div style={{ position: "relative" }}>
                        Logout
                        <HiOutlineLogout style={{ position: "absolute", top: 0, left: -20 }}/> {/* Using FaHome icon */}
                     </div>
                </a></li>
            </ul>
    {/* <div className="workout-container"> */}
        <div className="menu-intensity-container">
        <div className="intensity-menu">
                <IoMenu size={35} onClick={toggleMenu} />
            </div>
        </div>
        
        <h1 className="workout-title" >CHOOSE YOUR WORKOUT...</h1>{/* Title */}
        <div className="that" ></div>
        <div className="intensity-container">
        <div className="dropdown">
            <div className="select" onClick={() => setTimeChoosen(!timeDropDown)}>
                <span className="selected">{selectedTime}</span>
                <div className="caret"></div>
            </div>
            <ul className={`menu ${timeDropDown ? 'menu-open' : ''}`}>
                <li onClick={() => handleTimeChange(`20 Mins`, 1200)}>20 Mins</li>
                <li onClick={() => handleTimeChange(`30 Mins`, 1800)}>30 Mins</li>
                <li onClick={() => handleTimeChange(`40 Mins`, 2400)}>40 Mins</li>
                <li onClick={() => handleTimeChange(`60 Mins`, 3600)}>60 Mins</li>
            </ul>
            </div>
            
        
        <div className="dropdown">
            <div className="select" onClick={() => setIntensityChoosen(!intensityDropDown)}>
                <span className="selected">{selectedIntensity}</span>
                <div className="caret"></div>
            </div>
            <ul className={`menu ${intensityDropDown ? 'menu-open' : ''}`}>
                <li onClick={() => handleIntensityChange('Low')}>Low</li>
                <li onClick={() => handleIntensityChange('Moderate')}>Moderate</li>
                <li onClick={() => handleIntensityChange('High')}>High</li>
            </ul>
            </div>
        </div>
        {/*Sztart workout button*/}
        {/* <CountDown selectedTime={selectedTime } selectedIntensity={selectedIntensity}/> */}
        <button className="start-workout" onClick={handleStart}>Start</button>
       
        </header>
        <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
    <button className="exit-icon" onClick={toggleMenu}>
    <IoClose size={30} style = {{color: '#f78731', background:'transparent'}} />
    </button>
    <ul className="navigation_menu">
        <li><a href="#" onClick={handleWorkoutButton}>Start Workout</a></li>
        <li><a href="#" onClick={handleRelaxButton}>Relaxation Techniques</a></li>
        <li><a href="#" onClick={handleMapButton}>Find a Nearby Store</a></li>
    </ul>
</div>
        </section>
    
   );
}

export default Workout;