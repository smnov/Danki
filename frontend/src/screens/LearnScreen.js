import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactCardFlip from "react-card-flip"
import { Link, useNavigate, useParams } from "react-router-dom";
import { cardLearnAction, decreaseCardAction, increaseCardAction } from '../actions/learningActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Button } from 'react-bootstrap';

function LearnScreen() {
  const dispatch = useDispatch()
  const [flip, setFlip] = useState(false)
  const { id } = useParams()
  const cardLearn = useSelector(state => state.cardLearn)
  const navigate = useNavigate()
  const {loading, error, card} = cardLearn


  useEffect(() => {
    dispatch(cardLearnAction(id))
  }, [dispatch])

  const againHandler = () => {
    dispatch(decreaseCardAction(card.id, 2))
    window.location.reload(false)
  }

  const difficultHandler = () => {
    dispatch(decreaseCardAction(card.id, 1))
    window.location.reload(false)
  }

  const okHandler = () => {
    dispatch(increaseCardAction(card.id, 1))
    window.location.reload(false)

  }

  const easyHandler = () => {
    dispatch(increaseCardAction(card.id, 2))
    window.location.reload(false)
  }


  return (
    <div>
    {card ? 
    <div>
        <h1 className='d-flex justify-content-center mt-4 mx-auto'>Learn</h1>
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
              {card?.frontside}
              <hr className='w-1'/>
              {card?.backside}
            </div>
        </ReactCardFlip> 
        </div>
}
        </div>             
              {flip && <div className='d-flex justify-content-center'>
          <Button variant="danger" className='m-2 rounded' onClick={againHandler}>Again</Button>
          <Button variant="warning" className='m-2 rounded' onClick={difficultHandler}>Difficult</Button>
          <Button className='m-2 rounded' onClick={okHandler}>OK</Button>
          <Button variant="success" className='m-2 rounded' onClick={easyHandler}>Easy</Button>
          </div>}
          </div>
: 
<div className='d-md-flex flex-column justify-content-center mt-4'>
<h1 className='mx-auto'>That's all for today!</h1>
<Button className='rounded mx-auto' onClick={() => navigate(-1)}>Go back</Button>
</div>
}
</div>
  )
}

export default LearnScreen