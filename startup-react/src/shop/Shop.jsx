import React from 'react';
import Products from './Products'

export function Shop( props ) {

    return (
        <main className="overflow-y-auto flex-none h-full flex flex-col">
            <div className="text-5xl self-center pt-5 font-medium font-serif">Kingsland Store</div>
            <p className="text-xl self-center"></p>
            <section className="overflow-y-auto flex-1 h-full w-screen min-w-fit max-w-4 flex flex-row">
                <div id="product-tabs" className="flex-none w-56 pl-10 pt-20 flex flex-col">
                    <div id="byCollection"
                         className="my-5 hover:underline hover:underline-offset-4 font-medium hover:cursor-pointer">BY
                        COLLECTION
                    </div>
                    <hr/>
                    <div id="byBrand"
                         className="my-5 hover:underline hover:underline-offset-4 font-medium hover:cursor-pointer">BY
                        BRAND
                    </div>
                    <hr/>
                    <div id="byStyle"
                         className="my-5 hover:underline hover:underline-offset-4 font-medium hover:cursor-pointer">BY
                        STYLE
                    </div>
                    <hr/>
                </div>
                <div id="products" className="overflow-y-auto max-h-full mt-4 flex flex-row flex-wrap">
                    <Products loggedIn={props.loggedIn}/>
                </div>
            </section>
        </main>
    );
}