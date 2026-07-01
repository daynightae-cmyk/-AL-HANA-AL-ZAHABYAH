// src/components/hero/HeroThumbnails.tsx
import React from 'react';
import { HeroSlide } from '../../data/heroSlides';

interface HeroThumbnailsProps {
  slides: HeroSlide[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const HeroThumbnails: React.FC<HeroThumbnailsProps> = ({
  slides,
  currentIndex,
  onSelect,
}) => {
  return (
    <div 
      className="cinematic-hero__thumbs-rail hidden lg:flex" 
      id="hero-thumbnails-rail"
      aria-label="Slide thumbnail previews"
    >
      <div className="text-[9px] text-luxury-gold uppercase tracking-[0.15em] text-center font-mono font-bold mb-1 border-b border-luxury-gold/15 pb-1">
        PREVIEW
      </div>
      <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              id={`hero-thumb-btn-${slide.id}`}
              onClick={() => onSelect(index)}
              className={`cinematic-hero__thumb-btn focus:outline-none transition-all duration-300 ${
                isActive ? 'cinematic-hero__thumb-btn--active' : 'opacity-70 hover:opacity-100'
              }`}
              title={slide.titleEn}
              aria-label={`Go to slide ${index + 1}: ${slide.titleEn}`}
            >
              <img
                src={slide.image}
                alt={`Preview of ${slide.titleEn}`}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-[8px] font-mono py-0.5 text-center text-luxury-gold">
                {String(index + 1).padStart(2, '0')}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
