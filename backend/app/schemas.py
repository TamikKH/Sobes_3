from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class TicketCreate(BaseModel):
    title: str = Field(min_length=3, max_length=120)

    description: Optional[str] = Field(
        default="",
        max_length=1000
    )

    priority: str = "normal"


class TicketUpdateStatus(BaseModel):
    status: str


class TicketResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    priority: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str