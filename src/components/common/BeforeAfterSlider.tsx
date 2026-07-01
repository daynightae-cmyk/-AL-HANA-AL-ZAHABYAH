// src/components/common/BeforeAfterSlider.tsx

import React, { useState, useRef } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  heightClass?: string; // e.g. "h-[300px] sm:h-[400px]"
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  heightClass = 'h-[300px] sm:h-[400px]',
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden select-none border border-white/10 shadow-2xl bg-black ${heightClass} ${className}`}
    >
      {/* After Image (Base Layer - 100% visible) */}
      <img
        src={afterImage}
        alt="After Renovation"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* After Label Badge */}
      <div className="absolute bottom-4 right-4 bg-emerald-500/90 text-[#050505] text-[10px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 z-10 shadow-md">
        {afterLabel}
      </div>

      {/* Before Image (Overlay Layer - Width clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before Renovation"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
          style={{
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
            height: '100%'
          }}
        />
      </div>
      {/* Before Label Badge */}
      <div className="absolute bottom-4 left-4 bg-red-500/95 text-white text-[10px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 z-10 shadow-md">
        {beforeLabel}
      </div>

      {/* Vertical Slider Bar Separator with Gold Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-[2px] bg-luxury-gold pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Glow behind the bar */}
        <div className="absolute top-0 bottom-0 -left-[1px] -right-[1px] bg-luxury-gold/30 blur-[2px]"></div>

        {/* Central Drag Circular Knob */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 rounded-full bg-black border-2 border-luxury-gold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          {/* Infinite-like or drag visual lines */}
          <div className="flex gap-[2px]">
            <div className="w-[1.5px] h-3 bg-luxury-gold/60"></div>
            <div className="w-[1.5px] h-3 bg-luxury-gold"></div>
            <div className="w-[1.5px] h-3 bg-luxury-gold/60"></div>
          </div>
        </div>
      </div>

      {/* Interactive Range Input Overlay (Spans over full width) */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        aria-label="Before and after transformation slider"
      />
    </div>
  );
};

export default BeforeAfterSlider;
