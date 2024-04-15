import React from 'react';

export function Cart() {
    return (
        <main className="overflow-y-auto overflow-x-hidden flex-auto h-auto w-full flex flex-col">
            <div id="cartTitle" className="self-center text-4xl font-medium m-5">Cart</div>
            <hr/>
            <section
                className="overflow-y-auto overflow-x-hidden w-full h-full flex-1 min-w-fit flex flex-row justify-between">
                <div id="cart" className="overflow-y-auto overflow-x-hidden flex-1 w-full h-full ml-5 flex flex-col">
                    <hr/>
                    <div id="noItemsMessage" className="text-3xl font-semibold pt-10">No Items in Cart</div>
                </div>


                <div className="justify-self-end w-52 h-15 m-5 flex flex-col">
                    <div id="subtotal" className="pb-4 self-start text-xl" hidden></div>
                    <button id="checkoutButton"
                            className=" w-48 h-12 self-center font-medium bg-blue-400 hover:bg-blue-500 hover:font-bold transition"
                            type="button" onClick="navigateToCheckout()" hidden>Checkout
                    </button>
                </div>
            </section>
        </main>
    );
}