import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
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
    ['Fasilitas', 'life'],
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
          <img src="/assets/logo.png" alt="HelloMotion High School" style={{height: 40, width: 'auto'}} />
        </a>

        <div className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          {links.map(([label, id]) => (
            <button key={id} className="nav__link" onClick={() => go(id)}>{label}</button>
          ))}
          <Link to="/blog" className="nav__link">Blog</Link>
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


export default Nav;
