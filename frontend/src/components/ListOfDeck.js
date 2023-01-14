import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from "@mui/material/Table"
import "./ListOfDeck.css"

export default function ListOfDeck() {
    const { id } = useParams()
    const [cards, setCards] = useState()
    const BASE_URL = "http://localhost:8000/decks/"

    useEffect(() => {
        fetch(BASE_URL + `${id}` + "/cards")
        .then(response => response.json())
        .then(data => setCards(data))
    },[])
    return (
        <div>
        <Fragment>
            <ul className="list">
            {cards?.map((c) => {
                return <li key={c.id}><Link to={`/card/${c.id}`}>{c.frontside}</Link></li>
            })}
            </ul>
        </Fragment>
        <Table>
            
        </Table>
            </div>
    )
}