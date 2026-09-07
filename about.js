
/* =====================================================
   My SHOP - ABOUT PAGE JAVASCRIPT
===================================================== */


/* =====================================================
   PAGE LOAD
===================================================== */

document.body.classList.add("page-loaded");

console.log("My Shop About page loaded successfully.");



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});



/* =====================================================
   ANIMATED COUNTERS
===================================================== */

const counters =
    document.querySelectorAll(".counter");


let countersStarted = false;


function startCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;


    counters.forEach((counter) => {

        const target =
            Number(
                counter.dataset.target
            );


        const duration = 1800;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
                Ease-out animation
            */

            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const current =
                Math.floor(
                    easedProgress * target
                );


            counter.textContent =
                current;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    });

}



/* =====================================================
   COUNTER OBSERVER
===================================================== */

const statsSection =
    document.querySelector(
        ".stats-section"
    );


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        startCounters();

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.3
            }

        );


    statsObserver.observe(
        statsSection
    );

}



/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const header =
    document.querySelector(
        ".header"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!header) {
            return;
        }


        if (window.scrollY > 20) {

            header.style.boxShadow =
                "0 10px 30px rgba(15, 23, 42, 0.10)";

            header.style.background =
                "rgba(255,255,255,0.94)";

        } else {

            header.style.boxShadow =
                "none";

            header.style.background =
                "rgba(255,255,255,0.86)";

        }

    }
);



/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.querySelector(
        ".menu-toggle"
    );


const nav =
    document.querySelector(
        "nav"
    );


if (menuToggle && nav) {

    menuToggle.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "open"
            );


            if (
                nav.classList.contains(
                    "open"
                )
            ) {

                menuToggle.textContent =
                    "✕";

            } else {

                menuToggle.textContent =
                    "☰";

            }

        }
    );


    /*
       Close menu after
       clicking navigation link
    */

    const navItems =
        nav.querySelectorAll("a");


    navItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                nav.classList.remove(
                    "open"
                );

                menuToggle.textContent =
                    "☰";

            }
        );

    });

}



/* =====================================================
   BUTTON PRESS ANIMATION
===================================================== */

const buttons =
    document.querySelectorAll(
        ".hero-button, .cta-button, .outline-button"
    );


buttons.forEach((button) => {

    button.addEventListener(
        "pointerdown",
        () => {

            button.style.transform =
                "scale(0.96)";

        }
    );


    button.addEventListener(
        "pointerup",
        () => {

            button.style.transform =
                "";

        }
    );


    button.addEventListener(
        "pointerleave",
        () => {

            button.style.transform =
                "";

        }
    );

});



/* =====================================================
   HERO PARALLAX
===================================================== */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


if (
    heroVisual &&
    window.innerWidth > 768
) {

    heroVisual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroVisual.getBoundingClientRect();


            const centerX =
                rect.left +
                rect.width / 2;


            const centerY =
                rect.top +
                rect.height / 2;


            const x =
                (event.clientX - centerX)
                / 35;


            const y =
                (event.clientY - centerY)
                / 35;


            heroVisual.style.transform =
                `translate(
                    ${x}px,
                    ${y}px
                )`;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            heroVisual.style.transform =
                "translate(0, 0)";

        }
    );

}



/* =====================================================
   MOUSE PARALLAX FOR FLOATING CARDS
===================================================== */

const floatingCards =
    document.querySelectorAll(
        ".floating-card"
    );


if (
    floatingCards.length &&
    window.innerWidth > 900
) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX -
                window.innerWidth / 2)
                / 80;


            const y =
                (event.clientY -
                window.innerHeight / 2)
                / 80;


            floatingCards.forEach(
                (card, index) => {

                    const strength =
                        (index + 1) * 2;


                    card.style.marginLeft =
                        `${x * strength}px`;


                    card.style.marginTop =
                        `${y * strength}px`;

                }
            );

        }
    );

}



/* =====================================================
   MISSION CARD HOVER
===================================================== */

const missionCards =
    document.querySelectorAll(
        ".mission-card"
    );


missionCards.forEach((card) => {

    card.addEventListener(
        "mouseenter",
        () => {

            const icon =
                card.querySelector(
                    ".mission-icon"
                );


            if (icon) {

                icon.style.transform =
                    "rotate(-8deg) scale(1.08)";

            }

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            const icon =
                card.querySelector(
                    ".mission-icon"
                );


            if (icon) {

                icon.style.transform =
                    "";

            }

        }
    );

});



/* =====================================================
   PAGE VISIBILITY
===================================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            document.body.classList.add(
                "page-active"
            );

        }

    }
);
