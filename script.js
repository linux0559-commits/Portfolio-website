const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }
    }, 700);
});


// ===============================
// CURSOR GLOW
// ===============================

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
    window.addEventListener("pointermove", (e) => {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
    });
}


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.12
    }
);

document
    .querySelectorAll(".reveal,.skill-card,.project,.timeline-item")
    .forEach((el, i) => {
        el.classList.add("reveal");
        el.style.transitionDelay = (i % 6) * 70 + "ms";
        observer.observe(el);
    });


// ===============================
// MOBILE MENU
// ===============================

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");

if (menu && nav) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}

document.querySelectorAll("nav a").forEach((a) => {
    a.addEventListener("click", () => {
        if (nav) {
            nav.classList.remove("open");
        }
    });
});


// ===============================
// INTERACTIVE NETWORK BACKGROUND
// ===============================

const canvas = document.getElementById("network");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let W, H;
    let nodes = [];

    function resize() {

        W = canvas.width = innerWidth * devicePixelRatio;
        H = canvas.height = innerHeight * devicePixelRatio;

        canvas.style.width = innerWidth + "px";
        canvas.style.height = innerHeight + "px";

        ctx.setTransform(
            devicePixelRatio,
            0,
            0,
            devicePixelRatio,
            0,
            0
        );

        nodes = Array.from(
            {
                length: Math.min(
                    75,
                    Math.floor(innerWidth / 16)
                )
            },
            () => ({
                x: Math.random() * innerWidth,
                y: Math.random() * innerHeight,
                vx: (Math.random() - 0.5) * 0.22,
                vy: (Math.random() - 0.5) * 0.22
            })
        );
    }

    function draw() {

        ctx.clearRect(
            0,
            0,
            innerWidth,
            innerHeight
        );

        for (const a of nodes) {

            a.x += a.vx;
            a.y += a.vy;

            if (a.x < 0 || a.x > innerWidth) {
                a.vx *= -1;
            }

            if (a.y < 0 || a.y > innerHeight) {
                a.vy *= -1;
            }

            for (const b of nodes) {

                const d = Math.hypot(
                    a.x - b.x,
                    a.y - b.y
                );

                if (d < 130 && d > 0) {

                    ctx.strokeStyle =
                        `rgba(86,240,168,${(1 - d / 130) * 0.08})`;

                    ctx.beginPath();

                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);

                    ctx.stroke();
                }
            }

            ctx.fillStyle =
                "rgba(86,240,168,.35)";

            ctx.fillRect(
                a.x,
                a.y,
                1.2,
                1.2
            );
        }

        requestAnimationFrame(draw);
    }

    addEventListener("resize", resize);

    resize();
    draw();
}


// ===============================
// BACKGROUND MUSIC
// ===============================

const music = new Audio("./music.mp3");

music.loop = true;
music.volume = 1.0;

let musicOn = false;

const btn = document.getElementById("musicBtn");


// Update music button
function updateMusicButton() {

    if (!btn) return;

    if (musicOn) {

        btn.innerHTML =
            '♫ <span>Music On</span>';

    } else {

        btn.innerHTML =
            '♫ <span>Music Off</span>';
    }
}


// Start music
async function startMusic() {

    try {

        await music.play();

        musicOn = true;

        updateMusicButton();

        console.log("Background music started.");

        return true;

    } catch (error) {

        console.log(
            "Autoplay blocked by browser."
        );

        return false;
    }
}


// Stop music
function stopMusic() {

    music.pause();

    musicOn = false;

    updateMusicButton();
}


// ===============================
// TRY AUTOPLAY WHEN PAGE LOADS
// ===============================

window.addEventListener("load", async () => {

    // Small delay after page loads
    setTimeout(async () => {

        const started = await startMusic();

        if (!started) {

            // Browser blocked autoplay.
            // Start automatically after first interaction.

            const firstInteraction = async () => {

                if (!musicOn) {
                    await startMusic();
                }

                removeInteractionListeners();
            };

            const removeInteractionListeners = () => {

                document.removeEventListener(
                    "click",
                    firstInteraction
                );

                document.removeEventListener(
                    "keydown",
                    firstInteraction
                );

                document.removeEventListener(
                    "touchstart",
                    firstInteraction
                );

                document.removeEventListener(
                    "scroll",
                    firstInteraction
                );
            };

            document.addEventListener(
                "click",
                firstInteraction,
                { once: true }
            );

            document.addEventListener(
                "keydown",
                firstInteraction,
                { once: true }
            );

            document.addEventListener(
                "touchstart",
                firstInteraction,
                { once: true }
            );

            document.addEventListener(
                "scroll",
                firstInteraction,
                {
                    once: true,
                    passive: true
                }
            );
        }

    }, 800);
});


// ===============================
// MUSIC BUTTON
// ===============================

if (btn) {

    btn.addEventListener("click", async () => {

        if (!musicOn) {

            const started = await startMusic();

            if (!started) {

                alert(
                    "Music could not start. Make sure music.mp3 is in the same folder as index.html."
                );
            }

        } else {

            stopMusic();
        }
    });
}


// ===============================
// MUSIC ERROR CHECK
// ===============================

music.addEventListener("error", () => {

    console.error(
        "Music file could not be loaded."
    );

    console.error(
        "Make sure music.mp3 is in the same folder as index.html."
    );
});


// ===============================
// SET INITIAL BUTTON
// ===============================

updateMusicButton();
