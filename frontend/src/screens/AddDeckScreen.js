import { Form } from "react-bootstrap";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function AddDeckScreen() {
  const [name, setName] = useState("");
  return (
    <div>
      <Form>
        <Form.Group
          controlId="frontside"
          className="d-flex justify-content-center"
        >
          <Form.Label className="text-align-center">Frontside</Form.Label>
          <Form.Control
            className="m-3 p-2 w-25"
            type="text"
            placeholder="name of new deck"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant="warning" type="submit" className="m-3 rounded">
          Add
        </Button>
      </Form>
    </div>
  );
}
