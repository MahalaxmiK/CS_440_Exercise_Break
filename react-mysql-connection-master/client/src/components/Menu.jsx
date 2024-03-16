import React, { useContext } from 'react';
import '../Menu.css';
import { ImCross } from 'react-icons/im'; 
import { useNavigate } from "react-router-dom";
import meditationImg from "../assets/music.jpeg"; 
import musicImg from "../assets/meditation.jpg"; 
import googelImg from "../assets/maps.avif"; 
import UserContext from '../UserContext';

/*
    Release 2: Sakinah Chadrawala's Contribution
*/
const Relax = () =>{
    //  const [icon, setIcon] = useState(true);
    const navigate = useNavigate();
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

    const homeClick = () => {
        setTimeout(() => {
          navigate(`/home?email=${encodeURIComponent(userEmail)}`);
        }, 1000);
    };

    return(
        <div className = "container">
            <button className='exit-icon'>
                <ImCross onClick={homeClick}/>
            </button>

            <div className= "msg">Let's start your journey for the day!!</div>
            <div className="button-container">
                <div className="image-container">
                <img src = {musicImg} alt="music"/>
                </div>
                <button className="w-btn" onClick={handleWorkoutButton}>Start Workout</button>
            </div>
            <div className = "button-container" onClick={handleRelaxButton}>
                <div className = "image-container">
                    <img src = {meditationImg} alt="meditation"/>
                </div>
                <button className="technique-btn">Relaxation Techniques</button>
            </div>
            
            <div className="button-container">
                <div className="image-container">
                <img src = {googelImg} alt="google"/>
                </div>
                <button className="g-btn" onClick={handleMapButton}>Find Nearby Store</button>
            </div>
        </div>
    )
}

export default Relax;