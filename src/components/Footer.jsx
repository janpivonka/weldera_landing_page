import React from 'react';
import Logo from '../assets/logo.png';

const Footer = ({ onLogoClick }) => {
  return (
    <footer id="kontakty" className="py-16 md:py-24 bg-white flex flex-col items-center px-6">
      {/* Horní zigzag linka */}
      <div className="w-full h-4 md:h-5 edge-zigzag-bottom mb-12 md:mb-16 bg-[#171649]"></div>

      {/* Logo s animací a proklikem nahoru */}
      <img
        src={Logo}
        alt="Weldera"
        className="h-8 md:h-10 mb-8 cursor-pointer transition-transform duration-300 hover:scale-110 reveal"
        onClick={onLogoClick}
      />

      {/* Claimy a copyright */}
      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-50 font-black text-center mb-4 text-[#171649] reveal">
        Preciznost • Poctivost • Profesionalita
      </p>
      <p className="text-xs opacity-40 reveal text-center">© 2026 Weldera s.r.o.</p>
    </footer>
  );
};

export default Footer;