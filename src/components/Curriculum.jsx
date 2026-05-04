import React from 'react';
import { useCMS } from '../shared';

const CURR_FALLBACK = {
  eyebrow: '02 · Kurikulum ✎',
  title: 'Kurikulum inovatif & dua ijazah.',
  description: 'Kami menggabungkan kurikulum nasional Kemendikbud dengan modifikasi khusus. Lulusan mendapatkan dua ijazah sekaligus: Kemendikbud dan Industri Kreatif — siap terjun ke dunia kerja profesional atau melanjutkan ke PT favorit.',
  diploma_1_title: 'Kemendikbud Ristek',
  diploma_1_desc: 'Ijazah SMA resmi Kurikulum Merdeka — diakui seluruh PTN & PTS di Indonesia.',
  diploma_2_title: 'Industri Kreatif',
  diploma_2_desc: 'Sertifikasi kompetensi kreatif (Filmmaking, Desain, Animasi) untuk jalur industri & freelance.',
  items: [
    { title: 'Keterampilan Abad 21', description: '4C: Critical thinking, Communication, Collaboration, Creativity' },
    { title: 'Design Thinking', description: 'Empati → Ideasi → Prototipe → Tes — terintegrasi di semua mapel' },
    { title: 'STEAM', description: 'Science, Tech, Engineering, Arts & Math dalam proyek lintas disiplin' },
    { title: 'Project Based Learning', description: 'Belajar lewat proyek nyata, output nyata, dampak nyata' },
  ],
};

const Curriculum = () => {
  const c = useCMS('/curriculum-section?status=published', CURR_FALLBACK, (res) => res.data);
  const items = c.items || CURR_FALLBACK.items;

  return (
    <section id="curriculum" className="section curriculum">
      <div className="container curriculum__grid">
        <div>
          <span className="section-eyebrow">{c.eyebrow}</span>
          <h2 className="section-title" dangerouslySetInnerHTML={{__html: (c.title || '').replace(/dua ijazah/g, '<em class="hl-pill hl-yellow">dua ijazah.</em>')}} />
          <p style={{marginTop: 20, fontSize: 17, maxWidth: 520}}>
            {c.description}
          </p>
          <ul className="curr-list">
            {items.map((it, i) => (
              <li key={i}>
                <div className="dot">0{i+1}</div>
                <div>
                  <strong>{it.title || it.t}</strong>
                  <small>{it.description || it.d}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="diploma-stack">
          <div className="diploma diploma--1">
            <span className="diploma__ribbon">IJAZAH 01</span>
            <h4>{c.diploma_1_title}</h4>
            <p>{c.diploma_1_desc}</p>
            <div className="diploma__seal">Resmi</div>
          </div>
          <div className="diploma diploma--2">
            <span className="diploma__ribbon">IJAZAH 02</span>
            <h4>{c.diploma_2_title}</h4>
            <p>{c.diploma_2_desc}</p>
            <div className="diploma__seal" style={{background: 'var(--hm-pink)', boxShadow: '0 0 0 2px var(--hm-pink)'}}>Kreatif</div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Curriculum;
