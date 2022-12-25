import React, { useEffect, useState, Fragment } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import "./Decks.css";

export default function Decks() {
  const BASE_URL = "http://localhost:8000";
  const [decks, setDecks] = useState([]);
  const [newDeck, setNewDeck] = useState("");

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
      .then((data) => {
        setNewDeck("");
      });
  };

  return (
    <div>
      <Fragment>
        <h2 className="header">Decks</h2>
        <br />
        <ul className="deck">
          {decks?.map((deck) => {
            return (
              <li className="link" key={deck.id}>
                <Link to={`decks/${deck.id}`}>{deck.name}</Link>
              </li>
            );
          })}
        </ul>
      </Fragment>
      <form>
        <input
          type="text"
          placeholder="title"
          value={newDeck}
          onChange={(e) => setNewDeck(e.target.value)}
        />
        <button type="submit" onClick={createNewDeck}>
          Add deck
        </button>
      </form>
    </div>
  );
}
