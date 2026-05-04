import React from 'react';
import { useCMS } from '../shared';

const FACTORY_FALLBACK = [
  { icon: 'bi-camera-reels-fill', name: 'Digital Factory', description: 'Produksi konten digital, sosial media, fotografi komersial.' },
  { icon: 'bi-film', name: 'Animation Factory', description: 'Studio animasi 2D/3D lengkap untuk praktik langsung.' },
  { icon: 'bi-code-slash', name: 'Coding Factory', description: 'Pengembangan software, game, dan produk digital.' },
  { icon: 'bi-image-fill', name: 'Paradise Picture', description: 'Rumah produksi film — proyek nyata bareng praktisi.' },
];
const FACTORY_SEC_FALLBACK = {
  eyebrow: '03 · Creative Factory ✦',
  title: 'Belajar langsung di pusat industri kreatif.',
  description: 'Kami tidak hanya belajar teori. HelloMotion High School Malang menggandeng Digital Factory, Animation Factory, Coding Factory, dan Paradise Picture di Kawasan KEK Singhasari. Siswa mengerjakan proyek langsung bersama para ahli dan terhubung dengan industri kreatif sejak kelas 10.',
  benefit_text: 'Keuntungan nyata: portofolio industri sejak SMA, relasi profesional, & peluang magang di KEK Singhasari — bekal untuk karier kreatif atau studi lanjut.',
};

const Factory = () => {
  const factories = useCMS('/factories?sort=order:asc&status=published', FACTORY_FALLBACK, (res) => res.data);
  const sec = useCMS('/factory-section?status=published', FACTORY_SEC_FALLBACK, (res) => res.data);
  return (
    <section id="factory" className="section factory">
      <div className="container">
        <div className="factory__head">
          <span className="section-eyebrow">{sec.eyebrow}</span>
          <h2 className="section-title" dangerouslySetInnerHTML={{__html: (sec.title || '').replace(/pusat industri/g, '<em class="hl-pill hl-pink">pusat industri</em>')}} />
          <p>{sec.description}</p>
        </div>

        <div className="factory__grid">
          {factories.map((f, i) => (
            <article className="factory-card" key={f.name || i}>
              <span className="factory-card__num">0{i+1}</span>
              <div className="factory-card__icon"><i className={`bi ${f.icon}`}></i></div>
              <h4>{f.name}</h4>
              <p>{f.description || f.desc}</p>
            </article>
          ))}
        </div>

        <div className="factory__benefit">
          <i className="bi bi-award-fill"></i>
          <span>{sec.benefit_text}</span>
        </div>
      </div>
    </section>
  );
};


export default Factory;
