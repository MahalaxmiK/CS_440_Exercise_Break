import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { PieChart, Pie, Tooltip } from 'recharts';
import '../homeScreen.css';
import { IoClose } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { FaHome, FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import UserContext from '../UserContext';
import progressPic from '../assets/progress.png'

/*
    Release 2: Mahin Patel's Contribution
    Release 3: Mahalaxmi & Noura's Contribution
*/
const HomeScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currEmail = new URLSearchParams(location.search).get('email');
    const [userInfo, setUserInfo] = useState(null);
    const [workout, setWorkout] = useState(null);
    const [music, setMusic] = useState(null);
    const [video, setVideo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { userEmail } = useContext(UserContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get("http://localhost:3000/userInfo", {
                    params: { email: currEmail }
                });
                setUserInfo(res.data);
                setWorkout(res.data.totalTime);
                setMusic(res.data.musicSeconds);
                setVideo(res.data.meditationSeconds);
            } catch (err) {
                console.log(err);
            }
        };
        if (currEmail) {
            fetchUserInfo();
        }
    }, [currEmail]);

    const data = [
        { name: 'Workout Progress', hours: workout, fill: 'rgba(255, 99, 132, 0.5)' }, // Red color
        { name: 'Mindful Moments', hours: music, fill: 'rgba(54, 162, 235, 0.5)' },    // Blue color
        { name: 'Musical Bliss', hours: video, fill: 'rgba(255, 206, 86, 0.5)' },       // Yellow color
    ];

    const logoutClick = () => {
        navigate('/login');
    };

    const profileClick = () => {
        navigate(`/personalPage?email=${encodeURIComponent(userEmail)}`);
    };

    const homeClick = () => {
        navigate(`/home?email=${encodeURIComponent(userEmail)}`);
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

    return (
        <section className="home-section" style={{ backgroundImage: `url(${progressPic})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
    <header>
    <ul className="navigation_home">
                <li><a href="#"  onClick={homeClick}>
                <div style={{ position: "relative" }}>
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


        {/* <div className="homeContainer"> */}
        <div className="menu-container">
            <div className="home-menu">
                <IoMenu size={35} onClick={toggleMenu} />
            </div>
            </div>
   
         

<div className="Progress_container" >
        <div className="user_progress" >
            {userInfo ? (
                <h1 className="home-h1">Hi {userInfo.fname.charAt(0).toUpperCase() + userInfo.fname.slice(1)}!! Let's take a look at your progress...</h1>
            ) : (
                <h1 className="home-h1">Error</h1>
            )}
            </div>
           
            <div className="pieChart">
                <PieChart width={300} height={300}>
                    <Pie data={data} dataKey="hours" outerRadius={150} fill="#8884d8" />
                    <Tooltip />
                </PieChart>
            </div>
           


<div className='bottom_container_sum' >
            {userInfo ? (
                <>
                    {workout === 1 ? (<h3 className="home-h6">Workout Progress: {workout} Second</h3>) : (<h3 className="home-h6">Workout Progress: {workout} Seconds</h3>)}
                    {music === 1 ? (<h3 className="home-h7">Mindful Moments: {music} Second</h3>) : (<h3 className="home-h7">Mindful Moments: {music} Seconds</h3>)}
                    {video === 1 ? (<h3 className="home-h8">Musical Bliss: {video} Second</h3>) : (<h3 className="home-h8">Musical Bliss: {video} Seconds</h3>)}
                </>
            ) : (
                <h1 className="home-h1">Error</h1>
            )}
            </div>
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
    );
}

export default HomeScreen;