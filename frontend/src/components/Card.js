import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"
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

  const deleteCard = () => {
    
  }

  return (
    <div className="card-body">
      <p>card id:{card?.id}</p>
      <p>frontside: {card?.frontside}</p>
      <p>backside: {card?.backside}</p>
      <p>rating: {card?.rating}</p>
      <p>created: {card?.created_at}</p>
      <Button variant="contained" color="error" onClick={cardUpdate}>Edit card</Button>
      <IconButton onClick={deleteCard} aria-label="delete"><DeleteIcon color="error" /></IconButton>
    </div>
  );
}
