import React from 'react';
import { STRAPI_URL, useCMS } from '../shared';

const HERO_FALLBACK = {
  badge_text: 'PPDB Tahun Ajaran 2026/2027',
  badge_scribble: 'dibuka!',
  headline: 'MORE THAN JUST HIGH SCHOOL!',
  sub_text: 'Lagi nyari SMA yang bisa mengasah kreativitasmu tapi tetap nggak ketinggalan pelajaran umum? HelloMotion High School Malang jawabannya. Di sini kamu bisa belajar Film Making, Desain Grafis, Ilustrasi, Fotografi, dan banyak lagi — dengan kurikulum yang berpusat pada kebutuhanmu.',
  cta_primary_text: 'Daftar Sekarang — Gratis Biaya Formulir!',
  cta_secondary_text: 'Lihat Program',
  stat_1_value: '2', stat_1_label: 'Ijazah resmi sekaligus',
  stat_2_value: '25%', stat_2_label: 'Diskon SPP gelombang 1',
  stat_3_value: '1:1', stat_3_label: 'Siswa & iPad pribadi',
};

const Hero = () => {
  const h = useCMS('/hero-section?populate=*&status=published', HERO_FALLBACK, (res) => res.data);
  const imgUrl = h.hero_image?.url ? `${STRAPI_URL}${h.hero_image.url}` : '/assets/students.png';

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="hero">
      <div className="hero__shapes" aria-hidden="true">
        <div className="blob blob--mint"></div>
        <div className="blob blob--pink"></div>
        <div className="blob blob--yellow"></div>
        <svg className="squiggle squiggle--1" viewBox="0 0 80 40">
          <path d="M2 20 Q12 2 22 20 T42 20 T62 20 T82 20" stroke="var(--hm-navy)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
        <svg className="squiggle squiggle--2" viewBox="0 0 60 60">
          <path d="M10 40 Q14 20 24 24 Q30 26 28 36 Q26 46 34 48" stroke="var(--hm-navy)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
        <div className="star star--1">★</div>
        <div className="star star--2">✦</div>
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__badge">
            <span className="badge-pill">
              <i className="bi bi-stars"></i> {h.badge_text}
            </span>
            <span className="scribble hero__scribble">{h.badge_scribble}</span>
          </div>

          <h1 className="hero__headline">
            <span>MORE</span>
            <span>THAN</span>
            <span>JUST</span>
            <span><em className="hl-pill hl-pink">HIGH</em></span>
            <span><em className="hl-pill hl-yellow">SCHOOL!</em></span>
            <span style={{fontSize: '0.85em'}}>🚀</span>
          </h1>

          <p className="hero__sub" dangerouslySetInnerHTML={{__html: h.sub_text.replace(/HelloMotion High School Malang/g, '<strong>HelloMotion High School Malang</strong>')}} />

          <div className="hero__ctas">
            <button className="btn btn-primary" onClick={() => go('daftar')}>
              {h.cta_primary_text} <i className="bi bi-arrow-right"></i>
            </button>
            <button className="btn btn-ghost" onClick={() => go('curriculum')}>
              <i className="bi bi-play-circle"></i> {h.cta_secondary_text}
            </button>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>{h.stat_1_value}</strong>
              <span>{h.stat_1_label}</span>
            </div>
            <div className="hero__stat">
              <strong>{h.stat_2_value}</strong>
              <span>{h.stat_2_label}</span>
            </div>
            <div className="hero__stat">
              <strong>{h.stat_3_value}</strong>
              <span>{h.stat_3_label}</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo-wrap">
            <div className="hero__photo-bg"></div>
            <img src={imgUrl} alt="Siswa HelloMotion" className="hero__photo" />
            <div className="hero__chip hero__chip--1">
              <i className="bi bi-lightning-charge-fill"></i>
              <div>
                <small>Gelombang 1</small>
                <strong>Dibuka s/d 30 Juni 2026</strong>
              </div>
            </div>
            <div className="hero__chip hero__chip--2">
              <i className="bi bi-mortarboard-fill"></i>
              <div>
                <small>Kuota terbatas</small>
                <strong>Slot hampir penuh</strong>
              </div>
            </div>
            <div className="hero__pill">✨ Est. 2019</div>
          </div>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee__track">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="marquee__group">
              <span>★ 21<sup>st</sup> Century Skill</span>
              <span>★ Design Thinking</span>
              <span>★ STEAM</span>
              <span>★ Project Based Learning</span>
              <span>★ Creative Factory</span>
              <span>★ Double Diploma</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Hero;
