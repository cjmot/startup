import React from 'react';
import addToCart from './addToCart';

export default function Product({ title, image, cost, loggedIn, setCartLength, products }) {
    async function addToCartHandler() {
        if (loggedIn) {
            try {
                console.log('Adding to cart');
                const updatedCart = await addToCart(title, products);
                if (updatedCart && updatedCart.length > 0) {
                    setCartLength(updatedCart.length);
                    console.log('Added to cart');
                    alert("Item added to cart");
                } else {
                    console.error('Product.jsx.addToCartHandler: error with addToCart');
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        } else {
            alert(`Button will function upon login`)
        }
    }


    return (
        <div
            id={title}
            className="border-2 rounded-lg flex-none h-50 w-60 m-5 p-5 flex flex-col items-center justify-between space-y-2 text-center"
        >
            <div id="imgContainer">
                <img id="product-img" className="h-32" src={image} alt="product-image" />
            </div>
            <div id="nameContainer" className="relative h-14 w-full flex flex-col justify-center">
                <div id="product-name" className="text-xl font-semibold h-full line-clamp-2">{title}</div>
            </div>
            <div id="product-price">${cost.toFixed(2)}</div>
            <button
                id="add-to-cart-button"
                type="button"
                className="flex-none w-full h-12 bg-blue-400 px-4 py-2 text-sm hover:bg-blue-500 font-medium hover:font-bold hover:transition hover:cursor-pointer"
                onClick={addToCartHandler}
            >
                ADD TO CART
            </button>
        </div>
    );
}