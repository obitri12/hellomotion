import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // ── 1. Set Public Role Permissions ──────────────────
    await setPublicPermissions(strapi);

    // ── 2. Seed default content if empty ────────────────
    await seedContent(strapi);
  },
};

/* ═══════════════════════════════════════════════════
   PUBLIC PERMISSIONS
   ═══════════════════════════════════════════════════ */
async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });
  if (!publicRole) return;

  // Content types that need "find" (read) access
  const readAPIs = [
    'api::hero-section.hero-section',
    'api::curriculum-section.curriculum-section',
    'api::factory.factory',
    'api::subject.subject',
    'api::life-tile.life-tile',
    'api::achievement.achievement',
    'api::testimonial.testimonial',
    'api::timeline-step.timeline-step',
    'api::faq.faq',
    'api::site-setting.site-setting',
    'api::factory-section.factory-section',
    'api::subjects-section.subjects-section',
    'api::life-section.life-section',
    'api::alumni-section.alumni-section',
    'api::alur-section.alur-section',
    'api::faq-section.faq-section',
    'api::daftar-section.daftar-section',
  ];

  // Registration needs "create" access too
  const createAPIs = [
    'api::registration.registration',
  ];

  const allActions: { api: string; action: string }[] = [];

  for (const api of readAPIs) {
    allActions.push({ api, action: 'find' });
    allActions.push({ api, action: 'findOne' });
  }
  for (const api of createAPIs) {
    allActions.push({ api, action: 'create' });
  }

  for (const { api, action } of allActions) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: { role: publicRole.id, action: `${api}.${action}` },
    });
    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action: `${api}.${action}`,
          role: publicRole.id,
          enabled: true,
        },
      });
    }
  }

  strapi.log.info('✅ Public permissions configured');
}

/* ═══════════════════════════════════════════════════
   SEED CONTENT
   ═══════════════════════════════════════════════════ */
async function seedContent(strapi: Core.Strapi) {
  await seedHero(strapi);
  await seedCurriculum(strapi);
  await seedFactories(strapi);
  await seedSubjects(strapi);
  await seedLifeTiles(strapi);
  await seedAchievements(strapi);
  await seedTestimonials(strapi);
  await seedTimelineSteps(strapi);
  await seedFAQs(strapi);
  await seedSiteSettings(strapi);
  await seedFactorySection(strapi);
  await seedSubjectsSection(strapi);
  await seedLifeSection(strapi);
  await seedAlumniSection(strapi);
  await seedAlurSection(strapi);
  await seedFaqSection(strapi);
  await seedDaftarSection(strapi);
  strapi.log.info('✅ Default content seeded');
}


// Helper: seed single type if empty
async function seedSingle(strapi: Core.Strapi, uid: string, data: Record<string, any>) {
  const existing = await strapi.documents(uid as any).findFirst({});
  if (existing) return;
  const entry = await strapi.documents(uid as any).create({ data });
  await strapi.documents(uid as any).publish({ documentId: entry.documentId });
}

// Helper: seed collection if empty
async function seedCollection(strapi: Core.Strapi, uid: string, items: Record<string, any>[]) {
  const existing = await strapi.documents(uid as any).findMany({ limit: 1 });
  if (existing && existing.length > 0) return;
  for (const item of items) {
    const entry = await strapi.documents(uid as any).create({ data: item });
    await strapi.documents(uid as any).publish({ documentId: entry.documentId });
  }
}

/* ── Hero Section ─────────────────────────────── */
async function seedHero(strapi: Core.Strapi) {
  await seedSingle(strapi, 'api::hero-section.hero-section', {
    badge_text: 'PPDB Tahun Ajaran 2026/2027',
    badge_scribble: 'dibuka!',
    headline: 'MORE THAN JUST HIGH SCHOOL!',
    sub_text: 'Lagi nyari SMA yang bisa mengasah kreativitasmu tapi tetap nggak ketinggalan pelajaran umum? HelloMotion High School Malang jawabannya. Di sini kamu bisa belajar Film Making, Desain Grafis, Ilustrasi, Fotografi, dan banyak lagi — dengan kurikulum yang berpusat pada kebutuhanmu.',
    cta_primary_text: 'Daftar Sekarang — Gratis Biaya Formulir!',
    cta_secondary_text: 'Lihat Program',
    stat_1_value: '2',
    stat_1_label: 'Ijazah resmi sekaligus',
    stat_2_value: '25%',
    stat_2_label: 'Diskon SPP gelombang 1',
    stat_3_value: '1:1',
    stat_3_label: 'Siswa & iPad pribadi',
  });
}

/* ── Curriculum Section ───────────────────────── */
async function seedCurriculum(strapi: Core.Strapi) {
  await seedSingle(strapi, 'api::curriculum-section.curriculum-section', {
    eyebrow: '02 · Kurikulum ✎',
    title: 'Kurikulum inovatif & dua ijazah.',
    description: 'Kami menggabungkan kurikulum nasional Kemendikbud dengan modifikasi khusus. Lulusan mendapatkan dua ijazah sekaligus: Kemendikbud dan Industri Kreatif — siap terjun ke dunia kerja profesional atau melanjutkan ke PT favorit.',
    diploma_1_title: 'Kemendikbud Ristek',
    diploma_1_desc: 'Ijazah SMA resmi Kurikulum Merdeka — diakui seluruh PTN & PTS di Indonesia.',
    diploma_2_title: 'Industri Kreatif',
    diploma_2_desc: 'Sertifikasi kompetensi kreatif (Filmmaking, Desain, Animasi) untuk jalur industri & freelance.',
    items: [
      { title: 'Keterampilan Abad 21', description: '4C: Critical thinking, Communication, Collaboration, Creativity' },
      { title: 'Design Thinking', description: 'Empati → Ideasi → Prototipe → Tes — terintegrasi di semua mapel' },
      { title: 'STEAM', description: 'Science, Tech, Engineering, Arts & Math dalam proyek lintas disiplin' },
      { title: 'Project Based Learning', description: 'Belajar lewat proyek nyata, output nyata, dampak nyata' },
    ],
  });
}

/* ── Factories ────────────────────────────────── */
async function seedFactories(strapi: Core.Strapi) {
  await seedCollection(strapi, 'api::factory.factory', [
    { icon: 'bi-camera-reels-fill', name: 'Digital Factory', description: 'Produksi konten digital, sosial media, fotografi komersial.', order: 1 },
    { icon: 'bi-film', name: 'Animation Factory', description: 'Studio animasi 2D/3D lengkap untuk praktik langsung.', order: 2 },
    { icon: 'bi-code-slash', name: 'Coding Factory', description: 'Pengembangan software, game, dan produk digital.', order: 3 },
    { icon: 'bi-image-fill', name: 'Paradise Picture', description: 'Rumah produksi film — proyek nyata bareng praktisi.', order: 4 },
  ]);
}

/* ── Subjects ─────────────────────────────────── */
async function seedSubjects(strapi: Core.Strapi) {
  await seedCollection(strapi, 'api::subject.subject', [
    { name: 'Fotografi', category: 'creative', order: 1 },
    { name: 'Desain Grafis', category: 'creative', order: 2 },
    { name: 'Ilustrasi', category: 'creative', order: 3 },
    { name: 'Animasi', category: 'creative', order: 4 },
    { name: 'Filmmaking', category: 'creative', order: 5 },
    { name: 'Ekonomi', category: 'academic', order: 6 },
    { name: 'Matematika', category: 'academic', order: 7 },
    { name: 'Bhs Inggris', category: 'academic', order: 8 },
    { name: 'Bhs Jepang', category: 'academic', order: 9 },
    { name: 'Entrepreneurship', category: 'academic', order: 10 },
    { name: 'IPS/IPA Terintegrasi', category: 'academic', order: 11 },
  ]);
}

/* ── Life Tiles ───────────────────────────────── */
async function seedLifeTiles(strapi: Core.Strapi) {
  await seedCollection(strapi, 'api::life-tile.life-tile', [
    { title: 'Creative Classrooms', description: 'Kelas wajib dicoret-coret dan dihias sesuai keinginan kelas. Dinding adalah kanvas.', tile_type: 'classroom', icon: 'bi-easel2-fill', tag: 'ruang kelas ✨', order: 1 },
    { title: 'Custom Uniform', description: 'Seragam desain sendiri — hanya dipakai hari Senin. Selebihnya bebas & ekspresif.', tile_type: 'uniform', icon: 'bi-palette2', tag: '', order: 2 },
    { title: 'One Student, One iPad', description: 'Dukungan penuh teknologi Apple untuk eksplorasi tanpa batas. Gratis untuk siswa baru.', tile_type: 'ipad', icon: 'bi-tablet-fill', tag: '', order: 3 },
    { title: 'Asrama & Lingkungan 24/7', description: 'Hunian nyaman bagi siswa luar kota. Pendampingan akademik dan pembinaan karakter harian oleh mentor.', tile_type: 'asrama', icon: '', tag: '', order: 4 },
  ]);
}

/* ── Achievements ─────────────────────────────── */
async function seedAchievements(strapi: Core.Strapi) {
  await seedCollection(strapi, 'api::achievement.achievement', [
    { icon: 'bi-trophy-fill', title: 'Medali Emas FIKSI', description: 'Festival Inovasi & Kewirausahaan Siswa Nasional', year: '2024', order: 1 },
    { icon: 'bi-camera-reels', title: 'Nominasi FFI', description: 'Festival Film Indonesia — kategori film pelajar', year: '2023', order: 2 },
    { icon: 'bi-mortarboard-fill', title: 'Diterima UI, ITB, UGM', description: 'Jalur prestasi & SNBP dengan beasiswa penuh', year: '2024', order: 3 },
    { icon: 'bi-globe-americas', title: 'Student Exchange Jepang', description: 'Program pertukaran budaya & bahasa tahunan', year: '2025', order: 4 },
  ]);
}

/* ── Testimonials ─────────────────────────────── */
async function seedTestimonials(strapi: Core.Strapi) {
  await seedCollection(strapi, 'api::testimonial.testimonial', [
    { name: 'Raka Prasetya', role: 'Alumni 2024 · Mahasiswa DKV ITB', quote: '"Di HelloMotion aku belajar bikin film beneran sejak kelas 10. Portofolio itu yang bantu aku masuk ITB jalur prestasi tanpa tes."', order: 1 },
    { name: 'Alya Syahrani', role: 'Siswa Kelas 11', quote: '"Kelas-nya kayak studio kreatif. Nggak ada PR, tapi justru bikin kami lebih semangat karena semua proyek terasa nyata."', order: 2 },
    { name: 'Bu Fitri Handayani', role: 'Orang tua alumni', quote: '"Awalnya ragu karena beda dari SMA biasa. Tapi anak saya tumbuh lebih percaya diri, mandiri, dan punya karya yang bisa dibanggakan."', order: 3 },
  ]);
}

/* ── Timeline Steps ───────────────────────────── */
async function seedTimelineSteps(strapi: Core.Strapi) {
  await seedCollection(strapi, 'api::timeline-step.timeline-step', [
    { step_number: '01', title: 'Isi Formulir', description: 'Daftar online — gratis biaya formulir.', order: 1 },
    { step_number: '02', title: 'Tes Minat', description: 'Tes bakat, minat, & wawancara orang tua.', order: 2 },
    { step_number: '03', title: 'Portofolio', description: 'Kirim karya atau passion project (opsional).', order: 3 },
    { step_number: '04', title: 'Pengumuman', description: 'Hasil diumumkan 7 hari kerja via email.', order: 4 },
    { step_number: '05', title: 'Registrasi', description: 'Selesaikan daftar ulang & dapatkan iPad!', order: 5 },
  ]);
}

/* ── FAQs ─────────────────────────────────────── */
async function seedFAQs(strapi: Core.Strapi) {
  await seedCollection(strapi, 'api::faq.faq', [
    { question: 'Apakah ijazah HelloMotion diakui di PTN?', answer: 'Ya, HelloMotion High School terakreditasi Kemendikbud Ristek dan mengeluarkan ijazah SMA resmi. Lulusan kami diterima di UI, ITB, UGM, Unpad, dan kampus kreatif luar negeri lewat jalur SNBP, SNBT, dan prestasi.', order: 1 },
    { question: 'Berapa total biaya sekolah per tahun?', answer: 'Biaya terdiri dari uang pangkal dan SPP bulanan. Gelombang 1 mendapat diskon SPP 25% dan gratis biaya formulir pendaftaran. Hubungi tim admisi untuk rincian tarif lengkap dan skema cicilan.', order: 2 },
    { question: 'Apa benar setiap siswa mendapat iPad gratis?', answer: 'Benar. Setiap siswa baru gelombang 1 mendapatkan 1 unit iPad untuk mendukung pembelajaran berbasis proyek. iPad menjadi milik siswa setelah menyelesaikan masa studi 3 tahun.', order: 3 },
    { question: 'Apakah ada asrama untuk siswa luar kota?', answer: 'Ya, tersedia asrama putra dan putri di lingkungan sekolah. Fasilitas mencakup kamar, ruang belajar, kantin, dan mentor pendamping 24 jam. Biaya asrama terpisah dari SPP.', order: 4 },
    { question: 'Bagaimana kalau anak saya belum yakin dengan bidang kreatifnya?', answer: 'Justru di sinilah siswa difasilitasi mengeksplorasi 5 bidang kreatif di semester pertama. Spesialisasi baru ditentukan di akhir kelas 10 — dengan bimbingan mentor.', order: 5 },
    { question: 'Apakah HelloMotion menerima siswa pindahan dari SMA lain?', answer: 'Bisa, untuk kelas 10 dan 11 dengan seleksi tambahan. Silakan hubungi WhatsApp admisi untuk informasi kuota dan prosesnya.', order: 6 },
  ]);
}

/* ── Site Settings ────────────────────────────── */
async function seedSiteSettings(strapi: Core.Strapi) {
  await seedSingle(strapi, 'api::site-setting.site-setting', {
    school_name: 'HelloMotion High School Malang',
    tagline: 'SMA kreatif pertama di Indonesia. Membentuk generasi kreatif, kritis, dan berbudi pekerti — siap jadi pemimpin di abad 21.',
    whatsapp: '6282289991200',
    instagram: 'hellomotion.malang',
    tiktok: '',
    youtube: '',
    website: 'hellomotion.sch.id',
    address: 'Gedung Malang Creative Center (MCC)\nLantai 5, Kawasan KEK Singhasari\nMalang, Jawa Timur',
    footer_text: '© 2026 HelloMotion High School. All rights reserved.',
  });
}

/* ── Factory Section ──────────────────────────── */
async function seedFactorySection(strapi: Core.Strapi) {
  await seedSingle(strapi, 'api::factory-section.factory-section', {
    eyebrow: '03 · Creative Factory ✦',
    title: 'Belajar langsung di pusat industri kreatif.',
    description: 'Kami tidak hanya belajar teori. HelloMotion High School Malang menggandeng Digital Factory, Animation Factory, Coding Factory, dan Paradise Picture di Kawasan KEK Singhasari. Siswa mengerjakan proyek langsung bersama para ahli dan terhubung dengan industri kreatif sejak kelas 10.',
    benefit_text: 'Keuntungan nyata: portofolio industri sejak SMA, relasi profesional, & peluang magang di KEK Singhasari — bekal untuk karier kreatif atau studi lanjut.',
  });
}

/* ── Subjects Section ─────────────────────────── */
async function seedSubjectsSection(strapi: Core.Strapi) {
  await seedSingle(strapi, 'api::subjects-section.subjects-section', {
    eyebrow: '04 · Mata Pelajaran ★',
    title: 'Seimbang antara kreativitas & akademik.',
    subtitle: 'Lebih banyak praktik daripada teori. Pelajaran umum di HelloMotion pun seru, aplikatif, dan tidak pernah PR.',
    creative_label: 'Mapel Khas',
    creative_title: 'Untuk melatih cipta & rasa.',
    creative_desc: 'Mata pelajaran spesialisasi industri kreatif — diajar langsung oleh praktisi profesional.',
    creative_tagline: 'Setiap siswa bebas eksplorasi minat sejak kelas 10.',
    academic_label: 'Mapel Umum',
    academic_title: 'Pondasi akademik yang kuat.',
    academic_desc: 'Kurikulum Merdeka dikemas lewat metode PBL — aplikatif, menyenangkan, dan tanpa PR.',
    academic_tagline: 'Siap SNBP / SNBT maupun jalur prestasi.',
  });
}

/* ── Life Section ─────────────────────────────── */
async function seedLifeSection(strapi: Core.Strapi) {
  await seedSingle(strapi, 'api::life-section.life-section', {
    eyebrow: '05 · Kehidupan Sekolah ✎',
    title: 'Sekolah paling seru buat anak kreatif 😎',
    subtitle: 'Di HelloMotion, suasana belajar sehangat studio — kolaboratif, bebas ekspresi, dan penuh kejutan.',
  });
}

/* ── Alumni Section ───────────────────────────── */
async function seedAlumniSection(strapi: Core.Strapi) {
  await seedSingle(strapi, 'api::alumni-section.alumni-section', {
    eyebrow: '06 · Alumni & Prestasi ✦',
    title: 'Prestasi tanpa batas, masa depan berkelas.',
    subtitle: 'Alumni kami telah menembus berbagai PTN ternama dan kampus kreatif luar negeri — bersaing di dunia kreatif dengan prestasi nasional yang nyata.',
  });
}

/* ── Alur Section ─────────────────────────────── */
async function seedAlurSection(strapi: Core.Strapi) {
  await seedSingle(strapi, 'api::alur-section.alur-section', {
    eyebrow: '07 · Alur PPDB ✎',
    title: 'Lima langkah jadi siswa HelloMotion.',
    subtitle: 'Prosesnya simpel — kami dampingi dari formulir sampai hari pertama sekolah.',
  });
}

/* ── FAQ Section ──────────────────────────────── */
async function seedFaqSection(strapi: Core.Strapi) {
  await seedSingle(strapi, 'api::faq-section.faq-section', {
    eyebrow: 'FAQ ✦',
    title: 'Pertanyaan yang sering ditanyakan.',
  });
}

/* ── Daftar Section ───────────────────────────── */
async function seedDaftarSection(strapi: Core.Strapi) {
  await seedSingle(strapi, 'api::daftar-section.daftar-section', {
    eyebrow: 'Final CTA 🎓',
    title: 'ENROLL NOW!\nKuota terbatas.',
    description: 'Dapatkan promo gelombang 1: gratis biaya formulir + diskon SPP hingga 25%. Formulir online hanya 3 menit.',
    promo_1_icon: 'bi-ticket-perforated-fill',
    promo_1_title: 'Gratis biaya formulir',
    promo_1_desc: 'Pendaftaran online tanpa biaya admin',
    promo_2_icon: 'bi-percent',
    promo_2_title: 'Diskon SPP 25%',
    promo_2_desc: 'Khusus pendaftar gelombang 1 (sampai 30 Juni 2026)',
    promo_3_icon: 'bi-tablet-fill',
    promo_3_title: 'Free iPad untuk siswa baru',
    promo_3_desc: 'Jadi milik siswa setelah 3 tahun masa studi',
    form_title: 'Formulir Pendaftaran',
    form_subtitle: 'Tim admisi akan menghubungi kamu dalam 1×24 jam kerja.',
  });
}
