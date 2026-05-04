import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { STRAPI_URL, fetchAPI, Nav, Footer } from '../shared';

const CATEGORIES = { berita: 'Berita', kegiatan: 'Kegiatan', prestasi: 'Prestasi', tips: 'Tips', pengumuman: 'Pengumuman' };
const CAT_COLORS = { berita: 'chip-pink', kegiatan: 'chip-mint', prestasi: 'chip-yellow', tips: '', pengumuman: 'chip-pink' };
const shortDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const ArticleCard = ({ article }) => {
  const a = article;
  const coverUrl = a.cover?.url ? `${STRAPI_URL}${a.cover.url}` : null;

  return (
    <Link to={`/artikel/${a.slug}`} className="blog-card" style={{display: 'block', textDecoration: 'none', color: 'inherit'}}>
      {coverUrl ? (
        <img src={coverUrl} alt={a.title} className="blog-card__cover" />
      ) : (
        <div className="blog-card__placeholder">
          <i className="bi bi-newspaper" style={{fontSize: 48, color: 'var(--hm-pink)', opacity: 0.4}}></i>
        </div>
      )}
      <div className="blog-card__body">
        <div className="blog-card__tags">
          {a.category && <span className={`chip ${CAT_COLORS[a.category] || ''}`} style={{fontSize: 11}}>{CATEGORIES[a.category] || a.category}</span>}
          {a.featured && <span className="chip chip-yellow" style={{fontSize: 11}}>⭐ Featured</span>}
        </div>
        <h3 className="blog-card__title">{a.title}</h3>
        <p className="blog-card__excerpt">{a.ringkasan || a.excerpt}</p>
        <div className="blog-card__footer">
          <span className="blog-card__date">{shortDate(a.publishedAt || a.createdAt)}</span>
          <span className="blog-card__read">Baca selengkapnya →</span>
        </div>
      </div>
    </Link>
  );
};

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAPI('/articles?sort=createdAt:desc&populate=*&status=published').then(res => {
      if (res?.data) setArticles(res.data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'all' ? articles : articles.filter(a => a.category === filter);

  return (
    <>
      <Nav />
      <main className="container" style={{paddingTop: 100, paddingBottom: 80, minHeight: '70vh'}}>
        <div style={{textAlign: 'center', maxWidth: 640, margin: '0 auto 40px'}}>
          <span className="section-eyebrow">Blog ✎</span>
          <h1 style={{fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, marginTop: 8}}>
            Berita &amp; Artikel
          </h1>
          <p style={{marginTop: 14, fontSize: 17, color: 'var(--fg-2)'}}>
            Info terkini seputar HelloMotion, tips pendidikan, dan cerita inspiratif.
          </p>
        </div>

        <div className="blog-filters">
          {[['all', 'Semua'], ...Object.entries(CATEGORIES)].map(([key, label]) => (
            <button key={key} className={`filter-btn ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{textAlign: 'center', color: 'var(--fg-3)', padding: 40}}>Memuat artikel...</p>
        ) : filtered.length === 0 ? (
          <p style={{textAlign: 'center', color: 'var(--fg-3)', padding: 40}}>
            {filter === 'all' ? 'Belum ada artikel. Tambahkan di CMS.' : `Belum ada artikel kategori "${CATEGORIES[filter]}".`}
          </p>
        ) : (
          <div className="blog-grid">
            {filtered.map(a => (
              <ArticleCard key={a.slug || a.id} article={a} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
