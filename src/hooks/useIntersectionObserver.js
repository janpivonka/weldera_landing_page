import { useLayoutEffect } from 'react';

export const useIntersectionObserver = (className = '.reveal') => {
  useLayoutEffect(() => {
    const elements = document.querySelectorAll(className);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = 'translateY(0)';
          } else {
            // Volitelně: resetovat animaci při odscrollování pryč
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
  }, [className]);
};