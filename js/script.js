// ======= CONFIGURACIÓN DEL NEGOCIO =======
// Edita estos valores con tus datos reales.
const CONFIG = {
  whatsappNumber: "5215512345678", // Reemplazar por tu número real: 52 + número a 10 dígitos, sin "+" ni espacios
  whatsappMessage: "Hola! Quiero pedir un presupuesto para una pieza impresa en resina 3D.",
  email: "hola@eg3dimpresiones.com",
  instagramHandle: "@eg3dimpresiones", // Reemplazar por tu usuario real de Instagram
  instagramUrl: "https://www.instagram.com/eg3dimpresiones/", // Reemplazar por el link real a tu perfil

  // Precios de referencia (MXN). Investigados según tarifas de mercado para
  // servicios de impresión 3D en resina; ajústalos a tus costos reales.
  pricing: {
    currency: "MXN",
    resins: [
      { id: "estandar", label: "Resina estándar", pricePerGram: 6.5 },
      { id: "tough", label: "Resina Tough (resistente)", pricePerGram: 8.5 },
      { id: "flexible", label: "Resina flexible", pricePerGram: 9 },
      { id: "lavable", label: "Resina lavable con agua", pricePerGram: 7 },
    ],
    minimumOrder: 150, // Precio mínimo por pedido, aunque la pieza pese poco
    bulkDiscountQty: 3, // A partir de esta cantidad de piezas iguales...
    bulkDiscountPercent: 10, // ...se aplica este % de descuento
  },
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
  function attachCardTilt(card) {
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
  }
  if (supportsHover && !prefersReducedMotion) {
    document.querySelectorAll(".card").forEach(attachCardTilt);
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

  // ======= Precios y calculadora =======
  const formatMXN = (n) =>
    `$${Math.round(n).toLocaleString("es-MX")} ${CONFIG.pricing.currency}`;

  const priceCardsGrid = document.getElementById("priceCardsGrid");
  if (priceCardsGrid) {
    priceCardsGrid.innerHTML = CONFIG.pricing.resins
      .map(
        (r) => `
        <article class="card price-card">
          <h4>${r.label}</h4>
          <span class="price-amount">$${r.pricePerGram}</span>
          <span class="price-unit">MXN / gramo</span>
        </article>`
      )
      .join("");
    if (supportsHover && !prefersReducedMotion) {
      priceCardsGrid.querySelectorAll(".card").forEach(attachCardTilt);
    }
  }

  const priceMinimumEl = document.getElementById("priceMinimum");
  if (priceMinimumEl) priceMinimumEl.textContent = formatMXN(CONFIG.pricing.minimumOrder);

  const priceBulkDiscountEl = document.getElementById("priceBulkDiscount");
  if (priceBulkDiscountEl) {
    priceBulkDiscountEl.textContent = `${CONFIG.pricing.bulkDiscountPercent}% de descuento`;
  }

  const calcResin = document.getElementById("calcResin");
  const calcWeight = document.getElementById("calcWeight");
  const calcQty = document.getElementById("calcQty");
  const sizePresets = document.getElementById("sizePresets");
  const calcTotalWeight = document.getElementById("calcTotalWeight");
  const calcDiscountRow = document.getElementById("calcDiscountRow");
  const calcDiscountValue = document.getElementById("calcDiscountValue");
  const calcTotalPrice = document.getElementById("calcTotalPrice");
  const calcWspBtn = document.getElementById("calcWspBtn");

  if (calcResin && calcWeight && calcQty && calcTotalPrice) {
    calcResin.innerHTML = CONFIG.pricing.resins
      .map((r) => `<option value="${r.id}">${r.label} ($${r.pricePerGram}/g)</option>`)
      .join("");

    function runCalculator() {
      const weight = Math.max(1, parseFloat(calcWeight.value) || 0);
      const qty = Math.max(1, parseInt(calcQty.value, 10) || 1);
      const resin = CONFIG.pricing.resins.find((r) => r.id === calcResin.value) || CONFIG.pricing.resins[0];
      const totalWeight = weight * qty;
      let subtotal = totalWeight * resin.pricePerGram;

      const bulkApplies = qty >= CONFIG.pricing.bulkDiscountQty;
      if (bulkApplies) {
        subtotal = subtotal * (1 - CONFIG.pricing.bulkDiscountPercent / 100);
      }

      const total = Math.max(subtotal, CONFIG.pricing.minimumOrder);

      calcTotalWeight.textContent = `${totalWeight} g`;
      if (bulkApplies) {
        calcDiscountRow.hidden = false;
        calcDiscountValue.textContent = `-${CONFIG.pricing.bulkDiscountPercent}%`;
      } else {
        calcDiscountRow.hidden = true;
      }
      calcTotalPrice.textContent = formatMXN(total);

      if (calcWspBtn) {
        const msg = `Hola! Quiero cotizar ${qty} pieza(s) de ~${weight} g en ${resin.label.toLowerCase()}. Precio estimado con la calculadora: ${formatMXN(total)}. ¿Me confirman el presupuesto?`;
        calcWspBtn.setAttribute(
          "href",
          `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`
        );
      }
    }

    calcResin.addEventListener("change", runCalculator);
    calcWeight.addEventListener("input", runCalculator);
    calcQty.addEventListener("input", runCalculator);

    if (sizePresets) {
      sizePresets.querySelectorAll(".size-preset").forEach((btn) => {
        btn.addEventListener("click", () => {
          calcWeight.value = btn.getAttribute("data-grams");
          sizePresets.querySelectorAll(".size-preset").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          runCalculator();
        });
      });
    }

    runCalculator();
  }

  // ======= Asistente / chatbot de preguntas frecuentes =======
  const chatbot = document.getElementById("chatbot");
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotPanel = document.getElementById("chatbotPanel");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const chatbotQuickReplies = document.getElementById("chatbotQuickReplies");
  const chatbotForm = document.getElementById("chatbotForm");
  const chatbotInput = document.getElementById("chatbotInput");

  if (chatbot && chatbotToggle && chatbotPanel && chatbotMessages && chatbotForm && chatbotInput) {
    const normalize = (str) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "");

    const wspLink = (text) =>
      `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

    const minResinPrice = Math.min(...CONFIG.pricing.resins.map((r) => r.pricePerGram));

    const KNOWLEDGE_BASE = [
      {
        keywords: ["precio", "costo", "cuesta", "vale", "cotiza", "cotizar"],
        answer: () =>
          `Cobramos por gramo de resina usado, desde ${formatMXN(minResinPrice)} el gramo según el tipo de resina. Pedido mínimo: ${formatMXN(
            CONFIG.pricing.minimumOrder
          )}. Podés usar la calculadora de la sección "Precios" para una estimación al instante 👇`,
        quickReplies: ["Ver calculadora"],
      },
      {
        keywords: ["ver calculadora"],
        answer: () => "Bajá hasta la sección \"Precios\" de la página, ahí está la calculadora ⬆️",
      },
      {
        keywords: ["material", "resina", "tipos de resina", "que resinas", "qué resinas"],
        answer: () =>
          "Trabajamos con 4 tipos de resina: estándar (detalle y acabado), Tough (más resistente), flexible (piezas elásticas) y lavable con agua (alta precisión, fácil de limpiar).",
      },
      {
        keywords: ["tiempo", "tarda", "demora", "cuando", "cuándo", "entrega"],
        answer: () => "Normalmente entre 2 y 5 días hábiles desde que confirmás el presupuesto.",
      },
      {
        keywords: ["envio", "envío", "domicilio", "mandan", "paqueteria", "paquetería"],
        answer: () =>
          "Sí, coordinamos envío a domicilio o un punto de retiro según tu ubicación. El costo del envío se cotiza aparte.",
      },
      {
        keywords: ["pago", "pagar", "metodo de pago", "método de pago", "transferencia"],
        answer: () => "Coordinamos el medio de pago por WhatsApp al confirmar tu pedido.",
      },
      {
        keywords: ["diseño", "diseno", "modelar", "no tengo archivo", "archivo 3d", "stl"],
        answer: () =>
          "No hay problema, ofrecemos diseño 3D a medida. Contanos tu idea o mandanos una referencia y te ayudamos a modelarla.",
      },
      {
        keywords: ["tamaño", "tamano", "grande puede", "maximo", "máximo"],
        answer: () =>
          "Depende del modelo, pero trabajamos bien con piezas pequeñas y medianas de alto detalle. Contanos tu caso puntual y te decimos si es posible.",
      },
      {
        keywords: ["descuento", "cantidad", "varias piezas"],
        answer: () =>
          `Sí, aplicamos ${CONFIG.pricing.bulkDiscountPercent}% de descuento a partir de ${CONFIG.pricing.bulkDiscountQty} piezas iguales en el mismo pedido.`,
      },
      {
        keywords: ["hola", "buenas", "buenos dias", "buenos días", "buenas tardes", "buenas noches"],
        answer: () =>
          "¡Hola! 👋 Soy el asistente de EG3D Impresiones. Puedo ayudarte con precios, materiales, tiempos de entrega y más. ¿Qué querés saber?",
      },
      {
        keywords: ["gracias"],
        answer: () => "¡De nada! ¿Necesitás algo más?",
      },
      {
        keywords: ["humano", "persona", "hablar con alguien", "asesor", "operador"],
        answer: () => "Claro, te paso directo con nosotros por WhatsApp 👇",
        escalate: true,
      },
    ];

    const FALLBACK = {
      answer: () => "No estoy seguro de esa respuesta 🤔 ¿Querés que te conecte directo por WhatsApp?",
      escalate: true,
    };

    const QUICK_REPLIES_DEFAULT = [
      "¿Cuánto cuesta?",
      "¿Qué materiales usan?",
      "¿Cuánto tardan?",
      "¿Hacen envíos?",
      "Hablar con alguien",
    ];

    function scrollMessagesToBottom() {
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addMessage(text, sender, escalate) {
      const bubble = document.createElement("div");
      bubble.className = `chatbot-msg ${sender}`;
      bubble.textContent = text;
      if (escalate) {
        const wspBtn = document.createElement("a");
        wspBtn.href = wspLink("Hola! Vengo del asistente virtual de la web y quiero hablar con alguien 🙂");
        wspBtn.target = "_blank";
        wspBtn.rel = "noopener";
        wspBtn.className = "chatbot-msg-wsp";
        wspBtn.textContent = "Escribir por WhatsApp";
        bubble.appendChild(document.createElement("br"));
        bubble.appendChild(wspBtn);
      }
      chatbotMessages.appendChild(bubble);
      scrollMessagesToBottom();
    }

    function setQuickReplies(list) {
      chatbotQuickReplies.innerHTML = "";
      list.forEach((label) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "chatbot-quick-reply";
        btn.textContent = label;
        btn.addEventListener("click", () => handleUserMessage(label));
        chatbotQuickReplies.appendChild(btn);
      });
    }

    function findAnswer(userText) {
      const normalized = normalize(userText);
      for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some((kw) => normalized.includes(normalize(kw)))) {
          return entry;
        }
      }
      return FALLBACK;
    }

    function handleUserMessage(text) {
      const trimmed = text.trim();
      if (!trimmed) return;
      addMessage(trimmed, "user");
      const entry = findAnswer(trimmed);
      window.setTimeout(() => {
        addMessage(entry.answer(), "bot", entry.escalate);
        setQuickReplies(entry.quickReplies || QUICK_REPLIES_DEFAULT);
      }, 350);
    }

    let chatInitialized = false;
    function initChatbot() {
      if (chatInitialized) return;
      chatInitialized = true;
      addMessage(
        "¡Hola! 👋 Soy el asistente de EG3D Impresiones. Preguntame sobre precios, materiales, tiempos de entrega o envíos.",
        "bot"
      );
      setQuickReplies(QUICK_REPLIES_DEFAULT);
    }

    function openChat() {
      chatbot.classList.add("open");
      chatbotPanel.hidden = false;
      chatbotToggle.setAttribute("aria-expanded", "true");
      initChatbot();
      window.setTimeout(() => chatbotInput.focus(), 100);
    }

    function closeChat() {
      chatbot.classList.remove("open");
      chatbotPanel.hidden = true;
      chatbotToggle.setAttribute("aria-expanded", "false");
    }

    chatbotToggle.addEventListener("click", () => {
      if (chatbotPanel.hidden) openChat();
      else closeChat();
    });
    if (chatbotClose) chatbotClose.addEventListener("click", closeChat);

    chatbotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = chatbotInput.value;
      chatbotInput.value = "";
      handleUserMessage(value);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !chatbotPanel.hidden) closeChat();
    });
  }
})();
