import React from 'react';
import { useScrollDirection } from './hooks/useScrollDirection';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Rebranding from './components/Rebranding';
import Services from './components/Services';
import Career from './components/Career';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const { showScrollTop, navVisible } = useScrollDirection();
  useIntersectionObserver('.reveal');

  const colors = { navy: "#171649", lila: "#B5A8E3" };
  const scrollAction = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen font-sans bg-white overflow-x-hidden">
      <ScrollToTop
        show={showScrollTop}
        scrollToTop={scrollAction}
        techLila={colors.lila}
        industryNavy={colors.navy}
      />

      <Navbar
        navVisible={navVisible}
        scrollToTop={scrollAction} // Toto chybělo
        industryNavy={colors.navy}
        techLila={colors.lila}
      />

      <main>
        <Hero techLila={colors.lila} />
        <Rebranding industryNavy={colors.navy} techLila={colors.lila} />
        <Services techLila={colors.lila} industryNavy={colors.navy} />
        <Career />
        <Footer onLogoClick={scrollAction} />
      </main>
    </div>
  );
}

export default App;