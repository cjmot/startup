class Product {
    constructor(
        name='',
        type='all',
        collection='all',
        brand='all',
        description ='',
        price='',
        image='',

    ) {
        this.name = name;
        this.type = type;
        this.collection = collection;
        this.description = description;
        this.brand = brand;
        this.price = price;
        this.image = image;
    }
}


function onStart() {

    if (localStorage.getItem("userName")) {
        document.getElementById("shopUser").innerHTML = localStorage.getItem("userName");
    }

    addEvents()
    displayProducts()

}

window.addEventListener("load", onStart)

function addEvents() {
    document.getElementById("byBrand").addEventListener("click", (() => filterProducts('brand')))
    document.getElementById("byCollection").addEventListener("click", (() => filterProducts('collection')))
    document.getElementById("byStyle").addEventListener("click", (() => filterProducts('style')))
}

// database call goes here
let products = [
    new Product('Shirt1', 'shirt', '1', 'nike', '', '$12', '//img.ltwebstatic.com/images3_pi/2021/12/10/16391012757378a5e668f4378f9907939fab3eb501_thumbnail_900x.jpg'),
    new Product('Shirt2', 'shirt', '2', 'nike', '', '$32', '//img.ltwebstatic.com/images3_pi/2021/12/10/16391012757378a5e668f4378f9907939fab3eb501_thumbnail_900x.jpg'),
    new Product('Pants1', 'pants', '1', 'adidas', '', '$127', 'images/kingslandlogo_wordmark-blue.png'),
    new Product('Pants2', 'pants', '2', 'adidas', '', '$2', 'images/kingslandlogo_wordmark-blue.png'),
    new Product('Shoes1', 'shoe', '23', 'madeWell', '', '$645', 'images/kingslandlogo_wordmark-blue.png'),
];

let currentProduct = null;

function filterProducts(filter){
    if (filter === 'brand'){
        products.sort((p1, p2) => p1.brand - p2.brand)
    } else if (filter === 'collection'){
        products.sort((p1, p2) => p1.collection - p2.collection)
    } else if (filter === 'style'){
        products.sort((p1, p2) => p1.type - p2.type)
    }
    displayProducts()
}
function displayProducts() {
    for (let product of products){
        document.getElementById("products").insertAdjacentHTML('beforeend',
            '<div id="product" class="p-5 min-h-72 min-w-40 m-12 flex flex-col items-center justify-between">' +
            '        <img id="product-img" class="h-1/2 min-w-32 place-self-center border-2" width="32" src="' + product.image + '" alt="product-image">\n' +
            '        <div id="product-name" class="text-xl">' + product.name + '</div>' +
            '        <div id="product-price" class="">' + product.price + '</div>' +
            '        <button id="add-to-cart-button" type="button" class="w-full h-1/5 bg-blue-400 px-4 py-2 text-sm hover:bg-blue-500 font-medium hover:font-bold hover:transition" onmouseenter="currentProduct = ' + product.name + '">ADD TO CART</button>\n' +
            '     </div>')
    }
}