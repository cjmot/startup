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
            document.getElementById("noItemsMessage").hidden = true;
            loadCart(cartItems);
            setSubtotal();
        }
    } catch (error) {
        console.error(error);
    }
}

function loadCart(cartItems) {
    document.getElementById("cartTitle").innerText = `Cart (${cartItems.length})`

    let cartDiv = document.getElementById('cart');
    for (const product of cartItems){
        cartDiv.insertAdjacentHTML('beforeend',
            '<div id="product" class=" min-w-40 m-5 flex flex-row">' +
            '       <img id="product-img" class="h-32 min-w-32 border-2" width="32" src="' + product.image + '" alt="product-image">' +
            '           <div class="flex flex-col px-4">' +
            '              <div id="product-name" class="text-xl pb-4">' + product.title + '</div>' +
            '              <div id="product-price" class="">$' + product.price + '</div>' +
            '           </div>' +
            '     </div>' +
            '     <hr />'
            )
    }
}

function setSubtotal() {
    let subtotal = 0;
    for (let item of cartItems) {
        subtotal += item.price;
    }
    document.getElementById("subtotal").innerText = "Subtotal: $" + subtotal.toString();
}
