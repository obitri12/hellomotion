const Subjects = () => {
  const creative = ['Fotografi', 'Desain Grafis', 'Ilustrasi', 'Animasi', 'Filmmaking'];
  const academic = ['Ekonomi', 'Matematika', 'Bhs Inggris', 'Bhs Jepang', 'Entrepreneurship', 'IPS/IPA Terintegrasi'];

  return (
    <section id="subjects" className="section">
      <div className="container">
        <div style={{textAlign: 'center', maxWidth: 760, margin: '0 auto'}}>
          <span className="section-eyebrow">04 · Mata Pelajaran ★</span>
          <h2 className="section-title">
            Seimbang antara <em className="hl-pill hl-pink">kreativitas</em> &amp; <em className="hl-pill hl-mint">akademik.</em>
          </h2>
          <p style={{marginTop: 18, fontSize: 17}}>
            Lebih banyak praktik daripada teori. Pelajaran umum di HelloMotion pun seru, aplikatif, dan tidak pernah PR.
          </p>
        </div>

        <div className="subjects__split">
          <div className="subject-col subject-col--creative">
            <span className="subject-col__label">Mapel Khas</span>
            <h3>Untuk melatih cipta &amp; rasa.</h3>
            <p>Mata pelajaran spesialisasi industri kreatif — diajar langsung oleh praktisi profesional.</p>
            <ul>{creative.map(c => <li key={c}>{c}</li>)}</ul>
            <div className="subject-col__tagline">
              <i className="bi bi-brush-fill"></i>
              Setiap siswa bebas eksplorasi minat sejak kelas 10.
            </div>
          </div>

          <div className="subject-col subject-col--academic">
            <span className="subject-col__label">Mapel Umum</span>
            <h3>Pondasi akademik yang kuat.</h3>
            <p>Kurikulum Merdeka dikemas lewat metode PBL — aplikatif, menyenangkan, dan <strong>tanpa PR</strong>.</p>
            <ul>{academic.map(a => <li key={a}>{a}</li>)}</ul>
            <div className="subject-col__tagline">
              <i className="bi bi-book-half"></i>
              Siap SNBP / SNBT maupun jalur prestasi.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Subjects });
