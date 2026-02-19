import React, { useState, useEffect, useRef } from 'react';
import PatternImg from '../assets/pattern.png';

const Career = () => {
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef(null);

  // Barvy podle logomanuálu
  const techLila = "#B5A8E3";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Spustí animaci, když je sekce viditelná aspoň z 20 %
        if (entry.isIntersecting) {
          setIsActive(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="kariera"
      className="relative text-white py-24 md:py-48 lg:py-60 edge-zigzag-top -mt-10 overflow-hidden bg-[#171649]"
    >
      {/* Pozadí s patternem - responzivní velikost patternu */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${PatternImg})`,
          backgroundSize: '150px md:250px'
        }}
      ></div>

      <div
        className="max-w-4xl mx-auto text-center px-6 relative z-10 transition-all duration-[1100ms] ease-out"
        style={{
          transform: isActive ? 'translateY(0)' : 'translateY(40px)',
          opacity: isActive ? 1 : 0
        }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase mb-6 md:mb-12 italic tracking-tight reveal">
          STAŇ SE <span style={{ color: techLila }}>FRAGMENTEM</span> TÝMU
        </h2>

        {/* Dekorativní fragmenty - animace */}
        <div className="flex justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 md:w-4 h-10 md:h-16 transition-all duration-1000 weldera-fragment"
              style={{
                backgroundColor: isActive ? techLila : 'rgba(255,255,255,0.1)',
                transform: isActive ? 'translateY(-15px)' : 'translateY(20px)',
                transitionDelay: isActive ? `${i * 100}ms` : '0ms'
              }}
            ></div>
          ))}
        </div>

        <p
          className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-black italic uppercase mb-8 md:mb-12 reveal"
          style={{ color: techLila }}
        >
          Nová energie firmy potřebuje <br className="hidden sm:block" /> energii nových lidí
        </p>

        <button
          className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 weldera-fragment text-[10px] md:text-[11px] font-bold uppercase bg-white text-[#171649] btn-hover-effect transition-all reveal"
        >
          POZICE BUDOUCNOSTI
        </button>
      </div>
    </section>
  );
};

export default Career;