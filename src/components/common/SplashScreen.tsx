// src/components/common/SplashScreen.tsx

import React, { useEffect, useState } from 'react';
import { COMPANY } from '../../lib/constants';

export const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if splash has already been shown this session to keep it fast for returning visits
    const hasShown = sessionStorage.getItem('splash_shown');
    if (hasShown) {
      setShouldRender(false);
      setIsVisible(false);
      return;
    }

    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    const destroyTimer = setTimeout(() => {
      setShouldRender(false);
      sessionStorage.setItem('splash_shown', 'true');
    }, 2600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(destroyTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] transition-all duration-700 ease-in-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
      }`}
    >
      {/* Background Decorative Gold Lines & Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Thin Gold Lines Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:40px_40px] opacity-25 pointer-events-none"></div>

      <div className="flex flex-col items-center max-w-md px-6 text-center z-10 animate-fade-in">
        
        {/* Glowing Logo Frame */}
        <div className="relative mb-8 group">
          {/* Animated Gold Ring Glow */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-luxury-gold-dark via-luxury-gold to-yellow-500 opacity-20 blur-md group-hover:opacity-40 transition-all duration-1000 animate-pulse"></div>
          
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-luxury-gold/30 p-1 bg-black/80 flex items-center justify-center shadow-2xl overflow-hidden">
            <img
              src={COMPANY.logoUrl}
              alt={`${COMPANY.name} Logo`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter brightness-110"
            />
          </div>
        </div>

        {/* Brand Bilingual Text with Premium Tracking */}
        <div className="space-y-3 mt-2">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-luxury-offwhite tracking-[0.2em] uppercase">
            {COMPANY.name}
          </h1>
          <p className="text-[10px] sm:text-xs font-mono text-luxury-gold tracking-[0.3em] uppercase">
            {COMPANY.tagline}
          </p>
          
          {/* Divider Line */}
          <div className="h-[1px] w-16 bg-luxury-gold/30 mx-auto my-3"></div>

          <p className="text-sm font-sans font-medium text-luxury-muted tracking-wide" dir="rtl">
            {COMPANY.arabicName}
          </p>
        </div>

        {/* Dynamic elegant loading bar */}
        <div className="mt-10 w-44 h-[2px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
          <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-luxury-gold-dark to-luxury-gold w-1/2 rounded-full animate-[shimmer_1.5s_infinite_ease-in-out]"></div>
        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            left: -50%;
            width: 30%;
          }
          50% {
            width: 50%;
          }
          100% {
            left: 120%;
            width: 30%;
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
