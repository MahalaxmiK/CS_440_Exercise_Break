import React, { useEffect, useState} from 'react'
import './Menu.css'
import Axios from "axios";
import { ImCross } from 'react-icons/im'; 
import meditationImg from "../Assets/music.jpeg"; 
import musicImg from "../Assets/meditation.jpg"; 
import googelImg from "../Assets/maps.avif"; 


const Relax = () =>{
    //  const [icon, setIcon] = useState(true);

    return(
        <div className = "container">
            <button className='exit-icon'>
                 <ImCross />
                </button>

            <div className= "msg">Let's start your journey for the day!!</div>
            <div className="button-container">
                <div className="image-container">
                <img src = {musicImg} alt="music"/>
                </div>
                <button className="w-btn">Start Workout</button>
            </div>
            <div className = "button-container">
                <div className = "image-container">
                    <img src = {meditationImg} alt="meditation"/>
                </div>
                <button className="technique-btn">  Relaxation Techniques  </button>
            </div>
            
            <div className="button-container">
                <div className="image-container">
                <img src = {googelImg} alt="google"/>
                </div>
                <button className="g-btn"> Find Nearby Store</button>
            </div>
        </div>
    )
}

export default Relax