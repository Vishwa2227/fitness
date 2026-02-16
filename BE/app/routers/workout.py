from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.database import SessionLocal
from app import models, schemas

router = APIRouter(prefix="/workouts", tags=["Workouts"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.WorkoutResponse)
def create_workout(workout: schemas.WorkoutCreate, db: Session = Depends(get_db)):
    new_workout = models.Workout(**workout.dict())
    db.add(new_workout)
    db.commit()
    db.refresh(new_workout)
    return new_workout

@router.get("/", response_model=list[schemas.WorkoutResponse])
def get_workouts(db: Session = Depends(get_db)):
    return db.query(models.Workout).all()

@router.delete("/{workout_id}")
def delete_workout(workout_id: int, db: Session = Depends(get_db)):
    workout = db.query(models.Workout).filter(
        models.Workout.id == workout_id
    ).first()

    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")

    db.delete(workout)
    db.commit()
    return {"message": "Workout deleted"}