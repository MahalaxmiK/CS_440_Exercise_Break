import React, {useEffect, useState} from "react";
//import '../Home.css';
import CountDown from "./CountDown";
import { useNavigate  } from "react-router-dom";

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
        <span className="selected">Intensity</span>
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
</div>
   );
}

export default Workout