import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Decks from "./components/Decks";
import OneDeck from "./components/OneDeck";
import LearnDeck from "./components/LearnDeck";
import ListOfDeck from "./components/ListOfDeck"
import NotFound from "./components/NotFound";
import jwt_decode from "jwt-decode";
import Login from "./components/Login"
import { useEffect, useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import Card from "./components/Card";
import Register from "./components/Register";
import { useCookies } from "react-cookie";

function App() {
  const BASE_URL = "http://localhost:8000";
  const [loginOpen, setLoginOpen] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [newDeck, setNewDeck] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies(["token"])
  const [username, setUsername] = useState("")

  useEffect(() => {
    if (cookies.token) {
      const decoded = jwt_decode(cookies.token)
      setUsername(decoded.sub)
    }
  })

  const upload = () => {
    setOpenUpload(true);
  };

  const createNewDeck = (event) => {
    event?.preventDefault();

    const json_string = JSON.stringify({
      name: newDeck,
    });
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: json_string,
    };
    fetch(BASE_URL + "/decks", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setNewDeck("");
        window.location.reload(false);
      });
  };

  const logout = () => {
    removeCookies("token", {path:"/"})
    removeCookies("csrftoken", {path:"/"})
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxWidth: "70%",
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav">
          DECKS
        </Link>  
        {cookies.token == null ? (
          <>
          <Link className="nav" onClick={() => setLoginOpen(true)}>
            LOGIN
          </Link>
        <Link to="/register" className="nav">
          REGISTER
        </Link>
        </>
        ) : (
          <>
        <Link onClick={upload} className="nav">
          ADD DECK
        </Link>
          <Link onClick={logout} className="nav">
            LOGOUT
          </Link>
          <Link className="nav">
            {username}
          </Link>
          </>
        )
        }
        <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
          <Box sx={style}>
            <Login 
            setLoginOpen={setLoginOpen} 
            setCookies={setCookies}
            cookies={cookies}
            />
          </Box>
        </Modal>
        <Modal open={openUpload} onClose={() => setOpenUpload(false)}>
          <Box sx={style}>
            <div>
              <TextField
                id="standart-basic"
                label="Deck title"
                type="text"
                size="small"
                value={newDeck}
                onChange={(e) => setNewDeck(e.target.value)}
              />
              <Button
                onClick={createNewDeck}
                variant="contained"
                size="large"
                type="submit"
              >
                Add deck
              </Button>
            </div>
          </Box>
        </Modal>
      </nav>
      <Routes>
        <Route path="/" element={<Decks />} />
        <Route path="decks/:id" element={<OneDeck />} />
        <Route path="decks/:id/learn" element={<LearnDeck />} />
        <Route path="decks/:id/list" element={<ListOfDeck />} />
        <Route path="card/:id" element={<Card />} />
        <Route path="register/" element={<Register />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
