import React, { useEffect, useRef, useState, useContext } from "react";
import '../Home.css';
import { useNavigate, useLocation} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBluetooth } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import UserContext from '../UserContext';
import axios from 'axios';

const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)

    if(minutes < 10 ) minutes = '0' + minutes;
    if(seconds < 10 ) seconds = '0' + seconds;
    return minutes + ':' + seconds
}

const CountDown = () => {
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
    const { userEmail } = useContext(UserContext);
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

    const resumeTimer = () => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);
        setPaused(false);
    };

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

    const handleHeartRateChange = (event) => {
        const heartRateValue = event.target.value.getUint8(1);
        setHeartRate(heartRateValue);
        setHeartRates(prevHeartRates => [...prevHeartRates, heartRateValue]); // Add the new heart rate to the heartRates array
        console.log('Heart Rate from this file heart:', heartRateValue);
    };

    const connectBLEDevice = async () => {
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
        <div className="wrapper">
            <div className="phone-container">
                <div className="phone-screen">
                    <div className="menu-ble-container">
                        <div className="menu_button">
                            <IoMenu size={35} onClick={menuOptionClick}/>
                        </div>
                        <div className="ble-button">
                            <FaBluetooth  size={34} onClick={connectBLEDevice} style={{ color: 'c', cursor: 'pointer' }}/>
                        </div>
                    </div>
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
                    <p>{updateStatus}</p>
                </div>
            </div>
        </div>
    );
}

export default CountDown;