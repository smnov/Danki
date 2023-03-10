from typing import List
from models.models import Card, Deck, CardPatch, DeckDelete
from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from sqlmodel import Session, select, col
from db.database import engine


router = APIRouter()
session = Session(bind=engine)

@router.get("/decks/{id}/cards", response_model=List[Card], tags=["cards"])
async def get_cards_of_deck(id: int):
    """Get cards of a deck by the deck id"""
    statement = select(Card).where(Card.deck_id == id)
    res = session.exec(statement).all()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return res

@router.get("/decks/{id}", response_model=Deck, tags=["decks"])
async def get_deck(id: int):
    """Get deck by id"""
    statement = select(Deck).where(Deck.id == id)
    res = session.exec(statement).first()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return res


@router.post("/decks/{id}", response_model=Card, status_code=status.HTTP_201_CREATED, tags=["cards"]) 
async def create_card(id: int, card: Card):
    """Create a card"""
    new_card = Card(frontside=card.frontside, backside=card.backside, deck_id=id)
    new_card2 = Card(frontside=card.backside, backside=card.frontside, deck_id=id)
    session.add(new_card)
    session.add(new_card2)
    session.commit()
    return new_card

@router.get("/decks", response_model=List[Deck], tags=["decks"])
async def get_decks():
    """Get all decks"""
    statement = select(Deck)
    res = session.exec(statement).all()
    return res

@router.post("/decks", response_model=Deck, status_code=status.HTTP_201_CREATED, tags=["decks"]) 
async def create_deck(deck: Deck):
    """Create a deck"""
    new_deck = Deck(name=deck.name)
    session.add(new_deck)
    session.commit()
    return new_deck


@router.get("/delete/card/{id}", response_model=List[Card],tags=['cards'])
async def delete_card(id: int):
    cards_found = select(Card).where(Card.deck_id == id)
    res = session.exec(cards_found).all()
    if res != None:
        session.delete(res)
        session.commit()

@router.get("/delete/{id}", tags=["decks"])
async def delete_deck(id: int):
    """Delete the deck and all it's cards"""
    card_found = select(Card).where(Card.deck_id == id)
    deck_found = select(Deck).where(Deck.id == id)
    res = session.exec(card_found).all()
    if res != None:
        session.delete(res)
        session.commit()
    session.delete(deck_found)
    session.commit()
