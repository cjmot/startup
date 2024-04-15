import React from 'react';
import Product from './Product';
import getProducts from './getProducts';

export default function Products(props) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [productComponents, setProductComponents] = React.useState([]);
    const [products, setProducts] = React.useState([]);


    React.useEffect(() => {

        getProducts()
            .then(response => {
                let productProps = []
                setProducts(response);
                for (let item of response) {
                    productProps.push({ id: item.id, title: item.title, image: item.image, cost: item.price });
                }
                setProductComponents(productProps)
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, [])


    return (
        <>
            {isLoading && <main><p>Loading ...</p></main>}
            {productComponents &&
                productComponents.map(
                    (item) =>
                        <Product
                            key={item.id}
                            title={item.title}
                            image={item.image}
                            cost={item.cost}
                            loggedIn={props.loggedIn}
                            products={products}
                            setCartLength={props.setCartLength}
                        />
                )
            }
        </>
    )
}