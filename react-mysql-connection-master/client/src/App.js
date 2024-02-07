import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import WorkOutPage from "./WorkOutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} exact />
        <Route path="/workout" element={<WorkOutPage />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
