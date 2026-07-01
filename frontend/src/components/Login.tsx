import {useState} from "react";

import api from "../api";

export default function Login(){

    const [username,setUsername]=useState("");

    const [password,setPassword]=useState("");

    async function login(){

        try{

            const response=await api.post("/login",{

                username,
                password

            });

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            alert("Login successful");

        }

        catch{

            alert("Invalid login");

        }

    }

    return(

        <div>

            <h2>Admin Login</h2>

            <input
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={login}>
                Login
            </button>

        </div>

    );

}