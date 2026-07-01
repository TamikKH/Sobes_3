import {useState} from "react";

import api from "../api";

interface Props{

    reload:()=>void;

}

export default function CreateTicket({reload}:Props){

    const [title,setTitle]=useState("");

    const [description,setDescription]=useState("");

    const [priority,setPriority]=useState("normal");

    async function create(){

        await api.post("/tickets",{

            title,

            description,

            priority

        });

        setTitle("");

        setDescription("");

        reload();

    }

    return(

        <div>

            <h2>Create Ticket</h2>

            <input
                placeholder="Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />

            <br/>

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
            />

            <br/>

            <select
                value={priority}
                onChange={(e)=>setPriority(e.target.value)}
            >

                <option value="low">Low</option>

                <option value="normal">Normal</option>

                <option value="high">High</option>

            </select>

            <button onClick={create}>
                Create
            </button>

        </div>

    );

}