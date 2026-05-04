import React from 'react';
import { STRAPI_URL, fetchAPI } from '../shared';

function SEOHead() {
  React.useEffect(() => {
    fetchAPI('/seo-setting?populate=*&status=published').then(res => {
      if (!res || !res.data) return;
      const s = res.data;
      const set = (sel, attr, val) => { if (!val) return; let el = document.querySelector(sel); if (!el) { el = document.createElement('meta'); if (sel.includes('property=')) el.setAttribute('property', sel.match(/property="([^"]+)"/)[1]); else el.setAttribute('name', sel.match(/name="([^"]+)"/)[1]); document.head.appendChild(el); } el.setAttribute(attr, val); };

      if (s.meta_title) document.title = s.meta_title;
      set('meta[name="description"]', 'content', s.meta_description);
      set('meta[name="keywords"]', 'content', s.meta_keywords);
      set('meta[name="robots"]', 'content', s.robots);
      set('meta[property="og:title"]', 'content', s.og_title || s.meta_title);
      set('meta[property="og:description"]', 'content', s.og_description || s.meta_description);
      set('meta[property="og:type"]', 'content', 'website');
      if (s.og_image?.url) set('meta[property="og:image"]', 'content', `${STRAPI_URL}${s.og_image.url}`);
      if (s.canonical_url) { let link = document.querySelector('link[rel="canonical"]'); if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); } link.setAttribute('href', s.canonical_url); }
      if (s.google_verification) set('meta[name="google-site-verification"]', 'content', s.google_verification);
      if (s.favicon?.url) { let link = document.querySelector('link[rel="icon"]'); if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'icon'); document.head.appendChild(link); } link.setAttribute('href', `${STRAPI_URL}${s.favicon.url}`); }
    });
  }, []);
  return null;
}


export default SEOHead;
