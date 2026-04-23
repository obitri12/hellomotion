const Daftar = () => {
  const [form, setForm] = React.useState({
    nama: '', email: '', phone: '', smp: '', minat: '', catatan: ''
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const set = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.nama.trim()) e.nama = 'Nama wajib diisi';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = 'Email tidak valid';
    if (!form.phone.match(/^[0-9+\-\s]{8,}$/)) e.phone = 'No. WhatsApp tidak valid';
    if (!form.smp.trim()) e.smp = 'Asal SMP wajib diisi';
    if (!form.minat) e.minat = 'Pilih minat program';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <section id="daftar" className="section daftar">
      <div className="daftar__shapes" aria-hidden="true">
        <div className="s" style={{top: '10%', left: '-5%', width: 220, height: 220, background: 'rgba(255,255,255,0.08)'}}></div>
        <div className="s" style={{bottom: '5%', right: '-3%', width: 180, height: 180, background: 'var(--hm-yellow)', opacity: 0.2}}></div>
      </div>

      <div className="container daftar__grid">
        <div className="daftar__promo">
          <span className="section-eyebrow">Final CTA 🎓</span>
          <h2 className="section-title" style={{color: 'white'}}>
            <em className="hl-pill hl-yellow">ENROLL NOW!</em><br/>
            Kuota terbatas.
          </h2>
          <p style={{marginTop: 20, fontSize: 17, color: 'rgba(255,255,255,0.9)', maxWidth: 480}}>
            Dapatkan promo gelombang 1: gratis biaya formulir + diskon SPP hingga 25%.
            Formulir online hanya 3 menit.
          </p>

          <div className="daftar__promo-highlights">
            <div className="promo-row">
              <div className="promo-row__icon"><i className="bi bi-ticket-perforated-fill"></i></div>
              <div>
                <strong>Gratis biaya formulir</strong>
                <small>Pendaftaran online tanpa biaya admin</small>
              </div>
            </div>
            <div className="promo-row">
              <div className="promo-row__icon"><i className="bi bi-percent"></i></div>
              <div>
                <strong>Diskon SPP 25%</strong>
                <small>Khusus pendaftar gelombang 1 (sampai 30 Juni 2026)</small>
              </div>
            </div>
            <div className="promo-row">
              <div className="promo-row__icon"><i className="bi bi-tablet-fill"></i></div>
              <div>
                <strong>Free iPad untuk siswa baru</strong>
                <small>Jadi milik siswa setelah 3 tahun masa studi</small>
              </div>
            </div>
          </div>
        </div>

        <div className="form-card">
          {!submitted ? (
            <>
              <h3>Formulir Pendaftaran</h3>
              <p>Tim admisi akan menghubungi kamu dalam 1×24 jam kerja.</p>
              <form onSubmit={submit} noValidate>
                <div className="form-row">
                  <div className={`field ${errors.nama ? 'error' : ''}`}>
                    <label>Nama Lengkap Calon Siswa</label>
                    <input type="text" value={form.nama} onChange={set('nama')} placeholder="mis. Dimas Prasetya"/>
                    {errors.nama && <div className="field__err">{errors.nama}</div>}
                  </div>
                </div>
                <div className="form-row form-row--2">
                  <div className={`field ${errors.email ? 'error' : ''}`}>
                    <label>Email orang tua / wali</label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="nama@email.com"/>
                    {errors.email && <div className="field__err">{errors.email}</div>}
                  </div>
                  <div className={`field ${errors.phone ? 'error' : ''}`}>
                    <label>No. WhatsApp aktif</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="0822 xxxx xxxx"/>
                    {errors.phone && <div className="field__err">{errors.phone}</div>}
                  </div>
                </div>
                <div className="form-row form-row--2">
                  <div className={`field ${errors.smp ? 'error' : ''}`}>
                    <label>Asal SMP</label>
                    <input type="text" value={form.smp} onChange={set('smp')} placeholder="mis. SMPN 1 Malang"/>
                    {errors.smp && <div className="field__err">{errors.smp}</div>}
                  </div>
                  <div className={`field ${errors.minat ? 'error' : ''}`}>
                    <label>Minat program kreatif</label>
                    <select value={form.minat} onChange={set('minat')}>
                      <option value="">Pilih minat...</option>
                      <option>Fotografi</option>
                      <option>Desain Grafis</option>
                      <option>Ilustrasi</option>
                      <option>Animasi</option>
                      <option>Filmmaking</option>
                      <option>Belum yakin, masih eksplorasi</option>
                    </select>
                    {errors.minat && <div className="field__err">{errors.minat}</div>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>Catatan (opsional)</label>
                    <textarea rows="3" value={form.catatan} onChange={set('catatan')} placeholder="Pertanyaan, permintaan info beasiswa, dll."></textarea>
                  </div>
                </div>
                <button type="submit" className="form-submit">
                  Kirim Pendaftaran — Gratis! <i className="bi bi-send-fill"></i>
                </button>
              </form>
            </>
          ) : (
            <div className="form-success">
              <div className="form-success__icon"><i className="bi bi-check-lg"></i></div>
              <h4>Pendaftaran terkirim! 🎉</h4>
              <p>Terima kasih, <strong>{form.nama}</strong>. Tim admisi kami akan menghubungi di <strong>{form.phone}</strong> dalam 1×24 jam kerja.</p>
              <button className="btn btn-ghost btn-sm" style={{marginTop: 20}} onClick={() => { setSubmitted(false); setForm({nama:'',email:'',phone:'',smp:'',minat:'',catatan:''}); }}>
                Daftar lagi
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Daftar });
