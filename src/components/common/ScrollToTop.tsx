import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ScrollToTop: React.FC = () => {
  const { theme } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isLight = theme === 'light';

  return (
    <button
      onClick={scrollToTop}
      id="scroll-to-top-btn"
      aria-label="Scroll to top"
      className={`fixed bottom-24 right-6 z-50 p-3 rounded-none border transition-all duration-300 transform shadow-xl hover:scale-115 flex items-center justify-center cursor-pointer ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-75 pointer-events-none'
      } ${
        isLight 
          ? 'bg-white hover:bg-[#F8F5ED] border-luxury-gold/50 text-luxury-gold-dark' 
          : 'bg-neutral-900 hover:bg-[#0c0c0c] border-luxury-gold/30 text-luxury-gold'
      }`}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};
