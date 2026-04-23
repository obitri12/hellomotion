const Mapel = () => {
  const [tab, setTab] = React.useState('khas');

  const khas = [
    { name: "Fotografi", icon: "bi-camera-fill", color: "pink" },
    { name: "Desain Grafis", icon: "bi-palette2", color: "yellow" },
    { name: "Ilustrasi", icon: "bi-brush-fill", color: "mint" },
    { name: "Animasi", icon: "bi-play-btn-fill", color: "pink" },
    { name: "Filmmaking", icon: "bi-camera-reels-fill", color: "yellow" },
  ];
  const umum = [
    { name: "Ekonomi", icon: "bi-graph-up", color: "mint" },
    { name: "Matematika", icon: "bi-calculator-fill", color: "pink" },
    { name: "Bahasa Inggris", icon: "bi-translate", color: "yellow" },
    { name: "Bahasa Jepang", icon: "bi-chat-heart-fill", color: "mint" },
    { name: "Entrepreneurship", icon: "bi-briefcase-fill", color: "pink" },
  ];

  const current = tab === 'khas' ? khas : umum;

  return (
    <section id="mapel" className="section mapel">
      <div className="container">
        <div className="mapel__head">
          <span className="section-eyebrow">Mapel ✎</span>
          <h2 className="section-title">
            Seimbang antara <em className="hl-pill hl-pink">Kreativitas</em> &amp; <em className="hl-pill hl-yellow">Akademik.</em>
          </h2>
          <p className="mapel__lede">
            Lebih banyak praktik daripada teori. Pelajaran umum seru, aplikatif, dan tanpa PR!
          </p>
        </div>

        <div className="mapel__tabs">
          <button
            className={`mapel-tab ${tab === 'khas' ? 'is-active' : ''}`}
            onClick={() => setTab('khas')}
          >
            <span className="mapel-tab__num">01</span>
            <span>Mapel Khas — Creative</span>
          </button>
          <button
            className={`mapel-tab ${tab === 'umum' ? 'is-active' : ''}`}
            onClick={() => setTab('umum')}
          >
            <span className="mapel-tab__num">02</span>
            <span>Mapel Umum — Ekspresif</span>
          </button>
        </div>

        <div className="mapel__grid" key={tab}>
          {current.map((m, i) => (
            <div key={m.name} className={`mapel-card mapel-card--${m.color}`} style={{animationDelay:`${i*60}ms`}}>
              <div className="mapel-card__icon"><i className={`bi ${m.icon}`}></i></div>
              <div className="mapel-card__name">{m.name}</div>
              <span className="mapel-card__tag">{tab === 'khas' ? 'Specialized' : 'General'}</span>
            </div>
          ))}
        </div>

        <div className="mapel__note">
          <i className="bi bi-emoji-smile-fill"></i>
          <strong>Tagline:</strong> Di HelloMotion, kamu belajar sambil berkarya — bukan sekadar mencatat.
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Mapel });
