import React, { useEffect } from "react";
import "./Card.css";

const BASE_URL = "http://localhost:8000";

export default function Card() {
  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });

  return (
    <div className="card-body">
      <h3>Card</h3>
    </div>
  );
}
