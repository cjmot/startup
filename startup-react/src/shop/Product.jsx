import React from 'react';
import addToCart from "./addToCart";

export default function Product( props ) {
    async function addToCartHandler(){
        addToCart(props.title, props.products)
            .then((products) => {
                console.log(products);
                props.setCartLength(products.length);
            });
    }



    return (
        <>
            <div
                id={props.title}
                className="border-2 rounded-lg flex-none h-50 w-60 m-5 p-5 flex flex-col items-center justify-between space-y-2 text-center">
                <div id="imgContainer">
                    <img
                        id="product-img"
                        className=" h-32"
                        src={props.image}
                        alt="product-image"/>
                </div>
                <div id="nameContainer" className="relative h-14 w-full flex flex-col justify-center">
                    <div id="product-name" className=" text-xl font-semibold h-full line-clamp-2">{props.title}</div>
                </div>
                <div id="product-price">${props.cost.toFixed(2)}</div>
                <button id="add-to-cart-button" type="button"
                        className="flex-none w-full h-12 bg-blue-400 px-4 py-2 text-sm hover:bg-blue-500 font-medium hover:font-bold hover:transition hover:cursor-pointer"
                        onClick={() => addToCartHandler()}
                        disabled={!props.loggedIn}>ADD TO CART
                </button>
            </div>
        </>

    )
}