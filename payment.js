let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalAmount = 0;

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

function displayCart() {
    cartItems.innerHTML = "";
    totalAmount = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>No items in cart.</p>";
        totalPrice.innerText = "$0.00";
        return;
    }

    cart.forEach(product => {
        let itemPrice = parseFloat(product.price.toString().replace("$", "")) * product.quantity;
        totalAmount += itemPrice;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${product.img}" alt="${product.name}">
                    <span>${product.name} (x${product.quantity})</span>
                </div>
                <span>$${itemPrice.toFixed(2)}</span>
            </div>
        `;
    });

    totalPrice.innerText = `$${totalAmount.toFixed(2)}`;
}

function applyCoupon() {
    const coupon = document.getElementById("coupon").value;
    if (coupon === "SAVE10") {
        totalAmount *= 0.9; 
        totalPrice.innerText = `$${totalAmount.toFixed(2)}`;
        alert("Coupon Applied! You got 10% off.");
    } else {
        alert("Invalid Coupon Code.");
    }
}

function selectPayment(method) {
    document.querySelectorAll(".payment-method input").forEach(input => input.checked = false);
    document.getElementById(method).checked = true;
}

function confirmOrder() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert("Please select a payment method.");
        return;
    }

    alert("Order Placed Successfully!");
    localStorage.removeItem("cart"); 
    window.location.href = "product.html"; 
}

displayCart();


function confirmOrder() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert("Please select a payment method.");
        return;
    }

  
    setTimeout(() => {
        localStorage.removeItem("cart"); 
        window.location.href = "confirmation.html"; 
    }, 500); 
}
function initiateRazorpayPayment() {
    let options = {
        "key": "rzp_test_ydiELHN8Rr1UJ0", 
        "amount": totalAmount * 100, 
        "currency": "INR",
        "name": "Dress E-Commerce",
        "description": "Order Payment",
        "image": "your_logo_url", 
        "handler": function (response) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            localStorage.removeItem("cart");
            window.location.href = "confirmation.html"; 
        },
        "prefill": {
            "name": "Customer Name",
            "email": "customer@example.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#ff6b81"
        }
    };

    let razorpay = new Razorpay(options);
    razorpay.open();
}
function confirmOrder() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert("Please select a payment method.");
        return;
    }

    if (selectedPayment.id === "upi" || selectedPayment.id === "card" || selectedPayment.id === "netbanking") {
        initiateRazorpayPayment();
    } else {
        alert("Order Placed Successfully! Cash on Delivery selected.");
        localStorage.removeItem("cart");
        window.location.href = "confirmation.html";
    }
}



