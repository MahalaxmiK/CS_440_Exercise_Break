import React, { useState, useEffect,  useContext } from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";
import axios from "axios";
import '../Home.css';
import UserContext from '../UserContext';
import afterPic from '../assets/after.png'

/*
    Release 2 & Release 3: Noura Almasri's Contribution
*/
const AfterWorkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const averageHeartRate = location.state.endAverageHeartRate.toFixed(2);
    const workoutDuration = location.state.workoutDuration;
    const TEE = location.state.TEE;
    const [userInfo, setUserInfo] = useState(null);
    const { userEmail } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

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

    const startNewWorkout = () => {
        navigate('/intensity');
    };

    const exitWorkout = () => {
        navigate(`/home?email=${encodeURIComponent(userEmail)}`);
    };

    const logoutClick = () => {
        navigate('/login');
    };

    const profileClick = () => {
        navigate(`/personalPage?email=${encodeURIComponent(userEmail)}`);
    };

    const homeClick = () => {
        navigate(`/home?email=${encodeURIComponent(userEmail)}`);
    };

return (
    <section className="home-section" style={{ backgroundImage: `url(${afterPic })`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
    <header>
    <ul className="navigation-home">
                <li><a href="#"  onClick={homeClick}>
                <div style={{ position: "relative", top:10}}>
                    Home
                    <FaHome style={{ position: "absolute", top: 0, left: -20 }}/> {/* Using FaHome icon */}
                </div>
                </a></li>
                <li><a href="#"  onClick={profileClick}>
                    <div style={{ position: "relative", top:10 }}>
                        User
                         <FaUser style={{ position: "absolute", top: 0, left: -20 }}/>{/* Using FaHome icon */}
                     </div>
                </a></li>
                <li><a href="#"  onClick={logoutClick}>
                    <div style={{ position: "relative", top:10 }}>
                        Logout
                        <HiOutlineLogout style={{ position: "absolute", top: 0, left: -20 }}/> {/* Using FaHome icon */}
                     </div>
                </a></li>
            </ul>
   
       <div className="menu-intensity-container">
        <div className="intensity-menu">
                <IoMenu size={35} onClick={toggleMenu} />
            </div>
        </div>
        <div className="workout_sum">
         <h1 className="workout-title-after">Hooray! You finished the workout, let's look at your stats...</h1>{/* Title */}
         <br></br>
         <br></br>
          <h1 className="workout-title-other">Workout Progress: {workoutDuration.toFixed(1)} Minutes</h1>{/* Title */}
          <h1 className="workout-title-other">Total Calories Burned: {TEE.toFixed(2)}</h1>{/* Title */}
          <h1 className="workout-title-other">Average Heart Rate: {averageHeartRate}</h1>{/* Title */}
          <div className='after-buttons'></div>
    <div class= "start_New_Workout">
        <button onClick={startNewWorkout}>Start New Workout</button>
        </div>
        <div class= "exit_workout">
        <button onClick={exitWorkout}>Exit</button>
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
  
)
}

export default AfterWorkout;





