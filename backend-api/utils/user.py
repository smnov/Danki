from sqlmodel import select
from db.database import session
from models.models import User

def find_user(name):
    with session as ses:
        statement = select(User).where(User.username == name)
        return session.exec(statement).first()

def select_all_users():
    with session as ses:
        statement = select(User)
        res = session.exec(statement).all()
        return res
