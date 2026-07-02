import { useState } from "react";
import api from "../api";

interface Props{
    reload:()=>void;
}

export default function CreateTicket({reload}:Props){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [priority,setPriority]=useState("normal");
    async function create(){

        try{

            await api.post(
                "/tickets",
                {
                    title,
                    description,
                    priority
                }
            );

            setTitle("");
            setDescription("");
            setPriority("normal");
            reload();
        }

        catch (error: any) {
    console.log(error);

    alert(
        error.response?.data?.detail ||
        error.message ||
        "Ошибка создания заявки"
    );
}
    }

    return(

        <div>

            <h3>Создать заявку</h3>

            <input
                placeholder="Название"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />

            <br/>

            <textarea
                placeholder="Описание"
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
                Создать
            </button>
        </div>
    );
}