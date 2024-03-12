window.addEventListener("load", onStart)

function onStart() {
    if (localStorage.getItem("userName")) {
        document.getElementById("shopUser").innerHTML = localStorage.getItem("userName");
    }
    addEvents()
    getProducts()

}

function addEvents() {
    document.getElementById("byBrand").addEventListener("click", (() => filterProducts('brand')))
    document.getElementById("byCollection").addEventListener("click", (() => filterProducts('collection')))
    document.getElementById("byStyle").addEventListener("click", (() => filterProducts('style')))
}


let currentProduct;
function displayProducts(products) {
    let productsDiv = document.getElementById("products");
    for (let product of products){
        productsDiv.insertAdjacentHTML('beforeend',
            '<div id="product" class="p-5 h-80 w-60 m-10 flex flex-col items-center justify-between items-center text-center">' +
            '        <img id="product-img" class="w-32 h-1/2" src="' + product.image + '" alt="product-image">\n' +
            '        <div id="product-name" class="text-xl">' + product.title + '</div>' +
            '        <div id="product-price" class="">$' + product.price + '</div>' +
            '        <button id="notifications" type="button" onclick="notifications(\'' + product.title + '\')"><span class="material-symbols-outlined">notifications</span></button>' +
            '        <button id="add-to-cart-button" type="button" class="w-full h-16 bg-blue-400 px-4 py-2 text-sm hover:bg-blue-500 font-medium hover:font-bold hover:transition" onmouseenter="currentProduct = ' + product + '">ADD TO CART</button>\n' +
            '     </div>');
    }
}

function notifications(productName) {
    alert("You will now receive updates for " + productName + "!")
}

// Api call

const fakeStoreApiUrl = 'https://fakestoreapi.com/products'

let products;
async function getProducts() {

    fetch(fakeStoreApiUrl)
        .then(res=>res.json())
        .then(json=> {
            console.log(json)
            products = json
            displayProducts(products)
        });
}

