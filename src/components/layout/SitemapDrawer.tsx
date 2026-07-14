// src/components/layout/SitemapDrawer.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  X, 
  Home, 
  Paintbrush, 
  Layout, 
  Sparkles, 
  Calculator, 
  Phone, 
  ArrowRight, 
  CheckCircle, 
  ChevronRight,
  MessageCircle,
  HelpCircle,
  FolderKanban,
  FileText
} from 'lucide-react';
import { COMPANY } from '../../lib/constants';

export const SitemapDrawer: React.FC = () => {
  const { language, theme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Scroll trigger listener
  useEffect(() => {
    const handleScroll = () => {
      // Show floating button after scrolling 250px
      setIsVisible(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close drawer on route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleDrawer = () => setIsOpen(!isOpen);

  // Sitemap structure
  const sitemapData = {
    services: [
      { name_ar: "تجديد وتجميل الفلل الكبرى", name_en: "Grand Villa Renovation", slug: "villa-renovation", icon: Home },
      { name_ar: "أعمال الديكور والجبس بورد", name_en: "Gypsum Ceilings & Decor", slug: "home-decoration", icon: Layout },
      { name_ar: "دهانات المنازل والأصباغ", name_en: "Luxury Wall Paint", slug: "home-paint", icon: Paintbrush },
      { name_ar: "تجديد كامل للشقق", name_en: "Full Apartment Overhaul", slug: "home-renovation", icon: Home },
      { name_ar: "ديكور المشاريع التجارية", name_en: "Commercial Fitting", slug: "commercial-decoration", icon: Layout },
    ],
    interactive: [
      { name_ar: "مساعد التصميم بالذكاء الاصطناعي", name_en: "AI Design Assistant", path: "/design-assistant", icon: Sparkles, badge: "AI" },
      { name_ar: "حاسبة التكاليف الفورية", name_en: "Live Cost Estimator", path: "/request-quote", icon: Calculator, badge: "New" },
    ],
    conversion: [
      { name_ar: "اطلب معاينة مجانية وعرض سعر", name_en: "Book Free Inspection", path: "/request-quote", icon: FileText },
      { name_ar: "تتبع حالة مشروعك", name_en: "Track Project Progress", path: "/track-project", icon: CheckCircle },
      { name_ar: "معرض أعمالنا الفاخرة", name_en: "Luxury Portfolio", path: "/projects", icon: FolderKanban },
      { name_ar: "أسئلة شائعة وتوجيهات", name_en: "FAQ & Advisory", path: "/faqs", icon: HelpCircle },
    ]
  };

  const isLight = theme === 'light';

  return (
    <>
      {/* Floating Scroll-Triggered Toggle Tab */}
      <button
        onClick={toggleDrawer}
        style={{ zIndex: 45 }}
        className={`fixed right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-4 shadow-2xl transition-all duration-300 group cursor-pointer border-y border-l border-luxury-gold/30 hover:bg-neutral-900 hover:text-luxury-gold ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } ${
          isLight ? 'bg-white text-neutral-800' : 'bg-[#0a0a0a] text-white'
        }`}
      >
        <Compass className="w-5 h-5 text-luxury-gold animate-spin-slow group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] [writing-mode:vertical-lr] select-none">
          {language === 'ar' ? "دليل الخدمات السريع" : "Quick Navigator"}
        </span>
      </button>

      {/* Drawer Overlay backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={toggleDrawer}
        />
      )}

      {/* Navigation Drawer Container */}
      <div
        style={{ zIndex: 100 }}
        className={`fixed top-0 bottom-0 w-full sm:w-[440px] max-w-full shadow-2xl transition-transform duration-500 ease-out flex flex-col justify-between overflow-y-auto ${
          language === 'ar' ? 'left-0' : 'right-0'
        } ${
          isOpen 
            ? 'translate-x-0' 
            : language === 'ar' 
              ? '-translate-x-full' 
              : 'translate-x-full'
        } ${
          isLight ? 'bg-[#F8F5ED] text-neutral-900 border-l border-black/5' : 'bg-neutral-950 text-white border-l border-white/5'
        }`}
      >
        {/* Drawer Header */}
        <div className={`p-6 border-b flex items-center justify-between ${
          isLight ? 'border-black/5 bg-[#EFECE6]' : 'border-white/5 bg-neutral-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-luxury-gold/40 p-0.5 flex items-center justify-center overflow-hidden bg-black">
              <img src={COMPANY.logoUrl} alt="Logo" className="w-full h-full object-contain filter brightness-110" />
            </div>
            <div className="text-start leading-none">
              <h3 className="font-serif text-xs font-bold text-luxury-gold uppercase tracking-wider">
                {language === 'ar' ? "الهنا الذهبية للتصميم" : "Al Hana Al Zahabyah"}
              </h3>
              <p className="text-[9px] text-neutral-500 font-mono mt-1 uppercase tracking-widest">
                {language === 'ar' ? "أعمال الديكور الفاخرة" : "Interior Sitemap"}
              </p>
            </div>
          </div>
          
          <button 
            onClick={toggleDrawer}
            className="p-1.5 rounded-full hover:bg-white/5 text-neutral-400 hover:text-luxury-gold transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body - Scrollable */}
        <div className="flex-1 p-6 space-y-8 overflow-y-auto text-start">
          {/* Section 1: Major Villa Services */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-widest border-b border-luxury-gold/20 pb-1.5">
              {language === 'ar' ? "خدمات الفلل والتشطيبات الكبرى" : "Villa Design & Painting"}
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {sitemapData.services.map((svc) => {
                const Icon = svc.icon;
                return (
                  <Link
                    key={svc.slug}
                    to={`/services/${svc.slug}`}
                    className={`p-3 border flex items-center justify-between group transition-all duration-300 ${
                      isLight 
                        ? 'border-black/5 bg-white hover:border-luxury-gold' 
                        : 'border-white/5 bg-neutral-900 hover:border-luxury-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none bg-luxury-gold/10 flex items-center justify-center shrink-0 border border-luxury-gold/20">
                        <Icon className="w-4 h-4 text-luxury-gold" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-xs font-bold block group-hover:text-luxury-gold transition-colors">
                          {language === 'ar' ? svc.name_ar : svc.name_en}
                        </span>
                        <span className="text-[9px] text-neutral-500 font-mono">
                          {language === 'ar' ? "عرض التفاصيل والخامات" : "View pricing & specs"}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-luxury-gold transition-all group-hover:translate-x-1 rtl:rotate-180" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section 2: AI & Interactive Calculators */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-widest border-b border-luxury-gold/20 pb-1.5">
              {language === 'ar' ? "أدوات الذكاء الاصطناعي التفاعلية" : "Interactive Smart Utilities"}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {sitemapData.interactive.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`p-3 border flex flex-col justify-between space-y-3 group transition-all duration-300 relative overflow-hidden ${
                      isLight 
                        ? 'border-luxury-gold/30 bg-white hover:bg-luxury-gold/5' 
                        : 'border-luxury-gold/20 bg-neutral-900 hover:border-luxury-gold/10'
                    }`}
                  >
                    <div className="absolute top-0 right-0 bg-luxury-gold text-neutral-950 font-mono text-[8px] px-1.5 font-bold uppercase tracking-wider">
                      {item.badge}
                    </div>
                    
                    <div className="w-8 h-8 rounded-none bg-luxury-gold/15 flex items-center justify-center border border-luxury-gold/30">
                      <Icon className="w-4 h-4 text-luxury-gold animate-pulse" />
                    </div>
                    
                    <div className="leading-tight">
                      <span className="text-[11px] font-bold block text-luxury-offwhite group-hover:text-luxury-gold transition-colors">
                        {language === 'ar' ? item.name_ar : item.name_en}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section 3: Inspections, Progress & Portfolio */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-widest border-b border-luxury-gold/20 pb-1.5">
              {language === 'ar' ? "الحجوزات والملفات الفنية" : "Workflow & Portfolios"}
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {sitemapData.conversion.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`py-2 px-3 flex items-center justify-between rounded-none hover:bg-white/5 transition-all group ${
                      isLight ? 'hover:bg-black/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-neutral-400 group-hover:text-luxury-gold transition-colors" />
                      <span className="text-xs text-neutral-300 group-hover:text-white transition-colors">
                        {language === 'ar' ? item.name_ar : item.name_en}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-luxury-gold transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer - Contact Console */}
        <div className={`p-6 border-t space-y-4 ${
          isLight ? 'border-black/5 bg-[#EFECE6]' : 'border-white/5 bg-neutral-900'
        }`}>
          <div className="flex items-center justify-between">
            <div className="text-start leading-tight">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                {language === 'ar' ? "الخط الساخن للمعاينة" : "FREE SITE SURVEY"}
              </span>
              <span className="text-xs font-bold text-luxury-gold-dark font-mono block">
                {COMPANY.phone}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 font-mono text-[9px] text-emerald-500">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span>{language === 'ar' ? "متصل الآن" : "Live Agent"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${COMPANY.phone}`}
              className="py-2.5 bg-white/5 hover:bg-neutral-800 text-center font-mono font-bold text-[10px] text-neutral-300 border border-white/10 uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{language === 'ar' ? "اتصال هاتفي" : "Direct Call"}</span>
            </a>
            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-center font-mono font-bold text-[10px] text-white uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>WhatsApp</span>
            </a>
          </div>
          
          <p className="text-[9px] text-center text-neutral-500 leading-normal">
            {language === 'ar' 
              ? "الهنا الذهبية للتصميم وأعمال الديكور © 2026 دبي، الإمارات العربية المتحدة."
              : "Al Hana Al Zahabyah Design & Decoration Works © 2026 Dubai, UAE."}
          </p>
        </div>
      </div>
    </>
  );
};
