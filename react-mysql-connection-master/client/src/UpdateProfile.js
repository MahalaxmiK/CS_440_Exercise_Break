import React, { useState, useEffect } from "react";
import './App.css';
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";
import profile_logo from './assets/profile.jpg';
import axios from "axios";

const UpdateProfile = () => {
    const navigate = useNavigate();
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

    const location = useLocation();
    const userEmail = new URLSearchParams(location.search).get('email');
    console.log(userEmail)
    const [userInfo, setUserInfo] = useState(null);

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

    const menuOptionClick = () => {
        navigate('/menu');
    };

    const logoutClick = () => {
        navigate('/login');
    };

    const userDetailsUpdated = () => {
        window.alert("User Details Successfully Updated!!!");
    };

    const enableInputs = (field) => {
        setInputsEnabled(prevState => ({
            ...prevState,
            [field]: false,
        }));
    };

    return (
        <div className="update-container">
            <div className="update-menu">
                <IoMenu size={35} onClick={menuOptionClick} />
            </div>
            <div>
                <img src={profile_logo} alt="#" className="profile_logo" />
                {userInfo ? (
                    <h1 >{userInfo.fname} {userInfo.lname}</h1>
            ) : (
                <h1 >Error</h1>
            )}
            </div>
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

export default UpdateProfile;
