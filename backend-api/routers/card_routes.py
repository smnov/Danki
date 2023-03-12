from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from sqlmodel import Session, select
from db.database import engine
from models.models import Card, CardPatch
from typing import List

router = APIRouter()
session = Session(bind=engine)

@router.patch("/cards/{id}", response_model=CardPatch, tags=['cards'])
async def edit_card(id: int, card: Card):
    """Edit card by id"""
    found_card = select(Card).where(Card.id == id)
    updated_card = card.dict(exclude_unset=True)
    updated_card.pop('id', id)
    for key, val in updated_card.items():
        found_card.__setattr__(key, val)
    session.commit()
    return found_card

@router.get("/cards/all", response_model=List[Card], tags=["cards"])
async def get_all_cards():
    """Get all cards"""
    statement = select(Card)
    res = session.exec(statement).all()
    return res

@router.get("/cards/{id}", response_model=Card, tags=["cards"])
async def get_card(id: int):
    """Get particular card by id"""
    statement = select(Card).where(Card.id == id)
    res = session.exec(statement).first()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return res

@router.get("/deck/{id}/status/repeat", response_model=List[Card], tags=['cards'])
async def repeat_status(id: int):
    """Get cards of a deck with status 'repeat'"""
    cards_found = select(Card).where(Card.deck_id == id).where(Card.status == "repeat").where(Card.is_done == False)
    res = session.exec(cards_found).all()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return res

@router.get("/deck/{id}/status/learning", response_model=List[Card], tags=['cards'])
async def new_status(id: int):
    """Get cards of a deck with status 'learning'"""
    cards_found = select(Card).where(Card.deck_id == id).where(Card.status == "learning").where(Card.is_done == False)
    res = session.exec(cards_found).all()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return res

@router.get("/deck/{id}/status/new", response_model=List[Card], tags=["cards"])
async def new_cards(id: int):
    """Get cards of a deck with status 'new'"""
    cards_found = select(Card).where(Card.deck_id == id).where(Card.status == "New").where(Card.is_done == False)
    res = session.exec(cards_found).all()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return res
