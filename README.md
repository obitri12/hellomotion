# HelloMotion High School Malang — Website

Website resmi HelloMotion High School Malang. Dibangun dengan React + Vite (frontend) dan Strapi CMS (backend).

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 18, Vite, React Router |
| Backend/CMS | Strapi 5 (Headless CMS) |
| Database | SQLite (development), bisa diganti PostgreSQL untuk production |
| Styling | CSS custom (design tokens, responsive) |
| Font | Onest (body & heading), Caveat (aksen playful), Fraunces (aksen editorial) |

## Struktur Project

```
├── src/                          # Source code frontend
│   ├── main.jsx                  # Entry point + Router setup
│   ├── App.jsx                   # Halaman beranda (compose komponen)
│   ├── shared.jsx                # STRAPI_URL, fetchAPI, useCMS, Nav & Footer shared
│   ├── styles.css                # Semua CSS (tokens, layout, komponen)
│   ├── components/               # Komponen halaman beranda
│   │   ├── SEOHead.jsx           # Meta tags SEO dari CMS
│   │   ├── Nav.jsx               # Navbar (beranda, smooth scroll)
│   │   ├── Hero.jsx              # Hero section
│   │   ├── Curriculum.jsx        # Kurikulum & double diploma
│   │   ├── Factory.jsx           # Creative Factory
│   │   ├── Subjects.jsx          # Mata pelajaran
│   │   ├── Life.jsx              # Kehidupan sekolah
│   │   ├── Alumni.jsx            # Alumni & prestasi
│   │   ├── Alur.jsx              # Alur PPDB
│   │   ├── FAQ.jsx               # FAQ
│   │   ├── Daftar.jsx            # Form pendaftaran
│   │   └── Footer.jsx            # Footer
│   └── pages/                    # Halaman blog & artikel
│       ├── BlogPage.jsx          # Listing semua artikel
│       └── ArticlePage.jsx       # Detail artikel
├── public/
│   ├── assets/                   # Gambar statis (logo, foto, dll)
│   └── _redirects                # SPA redirect (Netlify)
├── backend/                      # Strapi CMS
│   ├── src/api/                  # Content types & API
│   ├── config/                   # Konfigurasi Strapi
│   └── .tmp/data.db              # Database SQLite (dev)
├── index.html                    # Vite entry HTML
├── vite.config.js                # Konfigurasi Vite
├── package.json                  # Dependencies frontend
├── .env                          # Environment variables
└── README.md                     # Dokumentasi project
```

## Halaman & Routing

| Route | Halaman |
|-------|---------|
| `/` | Beranda (Hero, Tentang, Kurikulum, Factory, Mapel, Kehidupan, Alumni, Alur PPDB, FAQ, Daftar) |
| `/blog` | Listing semua artikel dengan filter kategori |
| `/artikel/:slug` | Detail artikel lengkap |

## CMS Content Types

Semua konten dikelola via Strapi Admin Panel:

- **Hero Section** — teks headline, badge, statistik, gambar
- **Curriculum Section** — deskripsi kurikulum & item
- **Factories** — daftar Creative Factory
- **Subjects** — mata pelajaran (kreatif & akademik)
- **Life Tiles** — kehidupan sekolah
- **Achievements** — prestasi sekolah
- **Testimonials** — testimoni alumni/siswa/ortu
- **Timeline Steps** — alur PPDB
- **FAQs** — pertanyaan yang sering ditanyakan
- **Daftar Section** — konten form pendaftaran
- **Articles** — blog/berita
- **Site Setting** — info sekolah, kontak, footer
- **SEO Setting** — meta tags, OG image, favicon

## Development

### Prerequisites

- Node.js >= 18
- npm >= 9

### 1. Install dependencies

```bash
# Frontend
npm install

# Backend
cd backend && npm install
```

### 2. Setup environment

Buat file `.env` di root:

```env
VITE_STRAPI_URL=http://localhost:1337
```

### 3. Jalankan development server

Terminal 1 — Backend (Strapi):
```bash
cd backend
npm run develop
```
Strapi akan jalan di http://localhost:1337

Terminal 2 — Frontend (Vite):
```bash
npm run dev
```
Frontend akan jalan di http://localhost:5173

### 4. Login Strapi Admin

Buka http://localhost:1337/admin

```
Email: admin@hellomotion.com
Password: Admin123!
```

## Build untuk Production

### Frontend

```bash
npm run build
```

Output akan ada di folder `dist/`. File-file ini yang di-deploy ke hosting.

### Backend (Strapi)

```bash
cd backend
npm run build
npm run start
```

## Deployment

### Frontend (Static Hosting)

Frontend adalah SPA (Single Page Application). Bisa di-deploy ke:

- **Netlify** — upload folder `dist/`, sudah ada `_redirects` untuk SPA routing
- **Nginx** — serve folder `dist/` dengan config:
  ```nginx
  server {
      listen 80;
      server_name hellomotion.sch.id;
      root /var/www/hellomotion/dist;
      index index.html;

      location / {
          try_files $uri $uri/ /index.html;
      }

      location /assets {
          expires 30d;
          add_header Cache-Control "public, immutable";
      }
  }
  ```
- **Apache** — tambahkan `.htaccess` di folder `dist/`:
  ```apache
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```

**Penting:** Set environment variable `VITE_STRAPI_URL` ke URL Strapi production sebelum build:
```bash
VITE_STRAPI_URL=https://api.hellomotion.sch.id npm run build
```

### Backend (Strapi)

Strapi bisa di-deploy ke:

- **VPS/Server** (recommended) — jalankan dengan PM2:
  ```bash
  cd backend
  npm run build
  pm2 start npm --name "strapi" -- run start
  ```
- **Railway** / **Render** / **DigitalOcean App Platform**

Untuk production, ganti database ke PostgreSQL. Edit `backend/config/database.ts`:
```ts
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
    },
  },
});
```

### Checklist Deployment

- [ ] Set `VITE_STRAPI_URL` ke URL Strapi production
- [ ] Build frontend: `npm run build`
- [ ] Upload `dist/` ke hosting frontend
- [ ] Pastikan SPA routing dikonfigurasi (semua route fallback ke `index.html`)
- [ ] Deploy Strapi ke server
- [ ] Set Strapi CORS agar menerima request dari domain frontend
- [ ] Ganti database ke PostgreSQL (production)
- [ ] Upload assets/media ke cloud storage (opsional)

## Scripts

| Command | Fungsi |
|---------|--------|
| `npm run dev` | Jalankan frontend dev server (hot reload) |
| `npm run build` | Build frontend untuk production |
| `npm run preview` | Preview hasil build lokal |
| `cd backend && npm run develop` | Jalankan Strapi dev mode |
| `cd backend && npm run build` | Build Strapi untuk production |
| `cd backend && npm run start` | Jalankan Strapi production mode |

## Catatan

- Semua konten bisa diubah via Strapi Admin tanpa edit kode
- Jika CMS tidak tersedia, website tetap tampil dengan data fallback
- Gambar dari CMS diambil dari Strapi media library (`STRAPI_URL + path`)
- SEO meta tags otomatis di-set dari CMS (per halaman & per artikel)
