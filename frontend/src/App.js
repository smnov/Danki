import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import DeckScreen from "./screens/DeckScreen";
import AboutScreen from "./screens/AboutScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AddDeckScreen from "./screens/AddDeckScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/deck/:id" element={<DeckScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/add" element={<AddDeckScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
