# GABSSA — Sitio Web

Sitio corporativo de Grupo GABSSA: BPO + AI Agents en México.
30 años · 4,400+ posiciones · 50 oficinas · ISO 9001 · ISO 27001 · PCI DSS.

## Stack

- **HTML estático** + **React 18** vía CDN (no build step)
- **Babel standalone** transpila JSX en el navegador
- **CSS custom** (sin frameworks)
- Fuentes vía Google Fonts (Geist + Geist Mono)
- i18n nativo (ES / EN) con localStorage

## Estructura

```
index.html              ← entry point (carga scripts en orden)
styles.css              ← design tokens + base styles
i18n.js                 ← strings ES/EN + catálogo de clientes y tech stack
mexico-poly.js          ← polígonos lat/lng de México (mapa + globo)

icons.jsx               ← biblioteca de iconos (Lucide-style)
app.jsx                 ← App shell, scroll progress, cookie banner, Coffee&Job bubble

sections-top.jsx        ← Navbar + Hero (carousel) + Metrics + Marquee
sections-clients-services.jsx  ← Grid de clientes + 8 service cards
sections-tech.jsx       ← AI Agents + tech stack + diferenciador
sections-globe.jsx      ← Globo 3D con México resaltado en rojo
sections-map.jsx        ← Mapa de México SVG + Sectores + Certificaciones
sections-end.jsx        ← Quiénes Somos + Casos + Carreras (Coffee&Job) + Contacto + Footer

assets/                 ← ÚNICA carpeta de imágenes; todo lo que hay aquí se usa
  ├─ brand-*.png        ← Fotos del hero carousel, Quiénes Somos y Carreras
  ├─ client-*.png|svg   ← Logos de clientes (catálogo en i18n.js)
  ├─ tech-*.png|svg     ← Logos del marquee de tecnología (catálogo en i18n.js)
  ├─ cert-iso-*.jpg     ← Badges oficiales ISO 9001 + ISO 27001
  ├─ coffee-and-job.png ← Logo del agente AI de reclutamiento
  ├─ logo-gabssa.png    ← Favicon
  └─ logo-mark.png      ← Logo del navbar/footer (vía CSS `.logo-mark`)
```

### Convenciones

- **Ningún asset va en la raíz** — `.gitignore` bloquea `*.png/jpg/svg` a nivel raíz a propósito.
  Toda imagen nueva entra a `assets/` con nombre en minúsculas y guiones (`tech-<slug>.png`).
- **Agregar un logo de cliente o tecnología** = copiar el archivo a `assets/` y añadir su
  entrada al arreglo correspondiente en `i18n.js` (`TECH_STACK` / clientes). No se toca el JSX.
- **Nada de zips ni respaldos versionados** — el historial de git es el respaldo.

## Desarrollo local

Cualquier servidor estático funciona:

```bash
python3 -m http.server 8000
# o
npx serve .
```

Luego abre <http://localhost:8000>.

## Despliegue

Cualquier hosting de estáticos (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3+CloudFront).
No requiere build step — sube los archivos tal cual.

## Notas operativas

- **Coffee & Job (Reclutador AI)** — Floating WhatsApp bubble + banner en la sección de Carreras. Número configurado: `+52 81 1213 3783` en `app.jsx` y `sections-end.jsx`.
- **Form de contacto** — Hace `e.preventDefault()` y muestra estado "Recibido". Para producción, conecta el `onSubmit` a tu endpoint (`/api/contact`, Formspree, Resend, etc.).
- **Cookie banner** — Cumple LFPDPPP (Aviso de Privacidad MX). Persiste decisión en `localStorage`.
- **Idioma** — Toggle ES/EN en navbar, persiste en `localStorage`. Default ES.
- **React se sirve en build de producción** desde unpkg con hashes SRI. Si subes de versión,
  recalcula el `integrity` (`openssl dgst -sha384 -binary <archivo> | openssl base64 -A`).

## SEO

`<title>` y `<meta description>` configurados en `index.html`. Para producción agregar:
- `og:image` con un screenshot del hero (1200×630)
- `<link rel="canonical">`
- Sitemap.xml + robots.txt

---

© 2025 GRUPO GABSSA S.A. de C.V.
