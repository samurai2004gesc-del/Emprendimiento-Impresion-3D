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
};
```

- `whatsappNumber`: reemplázalo por tu número real (ej. Argentina: `549` + código de área sin 0 + número, ej. `5491122334455`).
- `email`: tu correo de contacto real.

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

## Pendientes sugeridos

- [ ] Cargar fotos reales de piezas en `img/` y reemplazar la galería.
- [ ] Confirmar número de WhatsApp y correo definitivos.
- [ ] Agregar enlaces a redes sociales si se van a usar (Instagram, etc.).
- [ ] Registrar un dominio propio (opcional).
