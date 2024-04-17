import React from 'react';
import getCartItems from "../getCartItems";

export function Checkout(props) {

    async function fetchCartItems() {
        const email = localStorage.getItem('userName');
        if (props.loggedIn) {
            try {
                const items = await getCartItems(email);
                if (items.length) {
                    props.setCartLength(items.length);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }
    }

    React.useEffect(() => {
        fetchCartItems().catch(console.error);
    }, [props.cartLength]);

    return (
        <main className="flex-auto h-screen flex flex-col justify-center p-20">
            <div className="flex flex-col justify-center items-center">
                <div className="flex-none text-4xl">Checkout</div>
                <hr/>
                <div className="mt-4 max-w-4xl">
                    Thank you for checking out! Unfortunately, this is not a real website, and as much as I'd
                    love to take all of your information, I have decided to be a nice person and not do that.
                    Regardless, thank you for taking the time to "check-out" (lol) this website and the hours
                    upon hours upon hours upon endless hours I put into making shopkingsland.click what it is
                    today. Until next time!
                </div>
            </div>
        </main>
    );
}