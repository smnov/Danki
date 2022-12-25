import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Decks from "./components/Decks";
import OneDeck from "./components/OneDeck";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="decks/" element={<Decks />} />
        <Route path="decks/:id" element={<OneDeck />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
