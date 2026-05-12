// sections-end.jsx — About, Cases, Careers, Contact, Footer

/* ═════════════ ABOUT ═════════════ */
function About({ lang, t }) {
  const ref = useReveal();
  return (
    <section id="nosotros" className="section">
      <div className="container">
        {/* Brand photo banner — floating, with white "Quiénes Somos" overlay */}
        <div style={{
          maxWidth: 860,
          margin: '0 auto 12px',
          aspectRatio: '1.65 / 1',
          position: 'relative',
        }}>
          <BrandPhoto
            src="assets/brand-team-quienes.png"
            alt="Equipo Gabssa"
            reveal="up"
          />
          {/* White text overlay — positioned top-left, mirrors original layout */}
          <div className="quienes-overlay" style={{
            position: 'absolute',
            top: '14%', left: '6%',
            zIndex: 5,
            color: '#FFFFFF',
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: 'clamp(28px, 5.5vw, 78px)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            textShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 2px rgba(0,0,0,0.3)',
            pointerEvents: 'none',
          }}>
            {lang === 'en' ? (
              <><div>Who</div><div>We Are</div></>
            ) : (
              <><div>Quiénes</div><div>Somos</div></>
            )}
          </div>
        </div>

        <div className="grid" style={{
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'flex-start',
        }} id="about-grid">

          <div ref={ref} className="reveal">
            <span className="eyebrow"><span className="dot"></span>{t.about.eyebrow}</span>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: '18px 0 30px',
              textWrap: 'balance',
            }}>{t.about.title}</h2>
            {t.about.body.map((p, i) => (
              <p key={i} style={{
                fontSize: 15.5, lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: 18,
                textWrap: 'pretty',
              }}>{p}</p>
            ))}

            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <div style={{
                padding: '14px 18px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.025)',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--text-muted)' }}>HQ</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>Odesa 1110, CDMX</div>
              </div>
              <div style={{
                padding: '14px 18px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.025)',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--text-muted)' }}>RFC</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4, fontFamily: 'var(--font-mono)' }}>GAB-950000-XXX</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-strong" style={{ padding: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 200, height: 200, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)',
              filter: 'blur(20px)', pointerEvents: 'none',
            }}></div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--text-muted)', marginBottom: 4,
            }}>1995 — 2025</div>
            <h3 style={{
              fontSize: 22, fontWeight: 600, margin: '4px 0 28px',
              letterSpacing: '-0.02em',
            }}>{t.about.timelineTitle}</h3>

            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: 4, bottom: 4, left: 9,
                width: 1, background: 'linear-gradient(180deg, var(--accent-heritage), var(--accent-tech))',
                opacity: 0.6,
              }}></div>
              {t.about.milestones.map((m, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '74px 1fr',
                  gap: 20,
                  alignItems: 'flex-start',
                  marginBottom: i === t.about.milestones.length - 1 ? 0 : 22,
                  position: 'relative',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600,
                    color: i >= t.about.milestones.length - 2 ? 'var(--accent-tech)' : 'var(--text-secondary)',
                  }}>
                    <span style={{
                      width: 11, height: 11, borderRadius: '50%',
                      background: i >= t.about.milestones.length - 2 ? 'var(--accent-tech)' : 'var(--accent-heritage)',
                      boxShadow: i >= t.about.milestones.length - 2 ? '0 0 10px var(--accent-tech)' : 'none',
                      flexShrink: 0,
                      border: '2px solid var(--bg-primary)',
                    }}></span>
                    {m.year}
                  </div>
                  <div style={{
                    fontSize: 14, color: 'var(--text-secondary)',
                    lineHeight: 1.5, paddingTop: 0,
                  }}>{m.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          #about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  );
}

/* ═════════════ CASES ═════════════ */
function Cases({ t }) {
  const ref = useReveal();
  return (
    <section id="casos" className="section">
      <div className="container">
        <div ref={ref} className="reveal section-head" style={{ maxWidth: 820 }}>
          <span className="eyebrow"><span className="dot"></span>{t.cases.eyebrow}</span>
          <h2>{t.cases.title}</h2>
          <p>{t.cases.sub}</p>
        </div>

        <div className="grid" style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }} id="cases-grid">
          {t.cases.items.map((c, i) => (
            <article key={i} className="glass-strong" style={{
              padding: 28,
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform .3s ease, border-color .3s ease',
              cursor: 'pointer',
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                position: 'absolute', top: -30, right: -30,
                width: 120, height: 120, borderRadius: '50%',
                background: i % 2 === 0 ? 'radial-gradient(circle, rgba(224,69,69,0.18), transparent 70%)' : 'radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)',
                filter: 'blur(16px)',
              }}></div>
              <div style={{
                display: 'inline-block',
                padding: '5px 11px', borderRadius: 999,
                border: '1px solid var(--border-strong)',
                background: 'rgba(255,255,255,0.04)',
                fontFamily: 'var(--font-mono)', fontSize: 10.5,
                letterSpacing: '0.14em', color: 'var(--text-secondary)',
                marginBottom: 24, position: 'relative',
              }}>{c.tag}</div>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(2rem, 3.6vw, 2.8rem)',
                fontWeight: 500, letterSpacing: '-0.03em',
                lineHeight: 1, marginBottom: 16,
                background: i % 2 === 0 ? 'linear-gradient(135deg, #E04545, #F87171)' : 'linear-gradient(135deg, #22D3EE, #67E8F9)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                position: 'relative',
              }}>{c.metric}</div>

              <h3 style={{
                fontSize: 18, fontWeight: 600, margin: '0 0 12px',
                letterSpacing: '-0.015em', lineHeight: 1.3, position: 'relative',
              }}>{c.headline}</h3>
              <p style={{
                fontSize: 13.5, color: 'var(--text-secondary)',
                lineHeight: 1.55, margin: '0 0 22px',
                position: 'relative',
              }}>{c.desc}</p>

              <span style={{
                fontSize: 13, fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                color: 'var(--text-primary)',
                position: 'relative',
              }}>{t.cases.read} <ICONS.arrow size={14} /></span>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { #cases-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ═════════════ CAREERS ═════════════ */
function Careers({ lang, t }) {
  const ref = useReveal();
  const aiCopy = lang === 'en' ? {
    chipLabel: 'AI RECRUITMENT AGENT',
    title: 'Talk to our AI recruiter',
    sub: 'Coffee & Job is our AI agent for hiring. Available 24/7 on WhatsApp — answers your questions, screens your profile and books your interview.',
    cta: 'Chat on WhatsApp',
    or: 'Or',
    applyForm: 'Apply via form',
  } : {
    chipLabel: 'AGENTE DE RECLUTAMIENTO AI',
    title: 'Habla con nuestro reclutador AI',
    sub: 'Coffee & Job es nuestro agente AI de contratación. Disponible 24/7 por WhatsApp — responde tus dudas, evalúa tu perfil y agenda tu entrevista.',
    cta: 'Chatear por WhatsApp',
    or: 'O bien',
    applyForm: 'Aplica por formulario',
  };
  const COFFEE_WA = '5218112133783';
  const COFFEE_WA_DISPLAY = '+52 81 1213 3783';
  const COFFEE_PRESET = lang === 'en'
    ? '¡Hola! I want to apply to Gabssa. Coffee & Job, can you help me?'
    : '¡Hola Coffee & Job! Quiero aplicar a Gabssa.';
  const waLink = `https://wa.me/${COFFEE_WA}?text=${encodeURIComponent(COFFEE_PRESET)}`;

  return (
    <section id="bolsa" className="section">
      <div className="container">
        <div className="glass-strong" style={{
          padding: 'clamp(28px, 4vw, 48px)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(800px ellipse at 100% 100%, rgba(224,69,69,0.18), transparent 60%)',
            pointerEvents: 'none',
          }}></div>

          <div className="grid careers-grid-top" style={{
            gridTemplateColumns: '1.3fr 1fr',
            gap: 48,
            position: 'relative',
            alignItems: 'center',
            marginBottom: 36,
          }}>
            <div ref={ref} className="reveal">
              <span className="eyebrow red"><span className="dot"></span>{t.careers.eyebrow}</span>
              <h2 style={{
                fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
                fontWeight: 600, lineHeight: 1.05,
                letterSpacing: '-0.03em',
                margin: '18px 0 16px',
                textWrap: 'balance',
              }}>{t.careers.title}</h2>
              <p style={{
                fontSize: 16, color: 'var(--text-secondary)',
                lineHeight: 1.6, margin: '0 0 26px', maxWidth: 500,
                textWrap: 'pretty',
              }}>{t.careers.sub}</p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {t.careers.perks.map((p, i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 11,
                    fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5,
                  }}>
                    <span style={{
                      flexShrink: 0,
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'rgba(34,211,238,0.15)',
                      border: '1px solid rgba(34,211,238,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--accent-tech)',
                      marginTop: 1,
                    }}><ICONS.check size={10} stroke={2.5} /></span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              aspectRatio: '1.3 / 1',
              position: 'relative',
              maxWidth: 460,
              marginInlineStart: 'auto',
            }}>
              <BrandPhoto
                src="assets/brand-careers.png"
                alt="Únete a Gabssa"
                reveal="right"
              />
            </div>
          </div>

          {/* Coffee & Job AI agent banner */}
          <div className="coffee-banner" style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: 24,
            alignItems: 'center',
            padding: '20px 26px',
            borderRadius: 18,
            background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.10) 0%, rgba(255,255,255,0.025) 100%)',
            border: '1px solid rgba(37, 211, 102, 0.28)',
            boxShadow: '0 0 40px -10px rgba(37, 211, 102, 0.25)',
          }}>
            <div style={{
              position: 'relative',
              width: 72, height: 72,
              flexShrink: 0,
              filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.4))',
            }}>
              <img src="assets/coffee-and-job.png" alt="Coffee & Job" style={{
                width: '100%', height: '100%', objectFit: 'contain', display: 'block',
              }}/>
              {/* online indicator */}
              <span style={{
                position: 'absolute', top: 0, right: 0,
                width: 16, height: 16, borderRadius: '50%',
                background: '#25D366',
                border: '2px solid var(--bg-primary)',
                boxShadow: '0 0 0 0 rgba(37,211,102,0.6)',
                animation: 'wa-pulse 2.4s ease-out infinite',
              }}></span>
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#25D366', marginBottom: 6,
              }}>
                <ICONS.sparkle size={11} /> {aiCopy.chipLabel}
              </div>
              <div style={{
                fontSize: 17, fontWeight: 600,
                letterSpacing: '-0.015em', color: 'var(--text-primary)',
                marginBottom: 4,
              }}>{aiCopy.title}</div>
              <div style={{
                fontSize: 13.5, color: 'var(--text-secondary)',
                lineHeight: 1.5, maxWidth: 560,
              }}>{aiCopy.sub}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11.5,
                color: 'var(--text-muted)', marginTop: 6,
                letterSpacing: '0.04em',
              }}>{COFFEE_WA_DISPLAY}</div>
            </div>

            <div className="careers-cta-stack" style={{
              display: 'flex', flexDirection: 'column', gap: 10,
              flexShrink: 0,
            }}>
              <a href={waLink} target="_blank" rel="noreferrer" className="btn-wa">
                <ICONS.whatsapp size={16} /> {aiCopy.cta}
              </a>
              <a href="#contacto" style={{
                fontSize: 12, color: 'var(--text-muted)',
                textDecoration: 'none', textAlign: 'center',
                fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
              }}>{aiCopy.or} → {aiCopy.applyForm}</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); }
          100% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
        }
        .btn-wa {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 12px 20px;
          border-radius: 999px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: #fff;
          font-weight: 600; font-size: 13.5px;
          letter-spacing: -0.01em;
          text-decoration: none;
          box-shadow: 0 8px 24px -6px rgba(37, 211, 102, 0.5);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .btn-wa:hover { transform: translateY(-2px); box-shadow: 0 12px 30px -6px rgba(37, 211, 102, 0.6); }
        @media (max-width: 880px) {
          .careers-grid-top { grid-template-columns: 1fr !important; gap: 24px !important; }
          .careers-grid-top > div:last-child { max-width: 320px; margin: 0 auto; }
          .coffee-banner { grid-template-columns: 1fr !important; gap: 16px !important; text-align: left; }
          .coffee-banner > div:first-child { margin: 0; }
          .careers-cta-stack { width: 100%; }
          .btn-wa { width: 100%; }
        }
      `}</style>
    </section>
  );
}

/* ═════════════ CONTACT ═════════════ */
function Contact({ t }) {
  const ref = useReveal();
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contacto" className="section">
      <div className="container">
        <div ref={ref} className="reveal section-head" style={{ maxWidth: 820 }}>
          <span className="eyebrow"><span className="dot"></span>{t.contact.eyebrow}</span>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.sub}</p>
        </div>

        <div className="grid" style={{
          gridTemplateColumns: '1.3fr 1fr',
          gap: 32,
          alignItems: 'flex-start',
        }} id="contact-grid">

          {/* Form */}
          <form onSubmit={onSubmit} className="glass-strong" style={{ padding: 32 }}>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div><label>{t.contact.form.name}</label><input required type="text" /></div>
              <div><label>{t.contact.form.company}</label><input required type="text" /></div>
              <div><label>{t.contact.form.email}</label><input required type="email" /></div>
              <div><label>{t.contact.form.phone}</label><input type="tel" /></div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>{t.contact.form.sector}</label>
                <select>
                  {t.contact.form.sectorOptions.map((o, i) => <option key={i}>{o}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>{t.contact.form.message}</label>
                <textarea required rows="4"></textarea>
              </div>
            </div>
            <div style={{
              marginTop: 22,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.contact.form.agreement}</span>
              <button type="submit" className="btn-grad" style={{ padding: '12px 22px' }}>
                {sent ? <><ICONS.check size={15} stroke={2.5} /> {t.contact.form.sent}</> : <>{t.contact.form.submit} <ICONS.arrow size={15} /></>}
              </button>
            </div>
          </form>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <InfoCard label={t.contact.info.addressLabel} icon={<ICONS.pin size={15} />}>
              <span style={{ fontSize: 14.5, lineHeight: 1.55 }}>{t.contact.info.address}</span>
            </InfoCard>
            <InfoCard label={t.contact.info.phoneLabel} icon={<ICONS.phone size={15} />}>
              {t.contact.info.phones.map((p, i) => (
                <div key={i} style={{ fontSize: 15, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>{p}</div>
              ))}
            </InfoCard>
            <InfoCard label={t.contact.info.rrhhLabel} icon={<ICONS.users size={15} />}>
              <div style={{ fontSize: 15, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>{t.contact.info.rrhh}</div>
              <a href="https://wa.me/525512045774" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, color: 'var(--accent-tech)',
                textDecoration: 'none', marginTop: 8,
              }}><ICONS.whatsapp size={13} /> wa.me/525512045774</a>
            </InfoCard>
            <InfoCard label={t.contact.info.emailLabel} icon={<ICONS.mail size={15} />}>
              <a href={`mailto:${t.contact.info.email}`} style={{ fontSize: 15, color: 'var(--text-primary)', textDecoration: 'none' }}>{t.contact.info.email}</a>
            </InfoCard>
            <InfoCard label={t.contact.info.socialLabel} icon={<ICONS.globe size={15} />}>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                {[ICONS.instagram, ICONS.facebook, ICONS.linkedin].map((I, i) => (
                  <a key={i} href="#" style={{
                    width: 36, height: 36, borderRadius: 10,
                    border: '1px solid var(--border)',
                    background: 'rgba(255,255,255,0.025)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)', transition: 'all .2s ease',
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                  ><I size={15} /></a>
                ))}
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { #contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function InfoCard({ label, icon, children }) {
  return (
    <div className="glass" style={{ padding: '20px 22px' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10.5,
        letterSpacing: '0.16em', color: 'var(--text-muted)',
        marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8,
      }}>{icon} {label}</div>
      <div style={{ color: 'var(--text-primary)' }}>{children}</div>
    </div>
  );
}

/* ═════════════ FOOTER ═════════════ */
function Footer({ t }) {
  const services = t.services.items.map(s => s.title);
  return (
    <footer>
      <div className="container">
        <div className="grid" style={{
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: 36,
        }} id="footer-grid">

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div className="logo-mark" style={{ width: 44, height: 44 }}></div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>GABSSA</div>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.16em', color: 'var(--text-muted)' }}>GRUPO · 1995</div>
              </div>
            </div>
            <p style={{
              fontSize: 14, color: 'var(--text-secondary)',
              lineHeight: 1.55, margin: '0 0 22px', maxWidth: 320,
            }}>{t.footer.tagline}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[ICONS.instagram, ICONS.facebook, ICONS.linkedin].map((I, i) => (
                <a key={i} href="#" style={{
                  width: 34, height: 34, borderRadius: 9,
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><I size={14} /></a>
              ))}
            </div>
          </div>

          <FooterCol title={t.footer.services} items={services.map(s => [s, '#servicios'])} />
          <FooterCol title={t.footer.company} items={t.footer.companyLinks.map((l, i) => [l, ['#nosotros','#tecnologia','#clientes','#casos','#bolsa','#contacto'][i]])} />
          <FooterCol title={t.footer.legal} items={t.footer.legalLinks.map(l => [l, '#'])} />
        </div>

        <hr className="divider" style={{ margin: '48px 0 24px' }} />

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 18, flexWrap: 'wrap',
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.06em', color: 'var(--text-muted)',
        }}>
          <span>{t.footer.bottom}</span>
          <span>RFC: GAB-950000-XXX · {t.footer.ids}</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) { #footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px) { #footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{
        fontSize: 11, fontFamily: 'var(--font-mono)',
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'var(--text-muted)', marginBottom: 18,
      }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(([label, href], i) => (
          <li key={i}><a href={href}>{label}</a></li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, { About, Cases, Careers, Contact, Footer });
