import React, { useState, useEffect, useContext } from "react";
import './App.css';
import { IoClose } from "react-icons/io5";

import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";
import profile_logo from './assets/profile.jpg';
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import progressPic from './assets/progress.png'
import UserContext from './UserContext';

/*
  Release 2: Mahalaxmi Kalappareddigari's Contribution
*/
const UpdateProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [new_email, updateEmail] = useState("");
    const [new_password, updatePassword] = useState("");
    const [new_gender, updateGender] = useState("");
    const [new_height, updateHeight] = useState("");
    const [new_weight, updateWeight] = useState("");
    const [new_age, updateAge] = useState("");
    const [updateStatus, setUpdateStatus] = useState("");
    const [inputsEnabled, setInputsEnabled] = useState({
        email: false,
        password: false,
        gender: false,
        height: false,
        weight: false,
        age: false,
    });

    const currEmail = new URLSearchParams(location.search).get('email');
    const [userInfo, setUserInfo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const { userEmail } = useContext(UserContext);



    const handleWorkoutButton = () => {
        navigate('/intensity')
    };

    const handleRelaxButton = () => {
        navigate('/relax')
    };

    const handleMapButton = () => {
        navigate('/maps')
    };


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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:3000/updateUserDetails", {
            fname: userInfo.fname,
            lname: userInfo.lname,
            email: new_email !== "" ? new_email : userInfo.email,
            password: new_password !== "" ? new_password : userInfo.password,
            gender: new_gender !== "" ? new_gender : userInfo.gender,
            height: new_height !== "" ? new_height : userInfo.height,
            weight: new_weight !== "" ? new_weight : userInfo.weight,
            age: new_age !== "" ? new_age : userInfo.age,
        }).then((response) => {
            console.log(response.data);
            if (response.data.message) {
                setUpdateStatus(response.data.message);
            } else {
                setUpdateStatus("Error updating user details!!!");
            }
        }).catch((error) => {
            console.error("Error updating user details:", error);
            setUpdateStatus("Error updating user details. Please try again later.");
        });
    };

    // const menuOptionClick = () => {
    //     navigate('/menu');
    // };

    const logoutClick = () => {
        navigate('/login');
    };

    const profileClick = () => {
        navigate(`/personalPage?email=${encodeURIComponent(userEmail)}`);
    };

    const homeClick = () => {
        navigate(`/home?email=${encodeURIComponent(userEmail)}`);
    };

    const userDetailsUpdated = () => {
        window.alert("User Details Updated Successfully!!!");
    };

    const enableInputs = (field) => {
        setInputsEnabled(prevState => ({
            ...prevState,
            [field]: false,
        }));
    };

    return (
        <section className="home-section" style={{ backgroundImage: `url(${progressPic})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
        <header>
        <ul className="navigation_update">
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
    
        {/* <div className="update-container"> */}
        <div className="update-menu">
        {/* <div className="menu-icon"> */}
        <IoMenu size={30} onClick={toggleMenu} />
    {/* </div> */}
            <div className="user-info">
            <FaUserCircle size={90} className="user-icon-update" />
                                {userInfo ? (
                    <h1 style={{ fontFamily: 'Georgia'}}>{userInfo.fname.charAt(0).toUpperCase() + userInfo.fname.slice(1)} {userInfo.lname.charAt(0).toUpperCase() + userInfo.lname.slice(1)}</h1>
            ) : (
                <h1 >Error</h1>
            )}
            
            </div>
            <div className="some" ></div>
            < h3 className="update-info-text" style={{ color: "white", position: "absolute",  left: "93%", bottom:"-30px",transform: "translateX(-50%)",  textAlign: "center" ,  position: "relative",  fontSize: "30px", fontFamily:'Georgia' }}>Update Info</h3>
            <div className="updates-container">
            <form onSubmit={handleSubmit} className="update-inputs">
                <input
                    type="email"
                    value={new_email}
                    onChange={(e) => updateEmail(e.target.value)}
                    placeholder={`${'Your Current Email: '}${userInfo ? userInfo.email : ''}`}
                    disabled={inputsEnabled.email}
                    onClick={() => enableInputs('email')}
                />
                <input
                    type="password"
                    value={new_password}
                    onChange={(e) => updatePassword(e.target.value)}
                    placeholder={`Your Current Password: ${userInfo ? userInfo.password : ''}`}
                    disabled={inputsEnabled.password}
                    onClick={() => enableInputs('password')}
                />
                <input
                    type="text"
                    value={new_gender}
                    onChange={(e) => updateGender(e.target.value)}
                    placeholder={`Your Current Gender: ${userInfo ? userInfo.gender : ''}`}
                    disabled={inputsEnabled.gender}
                    onClick={() => enableInputs('gender')}
                />
                <input
                    type="text"
                    value={new_height}
                    onChange={(e) => updateHeight(e.target.value)}
                    placeholder={`Your Current Height: ${userInfo ? userInfo.height : ''}`}
                    disabled={inputsEnabled.height}
                    onClick={() => enableInputs('height')}
                />
                <input
                    type="text"
                    value={new_weight}
                    onChange={(e) => updateWeight(e.target.value)}
                    placeholder={`Your Current Weight: ${userInfo ? userInfo.weight : ''}`}
                    disabled={inputsEnabled.weight}
                    onClick={() => enableInputs('weight')}
                />
                <input
                    type="text"
                    value={new_age}
                    onChange={(e) => updateAge(e.target.value)}
                    placeholder={`Your Current Age: ${userInfo ? userInfo.age : ''}`}
                    disabled={inputsEnabled.age}
                    onClick={() => enableInputs('age')}
                />
                <button type="submit" className="update-submit" onClick={userDetailsUpdated}>Update Profile Info</button>
            </form>
            </div>
        </div>
        </header>
        <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
                <button className="exit-icon" onClick={toggleMenu}>
                <IoClose size={30} style = {{color: 'black', background:'white'}} />
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

export default UpdateProfile;