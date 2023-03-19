from typing import List
from db.database import engine
from sqlmodel import Session, select
from models.models import Card, CardPatch
from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from utils.learn import check_rating
import random


session = Session(bind=engine)
router = APIRouter()

@router.get("/learning/{id}", response_model=Card, tags=['learning'])
async def learn_the_deck(id: int):
    """Gives random element of a deck"""
    statement = select(Card).where(Card.deck_id == id).where(Card.isDone==False)
    res = session.exec(statement).all()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    card = random.choice(res)
    return card


@router.patch('/card/rating/minus/{id}', response_model=Card, tags=['learning'])
async def change_rating(id: int, rating: int):
    """Decrease rating of the card"""
    card_found = select(Card).where(Card.id == id)
    res = session.exec(card_found).first()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    res.session_rating -= rating
    check_rating(res)
    session.commit()
    return res


@router.patch('/card/rating/plus/{id}', response_model=Card, tags=['learning'])
async def change_rating(id: int, rating: int):
    """Increase rating of the card"""
    card_found = select(Card).where(Card.id == id)
    res = session.exec(card_found).first()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    res.session_rating += rating
    check_rating(res)
    session.commit()
    return res
