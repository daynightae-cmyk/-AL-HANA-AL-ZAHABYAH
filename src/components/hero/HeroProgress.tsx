// src/components/hero/HeroProgress.tsx
import React from 'react';

interface HeroProgressProps {
  progress: number;
}

export const HeroProgress: React.FC<HeroProgressProps> = ({ progress }) => {
  return (
    <div className="cinematic-hero__progress-container" id="hero-progress-container">
      <div 
        className="cinematic-hero__progress-bar"
        id="hero-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
