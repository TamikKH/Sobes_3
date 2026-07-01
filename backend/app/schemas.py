from enum import Enum
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

class StatusEnum(str, Enum):
    new = "new"
    in_progress = "in_progress"
    done = "done"


class PriorityEnum(str, Enum):
    low = "low"
    normal = "normal"
    high = "high"

class TicketCreate(BaseModel):
    title: str = Field(min_length=3, max_length=120)

    description: Optional[str] = Field(
        default="",
        max_length=1000
    )

    priority: PriorityEnum = PriorityEnum.normal


class TicketUpdateStatus(BaseModel):
    status: StatusEnum


class TicketResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: StatusEnum
    priority: PriorityEnum
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True