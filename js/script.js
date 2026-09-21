// ======= CONFIGURACIÓN DEL NEGOCIO =======
// Edita estos valores con tus datos reales.
const CONFIG = {
  whatsappNumber: "5491100000000", // Reemplazar por tu número real, sin "+" ni espacios (código de país + número)
  whatsappMessage: "Hola! Quiero pedir un presupuesto para una pieza impresa en resina 3D.",
  email: "hola@eg3dimpresiones.com",
  instagramHandle: "@eg3dimpresiones", // Reemplazar por tu usuario real de Instagram
  instagramUrl: "https://www.instagram.com/eg3dimpresiones/", // Reemplazar por el link real a tu perfil
};
// ==========================================

(function () {
  const wspUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

  document.querySelectorAll("[data-wsp-link]").forEach((link) => {
    link.setAttribute("href", wspUrl);
  });

  document.querySelectorAll("[data-ig-link]").forEach((link) => {
    link.setAttribute("href", CONFIG.instagramUrl);
  });

  const igHandleEl = document.getElementById("instagramHandle");
  if (igHandleEl) igHandleEl.textContent = CONFIG.instagramHandle;

  const emailLink = document.getElementById("emailLink");
  if (emailLink) {
    emailLink.textContent = CONFIG.email;
    emailLink.setAttribute("href", `mailto:${CONFIG.email}`);
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = document.getElementById("navToggle");
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("nav");

  if (navToggle && header && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("menu-open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    document.body.classList.add("reveal-init");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Red de seguridad: si por algún motivo un elemento nunca se marca
    // visible (scroll muy rápido, navegador poco común, etc.), se muestra
    // de todas formas para que ningún contenido quede oculto.
    window.setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
        el.classList.add("is-visible");
      });
    }, 2500);
  }
})();
