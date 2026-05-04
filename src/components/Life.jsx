import React from 'react';
import { STRAPI_URL, useCMS } from '../shared';

const LIFE_FALLBACK = [
  { title: 'Creative Classrooms', description: 'Kelas wajib dicoret-coret dan dihias sesuai keinginan kelas. Dinding adalah kanvas.', tile_type: 'classroom', icon: 'bi-easel2-fill', tag: 'ruang kelas ✨' },
  { title: 'Custom Uniform', description: 'Seragam desain sendiri — hanya dipakai hari Senin. Selebihnya bebas & ekspresif.', tile_type: 'uniform', icon: 'bi-palette2', tag: '' },
  { title: 'One Student, One iPad', description: 'Dukungan penuh teknologi Apple untuk eksplorasi tanpa batas. Gratis untuk siswa baru.', tile_type: 'ipad', icon: 'bi-tablet-fill', tag: '' },
  { title: 'Asrama & Lingkungan 24/7', description: 'Hunian nyaman bagi siswa luar kota. Pendampingan akademik dan pembinaan karakter harian oleh mentor.', tile_type: 'asrama', icon: '', tag: '' },
];

const Life = () => {
  const tiles = useCMS('/life-tiles?sort=order:asc&populate=*&status=published', LIFE_FALLBACK, (res) => res.data);
  const sec = useCMS('/life-section?status=published', {eyebrow:'05 · Kehidupan Sekolah ✎',title:'Sekolah paling seru buat anak kreatif 😎',subtitle:'Di HelloMotion, suasana belajar sehangat studio — kolaboratif, bebas ekspresi, dan penuh kejutan.'}, (res) => res.data);

  const renderTile = (t) => {
    const imgUrl = t.image?.url ? `${STRAPI_URL}${t.image.url}` : '/assets/asrama.png';
    if (t.tile_type === 'asrama') {
      return (
        <div key={t.title} className="life-tile life-tile--asrama">
          <img src={imgUrl} alt={t.title} />
          <div className="asrama-body">
            <h4>{t.title}</h4>
            <p>{t.description}</p>
          </div>
        </div>
      );
    }
    return (
      <div key={t.title} className={`life-tile life-tile--${t.tile_type}`}>
        {t.tag && <span className="life-tile__tag">{t.tag}</span>}
        {t.icon && <i className={`bi ${t.icon} life-tile__icon`}></i>}
        <h4>{t.title}</h4>
        <p>{t.description}</p>
      </div>
    );
  };

  return (
    <section id="life" className="section life">
      <div className="container">
        <div style={{maxWidth: 720}}>
          <span className="section-eyebrow">{sec.eyebrow}</span>
          <h2 className="section-title" dangerouslySetInnerHTML={{__html: (sec.title || '').replace(/anak kreatif/g, '<em class="hl-pill hl-pink">anak kreatif</em>')}} />
          <p style={{marginTop: 18, fontSize: 17}}>{sec.subtitle}</p>
        </div>
        <div className="life__grid">
          {tiles.map(renderTile)}
        </div>
      </div>
    </section>
  );
};


export default Life;
