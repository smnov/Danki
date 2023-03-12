from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship
from pydantic import EmailStr, validator


class Card(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    frontside: str
    backside: str
    rating: int = Field(default=3)
    deck_id: int = Field(foreign_key="deck.id")
    status: str = Field(default="New")
    is_done: bool = False
    created_at: datetime = datetime.now()
    last_update: datetime = datetime.now()
    deck: Optional["Deck"] = Relationship(back_populates="cards")


class CardPatch(SQLModel):
    id: Optional[int] = Field(primary_key=True)
    frontside: str
    backside: str
    
class Deck(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    name: str
    cards: List["Card"] = Relationship(back_populates="deck")
    created_at = datetime = datetime.now()

class DeckDelete(SQLModel):
    id: Optional[int] = Field(primary_key=True)


class User(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    username: str
    email: EmailStr
    password: str
    created_at: datetime = datetime.now()
    stuff: bool = False


class UserInput(SQLModel):
    username: str
    password: str = Field(max_length=150, min_length=6)
    password2: str
    email: EmailStr

    @validator('password2')
    def password_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError("passwords don't match")
        return v
    

class UserLogin(SQLModel):
    username: str
    password: str

