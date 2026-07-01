import api from "../api";

import {Ticket} from "../types";

interface Props{

    tickets:Ticket[];

    reload:()=>void;

}

export default function TicketList({

    tickets,

    reload

}:Props){

    async function changeStatus(

        id:number,

        status:string

    ){

        await api.patch(

            `/tickets/${id}`,

            {status}

        );

        reload();

    }

    async function remove(id:number){

        await api.delete(`/tickets/${id}`);

        reload();

    }

    return(

        <div>

            <h2>Tickets</h2>

            <table border={1}>

                <thead>

                <tr>

                    <th>Title</th>

                    <th>Status</th>

                    <th>Priority</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    tickets.map(ticket=>(

                        <tr key={ticket.id}>

                            <td>{ticket.title}</td>

                            <td>{ticket.status}</td>

                            <td>{ticket.priority}</td>

                            <td>

                                <button
                                    onClick={()=>changeStatus(
                                        ticket.id,
                                        "in_progress"
                                    )}
                                >
                                    In Progress
                                </button>

                                <button
                                    onClick={()=>changeStatus(
                                        ticket.id,
                                        "done"
                                    )}
                                >
                                    Done
                                </button>

                                <button
                                    onClick={()=>remove(ticket.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </div>

    );

}