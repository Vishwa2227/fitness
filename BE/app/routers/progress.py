from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import models, schemas
from app.auth import get_current_user

router = APIRouter(prefix="/progress", tags=["Progress"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.ProgressResponse)
def add_progress(
    progress: schemas.ProgressCreate,
    email: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.email == email).first()

    new_progress = models.Progress(
        user_id=user.id,
        **progress.dict()
    )

    db.add(new_progress)
    db.commit()
    db.refresh(new_progress)
    return new_progress

@router.get("/me", response_model=list[schemas.ProgressResponse])
def get_my_progress(
    email: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.email == email).first()
    return db.query(models.Progress).filter(
        models.Progress.user_id == user.id
    ).all()
