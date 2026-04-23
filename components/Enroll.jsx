const Enroll = () => {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    nama: "", tglLahir: "", sekolah: "",
    program: "Specialized - Film", gelombang: "Gelombang 1",
    email: "", whatsapp: "", ortu: "",
    setuju: false,
  });
  const [submitted, setSubmitted] = React.useState(false);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const canNext1 = data.nama.trim() && data.tglLahir && data.sekolah.trim();
  const canNext2 = data.program && data.gelombang;
  const canSubmit = data.email.includes('@') && data.whatsapp.length >= 9 && data.ortu.trim() && data.setuju;

  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="daftar" className="section enroll">
        <div className="container">
          <div className="enroll-success">
            <div className="enroll-success__burst"><i className="bi bi-check-circle-fill"></i></div>
            <h2>Yeay, {data.nama.split(' ')[0]}! 🎉</h2>
            <p>Pendaftaranmu sudah kami terima. Tim Admisi HelloMotion akan menghubungi kamu via WhatsApp <strong>{data.whatsapp}</strong> dalam 1×24 jam.</p>
            <div className="enroll-success__summary">
              <div><span>Program</span><strong>{data.program}</strong></div>
              <div><span>Gelombang</span><strong>{data.gelombang}</strong></div>
              <div><span>Email</span><strong>{data.email}</strong></div>
            </div>
            <div className="enroll-success__cta">
              <a href="https://wa.me/6282289991200" className="btn btn-primary" target="_blank" rel="noopener">
                <i className="bi bi-whatsapp"></i> Chat Admisi Sekarang
              </a>
              <button className="btn btn-ghost" onClick={() => { setSubmitted(false); setStep(1); }}>Kembali</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="daftar" className="section enroll">
      <div className="container enroll__grid">
        <div className="enroll__side">
          <div className="enroll__promo">
            <div className="enroll__promo-badge">PROMO PPDB 2026/2027</div>
            <h2>
              ENROLL <em className="hl-pill hl-yellow">NOW!</em><br/>
              Kuota Terbatas <span className="trophy">🏆</span>
            </h2>
            <ul className="enroll__promo-list">
              <li><i className="bi bi-gift-fill"></i> <strong>Gratis</strong> biaya formulir</li>
              <li><i className="bi bi-tag-fill"></i> Diskon hingga <strong>25%</strong> biaya pendaftaran &amp; SPP</li>
              <li><i className="bi bi-tablet-fill"></i> <strong>iPad gratis</strong> untuk setiap siswa baru</li>
              <li><i className="bi bi-mortarboard-fill"></i> <strong>Dua ijazah</strong> resmi setelah lulus</li>
            </ul>
            <div className="enroll__contact">
              <h5>Atau hubungi kami:</h5>
              <a href="https://wa.me/6282289991200" className="enroll__contact-item" target="_blank" rel="noopener">
                <i className="bi bi-whatsapp"></i>
                <div><small>WhatsApp</small><strong>0822 8999 1200</strong></div>
              </a>
              <a href="https://instagram.com/hellomotion.malang" className="enroll__contact-item" target="_blank" rel="noopener">
                <i className="bi bi-instagram"></i>
                <div><small>Instagram</small><strong>@hellomotion.malang</strong></div>
              </a>
              <a href="https://hellomotion.sch.id" className="enroll__contact-item" target="_blank" rel="noopener">
                <i className="bi bi-globe"></i>
                <div><small>Website</small><strong>hellomotion.sch.id</strong></div>
              </a>
              <div className="enroll__contact-item enroll__contact-item--loc">
                <i className="bi bi-geo-alt-fill"></i>
                <div><small>Lokasi</small><strong>MCC Lt. 5 · KEK Singhasari, Malang</strong></div>
              </div>
            </div>
          </div>
        </div>

        <form className="enroll__form" onSubmit={submit}>
          <div className="enroll__steps">
            {[1,2,3].map(s => (
              <div key={s} className={`enroll-step ${step >= s ? 'is-active' : ''} ${step === s ? 'is-current' : ''}`}>
                <span className="enroll-step__num">{s}</span>
                <span className="enroll-step__label">
                  {s === 1 ? 'Identitas' : s === 2 ? 'Program' : 'Kontak'}
                </span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="enroll__fields">
              <label>
                <span>Nama Lengkap Calon Siswa</span>
                <input type="text" value={data.nama} onChange={e=>update('nama', e.target.value)} placeholder="Nama lengkap"/>
              </label>
              <div className="enroll__row">
                <label>
                  <span>Tanggal Lahir</span>
                  <input type="date" value={data.tglLahir} onChange={e=>update('tglLahir', e.target.value)}/>
                </label>
                <label>
                  <span>Asal SMP</span>
                  <input type="text" value={data.sekolah} onChange={e=>update('sekolah', e.target.value)} placeholder="SMP ..."/>
                </label>
              </div>
              <div className="enroll__nav">
                <span className="enroll__hint"><i className="bi bi-shield-check"></i> Data disimpan aman</span>
                <button type="button" className="btn btn-primary" disabled={!canNext1} onClick={()=>setStep(2)}>
                  Lanjut <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="enroll__fields">
              <div>
                <span className="enroll__label">Pilih Program Peminatan</span>
                <div className="enroll__choices">
                  {["Specialized - Film", "Specialized - Desain Grafis", "Specialized - Animasi", "Specialized - Fotografi", "Specialized - Ilustrasi"].map(p => (
                    <button key={p} type="button" className={`choice ${data.program === p ? 'is-active' : ''}`} onClick={()=>update('program', p)}>{p}</button>
                  ))}
                </div>
              </div>
              <div>
                <span className="enroll__label">Pilih Gelombang</span>
                <div className="enroll__waves">
                  {[
                    ['Gelombang 1', 'hingga 30 Juni 2026', 'Diskon 25%'],
                    ['Gelombang 2', 'Juli — Agustus 2026', 'Diskon 15%'],
                    ['Gelombang 3', 'Sept — Okt 2026', 'Reguler'],
                  ].map(([n,d,p]) => (
                    <button key={n} type="button" className={`wave ${data.gelombang === n ? 'is-active' : ''}`} onClick={()=>update('gelombang', n)}>
                      <strong>{n}</strong><small>{d}</small><em>{p}</em>
                    </button>
                  ))}
                </div>
              </div>
              <div className="enroll__nav">
                <button type="button" className="btn btn-ghost" onClick={()=>setStep(1)}><i className="bi bi-arrow-left"></i> Kembali</button>
                <button type="button" className="btn btn-primary" disabled={!canNext2} onClick={()=>setStep(3)}>
                  Lanjut <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="enroll__fields">
              <div className="enroll__row">
                <label>
                  <span>Email aktif</span>
                  <input type="email" value={data.email} onChange={e=>update('email', e.target.value)} placeholder="kamu@email.com"/>
                </label>
                <label>
                  <span>Nomor WhatsApp</span>
                  <input type="tel" value={data.whatsapp} onChange={e=>update('whatsapp', e.target.value)} placeholder="08xxxxxxxxxx"/>
                </label>
              </div>
              <label>
                <span>Nama Orang Tua / Wali</span>
                <input type="text" value={data.ortu} onChange={e=>update('ortu', e.target.value)} placeholder="Nama lengkap"/>
              </label>
              <label className="enroll__check">
                <input type="checkbox" checked={data.setuju} onChange={e=>update('setuju', e.target.checked)}/>
                <span>Saya setuju data pendaftaran diproses oleh tim Admisi HelloMotion High School.</span>
              </label>
              <div className="enroll__nav">
                <button type="button" className="btn btn-ghost" onClick={()=>setStep(2)}><i className="bi bi-arrow-left"></i> Kembali</button>
                <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
                  Kirim Pendaftaran <i className="bi bi-check2"></i>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

Object.assign(window, { Enroll });
