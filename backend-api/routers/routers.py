from typing import List
from models.models import Card, Deck
from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from sqlmodel import Session, select
from db.database import engine


router = APIRouter()
session = Session(bind=engine)


@router.get("/", response_model=List[Card], tags=["cards"])
async def get_all_cards():
    statement = select(Card)
    res = session.exec(statement).all()
    return res

@router.get("/decks/{id}", response_model=List[Card], tags=["cards"])
async def get_cards_of_deck(id: int):
    statement = select(Card).where(Card.deck_id == id)
    res = session.exec(statement).all()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return res

@router.post("/decks/{id}", response_model=Card, status_code=status.HTTP_201_CREATED, tags=["cards"]) # Create a card
async def create_card(id: int, card: Card):
    new_card = Card(frontside=card.frontside, backside=card.backside, deck_id=id)
    session.add(new_card)
    session.commit()
    return new_card

@router.get("/decks", response_model=List[Deck], tags=["decks"])
async def get_decks():
    statement = select(Deck)
    res = session.exec(statement).all()
    return res

# @router.get("/decks/{id}", response_model=Deck, tags=["decks"])
# async def get_deck_by_id(id: int):
#     statement = select(Deck).where(Deck.id == id)
#     res = session.exec(statement).first()

#     if not res:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

#     return res
@router.post("/decks", response_model=Deck, status_code=status.HTTP_201_CREATED, tags=["decks"])
async def create_deck(deck: Deck):
    new_deck = Deck(name=deck.name)
    session.add(new_deck)
    session.commit()
    return new_deck
