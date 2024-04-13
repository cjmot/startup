import React from 'react';
import './app.css';

export default function App() {
    return (
        <>
            <div className="overflow-hidden flex flex-col m-0 h-screen font-sans text-gray-700">
            <header className="relative flex-none h-20 max-w-full flex flex-col justify-center items-center m-4">
                <div id="shopNotifications" className="overflow-y-auto h-full absolute top-0 left-0 w-1/4"></div>
                <img src="../images/kingslandlogo_wordmark-blue.png" alt="../images/favicon.ico" className="w-52"/>
                <nav id="navbar" className="self-end flex-none flex flex-row items-center space-x-4 text-xl">
                    <a className="flex items-center" href="shop.html">
                        <span className="material-symbols-outlined">shopping_bag</span>
                    </a>
                    <a className="flex items-center relative" href="cart.html">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span id="shopCartLogoBadge" className="text-sm flex w-5 h-5 p-2 bg-red-400 justify-center items-center rounded-full absolute top-1/2 -right-2"></span>
                    </a>
                    <a className="flex items-center" href="profile.html">
                        <span className="material-symbols-outlined">person</span>
                        <span id="shopUser" className="text-sm font-semibold text-center"></span>
                    </a>
                </nav>

            </header>
            <hr/>

            <main>App components go here</main>

            <hr/>
            <footer className="h-16 flex-none flex flex-row justify-center space-x-4 items-center">
                <a className="hover:underline hover: underline-offset-4 font-medium" href="about.html">About</a>
                <a className="hover:underline hover: underline-offset-4 font-medium"
                   href="https://github.com/cjmot/startup">GitHub</a>
            </footer>
            </div>
        </>
    );
}