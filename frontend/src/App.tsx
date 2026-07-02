import React, { useEffect, useState } from "react";
import "./App.css";

import api from "./api";

import { Ticket, TicketResponse } from "./types";

import Login from "./components/Login";
import CreateTicket from "./components/CreateTicket";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import TicketList from "./components/TicketList";
import Pagination from "./components/Pagination";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Empty from "./components/Empty";

export default function App() {

    const [tickets, setTickets] = useState<Ticket[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [priority, setPriority] = useState("");

    const [sort, setSort] = useState("created_at");

    const [order, setOrder] = useState("desc");

    const [page, setPage] = useState(1);

    const size = 10;

    const [total, setTotal] = useState(0);

    async function loadTickets() {

        setLoading(true);

        try {

            const response = await api.get<TicketResponse>(
                "/tickets",
                {
                    params: {
                        search,
                        status,
                        priority,
                        sort,
                        order,
                        page,
                        size
                    }
                }
            );

            setTickets(response.data.items);

            setTotal(response.data.total);

            setError("");

        } catch {

            setError("Cannot load tickets");

        }

        setLoading(false);

    }

    useEffect(() => {

        loadTickets();

    }, [
        search,
        status,
        priority,
        sort,
        order,
        page
    ]);

    return (

        <div className="container">

            <h1>Ticket System</h1>

            <Login />

            <hr />

            <CreateTicket reload={loadTickets} />

            <hr />

            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            <Filters
                status={status}
                setStatus={setStatus}
                priority={priority}
                setPriority={setPriority}
                sort={sort}
                setSort={setSort}
                order={order}
                setOrder={setOrder}
            />

            {loading && <Loading />}

            {error && <Error message={error} />}

            {!loading &&
                !error &&
                tickets.length === 0 &&
                <Empty />
            }

            {!loading &&
                !error &&
                tickets.length > 0 &&
                <>
                    <TicketList
                        tickets={tickets}
                        reload={loadTickets}
                    />

                    <Pagination
                        page={page}
                        size={size}
                        total={total}
                        setPage={setPage}
                    />
                </>
            }

        </div>

    );

}