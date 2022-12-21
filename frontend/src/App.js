import "./App.css";
import Decks from "./components/Decks";
import OneDeck from "./components/OneDeck";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./components/Context";
import { useState } from "react";

function App() {
  const [context, setContext] = useState("")
  return (
    <Context.Provider value={[context, setContext]}
    <Router>
      <Routes>
        <Route path="/" element={<Decks />} />
        <Route path={`/decks/${id}`} element={<OneDeck />} />
      </Routes>
    </Router>
    </Context.Provider >
  );
}

export default App;
