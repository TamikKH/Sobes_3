from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt

from sqlalchemy.orm import Session

from .database import get_db
from .models import User
from .auth import SECRET_KEY, ALGORITHM

security = HTTPBearer()


def get_current_user(
    credentials=Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        username = payload.get("sub")

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user


def admin_required(
    user: User = Depends(get_current_user)
):

    if not user.is_admin:
        raise HTTPException(
            status_code=403,
            detail="Administrator only"
        )

    return user