from sqlmodel import  SQLModel, Session, create_engine

DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, connect_args={'check_same_thread': False})
session = Session(bind=engine)


def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()



