import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "./loginUser";
import {Shop} from "../shop/Shop";

export function Login({ setUserName, setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const email = localStorage.getItem('userName');
    React.useEffect(() => {
        if (email) {
            setLoggedIn();
            setUserName(email);
            navigate('/shop');
        }
    })

    async function handleLogin() {
        const response = loginUser(username, password);
        if (response) {
            const email = localStorage.getItem('userName');
            setLoggedIn();
            setUserName(email);
            navigate('/shop');
        } else {
            // Handle login failure (e.g., display error message)
            alert('Login failed. Please check your credentials and try again.');
        }
    }

    return (
        <main className="flex-1 h-screen flex flex-col justify-center items-center">
            <div className="flex-none h-1/3 w-1/3 min-w-60 max-w-96 flex flex-col">
                <h3 className="self-center text-4xl font-semibold mb-2">LOGIN</h3>
                <hr/>
                <form className="mt-5 flex flex-col space-y-1">
                    <label htmlFor="name"></label>
                    <input
                        className="border-2 text-center w-full h-10 font-medium focus:placeholder-transparent"
                        type="text"
                        id="name"
                        placeholder="Username/Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password"></label>
                    <input
                        className="border-2 text-center w-full h-10 font-medium focus:placeholder-transparent"
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        className="w-full text-center h-12 bg-blue-400 font-medium font-sans"
                        type="button"
                        onClick={() => handleLogin()}
                    >
                        LOGIN
                    </button>
                </form>
                <div className="flex flex-row justify-between mt-3" id="extra-buttons">
                    <NavLink className="text-base hover:underline hover:underline-offset-4" to='/create_account'>
                        Create Account
                    </NavLink>
                    <NavLink className="text-base hover:underline hover:underline-offset-4" to='/shop'>
                        Skip Login
                    </NavLink>
                </div>
            </div>
        </main>
    );
}
