import React, { useState } from "react";
import '../Home.css';
import { useNavigate } from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import aboutImage from '../assets/about.png'; 

/*
    Release 3: Noura Almasri's Contribution
*/
function About() {
    const navigate = useNavigate();
    const [menuActive, setMenuActive] = useState(false);

    const HomeClick = () => {
        navigate('/');
    };

    const aboutClick = () => {
        navigate('/about');
    };

    const QuoteClick = () => {
        navigate('/quote');
    };
    
    // Define toggleMenu function here
    function toggleMenu() {
        const toggleMenu = document.querySelector('.toggleMenu');
        const navigation = document.querySelector('.navigation');
        toggleMenu.classList.toggle('active');
        setMenuActive(prevMenuActive => !prevMenuActive);
    }
    
    return (
        <body>
            <section className="home-section" style={{ backgroundImage: `url(${aboutImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
            
            <header>
                <a href="#" class="logo"> Exercise Break</a>
                <div className={`toggleMenu ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
                            {menuActive ? <IoClose style={{ width: '30px', height: '30px', color: "white" }} /> : <IoMenuSharp style={{ width: '30px', height: '30px', color: "white" }} />}
                    </div>
                    <ul className={`navigation ${menuActive ? 'active' : ''}`}>
                    <li><a href="#"  onClick={HomeClick}>Home</a></li>
                    <li><a href="#"  onClick={aboutClick}>About</a></li>
                    <li><a href="#" onClick={QuoteClick}>Quote</a></li>
                    <li><a href="#">Login</a></li>
                </ul>
                
            </header>
            <div class="content_home_about">
                <div class="contentBx_about">
                    <h2> This app was made with the intention of helping endurance trainers 
                        to those who just want to go on jog to have a better exercise experience. 
                        The hope is by making endurance exercise more fun and less strenuous, they will 
                        feel more inclined to do these types of exercises and foster healthier habits.
                        With features that include reading heart beat and knowing when to take a break.
                        Get Ready To Elevate Your Workout! </h2>
                </div>
            </div>
            <ul className="sci">
            <li><a href="#"><FaSquareFacebook />{/* Facebook icon */} </a></li>
                <li><a href="#"><FaSquareTwitter />{/* Twitter icon */} </a></li>
                <li><a href="#"><FaInstagram />{/* Instagram icon */} </a></li>
            </ul>
            </section>
        </body>
    );
}

export default About;