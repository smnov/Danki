from typing import List
import datetime
from db.database import engine
from sqlmodel import Session, select
from models.models import Card, CardPatch
from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
import random

session = Session(bind=engine)
router = APIRouter()

arr = []

@router.get("/learning/{id}", response_model=Card, tags=['learning'])
async def learn_the_deck(id: int):
    """Gives random element of a deck"""
    statement = select(Card).where(Card.deck_id == id)
    res = session.exec(statement).all()
    card = random.choice(res)
    return card

@router.patch("/cardstatus/{id}", response_model=Card, tags=['learning'])
async def learning_status(id: int):
    """Change status of the card to learning"""
    card_found = select(Card).where(Card.id == id)
    res = session.exec(card_found).first()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if res.status == "New":
        res.status = "learning"
    session.commit()
    return res

@router.patch('/card/rating/minus/{id}', response_model=Card, tags=['learning'])
async def change_rating(id: int, rating: int):
    """Change rating of the card"""
    card_found = select(Card).where(Card.id == id)
    res = session.exec(card_found).first()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    res.rating -= rating
    date = datetime.datetime.now() - res.created_at
    if res.status == "New":
        res.status = "learning"
    session.commit()
    return res


@router.patch('/card/rating/plus/{id}', response_model=Card, tags=['learning'])
async def change_rating(id: int, rating: int):
    """Change rating of the card"""
    card_found = select(Card).where(Card.id == id)
    res = session.exec(card_found).first()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    date = datetime.datetime.now() - res.created_at
    if res.status == "New": 
        res.status = "learning"
    res.rating += rating
    session.commit()
    return res
