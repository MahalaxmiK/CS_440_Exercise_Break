import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./LoginPage";
import WorkOutPage from "./WorkOutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} exact />
        <Route path="/workout" element={<WorkOutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
