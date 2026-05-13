// sections-top.jsx — Navbar, Hero, Marquee, Metrics
const { useState, useEffect, useRef } = React;

/* ─── Shared viewport-watcher (scroll-listener based for max compatibility) ─── */
const __revealWatchers = [];
function __isInViewport(el, margin = 80) {
  const r = el.getBoundingClientRect();
  const h = window.innerHeight || document.documentElement.clientHeight;
  return r.top < h - margin && r.bottom > margin;
}
function __runWatchers() {
  for (let i = __revealWatchers.length - 1; i >= 0; i--) {
    const w = __revealWatchers[i];
    if (w.el && __isInViewport(w.el, w.margin)) {
      w.fire();
      __revealWatchers.splice(i, 1);
    }
  }
}
if (typeof window !== 'undefined' && !window.__revealInit) {
  window.__revealInit = true;
  window.addEventListener('scroll', __runWatchers, { passive: true });
  window.addEventListener('resize', __runWatchers, { passive: true });
  // Also tick a few times in case scroll never happens
  setInterval(__runWatchers, 250);
}

/* ─── Scroll Reveal hook ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fire = () => el.classList.add('in');
    if (__isInViewport(el, 0)) { fire(); return; }
    const w = { el, margin: 60, fire };
    __revealWatchers.push(w);
    // immediate kick
    setTimeout(__runWatchers, 30);
    return () => {
      const i = __revealWatchers.indexOf(w);
      if (i >= 0) __revealWatchers.splice(i, 1);
    };
  }, []);
  return ref;
}

/* ─── Counter hook ─── */
function useCountUp(target, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const fire = () => {
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (__isInViewport(el, 0)) { fire(); return; }
    const w = { el, margin: 80, fire };
    __revealWatchers.push(w);
    setTimeout(__runWatchers, 30);
    return () => {
      const i = __revealWatchers.indexOf(w);
      if (i >= 0) __revealWatchers.splice(i, 1);
    };
  }, [target, duration]);
  return [val, ref];
}

const fmtNum = (n) => n.toLocaleString('en-US');

/* ═════════════ NAVBAR ═════════════ */
function Navbar({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['#servicios',  t.nav.services],
    ['#tecnologia', t.nav.tech],
    ['#sectores',   t.nav.sectors],
    ['#clientes',   t.nav.clients],
    ['#nosotros',   t.nav.about],
    ['#casos',      t.nav.cases],
    ['#contacto',   t.nav.contact],
  ];

  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
      <div className="nav-inner">
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div className="logo-mark"></div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>GABSSA</span>
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.22em', color: 'var(--text-secondary)', marginTop: 3 }}>GRUPO · 1995</span>
          </div>
        </a>

        <div className="nav-links">
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="lang-pill" role="tablist" aria-label="Language">
            <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <a href="#contacto" className="btn-grad nav-cta" style={{ padding: '10px 18px', fontSize: 13.5 }}>
            <ICONS.calendar size={15} /> {t.nav.cta}
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{ display: 'none', background: 'transparent', border: 0, color: 'var(--text-primary)', cursor: 'pointer' }}
            className="mobile-menu-btn"
          >
            <ICONS.menu />
          </button>
        </div>
      </div>

      {/* Mobile drawer — anchored to top-right under navbar */}
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(5, 7, 13, 0.55)',
            backdropFilter: 'blur(8px) saturate(120%)',
            WebkitBackdropFilter: 'blur(8px) saturate(120%)',
            zIndex: 100,
            animation: 'fadeIn .2s ease',
          }}>
          <div style={{
            position: 'absolute',
            top: scrolled ? 64 : 76,
            right: 14,
            width: 'min(340px, calc(100vw - 28px))',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            background: 'linear-gradient(180deg, rgba(22,28,46,0.96) 0%, rgba(12,16,28,0.96) 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 18,
            padding: 18,
            boxShadow: '0 30px 80px -20px rgba(0,0,0,0.9), 0 0 60px -20px rgba(34,211,238,0.2)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            animation: 'popInCorner .25s cubic-bezier(0.16, 1, 0.3, 1)',
            transformOrigin: 'top right',
          }}>
            <div style={{
              display: 'flex', flexDirection: 'column',
            }}>
              {links.map(([href, label], i) => (
                <a key={href} href={href} onClick={() => setOpen(false)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  color: 'var(--text-primary)', textDecoration: 'none',
                  fontSize: 15.5, fontWeight: 500, letterSpacing: '-0.01em',
                  padding: '13px 10px',
                  borderRadius: 10,
                  transition: 'background .15s ease',
                }}
                  onTouchStart={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onTouchEnd={(e) => e.currentTarget.style.background = 'transparent'}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>{label}</span>
                  <ICONS.chevron size={13} stroke={1.8} />
                </a>
              ))}
            </div>

            <div style={{
              marginTop: 12, paddingTop: 14,
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '4px 6px 4px 10px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10.5,
                  letterSpacing: '0.16em', color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}>Idioma</span>
                <div className="lang-pill" style={{ display: 'inline-flex' }}>
                  <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
                  <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
                </div>
              </div>
              <a href="#contacto" onClick={() => setOpen(false)} className="btn-grad" style={{ width: '100%', justifyContent: 'center', padding: '12px 18px', fontSize: 14 }}>
                <ICONS.calendar size={15} /> {t.nav.cta}
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popInCorner { from { opacity: 0; transform: translateY(-8px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (max-width: 880px) {
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; border: 1px solid var(--border) !important; background: rgba(255,255,255,0.04) !important; }
          .nav-cta { display: none !important; }
          .btn-grad-desktop-only { display: none; }
          .nav .lang-pill { padding: 2px; font-size: 11px; }
          .nav .lang-pill button { padding: 5px 9px; }
        }
        @media (max-width: 380px) {
          .nav-inner { gap: 10px !important; padding: 0 14px !important; }
          .nav .lang-pill button { padding: 5px 7px; }
        }
      `}</style>
    </nav>
  );
}

/* ═════════════ HERO ═════════════ */
const HERO_PHOTOS = [
  'assets/brand-1.png',
  'assets/brand-3.png',
  'assets/brand-4.png',
];

function HeroPhotoCarousel() {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_PHOTOS.length), 3000);
    return () => clearInterval(t);
  }, [hover]);

  return (
    <div
      className="hero-photo"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 460,
        marginInline: 'auto',
        aspectRatio: '1 / 1',
      }}
    >
      {/* Red bloom backdrop */}
      <div style={{
        position: 'absolute', inset: '-8%',
        background: 'radial-gradient(circle at 50% 55%, rgba(224,69,69,0.30), rgba(224,69,69,0.08) 38%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 0,
        pointerEvents: 'none',
      }}></div>

      {/* White paper bubble */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 24px 60px -16px rgba(0,0,0,0.55), 0 0 50px -16px rgba(224,69,69,0.25)',
        zIndex: 1,
      }}>
        {/* Editorial corner ticks */}
        {[['10px', '10px', null, null], [null, '10px', '10px', null], ['10px', null, null, '10px'], [null, null, '10px', '10px']].map((edges, i) => {
          const [t, l, b, r] = edges;
          return (
            <span key={i} style={{
              position: 'absolute',
              top: t || 'auto', left: l || 'auto', bottom: b || 'auto', right: r || 'auto',
              width: 12, height: 12,
              borderTop:    t ? '1.5px solid #E04545' : 'none',
              borderLeft:   l ? '1.5px solid #E04545' : 'none',
              borderBottom: b ? '1.5px solid #E04545' : 'none',
              borderRight:  r ? '1.5px solid #E04545' : 'none',
              opacity: 0.55,
              zIndex: 3,
            }}></span>
          );
        })}

        {HERO_PHOTOS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Equipo Gabssa"
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%', height: '100%',
              objectFit: 'contain',
              padding: 14,
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? 'scale(1)' : 'scale(0.985)',
              transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 1.0s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        ))}
      </div>

      {/* Progress pips */}
      <div style={{
        position: 'absolute', bottom: -16, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 6,
        zIndex: 2,
      }}>
        {HERO_PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Foto ${i + 1}`}
            style={{
              width: i === idx ? 22 : 6,
              height: 6,
              borderRadius: 999,
              border: 0,
              background: i === idx ? 'var(--accent-heritage)' : 'rgba(255,255,255,0.25)',
              cursor: 'pointer',
              transition: 'all .4s cubic-bezier(0.4, 0, 0.2, 1)',
              padding: 0,
              boxShadow: i === idx ? '0 0 12px rgba(224,69,69,0.5)' : 'none',
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}

function Hero({ t }) {
  const ref = useReveal();
  return (
    <section id="top" style={{ position: 'relative', paddingTop: 96, paddingBottom: 56, overflow: 'hidden' }}>
      <div className="mesh-hero"><div className="blob"></div></div>
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.45, zIndex: 1, maskImage: 'radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%)' }}></div>
      <div className="noise"></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: 48,
          alignItems: 'center',
        }}>
          <div ref={ref} className="reveal hero-text">
            <h1 style={{
              fontSize: 'clamp(2.1rem, 4.4vw, 4.0rem)',
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              margin: '0 0 22px',
              textWrap: 'balance',
            }}>
              {t.hero.title1} <span className="grad-text">{t.hero.titleAccent}</span>{t.hero.title2}
            </h1>
            <p style={{
              fontSize: 'clamp(15px, 1.25vw, 17.5px)',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: 540,
              margin: '0 0 30px',
              textWrap: 'pretty',
            }}>{t.hero.sub}</p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#contacto" className="btn-grad"><ICONS.calendar size={16} /> {t.hero.cta1}</a>
              <a href="#clientes" className="btn-ghost">{t.hero.cta2} <ICONS.arrow size={16} /></a>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
              {[
                ['ISO 9001', 'cyan'],
                ['ISO 27001', 'red'],
                ['PCI DSS', 'cyan'],
                ['NMX-R-025', 'red'],
                ['REPSE', 'cyan'],
              ].map(([code, tone]) => (
                <span key={code} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '5px 11px', borderRadius: 999,
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.025)',
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.05em',
                  color: 'var(--text-secondary)',
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: tone === 'cyan' ? 'var(--accent-tech)' : 'var(--accent-heritage)',
                    boxShadow: tone === 'cyan' ? '0 0 8px var(--accent-tech)' : '0 0 8px var(--accent-heritage)',
                  }}></span>
                  {code}
                </span>
              ))}
            </div>
          </div>

          <HeroPhotoCarousel />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, marginTop: 56 }}>
        <p style={{
          textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11.5,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)',
          marginBottom: 26,
        }}>{t.hero.trust}</p>
        <ClientsMarquee />
      </div>

      <style>{`
        @media (max-width: 880px) {
          #top { padding-top: 84px !important; padding-bottom: 36px !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hero-text { order: 1; }
          .hero-photo { order: 2; max-width: 360px !important; margin: 0 auto !important; }
        }
        @media (max-width: 480px) {
          #top { padding-top: 78px !important; padding-bottom: 28px !important; }
        }
      `}</style>
    </section>
  );
}

/* ═════════════ FLOATING BRAND PHOTO ═════════════ */
function BrandPhoto({ src, alt, reveal = 'up', maxHeight = 'auto', glow = 'red' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const initialTransform = {
    up:    'translateY(40px)',
    right: 'translateX(40px)',
    left:  'translateX(-40px)',
  }[reveal] || 'translateY(40px)';
  const glowColor = glow === 'cyan' ? 'rgba(34,211,238,0.28)' : 'rgba(224,69,69,0.28)';

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        opacity: shown ? 1 : 0,
        transform: shown ? 'translate(0, 0)' : initialTransform,
        transition: 'opacity .9s cubic-bezier(0.22, 1, 0.36, 1), transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div style={{
        position: 'absolute', inset: '8%',
        background: `radial-gradient(circle at 50% 55%, ${glowColor}, transparent 65%)`,
        filter: 'blur(36px)',
        zIndex: 0,
      }}></div>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          position: 'relative',
          width: '100%',
          height: maxHeight,
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(224,69,69,0.12))',
          zIndex: 1,
        }}
      />
    </div>
  );
}

Object.assign(window, { BrandPhoto, HeroPhotoCarousel });

/* ═════════════ CLIENTS MARQUEE ═════════════ */
function ClientsMarquee() {
  const items = window.TECH_STACK || [];
  const tile = (c, key) => c.logo ? (
    <div key={key} className={'logo-tile in-marquee logo-img-tile' + (c.color ? ' logo-color' : '') + (c.svg ? ' logo-svg-white' : '')} title={c.name}>
      <img src={c.logo} alt={c.name} />
    </div>
  ) : (
    <div key={key} className="logo-tile in-marquee">{c.name}</div>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((c, i) => tile(c, `a-${i}`))}
        {items.map((c, i) => tile(c, `b-${i}`))}
      </div>
    </div>
  );
}

/* ═════════════ METRICS ═════════════ */
function MetricItem({ value, suffix, label }) {
  const [n, ref] = useCountUp(value);
  return (
    <div ref={ref} style={{
      padding: '28px 24px',
      textAlign: 'left',
      borderRight: '1px solid var(--border)',
      position: 'relative',
    }} className="metric-cell">
      <div className="counter">
        {fmtNum(n)}<span style={{ color: 'var(--accent-tech)' }}>{suffix}</span>
      </div>
      <div style={{
        marginTop: 12,
        fontSize: 13.5,
        color: 'var(--text-secondary)',
        lineHeight: 1.4,
        textWrap: 'balance',
      }}>{label}</div>
    </div>
  );
}

function Metrics({ t }) {
  return (
    <section style={{ padding: '20px 0 40px', position: 'relative' }}>
      <div className="container">
        <div className="glass-strong" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          overflow: 'hidden',
          position: 'relative',
        }} id="metrics-strip">
          {t.metrics.items.map((m, i) => (
            <MetricItem key={i} {...m} />
          ))}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(800px ellipse at 50% 120%, rgba(34,211,238,0.12), transparent 50%)',
          }}></div>
        </div>
      </div>
      <style>{`
        #metrics-strip .metric-cell:last-child { border-right: 0 !important; }
        @media (max-width: 900px) {
          #metrics-strip { grid-template-columns: repeat(2, 1fr) !important; }
          #metrics-strip .metric-cell { border-right: 1px solid var(--border) !important; border-bottom: 1px solid var(--border); }
          #metrics-strip .metric-cell:nth-child(2n) { border-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { Navbar, Hero, ClientsMarquee, Metrics, useReveal, useCountUp });
