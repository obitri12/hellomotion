const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "pink"
}/*EDITMODE-END*/;

const ACCENTS = {
  pink:   { '--hm-pink': '#E66571', '--hm-pink-deep': '#D94A5A', '--hm-pink-tint': '#FDEBED', '--hm-pink-soft': '#F7C2C9' },
  violet: { '--hm-pink': '#8B5CF6', '--hm-pink-deep': '#7C3AED', '--hm-pink-tint': '#F3EEFF', '--hm-pink-soft': '#D7C7FB' },
  coral:  { '--hm-pink': '#FF6B4A', '--hm-pink-deep': '#EB4D2C', '--hm-pink-tint': '#FFEAE2', '--hm-pink-soft': '#FFC4B2' },
  blue:   { '--hm-pink': '#3B82F6', '--hm-pink-deep': '#2563EB', '--hm-pink-tint': '#E7F0FE', '--hm-pink-soft': '#B8D1FA' },
};

function applyTweaks(t) {
  document.documentElement.setAttribute('data-theme', t.theme === 'dark' ? 'dark' : 'light');
  const accent = ACCENTS[t.accent] || ACCENTS.pink;
  Object.entries(accent).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}

const TweaksPanel = ({ tweaks, setTweaks, onClose }) => {
  const setKey = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    applyTweaks(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*'); } catch {}
  };

  return (
    <div className="tweaks">
      <div className="tweaks__head">
        <strong>🎨 Tweaks</strong>
        <button onClick={onClose} aria-label="close"><i className="bi bi-x-lg"></i></button>
      </div>
      <div className="tweaks__body">
        <div className="tweak-row">
          <label>Warna aksen</label>
          <div className="swatches">
            {Object.entries(ACCENTS).map(([k, v]) => (
              <button key={k}
                className={`swatch ${tweaks.accent === k ? 'is-active' : ''}`}
                style={{ background: v['--hm-pink'] }}
                onClick={() => setKey('accent', k)}
                aria-label={k}/>
            ))}
          </div>
        </div>
        <div className="tweak-row toggle-row">
          <span><i className={`bi bi-${tweaks.theme === 'dark' ? 'moon-stars-fill' : 'sun-fill'}`}></i> Dark mode</span>
          <button className={`toggle ${tweaks.theme === 'dark' ? 'is-on' : ''}`}
                  onClick={() => setKey('theme', tweaks.theme === 'dark' ? 'light' : 'dark')}
                  aria-label="dark mode"/>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [showTweaks, setShowTweaks] = React.useState(false);

  React.useEffect(() => {
    applyTweaks(TWEAK_DEFAULTS);

    const onMsg = (ev) => {
      const d = ev.data || {};
      if (d.type === '__activate_edit_mode') setShowTweaks(true);
      if (d.type === '__deactivate_edit_mode') setShowTweaks(false);
    };
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}

    // reveal on scroll
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section, .hero__copy, .hero__visual').forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });

    return () => { window.removeEventListener('message', onMsg); io.disconnect(); };
  }, []);

  return (
    <>
      <Nav/>
      <Hero/>
      <div className="stitch"/>
      <Curriculum/>
      <div className="stitch"/>
      <Factory/>
      <div className="stitch"/>
      <Subjects/>
      <div className="stitch"/>
      <Life/>
      <div className="stitch"/>
      <Alumni/>
      <div className="stitch"/>
      <Alur/>
      <div className="stitch"/>
      <FAQ/>
      <Daftar/>
      <Footer/>

      <a className="fab-wa" href="https://wa.me/6282289991200" target="_blank" rel="noopener" aria-label="WhatsApp">
        <i className="bi bi-whatsapp"></i>
      </a>

      {showTweaks && <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} onClose={() => setShowTweaks(false)}/>}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
