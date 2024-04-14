import React, { useState, useContext } from 'react';
import '../Signup.css';
import Axios from 'axios';
import login_logo from '../assets/logos.png';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import signupPic from '../assets/signuppic.png'

/*
    Release 1: Sakinah Chadrawala's Contribution
    Release 2: Mahin Patel's Contribution
*/
const Signup = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [registerStatus, setRegisterstatus] = useState('');
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const navigate = useNavigate();
    const { setUserEmail } = useContext(UserContext); // Access setUserEmail from UserContext

      
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

    const register = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post('http://localhost:3000/register', {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
                gender: gender,
                height: height,
                weight: weight,
                age: age,
            });

            if (response.data.message) {
                setRegisterstatus(response.data.message);
            } else {
                setRegisterstatus('Account Created Successfully!');
                setButtonDisabled(true);
                setUserEmail(email); // Set user email using setUserEmail from UserContext

                setTimeout(() => {
                    navigate(`/home?email=${encodeURIComponent(email)}`);
                }, 1000);
            }
        } catch (error) {
            console.error('Error during registration', error);
        }
    };

    return (
        <section className="home-section" style={{ backgroundImage: `url(${signupPic})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
    <header>
    <ul className="navigation_signup">
                <li><a href="#"  onClick={HomeClick}>Home</a></li>
                <li><a href="#"  onClick={aboutClick}>About</a></li>
                <li><a href="#" onClick={QuoteClick}>Quote</a></li>
                <li><a href="#" onClick={LoginClick}>Login</a></li>
            </ul>
            <a href="#" className="logo"  style={{ color: "white", position: "absolute", top: "20px", left: "7%" }}> Exercise Break</a>
           < h3 style={{ color: "white", position: "absolute", bottom: '-120%', left: "50%", transform: "translateX(-50%)", fontFamily: 'Georgia' }}>CREATE NEW ACCOUNT!</h3>
        <div className="signup-container">
            <form>
                <div className="inputs">
                    <input type="text" onChange={(e) => setFname(e.target.value)} placeholder="Enter your First Name" />
                    <input type="text" onChange={(e) => setLname(e.target.value)} placeholder="Enter your Last Name" />
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
                    <input type="text" onChange={(e) => setGender(e.target.value)} placeholder="Enter your Gender" />
                    <input type="text" onChange={(e) => setHeight(e.target.value)} placeholder="Enter your Height" />
                    <input type="text" onChange={(e) => setWeight(e.target.value)} placeholder="Enter your Weight" />
                    <input type="text" onChange={(e) => setAge(e.target.value)} placeholder="Enter your Age" />
                </div>
                <div className="text-dark">
                    <button name="submit" className="btn" disabled={isButtonDisabled} onClick={register}>
                        Sign Up
                    </button>
                </div>
            </form>
            {registerStatus && <div className="status-message">{registerStatus}</div>}
        </div>
        </header>
            </section>
    );
};

export default Signup;
