# EG3D Impresiones — Sitio web

Página web para el emprendimiento de impresión 3D en resina **EG3D Impresiones** (Escudero & González). Es un sitio estático (HTML/CSS/JS puro), sin dependencias ni build, así que se puede editar y publicar directamente.

**Sitio en vivo:** https://samurai2004gesc-del.github.io/Emprendimiento-Impresion-3D/

## Estructura

```
index.html               Contenido y estructura de la página
css/style.css             Estilos
js/script.js              Configuración de contacto + interactividad (menú móvil, año, links de WhatsApp)
img/favicon.svg            Ícono del sitio
.github/workflows/deploy-pages.yml   Publica el sitio en GitHub Pages en cada push
```

## Personalización rápida

Todo lo que necesitas cambiar antes de publicar está en **`js/script.js`**, arriba del todo:

```js
const CONFIG = {
  whatsappNumber: "5491100000000", // tu número real: código de país + número, sin "+" ni espacios
  whatsappMessage: "Hola! Quiero pedir un presupuesto para una pieza impresa en resina 3D.",
  email: "hola@eg3dimpresiones.com",
  instagramHandle: "@eg3dimpresiones",
  instagramUrl: "https://www.instagram.com/eg3dimpresiones/",
};
```

- `whatsappNumber`: reemplázalo por tu número real (ej. México: `52` + número a 10 dígitos, ej. `5215512345678`).
- `email`: tu correo de contacto real.
- `instagramHandle` / `instagramUrl`: tu usuario y link real de Instagram. Se usan en el header, el footer, la sección "Síguenos en Instagram" y el contacto.
- `pricing`: precios en MXN por gramo de cada resina, pedido mínimo y descuento por cantidad. Alimentan automáticamente la sección "Precios", la calculadora y las respuestas del bot — **son valores de referencia investigados según tarifas de mercado, ajústalos a tus costos reales.**

### Precios y calculadora

La sección `#precios` y la calculadora de `index.html` no tienen precios escritos a mano: todo sale de `CONFIG.pricing` en `js/script.js`. Para cambiar un precio, solo edita ese objeto — las tarjetas, el selector de la calculadora y las respuestas del bot sobre precios se actualizan solos. Los presets de tamaño (Pequeña/Mediana/Grande/Extra grande) son pesos aproximados de referencia; ajustalos en el HTML (`#sizePresets`, atributo `data-grams`) si tenés datos más precisos.

### Bot de preguntas frecuentes

El widget flotante (abajo a la derecha) es un bot basado en reglas, 100% gratis y sin servicios externos: busca palabras clave en lo que escribe el visitante y responde con texto predefinido (`KNOWLEDGE_BASE` en `js/script.js`). Si no reconoce la pregunta, ofrece conectar directo por WhatsApp. Para agregar o editar respuestas, buscá `KNOWLEDGE_BASE` en `js/script.js` y sumá un objeto `{ keywords: [...], answer: () => "..." }`.

### Otros cambios comunes

- **Nombre / textos**: edita directamente `index.html` (todo el contenido está en español y organizado por secciones con comentarios `<!-- SECCIÓN -->`).
- **Colores**: se definen como variables CSS al inicio de `css/style.css` (`:root { --accent: ... }`), cámbialas ahí para ajustar la paleta.
- **Galería**: la sección `#galeria` tiene tarjetas de ejemplo (`.gallery-item`). Reemplaza cada `.gallery-placeholder` por una imagen real:
  ```html
  <div class="gallery-item">
    <img src="img/pieza-1.jpg" alt="Descripción de la pieza" style="width:100%;height:100%;object-fit:cover;">
  </div>
  ```
  Guarda las fotos en la carpeta `img/`.

## Ver la página en local

No hace falta ningún instalador. Simplemente abre `index.html` en el navegador, o corre un servidor simple:

```bash
python3 -m http.server 8000
```

y visita `http://localhost:8000`.

## Publicación (GitHub Pages)

El sitio ya está publicado con GitHub Actions: cada push a la rama principal del sitio dispara el workflow `.github/workflows/deploy-pages.yml`, que construye y despliega automáticamente en GitHub Pages. No hace falta ningún paso manual adicional para actualizarlo, solo hacer commit y push de los cambios.

## Aparecer en Google (SEO)

El sitio ya tiene lo básico para que Google pueda indexarlo: `robots.txt`, `sitemap.xml`, meta tags Open Graph y datos estructurados (`LocalBusiness`). Pero publicar la web no la mete automáticamente en los resultados de búsqueda — eso puede tardar días o semanas. Para acelerarlo (gratis):

1. Entra a [Google Search Console](https://search.google.com/search-console) con una cuenta de Google.
2. Agrega la propiedad con la URL: `https://samurai2004gesc-del.github.io/Emprendimiento-Impresion-3D/` (tipo "Prefijo de URL").
3. Verificá la propiedad con el método "Archivo HTML" o "Etiqueta HTML" (Search Console te da los pasos exactos).
4. Una vez verificado, andá a "Sitemaps" y envía: `sitemap.xml`.
5. Opcional: usá "Inspección de URLs" y pedí indexación manual de la página principal para que Google la rastree más rápido.

También ayuda crear un perfil de **Google My Business / Perfil de Negocio** si el emprendimiento tiene una ubicación o zona de entrega — eso es lo que hace que aparezca en Google Maps y en búsquedas locales tipo "impresión 3D resina cerca de mí".

## Pendientes sugeridos

- [ ] Cargar fotos reales de piezas en `img/` y reemplazar la galería.
- [ ] Confirmar número de WhatsApp y correo definitivos.
- [ ] Confirmar usuario/link real de Instagram (`instagramHandle` / `instagramUrl` en `js/script.js`).
- [ ] Revisar los precios de `CONFIG.pricing` (son de referencia) y ajustarlos a tus costos reales.
- [ ] Registrar un dominio propio (opcional).
