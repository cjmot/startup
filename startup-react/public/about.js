window.addEventListener("load", onStart);

const email = localStorage.getItem("userName");

function onStart() {
    if (email) {
        document.getElementById("aboutUser").innerHTML = email;
        getCartItems()
    } else {
        console.log("Not logged in");
    }
}

async function getCartItems() {
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
