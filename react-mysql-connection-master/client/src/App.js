import { BrowserRouter, Routes, Route} from "react-router-dom";
import React, {useState} from "react";
import "./App.css";
import Maps from "./Components/Maps";
import Spotify from "./Spotify";

import Relax from "./Components/Relax/Relax"; 
import Menu from "./Components/Menu/Menu"; 

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} exact />
        <Route path="/Relax" element={<Relax />} exact />
        <Route path="/Maps" element={<Maps />} exact />
   
      </Routes>
    </BrowserRouter>
  );
}


export default App;