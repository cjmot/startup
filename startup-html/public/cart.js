window.addEventListener("load", onStart)
let email;
let loggedIn = false;

function onStart() {
    email = localStorage.getItem("userName");
    if (email) {
        loggedIn = true;
        document.getElementById("cartUser").innerHTML = localStorage.getItem("userName");
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
        const cartItems = await response.json();
        console.log(cartItems);
        console.log(email);
        if (cartItems.length > 0) {
            loadCart(cartItems);
            setSubtotal(cartItems);
        } else {
            document.getElementById("cart").innerHTML = "<hr /><div id=\"noItemsMessage\" class=\"text-3xl font-semibold pt-10\">No Items in Cart</div>";
            document.getElementById("cartTitle").innerText = `Cart`;
            document.getElementById("subtotal").innerHTML = 'Subtotal: ---';
        }
    } catch (error) {
        console.error('Error fetching cart items:', error);
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
        document.getElementById("cartTitle").innerText = `Cart`
    }
}

function setSubtotal(cartItems) {
    let subtotal = 0;
    for (let item of cartItems) {
        subtotal += item.price;
    }
    document.getElementById("subtotal").innerText = "Subtotal: $" + subtotal.toString();
}

async function deleteCartItem(itemId) {
    try {
        const response = await fetch(`/api/cartItems/deleteCartItem?email=${email}&id=${itemId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('Item was removed from your cart');
            onStart();
        } else {
            console.error('Failed to delete item from cart');
        }
    } catch (error) {
        console.error('Error deleting item from cart:', error);
    }
}

