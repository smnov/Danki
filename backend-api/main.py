from fastapi import FastAPI
from sqlmodel import SQLModel
import uvicorn
from db.database import engine
from routers.routers import router


app = FastAPI()
app.include_router(router)
port = 8000


def create_db_and_tables(): # Disable it after first start.
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    create_db_and_tables()
    uvicorn.run("main:app", host="localhost", port=port, reload = True)
    
