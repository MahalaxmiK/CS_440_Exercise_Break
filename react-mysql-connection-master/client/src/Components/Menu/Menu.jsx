import React, { useEffect, useState} from 'react'
import './Menu.css'
import Axios from "axios";

import meditationImg from "../Assets/music.jpeg"; 
import musicImg from "../Assets/meditation.jpg"; 
import googelImg from "../Assets/maps.avif"; 


const Relax = () =>{

    return(
        <div className = "container">
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
                <img src = {googelImg} alt="music"/>
                </div>
                <button className="g-btn"> Find Nearby Store</button>
            </div>
        </div>
    )
}

export default Relax