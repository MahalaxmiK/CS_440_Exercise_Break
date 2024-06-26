import React, { useEffect, useState, useContext } from 'react';
import '../Relax.css';
import { useNavigate  } from "react-router-dom";
import meditationImg from '../assets/meditation.jpg';
import musicImg from '../assets/music.jpeg';
import { FaHome, FaUser } from 'react-icons/fa';
import { IoMenu } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import UserContext from '../UserContext';

/*
    Release 1 & Release 2: Sakinah Chadrawala's Contribution
*/
const API  =  "N/A"
const meditationChannelId = "N/A"
const musicChannelID = "N/A"

const Relax = () =>{
    const[meditationVideos, setMeditationVideos] = useState([]);
    const [musicVideos, setMusicnVideos] = useState([]);
    const navigate = useNavigate();
    const { userEmail } = useContext(UserContext);

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
        // setTimeout(() => {
        //   navigate('/resume');
        // }, 20000);
    }

    const logoutClick = () => {
        navigate('/login');
    };

    const menuOptionClick = () => {
        navigate('/menu');
    };

    const profileClick = () => {
        navigate(`/personalPage?email=${encodeURIComponent(userEmail)}`);
    };

    const homeClick = () => {
        navigate(`/home?email=${encodeURIComponent(userEmail)}`);
    };



    return(
        <div className="relax-container">
            <div className="relax-menu">
                <IoMenu size={35} onClick={menuOptionClick} />
            </div>
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
            <div className="bottom-navbar-relax">
                <button className="icon-with-text" onClick={homeClick}>
                    <FaHome />
                    <span>Home</span>
                </button>
                <button className="icon-with-text" onClick={profileClick}>
                    <FaUser />
                    <span>User</span>
                </button>
                <button className="icon-with-text" onClick={logoutClick}>
                    <HiOutlineLogout />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Relax;
