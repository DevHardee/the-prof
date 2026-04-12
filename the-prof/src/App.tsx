import './App.css'

/* ── Brand Logo Mark ── */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="40" fill="#000" />
      <ellipse cx="30" cy="30" rx="16" ry="20" fill="#fff" />
      <ellipse cx="30" cy="30" rx="8" ry="10" fill="#000" />
      <rect x="44" y="26" width="7" height="20" rx="3.5" fill="#fff" />
      <ellipse cx="47.5" cy="26" rx="3.5" ry="3.5" fill="#fff" />
      <ellipse cx="47.5" cy="24" rx="2" ry="2" fill="#000" />
    </svg>
  )
}

/* ── Ticker items ── */
const tickerItems = [
  { text: 'Think Better', accent: false },
  { text: '✳', accent: 'orange' },
  { text: 'See Clearly', accent: false },
  { text: '⚡', accent: 'blue' },
  { text: 'Move Differently', accent: false },
  { text: '✳', accent: 'orange' },
  { text: 'Knowledge Is Free.', accent: false },
  { text: '⚡', accent: 'blue' },
  { text: 'Growth Is Earned', accent: false },
  { text: '✳', accent: 'orange' },
  { text: 'Charge Your Brain', accent: false },
  { text: '⚡', accent: 'blue' },
  { text: '1 Idea. 1 Decision. 1 Shift.', accent: false },
  { text: '✳', accent: 'orange' },
] as const

/* ── Pillar data ── */
const pillars = [
  {
    num: '01',
    title: 'Clarity',
    desc: 'Most people are not stuck. They are confused. Clarity removes friction. Clarity creates movement.',
  },
  {
    num: '02',
    title: 'Awareness',
    desc: 'Opportunities are not rare. They are simply unseen. Train your mind to notice what others ignore.',
  },
  {
    num: '03',
    title: 'Thinking',
    desc: 'Information is everywhere. Understanding is not. Think deeper. That\'s where the advantage is.',
  },
]

/* ── Topic data ── */
const topics = [
  {
    tag: 'Featured',
    title: 'Think Clearly',
    desc: 'You don\'t need more random information — you need to understand what actually matters. Most people don\'t lack effort, they lack clarity.',
    href: '#',
    featured: true,
  },
  {
    tag: 'Vision',
    title: 'See Opportunities',
    desc: 'Opportunities are everywhere but only visible to a trained mind. If you can\'t see it, you can\'t take it.',
    href: '#',
    featured: false,
  },
  {
    tag: 'Execution',
    title: 'Move With Intention',
    desc: 'Random actions lead to random results. When your thinking is clear, your moves become precise and effective.',
    href: '#',
    featured: false,
  },
  {
    tag: 'Value',
    title: 'Build Real Value',
    desc: 'It\'s not about knowing more — it\'s about knowing what works. Focus on skills that translate into real-life results.',
    href: '#',
    featured: false,
  },
]

/* ── Footer columns ── */
const footerCols = [
  {
    title: 'Brand',
    links: [
      { label: 'About', href: '#' },
      { label: 'Manifesto', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Topics', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Newsletter', href: '#' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Twitter / X', href: '#' },
      { label: 'YouTube', href: '#' },
    ],
  },
]

/* ════════════════════════════════════════
   ROOT COMPONENT
════════════════════════════════════════ */
export default function App() {
  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          <LogoMark className="nav-logo-svg" />
          <div className="nav-logo-text">
            <span className="nav-logo-the">The</span>
            <span className="nav-logo-prof">Prof</span>
            <span className="nav-logo-tagline">Charge your brain</span>
          </div>
        </a>

        <ul className="nav-links">
          <li><a href="#">About</a></li>
          <li><a href="#">Topics</a></li>
          <li><a href="#">Community</a></li>
          <li>
            <a href="#" className="btn-primary nav-cta">
              Join Now
            </a>
          </li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-meta">Charge Your Brain</p>
          <h1 className="hero-h1">
            THINK<br />
            <em>BETTER</em><br />
            SEE CLEARLY<br />
            MOVE<br />
            DIFFERENTLY
          </h1>
          <p className="hero-sub">
            Most people don't lack effort — they lack clarity. The Prof is here
            for those who seek genuine knowledge and are ready to take action
            to grow.
          </p>
          <div className="hero-actions">
            <a href="#" className="btn-primary">Join Us Now</a>
            <a href="#" className="btn-ghost">Explore Topics</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-frame">
            <div className="hero-frame-inner">
              {/* Replace with <img> when real photo is ready */}
              <div className="hero-frame-placeholder" />
            </div>
          </div>
          <span className="hero-ast-orange" aria-hidden="true">✳</span>
          <span className="hero-ast-blue" aria-hidden="true">✳</span>
          <span className="hero-lightning" aria-hidden="true">⚡</span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {/* Doubled for seamless loop */}
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className={[
                'ticker-item',
                item.accent === 'orange' ? 'orange' : '',
                item.accent === 'blue' ? 'blue' : '',
              ].join(' ').trim()}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── PILLARS ── */}
      <section className="pillars">
        <p className="section-label">What We Teach</p>
        <h2 className="section-h2">Clarity Creates Confidence</h2>
        <div className="pillars-grid">
          {pillars.map((p) => (
            <div className="pillar-card" key={p.num}>
              <div className="pillar-num">{p.num}</div>
              <div className="pillar-rule" />
              <div className="pillar-title">{p.title}</div>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATEMENT BAND ── */}
      <section className="statement">
        <h2 className="statement-h2">
          KNOWLEDGE IS <em>FREE.</em>
          <br />
          GROWTH IS EARNED
        </h2>
        <div className="meta-row">
          <div className="meta-item">
            <p className="meta-label">The Truth</p>
            <p className="meta-value">1 Idea</p>
          </div>
          <div className="meta-item">
            <p className="meta-label">The Problem</p>
            <p className="meta-value">1 Decision</p>
          </div>
          <div className="meta-item">
            <p className="meta-label">The Shift</p>
            <p className="meta-value">1 Shift</p>
          </div>
          <div className="meta-item">
            <p className="meta-label">The Result</p>
            <p className="meta-value">Clarity Creates Confidence</p>
          </div>
        </div>
      </section>

      {/* ── TOPICS ── */}
      <section className="topics">
        <p className="section-label">Core Topics</p>
        <h2 className="section-h2" style={{ marginBottom: 0 }}>
          You Need Direction.
        </h2>
        <div className="topics-grid">
          {topics.map((t) => (
            <div
              key={t.title}
              className={`topic-card${t.featured ? ' featured' : ''}`}
            >
              <p className="topic-tag">{t.tag}</p>
              <h3 className="topic-title">{t.title}</h3>
              <p className="topic-desc">{t.desc}</p>
              <a href={t.href} className="topic-arrow">
                {t.featured ? 'Start Here' : 'Explore'}
                <span className="topic-arrow-icon">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="join">
        <p className="section-label light">The Prof Community</p>
        <h2 className="join-h2">
          YOU NEED
          <br />
          <span className="join-ast">
            <span>✳</span> DIRECTION.
          </span>
        </h2>
        <p className="join-sub">
          Stop guessing. The Prof is here for those who seek genuine knowledge
          and are ready to take action to grow.
        </p>
        <a href="#" className="btn-white">Join Us Now</a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span className="footer-logo-the">The</span>
              <span className="footer-logo-prof">Prof</span>
              <span className="footer-logo-tag">Charge your brain</span>
            </div>
          </div>

          <div className="footer-links">
            {footerCols.map((col) => (
              <div className="footer-col" key={col.title}>
                <p className="footer-col-title">{col.title}</p>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 The Prof. All rights reserved.</p>
          <p className="footer-url">WWW.THEPROFHQ.COM</p>
        </div>
      </footer>
    </>
  )
}