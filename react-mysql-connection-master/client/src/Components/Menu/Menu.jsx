import React, { useEffect, useState} from 'react'
import './Menu.css'
import Axios from "axios";
import { useNavigate  } from "react-router-dom";
import { ImCross } from 'react-icons/im'; 
import meditationImg from "../Assets/music.jpeg"; 
import musicImg from "../Assets/meditation.jpg"; 
import googelImg from "../Assets/maps.avif"; 


const Menu = () =>{
    const navigate = useNavigate();

    const handleWorkoutButton =()=>{
        navigate('/intensity')
    }

    const handleRelaxButton =()=>{
        navigate('/relax')
    }
    const handleMapButton =()=>{
        navigate('/maps')
    }
    return(
        <div className = "menu-container">
            <button className='exit-icon'>
                 <ImCross />
                </button>

            <div className= "title-msg">Let's start your journey for the day!!</div>
            <div className="m-button-container">
                <div className="image-container">
                <img className='m-img' src = {musicImg} alt="music"/>
                </div>
                <button className="m-btn" onClick={handleWorkoutButton}>Start Workout</button>
            </div>
            <div className = "m-button-container">
                <div className = "image-container">
                    <img className='m-img' src = {meditationImg} alt="meditation"/>
                </div>
                <button className="m-btn" onClick={handleRelaxButton}>  Relaxation Techniques  </button>
            </div>
            
            <div className="m-button-container">
                <div className="image-container">
                <img className='m-img' src = {googelImg} alt="google"/>
                </div>
                <button className="m-btn" onClick={handleMapButton}> Find Nearby Store</button>
            </div>
        </div>
    )
}

export default Menu