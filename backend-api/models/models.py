from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship


class Card(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    frontside: str
    backside: str
    rating: int = Field(default=10)
    deck_id: Optional[int] = Field(foreign_key="deck.id")
    deck_name: str = Field(foreign_key="deck.name")
    deck: Optional["Deck"] = Relationship(back_populates="cards")

class Deck(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    name: str
    cards: List["Card"] = Relationship(back_populates="deck")


