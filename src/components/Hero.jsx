import React, { useState, useEffect } from 'react';

const Hero = ({ techLila }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const photoNames = [
    "DSC_4436.jpg", "DSC_4751.jpg", "DSC_4644.jpg", "DSC_4475.jpg",
    "DSC_5005.jpg", "DSC_5113.jpg", "DSC_4758.jpg", "DSC_4569.jpg"
  ];

  // Slider logika
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % photoNames.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photoNames.length]);

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-20 edge-zigzag-bottom pt-48 md:pt-60 text-white bg-[#171649]">
      <div className="absolute inset-0 z-0">
        {photoNames.map((name, i) => (
          <div
            key={name}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(/photos/${name})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentIdx === i ? 0.35 : 0
            }}
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
  );
};

export default Hero;