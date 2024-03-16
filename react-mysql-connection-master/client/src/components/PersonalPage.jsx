import React, { useEffect, useState} from 'react'
import '../PersonalPage.css'
import axios from "axios";
import { FaHome, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'
import { useNavigate, useLocation  } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import person_logo from '../assets/person.jpeg';
import { BiSolidTimeFive } from "react-icons/bi";
import { FaFireAlt } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

const PersonalPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userEmail = new URLSearchParams(location.search).get('email');
    console.log(userEmail)
    const [userInfo, setUserInfo] = useState(null);
    const [email, setEmail] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

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
    
    const menuOptionClick = () => {
       console.log('menu is clicked')
        navigate('/menu');
    };
    function convertTime(totalHours) {
        const hours = Math.floor(totalHours);
        const minutes = Math.round((totalHours - hours) * 60);
        if (minutes >= 60) {
            hours++;
            minutes -= 60;
        }

        return `${hours}h ${minutes}m`;
    }
    
    // console.log(convertTime(20)); // Output: 20 hours and 0 minutes
    const handlePersonal = () =>{
        console.log('menu is clicked')
        navigate(`/updateProfile?email=${encodeURIComponent(userInfo.email)}`);
    }

    const logoutClick = () => {
        navigate('/login');
    };

    
    return (
        <div className="profile-container">
           
            <div className="profile-menu">
                <IoMenu size={35} onClick={menuOptionClick} />
            </div>
            <div>
                <img src={person_logo} alt="#" className="person_logo" />
                {userInfo ? (
                   <h1 className="personal-info">
                    <span className="name">{userInfo.fname.charAt(0).toUpperCase() + userInfo.fname.slice(1)}</span><br />
                    <span className="email">{userInfo.email}</span>
                    <div className='timeicon-hourtext' >
                        <BiSolidTimeFive className='time-icon' /><br />
                        <span className="total-hours">{convertTime(23)}</span>
                        <span className='total-hours-text'>total hours</span>
                        <FaFireAlt className='burn-icon' /><br />
                        <span className="calorie-count">{userInfo.totalCalories} Cal</span><br />
                        <span className='burned-text'>burned</span>

                    </div>
                    </h1>
            ) : (
                <h1 >Error</h1>
            )}
            </div>

            <div className="personal-wrapper" onClick={handlePersonal}>
                <hr className='line' ></hr>
                <IoPersonSharp className='personal-icon'  />
                <span className='personal-text' >Personal</span>
                <hr className='b-line'  ></hr>
        </div>
 
        <div className="update-bottom-nav">
            <button className="icon-with-text">
                <FaHome />
                <span>Home</span>
            </button>
            <button className="icon-with-text">
                <FaUser />
                <span>User</span>
            </button>
            <button className="icon-with-text">
                <HiOutlineLogout />
                <span>Logout</span>
            </button>
        </div>

            

        <div className="update-bottom-nav">
            <button className="icon-with-text">
                <FaHome />
                <span>Home</span>
            </button>
            <button className="icon-with-text">
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
export default PersonalPage;