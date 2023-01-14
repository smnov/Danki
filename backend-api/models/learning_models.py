from typing import Optional, List
from sqlmodel import SQLModel


class NewCards(SQLModel, table=True):
    frontside: str
    backside: str
    created_at: str
    
class InProgressCards(SQLModel, table=True):
    pass

class RepeatedCards(SQLModel, table=True):
    pass
    
