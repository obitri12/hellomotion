const Alumni = () => {
  const achievements = [
    { icon: 'bi-trophy-fill', title: 'Medali Emas FIKSI', desc: 'Festival Inovasi & Kewirausahaan Siswa Nasional', year: '2024' },
    { icon: 'bi-camera-reels', title: 'Nominasi FFI', desc: 'Festival Film Indonesia — kategori film pelajar', year: '2023' },
    { icon: 'bi-mortarboard-fill', title: 'Diterima UI, ITB, UGM', desc: 'Jalur prestasi & SNBP dengan beasiswa penuh', year: '2024' },
    { icon: 'bi-globe-americas', title: 'Student Exchange Jepang', desc: 'Program pertukaran budaya & bahasa tahunan', year: '2025' },
  ];

  const testimonis = [
    {
      name: 'Raka Prasetya',
      role: 'Alumni 2024 · Mahasiswa DKV ITB',
      quote: '"Di HelloMotion aku belajar bikin film beneran sejak kelas 10. Portofolio itu yang bantu aku masuk ITB jalur prestasi tanpa tes."'
    },
    {
      name: 'Alya Syahrani',
      role: 'Siswa Kelas 11',
      quote: '"Kelas-nya kayak studio kreatif. Nggak ada PR, tapi justru bikin kami lebih semangat karena semua proyek terasa nyata."'
    },
    {
      name: 'Bu Fitri Handayani',
      role: 'Orang tua alumni',
      quote: '"Awalnya ragu karena beda dari SMA biasa. Tapi anak saya tumbuh lebih percaya diri, mandiri, dan punya karya yang bisa dibanggakan."'
    }
  ];

  return (
    <section id="alumni" className="section">
      <div className="container">
        <div className="alumni__head">
          <div>
            <span className="section-eyebrow">06 · Alumni &amp; Prestasi ✦</span>
            <h2 className="section-title">
              Prestasi tanpa batas, <em className="hl-pill hl-yellow">masa depan berkelas.</em>
            </h2>
          </div>
          <p style={{maxWidth: 380, fontSize: 16}}>
            Alumni kami telah menembus berbagai PTN ternama dan kampus kreatif luar negeri —
            bersaing di dunia kreatif dengan prestasi nasional yang nyata.
          </p>
        </div>

        <div className="achievement-strip">
          {achievements.map((a) => (
            <article className="ach-card" key={a.title}>
              <div className="ach-card__medal"><i className={`bi ${a.icon}`}></i></div>
              <h5>{a.title}</h5>
              <p>{a.desc}</p>
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

Object.assign(window, { Alumni });
