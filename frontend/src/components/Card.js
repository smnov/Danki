import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Card.css";

export default function Card() {
const URL = "http://localhost:8000/cards/"
const { id } = useParams()
const [card, setCard] = useState()

  useEffect(() => {
    fetch(URL + `${id}`)
      .then((response) => response.json())
      .then((data) =>
        setCard(data));
  }, []);

  const cardUpdate = (event) => {
    event?.preventDefault()

  }

  return (
    <div className="card-body">
      <p>card id:{card?.id}</p>
      <p>frontside: {card?.frontside}</p>
      <p>backside: {card?.backside}</p>
      <p>rating: {card?.rating}</p>
      <p>created: {card?.created_at}</p>
      <Button variant="contained" onClick={cardUpdate}>Edit card</Button>
    </div>
  );
}
