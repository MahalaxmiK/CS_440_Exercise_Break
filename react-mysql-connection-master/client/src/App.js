import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import WorkOutPage from "./WorkOutPage";
import Maps from "./Maps";
import React from 'react';
import Login from "./components/Login";
import Signup from "./components/Signup";
import HasDrink from "./HasDrink";
import Timer from "./Timer";
import WantDrink from "./WantDrink";
import Relax from "./components/Relax";
import ParentComponent from "./components/clientChoice";

/*
  Team Contribution
*/
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/drinkOption" element={<HasDrink />} exact />
        <Route path="/workout" element={<WorkOutPage />} exact />
        <Route path="/timer" element={<Timer />} exact />
        <Route path="/wantDrink" element={<WantDrink />} exact />
        <Route path="/maps" element={<Maps />} exact />
        <Route path="/relax" element={<Relax />} exact />
        <Route path="/resume" element={<ParentComponent />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
