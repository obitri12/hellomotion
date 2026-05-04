import React from 'react';
import SEOHead from './components/SEOHead';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import Factory from './components/Factory';
import Subjects from './components/Subjects';
import Life from './components/Life';
import Alumni from './components/Alumni';
import Alur from './components/Alur';
import FAQ from './components/FAQ';
import Daftar from './components/Daftar';
import Footer from './components/Footer';

const App = () => {
  React.useEffect(() => {
    // reveal on scroll
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section, .hero__copy, .hero__visual').forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SEOHead />
      <Nav />
      <Hero />
      <div className="stitch" />
      <Curriculum />
      <div className="stitch" />
      <Factory />
      <div className="stitch" />
      <Subjects />
      <div className="stitch" />
      <Life />
      <div className="stitch" />
      <Alumni />
      <div className="stitch" />
      <Alur />
      <div className="stitch" />
      <FAQ />
      <Daftar />
      <Footer />

      <a className="fab-wa" href="https://wa.me/6282289991200" target="_blank" rel="noopener" aria-label="WhatsApp">
        <i className="bi bi-whatsapp"></i>
      </a>
    </>
  );
};

export default App;
