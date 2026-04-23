const Nav = ({ onOpenTweaks }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Tentang', 'about'],
    ['Kurikulum', 'curriculum'],
    ['Creative Factory', 'factory'],
    ['Kehidupan', 'life'],
    ['Alumni', 'alumni'],
    ['FAQ', 'faq'],
  ];

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a className="nav__brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="nav__logomark">
            <svg viewBox="0 0 40 40" width="40" height="40">
              <circle cx="20" cy="20" r="19" fill="var(--hm-yellow)" />
              <circle cx="14" cy="17" r="2.2" fill="var(--hm-navy)" />
              <circle cx="26" cy="17" r="2.2" fill="var(--hm-navy)" />
              <path d="M13 24 Q20 30 27 24" stroke="var(--hm-navy)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          <span className="nav__wordmark">
            <strong>HelloMotion</strong>
            <small>High School Malang</small>
          </span>
        </a>

        <div className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          {links.map(([label, id]) => (
            <button key={id} className="nav__link" onClick={() => go(id)}>{label}</button>
          ))}
          <button className="btn btn-primary btn-sm nav__cta" onClick={() => go('daftar')}>
            Daftar PPDB <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        <button className="nav__burger" onClick={() => setOpen(o => !o)} aria-label="menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
};

Object.assign(window, { Nav });
