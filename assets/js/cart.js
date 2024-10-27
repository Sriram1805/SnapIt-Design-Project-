// Menu Page: Add items to the cart
document.querySelectorAll('.dish-add-btn').forEach(button => {
    button.addEventListener('click', function () {
        const itemID = this.getAttribute('data-item-id');
        const itemName = this.closest('.dish-box').querySelector('.h3-title').innerText;
        const itemPrice = parseFloat(this.closest('.dist-bottom-row').querySelector('b').innerText.replace('Rs.', '').trim());
        
        // Retrieve cart items from local storage or initialize an empty array
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Check if the item already exists in the cart
        const existingItem = cartItems.find(item => item.id === itemID);
        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity if it exists
        } else {
            // Add new item to cart
            cartItems.push({
                id: itemID,
                name: itemName,
                price: itemPrice,
                quantity: 1
            });
        }

        // Update cart in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert(`${itemName} added to cart!`);

        // Update cart number display
        updateCartNumber(cartItems.length);
    });
});

// Function to update the cart number
function updateCartNumber(itemCount) {
    document.querySelector('.cart-number').innerText = itemCount;
}

// Function to open the cart page
document.getElementById('cart-open').addEventListener('click', function () {
    document.querySelector('.cart').style.display = 'block'; // Show the cart page
    loadCart(); // Load cart items when the cart is opened
});

// Close the cart when the close button is clicked
document.getElementById('cart-close').addEventListener('click', function () {
    document.querySelector('.cart').style.display = 'none'; // Hide the cart
});

// Cart Page: Load and display items in the cart
function loadCart() {
    const cartContainer = document.querySelector('.cart .col-md-12');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartContainer.innerHTML = ''; // Clear previous items

    // Check if cart items exist
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        calculateTotal(); // Reset total calculations
        return; // Exit the function if there are no items
    }

    // Iterate over each item in the cart and create HTML structure
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <div class="row">
                <div class="col-md-7 center-item">
                    <h5>${item.name} (Rs. ${item.price})</h5>
                </div>
                <div class="col-md-5 center-item">
                    <div class="input-group number-spinner">
                        <button onclick="updateQuantity('${item.id}', -1)" class="btn btn-default"><i class="fas fa-minus"></i></button>
                        <input type="number" value="${item.quantity}" class="form-control text-center" readonly>
                        <button onclick="updateQuantity('${item.id}', 1)" class="btn btn-default"><i class="fas fa-plus"></i></button>
                    </div>
                    <h5>Rs. <span>${item.price * item.quantity}</span></h5>
                    <button class="btn btn-custom" onclick="removeItem('${item.id}')">Remove</button>
                </div>
            </div>
        `;
        
        cartContainer.appendChild(itemElement);
    });

    calculateTotal(); // Update total calculations
}

// Load cart items and initialize the cart number on page load
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartNumber(cartItems.length); // Initialize cart count
});

// Update quantity of items in the cart
function updateQuantity(itemID, change) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const item = cartItems.find(item => item.id === itemID);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) cartItems = cartItems.filter(i => i.id !== itemID);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCart(); // Refresh cart display
        updateCartNumber(cartItems.length); // Update cart count
    }
}

// Calculate and display total, tax, and subtotal in the cart
function calculateTotal() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let subTotal = 0;

    cartItems.forEach(item => {
        subTotal += item.price * item.quantity;
    });

    const tax = subTotal / 10;
    const totalPrice = subTotal + tax;

    document.getElementById('sub-total').innerText = subTotal.toFixed(2);
    document.getElementById('tax-amount').innerText = tax.toFixed(2);
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Remove an item from the cart
function removeItem(itemID) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== itemID);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCart(); // Refresh cart display
    updateCartNumber(cartItems.length); // Update cart count
}

// Function to handle the checkout process
function checkout() {
    alert('Proceeding to checkout...');
    // You can add further checkout logic here, like redirecting to a payment page
}
