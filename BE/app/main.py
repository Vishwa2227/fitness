from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import user, profile, workout , diet , progress






Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fitness App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(profile.router)
app.include_router(workout.router)
app.include_router(diet.router)
app.include_router(progress.router)

@app.get("/")
def root():
    return {"message": "Backend running"}
