const still = matchMedia("(prefers-reduced-motion:reduce)").matches;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
$("#year").textContent = new Date().getFullYear();

// Mobile menu
const burger = $(".burger"), links = $(".links");
const setMenu = open => { links.classList.toggle("open", open); burger.textContent = open ? "✕" : "☰"; burger.setAttribute("aria-expanded", open); };
burger.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.addEventListener("click", e => e.target.closest("a") && setMenu(false));
addEventListener("keydown", e => e.key === "Escape" && setMenu(false));
document.addEventListener("click", e => !e.target.closest(".nav") && setMenu(false));

// Typing role
const words = ["CSE Student", "AI/ML Enthusiast", "Full-Stack Developer", "Problem Solver"];
const typed = $("#typed");
let w = 0, c = 0, del = false;
const type = () => {
    const word = words[w];
    c += del ? -1 : 1;
    typed.textContent = word.slice(0, c);
    let delay = del ? 40 : 90;
    if (!del && c === word.length) { del = true; delay = 1500; }
    else if (del && c === 0) { del = false; w = (w + 1) % words.length; delay = 350; }
    setTimeout(type, delay);
};
if (typed) still ? typed.textContent = words[0] : type();

// Cards tilt in 3D on hover (the hero image stays still)
const oval = $(".hero-img"), hero = $(".hero");
if (!still) {
    document.addEventListener("pointermove", e => {
        const card = e.target.closest(".card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 10 + "deg");
        card.style.setProperty("--rx", -((e.clientY - r.top) / r.height - .5) * 10 + "deg");
    });
    document.addEventListener("pointerout", e => {
        const card = e.target.closest(".card");
        if (card && !card.contains(e.relatedTarget)) { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); }
    });
}
