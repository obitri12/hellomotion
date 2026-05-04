import React from 'react';
import { useCMS } from '../shared';

const ACH_FALLBACK = [
  { icon: 'bi-trophy-fill', title: 'Medali Emas FIKSI', description: 'Festival Inovasi & Kewirausahaan Siswa Nasional', year: '2024' },
  { icon: 'bi-camera-reels', title: 'Nominasi FFI', description: 'Festival Film Indonesia — kategori film pelajar', year: '2023' },
  { icon: 'bi-mortarboard-fill', title: 'Diterima UI, ITB, UGM', description: 'Jalur prestasi & SNBP dengan beasiswa penuh', year: '2024' },
  { icon: 'bi-globe-americas', title: 'Student Exchange Jepang', description: 'Program pertukaran budaya & bahasa tahunan', year: '2025' },
];
const TESTI_FALLBACK = [
  { name: 'Raka Prasetya', role: 'Alumni 2024 · Mahasiswa DKV ITB', quote: '"Di HelloMotion aku belajar bikin film beneran sejak kelas 10. Portofolio itu yang bantu aku masuk ITB jalur prestasi tanpa tes."' },
  { name: 'Alya Syahrani', role: 'Siswa Kelas 11', quote: '"Kelas-nya kayak studio kreatif. Nggak ada PR, tapi justru bikin kami lebih semangat karena semua proyek terasa nyata."' },
  { name: 'Bu Fitri Handayani', role: 'Orang tua alumni', quote: '"Awalnya ragu karena beda dari SMA biasa. Tapi anak saya tumbuh lebih percaya diri, mandiri, dan punya karya yang bisa dibanggakan."' },
];

const Alumni = () => {
  const achievements = useCMS('/achievements?sort=order:asc&status=published', ACH_FALLBACK, (res) => res.data);
  const testimonis = useCMS('/testimonials?sort=order:asc&status=published', TESTI_FALLBACK, (res) => res.data);
  const sec = useCMS('/alumni-section?status=published', {eyebrow:'06 · Alumni & Prestasi ✦',title:'Prestasi tanpa batas, masa depan berkelas.',subtitle:'Alumni kami telah menembus berbagai PTN ternama dan kampus kreatif luar negeri — bersaing di dunia kreatif dengan prestasi nasional yang nyata.'}, (res) => res.data);

  return (
    <section id="alumni" className="section">
      <div className="container">
        <div className="alumni__head">
          <div>
            <span className="section-eyebrow">{sec.eyebrow}</span>
            <h2 className="section-title" dangerouslySetInnerHTML={{__html: (sec.title || '').replace(/masa depan berkelas/g, '<em class="hl-pill hl-yellow">masa depan berkelas.</em>')}} />
          </div>
          <p style={{maxWidth: 380, fontSize: 16}}>{sec.subtitle}</p>
        </div>

        <div className="achievement-strip">
          {achievements.map((a) => (
            <article className="ach-card" key={a.title}>
              <div className="ach-card__medal"><i className={`bi ${a.icon}`}></i></div>
              <h5>{a.title}</h5>
              <p>{a.description || a.desc}</p>
              <span className="ach-card__year">{a.year}</span>
            </article>
          ))}
        </div>

        <div className="testi__grid">
          {testimonis.map((t) => (
            <article className="testi-card" key={t.name}>
              <div className="testi-card__marks">&ldquo;</div>
              <p className="testi-card__quote">{t.quote}</p>
              <div className="testi-card__who">
                <div className="testi-card__avatar">{t.name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
                <div>
                  <strong>{t.name}</strong>
                  <small>{t.role}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Alumni;
