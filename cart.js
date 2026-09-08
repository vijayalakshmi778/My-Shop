/* =========================================================
   MY SHOP - CART PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cartItems = document.getElementById("cart-items");
    const emptyCart = document.getElementById("empty-cart");

    const subtotalElement = document.getElementById("subtotal");
    const shippingElement = document.getElementById("shipping");
    const discountElement = document.getElementById("discount");
    const totalElement = document.getElementById("total");

    const checkoutButton = document.getElementById("checkout-btn");

    const cartCountElements =
        document.querySelectorAll(".cart-count");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    /* =====================================================
       GET CART
    ===================================================== */

    let cart =
        JSON.parse(localStorage.getItem("myShopCart")) || [];


    /* =====================================================
       SAVE CART
    ===================================================== */

    function saveCart() {

        localStorage.setItem(
            "myShopCart",
            JSON.stringify(cart)
        );

    }


    /* =====================================================
       UPDATE CART COUNT
    ===================================================== */

    function updateCartCount() {

        const totalQuantity = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCountElements.forEach(element => {

            element.textContent = totalQuantity;

        });

    }


    /* =====================================================
       RENDER CART
    ===================================================== */

    function renderCart() {

        cartItems.innerHTML = "";


        /* EMPTY CART */

        if (cart.length === 0) {

            emptyCart.style.display = "block";

            updateSummary();

            return;

        }


        emptyCart.style.display = "none";


        /* CREATE CART ITEMS */

        cart.forEach(item => {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div class="cart-product">

                    <div class="cart-product-image">
                        ${item.emoji}
                    </div>

                    <div class="cart-product-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ₹${item.price.toLocaleString("en-IN")}
                        </p>

                    </div>

                </div>


                <div class="quantity-control">

                    <button
                        class="quantity-btn decrease-btn"
                        data-id="${item.id}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-btn increase-btn"
                        data-id="${item.id}">
                        +
                    </button>

                </div>


                <div class="cart-item-price">

                    <strong>
                        ₹${(
                            item.price * item.quantity
                        ).toLocaleString("en-IN")}
                    </strong>

                </div>


                <button
                    class="remove-btn"
                    data-id="${item.id}">
                    🗑️
                </button>

            `;


            cartItems.appendChild(cartItem);

        });


        updateSummary();

        addCartEvents();

    }


    /* =====================================================
       CART BUTTON EVENTS
    ===================================================== */

    function addCartEvents() {

        /* INCREASE */

        document
            .querySelectorAll(".increase-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(button.dataset.id);

                        const item =
                            cart.find(
                                product =>
                                    product.id === id
                            );

                        if (item) {

                            item.quantity++;

                        }

                        saveCart();

                        renderCart();

                        updateCartCount();

                    }
                );

            });


        /* DECREASE */

        document
            .querySelectorAll(".decrease-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(button.dataset.id);

                        const item =
                            cart.find(
                                product =>
                                    product.id === id
                            );

                        if (item) {

                            item.quantity--;

                            if (item.quantity <= 0) {

                                cart =
                                    cart.filter(
                                        product =>
                                            product.id !== id
                                    );

                            }

                        }

                        saveCart();

                        renderCart();

                        updateCartCount();

                    }
                );

            });


        /* REMOVE */

        document
            .querySelectorAll(".remove-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(button.dataset.id);

                        cart =
                            cart.filter(
                                product =>
                                    product.id !== id
                            );

                        saveCart();

                        renderCart();

                        updateCartCount();

                    }
                );

            });

    }


    /* =====================================================
       ORDER SUMMARY
    ===================================================== */

    function updateSummary() {

        const subtotal = cart.reduce(
            (total, item) =>
                total + (item.price * item.quantity),
            0
        );


        /* SHIPPING */

        let shipping = 0;

        if (subtotal > 0 && subtotal < 1000) {

            shipping = 50;

        }


        /* DISCOUNT */

        let discount = 0;

        if (subtotal >= 2000) {

            discount = 100;

        }


        /* TOTAL */

        const total =
            subtotal + shipping - discount;


        subtotalElement.textContent =
            `₹${subtotal.toLocaleString("en-IN")}`;


        shippingElement.textContent =
            shipping === 0
                ? "FREE"
                : `₹${shipping.toLocaleString("en-IN")}`;


        discountElement.textContent =
            discount === 0
                ? "₹0"
                : `-₹${discount.toLocaleString("en-IN")}`;


        totalElement.textContent =
            `₹${total.toLocaleString("en-IN")}`;

    }


    /* =====================================================
       CHECKOUT
    ===================================================== */

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    alert("Your cart is empty!");

                    return;

                }


                alert(
                    "Order placed successfully! 🎉"
                );


                cart = [];

                saveCart();

                renderCart();

                updateCartCount();

            }
        );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle("open");

                menuToggle.textContent =
                    navLinks.classList.contains("open")
                        ? "✕"
                        : "☰";

            }
        );


        document
            .querySelectorAll(".nav-links a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove("open");

                        menuToggle.textContent = "☰";

                    }
                );

            });

    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    updateCartCount();

    renderCart();

});