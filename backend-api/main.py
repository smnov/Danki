from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
import uvicorn
from db.database import engine
from routers.deck_routers import router
from routers import user_routers, learning_routes, card_routes

app = FastAPI()
app.include_router(router)
app.include_router(user_routers.router)
app.include_router(learning_routes.router)
app.include_router(card_routes.router)

port = 8000

origins = ["*"]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_methods=["*"],
        allow_headers=["*"]
        )


def create_db_and_tables(): # Disable it after first start.
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    create_db_and_tables()
    uvicorn.run("main:app", host="localhost", port=port, reload = True)
    
