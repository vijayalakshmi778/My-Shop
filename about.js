/* -----------------------------------------
   SCROLL REVEAL ANIMATION
----------------------------------------- */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

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



/* -----------------------------------------
   ANIMATED COUNTERS
----------------------------------------- */

const counters = document.querySelectorAll(".counter");

let countersStarted = false;


const startCounters = () => {

    if (countersStarted) {
        return;
    }

    countersStarted = true;


    counters.forEach((counter) => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const duration = 1800;

        const startTime = performance.now();


        const updateCounter = (currentTime) => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            // Smooth easing
            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            current = Math.floor(
                easedProgress * target
            );

            counter.textContent = current;


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        };


        requestAnimationFrame(updateCounter);

    });

};



/* -----------------------------------------
   COUNTER OBSERVER
----------------------------------------- */

const statsSection =
    document.querySelector(".stats-section");


if (statsSection) {

    const statsObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    startCounters();

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.3
        }
    );


    statsObserver.observe(statsSection);

}



/* -----------------------------------------
   HEADER SHADOW ON SCROLL
----------------------------------------- */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

        header.style.boxShadow =
            "0 10px 30px rgba(15, 23, 42, 0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});



/* -----------------------------------------
   BUTTON CLICK ANIMATION
----------------------------------------- */

const buttons =
    document.querySelectorAll(
        ".hero-button, .cta-button, .outline-button"
    );


buttons.forEach((button) => {

    button.addEventListener("click", () => {

        button.style.transform =
            "scale(0.96)";

        setTimeout(() => {

            button.style.transform = "";

        }, 150);

    });

});



/* -----------------------------------------
   PARALLAX EFFECT FOR HERO
----------------------------------------- */

const heroVisual =
    document.querySelector(".hero-visual");


if (heroVisual && window.innerWidth > 768) {

    window.addEventListener("mousemove", (event) => {

        const x =
            (window.innerWidth / 2 - event.clientX) / 40;

        const y =
            (window.innerHeight / 2 - event.clientY) / 40;


        heroVisual.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}



/* -----------------------------------------
   PAGE LOAD ANIMATION
----------------------------------------- */

document.body.classList.add("page-loaded");
