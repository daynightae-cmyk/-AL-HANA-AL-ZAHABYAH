// src/components/hero/CinematicHeroSlider.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { heroSlides } from '../../data/heroSlides';
import { HeroProgress } from './HeroProgress';
import { HeroThumbnails } from './HeroThumbnails';
import { HeroControls } from './HeroControls';
import { Sparkles, MessageCircle, ArrowLeft, ArrowRight, Compass } from 'lucide-react';

export const CinematicHeroSlider: React.FC = () => {
  // Safe extraction of context parameters with fallback
  let language = 'en';
  let theme = 'dark';
  try {
    const context = useApp();
    language = context.language;
    theme = context.theme;
  } catch (e) {
    console.warn("AppContext hook not available, using fallback values", e);
  }

  const isRtl = language === 'ar';
  const isLight = theme === 'light';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Touch Swipe State
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const SLIDE_DURATION = 6500; // 6.5s per slide as requested

  // Memoized handlers
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setProgress(0);
  }, []);

  const handleSelect = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  // Keyboard Navigation Hook
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (isRtl) {
          handlePrev();
        } else {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (isRtl) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isRtl]);

  // Tab Visibility Change Hook
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Smooth Auto-slide Progress Loop
  useEffect(() => {
    if (isHovered || isTabHidden) return;

    const STEP_MS = 50;
    const INCREMENT = (STEP_MS / SLIDE_DURATION) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + INCREMENT;
      });
    }, STEP_MS);

    return () => clearInterval(interval);
  }, [isHovered, isTabHidden, handleNext]);

  // Swipe Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Image Loading Error Fallback Handler
  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  // Service Type Mapping for Small Gold Outline Pill (Service Tag)
  const getServiceTag = (id: string, isAr: boolean) => {
    const tags: Record<string, { ar: string; en: string }> = {
      'luxury-lounge': { ar: 'تصميم داخلي • صالة فاخرة', en: 'Interior Design • Luxury Lounge' },
      'villa-exterior': { ar: 'تصميم معماري • فيلا خارجية', en: 'Architecture • Villa Exterior' },
      'arabian-majlis': { ar: 'مجلس عربي • أصالة وفخامة', en: 'Arabian Majlis • Tradition & Luxury' },
      'luxury-bedroom': { ar: 'تصميم غرف النوم • راحة وهدوء', en: 'Bedroom Design • Tranquility & Comfort' },
      'kitchen-dining': { ar: 'تصميم مطابخ • لمسة عصرية', en: 'Kitchen Design • Modern Elegance' },
      'office-reception': { ar: 'ديكور تجاري • مكاتب واستقبال', en: 'Commercial Decor • Offices & Reception' },
      'commercial-showroom': { ar: 'صالات عرض • محلات تجارية', en: 'Boutiques • Retail Showrooms' },
      'before-after': { ar: 'قبل وبعد • تحويل المساحات', en: 'Before & After • Space Transformation' },
      'ai-design': { ar: 'مساعد التصميم • ذكاء اصطناعي', en: 'AI Assistant • Smart Design' },
      'materials-moodboard': { ar: 'لوحة المواد • تفاصيل الخامات', en: 'Moodboard • Premium Materials' },
    };
    return tags[id] ? (isAr ? tags[id].ar : tags[id].en) : (isAr ? 'ديكور فاخر' : 'Luxury Decor');
  };

  return (
    <section
      id="cinematic-hero"
      className="cinematic-hero border-b border-luxury-gold/15"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Luxury interior design showcase"
    >
      {/* 1. Background Layers & Ken Burns Images */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentIndex;
        const isFailed = failedImages[slide.id];

        return (
          <div
            key={slide.id}
            id={`hero-slide-${slide.id}`}
            className={`cinematic-hero__slide ${isActive ? 'hero-slide-active' : ''}`}
            aria-hidden={!isActive}
            role="tabpanel"
          >
            {/* Slide Image Background */}
            {!isFailed ? (
              <img
                src={slide.image}
                alt="AL HANA AL ZAHABYAH luxury interior design hero image"
                className="cinematic-hero__image"
                onError={() => handleImageError(slide.id)}
                referrerPolicy="no-referrer"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ) : (
              // Luxury fallback placeholder in case photo fails to load
              <div className="absolute inset-0 bg-[#070707] flex items-center justify-center cinematic-hero__image">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="text-center p-6 border border-luxury-gold/15 max-w-sm">
                  <Sparkles className="w-8 h-8 text-luxury-gold/40 mx-auto mb-3 animate-pulse" />
                  <span className="font-serif italic text-xs text-luxury-gold/60 uppercase tracking-widest block">
                    AL HANA AL ZAHABYAH
                  </span>
                </div>
              </div>
            )}

            {/* Cinematic Overlay Stack */}
            <div className="cinematic-hero__overlay cinematic-hero__overlay--vignette" />
            <div className={`cinematic-hero__overlay ${isRtl ? 'cinematic-hero__overlay--gradient-rtl' : 'cinematic-hero__overlay--gradient-ltr'}`} />
            <div className="cinematic-hero__overlay cinematic-hero__overlay--gold-glow" />
            <div className="cinematic-hero__overlay cinematic-hero__overlay--grid" />
            <div className="cinematic-hero__gold-sweep" />

            {/* Slide Content Box */}
            <div className="cinematic-hero__content-wrapper max-w-7xl mx-auto px-4 md:px-8">
              <div 
                className="cinematic-hero__content text-start" 
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                {/* Meta details & active slide numeric counter */}
                <div className="cinematic-hero__eyebrow flex items-center gap-3 mb-4 select-none">
                  <span className="text-luxury-gold text-xs font-mono font-bold tracking-wider">
                    {String(index + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
                  </span>
                  <span className="h-[1px] w-8 bg-luxury-gold/40"></span>
                  <span className="inline-block border border-luxury-gold/30 px-2.5 py-0.5 text-[9px] text-luxury-gold font-bold uppercase tracking-wider font-mono rounded-none">
                    {getServiceTag(slide.id, isRtl)}
                  </span>
                </div>

                {/* Eyebrow slogan text */}
                <div className="cinematic-hero__eyebrow inline-flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                  <span className="text-[10px] sm:text-xs text-luxury-gold font-bold uppercase tracking-widest">
                    {isRtl ? slide.eyebrowAr : slide.eyebrowEn}
                  </span>
                </div>

                {/* Premium serif title */}
                <h1 className="cinematic-hero__title text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-serif text-[#F8F5ED] leading-[1.2] mb-4 font-bold">
                  {isRtl ? slide.titleAr : slide.titleEn}
                </h1>

                {/* Refined subtitle description */}
                <p className="cinematic-hero__subtitle text-xs sm:text-sm text-[#D6D6D6]/90 max-w-lg leading-relaxed mb-8">
                  {isRtl ? slide.subtitleAr : slide.subtitleEn}
                </p>

                {/* Luxury Action Buttons Trio */}
                <div className="cinematic-hero__actions flex flex-wrap gap-4 items-center">
                  {/* Primary slide CTA (e.g., "Request Quote" or "Request Villa Renovation") */}
                  <Link
                    to={slide.primaryHref}
                    className="px-6 py-3 bg-luxury-gold text-black font-serif text-xs font-bold uppercase tracking-widest hover:bg-yellow-500 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)]"
                    id={`hero-primary-cta-${slide.id}`}
                  >
                    {isRtl ? slide.primaryCtaAr : slide.primaryCtaEn}
                  </Link>

                  {/* Secondary slide CTA (e.g., "View Projects" or "See Before / After") */}
                  <Link
                    to={slide.secondaryHref}
                    className="px-6 py-3 border border-[#F8F5ED]/30 text-[#F8F5ED] font-serif text-xs font-bold uppercase tracking-widest bg-black/10 backdrop-blur-sm hover:bg-[#F8F5ED] hover:text-black hover:border-[#F8F5ED] transition-all duration-300"
                    id={`hero-secondary-cta-${slide.id}`}
                  >
                    {isRtl ? slide.secondaryCtaAr : slide.secondaryCtaEn}
                  </Link>

                  {/* WhatsApp Trio CTA */}
                  <a
                    href="https://wa.me/971555587699"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 border border-emerald-500/30 text-emerald-400 font-serif text-xs font-bold uppercase tracking-widest bg-emerald-500/5 hover:bg-emerald-500 hover:text-neutral-950 hover:border-emerald-500 transition-all duration-300 flex items-center gap-1.5"
                    id={`hero-whatsapp-cta-${slide.id}`}
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>{isRtl ? "واتساب" : "WhatsApp"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* 2. Slide Navigation Arrows (Desktop Only) */}
      <HeroControls
        onPrev={handlePrev}
        onNext={handleNext}
        isRtl={isRtl}
      />

      {/* 3. Slider Thumbnail Preview Panel (Desktop Only) */}
      <HeroThumbnails
        slides={heroSlides}
        currentIndex={currentIndex}
        onSelect={handleSelect}
      />

      {/* 4. Tiny Slider dots (Mobile / Desktop) */}
      <div 
        className="cinematic-hero__dots" 
        id="hero-dots-container"
        role="tablist"
        aria-label="Slideshow slide selector"
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            id={`hero-dot-btn-${index}`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-controls={`hero-slide-${heroSlides[index].id}`}
            onClick={() => handleSelect(index)}
            className={`cinematic-hero__dot ${index === currentIndex ? 'cinematic-hero__dot--active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* 5. Animated Scroll Hint (Desktop Only) */}
      <div className="cinematic-hero__scroll-hint" id="hero-scroll-hint">
        <span>{isRtl ? "اكتشف المزيد" : "Explore More"}</span>
        <div className="cinematic-hero__scroll-line"></div>
      </div>

      {/* 6. Gold Thin Filling Progress Indicator */}
      <HeroProgress progress={progress} />
    </section>
  );
};
