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

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Modo oscuro
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const getSystemTheme = () =>
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const getCurrentTheme = () =>
      document.documentElement.getAttribute("data-theme") || getSystemTheme();
    const updateThemeLabel = () => {
      const isDark = getCurrentTheme() === "dark";
      themeToggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    };
    updateThemeLabel();
    themeToggle.addEventListener("click", () => {
      const next = getCurrentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      updateThemeLabel();
    });
  }

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

  // Inclinación 3D de las tarjetas al mover el mouse (solo en dispositivos con mouse)
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (supportsHover && !prefersReducedMotion) {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateY = relX * 10;
        const rotateX = relY * -10;
        card.style.transition = "transform 0.1s ease";
        card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transition = "transform 0.4s ease";
        card.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }

  // Contadores animados en la sección "Nosotros"
  const counters = document.querySelectorAll("[data-count-to]");
  function setCounterFinalValue(el) {
    const target = el.getAttribute("data-count-to");
    const suffix = el.getAttribute("data-suffix") || "";
    el.textContent = target + suffix;
  }
  function animateCounter(el) {
    if (prefersReducedMotion) {
      setCounterFinalValue(el);
      return;
    }
    const target = parseFloat(el.getAttribute("data-count-to"));
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => counterObserver.observe(el));
    } else {
      counters.forEach(setCounterFinalValue);
    }
  }
})();
