window.addEventListener("load", onStart)
let email;
let loggedIn = false;
let cartItems;

function onStart() {
    email = localStorage.getItem("userName");
    if (email) {
        loggedIn = true;
        document.getElementById("checkoutUser").innerHTML = localStorage.getItem("userName");
    }
    getCart(email);
}

async function getCart(email) {
    try {
        const response = await fetch(`/api/cartItems?email=${email}`);
        if (!response.ok){
            console.error('Failed to fetch products');
            return [];
        }
        cartItems = await response.json();
        if (cartItems.length > 0) {
            loadCart(cartItems);
            setSubtotal(cartItems);
        } else {
            alert("No more items in cart, taking you back to the shop")
            window.location.href = 'cart.html';
        }
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}

function loadCart(cartItems) {

    const cartDiv = document.getElementById('checkoutCart');
    cartDiv.innerHTML = '';
    document.getElementById("checkoutCartTitle").innerText = `Cart (${cartItems.length})`


    for (const product of cartItems) {
        cartDiv.insertAdjacentHTML('beforeend',
            '<div id="product" class=" min-w-32 m-4 flex flex-row">' +
                '   <img id="product-img" class="h-28 min-w-24 border-2" width="24" src="' + product.image + '" alt="product-image">' +
                '   <div class="flex flex-col justify-between px-4">' +
                '      <div id="product-name" class="text-lg">' + product.title + '</div>' +
                '      <div id="product-price" class="text-sm">$' + product.price + '</div>' +
                '      <button id="removeItemButton" data-product="' + product.id + '" onclick="deleteCartItem(this.dataset.product)" class="w-40 justify-self-end h-8 bg-blue-400 px-4 py-2 text-xs hover:bg-blue-500 font-medium hover:font-bold hover:transition">REMOVE FROM CART</button>' +
                '   </div>' +
                '</div>' +
                '<hr />'
        )
    }
}

async function deleteCartItem(itemId) {
    try {
        const response = await fetch(`/api/cartItems/deleteCartItem?email=${email}&id=${itemId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log(`Item was removed from your cart, cart:`, response);
            alert("Item was successfully deleted from cart");
            onStart();
        } else {
            console.error('Failed to delete item from cart');
        }
    } catch (error) {
        console.error('Error deleting item from cart:', error);
    }
}

function setSubtotal(cartItems) {
    const subtotalEl = document.getElementById("checkoutSubtotal");
    let subtotal = 0;
    for (let item of cartItems) {
        subtotal += item.price;
    }
    const result = Math.round(subtotal*100)/100
    subtotalEl.innerText = "Subtotal: $" + result.toString();
}