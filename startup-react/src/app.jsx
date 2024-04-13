import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from "./login/login";
import { About } from "./about/about";
import { CreateAccount } from "./createAccount/createAccount";
import { Cart } from "./cart/cart";
import { Shop } from "./shop/shop";
import { Profile } from "./profile/profile";
import {Checkout} from "./checkout/checkout";


export default function App() {
    return (
        <BrowserRouter>
            <div className="overflow-hidden flex flex-col m-0 h-screen font-sans text-gray-700">
                <header className="relative flex-none h-20 max-w-full flex flex-col justify-center items-center m-4">
                    <div id="shopNotifications" className="overflow-y-auto h-full absolute top-0 left-0 w-1/4"></div>
                    <img src="../images/kingslandlogo_wordmark-blue.png" alt="../images/favicon.ico" className="w-52"/>
                    <nav id="navbar" className="self-end flex-none flex flex-row items-center space-x-4 text-xl">
                        <NavLink className="flex items-center" to="shop">
                            <span className="material-symbols-outlined">shopping_bag</span>
                        </NavLink>
                        <NavLink className="flex items-center relative" to="cart">
                            <span className="material-symbols-outlined">shopping_cart</span>
                            <span id="shopCartLogoBadge"
                                  className="text-sm flex w-5 h-5 p-2 bg-red-400 justify-center items-center rounded-full absolute top-1/2 -right-2"></span>
                        </NavLink>
                        <NavLink className="flex items-center" to="profile">
                            <span className="material-symbols-outlined">person</span>
                            <span id="shopUser" className="text-sm font-semibold text-center"></span>
                        </NavLink>
                    </nav>
                </header>
                <hr />

                <main className='flex flex-col h-full justify-center items-center'>
                    <Routes>
                        <Route path='/' element={<Login/>} exact/>
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
    return <main className='justify-center items-center h-full flex flex-col'>404: Return to sender. Address unknown</main>
}