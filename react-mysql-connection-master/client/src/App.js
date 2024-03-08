import { BrowserRouter, Routes, Route} from "react-router-dom";
import React, {useState} from "react";
import "./App.css";
import Maps from "./Components/Maps";
import Spotify from "./Spotify";

import Relax from "./Components/Relax/Relax"; 
import Menu from "./Components/Menu/Menu"; 
import Intensity from "./Components/Intensity"

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} exact />
        <Route path="/relax" element={<Relax />} exact />
        <Route path="/maps" element={<Maps />} exact />
        <Route path="/intensity" element={<Intensity />} exact />
      </Routes>
    </BrowserRouter>
  );
}


export default App;