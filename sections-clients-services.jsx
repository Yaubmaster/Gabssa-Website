// sections-clients-services.jsx — Clients grid + Services 8-card grid

/* ═════════════ SECTORS / USE CASES GRID ═════════════ */
function Clients({ t }) {
  const ref = useReveal();
  const sectors = t.clients.sectors || [];
  return (
    <section id="clientes" className="section" style={{ paddingTop: 60 }}>
      <div className="container">
        <div ref={ref} className="reveal section-head">
          <span className="eyebrow red"><span className="dot"></span>{t.clients.eyebrow}</span>
          <h2 style={{ textWrap: 'balance' }}>{t.clients.title}</h2>
          <p>{t.clients.sub}</p>
        </div>

        <div className="grid" style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }} id="clients-grid">
          {sectors.map((s, i) => {
            const tone = i % 2 === 0 ? 'cyan' : 'red';
            return (
              <article key={i} className="sector-card" style={{
                padding: '20px 18px',
                borderRadius: 14,
                border: '1px solid var(--border)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))',
                display: 'flex', flexDirection: 'column', gap: 10,
                transition: 'border-color .25s ease, transform .25s ease',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  letterSpacing: '0.16em',
                  color: tone === 'cyan' ? 'var(--accent-tech)' : 'var(--accent-heritage)',
                  textTransform: 'uppercase',
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: tone === 'cyan' ? 'var(--accent-tech)' : 'var(--accent-heritage)',
                    boxShadow: tone === 'cyan' ? '0 0 8px var(--accent-tech)' : '0 0 8px var(--accent-heritage)',
                  }}></span>
                  {s.tag}
                </span>
                <p style={{
                  margin: 0,
                  fontSize: 13.5, lineHeight: 1.5,
                  color: 'var(--text-secondary)',
                }}>{s.desc}</p>
              </article>
            );
          })}
        </div>

        <div style={{
          marginTop: 32,
          padding: '20px 24px',
          borderRadius: 14,
          border: '1px solid var(--border)',
          background: 'rgba(255,255,255,0.02)',
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 11.5,
          letterSpacing: '0.16em',
          color: 'var(--text-secondary)',
        }}>{t.clients.industries}</div>
      </div>

      <style>{`
        .sector-card:hover { border-color: rgba(255,255,255,0.18); transform: translateY(-2px); }
        @media (max-width: 1000px) { #clients-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px)  { #clients-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ═════════════ SERVICES ═════════════ */
function ServiceCard({ svc, idx }) {
  const cardRef = useRef(null);
  const Ico = ICONS[svc.icon] || ICONS.sparkle;
  const handleMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
    cardRef.current.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
  };
  return (
    <article ref={cardRef} className={'svc-card ' + svc.tone} onMouseMove={handleMove}>
      <span className="svc-num">{String(idx + 1).padStart(2, '0')} / 08</span>
      <div className="svc-icon"><Ico size={22} /></div>
      <h3>{svc.title}</h3>
      <ul>
        {svc.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <span className="svc-link">
        {window.__moreLabel || 'Conocer más'} <ICONS.arrow size={14} />
      </span>
    </article>
  );
}

function Services({ t }) {
  const ref = useReveal();
  window.__moreLabel = t.services.more;
  return (
    <section id="servicios" className="section">
      <div className="container">
        <div className="grid services-intro-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 56,
          alignItems: 'center',
          marginBottom: 48,
        }}>
          <div ref={ref} className="reveal" style={{ maxWidth: 600 }}>
            <span className="eyebrow"><span className="dot"></span>{t.services.eyebrow}</span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: '16px 0 18px',
              textWrap: 'balance',
            }}>{t.services.title}</h2>
            <p style={{
              fontSize: 17, lineHeight: 1.55,
              color: 'var(--text-secondary)',
              margin: 0, textWrap: 'pretty',
            }}>{t.services.sub}</p>
          </div>

          <div style={{ maxWidth: 360, marginInlineStart: 'auto', aspectRatio: '1 / 1', position: 'relative' }}>
            <BrandPhoto
              src="assets/brand-3.png"
              alt="Agente Gabssa"
              reveal="right"
            />
          </div>
        </div>

        <div className="grid" style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }} id="services-grid">
          {t.services.items.map((svc, i) => (
            <ServiceCard key={i} svc={svc} idx={i} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .services-intro-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .services-intro-grid > div:last-child { max-width: 320px; margin-inline: auto !important; }
        }
        @media (max-width: 1100px) { #services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { #services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

Object.assign(window, { Clients, Services });
