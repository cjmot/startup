import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getCartItems from '../getCartItems';
import CartItem from './CartItem';
import deleteCartItem from './deleteCartItem';

export function Cart(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [isEmpty, setIsEmpty] = useState(false);

    async function fetchCartItems() {
        const email = localStorage.getItem('userName');
        try {
            const items = await getCartItems(email);
            setCartItems(items);
            const total = items.reduce((acc, item) => acc + item.price, 0);
            setSubtotal(total);
            setIsEmpty(items.length === 0);
            if (props.cartLength !== items.length) {props.setCartLength(items.length);}
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCartItems().catch(console.error);
    }, [props.cartLength]); // Assuming cartLength is updated elsewhere when items are added or removed

    async function handleDeleteItem(itemId) {
        const updatedCart = await deleteCartItem(itemId);
        if (updatedCart) {
            setCartItems(updatedCart);
            props.setCartLength(updatedCart.length);
            console.log(props.cartLength);
            if (updatedCart.length === 0) {
                setIsEmpty(true);
            }
            fetchCartItems().catch(console.error);
        } else {
            // Handle deletion failure
            console.error("Failed to delete item from cart.");
        }
    }

    function handleCheckout() {
        navigate('/checkout');
    }

    return (
        <main className="overflow-y-auto overflow-x-hidden flex-auto h-auto w-full flex flex-col">
            <div id="cartTitle" className="self-center text-4xl font-medium m-5">Cart</div>
            <hr/>
            <section className="overflow-y-auto overflow-x-hidden w-full h-full flex-1 min-w-fit flex flex-row justify-between">
                <div id="cart" className="overflow-y-auto overflow-x-hidden flex-1 w-full h-full ml-5 flex flex-col">
                    {isEmpty && <div id="noItemsMessage" className="text-3xl font-semibold pt-10">No Items in Cart</div>}
                    {isLoading && <main><p>Loading ...</p></main>}
                    {!isEmpty && !isLoading && cartItems.map((item, i) => (
                        <CartItem
                            key={i}
                            item={item}
                            onDelete={handleDeleteItem} // Pass the delete handler
                        />
                    ))}
                    <hr/>
                </div>
                <div className="justify-self-end w-52 h-15 m-5 flex flex-col">
                    <div id="subtotal" className="pb-4 self-center text-xl" hidden={isEmpty}>Subtotal: ${subtotal.toFixed(2)}</div>
                    <button id="checkoutButton" className="w-48 h-12 self-center font-medium bg-blue-400 hover:bg-blue-500 hover:font-bold transition" type="button" onClick={handleCheckout} hidden={isEmpty}>Checkout</button>
                </div>
            </section>
        </main>
    );
}
