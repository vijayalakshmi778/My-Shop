/* =====================================================
   MY SHOP - CART JAVASCRIPT
===================================================== */


/* =====================================================
   GET CART FROM LOCAL STORAGE
===================================================== */

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];



/* =====================================================
   ELEMENTS
===================================================== */

const cartItemsContainer =
    document.getElementById("cart-items");

const emptyCart =
    document.getElementById("empty-cart");

const cartCount =
    document.getElementById("cart-count");

const itemsCount =
    document.getElementById("items-count");

const subtotalElement =
    document.getElementById("subtotal");

const shippingElement =
    document.getElementById("shipping");

const discountElement =
    document.getElementById("discount");

const totalElement =
    document.getElementById("total");

const checkoutButton =
    document.getElementById("checkout-btn");

const menuToggle =
    document.getElementById("menu-toggle");

const navLinks =
    document.querySelector(".nav-links");



/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}



/* =====================================================
   DISPLAY CART
===================================================== */

function displayCart() {

    cartItemsContainer.innerHTML = "";


    /* Empty cart */

    if (cart.length === 0) {

        emptyCart.style.display = "block";

        updateSummary();

        return;

    }


    emptyCart.style.display = "none";


    /* Display every product */

    cart.forEach((item, index) => {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="item-image">
                ${item.image || "🛍️"}
            </div>


            <div class="item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Quality product from My Shop
                </p>

                <div class="item-price">
                    ₹${Number(item.price).toLocaleString("en-IN")}
                </div>

            </div>


            <div class="item-actions">

                <div class="quantity-control">

                    <button
                        onclick="decreaseQuantity(${index})">

                        −

                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">

                        +

                    </button>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        `;


        cartItemsContainer.appendChild(
            cartItem
        );

    });


    updateSummary();

}



/* =====================================================
   INCREASE QUANTITY
===================================================== */

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    displayCart();

}



/* =====================================================
   DECREASE QUANTITY
===================================================== */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

    displayCart();

}



/* =====================================================
   REMOVE PRODUCT
===================================================== */

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}



/* =====================================================
   UPDATE ORDER SUMMARY
===================================================== */

function updateSummary() {

    let subtotal = 0;

    let totalItems = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

        totalItems +=
            Number(item.quantity);

    });


    /* -----------------------------------------------
       SHIPPING

       Free shipping for orders above ₹1000.
       ₹50 shipping below ₹1000.
    ------------------------------------------------ */

    let shipping = 0;

    if (
        subtotal > 0 &&
        subtotal < 1000
    ) {

        shipping = 50;

    }


    /* -----------------------------------------------
       DISCOUNT

       ₹100 discount for orders above ₹2000.
    ------------------------------------------------ */

    let discount = 0;

    if (subtotal >= 2000) {

        discount = 100;

    }


    /* -----------------------------------------------
       FINAL TOTAL
    ------------------------------------------------ */

    const total =
        subtotal +
        shipping -
        discount;



    /* Subtotal */

    subtotalElement.textContent =
        `₹${subtotal.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2
            }
        )}`;



    /* Shipping */

    if (
        subtotal > 0 &&
        shipping === 0
    ) {

        shippingElement.textContent =
            "FREE";

    } else {

        shippingElement.textContent =
            `₹${shipping.toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2
                }
            )}`;

    }



    /* Discount */

    discountElement.textContent =
        `-₹${discount.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2
            }
        )}`;



    /* Total */

    totalElement.textContent =
        `₹${total.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2
            }
        )}`;



    /* Cart badge */

    cartCount.textContent =
        totalItems;



    /* Item count */

    itemsCount.textContent =
        `${totalItems} ${
            totalItems === 1
                ? "Item"
                : "Items"
        }`;



    /* Checkout button */

    checkoutButton.disabled =
        cart.length === 0;

}



/* =====================================================
   CHECKOUT
===================================================== */

checkoutButton.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;

        }


        const confirmOrder =
            confirm(
                "Are you sure you want to continue to checkout?"
            );


        if (confirmOrder) {

            alert(
                "🎉 Thank you for shopping with My Shop!"
            );


            /* Clear cart */

            cart = [];

            saveCart();

            displayCart();

        }

    }
);



/* =====================================================
   MOBILE NAVIGATION
===================================================== */

menuToggle.addEventListener(
    "click",
    function () {

        navLinks.classList.toggle(
            "show"
        );

    }
);



/* =====================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
===================================================== */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove(
                    "show"
                );

            }
        );

    });



/* =====================================================
   INITIALIZE
===================================================== */

displayCart();

