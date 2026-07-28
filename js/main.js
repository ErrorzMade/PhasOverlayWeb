/* ============================================================
   Mobile nav
   ============================================================ */

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ============================================================
   Screenshot lightbox
   Picks up every screenshot in the feature rows, in DOM order.
   Adding a row to index.html is enough, nothing to register here.
   ============================================================ */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const shots = Array.from(document.querySelectorAll(".row-shot img"));

let current = 0;

function openLightbox(i) {
  current = (i + shots.length) % shots.length;
  lightboxImg.src = shots[current].src;
  lightboxImg.alt = shots[current].alt;
  lightbox.classList.add("open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
}

if (lightbox && shots.length) {
  shots.forEach((img, i) => {
    img.addEventListener("click", () => openLightbox(i));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") return closeLightbox();

    // Arrows only browse while the lightbox is actually open.
    if (!lightbox.classList.contains("open")) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

    openLightbox(current + (e.key === "ArrowRight" ? 1 : -1));
  });
}

/* ============================================================
   Reveal on scroll
   ============================================================ */

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
