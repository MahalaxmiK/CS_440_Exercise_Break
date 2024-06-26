import React, { useEffect, useState} from 'react'
import './Relax.css'
import Axios from "axios";
import { FaHome, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'
import { useNavigate  } from "react-router-dom";


import meditationImg from "../Assets/music.jpeg"; 
import musicImg from "../Assets/meditation.jpg"; 

const API  =  "N/A"

const meditationChannelId = "N/A"
const musicChannelID = "N/A"

const fetchURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${meditationChannelId}&part=snippet,id&order=date&maxResult=10`;

const Relax = () =>{
    const[meditationVideos, setMeditationVideos] = useState([]);
    const [musicVideos, setMusicnVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVideos(meditationChannelId)
    }, []) 

    const fetchVideos = async(meditationChannelId) =>{
        const meditationUrl = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${meditationChannelId}&part=snippet,id&order=date&maxResults=10`;
        const musicUrl = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${musicChannelID}&part=snippet,id&order=date&maxResults=10`;
        try {
            const [meditationRes, musicRes] = await Promise.all([
                fetch(meditationUrl),
                fetch (musicUrl)
            ])

            if(!meditationRes.ok || !musicRes.ok) {
                throw new Error('Url response was not fetched')
            }

            const[meditationResJson, musicResJson] = await Promise.all([
                meditationRes.json(),
                musicRes.json()
            ])

            const meditationArray = meditationResJson.items.map(doc => ({
                ...doc,
                Videolink:`https://www.youtube.com/embed/${doc.id.videoId}`
            }))

            const musicArray = musicResJson.items.map(doc => ({
                ...doc,
                Videolink:`https://www.youtube.com/embed/${doc.id.videoId}`
            }))

            setMeditationVideos(meditationArray)
            setMusicnVideos(musicArray)
        } catch(error){
            console.error('error fetching videos: ', error)
        }
    }


    const handleButtonClick = (videos) => {
        if (videos.length === 0) return

        const randomIndex = Math.floor(Math.random() * videos.length)
        const videoUrl = `https://www.youtube.com/embed/${videos[randomIndex].id.videoId}`;
        window.open(videoUrl, '_blank')
        setTimeout(() => {
          navigate('/resume');
        }, 20000);
    }

    const logoutClick = () => {
        navigate('/login');
    };

    const menuOptionClick = () => {
        navigate('/menu');
    };

    return(
        <div className="relax-container">
            <h4>Relaxation Techniques</h4>
            <h5>Meditate & Enhance Inner Peace</h5>
            <div className = "relax-button-container">
                <div className = "relax-image-container">
                    <img src = {meditationImg} alt="meditation"/>
                </div>
                <button onClick={() => handleButtonClick(meditationVideos)} className="relax-btn"> Meditation</button>
            </div>
            <div className="divider"></div>
            <h5>Listen To Good Music</h5>
            <div className="relax-button-container">
                <div className="relax-image-container">
                <img src = {musicImg} alt="music"/>
                </div>
                <button onClick={() => handleButtonClick(musicVideos)} className="relax-btn"> Music</button>

            </div>
            <div
                className="bottom-navbar-relax"
            >
                <div><FaHome /></div>  
                <div><FaUser /></div>
                <div onClick={logoutClick}><FaSignOutAlt /></div>
                <div onClick={menuOptionClick}><FaBars /></div>
            </div>
        </div>
    )
}
export default Relax
