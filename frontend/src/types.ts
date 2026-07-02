export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: "new" | "in_progress" | "done";
    priority: "low" | "normal" | "high";
    created_at: string;
    updated_at: string;
}

export interface TicketResponse {
    items: Ticket[];
    total: number;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}