const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".login"),
formContainer = document.querySelector(".form_container"),
formCloseBtn = document.querySelector(".form_close"),
signupBtn = document.querySelector("#signup"),
loginBtn = document.querySelector("#login"),
loginFormBtn = document.querySelector(".login_form .button"), // Login button inside login form
signupFormBtn = document.querySelector(".signup_form .button"), // Signup button inside signup form
pwShowHide = document.querySelectorAll(".pw_hide");

// Open Form Modal
formOpenBtn?.addEventListener("click", () => home.classList.add("show"));

// Close Form Modal
formCloseBtn?.addEventListener("click", () => home.classList.remove("show"));

// Toggle Password Visibility
pwShowHide.forEach(icon => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

// Toggle to Signup Form
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active"); // Show signup form
});

// Toggle to Login Form
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active"); // Show login form
});

// Close Modal on Login Button Click
loginFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    home.classList.remove("show"); // Close modal
    // Add any additional login functionality here if needed
});

// Close Modal on Signup Button Click
signupFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    home.classList.remove("show"); // Close modal
    // Add any additional signup functionality here if needed
});
