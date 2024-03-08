import React, { useEffect, useState} from 'react'
import './Relax.css'
import Axios from "axios";

import meditationImg from "../Assets/music.jpeg"; 
import musicImg from "../Assets/meditation.jpg"; 


const API  =  "AIzaSyCPHLxk3ef5RT8XbvSm3VaGrHgx4Nw2DcY"

const meditationChannelId = "UCVSaNtZoJMlx8SxLxsNa1lw"
const musicChannelID = "UCGDPhXrv1Pwi8GvPrRgK_JA"

const fetchURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${meditationChannelId}&part=snippet,id&order=date&maxResult=10`;

const Relax = () =>{
    const[meditationVideos, setMeditationVideos] = useState([]);
    const[musicVideos, setMusicnVideos] = useState([]);

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
    }

    return(
        <div className = "relax-container">
            <div className = "relax-button-container">
                <div className = "imagee-container">
                    <img className='relax-img' src = {meditationImg} alt="meditation"/>
                </div>
                <button onClick={() => handleButtonClick(meditationVideos)} className="btn"> Meditation</button>
            </div>
            <div className="divider"></div>
            <div className="relax-button-container">
                <div className="image-container">
                <img className='relax-img' src = {musicImg} alt="music"/>
                </div>
                <button onClick={() => handleButtonClick(musicVideos)} className="btn"> Music</button>

            </div>
        </div>
    )
}

export default Relax