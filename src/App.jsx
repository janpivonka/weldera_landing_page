import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Logo from './assets/logo.png';
import PatternImg from './assets/pattern.png';

function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const sectionRef = useRef(null);

  // BARVY
  const industryNavy = "#171649";
  const techLila = "#B5A8E3";
  const steelTeal = "#10373B";

  const photoNames = [
    "DSC_4436.jpg", "DSC_4751.jpg", "DSC_4644.jpg", "DSC_4475.jpg",
    "DSC_5005.jpg", "DSC_5113.jpg", "DSC_4758.jpg", "DSC_4569.jpg"
  ];

  // --- LOGIKA PRO CHYTRÝ NAVBAR A TLAČÍTKO NAHORU ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Ovládání šipky v rohu
      setShowScrollTop(currentScrollY > 500);

      // Ovládání navigace (skrývání při scrollu dolů, ukazování při scrollu nahoru)
      if (currentScrollY < 50) {
        setNavVisible(true);
      } else if (currentScrollY + windowHeight > documentHeight - 150) {
        setNavVisible(true);
      } else {
        if (currentScrollY > lastScrollY) {
          setNavVisible(false); // Scroll dolů
        } else {
          setNavVisible(true);  // Scroll nahoru
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // --- UNIVERZÁLNÍ ANIMACE REVEAL ---
  useLayoutEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = 'translateY(0)';
          } else {
            entry.target.style.opacity = "0";
            entry.target.style.transform = 'translateY(20px)';
          }
        });
      },
      { margin: '0px', threshold: 0.1 }
    );

    elements.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Slider a Kariéra logika
  useEffect(() => {
    const timer = setInterval(() => setCurrentIdx((prev) => (prev + 1) % photoNames.length), 5000);
    return () => clearInterval(timer);
  }, [photoNames.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsSectionActive(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = (e) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToFooter = (e) => {
    e.preventDefault();
    document.getElementById('kontakty')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans bg-white overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth !important; overflow-x: hidden; }
        body { margin: 0; overflow-x: hidden; width: 100%; }
        .edge-zigzag-bottom { clip-path: polygon(0 0, 100% 0, 100% 95%, 98% 100%, 96% 95%, 94% 100%, 92% 95%, 90% 100%, 88% 95%, 86% 100%, 84% 95%, 82% 100%, 80% 95%, 78% 100%, 76% 95%, 74% 100%, 72% 95%, 70% 100%, 68% 95%, 66% 100%, 64% 95%, 62% 100%, 60% 95%, 58% 100%, 56% 95%, 54% 100%, 52% 95%, 50% 100%, 48% 95%, 46% 100%, 44% 95%, 42% 100%, 40% 95%, 38% 100%, 36% 95%, 34% 100%, 32% 95%, 30% 100%, 28% 95%, 26% 100%, 24% 95%, 22% 100%, 20% 95%, 18% 100%, 16% 95%, 14% 100%, 12% 95%, 10% 100%, 8% 95%, 6% 100%, 4% 95%, 2% 100%, 0 95%); }
        .edge-zigzag-top { clip-path: polygon(0 5%, 2% 0, 4% 5%, 6% 0, 8% 5%, 10% 0, 12% 5%, 14% 0, 16% 5%, 18% 0, 20% 5%, 22% 0, 24% 5%, 26% 0, 28% 5%, 30% 0, 32% 5%, 34% 0, 36% 5%, 38% 0, 40% 5%, 42% 0, 44% 5%, 46% 0, 48% 5%, 50% 0, 52% 5%, 54% 0, 56% 5%, 58% 0, 60% 5%, 62% 0, 64% 5%, 66% 0, 68% 5%, 70% 0, 72% 5%, 74% 0, 76% 5%, 78% 0, 80% 5%, 82% 0, 84% 5%, 86% 0, 88% 5%, 90% 0, 92% 5%, 94% 0, 96% 5%, 98% 0, 100% 5%, 100% 100%, 0 100%); }
        .weldera-fragment { clip-path: polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%); }
        .btn-hover-effect:hover { background-color: ${techLila} !important; color: ${industryNavy} !important; transform: translateY(-2px); }
        .scroll-top-btn:hover { background-color: ${industryNavy} !important; color: white !important; transform: translateY(-5px) scale(1.05); }
      `}</style>

      {/* TLAČÍTKO SCROLL TO TOP (ŠIPKA) */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[110] w-14 h-14 flex items-center justify-center weldera-fragment shadow-2xl transition-all duration-500 scroll-top-btn ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ backgroundColor: techLila, color: industryNavy }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>

      {/* CHYTRÁ NAVIGACE */}
      <nav
        className={`bg-white px-6 md:px-20 py-6 fixed top-0 w-full z-[100] shadow-md border-b border-gray-100 transition-transform duration-500 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* LOGO SE SCALE EFEKTEM */}
          <img
            src={Logo}
            alt="Weldera Logo"
            className="h-10 object-contain cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
            onClick={scrollToTop}
          />
          <div className="flex gap-6 md:gap-10 text-[10px] font-bold uppercase tracking-widest items-center">
            <a href="#onas" style={{ color: industryNavy }} className="hover:opacity-50 transition-opacity hidden md:block">O nás</a>
            <a href="#sluzby" style={{ color: industryNavy }} className="hover:opacity-50 transition-opacity">Služby</a>
            <a href="#kontakty" onClick={scrollToFooter} style={{ color: industryNavy }} className="hover:opacity-50 transition-opacity hidden md:block">Kontakty</a>
            <a href="#kariera" className="px-6 py-2 weldera-fragment text-white btn-hover-effect transition-all" style={{ backgroundColor: techLila }}>Kariéra</a>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="relative py-48 px-6 md:px-20 edge-zigzag-bottom pt-60 text-white bg-[#171649]">
          <div className="absolute inset-0 z-0">
            {photoNames.map((name, i) => (
              <div key={name} className="absolute inset-0 transition-opacity duration-1000"
                style={{ backgroundImage: `url(/photos/${name})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: currentIdx === i ? 0.35 : 0 }}
              />
            ))}
          </div>
          <div className="max-w-7xl mx-auto relative z-20">
            <h1 className="text-6xl md:text-[90px] font-black leading-none mb-8 uppercase tracking-tighter reveal">
              NOVÁ <br/><span style={{ color: techLila }} className="italic">ERA</span>
            </h1>
            <p className="text-gray-200 text-lg mb-12 max-w-sm border-l-4 pl-6 font-light reveal" style={{ borderColor: techLila }}>
              Strojírenství není jen kov. Je to precizní skládačka fragmentů, které do sebe zapadají.
            </p>
            <button className="bg-white px-12 py-5 weldera-fragment text-[10px] font-bold uppercase text-[#171649] btn-hover-effect transition-all reveal">
              NAŠE TECHNOLOGIE
            </button>
          </div>
        </section>

        {/* SLUŽBY */}
        <section id="sluzby" className="py-48 px-6 md:px-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 reveal">
              <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: techLila }}>Profesní zaměření</h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[#171649]">
                GEOMETRIE <br/><span className="italic">DOKONALOSTI</span>
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { t: "LASER", d: "Přesnost řezu v každém mikronu, kde technologie potkává absolutní detail." },
                { t: "OHÝBÁNÍ", d: "Formujeme budoucnost oceli s tlakem, který respektuje integritu materiálu." },
                { t: "SVAŘOVÁNÍ", d: "Pevnost spojů, na kterou se spolehnete i v náročných podmínkách." }
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 p-12 transition-all duration-300 group cursor-pointer border-t-4 border-transparent hover:bg-[#171649] reveal">
                  <div className="w-10 h-1 weldera-fragment mb-6 transition-colors group-hover:bg-white" style={{ backgroundColor: techLila }}></div>
                  <h3 className="text-2xl font-black mb-4 uppercase text-[#171649] group-hover:text-white group-hover:italic">{s.t}</h3>
                  <p className="text-sm font-light text-[#171649] opacity-70 group-hover:text-white group-hover:opacity-100">{s.d}</p>
                </div>
              ))}
            </div>
            {/* TLAČÍTKO KOMPLETNÍ PORTFOLIO */}
            <div className="flex justify-center reveal">
              <button className="px-16 py-4 border-2 font-bold text-[10px] tracking-[0.3em] uppercase btn-hover-effect transition-all" style={{ borderColor: industryNavy, color: industryNavy }}>
                KOMPLETNÍ PORTFOLIO
              </button>
            </div>
          </div>
        </section>

        {/* KARIÉRA */}
        <section ref={sectionRef} id="kariera" className="relative text-white py-60 edge-zigzag-top -mt-10 overflow-hidden bg-[#171649]">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${PatternImg})`, backgroundSize: '300px' }}></div>
          <div className="max-w-4xl mx-auto text-center px-6 relative z-10" style={{ transition: 'all 1.1s ease-out', transform: isSectionActive ? 'translateY(0)' : 'translateY(40px)', opacity: isSectionActive ? 1 : 0 }}>
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-16 italic tracking-tight reveal">STAŇ SE <span style={{ color: techLila }}>FRAGMENTEM</span> TÝMU</h2>
            <div className="flex justify-center gap-3 mb-12 reveal">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-16 transition-all duration-1000 weldera-fragment" style={{ backgroundColor: isSectionActive ? techLila : 'rgba(255,255,255,0.1)', transform: isSectionActive ? 'translateY(-15px)' : 'translateY(20px)', transitionDelay: isSectionActive ? `${i * 100}ms` : '0ms' }}></div>
              ))}
            </div>
            <p className="text-2xl md:text-4xl font-black italic uppercase mb-12 reveal" style={{ color: techLila }}>Nová energie firmy potřebuje <br /> energii nových lidí</p>
            <button className="px-16 py-6 weldera-fragment text-[11px] font-bold uppercase bg-white text-[#171649] btn-hover-effect transition-all reveal">OBJEV POZICE</button>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="kontakty" className="py-24 bg-white flex flex-col items-center">
           <div className="w-full h-5 edge-zigzag-bottom mb-16 bg-[#171649]"></div>
           <img src={Logo} alt="Weldera" className="h-10 mb-8 cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 reveal" onClick={scrollToTop} />
           <div className="w-16 h-1 weldera-fragment mb-8 bg-[#10373B] reveal"></div>
           <p className="text-[10px] uppercase tracking-[0.5em] opacity-50 font-black text-center mb-4 text-[#171649] reveal">Preciznost • Poctivost • Profesionalita</p>
           <p className="text-xs opacity-40 reveal">© 2026 Weldera s.r.o.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;