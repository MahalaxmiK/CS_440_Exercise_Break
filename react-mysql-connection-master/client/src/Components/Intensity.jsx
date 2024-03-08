import React, {useEffect, useState} from "react";
import './Home.css';
import   "./CountDown";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";

const Workout = () => {
    const navigate = useNavigate();
    const [selectedTime, setTime] = useState(1200);
    const [selectedIntensity ,setIntensity] = useState("");

    const handleTimeChange = (event) => {
        setTime(parseInt(event.target.value));
    };
    const handleIntensityChange = (event) => {
        setIntensity(event.target.innerText);

    }
    const handleStart = () => {
        navigate("/countdown", {state:{initialDuration: selectedTime, intensity: selectedIntensity}});
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
    
    useEffect (() => {
        const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    select.addEventListener('click', ()=> {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');

    }); 
    options.forEach( option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');
        options.forEach(option => {
            option.classList.remove('active');
        });
        option.classList.add('active');
    
    });
    });
});
    }, []);

   
return (
    <div className="workout-container">
        <div className="menu-intensity">
            <IoMenu size={35} onClick={menuOptionClick}/>
        </div>
        <h1 className="workout-title">Choose your workout...</h1>{/* Title */}
        <div className="dropdown">
            <div className="select">
                <span className="selected">TIME</span>
                <div className="caret"></div>
            </div>
            <ul className="menu" onChange={handleTimeChange}>
                <li value="1200">20 Mins</li>
                <li value="1800">30 Mins</li>
                <li value="2400">40 Mins</li>
                <li value="3600">60 Mins</li>
            </ul>
        </div>
        <div className="dropdown">
            <div className="select">
                <span className="selected">INTENSITY</span>
                <div className="caret"></div>
            </div>
            <ul className="menu" onClick={handleIntensityChange}>
                <li>Low</li>
                <li>Moderate</li>
                <li>Hard</li>
            </ul>
        </div>
        {/*Start workout button*/}
        {/* <CountDown initialDuration={selectedTime } intensity={selectedIntensity}/> */}
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