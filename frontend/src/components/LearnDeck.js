import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function LearnDeck() {
  const BASE_URL = "http://localhost:8000/learning/";
  const RATING_URL = "http://localhost:8000/card/rating/"
  const [card, setCard] = useState("");
  const [learnCards, setLearnCards] = useState("")
  const [repeatCards, setRepeatCards] = useState("")
  const [newCards, setNewCards] = useState("")
  const [answer, setAnswer] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(BASE_URL + `${id}`)
      .then((response) => response.json())
      .then((data) => setCard(data));
  }, [id]);

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


const againAnswer = (event) => {
    event?.preventDefault();

    const rating = 2

    const requestOptions = {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    fetch(RATING_URL + `minus/${card.id}?rating=${rating}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.reload(false)
      })
  };

const difficultAnswer = (event) => {
    event?.preventDefault();

    const rating = 1

    const requestOptions = {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    fetch(RATING_URL + `minus/${card.id}?rating=${rating}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.reload(false)
      })
  };

const okAnswer = (event) => {
    event?.preventDefault();

    const rating = 1

    const requestOptions = {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    fetch(RATING_URL + `plus/${card.id}?rating=${rating}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.reload(false)
      })
  };

const easyAnswer = (event) => {
    event?.preventDefault();

    const rating = 2

    const requestOptions = {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    fetch(RATING_URL + `plus/${card.id}?rating=${rating}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.reload(false)
      })
  };



   const ruler = () => {
    setAnswer(true);
  };

  return (
    <div className="learn">
      {answer ? (
        <div>
          <p>{card.frontside}</p>
          <hr />
          <p>{card.backside}</p>
          <hr />
          <Button onClick={againAnswer}>Again</Button>
          <Button onClick={difficultAnswer}>Difficult</Button>
          <Button onClick={okAnswer}>OK</Button>
          <Button onClick={easyAnswer}>Easy</Button>
        </div>
      ) : (
        <div>
          {card.frontside}
          <hr />
          <Button onClick={ruler}>Show the answer</Button>
        </div>
      )}
          <div className="data-top">Learning words: {learnCards.length ? learnCards.length : 0}</div>
          <div className="data">Repeat words: {repeatCards.length ? repeatCards.length : 0}</div>
          <div className="data">New words: {newCards.length ? newCards.length : 0}</div>
    </div>
  );
}
