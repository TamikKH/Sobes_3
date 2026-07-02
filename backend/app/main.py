from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, engine, SessionLocal
from .models import User
from .auth import hash_password

from .routers import auth
from .routers import tickets

app = FastAPI(
    title="Ticket System API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


def create_admin():
    db: Session = SessionLocal()

    admin = db.query(User).filter(
        User.username == "admin"
    ).first()

    if not admin:
        admin = User(
            username="admin",
            password=hash_password("admin"),
            is_admin=True
        )

        db.add(admin)

        db.commit()

    db.close()


create_admin()

app.include_router(auth.router)
app.include_router(tickets.router)


@app.get("/")
def root():
    return {
        "message": "Ticket API is running"
    }