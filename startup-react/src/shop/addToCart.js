export default async function addToCart(productTitle, products) {
    const originalProduct = products.find(product => product.title === productTitle);
    const product = {...originalProduct, email: localStorage.getItem('userName')}
    try {
        const response = await fetch('api/cartItem', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            alert('Failed to add item to cart')
            return [];
        } else {
            return await response.json();
            // broadcastEvent(email, product.title);}
        }

    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
}
