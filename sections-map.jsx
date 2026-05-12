// sections-map.jsx — Mexico map (clean SVG) with animated connector lines
// + Certifications grid below.

/* ═════════════ SECTORES ═════════════ */
function Sectors({ t }) {
  const ref = useReveal();
  return (
    <section id="sectores" className="section">
      <div className="container">
        <div ref={ref} className="reveal section-head" style={{ maxWidth: 820 }}>
          <span className="eyebrow red"><span className="dot"></span>{t.sectors.eyebrow}</span>
          <h2>{t.sectors.title}</h2>
          <p>{t.sectors.sub}</p>
        </div>

        <div className="grid" style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }} id="sectors-grid">
          {t.sectors.items.map((s, i) => {
            const Ico = ICONS[s.icon] || ICONS.sparkle;
            return (
              <div key={i} className="sector-card">
                <div className="ico"><Ico size={18} /></div>
                <h4>{s.name}</h4>
                <p>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) { #sectors-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { #sectors-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ═════════════ MEXICO MAP (custom SVG) ═════════════ */
// All cities by lat/lng. We project them via projectLatLng() from mexico-poly.js.
const ALL_CITIES_LATLNG = [
  // Hubs
  { name: 'CDMX',           lat: 19.43, lng: -99.13, type: 'XL' },
  { name: 'Monterrey',      lat: 25.67, lng: -100.31, type: 'L' },
  { name: 'Guadalajara',    lat: 20.66, lng: -103.34, type: 'L' },
  // Major cities
  { name: 'Tijuana',        lat: 32.51, lng: -117.04 },
  { name: 'Mexicali',       lat: 32.62, lng: -115.45 },
  { name: 'Nogales',        lat: 31.31, lng: -110.94 },
  { name: 'Hermosillo',     lat: 29.08, lng: -110.96 },
  { name: 'Cd. Obregón',    lat: 27.49, lng: -109.94 },
  { name: 'Cd. Juárez',     lat: 31.69, lng: -106.42 },
  { name: 'Chihuahua',      lat: 28.63, lng: -106.07 },
  { name: 'Piedras Negras', lat: 28.71, lng: -100.52 },
  { name: 'Monclova',       lat: 26.91, lng: -101.42 },
  { name: 'Torreón',        lat: 25.55, lng: -103.40 },
  { name: 'Saltillo',       lat: 25.42, lng: -101.00 },
  { name: 'Durango',        lat: 24.03, lng: -104.66 },
  { name: 'Mazatlán',       lat: 23.25, lng: -106.41 },
  { name: 'Culiacán',       lat: 24.81, lng: -107.39 },
  { name: 'Los Mochis',     lat: 25.79, lng: -108.99 },
  { name: 'La Paz',         lat: 24.14, lng: -110.31 },
  { name: 'Zacatecas',      lat: 22.77, lng: -102.58 },
  { name: 'Aguascalientes', lat: 21.88, lng: -102.30 },
  { name: 'San Luis Potosí',lat: 22.15, lng: -100.97 },
  { name: 'León',           lat: 21.13, lng: -101.67 },
  { name: 'Querétaro',      lat: 20.59, lng: -100.39 },
  { name: 'Tepic',          lat: 21.51, lng: -104.89 },
  { name: 'Manzanillo',     lat: 19.11, lng: -104.34 },
  { name: 'Colima',         lat: 19.24, lng: -103.72 },
  { name: 'Morelia',        lat: 19.70, lng: -101.18 },
  { name: 'Pachuca',        lat: 20.10, lng: -98.74 },
  { name: 'Puebla',         lat: 19.04, lng: -98.21 },
  { name: 'Xalapa',         lat: 19.54, lng: -96.91 },
  { name: 'Veracruz',       lat: 19.20, lng: -96.14 },
  { name: 'Acapulco',       lat: 16.86, lng: -99.89 },
  { name: 'Oaxaca',         lat: 17.07, lng: -96.72 },
  { name: 'Villahermosa',   lat: 17.99, lng: -92.93 },
  { name: 'Tuxtla Gtz.',    lat: 16.75, lng: -93.12 },
  { name: 'Tapachula',      lat: 14.91, lng: -92.26 },
  { name: 'Mérida',         lat: 20.97, lng: -89.62 },
  { name: 'Cancún',         lat: 21.16, lng: -86.85 },
];

// Hubs that get a dedicated labeled card with animated connector.
// All coordinates here are in the EXPANDED viewBox: -260 -20 1520 660
// (Mexico shape lives in 0..1000 x, 0..620 y; the negative/extra-wide
// margins give us room for hub cards on either side without overflow.)
const HUB_CARDS = [
  // CDMX
  {
    cityName: 'CDMX',
    label: { es: 'Ciudad de México', en: 'Mexico City' },
    positions: 3550,
    sublineEs: '8 contact centers · HQ',
    sublineEn: '8 contact centers · HQ',
    side: 'right',
    cardY: 470,
    textX: 1240,             // text anchored at right side, anchor=end
    anchorJoint: { x: 800, y: 470 },
    lineEndX: 1230,
  },
  // Monterrey
  {
    cityName: 'Monterrey',
    label: { es: 'Monterrey', en: 'Monterrey' },
    positions: 450,
    growth: 550,
    sublineEs: '+550 en crecimiento',
    sublineEn: '+550 in growth',
    side: 'right',
    cardY: 200,
    textX: 1240,
    anchorJoint: { x: 850, y: 200 },
    lineEndX: 1230,
  },
  // Guadalajara
  {
    cityName: 'Guadalajara',
    label: { es: 'Guadalajara', en: 'Guadalajara' },
    positions: 400,
    growth: 300,
    sublineEs: '+300 en crecimiento',
    sublineEn: '+300 in growth',
    side: 'left',
    cardY: 470,
    textX: -240,
    anchorJoint: { x: 200, y: 470 },
    lineEndX: -230,
  },
];

function MexicoMap({ lang, t }) {
  const wrapRef = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); io.disconnect(); }
    }, { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pre-project all cities
  const cityProj = ALL_CITIES_LATLNG.map(c => {
    const [x, y] = window.projectLatLng(c.lat, c.lng);
    return { ...c, x, y };
  });
  const hubMap = Object.fromEntries(cityProj.filter(c => c.type).map(c => [c.name, c]));

  const mainlandPath = window.polyToPath(window.MEXICO_MAINLAND_LATLNG);
  const bajaPath = window.polyToPath(window.MEXICO_BAJA_LATLNG);

  const VW = window.MX_VIEWBOX.w; // 1000
  const VH = window.MX_VIEWBOX.h; // 620
  // Expanded viewBox to make room for side hub-card labels.
  const PAD_X = 260;
  const PAD_Y = 20;
  const VBX = -PAD_X, VBY = -PAD_Y;
  const VBW = VW + PAD_X * 2;
  const VBH = VH + PAD_Y * 2;

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`${VBX} ${VBY} ${VBW} ${VBH}`} style={{ width: '100%', height: 'auto', display: 'block' }} aria-label="Mapa de presencia GABSSA en México">
        <defs>
          <linearGradient id="mxFill2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(34,211,238,0.16)"/>
            <stop offset="50%"  stopColor="rgba(34,211,238,0.08)"/>
            <stop offset="100%" stopColor="rgba(224,69,69,0.10)"/>
          </linearGradient>
          <radialGradient id="cityGlow">
            <stop offset="0%"   stopColor="rgba(224,69,69,0.85)"/>
            <stop offset="100%" stopColor="rgba(224,69,69,0)"/>
          </radialGradient>
          <radialGradient id="hubGlow2">
            <stop offset="0%"   stopColor="rgba(224,69,69,0.95)"/>
            <stop offset="100%" stopColor="rgba(224,69,69,0)"/>
          </radialGradient>
          {/* Drop-shadow filter for country */}
          <filter id="mxShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6"/>
            <feColorMatrix values="0 0 0 0 0.13   0 0 0 0 0.83   0 0 0 0 0.93   0 0 0 0.18 0"/>
          </filter>
        </defs>

        {/* Glow behind country */}
        <g filter="url(#mxShadow)" opacity="0.7">
          <path d={mainlandPath} fill="rgba(34,211,238,0.4)"/>
          <path d={bajaPath} fill="rgba(34,211,238,0.4)"/>
        </g>

        {/* Country fill */}
        <path d={mainlandPath} fill="url(#mxFill2)" stroke="rgba(34,211,238,0.55)" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d={bajaPath}     fill="url(#mxFill2)" stroke="rgba(34,211,238,0.55)" strokeWidth="1.4" strokeLinejoin="round"/>

        {/* Inner dot texture, clipped to country */}
        <clipPath id="mxClip2">
          <path d={mainlandPath}/>
          <path d={bajaPath}/>
        </clipPath>
        <g clipPath="url(#mxClip2)" opacity="0.55">
          {(() => {
            const dots = [];
            const step = 13;
            for (let y = 0; y < VH; y += step) {
              const xOff = (Math.floor(y / step) % 2) * (step / 2);
              for (let x = 0; x < VW; x += step) {
                dots.push(<circle key={x + '-' + y} cx={x + xOff} cy={y} r="0.7" fill="rgba(255,255,255,0.6)"/>);
              }
            }
            return dots;
          })()}
        </g>

        {/* Non-hub cities — small red dots */}
        {cityProj.filter(c => !c.type).map((c, i) => (
          <g key={'c' + i}>
            <circle cx={c.x} cy={c.y} r="9" fill="url(#cityGlow)" opacity="0.7"/>
            <circle cx={c.x} cy={c.y} r="2.4" fill="#E04545"/>
            <circle cx={c.x} cy={c.y} r="1.0" fill="#fff"/>
          </g>
        ))}

        {/* Hub connectors + dots */}
        {HUB_CARDS.map((card, i) => {
          const city = hubMap[card.cityName];
          if (!city) return null;
          const d = `M ${city.x} ${city.y} L ${card.anchorJoint.x} ${card.anchorJoint.y} L ${card.lineEndX} ${card.cardY}`;
          return (
            <g key={'h' + i}>
              {/* Animated connector */}
              <path
                d={d}
                fill="none"
                stroke="rgba(224,69,69,0.6)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray="900"
                strokeDashoffset={drawn ? 0 : 900}
                style={{
                  transition: `stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1) ${0.4 + i * 0.25}s`,
                }}
              />
              {/* Card-end dot */}
              <circle
                cx={card.lineEndX} cy={card.cardY} r="3.5"
                fill="#E04545"
                opacity={drawn ? 1 : 0}
                style={{ transition: `opacity .4s ease ${1.6 + i * 0.25}s` }}
              />
              {/* Pulse on city */}
              <circle cx={city.x} cy={city.y} r={city.type === 'XL' ? 14 : 11} className="map-pulse" style={{ animationDelay: `${i * 0.4}s` }}/>
              {/* City glow + core */}
              <circle cx={city.x} cy={city.y} r={city.type === 'XL' ? 28 : 22} fill="url(#hubGlow2)" opacity="0.85"/>
              <circle cx={city.x} cy={city.y} r={city.type === 'XL' ? 6.5 : 5.5} fill="#E04545" stroke="rgba(255,255,255,0.95)" strokeWidth="1.6"/>
              <circle cx={city.x} cy={city.y} r={city.type === 'XL' ? 2.4 : 2} fill="#fff"/>
            </g>
          );
        })}

        {/* City labels (small, near non-hub dots) — desktop only */}
        <g className="map-labels-desktop">
          {cityProj.filter(c => !c.type).map((c, i) => {
            // Label offset depends on coast: left coast → left, right → right
            const isLeftCoast = c.lng < -104;
            const dx = isLeftCoast ? -8 : 8;
            const anchor = isLeftCoast ? 'end' : 'start';
            return (
              <text
                key={'l' + i}
                x={c.x + dx} y={c.y + 3}
                textAnchor={anchor}
                fontFamily="Geist Mono, monospace"
                fontSize="9"
                fill="rgba(255,255,255,0.42)"
                letterSpacing="0.02em"
                style={{
                  opacity: drawn ? 1 : 0,
                  transition: `opacity .8s ease ${1.0 + (i % 10) * 0.04}s`,
                }}
              >{c.name}</text>
            );
          })}
        </g>

        {/* Hub card labels in SVG (visible only on desktop via CSS) */}
        <g className="map-cards-desktop">
          {HUB_CARDS.map((card, i) => {
            const city = hubMap[card.cityName];
            if (!city) return null;
            const isRight = card.side === 'right';
            const anchor = isRight ? 'end' : 'start';
            return (
              <g key={'card' + i}
                opacity={drawn ? 1 : 0}
                style={{ transition: `opacity .6s ease ${1.7 + i * 0.25}s` }}
              >
                {/* City name */}
                <text
                  x={card.textX} y={card.cardY - 18}
                  textAnchor={anchor}
                  fontFamily="Geist, sans-serif"
                  fontSize="17" fontWeight="600"
                  fill="rgba(255,255,255,0.96)"
                  letterSpacing="-0.01em"
                >{lang === 'en' ? card.label.en : card.label.es}</text>
                {/* Positions count */}
                <text
                  x={card.textX} y={card.cardY + 16}
                  textAnchor={anchor}
                  fontFamily="Geist Mono, monospace"
                  fontSize="26" fontWeight="500"
                  fill="rgba(255,255,255,0.98)"
                  letterSpacing="-0.02em"
                >{fmtNum(card.positions)}
                  <tspan fontSize="10" fill="rgba(255,255,255,0.55)" dx="6" letterSpacing="0.1em">{t.map.positions.toUpperCase()}</tspan>
                </text>
                {/* Subline */}
                <text
                  x={card.textX} y={card.cardY + 36}
                  textAnchor={anchor}
                  fontFamily="Geist Mono, monospace"
                  fontSize="9"
                  fill="rgba(224,69,69,0.85)"
                  letterSpacing="0.1em"
                >{(lang === 'en' ? card.sublineEn : card.sublineEs).toUpperCase()}</text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Mobile fallback: card stack rendered below */}
      <div className="map-cards-mobile" style={{
        display: 'none',
        marginTop: 24,
      }}>
        <div className="grid" style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}>
          {HUB_CARDS.map((h, i) => (
            <div key={i} style={{
              padding: 16,
              borderRadius: 12,
              border: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.025)',
            }}>
              <div style={{
                fontSize: 11, fontFamily: 'var(--font-mono)',
                letterSpacing: '0.12em', color: 'var(--accent-heritage)',
                marginBottom: 8,
              }}>{(lang === 'en' ? h.label.en : h.label.es).toUpperCase()}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 22,
                fontWeight: 500, letterSpacing: '-0.02em',
                lineHeight: 1, color: 'var(--text-primary)',
              }}>{fmtNum(h.positions)}</div>
              <div style={{
                fontSize: 9, fontFamily: 'var(--font-mono)',
                letterSpacing: '0.14em', color: 'var(--text-muted)',
                marginTop: 4,
              }}>{t.map.positions.toUpperCase()}</div>
              {h.growth && (
                <div style={{
                  fontSize: 10.5, fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-tech)', marginTop: 6, letterSpacing: '0.05em',
                }}>+{h.growth}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .map-labels-desktop, .map-cards-desktop { display: none; }
          .map-cards-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
}

function MapSection({ lang, t }) {
  const ref = useReveal();
  return (
    <section className="section" id="presencia">
      <div className="container">
        <div ref={ref} className="reveal section-head" style={{ maxWidth: 820 }}>
          <span className="eyebrow"><span className="dot"></span>{t.map.eyebrow}</span>
          <h2>{t.map.title}</h2>
          <p>{t.map.sub}</p>
        </div>

        <MexicoMap lang={lang} t={t} />

        {/* Below-map: CDMX centers strip */}
        <div className="glass" style={{
          marginTop: 20,
          padding: '20px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-mono)', fontSize: 10.5,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--accent-heritage)',
            flexShrink: 0,
          }}>
            <ICONS.pin size={13} /> {t.map.cdmxTitle}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
            {t.map.cdmxList.map((c, i) => (
              <span key={i} style={{
                padding: '5px 11px', borderRadius: 999,
                border: '1px solid var(--border)',
                background: i === 0 ? 'rgba(224,69,69,0.08)' : 'rgba(255,255,255,0.03)',
                fontSize: 11.5, color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)', letterSpacing: '0.02em',
                fontWeight: i === 0 ? 600 : 400,
              }}>{c.split(' · ')[0]}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════ CERTIFICATIONS ═════════════ */
const CERT_BADGES = {
  'ISO 9001':  'assets/cert-iso-9001.jpg',
  'ISO 27001': 'assets/cert-iso-27001.jpg',
};

function CertBadgeArt({ code }) {
  const src = CERT_BADGES[code];
  if (src) {
    return (
      <div style={{
        height: 132,
        background: '#FFFFFF',
        borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 10,
        marginBottom: 16,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
      }}>
        <img src={src} alt={code + ' badge'} style={{
          maxHeight: '100%', maxWidth: '100%',
          objectFit: 'contain',
        }} />
      </div>
    );
  }
  const accents = {
    'PCI DSS':   ['#22D3EE', '#67E8F9'],
    'NMX-R-025': ['#E04545', '#F87171'],
    'REPSE':    ['#F97316', '#FB923C'],
  };
  const [c1, c2] = accents[code] || ['#22D3EE', '#67E8F9'];
  return (
    <div style={{
      height: 132,
      borderRadius: 10,
      background: `radial-gradient(circle at 30% 30%, ${c1}22, transparent 60%), linear-gradient(135deg, #0F1626 0%, #0A0E1A 100%)`,
      border: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 6,
      marginBottom: 16,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `conic-gradient(from 90deg, ${c1}40, ${c2}30, ${c1}30, ${c1}40)`,
        opacity: 0.18,
        animation: 'spin 18s linear infinite',
      }}></div>
      <div style={{
        width: 64, height: 64,
        borderRadius: '50%',
        border: `1.5px solid ${c1}88`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)',
        position: 'relative',
      }}>
        <ICONS.shield size={26} stroke={1.4} style={{ color: c1 }}/>
      </div>
      <div style={{
        position: 'relative',
        fontFamily: 'var(--font-mono)', fontSize: 10,
        letterSpacing: '0.18em',
        color: c1, opacity: 0.85,
      }}>{code.split(' ')[0]}</div>
    </div>
  );
}

function Certs({ t }) {
  const ref = useReveal();
  return (
    <section id="certificaciones" className="section">
      <div className="container">
        <div ref={ref} className="reveal section-head" style={{ maxWidth: 820 }}>
          <span className="eyebrow red"><span className="dot"></span>{t.certs.eyebrow}</span>
          <h2>{t.certs.title}</h2>
          <p>{t.certs.sub}</p>
        </div>

        <div className="grid" style={{
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 14,
        }} id="certs-grid">
          {t.certs.items.map((c, i) => (
            <div key={i} className="cert-card">
              <CertBadgeArt code={c.code} />
              <h4 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{c.code}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 12, margin: '0 0 6px', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{c.name}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 11.5, margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cert-card {
          padding: 18px;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          transition: all .25s ease;
        }
        .cert-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.2); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 1100px) { #certs-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px)  { #certs-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

Object.assign(window, { Sectors, MapSection, Certs });
