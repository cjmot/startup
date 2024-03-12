window.addEventListener("load", onStart)
let loggedIn = false;

let cartItems;

function onStart() {

    if (localStorage.getItem("userName")) {
        loggedIn = true;
        document.getElementById("cartUser").innerHTML = localStorage.getItem("userName");
    }
    getCart();
}

async function getCart() {
    try {
        const response = await fetch('/api/cartItems');
        if (!response.ok){
            console.error('Failed to fetch products');
        }
        cartItems = await response.json();
        if (cartItems.length > 0) {
            console.log(cartItems)
            loadCart(cartItems);
            setSubtotal();
        } else {document.getElementById("cart").innerHTML = "<hr /><div id=\"noItemsMessage\" class=\"text-3xl font-semibold pt-10\">No Items in Cart</div>"}
    } catch (error) {
        console.error(error);
    }
}

function loadCart(cartItems) {

    let cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    if (cartItems.length > 0) {
        document.getElementById("cartTitle").innerText = `Cart (${cartItems.length})`
        for (const product of cartItems) {
            cartDiv.insertAdjacentHTML('beforeend',
                '<div id="product" class=" min-w-40 m-5 flex flex-row">' +
                '       <img id="product-img" class="h-32 min-w-32 border-2" width="32" src="' + product.image + '" alt="product-image">' +
                '       <div class="flex flex-col justify-between px-4">' +
                '          <div id="product-name" class="text-xl">' + product.title + '</div>' +
                '          <div id="product-price" class="">$' + product.price + '</div>' +
                '          <button id="removeItemButton" data-product="' + product.id + '" onclick="deleteCartItem(this.dataset.product)" class="w-52 justify-self-end h-10 bg-blue-400 px-4 py-2 text-sm hover:bg-blue-500 font-medium hover:font-bold hover:transition">REMOVE FROM CART</button>' +
                '       </div>' +
                '     </div>' +
                '     <hr />'
            )
        }
    } else {

    }
}

function setSubtotal() {
    let subtotal = 0;
    for (let item of cartItems) {
        subtotal += item.price;
    }
    document.getElementById("subtotal").innerText = "Subtotal: $" + subtotal.toString();
}

async function deleteCartItem(itemId) {
    try {
        const response = await fetch(`/api/cartItems/delete/${itemId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error('Failed to delete item from cart');
            return;
        }
        alert('Item was removed from your cart');
        onStart();
    } catch (error) {
        console.error('Error deleting item from cart:', error);
    }
}

