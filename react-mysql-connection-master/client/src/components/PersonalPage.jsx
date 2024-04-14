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
import { IoClose } from "react-icons/io5";
import PersonalPic from "../assets/personal.png"
import { FaUserEdit } from "react-icons/fa";
import BackgroundPic from "../assets/backgroundAll.png"
import newPersonal from "../assets/personalnew.png"


/*
    Release 2: Sakinah Chadrawala's Contribution
*/
const PersonalPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currEmail = new URLSearchParams(location.search).get('email');
    const [userInfo, setUserInfo] = useState(null);
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
            } catch (err) {
                console.log(err);
            }
        };
        if (currEmail) {
            fetchUserInfo();
        }
    }, [currEmail]);

    const handlePersonal = () => {
        console.log('menu is clicked')
        navigate(`/updateProfile?email=${encodeURIComponent(userInfo.email)}`);
    };
    
    const logoutClick = () => {
        navigate('/login');
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

    // const menuOptionClick = () => {
    //     navigate('/menu');
    // };

    const profileClick = () => {
        navigate(`/personalPage?email=${encodeURIComponent(userEmail)}`);
    };

    const homeClick = () => {
        navigate(`/home?email=${encodeURIComponent(userEmail)}`);
    };

    function convertTime(totalTime) {
        return `${totalTime.hours}h ${totalTime.minutes}m ${totalTime.seconds}s`;
    }

    
    return (
        <section className="home-section" style={{ backgroundImage: `url(${newPersonal })`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
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
                <li><a href="#"  onClick={handlePersonal}>
                    <div style={{ position: "relative" }}>
                        Personal
                        <FaUserEdit style={{ position: "absolute", top: 0, left: -20 }}/> {/* Using FaHome icon */}
                     </div>
                </a></li>
                <li><a href="#"  onClick={logoutClick}>
                    <div style={{ position: "relative" }}>
                        Logout
                        <HiOutlineLogout style={{ position: "absolute", top: 0, left: -20 }}/> {/* Using FaHome icon */}
                     </div>
                </a></li>
               
            </ul>

            <div className="menu-container">
            <div className="profile-menu">
                <IoMenu size={35} onClick={toggleMenu} />
            </div>
            </div>


            <div>
                <img src={person_logo} alt="#" className="person_logo" />
                {userInfo ? (
                   <h1 className="personal-info">
                    <span className="name">{userInfo.fname.charAt(0).toUpperCase()  +  userInfo.fname.slice(1)+ ' ' +  userInfo.lname}</span><br />
                    {/* <span className="email">{userInfo.email}</span> */}
                    <div className='timeicon-hourtext' >
                        <BiSolidTimeFive className='time-icon' /><br />
                        <span className="total-hours">{convertTime((userInfo))}</span>
                        <span className='total-hours-text'>total hours</span>
                        <FaFireAlt className='burn-icon' /><br />
                        <span className="calorie-count">{userInfo.calories.toFixed(2)} Cal</span><br />
                        <span className='burned-text'>burned</span>

                    </div>
                    </h1>
            ) : (
                <h1 >Error</h1>
            )}
            </div>
    </header>
    <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
    <button className="exit-icon" onClick={toggleMenu}>
    <IoClose size={30} style = {{color: '#f78731', background:'black'}} />
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
export default PersonalPage;