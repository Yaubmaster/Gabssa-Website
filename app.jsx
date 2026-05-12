// app.jsx — App shell

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      height: 2, width: pct + '%',
      background: 'linear-gradient(90deg, #E04545, #F97316, #22D3EE)',
      zIndex: 200, transition: 'width .1s linear',
      boxShadow: '0 0 12px rgba(34,211,238,0.5)',
    }}></div>
  );
}

function CookieBanner({ t }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const dismissed = localStorage.getItem('gabssa-cookies');
    if (!dismissed) setTimeout(() => setShow(true), 1500);
  }, []);
  if (!show) return null;
  return (
    <div className="glass-strong cookie">
      <div style={{ flex: 1 }}>{t.cookie.text}</div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button onClick={() => { localStorage.setItem('gabssa-cookies', 'essential'); setShow(false); }} className="btn-ghost" style={{ padding: '9px 16px', fontSize: 13 }}>{t.cookie.decline}</button>
        <button onClick={() => { localStorage.setItem('gabssa-cookies', 'all'); setShow(false); }} className="btn-grad" style={{ padding: '10px 18px', fontSize: 13 }}>{t.cookie.accept}</button>
      </div>
    </div>
  );
}

function CoffeeBubble({ lang }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  useEffect(() => { setTimeout(() => setShown(true), 2400); }, []);

  const copy = lang === 'en' ? {
    chip: 'AI RECRUITMENT AGENT',
    title: 'Apply to Gabssa',
    sub: 'Coffee & Job — our AI recruiter. Answers in seconds, 24/7.',
    cta: 'Chat on WhatsApp',
    nudge: '¿Looking for a job?',
  } : {
    chip: 'AGENTE AI DE RECLUTAMIENTO',
    title: 'Postula a Gabssa',
    sub: 'Coffee & Job — nuestro reclutador AI. Responde en segundos, 24/7.',
    cta: 'Chatear por WhatsApp',
    nudge: '¿Buscas trabajo?',
  };

  const WA = '5218112133783';
  const preset = lang === 'en'
    ? '¡Hola Coffee & Job! I want to apply to Gabssa.'
    : '¡Hola Coffee & Job! Quiero aplicar a Gabssa.';
  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(preset)}`;

  if (!shown) return null;
  return (
    <>
      {/* Tooltip card */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            bottom: 92, right: 20,
            zIndex: 70,
            width: 'min(320px, calc(100vw - 40px))',
            padding: 18,
            borderRadius: 18,
            background: 'linear-gradient(180deg, rgba(20,26,42,0.97) 0%, rgba(12,16,28,0.97) 100%)',
            border: '1px solid rgba(37, 211, 102, 0.35)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            boxShadow: '0 30px 80px -20px rgba(0,0,0,0.8), 0 0 50px -10px rgba(37,211,102,0.3)',
            animation: 'cb-pop .25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{
              width: 46, height: 46,
              flexShrink: 0,
              position: 'relative',
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))',
            }}>
              <img src="assets/coffee-and-job.png" alt="" style={{
                width: '100%', height: '100%', objectFit: 'contain', display: 'block',
              }}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 9.5,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#25D366', marginBottom: 4,
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
                <ICONS.sparkle size={10} /> {copy.chip}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2, letterSpacing: '-0.01em' }}>{copy.title}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{copy.sub}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                width: 26, height: 26, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0,
              }}><ICONS.close size={12} /></button>
          </div>
          <a href={waLink} target="_blank" rel="noreferrer" className="btn-wa" style={{ marginTop: 14, width: '100%' }}>
            <ICONS.whatsapp size={15} /> {copy.cta}
          </a>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10.5,
            color: 'var(--text-muted)', marginTop: 10, textAlign: 'center',
            letterSpacing: '0.06em',
          }}>+52 81 1213 3783</div>
        </div>
      )}

      {/* Nudge bubble (shows once before first open) */}
      {!open && shown && (
        <div style={{
          position: 'fixed', bottom: 96, right: 92, zIndex: 69,
          padding: '8px 14px',
          borderRadius: '14px 14px 4px 14px',
          background: '#FFFFFF',
          color: '#0F1626',
          fontSize: 12.5, fontWeight: 500,
          boxShadow: '0 12px 30px -8px rgba(0,0,0,0.4)',
          animation: 'cb-nudge 6s ease-out',
          pointerEvents: 'none',
          opacity: 0,
        }} className="coffee-nudge">{copy.nudge}</div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Coffee & Job AI recruiter"
        style={{
          position: 'fixed',
          bottom: 20, right: 20,
          zIndex: 70,
          width: 66, height: 66,
          borderRadius: '50%',
          background: 'transparent',
          border: 0,
          padding: 0,
          cursor: 'pointer',
          filter: 'drop-shadow(0 12px 22px rgba(0,0,0,0.45)) drop-shadow(0 0 24px rgba(37,211,102,0.35))',
          transition: 'transform .2s ease',
          animation: 'cb-in .5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img src="assets/coffee-and-job.png" alt="Coffee & Job" style={{
          width: '100%', height: '100%', objectFit: 'contain', display: 'block',
        }}/>
        <span style={{
          position: 'absolute', top: 2, right: 2,
          width: 14, height: 14, borderRadius: '50%',
          background: '#25D366',
          border: '2px solid var(--bg-primary)',
          animation: 'wa-pulse 2.4s ease-out infinite',
        }}></span>
      </button>

      <style>{`
        @keyframes cb-in { from { transform: scale(0) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
        @keyframes cb-pop { from { opacity: 0; transform: translateY(8px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes cb-nudge {
          0%   { opacity: 0; transform: translateX(8px); }
          12%  { opacity: 1; transform: translateX(0); }
          80%  { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(8px); }
        }
        .coffee-nudge { animation: cb-nudge 6s ease-out forwards; }
        @keyframes wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
          100% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
        }
        @media (max-width: 600px) {
          .coffee-nudge { display: none; }
        }
      `}</style>
    </>
  );
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('gabssa-lang') || 'es');
  useEffect(() => {
    localStorage.setItem('gabssa-lang', lang);
    document.documentElement.lang = lang;
    window.__lang = lang;
  }, [lang]);
  const t = I18N[lang];

  return (
    <>
      <ScrollProgress />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Metrics t={t} />
        <Clients t={t} />
        <Services t={t} />
        <TechAI t={t} />
        <GlobeSection lang={lang} t={t} />
        <Sectors t={t} />
        <MapSection lang={lang} t={t} />
        <Certs t={t} />
        <About lang={lang} t={t} />
        <Cases t={t} />
        <Careers lang={lang} t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <CookieBanner t={t} />
      <CoffeeBubble lang={lang} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
