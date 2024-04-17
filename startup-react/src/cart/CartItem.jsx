import React from 'react';

export default function CartItem(props) {
    async function handleDeleteItem() {
        await props.onDelete(props.item.id);
        alert('Item was removed successfully.');
    }

    return (
        <div id="product" className="min-w-40 m-5 flex flex-row">
            <img id="product-img" className="h-32 min-w-32 border-2" width="32" src={props.item.image} alt="product-image"/>
            <div className="flex flex-col justify-between px-4">
                <div id="product-name" className="text-xl">{props.item.title}</div>
                <div id="product-price" className="">${props.item.price.toFixed(2)}</div>
                <button id="removeItemButton" onClick={handleDeleteItem} className="w-52 justify-self-end h-10 bg-blue-400 px-4 py-2 text-sm hover:bg-blue-500 font-medium hover:font-bold hover:transition">REMOVE FROM CART</button>
            </div>
        </div>
    );
}
