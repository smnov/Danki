import React, { useEffect, useState, Fragment } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import "./Decks.css";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper"

export default function Decks() {
  const BASE_URL = "http://localhost:8000";
  const [decks, setDecks] = useState([]);
  const [newDeck, setNewDeck] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(BASE_URL + "/decks")
      .then((response) => response.json())
      .then((data) => setDecks(data));
  }, []);

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

  return (
    <div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Deck</TableCell>
              <TableCell align="right">Created</TableCell>
              <TableCell align="right">New</TableCell>
              <TableCell align="right">In process</TableCell>
              <TableCell align="right">Repeated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {decks?.map((deck) => (
              <TableRow
              key={deck.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0} }}
            >
              <TableCell component="th" scope="row" className="deck-link">
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              </TableCell>
              <TableCell component="th" scope="row">
                {(deck?.created_at).slice(0,10)}
              </TableCell>
              <TableCell component="th" scope="row">
                {deck.cards}
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <form className="add-deck">
        <input
          className="deck-input"
          type="text"
          placeholder="Title"
          value={newDeck}
          onChange={(e) => setNewDeck(e.target.value)}
        />
        <Button type="submit" variant="outlined" onClick={createNewDeck}>
          Add deck
        </Button>
      </form>
    </div>
  );
}
