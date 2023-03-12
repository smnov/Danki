import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, redirect } from "react-router-dom";
import { cardOfDeck, createCardAction } from "../actions/cardActions";
import { deckDetails, deckDeleteAction } from "../actions/deckActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function DeckScreen() {
  const { id } = useParams();
  const [addModal, setAddModal] = useState(false);
  const [frontside, setFrontside] = useState("");
  const [backside, setBackside] = useState("");
  const oneDeck = useSelector((state) => state.oneDeck);
  const cardsOfDeck = useSelector((state) => state.cardsOfDeck);
  const dispatch = useDispatch();
  const { loading, error, deck } = oneDeck;
  const { cardsLoading, cardsError, cards } = cardsOfDeck;

  useEffect(() => {
    dispatch(deckDetails(id));
    dispatch(cardOfDeck(id));
  }, [dispatch]);

  const handleShowModal = () => setAddModal(true);
  const handleCloseModal = () => setAddModal(false);
  const submitHandler = (e) => {
    e?.preventDefault();
    setAddModal(false);
    let card = {
      id: id,
      deck_id: id,
      frontside: frontside,
      backside: backside,
      rating: 3,
      status: "New",
      is_done: false,
      created_at: Date.now(),
      last_update: Date.now(),
    };
    dispatch(createCardAction(card));
    window.location.reload(false);
  };

  const cardDeleteHandler = () => {};
  const deckDeleteHandler = () => {
    if (window.confirm("Do you realy want to delete this deck?")) {
      dispatch(deckDeleteAction(id));
      return redirect("/");
    } else {
      console.log("cancel");
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-center my-3">
        <h1>{deck?.name}</h1>
        <Button className=" d-flex justify-content-center rounded m-2">
          Learn
        </Button>
        <Button
          variant="warning"
          className="m-2 rounded"
          onClick={handleShowModal}
        >
          Add
        </Button>
        <Button
          className="m-2 rounded"
          variant="danger"
          onClick={deckDeleteHandler}
        >
          Delete
        </Button>
      </div>
      {cardsLoading && <Loader />}

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Frontside</th>
            <th>Created</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {cards?.map((card) => {
            return (
              <tr key={card.id}>
                <td>{card.id}</td>
                <td>
                  <Link to={`deck/${deck.id}`}>{card.frontside}</Link>
                </td>
                <td>{card.created_at.slice(0, 10)}</td>
                <td>
                  <Button variant="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button variant="btn-sm" onClick={cardDeleteHandler}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal show={addModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="frontside">
              <Form.Label>Frontside</Form.Label>
              <Form.Control
                type="text"
                placeholder="frontside"
                value={frontside}
                onChange={(e) => setFrontside(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="backside">
              <Form.Label>Backside</Form.Label>
              <Form.Control
                type="text"
                placeholder="backside"
                value={backside}
                onChange={(e) => setBackside(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="rounded"
            onClick={handleCloseModal}
          >
            Close
          </Button>
          <Button
            variant="success"
            type="submit"
            className="rounded"
            onClick={submitHandler}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
