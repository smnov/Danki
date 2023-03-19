import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { cardsOfDeckAction, createCardAction } from "../actions/cardActions";
import { deckDetails, deckDeleteAction } from "../actions/deckActions";
import { cardStatusAction } from "../actions/learningActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function DeckScreen() {
  const { id } = useParams();
  const [addModal, setAddModal] = useState(false);
  const [frontside, setFrontside] = useState("");
  const [backside, setBackside] = useState("");
  const [showCards, setShowCards] = useState(false)
  const [done, setDone] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const oneDeck = useSelector((state) => state.oneDeck);
  const cardsOfDeck = useSelector((state) => state.cardsOfDeck);
  const cardStatus = useSelector((state) => state.cardStatus)
  const {statusLoading, statusError, status} = cardStatus
  const { loading, error, deck } = oneDeck;
  const { cardsLoading, cardsError, cards } = cardsOfDeck;

  useEffect(() => {
    dispatch(deckDetails(id));
    dispatch(cardsOfDeckAction(id));
    dispatch(cardStatusAction(id))
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
      navigate("/");
    } else {
    }
  };
  const showCardsHandler = () => {
    showCards ?
    setShowCards(false)
    :
    setShowCards(true)
  }


  return (
    <div>
      {!done ?
      <div className="d-flex flex-column my-3">
        <div className="mx-auto">
        <Link to="learn">
        <Button className="m-2 rounded">
          Learn
        </Button>
        </Link>
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
        <div className="mx-auto">
        <h1>{deck?.name}</h1>
        <div className="d-inline-flex">
            <p className="text-success">New: {status?.["statusNew"] ? status["statusNew"] : 0} </p>
            <p className="mx-2 text-warning">Learning: {status?.["statusLearn"] ? status["statusLearn"] : 0}</p>
            <p className="text-danger">Repeat: {status?.["statusRepeat"] ? status["statusRepeat"] : 0}</p>
        </div>
        </div>
      <div className="d-flex justify-content-center mt-4">
      <Button onClick={showCardsHandler} variant="info" className="mb-3 rounded">{showCards ? "Hide Cards" : "Show cards"}</Button>
      </div>
      {cardsLoading && <Loader />}
      {showCards &&
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Frontside</th>
            <th>Created</th>
            <th>Edit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cards ? 
          cards.map((card) => {
            return (
              <tr key={card.id}>
                <td>{card.id}</td>
                <td>
                  <Link to={`cards/${card.id}`}>{card.frontside}</Link>
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
                <td>{card?.status}</td>
              </tr>
            );
          }) : <h1>No cards...</h1>}
        </tbody>
      </Table>
  }
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
    : <h1>Thast all for today!</h1>
}
    </div>
  );
}
