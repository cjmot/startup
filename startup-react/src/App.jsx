import './App.css';
import React, { useState } from 'react';
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom';

import { Login } from "./login/Login";
import { About } from "./about/About";
import { CreateAccount } from "./createAccount/CreateAccount";
import { Cart } from "./cart/Cart";
import { Shop } from "./shop/Shop";
import { Profile } from "./profile/Profile";
import { Checkout } from "./checkout/Checkout";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("userName"));
    const [userName, setUserName] = useState(localStorage.getItem("userName") || '');
    const [cartLength, setCartLength] = useState(0);

    function handleLogin(userName) {
        setUserName(userName);
        setLoggedIn(true);
    }
    function updateCartLength(length) {
        if (length !== cartLength) {
            setCartLength(length);
        }
    }
    function handleLogout() {
        setUserName('');
        setLoggedIn(false);
    }

    return (
        <BrowserRouter>
            <div className="overflow-hidden flex flex-col m-0 h-screen font-sans text-gray-700">
                <header className="relative flex-none h-20 max-w-full flex flex-col justify-center items-center m-4">
                    <div id="shopNotifications" className="overflow-y-auto h-full absolute top-0 left-0 w-1/4"></div>
                    <img src="../images/kingslandlogo_wordmark-blue.png" alt="../images/favicon.ico" className="w-52"/>
                    <nav id="navbar" className="self-end flex-none flex flex-row items-center space-x-4 text-xl">

                        {loggedIn &&
                            <>
                                <NavLink className="flex items-center" to="/shop">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                </NavLink>
                                <NavLink className="flex items-center relative disabled:text-gray-400" to="/cart">
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    {cartLength > 0 &&
                                        <span id="shopCartLogoBadge"
                                              className="text-sm flex w-5 h-5 p-2 bg-red-400 justify-center items-center rounded-full absolute top-1/2 -right-2"
                                        >{cartLength}</span>}
                                </NavLink>
                                <NavLink className="flex items-center" to="/profile">
                                    <span className="material-symbols-outlined">person</span>
                                    <span id="shopUser" className="text-sm font-semibold text-center">{userName}</span>
                                </NavLink>
                            </>
                        }

                    </nav>
                </header>
                <hr/>

                <main className='flex overflow-hidden flex-col h-full' >
                    <Routes>
                        <Route path='/' element={<Login onAuthChange={handleLogin} />}/>
                        <Route path='/login' element={<Login onAuthChange={handleLogin} />}/>
                        <Route path='/create_account' element={<CreateAccount loggedIn={loggedIn} />}/>
                        <Route path='/about' element={<About loggedIn={loggedIn} />}/>
                        <Route path='/cart' element={<Cart loggedIn={loggedIn} setCartLength={updateCartLength} cartLength={cartLength}/>}/>
                        <Route path='/checkout' element={<Checkout loggedIn={loggedIn} setCartLength={updateCartLength} cartLength={cartLength} />}/>
                        <Route path='/shop' element={<Shop loggedIn={loggedIn} setUserName={() => setUserName} setCartLength={updateCartLength} cartLength={cartLength}/>}/>
                        <Route path='/profile' element={<Profile loggedIn={loggedIn} onLogout={handleLogout}/>}/>
                        <Route path='*' element={<NotFound loggedIn={loggedIn} />}/>
                    </Routes>
                </main>

                <hr/>
                <footer className="h-16 justify-self-end flex-none flex flex-row justify-center space-x-4 items-center">
                    <NavLink className="hover:underline hover: underline-offset-4 font-medium"
                             to="about">About</NavLink>
                    <a className="hover:underline hover: underline-offset-4 font-medium"
                       href="https://github.com/cjmot/startup">GitHub</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}


function NotFound() {
    return <main className='justify-center items-center h-full flex flex-col'>404: Return to sender. Address unknown</main>
}