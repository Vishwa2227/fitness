from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import models, schemas

router = APIRouter(prefix="/diet", tags=["Diet Plans"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.DietResponse)
def create_diet(diet: schemas.DietCreate, db: Session = Depends(get_db)):
    new_diet = models.DietPlan(**diet.dict())
    db.add(new_diet)
    db.commit()
    db.refresh(new_diet)
    return new_diet

@router.get("/", response_model=list[schemas.DietResponse])
def get_diets(db: Session = Depends(get_db)):
    return db.query(models.DietPlan).all()
