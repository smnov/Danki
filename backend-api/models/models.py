from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship


class Card(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    frontside: str
    backside: str
    deck_id: Optional[int] = Field(default=None, foreign_key="deck.id")
    deck: Optional["Deck"] = Relationship(back_populates="cards")

class Deck(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    name: str
    cards: List["Card"] = Relationship(back_populates="deck")


