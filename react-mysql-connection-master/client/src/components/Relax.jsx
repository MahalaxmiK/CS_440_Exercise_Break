import React, { useEffect, useState, useContext } from 'react';
import '../Relax.css';
import { useNavigate  } from "react-router-dom";
import meditationImg from '../assets/meditation.jpg';
import musicImg from '../assets/music.jpeg';
import { FaHome, FaUser } from 'react-icons/fa';
import { IoMenu } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import UserContext from '../UserContext';
import axios from 'axios';
import relaxPic from '../assets/relax.png'
import musicPic from '../assets/musicpic.png'
import BackgroundPic from "../assets/backgroundAll.png"
import tryPic from "../assets/try.png"
import  usePic from "../assets/useThis.png"

/*
    Release 1 & Release 2: Sakinah Chadrawala's Contribution
    Release 3: Noura's Contribution
*/

// music  UC9GoqHypa-SDrGPMyeBkjKw
const API  =  "AIzaSyCckLxBYlGf40ookjucQt1WoOQxolIMkr8"
const meditationChannelId = "UCVSaNtZoJMlx8SxLxsNa1lw"
const musicChannelID = "UCGDPhXrv1Pwi8GvPrRgK_JA"

const Relax = () => {
    const [isOpen, setIsOpen] = useState(false);
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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleWorkoutButton = () => {
        navigate('/intensity')
    };

    const handleRelaxButton = () => {
        navigate('/relax')
    };

    const handleMapButton = () => {
        navigate('/maps')
    };

  
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
        <section className="home-section" style={{ backgroundImage: `url(${ usePic})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
        <header>
        <ul className="navigation-home">
                    <li><a href="#"  onClick={homeClick}>
                    <div style={{ position: "relatitve" }}>
                        Home
                        <FaHome style={{ position: "absolute", top: 0, left: -20 }}/> {/* Using FaHome icon */}
                    </div>
                    </a></li>
                    <li><a href="#"  onClick={profileClick}>
                        <div style={{ position: "relative" }}>
                            User
                             <FaUser style={{ position: "absolute", top: 0, left: -20 }}/>{/* Using FaHome icon */}
                         </div>
                    </a></li>
                    <li><a href="#"  onClick={logoutClick}>
                        <div style={{ position: "relative" }}>
                            Logout
                            <HiOutlineLogout style={{ position: "absolute", top: 0, left: -20 }}/> {/* Using FaHome icon */}
                         </div>
                    </a></li>
                </ul>
    
    
        {/* <div className="relax-container"> */}
        <div className="menu-relax-container">
        <div className="relax-menu">
                <IoMenu size={35} onClick={toggleMenu} />
            </div>
        </div>
            <div className = "relax-button-container">
                <button onClick={() => handleButtonClick(meditationVideos)} className="relax-btn" style= {{backgroundColor: 'transparent', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', fontSize:'22px' }}>Meditate & Enhance Inner Peace</button>
           
            {/* <div className="relax-button-container"> */}
                <button onClick={() => handleButtonClick(musicVideos)} className="relax-btn" style= {{ backgroundColor: 'transparent', backgroundPosition: 'center', color: 'white', fontSize:'22px' }} > Listen To Good Music</button>

            </div>
        </header>
        <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
                <button className="exit-icon" onClick={toggleMenu}>
                <IoClose size={30} style = {{color: '#f78731', background:'transparent'}} />
                </button>
                <ul className="navigation_menu">
                    <li><a href="#" onClick={handleWorkoutButton}>Start Workout</a></li>
                    <li><a href="#" onClick={handleRelaxButton}>Relaxation Techniques</a></li>
                    <li><a href="#" onClick={handleMapButton}>Find a Nearby Store</a></li>
                </ul>
            </div>
        </section>
    )
}

export default Relax;