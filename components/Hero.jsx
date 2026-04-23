const Hero = () => {
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
              <i className="bi bi-stars"></i> PPDB Tahun Ajaran 2026/2027
            </span>
            <span className="scribble hero__scribble">dibuka!</span>
          </div>

          <h1 className="hero__headline">
            <span>MORE</span>
            <span>THAN</span>
            <span>JUST</span>
            <span><em className="hl-pill hl-pink">HIGH</em></span>
            <span><em className="hl-pill hl-yellow">SCHOOL!</em></span>
            <span style={{fontSize: '0.85em'}}>🚀</span>
          </h1>

          <p className="hero__sub">
            Lagi nyari SMA yang bisa mengasah kreativitasmu tapi tetap nggak ketinggalan pelajaran umum?
            <strong> HelloMotion High School Malang jawabannya.</strong> Di sini kamu bisa belajar Film Making,
            Desain Grafis, Ilustrasi, Fotografi, dan banyak lagi — dengan kurikulum yang berpusat pada kebutuhanmu.
          </p>

          <div className="hero__ctas">
            <button className="btn btn-primary" onClick={() => go('daftar')}>
              Daftar Sekarang — Gratis Biaya Formulir! <i className="bi bi-arrow-right"></i>
            </button>
            <button className="btn btn-ghost" onClick={() => go('curriculum')}>
              <i className="bi bi-play-circle"></i> Lihat Program
            </button>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>2</strong>
              <span>Ijazah resmi sekaligus</span>
            </div>
            <div className="hero__stat">
              <strong>25%</strong>
              <span>Diskon SPP gelombang 1</span>
            </div>
            <div className="hero__stat">
              <strong>1:1</strong>
              <span>Siswa &amp; iPad pribadi</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo-wrap">
            <div className="hero__photo-bg"></div>
            <img src="assets/students.png" alt="Siswa HelloMotion" className="hero__photo" />
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
                <strong>Hanya 96 siswa baru</strong>
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

Object.assign(window, { Hero });
