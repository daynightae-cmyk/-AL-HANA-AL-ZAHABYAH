// src/components/layout/MobileMenu.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Phone, Mail, MessageCircle, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { COMPANY } from '../../lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  toggleLanguage: () => void;
  toggleTheme: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  language,
  theme,
  toggleLanguage,
  toggleTheme,
}) => {
  const location = useLocation();
  const isArabic = language === 'ar';
  const isLight = theme === 'light';

  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  // Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-expand services if user is visiting a services sub-page
  useEffect(() => {
    if (location.pathname.startsWith('/services')) {
      setIsServicesExpanded(true);
    }
  }, [location.pathname]);

  // Keyboard Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  const primaryLinks = [
    { labelAr: "الرئيسية", labelEn: "Home", path: "/" },
    { labelAr: "من نحن", labelEn: "About Us", path: "/about" },
    { labelAr: "خدماتنا المتميزة", labelEn: "Our Services", path: "/services", hasSubmenu: true },
    { labelAr: "معرض المشاريع", labelEn: "Projects Gallery", path: "/projects" },
    { labelAr: "مقارنة قبل / بعد", labelEn: "Before / After", path: "/before-after" },
    { labelAr: "مساعد التصميم الذكي", labelEn: "AI Design Assistant", path: "/design-assistant" },
    { labelAr: "تتبع حالة المشروع", labelEn: "Track Live Project", path: "/track-project" },
    { labelAr: "بوابة العملاء الكرام", labelEn: "Customer Portal", path: "/customer-portal" },
    { labelAr: "اتصل بنا", labelEn: "Contact Us", path: "/contact" }
  ];

  const subServices = [
    { labelAr: "جميع الخدمات المتاحة", labelEn: "All Services Available", path: "/services" },
    { labelAr: "التصميم المنزلي", labelEn: "Home Design", path: "/services/home-design" },
    { labelAr: "دهانات المنازل", labelEn: "Home Paint", path: "/services/home-paint" },
    { labelAr: "أعمال الديكور والجبس", labelEn: "Home Decoration", path: "/services/home-decoration" },
    { labelAr: "تجديد المنازل والشقق", labelEn: "Home Renovation", path: "/services/home-renovation" },
    { labelAr: "تجديد الفلل الفاخرة", labelEn: "Villa Renovation", path: "/services/villa-renovation" },
    { labelAr: "ديكور المشاريع التجارية", labelEn: "Commercial Decoration", path: "/services/commercial-decoration" }
  ];

  return (
    <>
      {/* Overlay Background with smooth fade animation */}
      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Side Panel Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed inset-y-0 z-[9999] w-[85vw] max-w-[340px] sm:max-w-[380px] shadow-2xl transition-all duration-300 ease-in-out flex flex-col justify-between ${
          isArabic ? 'right-0 border-l' : 'left-0 border-r'
        } ${
          isOpen 
            ? 'translate-x-0 opacity-100 visible' 
            : isArabic ? 'translate-x-full opacity-0 invisible' : '-translate-x-full opacity-0 invisible'
        } ${
          isLight 
            ? 'bg-[#F8F5ED] text-neutral-900 border-luxury-gold/30' 
            : 'bg-[#090909] text-[#EFECE6] border-luxury-gold/20'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ direction: isArabic ? 'rtl' : 'ltr' }}
      >
        {/* Luxury Gold Side Ambient Line */}
        <div className={`absolute top-0 bottom-0 w-[3px] bg-luxury-gold ${isArabic ? 'right-0' : 'left-0'}`} />

        {/* 1. Header with Brand & Close Button */}
        <div className={`p-6 flex items-center justify-between border-b relative z-10 ${
          isLight ? 'border-black/5 bg-[#F4EFE2]' : 'border-white/5 bg-neutral-950'
        }`}>
          <Link to="/" className="flex items-center gap-3 text-start" onClick={onClose}>
            <div className={`w-11 h-11 rounded-full border border-luxury-gold/30 p-0.5 flex items-center justify-center shrink-0 overflow-hidden ${
              isLight ? 'bg-white' : 'bg-black/90'
            }`}>
              <img
                src={COMPANY.logoUrl}
                alt="Al Hana Al Zahabyah Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
            <div>
              <span className="font-serif text-sm font-extrabold uppercase tracking-wide block">
                {isArabic ? "الهنا الذهبية" : "AL HANA AL ZAHABYAH"}
              </span>
              <span className="text-luxury-gold text-[8px] font-bold tracking-[0.15em] uppercase block mt-0.5">
                {isArabic ? "للتصميم وأعمال الديكور" : "DESIGN & DECORATION WORKS"}
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className={`p-2 transition-all border cursor-pointer ${
              isLight 
                ? 'border-black/10 text-neutral-700 hover:text-luxury-gold hover:border-luxury-gold/50' 
                : 'border-white/10 text-neutral-400 hover:text-luxury-gold hover:border-luxury-gold/30'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Interactive Scrolling Link Directory */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
          {primaryLinks.map((link) => {
            const active = isActive(link.path);
            const isSubSelected = link.hasSubmenu && location.pathname.startsWith('/services');

            if (link.hasSubmenu) {
              return (
                <div key={link.path} className="space-y-1.5 text-start">
                  {/* Collapsible Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                    className={`w-full group flex items-center justify-between px-3.5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all border cursor-pointer ${
                      isSubSelected || isServicesExpanded
                        ? 'bg-luxury-gold/10 text-luxury-gold border-luxury-gold/35'
                        : isLight
                          ? 'border-black/5 text-neutral-800 hover:text-luxury-gold hover:border-luxury-gold/30 bg-black/5'
                          : 'border-white/5 text-[#EFECE6] hover:text-luxury-gold hover:border-luxury-gold/30 bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isSubSelected ? 'bg-luxury-gold scale-125 animate-pulse' : 'bg-neutral-500'
                      }`} />
                      <span>{isArabic ? link.labelAr : link.labelEn}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-luxury-gold/70 transition-transform duration-300 ${
                      isServicesExpanded ? 'rotate-180 text-luxury-gold' : ''
                    }`} />
                  </button>

                  {/* Submenu Drawer Content */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isServicesExpanded ? 'max-h-[380px] opacity-100 py-1' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}>
                    <div className={`space-y-1.5 border-neutral-800 ${
                      isArabic ? 'border-r-2 mr-4 pr-3 border-l-0 ml-0 pl-0' : 'border-l-2 ml-4 pl-3 border-r-0 mr-0 pr-0'
                    } ${
                      isLight ? 'border-black/10' : 'border-luxury-gold/20'
                    }`}>
                      {subServices.map((sub) => {
                        const subActive = isActive(sub.path);
                        return (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={onClose}
                            className={`group flex items-center justify-between px-3 py-2 text-[11px] transition-all border ${
                              subActive
                                ? 'bg-luxury-gold/15 text-luxury-gold font-bold border-luxury-gold/40'
                                : isLight
                                  ? 'border-transparent text-neutral-700 hover:text-luxury-gold-dark hover:bg-black/5'
                                  : 'border-transparent text-neutral-300 hover:text-luxury-gold hover:bg-white/5'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className={`w-1 h-1 rounded-none transition-transform ${
                                subActive ? 'bg-luxury-gold scale-125 rotate-45' : 'bg-neutral-600 group-hover:bg-luxury-gold'
                              }`} />
                              <span>{isArabic ? sub.labelAr : sub.labelEn}</span>
                            </span>
                            <ArrowRight className={`w-3.5 h-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                              isArabic ? 'rotate-180 translate-x-2 group-hover:translate-x-0' : '-translate-x-2 group-hover:translate-x-0'
                            }`} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`group flex items-center justify-between px-3.5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all border text-start ${
                  active
                    ? 'bg-luxury-gold/10 text-luxury-gold font-bold border-luxury-gold/35'
                    : isLight
                      ? 'border-transparent text-neutral-800 hover:text-luxury-gold-dark hover:bg-black/5'
                      : 'border-transparent text-[#EFECE6] hover:text-luxury-gold hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                    active ? 'bg-luxury-gold scale-125' : 'bg-neutral-500 group-hover:scale-150'
                  }`} />
                  <span>{isArabic ? link.labelAr : link.labelEn}</span>
                </span>
                
                <ArrowRight className={`w-4 h-4 opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                  isArabic ? 'rotate-180 translate-x-2 group-hover:translate-x-0' : '-translate-x-2 group-hover:translate-x-0'
                }`} />
              </Link>
            );
          })}
        </div>

        {/* 3. Action Buttons & Urgent Contact Card */}
        <div className={`p-6 border-t space-y-4 relative z-10 ${
          isLight ? 'bg-[#F4EFE2]/90 border-black/5' : 'bg-[#0d0d0d]/95 border-white/5'
        }`}>
          
          {/* Dynamic Language/Theme Adjuster */}
          <div className="flex items-center justify-between gap-4 py-1 border-b border-luxury-gold/10 pb-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-luxury-gold uppercase border border-luxury-gold/25 px-2.5 py-1.5 hover:bg-luxury-gold hover:text-black transition-all cursor-pointer"
            >
              <span>{isArabic ? "ENGLISH (EN)" : "العربية (AR)"}</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1.5 border flex items-center gap-1.5 cursor-pointer ${
                isLight ? 'border-black/10 text-neutral-800' : 'border-white/10 text-neutral-300'
              }`}
            >
              <span>{isLight ? (isArabic ? "الوضع الداكن" : "Night Mode") : (isArabic ? "الوضع المضيء" : "Day Mode")}</span>
            </button>
          </div>

          {/* Quick Contact links list */}
          <div className="grid grid-cols-2 gap-2 text-start font-mono text-[10px] font-semibold">
            <a
              href="tel:+971555587699"
              className={`flex items-center justify-center gap-1.5 p-2.5 border hover:border-luxury-gold/40 transition-colors cursor-pointer ${
                isLight ? 'bg-white border-black/10 text-neutral-800' : 'bg-black border-white/5 text-[#D6D6D6]'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{isArabic ? "اتصل الآن" : "Call Now"}</span>
            </a>

            <a
              href="https://wa.me/971555587699"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1.5 p-2.5 border hover:border-emerald-500/40 transition-colors cursor-pointer ${
                isLight ? 'bg-white border-black/10 text-neutral-800' : 'bg-black border-white/5 text-[#D6D6D6]'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isArabic ? "واتساب" : "WhatsApp"}</span>
            </a>
          </div>

          {/* Email contact row */}
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500 py-1">
            <Mail className="w-3.5 h-3.5 text-luxury-gold" />
            <a href={`mailto:${COMPANY.adminEmail}`} className="hover:underline hover:text-luxury-gold transition-colors">
              {COMPANY.adminEmail}
            </a>
          </div>

          {/* Large Premium CTA */}
          <Link
            to="/request-quote"
            onClick={onClose}
            className="block w-full text-center py-3.5 bg-gradient-to-r from-luxury-gold to-yellow-600 text-black font-extrabold text-xs uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>{isArabic ? "اطلب عرض سعر ومعاينة مجانية" : "Request Free Quote"}</span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};
