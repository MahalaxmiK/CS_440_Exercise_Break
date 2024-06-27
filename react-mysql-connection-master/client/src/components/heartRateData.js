// import React, { useState, useEffect } from 'react';
// import { useNavigate} from "react-router-dom";
// import '../Home.css';

// const HeartRate = () => {
//   const [heartRate, setHeartRate] = useState(null);
//   const [device, setDevice] = useState(null);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const navigate = useNavigate();


//   const connectToPolarH7 = async () => {
//     try {
//       setIsConnecting(true);

//       const device = await navigator.bluetooth.requestDevice({
//         filters: [{ name: 'Polar H7 6BA10918' }, { services: ['heart_rate'] }],
//       });

//       const server = await device.gatt.connect();
//       const service = await server.getPrimaryService('heart_rate');
//       const characteristic = await service.getCharacteristic('heart_rate_measurement');

//       characteristic.addEventListener('characteristicvaluechanged', handleHeartRateChange);

//       await characteristic.startNotifications();

//       setDevice(device);
//       setIsConnected(true);
//       setIsConnecting(false);
//     //  navigate('/intensity', {state: {heartRates: heartRates}})
//     } catch (error) {
//       console.error('Error connecting to Polar H7:', error);
//       setIsConnecting(false);
//     }
//   };
//   const notNow = () => {
//     navigate('/intensity');
// };

//   const handleHeartRateChange = (event) => {
//     const heartRateValue = event.target.value.getUint8(1);
//     setHeartRate(heartRateValue);
//     console.log('Heart Rate from this file heart:', heartRateValue); 
//     // navigate(`/countdown/${heartRateValue}`);
//     // navigate('/intensity', { state: { heartRates: [...heartRates, heartRateValue] }});
//     // navigate('/intensity', { state: { heartRate: heartRateValue } }); 

//   };
//   useEffect(() => {
//     if (heartRate !== null) {
//       navigate('/intensity', { state: { heartRate: heartRate } });
//     }
//   }, [heartRate, navigate]);
  

//   useEffect(() => {
//     const checkConnectionStatus = setInterval(() => {
//         if (device && device.gatt.connected) {
//           setIsConnected(true);
//           console.log('Device is connected');
//         } else {
//           setIsConnected(false);
//           console.log('Device is disconnected');
//         }
//       }, 5000); // Check every 5 seconds
//     return () => {
//       if (device) {
//         device.gatt.disconnect();
//       }
//     };
//   }, [device]);

//   return (
//     <div>
//       {/* {isConnecting ? (
//         <p>Connecting...</p>
//       ) : heartRate !== null ? (
//         <p>Heart Rate: {heartRate} bpm</p>
//       ) : ( */}
//         <div className="heart_wrapper">
//             <div className='button_one'>
               
           
//         <button onClick={connectToPolarH7}>  {isConnecting ? "Connecting..." : isConnected ? "Connected" :  "Connect to Bluetooth"}</button>
//         </div>
//         <div className='button_two'>
//         <button onClick={notNow}>Not Now</button>
//         </div>
       
//         </div>
//     </div>
//   );
// };
// export default HeartRate


// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from "react-router-dom";
// // // import '../Home.css';


// // // const HeartRate = () => {
// // //   const [heartRates, setHeartRates] = useState([]);
// // //   const [device, setDevice] = useState(null);
// // //   const [isConnecting, setIsConnecting] = useState(false);
// // //   const [isConnected, setIsConnected] = useState(false);
// // //   const navigate = useNavigate();

// // //   const connectToPolarH7 = async () => {
// // //     try {
// // //       setIsConnecting(true);

// // //       const device = await navigator.bluetooth.requestDevice({
// // //         filters: [{ name: 'Polar H7 6BA10918' }, { services: ['heart_rate'] }],
// // //       });

// // //       const server = await device.gatt.connect();
// // //       const service = await server.getPrimaryService('heart_rate');
// // //       const characteristic = await service.getCharacteristic('heart_rate_measurement');

// // //       characteristic.addEventListener('characteristicvaluechanged', handleHeartRateChange);

// // //       await characteristic.startNotifications();

// // //       setDevice(device);
// // //       setIsConnected(true);
// // //       setIsConnecting(false);
// // //     //   navigate('/intensity', { state: { heartRates: heartRates } }); // Pass heartRates to CountDown
// // //     } catch (error) {
// // //       console.error('Error connecting to Polar H7:', error);
// // //       setIsConnecting(false);
// // //     }
// // //   };

// // //   const notNow = () => {
// // //     navigate('/intensity');
// // //   };

// // //   const handleHeartRateChange = (event) => {
// // //     const heartRateValue = event.target.value.getUint8(1);
// // //     setHeartRates(prev => [...prev, heartRateValue]); // Store heart rate in the array
// // //     console.log('Heart Rate:', heartRateValue); 
// // //   };

// // //   useEffect(() => {
// // //     const checkConnectionStatus = setInterval(() => {
// // //       if (device && device.gatt.connected) {
// // //         setIsConnected(true);
// // //         console.log('Device is connected');
// // //       } else {
// // //         setIsConnected(false);
// // //         console.log('Device is disconnected');
// // //       }
// // //     }, 5000); // Check every 5 seconds
// // //     return () => {
// // //       if (device) {
// // //         device.gatt.disconnect();
// // //       }
// // //       clearInterval(checkConnectionStatus); // Clear interval on unmount
// // //     };
// // //   }, [device]);


// // //   return (
// // //     <div>
// // //       <div className="heart_wrapper">
// // //         <div className='button_one'>
// // //           <button onClick={connectToPolarH7}>{isConnecting ? "Connecting..." : isConnected ? "Connected" :  "Connect to Bluetooth"}</button>
// // //         </div>
// // //         <div className='button_two'>
// // //           <button onClick={notNow}>Not Now</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default HeartRate;

// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from "react-router-dom";
// // // import '../Home.css';

// // // const HeartRate = ({ onEndWorkout }) => {
// // //     const [heartRates, setHeartRates] = useState([]);
// // //     const [device, setDevice] = useState(null);
// // //     const [isConnecting, setIsConnecting] = useState(false);
// // //     const [isConnected, setIsConnected] = useState(false);
// // //     const [isWorkoutInProgress, setIsWorkoutInProgress] = useState(false);
// // //     const navigate = useNavigate();

// // //     const connectToDevice = async () => {
// // //         try {
// // //             setIsConnecting(true);

// // //             const device = await navigator.bluetooth.requestDevice({
// // //                 filters: [{ name: 'Polar H7 6BA10918' }, { services: ['heart_rate'] }],
// // //             });

// // //             const server = await device.gatt.connect();
// // //             const service = await server.getPrimaryService('heart_rate');
// // //             const characteristic = await service.getCharacteristic('heart_rate_measurement');

// // //             characteristic.addEventListener('characteristicvaluechanged', handleHeartRateChange);

// // //             await characteristic.startNotifications();

// // //             setDevice(device);
// // //             setIsConnected(true);
// // //             setIsConnecting(false);
// // //             setIsWorkoutInProgress(true); // Start the workout

// // //             // Navigate to the intensity page after connecting
// // //             navigate('/intensity');

// // //         } catch (error) {
// // //             console.error('Error connecting to Polar H7:', error);
// // //             setIsConnecting(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         if (device) {
// // //             const checkConnectionStatus = setInterval(() => {
// // //                 if (!device.gatt.connected) {
// // //                     setIsConnected(false);
// // //                     console.log('Device is disconnected');
// // //                     clearInterval(checkConnectionStatus);
// // //                 }
// // //             }, 5000); // Check every 5 seconds

// // //             return () => clearInterval(checkConnectionStatus); // Clear interval on unmount
// // //         }
// // //     }, [device]);

// // //     const notNow = () => {
// // //         if (!isWorkoutInProgress) {
// // //             navigate('/intensity');
// // //         }
// // //     };

// // //     const handleHeartRateChange = (event) => {
// // //         // console.log('Heart Rate Characteristic Value Changed:', event.target.value);
// // //         const heartRateValue = event.target.value.getUint8(1);
// // //         console.log('Parsed Heart Rate Value:', heartRateValue);
// // //         setHeartRates(prev => [...prev, heartRateValue]); // Store heart rate in the array
// // //     };

// // //     const handleEndWorkout = () => {
// // //         setIsWorkoutInProgress(false); // End the workout
// // //         onEndWorkout(heartRates); // Pass heartRates to the parent component
// // //     };

// // //     return (
// // //         <div>
// // //             <div className="heart_wrapper">
// // //                 <div className='button_one'>
// // //                     <button onClick={connectToDevice} disabled={isConnected}>{isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect to Bluetooth"}</button>
// // //                 </div>
// // //                 <div className='button_two'>
// // //                     <button onClick={notNow}>Not Now</button>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default HeartRate;
