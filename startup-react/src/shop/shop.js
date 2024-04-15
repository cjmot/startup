window.addEventListener("load", onStart)

const email = localStorage.getItem("userName");
let products = [];
let cartItems = [];
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);


async function onStart() {
    await getProducts();
    displayProducts(products);
    if (localStorage.getItem("userName")) {
        document.getElementById("shopUser").innerHTML = email;
        document.querySelectorAll("#add-to-cart-button").forEach((button) => {
            button.disabled = false;
        })
        configureWebSocket();
        getCartItems();
    } else {
        addToCartAlert();
    }
}

async function getCartItems() {
    try {
        const response = await fetch(`/api/cartItems?email=${email}`);
        if (!response.ok) {
            console.error('Failed to fetch cart items');
            return [];
        }
        cartItems = await response.json();
        if (cartItems.length > 0){
            updateCartDependable();
        }
    } catch (error) {
        console.error("Error getting cart items", error);
    }
}

function addToCartAlert() {
    alert("Add to cart buttons will function upon login");
}


function displayProducts(products) {
    let productsDiv = document.getElementById("products");
    for (let product of products){
        productsDiv.insertAdjacentHTML('beforeend',
            `<div id="${product.title}" class=" border-2 rounded-lg flex-none h-50 w-60 m-5 p-5 flex flex-col items-center justify-between space-y-2 text-center">
                    <div id="imgContainer" class=""><img id="product-img" class=" h-32" src="${product.image}" alt="product-image"></div>
                    <div id="nameContainer" class="relative h-14 w-full flex flex-col justify-center">
                        <div id="product-name" class=" text-xl font-semibold h-full line-clamp-2">${product.title}</div>                    
                    </div>
                    <div id="product-price" class="">$${product.price.toFixed(2)}</div>
                    <button id="add-to-cart-button" type="button" class="flex-none w-full h-12 bg-blue-400 px-4 py-2 text-sm hover:bg-blue-500 font-medium hover:font-bold hover:transition" 
                    data-product="${product.title}" onclick="addToCart(this.dataset.product)" disabled>ADD TO CART</button>
                 </div>`);

    }

}

// Api calls

const fakeStoreApiUrl = 'https://fakestoreapi.com/products';

async function getProducts() {
    try {
        const response = await fetch(fakeStoreApiUrl);
        if (!response.ok){
            console.error('Failed to fetch products');
        }
        const json = await response.json();
        products = json;
        return json;
    } catch (error) {
        console.error(error);
        return [];
    }
}


async function addToCart(productTitle) {
    const originalProduct = findProduct(productTitle);
    const product = {...originalProduct, email: email}
    try {
        const response = await fetch('api/cartItem', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            console.log('Failed to add item to cart');
        } else {
            console.log('Item added to cart:', product);
            alert(`Item added to cart: ${product.title}`);
            updateCartDependable();
            broadcastEvent(email, product.title);
        }

    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
}

function findProduct(productTitle) {
    return products.find(product => product.title === productTitle);
}

function updateCartDependable() {
    getCartItems()
    const cartLogoBadgeEl = document.querySelector("#shopCartLogoBadge");
    cartLogoBadgeEl.innerText = cartItems.length.toString();
}

function configureWebSocket() {
    socket.onopen = (event) => {
        displayMsg('system', 'shop', 'connected');
    };
    socket.onclose = (event) => {
        displayMsg('system', 'shop', 'disconnected');
    };
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
            displayMsg('user', msg.from, `added ${msg.value}`);

    };
}

function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#shopNotifications');
    chatText.insertAdjacentHTML('afterbegin',
        `<div id="${cls}" class="relative font-semibold text-xs overflow-y-auto">
                <span class="font-bold ">${from}</span> ${msg}
            </div>`
    )
}



function broadcastEvent(from, value) {
    const event = {
        from: from,
        value: value,
    };
    socket.send(JSON.stringify(event));
}
