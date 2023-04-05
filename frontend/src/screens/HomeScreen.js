import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listDecks } from "../actions/deckActions";
import Loader from "../components/Loader";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const deckList = useSelector((state) => state.deckList);
  const { error, loading, decks } = deckList;

  useEffect(() => {
    dispatch(listDecks());
  }, [dispatch]);
  return (
    <div>
      <div className="d-flex justify-content-center my-3">
        <h1>Decks:</h1>
      </div>
      <div>
        {loading && <Loader />}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {decks ? decks.map((deck) => {
              return (
                <tr key={deck.id}>
                  <td>{deck.id}</td>
                  <td>
                    <Link to={`deck/${deck.id}`}>{deck.name}</Link>
                  </td>
                  <td>{deck.created_at.slice(0, 10)}</td>
                </tr>
              );
            })
          : (
            <p>No decks</p>
          )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
