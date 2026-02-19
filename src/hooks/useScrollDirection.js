import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Tlačítko nahoru
      setShowScrollTop(currentScrollY > 500);

      // Logika navbaru
      if (currentScrollY < 50) {
        setNavVisible(true);
      } else if (currentScrollY + windowHeight > documentHeight - 150) {
        setNavVisible(true);
      } else {
        if (currentScrollY > lastScrollY) {
          setNavVisible(false);
        } else {
          setNavVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return { showScrollTop, navVisible };
};