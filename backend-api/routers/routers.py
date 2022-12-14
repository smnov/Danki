from typing import List
from models.models import Card, Deck
from fastapi import APIRouter, status
from sqlmodel import Session, select
from db.database import engine


router = APIRouter()
session = Session(bind=engine)


@router.get("/", response_model=List[Card])
async def get_all_cards():
    statement = select(Card)
    res = session.exec(statement).all()
    return res

@router.get("/decks", response_model=List[Deck])
async def get_decks():
    statement = select(Deck)
    res = session.exec(statement).all()
    return res


@router.post("/decks", response_model=Deck, status_code=status.HTTP_201_CREATED)
async def create_deck(deck: Deck):
    new_deck = Deck(name=deck.name)
    session.add(new_deck)
    session.commit()
    return new_deck