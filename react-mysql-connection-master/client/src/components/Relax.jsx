import React, { useEffect, useState, useContext } from 'react';
import '../Relax.css';
import { useNavigate  } from "react-router-dom";
import meditationImg from '../assets/meditation.jpg';
import musicImg from '../assets/music.jpeg';
import { FaHome, FaUser } from 'react-icons/fa';
import { IoMenu } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import UserContext from '../UserContext';
import axios from 'axios';

/*
    Release 1 & Release 2: Sakinah Chadrawala's Contribution
*/
// meditation UCVSaNtZoJMlx8SxLxsNa1lw
// music UCGDPhXrv1Pwi8GvPrRgK_JA
const API  =  "AIzaSyCckLxBYlGf40ookjucQt1WoOQxolIMkr8"
const meditationChannelId = "UCboqmwN682NPFew8Wp8Qdmg"
const musicChannelID = "UCboqmwN682NPFew8Wp8Qdmg"

const Relax = () =>{
    const[meditationVideos, setMeditationVideos] = useState([]);
    const [musicVideos, setMusicnVideos] = useState([]);
    const navigate = useNavigate();
    const { userEmail } = useContext(UserContext);
    const [musicTimer, setMusicTimer] = useState(0);
    const [meditationTimer, setMeditationTimer] = useState(0);
    const [watchStartTime, setWatchStartTime] = useState(null);
    const [isWatchingVideo, setIsWatchingVideo] = useState(false);
    const [videoType, setVideoType] = useState(null);
    const [updateStatus, setUpdateStatus] = useState("");
    const [userInfo, setUserInfo] = useState(null);
  
    //  fetches userInfo upon email change
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get("http://localhost:3000/userInfo", {
                    params: { email: userEmail }
                });
                setUserInfo(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (userEmail) {
            fetchUserInfo();
        }
    }, [userEmail]);

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


    const handleButtonClick = (videos, type) => {
        if (videos.length === 0) return

        const randomIndex = Math.floor(Math.random() * videos.length)
        const videoUrl = `https://www.youtube.com/embed/${videos[randomIndex].id.videoId}`;
        window.open(videoUrl, '_blank')
        setWatchStartTime(Date.now());
        setIsWatchingVideo(true);
   
        if(type === 'meditation'){
            setVideoType('meditation')
        } else if(type === 'music'){
            setVideoType('music')
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isWatchingVideo && watchStartTime) {
                const elapsedTime = Math.floor((Date.now() - watchStartTime) / 1000);
                if(videoType === 'meditation') {
                    setMeditationTimer(elapsedTime)
                } else if (videoType === 'music') {
                    setMusicTimer(elapsedTime)
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isWatchingVideo, watchStartTime, videoType]);

   
    //  monitor user activity for video watch time activity
    useEffect(() => {
        window.addEventListener('focus', endRelaxation);
        return () => {
            window.removeEventListener('focus', endRelaxation);
        };
    }, [isWatchingVideo, watchStartTime]);

    //  fetches userInfo for quick multiple updates to db without re-login
    const fetchUserInfo2 = async () => {
        try {
            const res = await axios.get("http://localhost:3000/userInfo", {
                params: { email: userEmail }
            });
            setUserInfo(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const endRelaxation = () => {
        if (isWatchingVideo) {
            const elapsedTime = Math.floor((Date.now() - watchStartTime) / 1000);
            if(videoType === 'meditation') {
                console.log("elapsedTime on line 129 : ",  elapsedTime)
                setMeditationTimer(elapsedTime)

                const totalMeditationSeconds = userInfo ? userInfo.meditationSeconds + elapsedTime : elapsedTime;
                console.log("totalMedSec: ", totalMeditationSeconds);
                

                axios.post("http://localhost:3000/submitMeditationSeconds", {
                    email: userEmail,
                    meditationSeconds: totalMeditationSeconds,
                }).then((response) => {
                    console.log(response.data);
                    if (response.data.message) {
                        setUpdateStatus(response.data.message);
                    } else {
                        setUpdateStatus("Error updating relaxation seconds!!!");
                    }
                    fetchUserInfo2();
                }).catch((error) => {
                    console.error("Error updating meditation seconds:", error);
                    setUpdateStatus("Error updating relaxation seconds. Please try again later.");
                });
            } else if (videoType === 'music') {
                setMusicTimer(elapsedTime)
                const totalMusicSeconds = userInfo ? userInfo.musicSeconds + elapsedTime : elapsedTime;
                console.log("totalMusSec: ", totalMusicSeconds);
                axios.post("http://localhost:3000/submitMusicSeconds", {
                    email: userEmail,
                    musicSeconds: totalMusicSeconds,
                }).then((response) => {
                    console.log(response.data);
                    if (response.data.message) {
                        setUpdateStatus(response.data.message);
                    } else {
                        setUpdateStatus("Error updating music seconds!!!");
                    }
                    fetchUserInfo2();
                }).catch((error) => {
                    console.error("Error updating relaxation seconds:", error);
                    setUpdateStatus("Error updating relaxation seconds. Please try again later.");
                });

            }
            setIsWatchingVideo(false);
        console.log("user.meditationsSeconds on line 152: ", userInfo.meditationSeconds)
        console.log("user.musicSeconds on line 152: ", userInfo.musicSeconds)


    }
            
}  


    const logoutClick = () => {
        setIsWatchingVideo(false);
        setWatchStartTime(null);
        navigate('/login');
    };

    const menuOptionClick = () => {
        setIsWatchingVideo(false);
        setWatchStartTime(null);
        navigate('/menu');
    };

    const profileClick = () => {
        setIsWatchingVideo(false);
        setWatchStartTime(null);
        navigate(`/personalPage?email=${encodeURIComponent(userEmail)}`);
    };

    const homeClick = () => {
        setIsWatchingVideo(false);
        setWatchStartTime(null);
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
                <button onClick={() => handleButtonClick(meditationVideos, 'meditation')} className="relax-btn"> Meditation</button>
                {/* <span>{meditationTimer} seconds</span> */}
            </div>
            <div className="divider"></div>
            <h5>Listen To Good Music</h5>
            <div className="relax-button-container">
                <div className="relax-image-container">
                <img src = {musicImg} alt="music"/>
                </div>
                <button onClick={() => handleButtonClick(musicVideos, 'music')} className="relax-btn"> Music</button>
                {/* <span>{musicTimer} seconds</span> */}

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

