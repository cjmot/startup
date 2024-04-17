export default async function getCartItems(email) {
    try {
        const response = await fetch(`/api/cartItems?email=${email}`);
        if (!response.ok) {
            console.error('Failed to fetch cart items');
            return [];
        }
        const cartItems = await response.json();
        if (cartItems.length > 0){
            return cartItems;
        } else {
            console.log(cartItems)
            return [];
        }
    } catch (error) {
        console.error("Error getting cart items", error);
    }
}
