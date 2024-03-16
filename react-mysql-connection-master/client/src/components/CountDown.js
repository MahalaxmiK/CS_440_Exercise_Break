// import React, { useEffect, useRef, useState } from "react";
// import '../Home.css';
// import { useNavigate, useLocation} from "react-router-dom";
// import { FaHome } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
// import { HiOutlineLogout } from "react-icons/hi";
// import { IoMenu } from "react-icons/io5";


// /*
//     Release 1: Noura Almasri's Contribution
// */
// const formatTime = (time) => {
//     let minutes = Math.floor(time / 60)
//     let seconds = Math.floor(time - minutes * 60)

//     if(minutes <= 10 ) minutes = '0' + minutes;
//     if(seconds < 10 ) seconds = '0' + seconds;
//     return minutes + ':' + seconds
// }



// const CountDown = () => {
//     const location = useLocation();
//     const initialDuration = location.state.initialDuration;
//     const intensity = location.state.intensity;
//     const heartRates = location.state.heartRates || [];
//     const navigate = useNavigate();
//     const[countdown, setCountdown] = useState(initialDuration)
//     const[paused, setPaused] = useState(false);
//     // const [heartRates, setHeartRates] = useState([]);
//     // const [avgHeartRate, setAvgHeartRate] = useState(0);
//     const timerId = useRef()


//     useEffect(() => {
//         console.log("Heart Rates from props:", heartRates); // Check if heart rates are received
//         console.log("Initial Duration:", initialDuration);
//         console.log("Intensity:", intensity);
//     }, [heartRates, initialDuration, intensity]);

//     useEffect(() => {
//         console.log("Initial Duration:", initialDuration);
//         console.log("Intensity:", intensity);
//     }, [initialDuration, intensity]);

//     useEffect(() => {
//         timerId.current = setInterval(() => {
//             setCountdown(prev => prev -1)

//         }, 1000)
//         return () => clearInterval(timerId.current)

//     }, [])


// //   useEffect(() => {
// //     // Retrieve heart rates array from location state
// //     const heartRatesFromState = location.state.heartRates;
// //     setHeartRates(heartRatesFromState);
// //   }, [location.state]);

//     const endWorkout = () =>{
//         clearInterval(timerId.current);
//         alert("END Workout");
//         const heartRates = location.state.heartRates || [];
//         const sumHeartRate = heartRates.reduce((acc, cur) => acc + cur, 0);
//         const avgRate = heartRates.length > 0 ? sumHeartRate / heartRates.length : 0; // Check if heart rates exist
        
//         // setAvgHeartRate(avgRate);
//             // setTimeout(() => {
//                 // console.log("Avg Rate:", avgRate);
//                 // console.log("Selected Intensity:", selectedIntensity);
              
//         navigate('/afterWorkout', { state: { endAverageHeartRate: avgRate }});
              
               
//             // }, 1000);
//     };
//     useEffect(() => {
//         console.log("Heart Rates from props:", heartRates);
//       }, [heartRates]);
  

//     // useEffect(() => {
//     //     if(countdown <= 0){
//     //         clearInterval(timerId.current)
//     //         alert("END Workout");
//     //         const sumHeartRate = heartRates.reduce((acc, cur) => acc + cur, 0);
//     //         const avgRate = sumHeartRate / heartRates.length;
//     //         setAvgHeartRate(avgRate);
//     //         setTimeout(() => {
//     //             console.log("Selected Time:", avgRate);
//     //             // console.log("Selected Intensity:", selectedIntensity);
//     //             navigate('/afterWorkout', { state: {endAverageHeartRate: avgRate }})
              
               
//     //         }, 1000);
//     //     }
//     // }, [countdown,navigate, heartRates])

//     const pauseTimer = () => {
//         clearInterval(timerId.current);
//         setPaused(true);
//     };

//     const resumeTimer = () => {
//         timerId.current = setInterval(() => {
//         setCountdown(prev => prev -1);
//     }, 1000);
//     setPaused(false);
//     };

//     // useEffect(() => {
//     //     console.log("Heart Rates:", heartRates); // Check if this logs data
//     // }, [heartRates]);

//     const alertHeartRate = () => {
//         window.alert("Your heart rate exceeded the threshold! Please take a break!");
//     };

//     const menuOptionClick = () => {
//         navigate('/menu');
//     };

//     const logoutClick = () => {
//         navigate('/login');
//     };

//     // const recordHeartRate = (heartRate) => {
//     //     console.log("Heart Rate:", heartRate); 
//     //     setHeartRates(prev => [...prev, heartRate]);
        
//     // };

//     const intensityColor = () => {
//         switch (intensity){
//             case 'Low':
//                 return 'low-background';
//             case 'Moderate':
//                 return 'moderate-background';
//             case 'High':
//                 return 'high-background';
//         }
//     }


//     return (
//         <div className="wrapper">
//             <div className="phone-container">
//             <div className="phone-screen">
//             <div className="menu_button">
//         <IoMenu size={35} onClick={menuOptionClick}/>
//             </div> 
//         <div className={`timer-container ${intensityColor()}`}>
//        {/* Apply background color */}
//         <h2 className= "timer">  {formatTime(countdown)}</h2>
//         </div>
//         <div class= "timer_buttons">
//             <button onClick={pauseTimer}>Pause</button>
//             <button onClick={resumeTimer} disabled={!paused}>Resume</button>
//             </div>
//             <div class= "timer_endWorkout">
//             <button onClick={endWorkout}>End Workout</button>
//             </div>
//           {/* Bottom navigation bar */}
//             <div className="bottom-nav">
//                 <button className="icon-with-text">
//                 <FaHome />
//                 <span>Home</span>{/* Text below the icon */}
//                 </button>
//                 <button className="icon-with-text">
//                 <FaUser />
//                 <span>User</span>{/* Text below the icon */}
//                 </button>
//                 <button className="icon-with-text" onClick={logoutClick}>
//                 <HiOutlineLogout />
//                 <span>Logout</span>{/* Text below the icon */}
//                 </button>
//             </div>
//         </div>
//         </div>
//     </div>
   
//     );
// }
// export default CountDown


import React, { useEffect, useRef, useState } from "react";
import '../Home.css';
import { useNavigate, useLocation} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBluetooth } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

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
    // const heartRates = location.state.heartRates || [];
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(initialDuration);
    const [paused, setPaused] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [heartRate, setHeartRate] = useState(null); 
    const [heartRates, setHeartRates] = useState([]);


    const timerId = useRef();

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
        navigate('/afterWorkout', { state: { endAverageHeartRate: avgRate,  workoutDuration: workoutDurationInMinutes, intensity: intensity  }});
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

    const menuOptionClick = () => {
        navigate('/menu');
    };

    const logoutClick = () => {
        navigate('/login');
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
                        {/* <button onClick={connectBLEDevice}>Connect BLE</button> */}
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
                        <button onClick={endWorkout}>End Workout</button>
                    </div>
                    
                    <div className="bottom-nav">
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
            </div>
        </div>
    );
}

export default CountDown;
