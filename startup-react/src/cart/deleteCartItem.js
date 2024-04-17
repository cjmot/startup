export default async function deleteCartItem(itemId) {
    const email = localStorage.getItem("userName");
    console.log(email)
    try {
        const response = await fetch(`/api/cartItems/deleteCartItem?email=${email}&id=${String(itemId)}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error("Failed to delete item from cart");
            return [];
        }
        const cart = await response.json();
        console.log('deleteCartItem: response = ', cart)
        return cart;

    } catch (error) {
        console.error('Error deleting item from cart:', error);
    }
}