import React from 'react';

const Rebranding = ({ industryNavy, techLila }) => {
  return (
    <section id="onas" className="py-24 md:py-32 px-6 md:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: techLila }}>
            Otevíráme novou kapitolu
          </h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[#171649] mb-8">
            ČAS NA <span className="italic" style={{ color: techLila }}>ZMĚNU</span>
          </h3>
        </div>
        <div className="reveal">
          <p className="text-lg text-[#171649] leading-relaxed font-light mb-6">
            S radostí Vám představujeme naši tradiční kulturu firmy v novém moderním kabátě.
            Doba se mění – a my jdeme s dobou. Nová prezentace naší firmy září vstříc světlým zítřkům.
          </p>
          <p className="text-sm text-[#171649] opacity-70 mb-8 italic">
            V duchu růstu, kvality světové úrovně a samozřejmě stojící na základu vstřícného
            přístupu k lidskému řemeslu a jeho skvělým zákazníkům, bez kterých bychom tu nebyli.
          </p>
          <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-8">
            {["PRECIZNOST", "POCTIVOST", "PROFESIONALITA"].map((p) => (
              <div key={p} className="text-center">
                <p className="text-[9px] font-black tracking-widest text-[#171649]">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rebranding;