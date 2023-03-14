import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import DeckScreen from "./screens/DeckScreen";
import AboutScreen from "./screens/AboutScreen";
import CardScreen from "./screens/CardScreen"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AddDeckScreen from "./screens/AddDeckScreen";
import LearnScreen from "./screens/LearnScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/deck/:id" element={<DeckScreen />} />
        <Route path="/deck/:id/cards/:card_id" element={<CardScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/add" element={<AddDeckScreen />} />
        <Route path="deck/:id/learn" element={<LearnScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
