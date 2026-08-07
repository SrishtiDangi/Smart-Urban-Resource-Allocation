from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database.connection import SessionLocal

from models.ward import Ward



router = APIRouter()



def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get("/wards")
def get_wards(
    db:Session=Depends(get_db)
):

    return db.query(Ward).all()