import { Button, Modal } from "react-bootstrap";

export default function AddDeckModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Deck</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleClose}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}
