import React, { useState } from 'react'
import '../Home.css'
import { useNavigate  } from "react-router-dom";

const ClientChoice = () => {
    const [action, setAction] = useState("Resume Workout");
    const navigate = useNavigate();
    return(
    <div className="submit-choice">
        <div className={action === "Resume Workout"? "button":"button" } onClick={()=> {navigate('/workout');}}>End Session</div>
        <div className="button_space"></div>
        <div className={action === "End Session"? "button":"button" } onClick={()=> {navigate('/timer');}}>Resume Workout</div>
        </div>
            
    

    )
}

export default ClientChoice