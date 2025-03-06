
const products = [
    { id: 1, name: "Men's T-Shirt", price: "$20", img: "p_img41.png", category: "men" },
    { id: 2, name: "Men's Shirt", price: "$40", img: "p_img39.png", category: "men" },
    { id: 3, name: "Men's Jacket", price: "$50", img: "p_img45.png", category: "men" },
    { id: 4, name: "Men's Jeans", price: "$30", img: "p_img7.png", category: "men" },
    { id: 5, name: "Men's Cargo", price: "$70", img: "p_img10.png", category: "men" },
    
    { id: 6, name: "Women's Dress", price: "$35", img: "p_img1.png", category: "women" },
    { id: 7, name: "Women's Jeans", price: "$45", img: "p_img43.png", category: "women" },
    { id: 8, name: "Women's Jacket", price: "$55", img: "p_img44.png", category: "women" },
    { id: 9, name: "Women's Skirt", price: "$25", img: "p_img37.png", category: "women" },
    { id: 10, name: "Women's T-shirt", price: "$15", img: "p_img5.png", category: "women" },

    // Shoes
    { id: 11, name: "Men's Shoes", price: "$50", img: "p_img76.png", category: "shoes" },
    { id: 12, name: "Men's Sneakers", price: "$55", img: "p_img75.png", category: "shoes" },

    // Watches
    { id: 13, name: "Men's Luxury Watch", price: "$120", img: "p_img73.png", category: "watches" },
    { id: 14, name: "Men's Designer Watch", price: "$110", img: "p_img74.png", category: "watches" }
];



let cart = [];

function displayProducts(category = "all") {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    const filteredProducts = category === "all" ? products : products.filter(p => p.category === category);

    filteredProducts.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
            </div>
        `;
    });
}


function filterProducts(category) {
    displayProducts(category);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.name + " added to cart!");
}

function goToCart() {
    window.location.href = "cart.html";
}
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(product.name + " added to cart!");
}

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}


window.onload = function () {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();
};

displayProducts();

function toggleSearch() {
    let searchBox = document.getElementById("search-box");
    searchBox.classList.toggle("visible");
    searchBox.focus();
}

function searchProducts() {
    let query = document.getElementById("search-box").value.toLowerCase();
    let filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (filteredProducts.length === 0) {
        productList.innerHTML = "<p>No matching products found.</p>";
        return;
    }

    filteredProducts.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

