const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <h4>HelloMotion High School Malang</h4>
          <p>SMA kreatif pertama di Indonesia. Membentuk generasi kreatif, kritis, dan berbudi pekerti — siap jadi pemimpin di abad 21.</p>
          <div className="footer__social">
            <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" aria-label="TikTok"><i className="bi bi-tiktok"></i></a>
            <a href="#" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
            <a href="#" aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>
          </div>
        </div>
        <div className="footer__col">
          <h5>Kontak</h5>
          <a href="https://wa.me/6282289991200">WA: 0822 8999 1200</a>
          <a href="https://instagram.com/hellomotion.malang">@hellomotion.malang</a>
          <a href="https://hellomotion.sch.id">hellomotion.sch.id</a>
        </div>
        <div className="footer__col">
          <h5>Alamat</h5>
          <p>Gedung Malang Creative Center (MCC)<br/>Lantai 5, Kawasan KEK Singhasari<br/>Malang, Jawa Timur</p>
        </div>
        <div className="footer__col">
          <h5>Info</h5>
          <a href="#about">Tentang</a>
          <a href="#curriculum">Kurikulum</a>
          <a href="#daftar">PPDB 2026/2027</a>
          <a href="#faq">FAQ</a>
        </div>
      </div>
      <div className="container footer__copy">
        <span>© 2026 HelloMotion High School. All rights reserved.</span>
        <span>Dibuat dengan ♥ di Malang.</span>
      </div>
    </footer>
  );
};

Object.assign(window, { Footer });
