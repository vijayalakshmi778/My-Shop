// Product data

const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 29999
    },

    {
        id: 2,
        name: "Laptop",
        price: 59999
    },

    {
        id: 3,
        name: "Headphones",
        price: 2999
    },

    {
        id: 4,
        name: "Smart Watch",
        price: 4999
    }
];


// Load cart from localStorage

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Add product to cart

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    displayCart();

    alert(product.name + " added to cart!");
}


// Display cart

function displayCart() {

    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty-cart">Your cart is empty.</p>`;

        updateSummary();

        return;
    }


    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>₹${item.price.toLocaleString()}</p>

            </div>


            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${item.id})">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${item.id})">
                    +
                </button>

            </div>


            <strong>
                ₹${(item.price * item.quantity).toLocaleString()}
            </strong>


            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">

                Remove

            </button>
        `;

        cartItems.appendChild(cartItem);

    });


    updateSummary();
}


// Increase quantity

function increaseQuantity(productId) {

    const item = cart.find(
        item => item.id === productId
    );

    if (item) {
        item.quantity++;
    }

    saveCart();

    displayCart();
}


// Decrease quantity

function decreaseQuantity(productId) {

    const item = cart.find(
        item => item.id === productId
    );

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {

            cart = cart.filter(
                item => item.id !== productId
            );

        }

    }

    saveCart();

    displayCart();
}


// Remove item

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    displayCart();
}


// Update cart summary

function updateSummary() {

    let subtotal = 0;

    let totalItems = 0;


    cart.forEach(item => {

        subtotal += item.price * item.quantity;

        totalItems += item.quantity;

    });


    // Free shipping above ₹1000

    let shipping = 0;

    if (subtotal > 0 && subtotal < 1000) {

        shipping = 100;

    }


    const total = subtotal + shipping;


    document.getElementById("subtotal").textContent =
        "₹" + subtotal.toLocaleString();


    document.getElementById("shipping").textContent =
        "₹" + shipping.toLocaleString();


    document.getElementById("total").textContent =
        "₹" + total.toLocaleString();


    document.getElementById("cart-count").textContent =
        totalItems;

}


// Save cart

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// Checkout

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });


    alert(
        "Order placed successfully! 🎉\n\n" +
        "Total Amount: ₹" +
        total.toLocaleString()
    );


    cart = [];

    saveCart();

    displayCart();
}


// Display cart when page loads

displayCart();