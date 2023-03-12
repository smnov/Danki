from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from starlette.status import HTTP_201_CREATED
from auth.authentication import AuthHandler
from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from models.models import User, UserInput, UserLogin
from sqlmodel import Session
from db.database import get_db
from db.database import engine
from utils.user import select_all_users, find_user


session = Session(bind=engine)
router = APIRouter()
auth_handler = AuthHandler()

@router.post('/signup', status_code=201, tags=['users'])
def registation(user: UserInput):
    users = select_all_users()
    if any(x.username == user.username for x in users):
        raise HTTPException(status_code=400, detail="Username is taken")
    hashed_pwd = auth_handler.get_password_hash(user.password)
    u = User(username=user.username, password=hashed_pwd, email=user.email)
    session.add(u)
    session.commit()
    session.refresh(u)
    encoded = jsonable_encoder(u)
    return JSONResponse(status_code=HTTP_201_CREATED, content=encoded)

@router.post('/login', tags=['users'])
def login(user: UserLogin):
    user_found = find_user(user.username)
    if not user_found:
        raise HTTPException(status_code=401, detail='Invalid username and/or password')
    verified = auth_handler.verify_password(user.password, user_found.password)
    if not verified:
        raise HTTPException(status_code=401, detail='Invalid username and/or password')
    token = auth_handler.encode_token(user_found.username)
    return {'token': token}

@router.get('/users/me', tags=['users'])
def get_current_user(user: User = Depends(auth_handler.get_current_user)):
    return user
    

