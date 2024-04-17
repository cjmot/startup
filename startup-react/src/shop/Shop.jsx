import React, { useEffect } from 'react';
import Products from './Products';
import getCartItems from '../getCartItems';

export function Shop(props) {
    const [prevCartLength, setPrevCartLength] = React.useState(0);

    async function fetchCartItems() {
        const email = localStorage.getItem('userName');
        try {
            const items = await getCartItems(email);
            if (prevCartLength !== items.length) {
                props.setCartLength(items.length);
                setPrevCartLength(items.length);
                console.log('fetchCartItems called, cart:', items);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    useEffect(() => {
        fetchCartItems().catch(console.error);
    }, [props.cartLength]);

    return (
        <main className="overflow-y-auto flex-none h-full flex flex-col">
            <div className="text-5xl self-center pt-5 font-medium font-serif">Kingsland Store</div>
            <p className="text-xl self-center"></p>
            <section className="overflow-y-auto flex-1 h-full w-screen min-w-fit max-w-4 flex flex-row">
                <div id="products" className="overflow-y-auto max-h-full mt-4 flex flex-row flex-wrap justify-center">
                    <Products loggedIn={props.loggedIn} setCartLength={props.setCartLength} />
                </div>
            </section>
        </main>
    );
}