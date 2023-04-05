import { Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { Button } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom"
import { deckCreateAction } from "../actions/deckActions";

export default function AddDeckScreen() {
  const [name, setName] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e?.preventDefault();
    let deck = {
      created_at: Date.now(),
      datetime: Date.now(),
      name: name, 
    }
    dispatch(deckCreateAction(deck))
    navigate("/")
  }
  return (
    <div className="d-flex justify-content-center mt-4">
      <Form>
        <Form.Group
          className="text-align-center border border-dark p-3"
          controlId="frontside"
        >
          <Form.Label>New deck</Form.Label>
          <Form.Control
            type="text"
            placeholder="name of new deck"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        <Button variant="warning" type="submit" className="m-3 rounded" onClick={submitHandler}>
          Add
        </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
