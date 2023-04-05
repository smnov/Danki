from typing import List
from models.models import Card, Deck, CardPatch, DeckDelete
from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from sqlmodel import Session, select
from db.database import engine
import datetime
from config import interval


router = APIRouter()
session = Session(bind=engine)


@router.get("/decks/{id}/cards", response_model=List[Card], tags=["cards"])
async def get_cards_of_deck(id: int):
    """Get cards of a deck by the deck id"""
    statement = select(Card).where(Card.deck_id == id)
    res = session.exec(statement).all()
    if not res:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    for card in res:
        if card.isDone == True and (datetime.datetime.now() - card.last_update).seconds > interval:
            card.isDone = False    
    session.commit()
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
    deck_statement = select(Deck)
    deck_res = session.exec(deck_statement).all()
    card_statement = select(Card)
    card_res = session.exec(card_statement).all()
    for card in card_res:
        if (datetime.datetime.now() - card.last_update).seconds > interval:
            card.isDone = False
            session.commit()
    return deck_res

@router.post("/decks", response_model=Deck, tags=["decks"])
async def create_deck(deck: Deck) -> Deck:
    """Create a deck"""
    new_deck = Deck(name=deck.name)
    if new_deck.name == "":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Deck title must be at least 1 character long.")
    session.add(new_deck)
    session.commit()
    return new_deck


@router.delete("/delete/{id}", tags=["decks"])
async def delete_deck(id: int):
    """Delete the deck and all it's cards"""
    card_found = select(Card).where(Card.deck_id == id)
    deck_found = select(Deck).where(Deck.id == id)
    query = session.exec(deck_found)
    deck = query.one()
    res = session.exec(card_found).all()
    if res != None:  
        for card in res:
            session.delete(card)
            session.commit()
    session.delete(deck)
    session.commit()
