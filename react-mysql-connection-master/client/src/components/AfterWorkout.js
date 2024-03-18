import React, { useState, useEffect,  useContext } from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";
import axios from "axios";
import '../Home.css';
import UserContext from '../UserContext';



const AfterWorkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const averageHeartRate = location.state.endAverageHeartRate.toFixed(2);
    const workoutDuration = location.state.workoutDuration;
    const intensity = location.state.intensity;
    const [userInfo, setUserInfo] = useState(null);
    const { userEmail } = useContext(UserContext);
    console.log("EMAIL HERE: ", userEmail);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get("http://localhost:3000/userInfo", {
                    params: { email: userEmail }
                });
                setUserInfo(res.data);
                //submitworkoutSummary(); 
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

        navigate('/menu');
      
    };
  
           
    // Convert weight from pounds to kilograms
    
    let userWeight = userInfo ? userInfo.weight : 0.0;
    const weightKg =  userWeight * 0.453592; 


    const getMET = (intensity) => {
        switch (intensity) {
            case 'Low':
                return { value: 2.0 };
            case 'Moderate':
                return { value: 4.3 };
            case 'High':
                return { value: 11.5 };
            default:
                return { value: 2.5 };
        }
    };
    const MET = getMET(intensity);
    const TEE = (MET.value * weightKg * workoutDuration.toFixed(2))/200;

    const menuOptionClick = () => {
        navigate('/menu');
    };

    const logoutClick = () => {
        navigate('/login');
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
    <div className="afterworkout_wrapper">
         <h1 className="workout-title">Hooray! You finished the workout, lets look at your stats...</h1>{/* Title */}
          <h1 className="workout-title-other">Workout Progress: {workoutDuration.toFixed(2)}</h1>{/* Title */}
          <h1 className="workout-title-other">Total Calories Burned: {TEE.toFixed(2)}</h1>{/* Title */}
          <h1 className="workout-title-other">Average Heart Rate: {averageHeartRate}</h1>{/* Title */}
    <div class= "start_New_Workout">
        <button onClick={startNewWorkout}>Start New Workout</button>
        </div>
        <div class= "exit_workout">
        <button onClick={exitWorkout}>Exit</button>
        </div>
      {/* Bottom navigation bar */}
        <div className="bottom-nav">
            <button className="icon-with-text" onClick={homeClick}>
            <FaHome />
            <span>Home</span>{/* Text below the icon */}
            </button>
            <button className="icon-with-text" onClick={profileClick}>
            <FaUser />
            <span>User</span>{/* Text below the icon */}
            </button>
            <button className="icon-with-text" onClick={logoutClick}>
            <HiOutlineLogout />
            <span>Logout</span>{/* Text below the icon */}
            </button>
        </div>
    </div>
  
)
}
export default AfterWorkout





