// src/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { COMPANY, SOCIALS } from '../../lib/constants';
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Send,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useApp();

  const servicesLinks = [
    { label: t.service_home_design_title, path: '/services/home-design' },
    { label: t.service_home_paint_title, path: '/services/home-paint' },
    { label: t.service_home_decoration_title, path: '/services/home-decoration' },
    { label: t.service_home_renovation_title, path: '/services/home-renovation' },
    { label: t.service_villa_renovation_title, path: '/services/villa-renovation' },
    { label: t.service_commercial_decoration_title, path: '/services/commercial-decoration' }
  ];

  const quickLinks = [
    { label: t.nav_home, path: '/' },
    { label: t.nav_about, path: '/about' },
    { label: t.nav_services, path: '/services' },
    { label: t.nav_projects, path: '/projects' },
    { label: t.nav_track, path: '/track-project' },
    { label: t.nav_quote, path: '/request-quote' },
    { label: t.nav_faqs, path: '/faqs' },
    { label: t.nav_blog, path: '/blog' }
  ];

  const socialLinks = [
    { name: 'Instagram', handle: '@alhanaalzahabyah', url: SOCIALS.instagram, icon: <Instagram className="w-4 h-4" /> },
    { name: 'TikTok', handle: '@alhanaalzahabyah', url: SOCIALS.tiktok, icon: <span className="text-[10px] font-bold font-mono text-luxury-gold">TK</span> },
    { name: 'Facebook', handle: 'alhanaalzahabyah', url: SOCIALS.facebook, icon: <Facebook className="w-4 h-4" /> },
    { name: 'LinkedIn', handle: 'alhanaalzahabyah', url: SOCIALS.linkedin, icon: <Linkedin className="w-4 h-4" /> },
    { name: 'Twitter / X', handle: '@alhanaalzahabyah', url: SOCIALS.x, icon: <span className="text-[10px] font-bold font-mono text-luxury-gold">X</span> },
    { name: 'Snapchat', handle: '@alhanaalzahabyah', url: SOCIALS.snapchat, icon: <span className="text-[10px] font-bold font-mono text-luxury-gold">SC</span> },
    { name: 'Threads', handle: '@alhanaalzahabyah', url: SOCIALS.threads, icon: <span className="text-[10px] font-bold font-mono text-luxury-gold">TH</span> },
    { name: 'Pinterest', handle: 'alhanaalzahabyah', url: SOCIALS.pinterest, icon: <span className="text-[10px] font-bold font-mono text-luxury-gold">PIN</span> }
  ];

  return (
    <footer
      id="main-footer"
      className="bg-[#050505] text-[#D6D6D6] border-t border-white/10 pt-16 pb-8 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Intro (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3 text-start">
              <div className="w-12 h-12 rounded-full border border-luxury-gold/30 p-0.5 bg-black/80 flex items-center justify-center shrink-0 overflow-hidden shadow-md">
                <img
                  src={COMPANY.logoUrl}
                  alt={`${COMPANY.name} Logo`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-sm sm:text-base font-serif font-bold text-luxury-offwhite tracking-wider uppercase">
                  {language === 'ar' ? "الهنا الذهبية" : "AL HANA AL ZAHABYAH"}
                </span>
                <span className="text-[9px] tracking-[0.18em] font-mono text-luxury-gold uppercase mt-0.5">
                  {language === 'ar' ? "للتصميم وأعمال الديكور" : "DESIGN & DECORATION"}
                </span>
              </div>
            </div>
            
            <p className="text-xs text-luxury-muted leading-relaxed text-start">
              {t.brand_description}
            </p>

            <div className="pt-2 text-start">
              <a
                href={`https://${COMPANY.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-luxury-gold hover:text-yellow-500 font-mono"
              >
                <span>{COMPANY.website}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Services (Span 3) */}
          <div className="lg:col-span-3 space-y-4 text-start">
            <h3 className="text-xs font-serif font-bold text-luxury-gold uppercase tracking-widest border-l-2 border-luxury-gold pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pr-2">
              {t.footer_services}
            </h3>
            <ul className="space-y-2 text-xs">
              {servicesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-luxury-muted hover:text-luxury-gold transition-colors flex items-center gap-1"
                  >
                    <span>•</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation (Span 2) */}
          <div className="lg:col-span-2 space-y-4 text-start">
            <h3 className="text-xs font-serif font-bold text-luxury-gold uppercase tracking-widest border-l-2 border-luxury-gold pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pr-2">
              {t.footer_quick_links}
            </h3>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-luxury-muted hover:text-luxury-gold transition-colors flex items-center gap-1"
                  >
                    <span>•</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Operations (Span 3) */}
          <div className="lg:col-span-3 space-y-4 text-start">
            <h3 className="text-xs font-serif font-bold text-luxury-gold uppercase tracking-widest border-l-2 border-luxury-gold pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pr-2">
              {language === 'ar' ? "تواصل وتفاصيل" : "CONTACT & SUPPORT"}
            </h3>
            
            <ul className="space-y-3 text-xs text-luxury-muted">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>{t.address_value}</span>
              </li>
              
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                <a href="mailto:admin@alhanaalzahabyah.com" className="hover:text-luxury-gold font-mono text-[11px]">
                  admin@alhanaalzahabyah.com
                </a>
              </li>
              <li className="flex items-center gap-2 pl-6 rtl:pl-0 rtl:pr-6 text-[10px] text-neutral-500 font-mono">
                <span>info@alhanaalzahabyah.com</span>
              </li>

              <li className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                <span className="font-mono text-[11px]">{t.phone_label}: {COMPANY.phone}</span>
              </li>
            </ul>

            <div className="pt-2">
              <span className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                {t.working_hours_label}
              </span>
              <span className="text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 text-luxury-gold font-semibold tracking-wider">
                {t.working_hours_value}
              </span>
            </div>
          </div>

        </div>

        {/* Social Media Grid */}
        <div className="py-8 text-start border-b border-white/10">
          <span className="block text-xs font-serif font-bold text-luxury-gold uppercase tracking-widest mb-4">
            {t.social_media_label} ({language === 'ar' ? 'القنوات الرسمية' : 'OFFICIAL CHANNELS'})
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-[#0d0d0d] hover:bg-luxury-gold/5 border border-white/5 hover:border-luxury-gold/30 transition-all group"
              >
                <div className="text-luxury-gold group-hover:scale-110 transition-transform">
                  {social.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-luxury-muted font-semibold truncate uppercase">
                    {social.name}
                  </span>
                  <span className="text-[9px] text-neutral-600 truncate font-mono">
                    {social.handle}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Legal Panel & Immersive Utility Rail */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-[10px] font-medium tracking-[0.15em] uppercase text-luxury-muted">
          
          <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-8 text-center md:text-start">
            <span>INSTAGRAM: @ALHANAALZAHABYAH</span>
            <span>WHATSAPP: {COMPANY.phone}</span>
            <div className="flex items-center gap-2 justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>OFFICE OPEN: 9:00 AM - 9:00 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link to="/privacy-policy" className="hover:text-luxury-gold flex items-center gap-1">
              <span>{t.privacy_policy_title}</span>
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-luxury-gold flex items-center gap-1">
              <span>{t.terms_title}</span>
            </Link>
          </div>

        </div>

        <div className="pt-6 border-t border-white/5 mt-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-neutral-600 text-center md:text-start">
          <p>© 2026 AL HANA AL ZAHABYAH. All rights reserved. Designed & Developed by Sadek Elgazar.</p>
          <p className="mt-1 md:mt-0 font-mono">
            {language === 'ar' ? 'تم حجز النطاق والاستضافة على Namecheap بتكلفة 503 درهم.' : 'DOMAIN AND HOSTING ON NAMECHEAP (503 AED).'}
          </p>
        </div>

      </div>
    </footer>
  );
};
