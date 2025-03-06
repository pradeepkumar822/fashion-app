let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
let totalAmount = 0;

function displayCart() {
    cartItems.innerHTML = "";
    totalAmount = 0;
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.innerText = "$0.00";
        return;
    }
    cart.forEach(product => {
        let itemPrice = parseFloat(product.price.replace("$", "")) * product.quantity;
        totalAmount += itemPrice;
        cartItems.innerHTML += `
            <div class="order-item">
                <img src="${product.img}" alt="${product.name}">
                <span>${product.name} (x${product.quantity})</span>
                <span>$${itemPrice.toFixed(2)}</span>
            </div>
        `;
    });
    totalPriceElement.innerText = `$${totalAmount.toFixed(2)}`;
}

function validateAddress() {
    let door = document.getElementById("door").value.trim();
    let street = document.getElementById("street").value.trim();
    let district = document.getElementById("district").value.trim();
    let pincode = document.getElementById("pincode").value.trim();
    if (!door || !street || !district || !pincode) {
        alert("Please fill in all required address fields.");
        return false;
    }
    localStorage.setItem("address", `${door}, ${street}, ${district}, ${pincode}`);
    return true;
}

function goToPayment() {
    if (!validateAddress()) return;
    window.location.href = "payment.html";
}

displayCart();
