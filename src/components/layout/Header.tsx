// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Menu, X, Globe, Sun, Moon, ChevronDown } from 'lucide-react';

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
        isScrolled
          ? 'bg-neutral-950/90 light:bg-neutral-50/90 backdrop-blur-md py-3 border-b border-amber-500/20 shadow-lg shadow-amber-500/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Details */}
          <Link id="header-logo-link" to="/" className="flex items-center gap-3 group">
            <img
              id="header-logo-img"
              src="https://i.postimg.cc/KzbRXw4k/11zon-cropped.png"
              alt="Al Hana Al Zahabyah Logo"
              referrerPolicy="no-referrer"
              className="w-12 h-12 object-contain border border-amber-500/30 rounded-full bg-neutral-900 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col text-start">
              <span id="header-brand-name" className="text-sm font-sans sm:text-base font-bold text-amber-400 tracking-wider">
                {language === 'ar' ? "الهنا الذهبية" : "AL HANA AL ZAHABYAH"}
              </span>
              <span id="header-brand-sub" className="text-[10px] font-mono text-neutral-400 light:text-neutral-600">
                {language === 'ar' ? "للتصميم وأعمال الديكور" : "Design & Decoration"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1 xl:gap-2">
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
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-amber-400 cursor-pointer ${
                        isActive('/services') || location.pathname.startsWith('/services/')
                          ? 'text-amber-400 font-semibold'
                          : 'text-neutral-300 light:text-neutral-700'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isServicesDropdownOpen && (
                      <div
                        id="nav-services-dropdown"
                        className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-neutral-900 light:bg-neutral-50 border border-amber-500/25 rounded-md shadow-2xl py-2 mt-1 z-50 animate-fade-in text-start"
                      >
                        <Link
                          to="/services"
                          className="block px-4 py-2 text-xs font-bold text-amber-400 border-b border-neutral-800 light:border-neutral-200 hover:bg-amber-500/10"
                        >
                          {language === 'ar' ? "جميع الخدمات ←" : "All Services →"}
                        </Link>
                        {subServices.map((sub) => (
                          <Link
                            key={sub.slug}
                            to={`/services/${sub.slug}`}
                            className={`block px-4 py-2 text-sm hover:bg-amber-500/10 hover:text-amber-400 transition-colors ${
                              isActive(`/services/${sub.slug}`)
                                ? 'text-amber-400 bg-neutral-800 light:bg-neutral-200'
                                : 'text-neutral-300 light:text-neutral-700'
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
                    className={`px-3 py-2 text-sm font-medium transition-colors hover:text-amber-400 ${
                      isActive(item.path)
                        ? 'text-amber-400 border-b-2 border-amber-400 pb-1'
                        : 'text-neutral-300 light:text-neutral-700'
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
            {/* Language Toggle */}
            <button
              id="lang-toggle-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-neutral-700 light:border-neutral-300 text-neutral-300 light:text-neutral-700 hover:text-amber-400 hover:border-amber-400/50 transition-all text-xs font-bold cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ar' ? 'EN' : 'العربية'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-1.5 rounded-md border border-neutral-700 light:border-neutral-300 text-neutral-300 light:text-neutral-700 hover:text-amber-400 hover:border-amber-400/50 transition-all cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Portal Link */}
            <Link
              to="/customer-dashboard"
              className="text-xs font-mono text-neutral-400 light:text-neutral-600 hover:text-amber-400 transition-all"
            >
              {t.nav_customer_dashboard}
            </Link>

            {/* Request Quote Button */}
            <Link
              id="header-quote-cta"
              to="/request-quote"
              className="px-4 py-2 text-xs font-bold rounded-md bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all"
            >
              {t.btn_request_quote}
            </Link>
          </div>

          {/* Mobile Actions and Hamburger Menu */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Language Toggle (Mobile) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 p-2 rounded-md border border-neutral-800 light:border-neutral-200 text-neutral-300 light:text-neutral-700 hover:text-amber-400 text-xs font-bold cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            {/* Hamburger Button */}
            <button
              id="mobile-menu-hamburger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-neutral-300 light:text-neutral-700 hover:text-amber-400 border border-neutral-800 light:border-neutral-200 cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          id="mobile-menu-drawer"
          className="fixed inset-0 top-[73px] z-40 bg-neutral-950/95 light:bg-neutral-50/95 backdrop-blur-lg border-t border-amber-500/10 animate-slide-down flex flex-col justify-between overflow-y-auto"
        >
          <div className="px-4 py-6 space-y-3">
            {navItems.map((item) => (
              <div key={item.path} className="border-b border-neutral-900 light:border-neutral-200 pb-2">
                {item.isDropdown ? (
                  <div className="space-y-1.5">
                    <span className="block px-3 py-1.5 text-xs font-bold text-amber-500 font-mono tracking-wider">
                      {item.label}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-4 pr-4">
                      <Link
                        to="/services"
                        className="block px-3 py-1.5 text-xs font-semibold text-neutral-400 light:text-neutral-600 hover:text-amber-400"
                        onClick={() => setIsOpen(false)}
                      >
                        {language === 'ar' ? "جميع الخدمات ←" : "All Services →"}
                      </Link>
                      {subServices.map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/services/${sub.slug}`}
                          className="block px-3 py-1.5 text-sm text-neutral-300 light:text-neutral-700 hover:text-amber-400"
                          onClick={() => setIsOpen(false)}
                        >
                          {language === 'ar' ? sub.name_ar : sub.name_en}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 text-base font-medium hover:text-amber-400 transition-colors ${
                      isActive(item.path) ? 'text-amber-400' : 'text-neutral-300 light:text-neutral-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="p-6 bg-neutral-900/40 light:bg-neutral-100/40 border-t border-neutral-900 light:border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 light:text-neutral-600">
                {language === 'ar' ? "تغيير المظهر الداكن" : "Toggle Theme Mode"}
              </span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md border border-neutral-800 light:border-neutral-200 text-neutral-300 light:text-neutral-700 cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/customer-dashboard"
                className="block py-2.5 px-3 text-center rounded-md border border-neutral-800 light:border-neutral-200 text-xs font-semibold text-neutral-300 light:text-neutral-700"
                onClick={() => setIsOpen(false)}
              >
                {t.nav_customer_dashboard}
              </Link>
              <Link
                to="/admin-dashboard"
                className="block py-2.5 px-3 text-center rounded-md border border-neutral-800 light:border-neutral-200 text-xs font-semibold text-neutral-300 light:text-neutral-700 animate-pulse"
                onClick={() => setIsOpen(false)}
              >
                {t.nav_admin_dashboard}
              </Link>
            </div>

            <Link
              to="/request-quote"
              className="block w-full text-center py-3 rounded-md bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/10"
              onClick={() => setIsOpen(false)}
            >
              {t.btn_request_quote}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
