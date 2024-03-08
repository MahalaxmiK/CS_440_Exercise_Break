import React, { useEffect, useState} from 'react'
import '../Relax.css'
import { useNavigate  } from "react-router-dom";
import meditationImg from '../assets/meditation.jpg'
import musicImg from '../assets/music.jpeg'
import { FaHome, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'

/*
    Sakinah Chadrawala Contribution
*/

const API  =  "AIzaSyCPHLxk3ef5RT8XbvSm3VaGrHgx4Nw2DcY"
const meditationChannelId = "UChSpME3QaSFAWK8Hpmg-Dyw"
const musicChannelID = "UCGDPhXrv1Pwi8GvPrRgK_JA"


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

    const homeClick = () => {
        window.confirm("Would you like to return to the home screen?");
    };

    const profileClick = () => {
        window.confirm("Would you like to see your profile?");
    };

    const logoutClick = () => {
        window.confirm("Would you like to exit the Exercise Break App?");
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
                <div onClick={homeClick}><FaHome /></div>  
                <div onClick={profileClick}><FaUser /></div>
                <div onClick={logoutClick}><FaSignOutAlt /></div>
                <div onClick={menuOptionClick}><FaBars /></div>
            </div>
        </div>
    )
}

export default Relax