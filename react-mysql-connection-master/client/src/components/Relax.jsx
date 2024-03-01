import React, { useEffect, useState} from 'react'
import '../Relax.css'
import { useNavigate  } from "react-router-dom";
import meditationImg from '../assets/meditation.png'
import musicImg from '../assets/music.png'

/*
    Sakinah Chadrawala Contribution
*/

const API  =  "AIzaSyDQjZ79ul59xynIC9vdJ7IM5XQYLi_mKt8"
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

    return(
        <div className = "relax-container">
            <div className = "relax-button-container">
                <div className = "relax-image-container">
                    <img src = {meditationImg} alt="meditation"/>
                </div>
                <button onClick={() => handleButtonClick(meditationVideos)} className="relax-btn"> Meditation</button>
            </div>
            <div className="divider"></div>
            <div className="relax-button-container">
                <div className="relax-image-container">
                <img src = {musicImg} alt="music"/>
                </div>
                <button onClick={() => handleButtonClick(musicVideos)} className="relax-btn"> Music</button>

            </div>
        </div>
    )
}

export default Relax