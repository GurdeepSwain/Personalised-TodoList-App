import "./App.css";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Leaderboard from "./components/Leaderboard";
import SeriousPersonality from "./components/SeriousPersonality";
import ResponsiblePersonality from "./components/ResponsiblePersonality";
import LivelyPersonality from "./components/LivelyPersonality";
import ExtravertedPersonality from "./components/ExtravertedPersonality";
import DependablePersonality from "./components/DependablePersonality";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/serious" element={<SeriousPersonality />} />
          <Route path="/extraverted" element={<ExtravertedPersonality />} />
          <Route path="/responsible" element={<ResponsiblePersonality />} />
          <Route path="/lively" element={<LivelyPersonality />} />
          <Route path="/dependable" element={<DependablePersonality />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
