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

@router.get("/learning/{id}", response_model=Card, tags=['learning'])
async def learn_the_deck(id: int):
    """Gives random element of a deck"""
    statement = select(Card).where(Card.deck_id == id).where(Card.is_done == False)
    res = session.exec(statement).all()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    card = random.choice(res)
    data = datetime.datetime.now() - card.last_update
    if data.seconds >= 43200:
        card.is_done = False
        return card
    return card

@router.patch('/card/rating/minus/{id}', response_model=Card, tags=['learning'])
async def change_rating(id: int, rating: int):
    """Change rating of the card"""
    card_found = select(Card).where(Card.id == id)
    res = session.exec(card_found).first()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    data = datetime.datetime.now() - res.created_at
    res.rating -= rating
    if res.rating < 0:
        res.rating = 0
    if res.status == "New" and data.seconds >= 43200:
        res.status = "learning"
    if res.status == 'learning' and (data.days >=2):
        res.status == "repeated"
    session.commit()
    return res


@router.patch('/card/rating/plus/{id}', response_model=Card, tags=['learning'])
async def change_rating(id: int, rating: int):
    """Change rating of the card"""
    card_found = select(Card).where(Card.id == id)
    res = session.exec(card_found).first()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    data = datetime.datetime.now() - res.created_at
    res.rating += rating
    if res.rating >= 7:
        res.is_done = True
        res.rating = 3
        res.last_update = datetime.datetime.now()
    if res.status == "New" and data.seconds >= 43200:
        res.status = "learning"
    if res.status == 'learning' and (data.days >=2):
        res.status == "repeated"
    session.commit()
    return res
