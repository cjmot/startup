export async function getCartItems(email) {
    try {
        const response = await fetch(`/api/cartItems?email=${email}`);
        if (!response.ok) {
            console.error('Failed to fetch cart items');
            return [];
        }
        const cartItems = await response.json();
        if (cartItems.length > 0){
            updateCartDependable(cartItems.length);
        }
    } catch (error) {
        console.error("Error getting cart items", error);
    }
}

function updateCartDependable(cartItemsLength) {
    const cartLogoBadgeEl = document.querySelector("#aboutCartLogoBadge");
    cartLogoBadgeEl.innerText = cartItemsLength.toString();
}