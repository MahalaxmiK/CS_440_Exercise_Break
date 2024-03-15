import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import WorkOutPage from "./WorkOutPage";
import Maps from "./Maps";
import React from 'react';
import Signup from "./components/Signup";
import HasDrink from "./HasDrink";
import Timer from "./Timer";
import WantDrink from "./WantDrink";
import Relax from "./components/Relax";
import ParentComponent from "./components/clientChoice";
import Menu from './components/Menu';
import Workout from "./components/WorkoutIntensity";
import CountDown from "./components/CountDown";
import UpdateProfile from "./UpdateProfile";
import HomeScreen from "./components/homeScreen";

/*
  Team Contribution
*/
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/drinkOption" element={<HasDrink />} exact />
        <Route path="/workout" element={<WorkOutPage />} exact />
        <Route path="/timer" element={<Timer />} exact />
        <Route path="/wantDrink" element={<WantDrink />} exact />
        <Route path="/maps" element={<Maps />} exact />
        <Route path="/relax" element={<Relax />} exact />
        <Route path="/resume" element={<ParentComponent />} exact />
        <Route path="/menu" element={<Menu />} exact />
        <Route path="/countdown" element={<CountDown />} exact />
        <Route path="/intensity" element={<Workout />} exact />
        <Route path="/updateProfile" element={<UpdateProfile />} exact />
        <Route path="/home" element={<HomeScreen />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
