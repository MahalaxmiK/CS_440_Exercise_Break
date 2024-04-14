import React, { useEffect, useRef, useState, useContext } from "react";
import '../Home.css';
import { useNavigate, useLocation} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBluetooth } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import UserContext from '../UserContext';
import axios from 'axios';
import timerPic from '../assets/thisCount.png'

const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)

    if(minutes < 10 ) minutes = '0' + minutes;
    if(seconds < 10 ) seconds = '0' + seconds;
    return minutes + ':' + seconds
}

const CountDown = () => {
    var hasAlerted = false;
    const location = useLocation();
    const initialDuration = location.state.initialDuration;
    const intensity = location.state.intensity;
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(initialDuration);
    const [paused, setPaused] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [heartRate, setHeartRate] = useState(null); 
    const [heartRates, setHeartRates] = useState([]);
    const timerId = useRef();
    const [updateStatus, setUpdateStatus] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [lastAlertTime, setLastAlertTime] = useState(0); // State to keep track of the last time the alert was shown
    const [showAlert, setShowAlert] = useState(false); 
    const { userEmail } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    console.log("EMAIL HERE: ", userEmail);
    console.log("BEFORE initialDuration: ", initialDuration);
    console.log("BEFORE countdown: ", countdown);
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

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timerId.current);
    }, []);

    const endWorkout = () => {
        clearInterval(timerId.current);
        alert("END Workout");
        const sumHeartRate = heartRates.reduce((acc, cur) => acc + cur, 0);
        const avgRate = heartRates.length > 0 ? sumHeartRate / heartRates.length : 0;
        const workoutDurationInMinutes = (initialDuration - countdown) / 60; 
        let userTotalTime = userInfo ? userInfo.totalTime : 0.0;
        let userWeight = userInfo ? userInfo.weight : 0.0;
        const weightKg = userWeight * 0.453592; 
        const totalTimeSeconds = (workoutDurationInMinutes * 60) + userTotalTime;
        
        // MODIFIED Calculations
        var hours = Math.floor(totalTimeSeconds / (60 * 60));
        var divisor_for_minutes = totalTimeSeconds % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

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
        const TEE = (MET.value * weightKg * workoutDurationInMinutes.toFixed(2))/200;
        let userCalories = userInfo ? userInfo.calories : 0.0;

        axios.post("http://localhost:3000/submitworkoutSummary", {
            email: userEmail,
            calories: TEE + userCalories,
            totalTime: totalTimeSeconds,
            avgHeartRate: avgRate,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }).then((response) => {
            console.log(response.data);
            if (response.data.message) {
                setUpdateStatus(response.data.message);
            } else {
                setUpdateStatus("Error updating workout data!!!");
            }
        }).catch((error) => {
            console.error("Error saving workout data:", error);
            setUpdateStatus("Error saving workout data. Please try again later.");
        });

        navigate('/afterWorkout', { state: { endAverageHeartRate: avgRate,  workoutDuration: workoutDurationInMinutes, TEE: TEE  }});
    };

    const pauseTimer = () => {
        clearInterval(timerId.current);
        setPaused(true);
    };



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

    const resumeTimer = () => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);
        setPaused(false);
    };

    const logoutClick = () => {
        navigate('/login');
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

    const maxReached = (heartRateRN) =>{
     
        const maxThres = 100 - (userInfo ? userInfo.age : 0); // Calculate max heart rate threshold based on user's age
       
    
        if (heartRateRN >= maxThres && hasAlerted == false) {
            // Show the alert if it's not already shown
            window.alert(`Your heart rate  has reached the maximum threshold. Please take a break!`);
            setShowAlert(true);
            hasAlerted = true;
        } else if (heartRateRN < maxThres && showAlert) {
            // Dismiss the alert if it's currently shown
            setShowAlert(false);
        }
    }

    const handleHeartRateChange = (event) => {
        let heartRateValue = event.target.value.getUint8(1);
        setHeartRate(heartRateValue);
        setHeartRates(prevHeartRates => [...prevHeartRates, heartRateValue]); // Add the new heart rate to the heartRates array
        console.log('Heart Rate from this file heart:', heartRateValue);
        maxReached(heartRateValue);
        
       
    };


    const connectBLEDevice = async (event) => {
        event.preventDefault(); 
        try {
            setIsConnecting(true);
    
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ name: 'Polar H7 6BA10918' }],
                optionalServices: ['heart_rate']
            });
    
            const server = await device.gatt.connect();
            const service = await server.getPrimaryService('heart_rate');
            const characteristic = await service.getCharacteristic('heart_rate_measurement');
    
            characteristic.addEventListener('characteristicvaluechanged', handleHeartRateChange);
    
            await characteristic.startNotifications();
    
            setIsConnected(true);
            setIsConnecting(false);
        } catch (error) {
            console.error('Error connecting to Polar H7:', error); // Log the error
            setIsConnected(false);
            setIsConnecting(false);
        }
    };

    const intensityColor = () => {
        switch (intensity) {
            case 'Low':
                return 'low-background';
            case 'Moderate':
                return 'moderate-background';
            case 'High':
                return 'high-background';
            default:
                return '';
        }
    }

    return (
        <section className="home-section" style={{ backgroundImage: `url(${timerPic })`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
        <header>
        <ul className="navigation-count">
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
                    <li><a href="#"  onClick={connectBLEDevice}>
                        <div style={{ position: "relative", color:'#00f9f1' }}>
                            Connect Device
                            <FaBluetooth  style={{ position: "absolute", top: 0, left: -20,color:'#00f9f1'  }}/> {/* Using FaHome icon */}
                         </div>
                    </a></li>
                    <li><a href="#"  onClick={logoutClick}>
                        <div style={{ position: "relative" }}>
                            Logout
                            <HiOutlineLogout style={{ position: "absolute", top: 0, left: -20 }}/> {/* Using FaHome icon */}
                         </div>
                    </a></li>
                 
                </ul>
                    {/* <div className="menu-ble-container"> */}
                    <div className="menu-intensity-container">
        <div className="intensity-menu">
                <IoMenu size={35} onClick={toggleMenu} />
            </div>
        </div>
                    {/* </div> */}
                    <div className='The-container'>
                    <div className={`timer-container ${intensityColor()}`}>
                        <h2 className= "timer">{formatTime(countdown)}</h2>
                    </div>
                    <div className= "timer_buttons">
                        <button onClick={pauseTimer}>Pause</button>
                        <button onClick={resumeTimer} disabled={!paused}>Resume</button>
                    </div>
                    <div className= "timer_endWorkout">
                        <button onClick={endWorkout} >End Workout</button>
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

export default CountDown;