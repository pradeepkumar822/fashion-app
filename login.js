function validateLogin() {
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var passwordError = document.getElementById("password-error");

    if (name === "" || email === "" || password === "") {
        alert("All fields are required!");
        return;
    }

    if (password.length < 6) {
        passwordError.style.display = "block"; 
        return;
    } else {
        passwordError.style.display = "none"; 
    }

    
    setTimeout(() => {
        alert("Login Successful!");
        localStorage.setItem("loggedIn", "true"); 
        window.location.href = "product.html"; 
    }, 1000); 
}

// Validate Signup
function validateSignup() {
    var name = document.getElementById("signup-name").value.trim();
    var email = document.getElementById("signup-email").value.trim();
    var password = document.getElementById("signup-password").value.trim();
    var confirmPassword = document.getElementById("confirm-password").value.trim();
    var passwordError = document.getElementById("signup-password-error");

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("All fields are required!");
        return;
    }

    if (password.length < 6 || password !== confirmPassword) {
        passwordError.style.display = "block";
        return;
    } else {
        passwordError.style.display = "none";
    }

    alert("Signup Successful!");
    window.location.href = "product.html"; // Redirect to product page after signup
}

