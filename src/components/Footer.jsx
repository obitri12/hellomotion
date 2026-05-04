import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../shared';

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

const Footer = () => {
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
          <a href="#about">Tentang</a>
          <a href="#curriculum">Kurikulum</a>
          <a href="#daftar">PPDB 2026/2027</a>
          <a href="#faq">FAQ</a>
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


export default Footer;
