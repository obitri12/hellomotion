const Factory = () => {
  const factories = [
    { icon: 'bi-camera-reels-fill', name: 'Digital Factory', desc: 'Produksi konten digital, sosial media, fotografi komersial.' },
    { icon: 'bi-film', name: 'Animation Factory', desc: 'Studio animasi 2D/3D lengkap untuk praktik langsung.' },
    { icon: 'bi-code-slash', name: 'Coding Factory', desc: 'Pengembangan software, game, dan produk digital.' },
    { icon: 'bi-image-fill', name: 'Paradise Picture', desc: 'Rumah produksi film — proyek nyata bareng praktisi.' },
  ];
  return (
    <section id="factory" className="section factory">
      <div className="container">
        <div className="factory__head">
          <span className="section-eyebrow">03 · Creative Factory ✦</span>
          <h2 className="section-title">
            Belajar langsung di <em className="hl-pill hl-pink">pusat industri</em> kreatif.
          </h2>
          <p>
            Kami tidak hanya belajar teori. HelloMotion High School Malang menggandeng Digital Factory,
            Animation Factory, Coding Factory, dan Paradise Picture di <strong>Kawasan KEK Singhasari</strong>.
            Siswa mengerjakan proyek langsung bersama para ahli dan terhubung dengan industri kreatif sejak kelas 10.
          </p>
        </div>

        <div className="factory__grid">
          {factories.map((f, i) => (
            <article className="factory-card" key={f.name}>
              <span className="factory-card__num">0{i+1}</span>
              <div className="factory-card__icon"><i className={`bi ${f.icon}`}></i></div>
              <h4>{f.name}</h4>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>

        <div className="factory__benefit">
          <i className="bi bi-award-fill"></i>
          <span>
            <strong>Keuntungan nyata:</strong> portofolio industri sejak SMA, relasi profesional,
            &amp; peluang magang di KEK Singhasari — bekal untuk karier kreatif atau studi lanjut.
          </span>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Factory });
