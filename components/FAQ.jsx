const FAQ = () => {
  const [openIdx, setOpenIdx] = React.useState(0);
  const faqs = [
    { q: 'Apakah ijazah HelloMotion diakui di PTN?',
      a: 'Ya, HelloMotion High School terakreditasi Kemendikbud Ristek dan mengeluarkan ijazah SMA resmi. Lulusan kami diterima di UI, ITB, UGM, Unpad, dan kampus kreatif luar negeri lewat jalur SNBP, SNBT, dan prestasi.' },
    { q: 'Berapa total biaya sekolah per tahun?',
      a: 'Biaya terdiri dari uang pangkal dan SPP bulanan. Gelombang 1 mendapat diskon SPP 25% dan gratis biaya formulir pendaftaran. Hubungi tim admisi untuk rincian tarif lengkap dan skema cicilan.' },
    { q: 'Apa benar setiap siswa mendapat iPad gratis?',
      a: 'Benar. Setiap siswa baru gelombang 1 mendapatkan 1 unit iPad untuk mendukung pembelajaran berbasis proyek. iPad menjadi milik siswa setelah menyelesaikan masa studi 3 tahun.' },
    { q: 'Apakah ada asrama untuk siswa luar kota?',
      a: 'Ya, tersedia asrama putra dan putri di lingkungan sekolah. Fasilitas mencakup kamar, ruang belajar, kantin, dan mentor pendamping 24 jam. Biaya asrama terpisah dari SPP.' },
    { q: 'Bagaimana kalau anak saya belum yakin dengan bidang kreatifnya?',
      a: 'Justru di sinilah siswa difasilitasi mengeksplorasi 5 bidang kreatif di semester pertama. Spesialisasi baru ditentukan di akhir kelas 10 — dengan bimbingan mentor.' },
    { q: 'Apakah HelloMotion menerima siswa pindahan dari SMA lain?',
      a: 'Bisa, untuk kelas 10 dan 11 dengan seleksi tambahan. Silakan hubungi WhatsApp admisi untuk informasi kuota dan prosesnya.' },
  ];
  return (
    <section id="faq" className="section">
      <div className="container" style={{textAlign: 'center'}}>
        <span className="section-eyebrow">FAQ ✦</span>
        <h2 className="section-title">
          Pertanyaan yang sering <em className="hl-pill hl-yellow">ditanyakan.</em>
        </h2>
        <div className="faq__wrap" style={{textAlign: 'left'}}>
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${openIdx === i ? 'open' : ''}`}>
              <button className="faq-item__q" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                <span>{f.q}</span>
                <i className="bi bi-plus"></i>
              </button>
              <div className="faq-item__a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { FAQ });
