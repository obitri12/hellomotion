const EMBED_URL = process.env.STRAPI_ADMIN_ANALYTICS_EMBED_URL || '';

const Analytics = () => {
  if (EMBED_URL) {
    return (
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Analytics</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>Traffic & performa website HelloMotion</p>
        <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <iframe
            src={EMBED_URL}
            width="100%"
            height="900"
            style={{ border: 'none', display: 'block' }}
            allowFullScreen
            title="Google Analytics Dashboard"
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '720px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Analytics</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Traffic & performa website HelloMotion</p>

      <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
        <strong>⚠️ Dashboard belum dikonfigurasi</strong>
        <p style={{ marginTop: '8px', color: '#666' }}>Ikuti langkah di bawah untuk menampilkan data analytics.</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Cara Setup</h2>
        <ol style={{ lineHeight: '2.2', paddingLeft: '20px', color: '#333' }}>
          <li>Buka <a href="https://lookerstudio.google.com" target="_blank" rel="noopener" style={{ color: '#4945FF' }}>lookerstudio.google.com</a></li>
          <li>Klik <strong>Create → Report</strong> → pilih data source <strong>Google Analytics</strong></li>
          <li>Pilih properti GA4 kamu (<code>G-QMY66L0590</code>)</li>
          <li>Desain dashboard (visitors, page views, sessions, dll)</li>
          <li>Klik <strong>File → Embed report</strong> → copy URL embed-nya</li>
          <li>
            Buka file <code style={{ background: '#f0f0ff', padding: '2px 8px', borderRadius: '4px' }}>backend/.env</code> dan isi:
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '6px', marginTop: '8px', fontSize: '13px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
              STRAPI_ADMIN_ANALYTICS_EMBED_URL=https://lookerstudio.google.com/embed/reporting/YOUR-ID/page/p_xxx
            </div>
          </li>
          <li>Restart Strapi → dashboard muncul di halaman ini</li>
        </ol>
      </div>
    </div>
  );
};

export default Analytics;
