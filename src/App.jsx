import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Logo from './assets/logo.png';
import PatternImg from './assets/pattern.png';

function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // BARVY
  const industryNavy = "#171649";
  const techLila = "#B5A8E3";

  const photoNames = [
    "DSC_4436.jpg", "DSC_4751.jpg", "DSC_4644.jpg", "DSC_4475.jpg",
    "DSC_5005.jpg", "DSC_5113.jpg", "DSC_4758.jpg", "DSC_4569.jpg"
  ];

  // --- ZAVŘENÍ MENU PŘI KLIKNUTÍ MIMO ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // --- CHYTRÝ NAVBAR ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setShowScrollTop(currentScrollY > 500);

      if (currentScrollY < 50) {
        setNavVisible(true);
      } else if (currentScrollY + windowHeight > documentHeight - 150) {
        setNavVisible(true);
      } else {
        if (currentScrollY > lastScrollY && !isMobileMenuOpen) {
          setNavVisible(false);
        } else {
          setNavVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // --- UNIVERZÁLNÍ ANIMACE REVEAL (s logikou skrytí při odscrollování) ---
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
      { threshold: 0.1 }
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
    setIsMobileMenuOpen(false);
  };

  const scrollToFooter = (e) => {
    e.preventDefault();
    document.getElementById('kontakty')?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen font-sans bg-white overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth !important; }
        .edge-zigzag-bottom { clip-path: polygon(0 0, 100% 0, 100% 98%, 98% 100%, 96% 98%, 94% 100%, 92% 98%, 90% 100%, 88% 98%, 86% 100%, 84% 98%, 82% 100%, 80% 98%, 78% 100%, 76% 98%, 74% 100%, 72% 98%, 70% 100%, 68% 98%, 66% 100%, 64% 98%, 62% 100%, 60% 98%, 58% 100%, 56% 98%, 54% 100%, 52% 98%, 50% 100%, 48% 98%, 46% 100%, 44% 98%, 42% 100%, 40% 98%, 38% 100%, 36% 98%, 34% 100%, 32% 98%, 30% 100%, 28% 98%, 26% 100%, 24% 98%, 22% 100%, 20% 98%, 18% 100%, 16% 98%, 14% 100%, 12% 98%, 10% 100%, 8% 98%, 6% 100%, 4% 98%, 2% 100%, 0 98%); }
        .edge-zigzag-top { clip-path: polygon(0 2%, 2% 0, 4% 2%, 6% 0, 8% 2%, 10% 0, 12% 2%, 14% 0, 16% 2%, 18% 0, 20% 2%, 22% 0, 24% 2%, 26% 0, 28% 2%, 30% 0, 32% 2%, 34% 0, 36% 2%, 38% 0, 40% 2%, 42% 0, 44% 2%, 46% 0, 48% 2%, 50% 0, 52% 2%, 54% 0, 56% 2%, 58% 0, 60% 2%, 62% 0, 64% 2%, 66% 0, 68% 2%, 70% 0, 72% 2%, 74% 0, 76% 2%, 78% 0, 80% 2%, 82% 0, 84% 2%, 86% 0, 88% 2%, 90% 0, 92% 2%, 94% 0, 96% 2%, 98% 0, 100% 2%, 100% 100%, 0 100%); }
        .weldera-fragment { clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%); }
        .btn-hover-effect:hover { background-color: ${techLila} !important; color: ${industryNavy} !important; transform: translateY(-2px); }
        .scroll-top-btn:hover { background-color: ${industryNavy} !important; color: white !important; transform: translateY(-5px) scale(1.05); }

        .mobile-nav-overlay {
          background-color: ${industryNavy};
          background-image: linear-gradient(rgba(23, 22, 73, 0.9), rgba(23, 22, 73, 0.9)), url(${PatternImg});
          background-size: cover, 300px;
          background-repeat: no-repeat, repeat;
        }
      `}</style>

      {/* SCROLL TO TOP */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[110] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center weldera-fragment shadow-2xl transition-all duration-500 scroll-top-btn ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ backgroundColor: techLila, color: industryNavy }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>

      {/* HLAVNÍ NAVBAR */}
      <nav className={`fixed top-0 w-full z-[100] bg-white px-6 md:px-20 py-4 md:py-6 shadow-md transition-transform duration-500 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={Logo} alt="Weldera" className="h-8 md:h-10 cursor-pointer transition-transform hover:scale-105" onClick={scrollToTop} />

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-widest items-center">
            <a href="#onas" className="hover:opacity-50 transition-opacity" style={{ color: industryNavy }}>O nás</a>
            <a href="#sluzby" className="hover:opacity-50 transition-opacity" style={{ color: industryNavy }}>Služby</a>
            <a href="#kontakty" onClick={scrollToFooter} className="hover:opacity-50 transition-opacity" style={{ color: industryNavy }}>Kontakty</a>
            <a href="#kariera" className="px-6 py-2 weldera-fragment text-white btn-hover-effect transition-all" style={{ backgroundColor: techLila }}>Kariéra</a>
          </div>

          {/* Hamburger Ikona */}
          <button className="md:hidden flex flex-col gap-1.5 z-[210]" onClick={toggleMenu}>
            <div className={`w-6 h-0.5 bg-[#171649] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2 !bg-white' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-[#171649] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-[#171649] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 !bg-white' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* MOBILNÍ MENU */}
      <div className={`fixed inset-0 z-[200] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={toggleMenu} />
        <div
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm mobile-nav-overlay shadow-2xl transition-transform duration-500 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <img src={Logo} alt="Weldera" className="h-7 brightness-0 invert" />
            <button onClick={toggleMenu} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow gap-8 p-10">
            <a href="#onas" onClick={toggleMenu} className="text-white text-3xl font-black uppercase italic tracking-tighter">O nás</a>
            <a href="#sluzby" onClick={toggleMenu} className="text-white text-3xl font-black uppercase italic tracking-tighter">Služby</a>
            <a href="#kontakty" onClick={scrollToFooter} className="text-white text-3xl font-black uppercase italic tracking-tighter">Kontakty</a>
            <div className="mt-6">
              <a href="#kariera" onClick={toggleMenu} className="px-12 py-5 weldera-fragment text-[#171649] font-black uppercase bg-[#B5A8E3] inline-block shadow-xl">Kariéra</a>
            </div>
          </div>
          <div className="p-10 text-center">
            <p className="text-white/30 text-[9px] uppercase tracking-[0.4em] font-bold">Nová éra strojírenství</p>
          </div>
        </div>
      </div>

      <main>
        {/* HERO SEKCE */}
        <section className="relative py-32 md:py-48 px-6 md:px-20 edge-zigzag-bottom pt-48 md:pt-60 text-white bg-[#171649]">
          <div className="absolute inset-0 z-0">
            {photoNames.map((name, i) => (
              <div key={name} className="absolute inset-0 transition-opacity duration-1000"
                style={{ backgroundImage: `url(/photos/${name})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: currentIdx === i ? 0.35 : 0 }}
              />
            ))}
          </div>
          <div className="max-w-7xl mx-auto relative z-20">
            <h1 className="text-5xl md:text-[90px] font-black leading-none mb-6 md:mb-8 uppercase tracking-tighter reveal">
              NOVÁ <br/><span style={{ color: techLila }} className="italic">ERA</span>
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-8 md:mb-12 max-w-sm border-l-4 pl-6 font-light reveal" style={{ borderColor: techLila }}>
              Strojírenství není jen kov. Je to precizní skládačka fragmentů, které do sebe zapadají.
            </p>
            <button className="bg-white px-10 md:px-12 py-4 md:py-5 weldera-fragment text-[10px] font-bold uppercase text-[#171649] btn-hover-effect transition-all reveal">
              NAŠE TECHNOLOGIE
            </button>
          </div>
        </section>

        {/* SEKCE SLUŽBY */}
        <section id="sluzby" className="py-24 md:py-48 px-6 md:px-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-20 reveal">
              <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: techLila }}>Profesní zaměření</h2>
              <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[#171649]">
                GEOMETRIE <br/><span className="italic">DOKONALOSTI</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
              {[
                { t: "LASER", d: "Přesnost řezu v každém mikronu, kde technologie potkává absolutní detail." },
                { t: "OHÝBÁNÍ", d: "Formujeme budoucnost oceli s tlakem, který respektuje integritu materiálu." },
                { t: "SVAŘOVÁNÍ", d: "Pevnost spojů, na kterou se spolehnete i v náročných podmínkách." }
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 p-8 md:p-12 transition-all duration-300 group cursor-pointer border-t-4 border-transparent hover:bg-[#171649] reveal">
                  <div className="w-10 h-1 weldera-fragment mb-6 transition-colors group-hover:bg-white" style={{ backgroundColor: techLila }}></div>
                  <h3 className="text-xl md:text-2xl font-black mb-4 uppercase text-[#171649] group-hover:text-white group-hover:italic">{s.t}</h3>
                  <p className="text-sm font-light text-[#171649] opacity-70 group-hover:text-white group-hover:opacity-100">{s.d}</p>
                </div>
              ))}
            </div>
            {/* Tlačítko Portfolio */}
            <div className="flex justify-center reveal">
              <button className="w-full md:w-auto px-16 py-4 border-2 font-bold text-[10px] tracking-[0.3em] uppercase btn-hover-effect transition-all" style={{ borderColor: industryNavy, color: industryNavy }}>
                KOMPLETNÍ PORTFOLIO
              </button>
            </div>
          </div>
        </section>

        {/* SEKCE KARIÉRA */}
        <section ref={sectionRef} id="kariera" className="relative text-white py-32 md:py-60 edge-zigzag-top -mt-10 overflow-hidden bg-[#171649]">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url(${PatternImg})`, backgroundSize: '250px' }}></div>
          <div className="max-w-4xl mx-auto text-center px-6 relative z-10" style={{ transition: 'all 1.1s ease-out', transform: isSectionActive ? 'translateY(0)' : 'translateY(40px)', opacity: isSectionActive ? 1 : 0 }}>
            <h2 className="text-4xl md:text-7xl font-black uppercase mb-8 md:mb-16 italic tracking-tight reveal">STAŇ SE <span style={{ color: techLila }}>FRAGMENTEM</span> TÝMU</h2>
            <div className="flex justify-center gap-2 md:gap-3 mb-8 md:mb-12 reveal">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 md:w-4 h-12 md:h-16 transition-all duration-1000 weldera-fragment" style={{ backgroundColor: isSectionActive ? techLila : 'rgba(255,255,255,0.1)', transform: isSectionActive ? 'translateY(-15px)' : 'translateY(20px)', transitionDelay: isSectionActive ? `${i * 100}ms` : '0ms' }}></div>
              ))}
            </div>
            <p className="text-xl md:text-4xl font-black italic uppercase mb-8 md:mb-12 reveal" style={{ color: techLila }}>Nová energie firmy potřebuje <br /> energii nových lidí</p>
            <button className="w-full md:w-auto px-16 py-6 weldera-fragment text-[11px] font-bold uppercase bg-white text-[#171649] btn-hover-effect transition-all reveal">OBJEV POZICE</button>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="kontakty" className="py-16 md:py-24 bg-white flex flex-col items-center px-6">
           <div className="w-full h-4 md:h-5 edge-zigzag-bottom mb-12 md:mb-16 bg-[#171649]"></div>
           <img src={Logo} alt="Weldera" className="h-8 md:h-10 mb-8 cursor-pointer transition-transform duration-300 hover:scale-110 reveal" onClick={scrollToTop} />
           <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-50 font-black text-center mb-4 text-[#171649] reveal">Preciznost • Poctivost • Profesionalita</p>
           <p className="text-xs opacity-40 reveal text-center">© 2026 Weldera s.r.o.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;