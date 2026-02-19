import React from 'react';

const Services = ({ techLila, industryNavy }) => {
  const serviceItems = [
    { t: "LASER", d: "Přesnost řezu v každém mikronu, kde technologie potkává absolutní detail." },
    { t: "OHÝBÁNÍ", d: "Formujeme budoucnost oceli s tlakem, který respektuje integritu materiálu." },
    { t: "SVAŘOVÁNÍ", d: "Pevnost spojů, na kterou se spolehnete i v náročných podmínkách." }
  ];

  return (
    <section id="sluzby" className="py-24 md:py-48 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20 reveal">
          <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: techLila }}>
            Profesní zaměření
          </h2>
          <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[#171649]">
            GEOMETRIE <br/><span className="italic">DOKONALOSTI</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {serviceItems.map((s, i) => (
            <div
              key={i}
              className="bg-gray-50 p-8 md:p-12 transition-all duration-300 group cursor-pointer border-t-4 border-transparent hover:bg-[#171649] reveal"
            >
              <div
                className="w-10 h-1 weldera-fragment mb-6 transition-colors group-hover:bg-white"
                style={{ backgroundColor: techLila }}
              ></div>
              <h3 className="text-xl md:text-2xl font-black mb-4 uppercase text-[#171649] group-hover:text-white group-hover:italic">
                {s.t}
              </h3>
              <p className="text-sm font-light text-[#171649] opacity-70 group-hover:text-white group-hover:opacity-100">
                {s.d}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center reveal">
          <button
            className="w-full md:w-auto px-16 py-4 border-2 font-bold text-[10px] tracking-[0.3em] uppercase btn-hover-effect transition-all"
            style={{ borderColor: industryNavy, color: industryNavy }}
          >
            KOMPLETNÍ PORTFOLIO
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;