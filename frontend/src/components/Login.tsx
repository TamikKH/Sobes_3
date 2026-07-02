import { useState } from "react";
import api from "../api";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    async function login() {

        try {
            const response = await api.post(
                "/login",
                {
                    username,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            alert("Успешный вход");

        } catch {

            alert("Неверный логин или пароль");

        }

    }

    return (

        <div>

            <h3>Вход администратора</h3>

            <input
                placeholder="Логин"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={login}>
                Войти
            </button>
        </div>
    );
}