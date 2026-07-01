// src/components/hero/HeroControls.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroControlsProps {
  onPrev: () => void;
  onNext: () => void;
  isRtl: boolean;
}

export const HeroControls: React.FC<HeroControlsProps> = ({
  onPrev,
  onNext,
  isRtl,
}) => {
  return (
    <>
      <button
        id="hero-control-prev"
        onClick={onPrev}
        className="cinematic-hero__arrow cinematic-hero__arrow--prev hidden lg:flex"
        aria-label={isRtl ? "الشريحة السابقة" : "Previous slide"}
      >
        {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      <button
        id="hero-control-next"
        onClick={onNext}
        className="cinematic-hero__arrow cinematic-hero__arrow--next hidden lg:flex"
        aria-label={isRtl ? "الشريحة التالية" : "Next slide"}
      >
        {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
    </>
  );
};
