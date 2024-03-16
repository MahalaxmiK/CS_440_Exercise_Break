import React, { useEffect, useState, useContext } from 'react';
import '../PersonalPage.css';
import axios from "axios";
import { FaHome, FaUser } from 'react-icons/fa'
import { useNavigate, useLocation  } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import person_logo from '../assets/person.jpeg';
import { BiSolidTimeFive } from "react-icons/bi";
import { FaFireAlt } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import UserContext from '../UserContext';

/*
    Release 2: Sakinah Chadrawala's Contribution
*/
const PersonalPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currEmail = new URLSearchParams(location.search).get('email');
    const [userInfo, setUserInfo] = useState(null);
    const { userEmail } = useContext(UserContext);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get("http://localhost:3000/userInfo", {
                    params: { email: currEmail }
                   
                });
                setUserInfo(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (currEmail) {
            fetchUserInfo();
        }
    }, [currEmail]);
    
    function convertTime(totalHours) {
        const hours = Math.floor(totalHours);
        const minutes = Math.round((totalHours - hours) * 60);
        if (minutes >= 60) {
            hours++;
            minutes -= 60;
        }

        return `${hours}h ${minutes}m`;
    }

    const handlePersonal = () => {
        console.log('menu is clicked')
        navigate(`/updateProfile?email=${encodeURIComponent(userInfo.email)}`);
    };
    
    const logoutClick = () => {
        navigate('/login');
    };

    const menuOptionClick = () => {
        navigate('/menu');
    };

    const profileClick = () => {
        setTimeout(() => {
          navigate(`/personalPage?email=${encodeURIComponent(userEmail)}`);
        }, 1000);
    };

    const homeClick = () => {
         setTimeout(() => {
          navigate(`/home?email=${encodeURIComponent(userEmail)}`);
        }, 1000);
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
export default PersonalPage;