import React, { useContext,  useState } from 'react';
import '../Menu.css';
import { ImCross } from 'react-icons/im'; 
import { useNavigate } from "react-router-dom";
import exerciseImg from "../assets/start_workout.png"; 
import meditationImg from "../assets/meditation.jpg"; 
import googelImg from "../assets/maps.avif"; 
import UserContext from '../UserContext';




//No Need for This Any More

/*
    Release 2: Sakinah Chadrawala's Contribution
*/
const Relax = () =>{
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { userEmail } = useContext(UserContext);
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

    const homeClick = () => {
        navigate(`/home?email=${encodeURIComponent(userEmail)}`);
    };

    return(
        <div className ="menu_container" >
            <button className="menu-toggle" onClick={toggleMenu}>Open Menu</button>
            {/* Menu content */}
            {isOpen && (
                <div className="menu-overlay">
                    <button className="exit-icon" onClick={toggleMenu}>
                        <ImCross />
                    </button>
                    <ul className="navigation_menu">
                        <li><a href="#" onClick={handleWorkoutButton}>Start Workout</a></li>
                        <li><a href="#" onClick={handleRelaxButton}>Relaxation Techniques</a></li>
                        <li><a href="#" onClick={handleMapButton}>Find a Nearby Store</a></li>
                    </ul>
                </div>
            )}
            </div>
    );
            }
    


export default Relax;