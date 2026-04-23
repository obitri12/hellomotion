const Curriculum = () => {
  const items = [
    { t: 'Keterampilan Abad 21', d: '4C: Critical thinking, Communication, Collaboration, Creativity' },
    { t: 'Design Thinking', d: 'Empati → Ideasi → Prototipe → Tes — terintegrasi di semua mapel' },
    { t: 'STEAM', d: 'Science, Tech, Engineering, Arts & Math dalam proyek lintas disiplin' },
    { t: 'Project Based Learning', d: 'Belajar lewat proyek nyata, output nyata, dampak nyata' },
  ];
  return (
    <section id="curriculum" className="section curriculum">
      <div className="container curriculum__grid">
        <div>
          <span className="section-eyebrow">02 · Kurikulum ✎</span>
          <h2 className="section-title">
            Kurikulum inovatif &amp; <em className="hl-pill hl-yellow">dua ijazah.</em>
          </h2>
          <p style={{marginTop: 20, fontSize: 17, maxWidth: 520}}>
            Kami menggabungkan kurikulum nasional Kemendikbud dengan modifikasi khusus. Lulusan mendapatkan
            <strong> dua ijazah sekaligus</strong>: Kemendikbud dan Industri Kreatif — siap terjun ke dunia kerja
            profesional atau melanjutkan ke PT favorit.
          </p>
          <ul className="curr-list">
            {items.map((it, i) => (
              <li key={i}>
                <div className="dot">0{i+1}</div>
                <div>
                  <strong>{it.t}</strong>
                  <small>{it.d}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="diploma-stack">
          <div className="diploma diploma--1">
            <span className="diploma__ribbon">IJAZAH 01</span>
            <h4>Kemendikbud Ristek</h4>
            <p>Ijazah SMA resmi Kurikulum Merdeka — diakui seluruh PTN &amp; PTS di Indonesia.</p>
            <div className="diploma__seal">Resmi</div>
          </div>
          <div className="diploma diploma--2">
            <span className="diploma__ribbon">IJAZAH 02</span>
            <h4>Industri Kreatif</h4>
            <p>Sertifikasi kompetensi kreatif (Filmmaking, Desain, Animasi) untuk jalur industri &amp; freelance.</p>
            <div className="diploma__seal" style={{background: 'var(--hm-pink)', boxShadow: '0 0 0 2px var(--hm-pink)'}}>Kreatif</div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Curriculum });
