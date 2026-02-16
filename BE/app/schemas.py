from pydantic import BaseModel, EmailStr
from datetime import date

# ---------- USER ----------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


# ---------- PROFILE ----------
class ProfileCreate(BaseModel):
    age: int
    height: int
    weight: int
    goal: str

class ProfileResponse(ProfileCreate):
    id: int

    class Config:
        from_attributes = True


# ---------- WORKOUT ----------
class WorkoutCreate(BaseModel):
    title: str
    description: str
    difficulty: str

class WorkoutResponse(WorkoutCreate):
    id: int

    class Config:
        from_attributes = True

class DietCreate(BaseModel):
    meal_type: str
    calories: int
    description: str

class DietResponse(DietCreate):
    id: int

    class Config:
        from_attributes = True



class ProgressCreate(BaseModel):
    date: date
    weight: int
    calories: int
    steps: int

class ProgressResponse(ProgressCreate):
    id: int

    class Config:
        from_attributes = True
