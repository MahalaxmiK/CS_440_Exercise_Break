import React, { useEffect, useRef, useState, useContext } from "react";
import '../Home.css';
// import { useNavigate, useLocation} from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useNavigate} from "react-router-dom";
import homescreenImage from '../assets/homescreen.png'; // Import the image



function EBAHomePage() {
    const navigate = useNavigate();

    const getStartedClick = () => {
        navigate('/signup');
    };

    const HomeClick = () => {
        navigate('/EBAHomePage');
    };

    const aboutClick = () => {
        navigate('/about');
    };
    const QuoteClick = () => {
        navigate('/quote');
    };
    const LoginClick = () => {
        navigate('/login');
    };




    


    const [menuActive, setMenuActive] = useState(false);
        // Define toggleMenu function here
        function toggleMenu() {
            const toggleMenu = document.querySelector('.toggleMenu');
            const navigation = document.querySelector('.navigation');
            toggleMenu.classList.toggle('active');
            setMenuActive(prevMenuActive => !prevMenuActive);
        }
        
    return(
<body>
<section className="home-section" style={{ backgroundImage: `url(${homescreenImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
        
        <header>
            <h1 href="#" class="logo"> Exercise Break</h1>
       
            <div className={`toggleMenu ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
                        {menuActive ? <IoClose style={{ width: '30px', height: '30px', color: "white" }} /> : <IoMenuSharp style={{ width: '30px', height: '30px', color: "white" }} />}
                    </div>
                    <ul className={`navigation ${menuActive ? 'active' : ''}`}>
                <li><a href="#"  onClick={HomeClick}>Home</a></li>
                <li><a href="#"  onClick={aboutClick}>About</a></li>
                <li><a href="#" onClick={QuoteClick}>Quote</a></li>
                <li><a href="#" onClick={LoginClick}>Login</a></li>
            </ul>
        </header>
        <div class="content_home">
            <div class="contentBx">
                <h2>Build Perfect Body With Clean Mind</h2>
                <br></br>
                <button class="pushable" onClick={getStartedClick}>
                    <span class="front">
                        Get Started
                    </span>
                </button>
                {/* <a href="#" onClick={getStartedClick}> Get Started </a> */}
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
export default EBAHomePage;