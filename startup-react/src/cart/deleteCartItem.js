export default async function deleteCartItem(itemId) {
    const email = localStorage.getItem("userName");
    try {
        const response = await fetch(`/api/cartItems/deleteCartItem?email=${email}&id=${String(itemId)}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error("Failed to delete item from cart");
            return [];
        }
        return await response.json();

    } catch (error) {
        console.error('Error deleting item from cart:', error);
    }
}