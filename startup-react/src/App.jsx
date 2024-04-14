import React, { useState, useEffect } from 'react';
import {BrowserRouter, NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import { Login } from "./login/Login";
import { About } from "./about/About";
import { CreateAccount } from "./createAccount/CreateAccount";
import { Cart } from "./cart/Cart";
import { Shop } from "./shop/Shop";
import { Profile } from "./profile/Profile";
import { Checkout } from "./checkout/Checkout";
import './App.css';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const setAuthState = (username) => {
        setUserName(username);
        setLoggedIn(true);
    };

    return (
        <BrowserRouter>
            <div className="overflow-hidden flex flex-col m-0 h-screen font-sans text-gray-700">
                <header className="relative flex-none h-20 max-w-full flex flex-col justify-center items-center m-4">
                    <img src="../images/kingslandlogo_wordmark-blue.png" alt="../images/favicon.ico" className="w-52"/>
                    <nav id="navbar" className="self-end flex-none flex flex-row items-center space-x-4 text-xl">
                        <NavLink className="flex items-center" to="/shop">
                            <span className="material-symbols-outlined">shopping_bag</span>
                        </NavLink>
                        <NavLink className="flex items-center relative" to="/cart">
                            <span className="material-symbols-outlined">shopping_cart</span>
                            <span id="shopCartLogoBadge"
                                  className="text-sm flex w-5 h-5 p-2 bg-red-400 justify-center items-center rounded-full absolute top-1/2 -right-2"></span>
                        </NavLink>
                        <NavLink className="flex items-center" to="/profile">
                            <span className="material-symbols-outlined">person</span>
                            <span id="shopUser" className="text-sm font-semibold text-center">{userName}</span>
                        </NavLink>
                    </nav>
                </header>
                <hr/>

                <main className='flex flex-col h-full justify-center items-center'>
                    <Routes>
                        <Route path='/' element={<Login setUserName={(userName) => setUserName(userName)} setLoggedIn={() => setLoggedIn(true)} />}/>
                        <Route path='/create_account' element={<CreateAccount/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/cart' element={<Cart/>}/>
                        <Route path='/checkout' element={<Checkout/>}/>
                        <Route path='/shop' element={<Shop/>}/>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='*' element={<NotFound/>}/>
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
    return <main className='justify-center items-center h-full flex flex-col'>404: Return to sender. Address
        unknown</main>
}