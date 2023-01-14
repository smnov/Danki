import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./OneDeck.css";

export default function OneDeck() {
  const [cards, setCards] = useState("");
  const [deck, setDeck] = useState("")
  const [frontside, setFrontside] = useState("");
  const [backside, setBackside] = useState("");
  const [learnCards, setLearnCards] = useState("")
  const [newCards, setNewCards] = useState("")
  const [repeatCards, setRepeatCards] = useState("")
  const cardsdata = Array.from(cards);

  const BASE_URL = "http://localhost:8000/decks/";
  const { id } = useParams();

  useEffect(() => {
    fetch(BASE_URL + `${id}` + "/cards")
      .then((response) => response.json())
      .then((data) => setCards(data))
  }, []);

  useEffect(() => {
    fetch(BASE_URL + `${id}`)
    .then((response) => response.json())
    .then((data => setDeck(data)))
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8000/deck/${id}/status/learning`)
    .then((response) => response.json())
    .then((data) => setLearnCards(data))

    fetch(`http://localhost:8000/deck/${id}/status/repeat`)
    .then((response) => response.json())
    .then((data) => setRepeatCards(data))

    fetch(`http://localhost:8000/deck/${id}/status/new`)
    .then((response) => response.json())
    .then((data) => setNewCards(data))
  }, [])

  const createCard = (event) => {
    event?.preventDefault();

    const json_string = JSON.stringify({
      frontside: frontside,
      backside: backside,
      deck_id: id,
    });
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: json_string,
    };
    fetch(BASE_URL + `${id}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setFrontside("");
        setBackside("");
        window.location.reload(false);
      });
  };

  return (
    <div>
          <h2 className="header">
            {deck?.name}
          </h2>
      {cardsdata.length !== 0 ? (
        <div className="learn">
          <Button className="learn-btn" variant="outlined">
            <Link to={`/decks/${id}/list`}>List</Link></Button>
          <Button className="learn-btn" variant="outlined" color="error">
            Delete
          </Button>
          <div className="data-top">Learning words: {learnCards.length ? learnCards.length : 0}</div>
          <div className="data">Repeat words: {repeatCards.length ? repeatCards.length : 0}</div>
          <div className="data">New words: {newCards.length ? newCards.length : 0}</div>
          <div className="learn">
            <Button variant="contained" className="learn-btn">
              <Link to={`/decks/${id}/learn`}>Learn</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="learn">That's all for today!</h2>
        </div>
      )}
      <div>
        <form className="card-form">
          <input
            className="new-deck-input"
            type="text"
            placeholder="frontside"
            value={frontside}
            onChange={(e) => setFrontside(e.target.value)}
          />
          <input
            className="new-deck-input"
            type="text"
            placeholder="backside"
            value={backside}
            onChange={(e) => setBackside(e.target.value)}
          />
          <br />
          <Button className="add-btn" variant="outlined" type="submit" onClick={createCard}>
            Add card
          </Button>
        </form>
      </div>
    </div>
  );
}
