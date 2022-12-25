import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OneDeck.css";

export default function OneDeck() {
  const [cards, setCards] = useState("");

  const BASE_URL = "http://localhost:8000/decks/";
  const { id } = useParams();

  useEffect(() => {
    fetch(BASE_URL + `${id}`)
      .then((response) => response.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <div>
      <p>Deck {id}</p>
      <Fragment>
        <ul>
          {cards?.map((c) => {
            return <li key={c.id}>{c.frontside}</li>;
          })}
        </ul>
      </Fragment>
    </div>
  );
}
