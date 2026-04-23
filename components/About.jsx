const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__intro">
          <span className="section-eyebrow">Tentang Kami ✎</span>
          <h2 className="section-title">
            Sekolah tempat ide <em className="hl-pill hl-yellow">bertemu aksi.</em>
          </h2>
          <p className="about__lede">
            HelloMotion High School adalah SMA kreatif pertama di Indonesia yang memadukan
            kurikulum akademik nasional dengan pendekatan <strong>Design Thinking</strong> dan
            <strong> 21<sup>st</sup> Century Skills</strong>. Siswa dilatih untuk berpikir kritis,
            berempati, dan berani menciptakan.
          </p>
        </div>

        <div className="about__cards">
          <article className="value-card value-card--pink">
            <div className="value-card__icon"><i className="bi bi-lightbulb-fill"></i></div>
            <h4>Visi</h4>
            <p>Menumbuhkan generasi kreatif yang berkarakter, mandiri, dan siap memimpin perubahan di abad 21.</p>
          </article>
          <article className="value-card value-card--yellow">
            <div className="value-card__icon"><i className="bi bi-compass-fill"></i></div>
            <h4>Misi</h4>
            <p>Menyelenggarakan pendidikan yang menggabungkan nalar, rasa, dan karya melalui proyek nyata dan kolaborasi lintas disiplin.</p>
          </article>
          <article className="value-card value-card--mint">
            <div className="value-card__icon"><i className="bi bi-heart-fill"></i></div>
            <h4>Nilai</h4>
            <p>Kreatif, kolaboratif, reflektif, dan berbudi pekerti luhur — ditanamkan dalam keseharian belajar.</p>
          </article>
        </div>

        <div className="about__facilities">
          <h3 className="about__facilities-title">
            Fasilitas lengkap untuk <em className="hl-pill hl-mint">belajar &amp; tumbuh</em>
          </h3>
          <div className="about__facilities-grid">
            <div className="facility-card">
              <img src="assets/gedung.png" alt="Gedung HelloMotion" />
              <div className="facility-card__body">
                <h5>Gedung Sekolah</h5>
                <p>Di jantung KEK Singhasari, Malang — desain modern, ruang kolaborasi, studio kreatif.</p>
              </div>
            </div>
            <div className="facility-card">
              <img src="assets/asrama.png" alt="Asrama HelloMotion" />
              <div className="facility-card__body">
                <h5>Asrama</h5>
                <p>Hunian nyaman untuk siswa luar kota — lingkungan belajar 24/7 dengan pembimbing.</p>
              </div>
            </div>
            <div className="facility-card facility-card--feature">
              <div className="facility-card__placeholder">
                <i className="bi bi-tablet"></i>
              </div>
              <div className="facility-card__body">
                <h5>iPad untuk Setiap Siswa</h5>
                <p>Perangkat belajar digital gratis untuk mendukung pembelajaran berbasis proyek &amp; kreatif.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { About });
