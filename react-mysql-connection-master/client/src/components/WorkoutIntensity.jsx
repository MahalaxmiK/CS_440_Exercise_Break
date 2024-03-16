import React, {useEffect, useState} from "react";
import '../Home.css';
import CountDown from "./CountDown";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";


const Workout = () => {
    // const location = useLocation();
    const navigate = useNavigate();
    const[timeDropDown, setTimeChoosen] = useState(false);
    const[intensityDropDown, setIntensityChoosen] = useState(false);
    const [selectedTime, setTime] = useState('TIME');
    const[SelectedTimeVal, setSelectedTimeVal] = useState(null);
    const [selectedIntensity ,setIntensity] = useState('INTENSITY');



    const handleTimeChange = (label, value) => {
        const minutes = value / 60;
        
        setTime(`${label}`);
        setSelectedTimeVal(value); 
        setTimeChoosen(false);


    };
    const handleIntensityChange = (value) => {
        setIntensity(value);
        setIntensityChoosen(false);

    };



    const handleStart = () => {
        
        console.log("Selected Time:", selectedTime);
    console.log("Selected Intensity:", selectedIntensity);
    // console.log("Heart Ratessss:", heartRates);
   
        navigate("/countdown", {state:{initialDuration: SelectedTimeVal, intensity: selectedIntensity}});
    };
 

    const menuOptionClick = () => {
        navigate('/menu');
    };

    const logoutClick = () => {
        navigate('/login');
    };


    
   
return (
    <div className="workout-container">
        <div className="menu-intensity">
            <IoMenu size={35} onClick={() => setTimeChoosen(prev => !prev)}/>
        </div>
        <h1 className="workout-title">Choose your workout...</h1>{/* Title */}
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
        {/*Start workout button*/}
        {/* <CountDown selectedTime={selectedTime } selectedIntensity={selectedIntensity}/> */}
        <button className="start-workout" onClick={handleStart}>Start</button>
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
    
   );
}

export default Workout