import React, { useState } from "react";
import './App.css';
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";
import profile_logo from './assets/profile.jpg';
import Axios from "axios";

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
    const { fname, lname } = location.state; // retrieve user's name

    const handleSubmit = (e) => {
        e.preventDefault();
        
        Axios.post("http://localhost:3000/updateUserDetails", {
            fname: fname,
            lname: lname,
            email: new_email,
            password: new_password,
            gender: new_gender,
            height: new_height,
            weight: new_weight,
            age: new_age,
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

    return (
        <div className="update-container">
            <div className="update-menu">
                <IoMenu size={35} onClick={menuOptionClick} />
            </div>
            <div>
                <img src={profile_logo} alt="#" className="profile_logo" />
                <h1>{fname} {lname}</h1>
            </div>
            <form onSubmit={handleSubmit} className="update-inputs">
                <input type="email" value={new_email} onChange={(e) => updateEmail(e.target.value)} placeholder="Update Your Email" />
                <input type="password" value={new_password} onChange={(e) => updatePassword(e.target.value)} placeholder="Update Your Password" />
                <input type="text" value={new_gender} onChange={(e) => updateGender(e.target.value)} placeholder="Update Your Gender" />
                <input type="text" value={new_height} onChange={(e) => updateHeight(e.target.value)} placeholder="Update Your Height" />
                <input type="text" value={new_weight} onChange={(e) => updateWeight(e.target.value)} placeholder="Update Your Weight" />
                <input type="text" value={new_age} onChange={(e) => updateAge(e.target.value)} placeholder="Update Your Age" />
                <button type="submit" className="update-submit" onClick = {userDetailsUpdated}>Update Profile Info</button>
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
