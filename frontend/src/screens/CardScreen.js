import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { useDispatch, useSelector } from "react-redux";
import ReactCardFlip from "react-card-flip"
import { useEffect, useState } from "react";
import { cardOfDeck, oneCardAction } from "../actions/cardActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function CardScreen() {
  const { id, card_id } = useParams()
  const [flip, setFlip] = useState(false)
  const oneCard = useSelector((state) => state.oneCard)
  const {loading, error, card } = oneCard
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(oneCardAction(card_id))
  }, [dispatch])

  const deleteHandler = (e) => {
    e?.preventDefault();

  }


  return (
    <div>
    <div className="d-flex justify-content-center border border-dark w-25 mt-5 mx-auto">
      {loading ? <Loader /> : error ? <Message>{error}</Message> : 

  <ReactCardFlip isFlipped={flip} 
            flipDirection="vertical">
            <div style={{
                width: '300px',
                height: '200px',
                fontSize: '40px',
                margin: '20px',
                borderRadius: '4px',
                textAlign: 'center',
                padding: '20px'
            }}>
              {card?.frontside}
                <br />
                <Button style={{
                    width: '150px',
                    padding: '10px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    borderRadius: '5px'
                }} onClick={() => setFlip(!flip)}>
                    Flip</Button>
            </div>
            <div style={{
                width: '300px',
                height: '200px',
                fontSize: '40px',
                margin: '20px',
                borderRadius: '4px',
                textAlign: 'center',
                padding: '20px'
            }}>
              {card?.backside}
                <br />
                <Button style={{
                    width: '150px',
                    padding: '10px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    borderRadius: '5px'
                }} onClick={() => setFlip(!flip)}>
                    Flip</Button>
            </div>
        </ReactCardFlip> 
}
        </div>             
        <Button variant="danger" className="d-flex rounded mx-auto mt-3" onClick={deleteHandler}>Delete</Button>
        </div>
  );
}
