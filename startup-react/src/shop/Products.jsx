import React, { useState, useEffect } from 'react';
import Product from './Product';
import getProducts from './getProducts';

export default function Products({ loggedIn, setCartLength }) {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await getProducts();
                setProducts(response);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <>
            {isLoading && <main><p>Loading ...</p></main>}
            {!isLoading && products.map(product => (
                <Product
                    key={product.id}
                    title={product.title}
                    image={product.image}
                    cost={product.price}
                    products={products}
                    loggedIn={loggedIn}
                    setCartLength={setCartLength}
                />
            ))}
        </>
    );
}