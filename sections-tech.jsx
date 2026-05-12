// sections-tech.jsx — Flagship Technology & AI section

/* ═════════════ TECH & AI ═════════════ */
function AgentCard({ agent }) {
  const Ico = ICONS[agent.icon] || ICONS.sparkle;
  return (
    <div className="tech-card-glow">
      <div className="inner" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -30, right: -30,
          width: 140, height: 140, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)',
          filter: 'blur(20px)',
        }}></div>
        <div style={{
          width: 52, height: 52,
          borderRadius: 13,
          background: 'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(34,211,238,0.04))',
          border: '1px solid rgba(34,211,238,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent-tech)',
          boxShadow: '0 0 30px -8px rgba(34,211,238,0.4)',
          marginBottom: 22,
          position: 'relative',
        }}>
          <Ico size={24} />
        </div>
        <h4 style={{
          fontSize: 18, fontWeight: 600, margin: '0 0 12px',
          letterSpacing: '-0.015em', lineHeight: 1.3, position: 'relative',
        }}>{agent.title}</h4>
        <p style={{
          fontSize: 14, color: 'var(--text-secondary)',
          lineHeight: 1.55, margin: 0, position: 'relative',
        }}>{agent.desc}</p>
      </div>
    </div>
  );
}

function StackPill({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '8px 14px',
      borderRadius: 999,
      border: '1px solid var(--border)',
      background: 'rgba(255,255,255,0.025)',
      fontSize: 13, color: 'var(--text-secondary)',
      letterSpacing: '-0.01em', whiteSpace: 'nowrap',
      transition: 'all .2s ease', cursor: 'default',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.45)'; e.currentTarget.style.color = '#fff'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
    >{children}</span>
  );
}

function TechAI({ t }) {
  const ref = useReveal();
  return (
    <section id="tecnologia" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Sectional cyan glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(800px ellipse at 80% 20%, rgba(34,211,238,0.10), transparent 60%), radial-gradient(700px ellipse at 10% 80%, rgba(224,69,69,0.06), transparent 60%)',
        pointerEvents: 'none',
      }}></div>

      <div className="container" style={{ position: 'relative' }}>
        <div ref={ref} className="reveal section-head" style={{ maxWidth: 920 }}>
          <span className="eyebrow"><span className="dot"></span>{t.tech.eyebrow}</span>
          <h2 style={{ textWrap: 'balance' }}>
            {t.tech.title1} <span className="grad-text-cyan">{t.tech.titleAccent}</span>
          </h2>
          <p style={{ maxWidth: 720 }}>{t.tech.sub}</p>
        </div>

        {/* ZONE A — AI AGENTS GRID */}
        <div style={{ marginBottom: 56 }}>
          <h3 style={{
            fontSize: 13,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-tech)',
            margin: '0 0 20px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <ICONS.sparkle size={16} /> {t.tech.agentsTitle}
          </h3>
          <div className="grid" style={{
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 18,
          }} id="agents-grid">
            {t.tech.agents.map((a, i) => <AgentCard key={i} agent={a} />)}
          </div>
        </div>

        {/* ZONE B — TECH STACK */}
        <div style={{ marginBottom: 48 }}>
          <h3 style={{
            fontSize: 13,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-tech)',
            margin: '0 0 20px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <ICONS.layers size={16} /> {t.tech.stackTitle}
          </h3>

          <div className="grid" style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }} id="stack-cols">
            {t.tech.stackCols.map((col, i) => {
              const colorAccent = i === 0 ? 'var(--accent-tech)' : i === 1 ? '#F97316' : 'var(--accent-heritage)';
              return (
                <div key={i} className="glass-strong" style={{ padding: 26 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    paddingBottom: 18, marginBottom: 18,
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: colorAccent, boxShadow: `0 0 10px ${colorAccent}`,
                    }}></span>
                    <span style={{
                      fontSize: 13, fontWeight: 600, letterSpacing: '-0.005em',
                      color: 'var(--text-primary)',
                    }}>{col.title}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {col.items.map((item, j) => <StackPill key={j}>{item}</StackPill>)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ZONE C — DIFFERENTIATOR */}
        <div className="tech-card-glow" style={{
          background: 'linear-gradient(135deg, rgba(34,211,238,0.6), rgba(34,211,238,0.05) 60%, rgba(34,211,238,0.0))',
        }}>
          <div className="inner" style={{
            padding: '36px',
            position: 'relative',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 28,
            alignItems: 'center',
          }} id="diff-callout">
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(600px circle at 100% 50%, rgba(34,211,238,0.12), transparent 60%)',
              pointerEvents: 'none',
            }}></div>

            <div style={{
              width: 72, height: 72,
              borderRadius: 18,
              background: 'linear-gradient(135deg, rgba(34,211,238,0.25), rgba(224,69,69,0.18))',
              border: '1px solid rgba(34,211,238,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
              flexShrink: 0,
              position: 'relative',
              boxShadow: '0 0 50px -8px rgba(34,211,238,0.5)',
            }}>
              <ICONS.bolt size={30} />
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                color: 'var(--accent-tech)',
                marginBottom: 12,
              }}>{t.tech.calloutLabel}</div>
              <p style={{
                fontSize: 18,
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                margin: 0,
                fontWeight: 500,
                letterSpacing: '-0.015em',
                textWrap: 'pretty',
              }}>{t.tech.callout}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #agents-grid, #stack-cols { grid-template-columns: 1fr !important; }
          #diff-callout { grid-template-columns: 1fr !important; padding: 32px !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { TechAI });
