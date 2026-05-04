import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { STRAPI_URL, fetchAPI, Nav, Footer } from '../shared';

const CATEGORIES = { berita: 'Berita', kegiatan: 'Kegiatan', prestasi: 'Prestasi', tips: 'Tips', pengumuman: 'Pengumuman' };
const CAT_COLORS = { berita: 'chip-pink', kegiatan: 'chip-mint', prestasi: 'chip-yellow', tips: '', pengumuman: 'chip-pink' };
const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

const renderMarkdown = (md) => {
  if (!md) return '';
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hublp])(.+)$/gm, '<p>$1</p>');
};

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }

    setLoading(true);
    setArticle(null);
    setRelated([]);

    fetchAPI(`/articles?filters[slug][$eq]=${slug}&populate=*&status=published`).then(res => {
      if (res?.data?.[0]) {
        const a = res.data[0];
        setArticle(a);

        const seoTitle = a.seo_title || `${a.title} — HelloMotion High School Malang`;
        const seoDesc = a.seo_description || a.ringkasan || a.excerpt || '';
        document.title = seoTitle;

        const setMeta = (attr, key, val) => {
          if (!val) return;
          let el = document.querySelector(`meta[${attr}="${key}"]`);
          if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
          el.setAttribute('content', val);
        };
        setMeta('name', 'description', seoDesc);
        setMeta('property', 'og:title', seoTitle);
        setMeta('property', 'og:description', seoDesc);
        setMeta('property', 'og:type', 'article');
        if (a.cover?.url) setMeta('property', 'og:image', `${STRAPI_URL}${a.cover.url}`);

        if (a.category) {
          fetchAPI(`/articles?filters[category][$eq]=${a.category}&filters[slug][$ne]=${slug}&sort=createdAt:desc&populate=*&status=published&pagination[limit]=3`).then(r => {
            if (r?.data) setRelated(r.data);
          });
        }
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <>
        <Nav />
        <main className="container" style={{paddingTop: 120, paddingBottom: 80, textAlign: 'center', minHeight: '60vh'}}>
          <p style={{color: 'var(--fg-3)', fontSize: 18}}>Memuat artikel...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Nav />
        <main className="container" style={{paddingTop: 120, paddingBottom: 80, textAlign: 'center', minHeight: '60vh'}}>
          <h1 style={{fontSize: 32, marginBottom: 16}}>Artikel tidak ditemukan</h1>
          <p style={{color: 'var(--fg-3)', marginBottom: 28}}>Artikel yang kamu cari tidak ada atau sudah dihapus.</p>
          <Link to="/blog" className="btn btn-ghost btn-sm"><i className="bi bi-arrow-left"></i> Kembali ke Blog</Link>
        </main>
        <Footer />
      </>
    );
  }

  const a = article;
  const coverUrl = a.cover?.url ? `${STRAPI_URL}${a.cover.url}` : null;
  const shareUrl = window.location.href;

  return (
    <>
      <Nav />
      <main style={{paddingTop: 100, paddingBottom: 80}}>
        <div className="container">
          <div className="article">
            <Link to="/blog" className="btn btn-ghost btn-sm" style={{marginBottom: 28}}>
              <i className="bi bi-arrow-left"></i> Semua Artikel
            </Link>

            {coverUrl && <img src={coverUrl} alt={a.title} className="article__cover" />}

            <div className="article__meta">
              {a.category && <span className={`chip ${CAT_COLORS[a.category] || ''}`}>{CATEGORIES[a.category] || a.category}</span>}
              {a.author && <span>oleh <strong>{a.author}</strong></span>}
              <span>{formatDate(a.publishedAt || a.createdAt)}</span>
            </div>

            <h1 className="article__title">{a.title}</h1>

            <div className="article__body" dangerouslySetInnerHTML={{__html: renderMarkdown(a.content)}} />

            <div className="article__share">
              <span style={{fontSize: 14, fontWeight: 700, color: 'var(--fg-3)'}}>Bagikan:</span>
              <a href={`https://wa.me/?text=${encodeURIComponent(a.title + ' ' + shareUrl)}`} target="_blank" rel="noopener" className="share-btn" style={{background: '#25D366', color: 'white'}} aria-label="WhatsApp">
                <i className="bi bi-whatsapp"></i>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener" className="share-btn" style={{background: '#1877F2', color: 'white'}} aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(a.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener" className="share-btn" style={{background: '#1DA1F2', color: 'white'}} aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <button className="share-btn" style={{background: 'var(--hm-navy)', color: 'var(--hm-cream)'}} onClick={() => { navigator.clipboard.writeText(shareUrl); alert('Link disalin!'); }} aria-label="Copy link">
                <i className="bi bi-link-45deg"></i>
              </button>
            </div>
          </div>

          {related.length > 0 && (
            <div style={{marginTop: 64}}>
              <h2 style={{fontSize: 24, marginBottom: 24}}>Artikel Terkait</h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20}}>
                {related.map(r => {
                  const rCover = r.cover?.url ? `${STRAPI_URL}${r.cover.url}` : null;
                  return (
                    <Link key={r.slug} to={`/artikel/${r.slug}`} style={{display: 'block', background: 'var(--bg-card)', borderRadius: 'var(--r-xl)', border: '1.5px solid var(--hm-border)', overflow: 'hidden', transition: 'transform 0.2s', textDecoration: 'none', color: 'inherit'}}>
                      {rCover ? <img src={rCover} alt={r.title} style={{width: '100%', height: 160, objectFit: 'cover'}} /> : <div style={{height: 160, background: 'linear-gradient(135deg, var(--hm-pink-tint), var(--hm-yellow-tint))'}}></div>}
                      <div style={{padding: '16px 20px'}}>
                        <h4 style={{fontSize: 16, fontWeight: 700, lineHeight: 1.3, marginBottom: 6}}>{r.title}</h4>
                        <span style={{fontSize: 12, color: 'var(--fg-3)'}}>{formatDate(r.publishedAt || r.createdAt)}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ArticlePage;
