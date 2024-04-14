import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import Maps from "./Maps";
import React from 'react';
import Signup from "./components/Signup";
import Relax from "./components/Relax";
import Workout from "./components/WorkoutIntensity";
import CountDown from "./components/CountDown";
import UpdateProfile from "./UpdateProfile";
import HomeScreen from "./components/homeScreen";
import PersonalPage from "./components/PersonalPage";
import AfterWorkout from "./components/AfterWorkout";
import { UserProvider } from './UserContext';
import EBAHomePage from './components/EBAHomePage';
import About from './components/about';
import Quote from './components/quote'

/*
  Team Contribution
*/
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<EBAHomePage />} exact />  
        <Route path="/about" element={<About />} exact />
        <Route path="/quote" element={<Quote />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/maps" element={<Maps />} exact />
          <Route path="/relax" element={<Relax />} exact />
          <Route path="/countdown" element={<CountDown />} exact />
          <Route path="/intensity" element={<Workout />} exact />
          <Route path="/updateProfile" element={<UpdateProfile />} exact />
          <Route path="/home" element={<HomeScreen />} exact />
          <Route path="/personalPage" element={<PersonalPage />} exact />
          <Route path="/afterWorkout" element={<AfterWorkout />} exact />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;