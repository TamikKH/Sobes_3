import {useEffect, useState} from "react";

import api from "./api";

import Login from "./components/Login";
import CreateTicket from "./components/CreateTicket";
import TicketList from "./components/TicketList";

import {Ticket} from "./types";

function App() {

    const [tickets, setTickets] = useState<Ticket[]>([]);

    async function loadTickets(){

        const response = await api.get("/tickets");

        setTickets(response.data);
    }

    useEffect(() => {

        loadTickets();

    }, []);

    return (

        <div style={{padding:30}}>

            <h1>Ticket System</h1>

            <Login/>

            <CreateTicket reload={loadTickets}/>

            <TicketList
                tickets={tickets}
                reload={loadTickets}
            />

        </div>

    );

}

export default App;