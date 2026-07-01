// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Menu, X, Globe, Sun, Moon, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { COMPANY } from '../../lib/constants';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const { language, theme, toggleLanguage, toggleTheme, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: t.nav_home, path: '/' },
    { label: t.nav_about, path: '/about' },
    { label: t.nav_services, path: '/services', isDropdown: true },
    { label: t.nav_projects, path: '/projects' },
    { label: t.nav_before_after, path: '/before-after' },
    { label: t.nav_track, path: '/track-project' },
    { label: t.nav_ai_assistant || 'AI Assistant', path: '/design-assistant' },
    { label: t.nav_contact, path: '/contact' },
  ];

  const subServices = [
    { name_ar: "التصميم المنزلي", name_en: "Home Design", slug: "home-design" },
    { name_ar: "دهانات المنازل", name_en: "Home Paint", slug: "home-paint" },
    { name_ar: "أعمال الديكور", name_en: "Home Decoration", slug: "home-decoration" },
    { name_ar: "تجديد المنازل", name_en: "Home Renovation", slug: "home-renovation" },
    { name_ar: "تجديد الفلل", name_en: "Villa Renovation", slug: "villa-renovation" },
    { name_ar: "ديكور المشاريع التجارية", name_en: "Commercial Decoration", slug: "commercial-decoration" },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        theme === 'light'
          ? isScrolled
            ? 'bg-[#F8F5ED]/95 backdrop-blur-md py-3 border-b border-luxury-gold/35 shadow-md'
            : 'bg-[#F8F5ED]/65 backdrop-blur-md py-5 border-b border-black/10'
          : isScrolled
            ? 'bg-black/90 backdrop-blur-md py-3 border-b border-luxury-gold/25 shadow-[0_0_25px_rgba(212,175,55,0.06)]'
            : 'bg-[#050505]/50 backdrop-blur-md py-5 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Details */}
          <Link id="header-logo-link" to="/" className="flex items-center gap-3 group text-start">
            <div className={`w-12 h-12 rounded-full border border-luxury-gold/35 p-0.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 overflow-hidden shadow-md ${
              theme === 'light' ? 'bg-white' : 'bg-black/80'
            }`}>
              <img
                src={COMPANY.logoUrl}
                alt={`${COMPANY.name} Logo`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
            <div className="leading-tight text-start">
              <span id="header-brand-name" className={`font-serif tracking-wider text-sm sm:text-base font-bold uppercase block ${
                theme === 'light' ? 'text-neutral-900' : 'text-luxury-offwhite'
              }`}>
                {language === 'ar' ? "الهنا الذهبية" : "AL HANA AL ZAHABYAH"}
              </span>
              <span id="header-brand-sub" className="text-luxury-gold text-[9px] tracking-[0.18em] font-medium uppercase mt-0.5 block">
                {language === 'ar' ? "للتصميم وأعمال الديكور" : "DESIGN & DECORATION"}
              </span>
            </div>
          </Link>
  
          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1 xl:gap-3">
            {navItems.map((item) => (
              <div key={item.path} className="relative">
                {item.isDropdown ? (
                  <div
                    id="nav-services-trigger"
                    className="relative"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-0.5 px-2 py-2 text-[11px] xl:text-xs uppercase tracking-widest font-medium transition-colors hover:text-luxury-gold cursor-pointer ${
                        isActive('/services') || location.pathname.startsWith('/services/')
                          ? 'text-luxury-gold font-semibold'
                          : theme === 'light' ? 'text-neutral-800' : 'text-[#D6D6D6]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isServicesDropdownOpen && (
                      <div
                        id="nav-services-dropdown"
                        className={`absolute top-full left-1/2 -translate-x-1/2 w-64 border rounded-none shadow-2xl py-2 mt-1 z-50 animate-fade-in text-start ${
                          theme === 'light' 
                            ? 'bg-[#F8F5ED] border-luxury-gold/35' 
                            : 'bg-black border-luxury-gold/30'
                        }`}
                      >
                        <Link
                          to="/services"
                          className={`block px-4 py-2 text-xs font-bold border-b hover:bg-luxury-gold/10 ${
                            theme === 'light' 
                              ? 'text-luxury-gold-dark border-black/5' 
                              : 'text-luxury-gold border-white/10'
                          }`}
                        >
                          {language === 'ar' ? "جميع الخدمات ←" : "All Services →"}
                        </Link>
                        {subServices.map((sub) => (
                          <Link
                            key={sub.slug}
                            to={`/services/${sub.slug}`}
                            className={`block px-4 py-2 text-[11px] uppercase tracking-wider hover:bg-luxury-gold/10 hover:text-luxury-gold transition-colors ${
                              isActive(`/services/${sub.slug}`)
                                ? theme === 'light' ? 'text-luxury-gold-dark bg-black/5 font-bold' : 'text-luxury-gold bg-white/5 font-bold'
                                : theme === 'light' ? 'text-neutral-800' : 'text-[#D6D6D6]'
                            }`}
                          >
                            {language === 'ar' ? sub.name_ar : sub.name_en}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-2 py-2 text-[11px] xl:text-xs uppercase tracking-widest font-medium transition-all hover:text-luxury-gold ${
                      isActive(item.path)
                        ? 'text-luxury-gold border-b border-luxury-gold pb-1 font-semibold'
                        : theme === 'light' ? 'text-neutral-800' : 'text-[#D6D6D6]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
 
          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Phone CTA */}
            <a
              href="tel:+971555587699"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 border border-white/10 text-xs font-mono text-[#D6D6D6] hover:text-luxury-gold hover:border-luxury-gold/30 transition-all"
              title="Call Us Now"
            >
              <Phone className="w-3.5 h-3.5 text-luxury-gold animate-pulse" />
              <span>+971 55 558 7699</span>
            </a>

            {/* WhatsApp Icon Button */}
            <a
              href="https://wa.me/971555587699"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/10 text-[#D6D6D6] hover:text-luxury-gold hover:border-luxury-gold/30 transition-all rounded-none"
              title="WhatsApp Us"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
            </a>

            {/* Language Toggle */}
            <button
              id="lang-toggle-btn"
              onClick={toggleLanguage}
              className="text-luxury-gold border border-luxury-gold/30 px-3 py-2 text-[10px] uppercase tracking-widest hover:bg-luxury-gold hover:text-black transition-all cursor-pointer font-bold"
              title="Switch Language"
            >
              <span>{language === 'ar' ? 'EN' : 'العربية'}</span>
            </button>
 
            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 border border-white/15 text-[#D6D6D6] hover:text-luxury-gold hover:border-luxury-gold/40 transition-all cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
 
            {/* Portal Link */}
            <Link
              to="/customer-portal"
              className="text-[10px] uppercase tracking-widest font-mono text-luxury-muted hover:text-luxury-gold transition-all"
            >
              {t.nav_customer_dashboard || 'Dashboard'}
            </Link>
 
            {/* Request Quote Button */}
            <Link
              id="header-quote-cta"
              to="/request-quote"
              className="bg-luxury-gold text-black px-5 py-2 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-yellow-500 transition-all"
            >
              {t.btn_request_quote}
            </Link>
          </div>
 
          {/* Mobile Actions and Hamburger Menu */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Language Toggle (Mobile) */}
            <button
              onClick={toggleLanguage}
              className="text-luxury-gold border border-luxury-gold/30 px-3 py-1.5 text-[10px] uppercase tracking-widest hover:bg-luxury-gold hover:text-black transition-all cursor-pointer font-bold"
            >
              <span>{language === 'ar' ? 'EN' : 'AR'}</span>
            </button>
 
            {/* Hamburger Button */}
            <button
              id="mobile-menu-hamburger"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="p-2 text-[#D6D6D6] hover:text-luxury-gold border border-white/10 cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
 
        </div>
      </div>
 
      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        language={language as 'ar' | 'en'}
        theme={theme as 'light' | 'dark'}
        toggleLanguage={toggleLanguage}
        toggleTheme={toggleTheme}
      />
    </header>
  );
};
