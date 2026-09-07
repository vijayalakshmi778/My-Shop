

console.log("My Shop home page loaded successfully.");



/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        if (navLinks.classList.contains("open")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });


    /* Close menu after clicking a link */

    const navigationItems =
        document.querySelectorAll(".nav-links a");

    navigationItems.forEach(item => {

        item.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.textContent = "☰";

        });

    });

}



/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

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
   BUTTON RIPPLE EFFECT
========================================================= */

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach(button => {

    button.addEventListener("click", function (event) {

        const ripple =
            document.createElement("span");

        const rect =
            button.getBoundingClientRect();

        const size =
            Math.max(rect.width, rect.height);

        const x =
            event.clientX - rect.left - size / 2;

        const y =
            event.clientY - rect.top - size / 2;


        ripple.style.position = "absolute";
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.borderRadius = "50%";
        ripple.style.background =
            "rgba(255,255,255,0.3)";
        ripple.style.transform = "scale(0)";
        ripple.style.pointerEvents = "none";
        ripple.style.animation =
            "rippleAnimation 0.6s ease-out";


        button.style.position = "relative";
        button.style.overflow = "hidden";

        button.appendChild(ripple);


        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});



/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 18px 45px rgba(24,31,58,0.14)";

    } else {

        navbar.style.boxShadow =
            "0 15px 45px rgba(24,31,58,0.08)";

    }

});



/* =========================================================
   MOUSE PARALLAX EFFECT
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");

const floatingCards =
    document.querySelectorAll(".floating-card");


if (heroVisual && window.innerWidth > 900) {

    heroVisual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width
                - 0.5;

            const y =
                (event.clientY - rect.top)
                / rect.height
                - 0.5;


            floatingCards.forEach(
                (card, index) => {

                    const strength =
                        (index + 1) * 8;

                    card.style.transform =
                        `translate(
                            ${x * strength}px,
                            ${y * strength}px
                        )`;

                }
            );

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            floatingCards.forEach(card => {

                card.style.transform =
                    "translate(0, 0)";

            });

        }
    );

}



/* =========================================================
   ADD RIPPLE KEYFRAME
========================================================= */

const style =
    document.createElement("style");

style.textContent = `

@keyframes rippleAnimation {

    to {
        transform: scale(2.5);
        opacity: 0;
    }

}

`;

document.head.appendChild(style);

