import React, {useState} from 'react'
import appLogoImage from '../assets/logos.png'
import '../Home.css'
import { useNavigate  } from "react-router-dom";

/*
    Noura Almasri Contribution
*/
const Login = () => {
    const [action, setAction] = useState("Login");
    const navigate = useNavigate();
    return(
        <div className='login-container'>
            <div className='box-1'>
                <div className="box-1-logo">
                    <img src={appLogoImage} alt="#" className="app-logo" />
                </div>
             
                <div className="submit-container">
                    <div className={action === "Login"? "submit gray":"submit" } onClick={()=> {navigate('/signup');}}>Sign Up</div>
                    <div className={action === "Sign Up"? "submit gray":"submit" } onClick={()=> {navigate('/login');}}>Login</div>
                </div>
            </div>
        </div>

    )
}

export default Login
