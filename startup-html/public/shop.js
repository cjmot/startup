window.addEventListener("load", onStart)


let products = [];


function onStart() {
    if (localStorage.getItem("userName")) {
        document.getElementById("shopUser").innerHTML = localStorage.getItem("userName");
    }
    // addEvents()
    getProducts().then(products => displayProducts(products));

}

// function addEvents() {
//     document.getElementById("byBrand").addEventListener("click", (() => filterProducts('brand')))
//     document.getElementById("byCollection").addEventListener("click", (() => filterProducts('collection')))
//     document.getElementById("byStyle").addEventListener("click", (() => filterProducts('style')))
// }

function displayProducts(products) {
    let productsDiv = document.getElementById("products");
    for (let product of products){
        productsDiv.insertAdjacentHTML('beforeend',
            `<div id="${product.title}" class="p-5 h-80 w-60 m-10 flex flex-col items-center justify-between items-center text-center">
                    <img id="product-img" class="w-32 h-1/2" src="${product.image}" alt="product-image">
                    <div id="product-name" class="text-xl">${product.title}</div>
                    <div id="product-price" class="">$${product.price}</div>
                    <button id="notifications" type="button" onclick="notifications('${product.title}')"><span class="material-symbols-outlined">notifications</span></button>
                    <button id="add-to-cart-button" type="button" class="w-full h-16 bg-blue-400 px-4 py-2 text-sm hover:bg-blue-500 font-medium hover:font-bold hover:transition" 
                    data-product="${product.title}" onclick="addToCart(this.dataset.product)">ADD TO CART</button>
                 </div>`);
    }

}

function notifications(productName) {
    alert("You will now receive updates for " + productName + "!")
}

// Api calls

const fakeStoreApiUrl = 'https://fakestoreapi.com/products'

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
        // Handle error
        return [];
    }
}


async function addToCart(productTitle) {
    let product = findProduct(productTitle)
    console.log(product)
    try {
        const response = await fetch('api/cartItem', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            console.log('Failed to add item to cart');
        }
        const data = await response.json();
        console.log('Item added to cart:', data);
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
}

function findProduct(productTitle) {
    return products.find(product => product.title === productTitle);
}

