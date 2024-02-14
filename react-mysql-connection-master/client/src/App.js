import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import WorkOutPage from "./WorkOutPage";
import Maps from "./Maps";
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} exact />
        <Route path="/workout" element={<WorkOutPage />} exact />
        <Route path="/maps" element={<Maps />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
