// src/components/layout/MobileMenu.tsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Phone, Mail, MessageCircle, ArrowRight, Sparkles, UserCheck, CalendarCheck, FolderHeart, HelpCircle, FileText } from 'lucide-react';
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
    return location.pathname.startsWith(path);
  };

  const menuLinks = [
    {
      labelAr: "الرئيسية",
      labelEn: "Home",
      path: "/",
      categoryAr: "العام",
      categoryEn: "General"
    },
    {
      labelAr: "من نحن",
      labelEn: "About Us",
      path: "/about",
      categoryAr: "العام",
      categoryEn: "General"
    },
    {
      labelAr: "جميع الخدمات",
      labelEn: "All Services",
      path: "/services",
      categoryAr: "الخدمات",
      categoryEn: "Services"
    },
    {
      labelAr: "التصميم المنزلي",
      labelEn: "Home Design",
      path: "/services/home-design",
      categoryAr: "الخدمات",
      categoryEn: "Services"
    },
    {
      labelAr: "دهانات المنازل",
      labelEn: "Home Paint",
      path: "/services/home-paint",
      categoryAr: "الخدمات",
      categoryEn: "Services"
    },
    {
      labelAr: "أعمال الديكور والجبس",
      labelEn: "Home Decoration",
      path: "/services/home-decoration",
      categoryAr: "الخدمات",
      categoryEn: "Services"
    },
    {
      labelAr: "تجديد المنازل والشقق",
      labelEn: "Home Renovation",
      path: "/services/home-renovation",
      categoryAr: "الخدمات",
      categoryEn: "Services"
    },
    {
      labelAr: "تجديد الفلل الفاخرة",
      labelEn: "Villa Renovation",
      path: "/services/villa-renovation",
      categoryAr: "الخدمات",
      categoryEn: "Services"
    },
    {
      labelAr: "ديكور المشاريع التجارية",
      labelEn: "Commercial Decoration",
      path: "/services/commercial-decoration",
      categoryAr: "الخدمات",
      categoryEn: "Services"
    },
    {
      labelAr: "معرض المشاريع",
      labelEn: "Projects Gallery",
      path: "/projects",
      categoryAr: "الأعمال",
      categoryEn: "Portfolio"
    },
    {
      labelAr: "مقارنة قبل / بعد",
      labelEn: "Before / After Comparison",
      path: "/before-after",
      categoryAr: "الأعمال",
      categoryEn: "Portfolio"
    },
    {
      labelAr: "مساعد التصميم الذكي",
      labelEn: "AI Design Assistant",
      path: "/design-assistant",
      categoryAr: "العملاء",
      categoryEn: "Client Center"
    },
    {
      labelAr: "تتبع حالة المشروع",
      labelEn: "Track Live Project",
      path: "/track-project",
      categoryAr: "العملاء",
      categoryEn: "Client Center"
    },
    {
      labelAr: "بوابة العملاء الكرام",
      labelEn: "Customer Portal",
      path: "/customer-portal",
      categoryAr: "العملاء",
      categoryEn: "Client Center"
    },
    {
      labelAr: "اتصل بنا",
      labelEn: "Contact Us",
      path: "/contact",
      categoryAr: "العام",
      categoryEn: "General"
    }
  ];

  return (
    <>
      {/* Overlay Background */}
      {isOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9998] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Side Panel Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed top-0 bottom-0 z-[9999] w-full max-w-[380px] sm:max-w-[420px] shadow-2xl transition-transform duration-500 ease-out flex flex-col justify-between ${
          isArabic ? 'right-0' : 'left-0'
        } ${
          isOpen 
            ? 'translate-x-0' 
            : isArabic ? 'translate-x-full' : '-translate-x-full'
        } ${
          isLight 
            ? 'bg-[#F8F5ED] text-neutral-900 border-luxury-gold/25' 
            : 'bg-[#090909] text-[#EFECE6] border-luxury-gold/15'
        } ${
          isArabic ? 'border-l' : 'border-r'
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
            className={`p-2 transition-all border ${
              isLight 
                ? 'border-black/10 text-neutral-700 hover:text-luxury-gold hover:border-luxury-gold/50' 
                : 'border-white/10 text-neutral-400 hover:text-luxury-gold hover:border-luxury-gold/30'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Interactive Scrolling Link Directory */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          
          {/* Main sections categories */}
          {["Services", "Portfolio", "Client Center", "General"].map((section) => {
            const sectionLinks = menuLinks.filter(link => 
              isArabic 
                ? (section === "Services" ? link.categoryAr === "الخدمات" :
                   section === "Portfolio" ? link.categoryAr === "الأعمال" :
                   section === "Client Center" ? link.categoryAr === "العملاء" : link.categoryAr === "العام")
                : link.categoryEn === section
            );

            if (sectionLinks.length === 0) return null;

            const categoryTitle = isArabic 
              ? (section === "Services" ? "خدماتنا المتميزة" :
                 section === "Portfolio" ? "معرض أعمالنا" :
                 section === "Client Center" ? "مركز العملاء والتتبع" : "روابط عامة")
              : section;

            return (
              <div key={section} className="space-y-2.5 text-start">
                <span className="text-[9px] font-mono text-luxury-gold font-bold uppercase tracking-[0.2em] block pb-1 border-b border-luxury-gold/15">
                  {categoryTitle}
                </span>

                <div className="grid grid-cols-1 gap-1 pt-1">
                  {sectionLinks.map((link) => {
                    const active = isActive(link.path);
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={onClose}
                        className={`group flex items-center justify-between px-3 py-2 text-xs transition-all border ${
                          active
                            ? 'bg-luxury-gold/10 text-luxury-gold font-bold border-luxury-gold/30'
                            : isLight
                              ? 'border-transparent text-neutral-800 hover:text-luxury-gold-dark hover:bg-black/5 hover:border-black/5'
                              : 'border-transparent text-[#D6D6D6] hover:text-luxury-gold hover:bg-white/5 hover:border-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1 h-1 rounded-full transition-transform ${
                            active ? 'bg-luxury-gold scale-125' : 'bg-neutral-500 group-hover:scale-150'
                          }`} />
                          <span>{isArabic ? link.labelAr : link.labelEn}</span>
                        </span>
                        
                        <ArrowRight className={`w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 ${
                          isArabic ? 'rotate-180' : ''
                        }`} />
                      </Link>
                    );
                  })}
                </div>
              </div>
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
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-luxury-gold uppercase border border-luxury-gold/25 px-2.5 py-1.5 hover:bg-luxury-gold hover:text-black transition-all"
            >
              <span>{isArabic ? "ENGLISH (EN)" : "العربية (AR)"}</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1.5 border flex items-center gap-1.5 ${
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
              className={`flex items-center justify-center gap-1.5 p-2.5 border hover:border-luxury-gold/40 transition-colors ${
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
              className={`flex items-center justify-center gap-1.5 p-2.5 border hover:border-emerald-500/40 transition-colors ${
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
            className="block w-full text-center py-3.5 bg-gradient-to-r from-luxury-gold to-yellow-600 text-black font-extrabold text-xs uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
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
