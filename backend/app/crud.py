from sqlalchemy import case, or_
from sqlalchemy.orm import Session

from .models import Ticket


def create_ticket(db: Session, data):
    ticket = Ticket(
        title=data.title,
        description=data.description,
        priority=data.priority.value
    )

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return ticket


def get_ticket(db: Session, ticket_id: int):

    return db.query(Ticket).filter(
        Ticket.id == ticket_id
    ).first()


def delete_ticket(db: Session, ticket):

    db.delete(ticket)
    db.commit()


def get_tickets(
        db: Session,
        search=None,
        status=None,
        priority=None,
        sort="created_at",
        order="desc",
        skip=0,
        limit=10
):

    query = db.query(Ticket)

    if search:
        query = query.filter(
            or_(
                Ticket.title.ilike(f"%{search}%"),
                Ticket.description.ilike(f"%{search}%")
            )
        )

    if status:
        query = query.filter(
            Ticket.status == status
        )

    if priority:
        query = query.filter(
            Ticket.priority == priority
        )

    total = query.count()

    priority_order = case(
        (Ticket.priority == "low", 1),
        (Ticket.priority == "normal", 2),
        (Ticket.priority == "high", 3),
        else_=4
    )

    if sort == "priority":
        column = priority_order
    else:
        column = Ticket.created_at

    if order == "asc":
        query = query.order_by(column.asc())
    else:
        query = query.order_by(column.desc())

    items = query.offset(skip).limit(limit).all()

    return {
        "items": items,
        "total": total
    }