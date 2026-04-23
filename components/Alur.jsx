const Alur = () => {
  const steps = [
    { n: '01', t: 'Isi Formulir', d: 'Daftar online — gratis biaya formulir.' },
    { n: '02', t: 'Tes Minat', d: 'Tes bakat, minat, & wawancara orang tua.' },
    { n: '03', t: 'Portofolio', d: 'Kirim karya atau passion project (opsional).' },
    { n: '04', t: 'Pengumuman', d: 'Hasil diumumkan 7 hari kerja via email.' },
    { n: '05', t: 'Registrasi', d: 'Selesaikan daftar ulang & dapatkan iPad!' },
  ];
  return (
    <section id="alur" className="section alur">
      <div className="container">
        <div style={{textAlign: 'center', maxWidth: 640, margin: '0 auto'}}>
          <span className="section-eyebrow">07 · Alur PPDB ✎</span>
          <h2 className="section-title">
            Lima langkah jadi <em className="hl-pill hl-pink">siswa HelloMotion.</em>
          </h2>
          <p style={{marginTop: 16}}>Prosesnya simpel — kami dampingi dari formulir sampai hari pertama sekolah.</p>
        </div>
        <div className="timeline">
          {steps.map((s) => (
            <div className="tl-step" key={s.n}>
              <div className="tl-step__num">{s.n}</div>
              <h5>{s.t}</h5>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Alur });
