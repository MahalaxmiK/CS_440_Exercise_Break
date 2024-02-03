import React from "react";
import { BrowserRouter as Link} from "react-router-dom";
import "./App.css";


function WorkOutPage() {
  return (
    <div className="container">
      <Link to="/workout"><h1>Exercise Dashboard</h1></Link>
      <Link to="/workout"><button>Start Workout</button></Link>
      <Link to="/workout"><button>Exit Application</button></Link>
    </div>
  );
}

export default WorkOutPage;