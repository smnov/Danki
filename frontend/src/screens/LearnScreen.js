import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactCardFlip from "react-card-flip"
import { useParams } from "react-router-dom";
import { cardLearnAction } from '../actions/learningActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Button } from 'react-bootstrap';

function LearnScreen() {
  const dispatch = useDispatch()
  const [flip, setFlip] = useState(false)
  const { id } = useParams()
  const cardLearn = useSelector(state => state.cardLearn)
  const {loading, error, card} = cardLearn
  useEffect(() => {
    dispatch(cardLearnAction(id))
  }, [dispatch])
  return (
    <div>
        <h1 className='d-flex justify-content-center mt-4 mx-auto'>Learn</h1>
        {console.log(card)}
    <div className="d-flex justify-content-center border border-dark w-25 mt-5 mx-auto">
      {loading ? <Loader /> : error ? <Message>{error}</Message> : 
<div>
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
              <div className='mt-5 d-flex justify-content-center'>
          <Button variant="danger" className='m-2 rounded'>Again</Button>
          <Button variant="warning" className='m-2 rounded'>Difficult</Button>
          <Button className='m-2 rounded'>OK</Button>
          <Button variant="success" className='m-2 rounded'>Easy</Button>
          </div>
                <br />
            </div>
        </ReactCardFlip> 
        </div>
}
        </div>             
        </div>
  )
}

export default LearnScreen