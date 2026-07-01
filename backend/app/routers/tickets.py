from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas import (
    TicketCreate,
    TicketUpdateStatus,
    TicketResponse
)
from ..crud import (
    create_ticket,
    get_ticket,
    get_tickets,
    delete_ticket
)
from ..dependencies import (
    get_current_user,
    admin_required
)

router = APIRouter(
    prefix="/tickets",
    tags=["Tickets"]
)


@router.post("/", response_model=TicketResponse)
def create(
    data: TicketCreate,
    db: Session = Depends(get_db)
):
    return create_ticket(db, data)


@router.get("/", response_model=list[TicketResponse])
def read_all(
    search: str = None,
    status: str = None,
    priority: str = None,
    sort: str = "created_at",
    order: str = "desc",
    page: int = 1,
    size: int = 10,
    db: Session = Depends(get_db)
):
    skip = (page - 1) * size

    return get_tickets(
        db=db,
        search=search,
        status=status,
        priority=priority,
        sort=sort,
        order=order,
        skip=skip,
        limit=size
    )


@router.patch("/{ticket_id}",
              response_model=TicketResponse)
def change_status(
    ticket_id: int,
    data: TicketUpdateStatus,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    ticket = get_ticket(db, ticket_id)

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    if ticket.status == "done":
        raise HTTPException(
            status_code=400,
            detail="Done ticket cannot be modified"
        )

    ticket.status = data.status

    db.commit()

    db.refresh(ticket)

    return ticket


@router.delete("/{ticket_id}")
def remove(
    ticket_id: int,
    db: Session = Depends(get_db),
    user=Depends(admin_required)
):

    ticket = get_ticket(db, ticket_id)

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    if ticket.status == "done":
        raise HTTPException(
            status_code=400,
            detail="Done ticket cannot be deleted"
        )

    delete_ticket(db, ticket)

    return {
        "message": "Ticket deleted"
    }