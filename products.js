/* =========================================================
   MY SHOP - PRODUCTS PAGE
========================================================= */


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [

    {
        id: 1,
        name: "Premium Headphones",
        category: "electronics",
        price: 2499,
        oldPrice: 3999,
        rating: 4.9,
        reviews: 128,
        badge: "BEST SELLER",
        emoji: "🎧",
        description: "Immersive sound with premium comfort."
    },

    {
        id: 2,
        name: "Smart Watch Pro",
        category: "electronics",
        price: 3499,
        oldPrice: 4999,
        rating: 4.8,
        reviews: 96,
        badge: "TRENDING",
        emoji: "⌚",
        description: "Track your day with smart technology."
    },

    {
        id: 3,
        name: "Wireless Speaker",
        category: "electronics",
        price: 1899,
        oldPrice: 2999,
        rating: 4.7,
        reviews: 74,
        badge: "POPULAR",
        emoji: "🔊",
        description: "Powerful sound in a compact design."
    },

    {
        id: 4,
        name: "Classic Sneakers",
        category: "fashion",
        price: 2299,
        oldPrice: 3499,
        rating: 4.8,
        reviews: 152,
        badge: "HOT",
        emoji: "👟",
        description: "Comfortable everyday sneakers."
    },

    {
        id: 5,
        name: "Premium Backpack",
        category: "fashion",
        price: 1599,
        oldPrice: 2499,
        rating: 4.6,
        reviews: 81,
        badge: "NEW",
        emoji: "🎒",
        description: "Stylish storage for work and travel."
    },

    {
        id: 6,
        name: "Minimal Hoodie",
        category: "fashion",
        price: 1299,
        oldPrice: 1999,
        rating: 4.7,
        reviews: 112,
        badge: "POPULAR",
        emoji: "🧥",
        description: "Soft, simple and perfect for everyday."
    },

    {
        id: 7,
        name: "Modern Table Lamp",
        category: "home",
        price: 999,
        oldPrice: 1599,
        rating: 4.5,
        reviews: 63,
        badge: "NEW",
        emoji: "💡",
        description: "Modern lighting for your workspace."
    },

    {
        id: 8,
        name: "Ceramic Coffee Mug",
        category: "home",
        price: 499,
        oldPrice: 799,
        rating: 4.6,
        reviews: 92,
        badge: "VALUE",
        emoji: "☕",
        description: "Simple ceramic mug for your daily coffee."
    },

    {
        id: 9,
        name: "Luxury Desk Setup",
        category: "home",
        price: 2799,
        oldPrice: 3999,
        rating: 4.9,
        reviews: 47,
        badge: "PREMIUM",
        emoji: "🖥️",
        description: "Upgrade your workspace with style."
    },

    {
        id: 10,
        name: "Classic Sunglasses",
        category: "accessories",
        price: 899,
        oldPrice: 1499,
        rating: 4.7,
        reviews: 136,
        badge: "HOT",
        emoji: "🕶️",
        description: "Classic style with everyday protection."
    },

    {
        id: 11,
        name: "Leather Wallet",
        category: "accessories",
        price: 799,
        oldPrice: 1299,
        rating: 4.8,
        reviews: 104,
        badge: "BEST SELLER",
        emoji: "👝",
        description: "Slim and elegant everyday wallet."
    },

    {
        id: 12,
        name: "Travel Watch",
        category: "accessories",
        price: 1999,
        oldPrice: 2999,
        rating: 4.6,
        reviews: 58,
        badge: "LIMITED",
        emoji: "⌚",
        description: "Elegant design made for every journey."
    }

];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const productsGrid =
    document.getElementById("productsGrid");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const emptyState =
    document.getElementById("emptyState");

const resetFilters =
    document.getElementById("resetFilters");

const cartCount =
    document.querySelector(".cart-count");

const toast =
    document.getElementById("toast");

const heroProductCount =
    document.getElementById("heroProductCount");

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");


/* =========================================================
   STATE
========================================================= */

let currentCategory = "all";
let searchTerm = "";


/* =========================================================
   INITIAL LOAD
========================================================= */

renderProducts(products);

updateCartCount();

if (heroProductCount) {

    heroProductCount.textContent =
        `${products.length}+`;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(productList) {

    productsGrid.innerHTML = "";

    if (productList.length === 0) {

        emptyState.classList.add("show");

        return;

    }

    emptyState.classList.remove("show");


    productList.forEach(
        (product, index) => {

            const card =
                createProductCard(product, index);

            productsGrid.appendChild(card);

        }
    );

}


/* =========================================================
   CREATE PRODUCT CARD
========================================================= */

function createProductCard(product, index) {

    const card =
        document.createElement("article");

    card.className =
        "product-card";

    card.style.animationDelay =
        `${index * 0.06}s`;


    const stars =
        createStars(product.rating);


    card.innerHTML = `

        <div class="product-image">

            <span class="product-badge">
                ${product.badge}
            </span>

            <button
                class="wishlist-btn"
                aria-label="Add to wishlist"
                data-id="${product.id}"
            >
                ♡
            </button>

            <div class="product-emoji">
                ${product.emoji}
            </div>

        </div>


        <div class="product-info">

            <span class="product-category">
                ${product.category}
            </span>

            <h3>
                ${product.name}
            </h3>

            <p class="product-description">
                ${product.description}
            </p>

            <div class="product-rating">

                <span class="stars">
                    ${stars}
                </span>

                <span class="rating-number">
                    ${product.rating}
                    (${product.reviews})
                </span>

            </div>


            <div class="product-bottom">

                <div class="product-price">

                    <strong>
                        ₹${product.price.toLocaleString("en-IN")}
                    </strong>

                    <del>
                        ₹${product.oldPrice.toLocaleString("en-IN")}
                    </del>

                </div>


                <button
                    class="add-cart-btn"
                    data-id="${product.id}"
                    aria-label="Add ${product.name} to cart"
                >
                    🛒
                </button>

            </div>

        </div>

    `;


    /* Wishlist */

    const wishlistButton =
        card.querySelector(".wishlist-btn");

    wishlistButton.addEventListener(
        "click",
        () => {

            wishlistButton.classList.toggle("liked");

            wishlistButton.textContent =
                wishlistButton.classList.contains("liked")
                    ? "♥"
                    : "♡";

        }
    );


    /* Add to cart */

    const addButton =
        card.querySelector(".add-cart-btn");

    addButton.addEventListener(
        "click",
        () => {

            addToCart(product);

            addButton.classList.add("added");

            addButton.textContent = "✓";


            setTimeout(() => {

                addButton.classList.remove("added");

                addButton.textContent = "🛒";

            }, 900);

        }
    );


    /* 3D mouse effect */

    addCardTilt(card);


    return card;
}


/* =========================================================
   STAR RATING
========================================================= */

function createStars(rating) {

    const fullStars =
        Math.floor(rating);

    let result = "";

    for (let i = 0; i < 5; i++) {

        result +=
            i < fullStars
                ? "★"
                : "☆";

    }

    return result;
}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function filterProducts() {

    let filtered =
        products.filter(product => {

            const matchesCategory =
                currentCategory === "all" ||
                product.category === currentCategory;

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                product.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            return (
                matchesCategory &&
                matchesSearch
            );

        });


    /* Sorting */

    const sortValue =
        sortSelect.value;


    if (sortValue === "low") {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sortValue === "high") {

        filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sortValue === "rating") {

        filtered.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    renderProducts(filtered);
}


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            currentCategory =
                button.dataset.category;


            filterProducts();

        }
    );

});


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    event => {

        searchTerm =
            event.target.value.trim();

        filterProducts();

    }
);


/* =========================================================
   SORT
========================================================= */

sortSelect.addEventListener(
    "change",
    filterProducts
);


/* =========================================================
   RESET FILTERS
========================================================= */

resetFilters.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        sortSelect.value =
            "default";

        currentCategory =
            "all";

        searchTerm = "";


        categoryButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.category === "all"
                );

            }
        );


        filterProducts();

    }
);


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(product) {

    let cart =
        JSON.parse(
            localStorage.getItem("myShopCart")
        ) || [];


    const existingProduct =
        cart.find(
            item =>
                item.id === product.id
        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            oldPrice: product.oldPrice,

            emoji: product.emoji,

            quantity: 1

        });

    }


    localStorage.setItem(
        "myShopCart",
        JSON.stringify(cart)
    );


    updateCartCount();

    showToast(product.name);
}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("myShopCart")
        ) || [];


    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}


/* =========================================================
   TOAST MESSAGE
========================================================= */

function showToast(productName) {

    const toastTitle =
        toast.querySelector("strong");

    const toastText =
        toast.querySelector("small");


    toastTitle.textContent =
        "Added to cart";

    toastText.textContent =
        `${productName} added successfully`;


    toast.classList.add("show");


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2200);

}


/* =========================================================
   MOBILE MENU
========================================================= */

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

                    navLinks.classList.remove(
                        "open"
                    );

                    menuToggle.textContent =
                        "☰";

                }
            );

        });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "show"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   PRODUCT CARD 3D TILT
========================================================= */

function addCardTilt(card) {

    if (window.innerWidth < 900) {
        return;
    }


    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 35;


            const rotateY =
                (centerX - x) / 35;


            card.style.transform =
                `
                translateY(-12px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.01)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;


        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 18px 45px rgba(24,31,58,0.14)";

        } else {

            navbar.style.boxShadow =
                "0 15px 45px rgba(24,31,58,0.08)";

        }

    }
);


/* =========================================================
   BUTTON RIPPLE
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".category-btn, .promo-btn, .empty-state button"
            );


        if (!button) return;


        const ripple =
            document.createElement("span");


        const rect =
            button.getBoundingClientRect();


        const size =
            Math.max(
                rect.width,
                rect.height
            );


        ripple.style.position =
            "absolute";

        ripple.style.width =
            `${size}px`;

        ripple.style.height =
            `${size}px`;

        ripple.style.left =
            `${event.clientX - rect.left - size / 2}px`;

        ripple.style.top =
            `${event.clientY - rect.top - size / 2}px`;

        ripple.style.borderRadius =
            "50%";

        ripple.style.background =
            "rgba(255,255,255,0.35)";

        ripple.style.transform =
            "scale(0)";

        ripple.style.pointerEvents =
            "none";

        ripple.style.animation =
            "rippleAnimation 0.6s ease-out";


        button.style.position =
            "relative";

        button.style.overflow =
            "hidden";


        button.appendChild(ripple);


        setTimeout(
            () => ripple.remove(),
            600
        );

    }
);


/* =========================================================
   RIPPLE ANIMATION
========================================================= */

const rippleStyle =
    document.createElement("style");


rippleStyle.textContent = `

@keyframes rippleAnimation {

    to {

        transform: scale(2.5);

        opacity: 0;

    }

}

`;


document.head.appendChild(
    rippleStyle
);


console.log(
    "My Shop products page loaded successfully."
);