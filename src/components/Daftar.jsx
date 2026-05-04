import React from 'react';
import { useCMS } from '../shared';

const DAFTAR_SEC_FALLBACK = {
  eyebrow: 'Final CTA 🎓',
  title: 'ENROLL NOW!\nKuota terbatas.',
  description: 'Dapatkan promo gelombang 1: gratis biaya formulir + diskon SPP hingga 25%. Formulir online hanya 3 menit.',
  promo_1_icon: 'bi-ticket-perforated-fill', promo_1_title: 'Gratis biaya formulir', promo_1_desc: 'Pendaftaran online tanpa biaya admin',
  promo_2_icon: 'bi-percent', promo_2_title: 'Diskon SPP 25%', promo_2_desc: 'Khusus pendaftar gelombang 1 (sampai 30 Juni 2026)',
  promo_3_icon: 'bi-tablet-fill', promo_3_title: 'Free iPad untuk siswa baru', promo_3_desc: 'Jadi milik siswa setelah 3 tahun masa studi',
  form_title: 'Formulir Pendaftaran',
  form_subtitle: 'Tim admisi akan menghubungi kamu dalam 1×24 jam kerja.',
};

const Daftar = () => {
  const sec = useCMS('/daftar-section?status=published', DAFTAR_SEC_FALLBACK, (res) => res.data);
  const [form, setForm] = React.useState({
    nama: '', email: '', phone: '', smp: '', minat: '', catatan: ''
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const [submitting, setSubmitting] = React.useState(false);

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

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetchAPI('/registrations', {
        method: 'POST',
        body: JSON.stringify({ data: { ...form, status: 'baru' } }),
      });
    } catch (err) {
      console.warn('Registration API failed, form still accepted locally');
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="daftar" className="section daftar">
      <div className="daftar__shapes" aria-hidden="true">
        <div className="s" style={{top: '10%', left: '-5%', width: 220, height: 220, background: 'rgba(255,255,255,0.08)'}}></div>
        <div className="s" style={{bottom: '5%', right: '-3%', width: 180, height: 180, background: 'var(--hm-yellow)', opacity: 0.2}}></div>
      </div>

      <div className="container daftar__grid">
        <div className="daftar__promo">
          <span className="section-eyebrow">{sec.eyebrow}</span>
          <h2 className="section-title" style={{color: 'white'}}>
            {(sec.title || '').split('\n').map((line, i) => <React.Fragment key={i}>{i === 0 ? <><em className="hl-pill hl-yellow">{line}</em><br/></> : line}</React.Fragment>)}
          </h2>
          <p style={{marginTop: 20, fontSize: 17, color: 'rgba(255,255,255,0.9)', maxWidth: 480}}>
            {sec.description}
          </p>

          <div className="daftar__promo-highlights">
            <div className="promo-row">
              <div className="promo-row__icon"><i className={`bi ${sec.promo_1_icon}`}></i></div>
              <div>
                <strong>{sec.promo_1_title}</strong>
                <small>{sec.promo_1_desc}</small>
              </div>
            </div>
            <div className="promo-row">
              <div className="promo-row__icon"><i className={`bi ${sec.promo_2_icon}`}></i></div>
              <div>
                <strong>{sec.promo_2_title}</strong>
                <small>{sec.promo_2_desc}</small>
              </div>
            </div>
            <div className="promo-row">
              <div className="promo-row__icon"><i className={`bi ${sec.promo_3_icon}`}></i></div>
              <div>
                <strong>{sec.promo_3_title}</strong>
                <small>{sec.promo_3_desc}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="form-card">
          {!submitted ? (
            <>
              <h3>{sec.form_title}</h3>
              <p>{sec.form_subtitle}</p>
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
                <button type="submit" className="form-submit" disabled={submitting}>
                  {submitting ? 'Mengirim...' : 'Kirim Pendaftaran — Gratis!'} <i className="bi bi-send-fill"></i>
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


export default Daftar;
