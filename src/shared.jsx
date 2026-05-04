import React from 'react';
import { Link } from 'react-router-dom';

export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const API = `${STRAPI_URL}/api`;

export async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${API}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`CMS fetch failed: ${endpoint}`, err.message);
    return null;
  }
}

export function useCMS(endpoint, fallback, transform) {
  const [data, setData] = React.useState(fallback);
  React.useEffect(() => {
    let cancelled = false;
    fetchAPI(endpoint).then(res => {
      if (cancelled || !res) return;
      const d = transform ? transform(res) : res.data;
      if (d) setData(d);
    });
    return () => { cancelled = true; };
  }, []);
  return data;
}

/* ── Nav (shared) ─────────────────────────── */
export const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Tentang', '/#about'],
    ['Kurikulum', '/#curriculum'],
    ['Creative Factory', '/#factory'],
    ['Fasilitas', '/#life'],
    ['Alumni', '/#alumni'],
    ['FAQ', '/#faq'],
  ];

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <Link className="nav__brand" to="/">
          <img src="/assets/logo.png" alt="HelloMotion High School" style={{height: 40, width: 'auto'}} />
        </Link>

        <div className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          {links.map(([label, href]) => (
            <a key={href} className="nav__link" href={href}>{label}</a>
          ))}
          <Link to="/blog" className="nav__link" style={{color: 'var(--hm-pink)', fontWeight: 700}}>Blog</Link>
          <a className="btn btn-primary btn-sm nav__cta" href="/#daftar">
            Daftar PPDB <i className="bi bi-arrow-right"></i>
          </a>
        </div>

        <button className="nav__burger" onClick={() => setOpen(o => !o)} aria-label="menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
};

/* ── Footer (shared) ─────────────────────────── */
const SITE_FALLBACK = {
  school_name: 'HelloMotion High School Malang',
  tagline: 'SMA kreatif pertama di Indonesia. Membentuk generasi kreatif, kritis, dan berbudi pekerti — siap jadi pemimpin di abad 21.',
  whatsapp: '6282289991200',
  instagram: 'hellomotion.malang',
  tiktok: '',
  youtube: '',
  website: 'hellomotion.sch.id',
  address: 'Gedung Malang Creative Center (MCC)\nLantai 5, Kawasan KEK Singhasari\nMalang, Jawa Timur',
  footer_text: '© 2026 HelloMotion High School. All rights reserved.',
};

export const Footer = () => {
  const s = useCMS('/site-setting?status=published', SITE_FALLBACK, (res) => res.data);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/assets/logo.png" alt="HelloMotion High School" style={{height: 48, width: 'auto', marginBottom: 12}} />
          <h4>{s.school_name}</h4>
          <p>{s.tagline}</p>
          <div className="footer__social">
            {s.instagram && <a href={`https://instagram.com/${s.instagram}`} target="_blank" rel="noopener" aria-label="Instagram"><i className="bi bi-instagram"></i></a>}
            {s.tiktok && <a href={`https://tiktok.com/@${s.tiktok}`} target="_blank" rel="noopener" aria-label="TikTok"><i className="bi bi-tiktok"></i></a>}
            {s.youtube && <a href={s.youtube} target="_blank" rel="noopener" aria-label="YouTube"><i className="bi bi-youtube"></i></a>}
            {s.whatsapp && <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>}
          </div>
        </div>
        <div className="footer__col">
          <h5>Kontak</h5>
          {s.whatsapp && <a href={`https://wa.me/${s.whatsapp}`}>WA: {s.whatsapp.replace(/^62/, '0').replace(/(\d{4})(\d{4})(\d+)/, '$1 $2 $3')}</a>}
          {s.instagram && <a href={`https://instagram.com/${s.instagram}`}>@{s.instagram}</a>}
          {s.website && <a href={`https://${s.website}`}>{s.website}</a>}
        </div>
        <div className="footer__col">
          <h5>Alamat</h5>
          <p>{(s.address || '').split('\n').map((line, i) => <React.Fragment key={i}>{line}{i < (s.address || '').split('\n').length - 1 && <br/>}</React.Fragment>)}</p>
        </div>
        <div className="footer__col">
          <h5>Info</h5>
          <a href="/#about">Tentang</a>
          <a href="/#curriculum">Kurikulum</a>
          <a href="/#daftar">PPDB 2026/2027</a>
          <a href="/#faq">FAQ</a>
          <Link to="/blog">Blog</Link>
        </div>
      </div>
      <div className="container footer__copy">
        <span>{s.footer_text}</span>
        <span>Dibuat dengan ♥ di Malang.</span>
      </div>
    </footer>
  );
};
