let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

function updateCart() {
    cartItems.innerHTML = "";
    let totalAmount = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p style='text-align: center;'>Your cart is empty.</p>";
        totalPriceElement.innerText = "$0.00";
        return;
    }

    cart.forEach((product, index) => {
        let itemPrice = parseFloat(product.price.replace("$", "")) * product.quantity;
        totalAmount += itemPrice;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${product.img}" alt="${product.name}">
                    <div class="cart-item-details">
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                    </div>
                </div>
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                    <span id="quantity-${index}" style="margin: 0 10px;">${product.quantity}</span>
                    <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
                <p id="price-${index}">$${itemPrice.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeItem(${index})">🗑️</button>
            </div>
        `;
    });

    totalPriceElement.innerText = `$${totalAmount.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQuantity(index, change) {
    if (cart[index].quantity + change >= 1) {
        cart[index].quantity += change;
        updateCart();
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        window.location.href = "checkout.html";
    }
}

// Initialize cart with default quantity 1 if not set
cart.forEach(product => {
    if (!product.quantity) product.quantity = 1;
});

updateCart();