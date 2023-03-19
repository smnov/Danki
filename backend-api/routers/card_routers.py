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


@router.get("/deck/{id}/status", response_model=dict, tags=["cards"])
async def card_status(id: int):
    """Status of cards from the deck"""
    status_new = select(Card).where(Card.deck_id == id).where(Card.global_rating == 0).where(Card.isDone == False)
    status_learn = select(Card).where(Card.deck_id == id).where(Card.global_rating > 0).where(Card.global_rating < 5).where(Card.isDone == False)
    status_repeat = select(Card).where(Card.deck_id == id).where(Card.global_rating >= 5).where(Card.isDone == False)
    res1 = session.exec(status_new).all()
    res2 = session.exec(status_learn).all()
    res3 = session.exec(status_repeat).all()
    return {"statusNew": len(res1), "statusLearn": len(res2), "statusRepeat": len(res3)}
    

    