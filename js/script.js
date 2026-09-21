// ======= CONFIGURACIÓN DEL NEGOCIO =======
// Editá estos valores con tus datos reales.
const CONFIG = {
  whatsappNumber: "5491100000000", // Reemplazar por tu número real, sin "+" ni espacios (código de país + número)
  whatsappMessage: "Hola! Quiero pedir un presupuesto para una pieza impresa en 3D.",
  email: "hola@eg3dimpresiones.com",
};
// ==========================================

(function () {
  const wspUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

  document.querySelectorAll("[data-wsp-link]").forEach((link) => {
    link.setAttribute("href", wspUrl);
  });

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
})();
