import React, { useState, useEffect, useRef } from 'react';
import Logo from '../assets/logo.png';

const Navbar = ({
  navVisible,
  scrollToTop,
  scrollToFooter,
  industryNavy,
  techLila
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Zavření menu při kliknutí mimo nebo při změně scrollu
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

  const handleMobileClick = (action) => {
    setIsMobileMenuOpen(false);
    if (action) action();
  };

  return (
    <>
      {/* HLAVNÍ NAVBAR */}
      <nav className={`fixed top-0 w-full z-[100] bg-white px-6 md:px-20 py-4 md:py-6 shadow-md transition-transform duration-500 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={Logo} alt="Weldera" className="h-8 md:h-10 cursor-pointer transition-transform hover:scale-105" onClick={scrollToTop} />
          <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-widest items-center">
            <a href="#onas" className="hover:opacity-50 transition-opacity" style={{ color: industryNavy }}>O nás</a>
            <a href="#sluzby" className="hover:opacity-50 transition-opacity" style={{ color: industryNavy }}>Služby</a>
            <a href="#kontakty" onClick={scrollToFooter} className="hover:opacity-50 transition-opacity" style={{ color: industryNavy }}>Kontakty</a>
            <a href="#kariera" className="px-6 py-2 weldera-fragment text-white btn-hover-effect transition-all" style={{ backgroundColor: techLila }}>Kariéra</a>
          </div>

          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 z-[210]" onClick={toggleMenu}>
            <div className={`w-6 h-0.5 bg-[#171649] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2 !bg-white' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-[#171649] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-[#171649] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 !bg-white' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* MOBILNÍ MENU OVERLAY */}
      <div className={`fixed inset-0 z-[200] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={toggleMenu} />
        <div ref={mobileMenuRef} className={`absolute right-0 top-0 h-full w-[85%] max-w-sm mobile-nav-overlay shadow-2xl transition-transform duration-500 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <img src={Logo} alt="Weldera" className="h-7 brightness-0 invert" />
            <button onClick={toggleMenu} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow gap-8 p-10">
            <a href="#onas" onClick={() => handleMobileClick()} className="text-white text-3xl font-black uppercase italic tracking-tighter">O nás</a>
            <a href="#sluzby" onClick={() => handleMobileClick()} className="text-white text-3xl font-black uppercase italic tracking-tighter">Služby</a>
            <a href="#kontakty" onClick={() => handleMobileClick(scrollToFooter)} className="text-white text-3xl font-black uppercase italic tracking-tighter">Kontakty</a>
            <div className="mt-6">
              <a href="#kariera" onClick={() => handleMobileClick()} className="px-12 py-5 weldera-fragment text-[#171649] font-black uppercase bg-[#B5A8E3] inline-block shadow-xl">Kariéra</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;