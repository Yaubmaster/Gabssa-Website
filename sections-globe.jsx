// sections-globe.jsx — 3D dotted globe with Mexico highlighted

/* ─── Coarse 72x36 world land mask (5° per cell) ─── */
const WORLD_MASK = [
// 80 cols × 36 rows, '#' = land, '.' = water
"................................................................................", // row 0  : 87.5°N
"...........#####################................................###############", // 1
".......######################################...#######........#################", // 2
"....###############.....#######################################################.", // 3
"...##################.#######################################################...", // 4
"..####################################........###############################...", // 5
"..####################################........#############################....",  // 6
"..###################################........#############################.....",  // 7
"..#################################.........###############################....",  // 8
".###################################.........##########################.......",  // 9
"....################.................########.....######################.......", // 10 : ~37.5°N  ← Mexico starts here
".....##########..................##########..........#############..####.....",   // 11 : ~32.5°N
"......##########.................###########..........##########....####....",    // 12 : ~27.5°N
".......#######..................###########..........########.......###....",     // 13 : ~22.5°N
"........###....................#############..........######.........##....",     // 14 : ~17.5°N
".........###..................############..............#####.........#....",     // 15 : ~12.5°N
"..........###.................############..............#####.........#....",     // 16 : ~7.5°N
"...........####...............#############..............#####........#....",     // 17 : ~2.5°N
"..............######..........############.................####.......#....",     // 18 : ~-2.5°S
"...............#######.........############.................####...........",     // 19 : ~-7.5°S
"................#######........############.................####...........",     // 20 : ~-12.5°S
".................######.........##########..................####...........",     // 21 : ~-17.5°S
".................######.........########.........................####.....",     // 22 : ~-22.5°S
"..................#####..........######...........................####....",     // 23 : ~-27.5°S
"...................####............####...........................####....",     // 24
"...................###...............##...........................##......",     // 25
"...................##................................................#....",     // 26
"...................##............................................###......",     // 27
"....................#.....................................................",     // 28
"...........................................................................",     // 29
"...........................................................................",     // 30
"...........................................................................",     // 31
"...........................................................................",     // 32
"...........................................................................",     // 33
"...........................................................................",     // 34
"...........................................................................",     // 35
];

function isLandLatLng(lat, lng) {
  // lat: -90..90 (positive north), lng: -180..180
  // Map to row: lat 90 → row 0; lat -90 → row 35
  const row = Math.floor(((90 - lat) / 180) * 36);
  const col = Math.floor(((lng + 180) / 360) * 80);
  if (row < 0 || row >= WORLD_MASK.length) return false;
  const r = WORLD_MASK[row];
  if (!r || col < 0 || col >= r.length) return false;
  return r[col] === '#';
}

// Mexico: use the high-fidelity polygon from mexico-poly.js
function isMexico(lat, lng) {
  return window.isInMexico ? window.isInMexico(lat, lng) : false;
}

/* ═════════════ DOT GLOBE ═════════════ */
function DotGlobe() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ rot: -0.5, raf: 0 });

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * DPR;
      canvas.height = rect.height * DPR;
    }
    resize();
    window.addEventListener('resize', resize);

    // Pre-compute dot positions on a Fibonacci sphere
    const N = 4200;
    const dots = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      // Convert to lat/lng
      const lat = Math.asin(y) * 180 / Math.PI;
      const lng = Math.atan2(z, x) * 180 / Math.PI;
      const mexico = isMexico(lat, lng);
      const land = mexico || isLandLatLng(lat, lng);
      if (!land) continue;
      dots.push({ x, y, z, mexico });
    }

    let last = performance.now();
    let prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function frame(t) {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (!prefersReduce) stateRef.current.rot += dt * 0.12;
      const rot = stateRef.current.rot;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const R  = Math.min(W, H) * 0.42;

      // Faint outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34,211,238,0.10)';
      ctx.lineWidth = 1 * DPR;
      ctx.stroke();

      // Faint inner shadow circle for depth
      const grad = ctx.createRadialGradient(cx - R*0.35, cy - R*0.35, R*0.2, cx, cy, R);
      grad.addColorStop(0, 'rgba(34,211,238,0.05)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Sort dots by depth (z after rotation) so front dots paint over back
      const sin = Math.sin(rot), cos = Math.cos(rot);
      const projected = [];
      for (const d of dots) {
        const x = d.x * cos - d.z * sin;
        const z = d.x * sin + d.z * cos;
        const y = d.y;
        projected.push({ x, y, z, mexico: d.mexico });
      }
      projected.sort((a, b) => a.z - b.z);

      // Draw dots
      const mexHits = [];
      for (const p of projected) {
        const px = cx + p.x * R;
        const py = cy - p.y * R;
        const zNorm = (p.z + 1) / 2; // 0 (back) → 1 (front)
        const baseSize = p.mexico ? 1.6 : 0.9;
        const size = baseSize * (0.5 + zNorm * 0.8) * DPR;
        const alpha = p.mexico ? (0.55 + zNorm * 0.45) : (0.15 + zNorm * 0.35);
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        if (p.mexico) {
          ctx.fillStyle = `rgba(224, 69, 69, ${alpha})`;
          if (zNorm > 0.35) mexHits.push({ px, py, zNorm });
        } else {
          ctx.fillStyle = `rgba(180, 210, 230, ${alpha * 0.7})`;
        }
        ctx.fill();
      }

      // Glow over Mexico — pulsing aura behind the cluster
      if (mexHits.length > 4) {
        let mpx = 0, mpy = 0, mz = 0;
        for (const m of mexHits) { mpx += m.px; mpy += m.py; mz += m.zNorm; }
        mpx /= mexHits.length; mpy /= mexHits.length; mz /= mexHits.length;
        const pulse = (Math.sin(t / 700) + 1) / 2;
        const glowR = (44 + pulse * 12) * DPR;
        const g = ctx.createRadialGradient(mpx, mpy, 0, mpx, mpy, glowR);
        g.addColorStop(0, `rgba(224, 69, 69, ${0.35 * mz})`);
        g.addColorStop(0.5, `rgba(224, 69, 69, ${0.12 * mz})`);
        g.addColorStop(1, 'rgba(224, 69, 69, 0)');
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mpx, mpy, glowR, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      stateRef.current.raf = requestAnimationFrame(frame);
    }
    stateRef.current.raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="globe-canvas-inner" style={{ position: 'relative', width: '100%', maxWidth: '100%', height: '100%', minHeight: 460 }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="Globo terráqueo con México resaltado"
      />
    </div>
  );
}

/* ═════════════ GLOBE SECTION ═════════════ */
function GlobeSection({ lang, t }) {
  const ref = useReveal();
  const copy = lang === 'en' ? {
    eyebrow: 'BUILT FOR ENTERPRISE',
    title1: 'Born in Mexico,',
    titleAccent: 'serving the brands that scale globally.',
    sub: 'Our clients are headquartered in Mexico, Germany, Spain and the US. We operate their critical conversations from Mexico City, Monterrey and Guadalajara — with the SLAs, certifications and redundancy that enterprises require.',
    stats: [
      { v: '99.95%', l: 'UPTIME' },
      { v: '< 60s',  l: 'AVG ANSWER TIME' },
      { v: '20+',    l: 'ENTERPRISE CLIENTS' },
      { v: '5',      l: 'CERTIFICATIONS' },
    ],
    countriesLabel: 'CLIENT HEADQUARTERS',
    countries: ['MEXICO', 'UNITED STATES', 'GERMANY', 'SPAIN', 'JAPAN', 'NETHERLANDS', 'KOREA'],
    badges: ['ISO 9001', 'ISO 27001', 'PCI DSS'],
  } : {
    eyebrow: 'CONSTRUIDO PARA ENTERPRISE',
    title1: 'Nacido en México,',
    titleAccent: 'al servicio de las marcas que escalan globalmente.',
    sub: 'Nuestros clientes tienen sede en México, Alemania, España y EE.UU. Operamos sus conversaciones críticas desde Ciudad de México, Monterrey y Guadalajara — con los SLAs, certificaciones y redundancia que las enterprises exigen.',
    stats: [
      { v: '99.95%', l: 'UPTIME' },
      { v: '< 60s',  l: 'TIEMPO DE RESPUESTA' },
      { v: '20+',    l: 'CLIENTES ENTERPRISE' },
      { v: '5',      l: 'CERTIFICACIONES' },
    ],
    countriesLabel: 'SEDES DE CLIENTES',
    countries: ['MÉXICO', 'ESTADOS UNIDOS', 'ALEMANIA', 'ESPAÑA', 'JAPÓN', 'PAÍSES BAJOS', 'COREA'],
    badges: ['ISO 9001', 'ISO 27001', 'PCI DSS'],
  };

  return (
    <section className="section" id="escala" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Backdrop grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at 50% 50%, #000 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, #000 30%, transparent 75%)',
        pointerEvents: 'none',
      }}></div>

      <div className="container" style={{ position: 'relative' }}>
        <div ref={ref} className="reveal" style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 24px' }}>
          <span className="eyebrow"><span className="dot"></span>{copy.eyebrow}</span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            margin: '16px 0 18px',
            textWrap: 'balance',
          }}>
            {copy.title1} <span className="grad-text-cyan">{copy.titleAccent}</span>
          </h2>
          <p style={{
            fontSize: 17, lineHeight: 1.55, color: 'var(--text-secondary)',
            margin: '0 auto', maxWidth: 680, textWrap: 'pretty',
          }}>{copy.sub}</p>
        </div>

        <div style={{ position: 'relative', marginTop: 32 }}>
          {/* Centered globe */}
          <div className="globe-canvas-wrap" style={{ position: 'relative', height: 'min(520px, 70vw)', width: '100%', maxWidth: 800, margin: '0 auto' }}>
            <DotGlobe />
          </div>

          {/* Stats columns — desktop overlay, mobile stacked below */}
          <div className="globe-stats-overlay">
            {/* Left column */}
            <div className="globe-col-left">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ display: 'flex', gap: 3 }}>
                      {[0,1,2,3,4,5].map(j => (
                        <span key={j} style={{
                          width: 4, height: 12,
                          background: (i*6+j) % 7 === 0 ? 'var(--accent-tech)' : 'rgba(34,211,238,0.25)',
                          borderRadius: 1,
                          boxShadow: (i*6+j) % 7 === 0 ? '0 0 6px var(--accent-tech)' : 'none',
                        }}></span>
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
                  {copy.badges.map((b, i) => <span key={i}>{b} <span style={{ color: 'var(--accent-tech)' }}>✓</span></span>)}
                </div>
              </div>
              {copy.stats.map((s, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{s.v}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.18em', color: 'var(--text-muted)', marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="globe-col-right">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--text-muted)', marginBottom: 10 }}>
                {lang === 'en' ? 'NATIONAL HUBS' : 'HUBS NACIONALES'}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 4 }}>3</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 22 }}>
                {lang === 'en' ? 'CDMX · MTY · GDL' : 'CDMX · MTY · GDL'}
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--text-muted)', marginBottom: 12 }}>
                {copy.countriesLabel}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.countries.map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.08em',
                    color: i === 0 ? 'var(--accent-heritage)' : 'var(--text-secondary)',
                    fontWeight: i === 0 ? 600 : 400,
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: i === 0 ? 'var(--accent-heritage)' : 'rgba(255,255,255,0.3)',
                      boxShadow: i === 0 ? '0 0 8px var(--accent-heritage)' : 'none',
                    }}></span>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .globe-stats-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0;
        }
        .globe-col-left, .globe-col-right {
          pointer-events: auto;
          width: 200px;
          padding: 28px 20px;
          min-width: 0;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        @media (max-width: 1100px) {
          .globe-stats-overlay {
            position: static;
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 16px;
            margin-top: 24px;
            padding: 0;
          }
          .globe-col-left, .globe-col-right {
            width: auto;
            padding: 22px 18px;
            background: rgba(255,255,255,0.03);
            border: 1px solid var(--border);
            border-radius: 14px;
          }
        }
        @media (max-width: 640px) {
          .globe-stats-overlay { grid-template-columns: minmax(0, 1fr); }
          .globe-col-left, .globe-col-right { padding: 18px 14px; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { GlobeSection, DotGlobe });
