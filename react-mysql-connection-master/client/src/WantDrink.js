import React, {useState} from "react";
import "./Drink.css";
import Axios from "axios";
import { useNavigate  } from "react-router-dom";

/*
  Mahin Patel Contribution
*/
const home = require('./assets/homeIcon.png');
const Logout = require('./assets/logout.png');

function WantDrink() {
  const [email, setEmail] = useState("");
  const [wantDrink, setWantDrink] = useState(""); // add state for hasDrink status
  const [updateStatus, setUpdateStatus] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const navigate = useNavigate();

  const updateUserDrinkStatus = (drinkStatus) => {
        setWantDrink(drinkStatus); // Set drink status based on button click
        setSelectedButton(drinkStatus);
      if (drinkStatus === 'yes') {
          setTimeout(() => {
            navigate('/maps');
        }, 1000); 
      } 
      else {
         setTimeout(() => {
            navigate('/relax');
        }, 1000); 
      }
  };

  const submitWantDrink = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/submitWantDrink", {
      email: email,
      wantDrink: wantDrink,
    }).then((response) => {
      console.log(response)
      setUpdateStatus(response.data.message);
    });
  };

  return (
    <div className="drink-container">
      <div className="header">
        <form onSubmit={submitWantDrink}>
          <h4>Would you like to get a drink?</h4>
          <input
            className="textInput"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button className={`button ${selectedButton === "yes" ? "selected" : ""}`} onClick={() => updateUserDrinkStatus("yes")}> Yes </button>
          <button className={`button ${selectedButton === "no" ? "selected" : ""}`} onClick={() => updateUserDrinkStatus("no")}> No </button>
          <div className="icons">
            <img src={home} alt="home" onClick={() => navigate('/workout')}/>
            <img src={Logout} alt="Logout" onClick={() => navigate('/')}/>
        </div>
        </form>
        <p>{updateStatus}</p>


      </div>
    </div>
  );
}

export default WantDrink;