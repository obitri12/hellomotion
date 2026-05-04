import React from 'react';
import { useCMS } from '../shared';

const STEPS_FALLBACK = [
  { step_number: '01', title: 'Isi Formulir', description: 'Daftar online — gratis biaya formulir.' },
  { step_number: '02', title: 'Tes Minat', description: 'Tes bakat, minat, & wawancara orang tua.' },
  { step_number: '03', title: 'Portofolio', description: 'Kirim karya atau passion project (opsional).' },
  { step_number: '04', title: 'Pengumuman', description: 'Hasil diumumkan 7 hari kerja via email.' },
  { step_number: '05', title: 'Registrasi', description: 'Selesaikan daftar ulang & dapatkan iPad!' },
];

const Alur = () => {
  const steps = useCMS('/timeline-steps?sort=order:asc&status=published', STEPS_FALLBACK, (res) => res.data);
  const sec = useCMS('/alur-section?status=published', {eyebrow:'07 · Alur PPDB ✎',title:'Lima langkah jadi siswa HelloMotion.',subtitle:'Prosesnya simpel — kami dampingi dari formulir sampai hari pertama sekolah.'}, (res) => res.data);
  return (
    <section id="alur" className="section alur">
      <div className="container">
        <div style={{textAlign: 'center', maxWidth: 640, margin: '0 auto'}}>
          <span className="section-eyebrow">{sec.eyebrow}</span>
          <h2 className="section-title" dangerouslySetInnerHTML={{__html: (sec.title || '').replace(/siswa HelloMotion/g, '<em class="hl-pill hl-pink">siswa HelloMotion.</em>')}} />
          <p style={{marginTop: 16}}>{sec.subtitle}</p>
        </div>
        <div className="timeline">
          {steps.map((s) => (
            <div className="tl-step" key={s.step_number || s.n}>
              <div className="tl-step__num">{s.step_number || s.n}</div>
              <h5>{s.title || s.t}</h5>
              <p>{s.description || s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Alur;
