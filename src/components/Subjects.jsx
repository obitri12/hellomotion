import React from 'react';
import { useCMS } from '../shared';

const SUBJECTS_FALLBACK = {
  creative: ['Fotografi', 'Desain Grafis', 'Ilustrasi', 'Animasi', 'Filmmaking'],
  academic: ['Ekonomi', 'Matematika', 'Bhs Inggris', 'Bhs Jepang', 'Entrepreneurship', 'IPS/IPA Terintegrasi'],
};
const SUBJ_SEC_FALLBACK = {
  eyebrow: '04 · Mata Pelajaran ★',
  title: 'Seimbang antara kreativitas & akademik.',
  subtitle: 'Lebih banyak praktik daripada teori. Pelajaran umum di HelloMotion pun seru, aplikatif, dan tidak pernah PR.',
  creative_label: 'Mapel Khas', creative_title: 'Untuk melatih cipta & rasa.',
  creative_desc: 'Mata pelajaran spesialisasi industri kreatif — diajar langsung oleh praktisi profesional.',
  creative_tagline: 'Setiap siswa bebas eksplorasi minat sejak kelas 10.',
  academic_label: 'Mapel Umum', academic_title: 'Pondasi akademik yang kuat.',
  academic_desc: 'Kurikulum Merdeka dikemas lewat metode PBL — aplikatif, menyenangkan, dan tanpa PR.',
  academic_tagline: 'Siap SNBP / SNBT maupun jalur prestasi.',
};

const Subjects = () => {
  const subjects = useCMS('/subjects?sort=order:asc&status=published', null, (res) => res.data);
  const sec = useCMS('/subjects-section?status=published', SUBJ_SEC_FALLBACK, (res) => res.data);
  const creative = subjects ? subjects.filter(s => s.category === 'creative').map(s => s.name) : SUBJECTS_FALLBACK.creative;
  const academic = subjects ? subjects.filter(s => s.category === 'academic').map(s => s.name) : SUBJECTS_FALLBACK.academic;

  return (
    <section id="subjects" className="section">
      <div className="container">
        <div style={{textAlign: 'center', maxWidth: 760, margin: '0 auto'}}>
          <span className="section-eyebrow">{sec.eyebrow}</span>
          <h2 className="section-title" dangerouslySetInnerHTML={{__html: (sec.title || '').replace(/kreativitas/g, '<em class="hl-pill hl-pink">kreativitas</em>').replace(/akademik/g, '<em class="hl-pill hl-mint">akademik</em>')}} />
          <p style={{marginTop: 18, fontSize: 17}}>{sec.subtitle}</p>
        </div>

        <div className="subjects__split">
          <div className="subject-col subject-col--creative">
            <span className="subject-col__label">{sec.creative_label}</span>
            <h3>{sec.creative_title}</h3>
            <p>{sec.creative_desc}</p>
            <ul>{creative.map(c => <li key={c}>{c}</li>)}</ul>
            <div className="subject-col__tagline">
              <i className="bi bi-brush-fill"></i>
              {sec.creative_tagline}
            </div>
          </div>

          <div className="subject-col subject-col--academic">
            <span className="subject-col__label">{sec.academic_label}</span>
            <h3>{sec.academic_title}</h3>
            <p>{sec.academic_desc}</p>
            <ul>{academic.map(a => <li key={a}>{a}</li>)}</ul>
            <div className="subject-col__tagline">
              <i className="bi bi-book-half"></i>
              {sec.academic_tagline}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Subjects;
