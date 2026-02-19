import React from 'react';

const ScrollToTop = ({ show, scrollToTop, techLila, industryNavy }) => {
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[110] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center weldera-fragment shadow-2xl transition-all duration-500 scroll-top-btn ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      style={{ backgroundColor: techLila, color: industryNavy }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className="w-5 h-5 md:w-6 md:h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
    </button>
  );
};

export default ScrollToTop;