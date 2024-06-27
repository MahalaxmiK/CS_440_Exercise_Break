import React, { useEffect, useRef, useState, useContext } from "react";
import '../Home.css';
import { useNavigate} from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import quoteImage from '../assets/Quote.png'; 


function Quote() {
    const navigate = useNavigate();

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
    return (

   
    <body>
<section className="home-section" style={{ backgroundImage: `url(${quoteImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
        
        <header>
            <a href="#" class="logo"> Exercise Break</a>
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
        <div class="content_home_quote">
            <div class="contentBx_quote">
                <h2> THE PAIN YOU FEEL TODAY IS THE STRENGTH YOU FEEL TOMORROW. </h2>
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
export default Quote;