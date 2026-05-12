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
index.html              ← entry point
styles.css              ← design tokens + base styles
i18n.js                 ← strings ES/EN + lista de clientes
mexico-poly.js          ← polígonos lat/lng de México (mapa + globo)
world-mask.js           ← (no usado activamente — backup)

icons.jsx               ← biblioteca de iconos (Lucide-style)
app.jsx                 ← App shell, scroll progress, cookie banner, Coffee&Job bubble

sections-top.jsx        ← Navbar + Hero (carousel) + Metrics + Marquee
sections-clients-services.jsx  ← Grid de clientes + 8 service cards
sections-tech.jsx       ← AI Agents + tech stack + diferenciador
sections-globe.jsx      ← Globo 3D con México resaltado en rojo
sections-map.jsx        ← Mapa de México SVG + Sectores + Certificaciones
sections-end.jsx        ← Quiénes Somos + Casos + Carreras (Coffee&Job) + Contacto + Footer

assets/
  ├─ brand-*.png        ← Fotos para hero carousel + Quiénes Somos + Servicios + Carreras
  ├─ client-*.png       ← Logos de clientes (silhouettes blancas o color)
  ├─ cert-iso-*.jpg     ← Badges oficiales ISO 9001 + ISO 27001
  ├─ coffee-and-job.png ← Logo del agente AI de reclutamiento
  ├─ logo-mark.png      ← Logo Gabssa (G + flechas)
  └─ mexico-map.png     ← (legacy)
```

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

## SEO

`<title>` y `<meta description>` configurados en `index.html`. Para producción agregar:
- `og:image` con un screenshot del hero (1200×630)
- `<link rel="canonical">`
- Sitemap.xml + robots.txt

---

© 2025 GRUPO GABSSA S.A. de C.V.
