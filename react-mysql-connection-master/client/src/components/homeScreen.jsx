import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { PieChart, Pie, Tooltip } from 'recharts';
import '../homeScreen.css';
import { IoMenu } from "react-icons/io5";
import { FaHome, FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import UserContext from '../UserContext';

/*
    Release 2: Mahin Patel's Contribution
*/
const HomeScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currEmail = new URLSearchParams(location.search).get('email');
    const [userInfo, setUserInfo] = useState(null);
    const [workout, setWorkout] = useState(null);
    const [music, setMusic] = useState(null);
    const [video, setVideo] = useState(null);
    const { userEmail } = useContext(UserContext);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get("http://localhost:3000/userInfo", {
                    params: { email: currEmail }
                });
                setUserInfo(res.data);
                setWorkout(res.data.minutes);
                setMusic(12);
                setVideo(17);
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

    const menuOptionClick = () => {
        navigate('/menu');
    };

    const profileClick = () => {
        navigate(`/personalPage?email=${encodeURIComponent(userEmail)}`);
    };

    const homeClick = () => {
        navigate(`/home?email=${encodeURIComponent(userEmail)}`);
    };

    return (
        <div className="homeContainer">

            <div className="home-menu">
                <IoMenu size={35} onClick={menuOptionClick} />
            </div>

            {userInfo ? (
                <h1 className="home-h1">Hi {userInfo.fname.charAt(0).toUpperCase() + userInfo.fname.slice(1)}!! Let's take a look at your progress...</h1>
            ) : (
                <h1 className="home-h1">Error</h1>
            )}
           
            <div className="pieChart">
                <PieChart width={300} height={300}>
                    <Pie data={data} dataKey="hours" outerRadius={150} fill="#8884d8" />
                    <Tooltip />
                </PieChart>
            </div>

            {userInfo ? (
                <>
                    {workout == 1 ? (<h3 className="home-h3">Workout Progress: {workout} Minute</h3>) : (<h3 className="home-h3">Workout Progress: {workout} Minutes</h3>)}
                    <h3 className="home-h3">Mindful Moments: {music} Hours</h3>
                    <h3 className="home-h3">Musical Bliss: {video} Hours</h3>
                </>
            ) : (
                <h1 className="home-h1">Error</h1>
            )}

            <div className="bottom-nav">
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
    );
}

export default HomeScreen;