const Life = () => {
  return (
    <section id="life" className="section life">
      <div className="container">
        <div style={{maxWidth: 720}}>
          <span className="section-eyebrow">05 · Kehidupan Sekolah ✎</span>
          <h2 className="section-title">
            Sekolah paling seru buat <em className="hl-pill hl-pink">anak kreatif</em> 😎
          </h2>
          <p style={{marginTop: 18, fontSize: 17}}>
            Di HelloMotion, suasana belajar sehangat studio — kolaboratif, bebas ekspresi, dan penuh kejutan.
          </p>
        </div>

        <div className="life__grid">
          <div className="life-tile life-tile--classroom">
            <span className="life-tile__tag">ruang kelas ✨</span>
            <i className="bi bi-easel2-fill life-tile__icon"></i>
            <h4>Creative Classrooms</h4>
            <p>Kelas wajib dicoret-coret dan dihias sesuai keinginan kelas. Dinding adalah kanvas.</p>
          </div>

          <div className="life-tile life-tile--uniform">
            <i className="bi bi-palette2 life-tile__icon"></i>
            <h4>Custom Uniform</h4>
            <p>Seragam desain sendiri — hanya dipakai hari Senin. Selebihnya bebas &amp; ekspresif.</p>
          </div>

          <div className="life-tile life-tile--ipad">
            <i className="bi bi-tablet-fill life-tile__icon"></i>
            <h4>One Student, One iPad</h4>
            <p>Dukungan penuh teknologi Apple untuk eksplorasi tanpa batas. Gratis untuk siswa baru.</p>
          </div>

          <div className="life-tile life-tile--asrama">
            <img src="assets/asrama.png" alt="Asrama HelloMotion" />
            <div className="asrama-body">
              <h4>Asrama &amp; Lingkungan 24/7</h4>
              <p>Hunian nyaman bagi siswa luar kota. Pendampingan akademik dan pembinaan karakter harian oleh mentor.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Life });
