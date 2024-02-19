import React, { useState } from 'react';
import '../Home.css';
import { useNavigate } from 'react-router-dom';

const ParentComponent = () => {
    const [action, setAction] = useState("Resume Workout");
    const navigate = useNavigate();

    const handleResumeClick = (action) => {
        setAction(action);
        navigate('/timer');
    };

    const handleEndClick = (action) => {
        setAction(action);
        navigate('/workout');
    };

    return (
        <div>
            <ClientChoice action={action} handleResumeClick={handleResumeClick} handleEndClick={handleEndClick} />
        </div>
    );
};

const ClientChoice = ({ action, handleResumeClick, handleEndClick }) => {
    return (
        <div className="submit-choice">
            <div className={action === "Resume Workout" ? "button" : "button"} onClick={() => handleResumeClick("Resume Workout")}>Resume Workout</div>
            <div className="button_space"></div>
            <div className={action === "End Session" ? "button" : "button"} onClick={() => handleEndClick("End Session")}>End Session</div>
        </div>
    );
};

export default ParentComponent;
