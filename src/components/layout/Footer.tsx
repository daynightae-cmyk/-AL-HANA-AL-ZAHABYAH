// src/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
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
    { name: 'Instagram', handle: '@alhanaalzahabyah', url: 'https://instagram.com/alhanaalzahabyah', icon: <Instagram className="w-5 h-5" /> },
    { name: 'Facebook', handle: 'Al Hana Al Zahabyah', url: 'https://facebook.com/alhanaalzahabyah', icon: <Facebook className="w-5 h-5" /> },
    { name: 'TikTok', handle: '@alhanaalzahabyah', url: 'https://www.tiktok.com/@alhanaalzahabyah', icon: <span className="text-xs font-bold font-mono">TK</span> },
    { name: 'Twitter / X', handle: '@AlHanaZahabyah', url: 'https://x.com/AlHanaZahabyah', icon: <span className="text-xs font-bold font-mono">X</span> },
    { name: 'LinkedIn', handle: 'Al Hana Al Zahabyah', url: 'https://www.linkedin.com/company/alhanaalzahabyah', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'Snapchat', handle: '@alhanaalzahabyah', url: 'https://www.snapchat.com/add/alhanaalzahabyah', icon: <span className="text-xs font-bold font-mono">SC</span> },
    { name: 'YouTube', handle: '@AlHanaAlZahabyah', url: 'https://www.youtube.com/@AlHanaAlZahabyah', icon: <Youtube className="w-5 h-5" /> },
    { name: 'Pinterest', handle: '@alhanaalzahabyah', url: 'https://www.pinterest.com/alhanaalzahabyah', icon: <span className="text-xs font-bold font-mono">PIN</span> }
  ];

  return (
    <footer
      id="main-footer"
      className="bg-neutral-950 text-neutral-100 border-t border-amber-500/15 pt-16 pb-8 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Column 1: Brand Intro (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.postimg.cc/KzbRXw4k/11zon-cropped.png"
                alt="Al Hana Al Zahabyah Logo"
                referrerPolicy="no-referrer"
                className="w-14 h-14 object-contain border border-amber-500/30 rounded-full bg-neutral-900"
              />
              <div className="flex flex-col text-start">
                <span className="text-base sm:text-lg font-bold text-amber-400 tracking-wider">
                  {language === 'ar' ? "الهنا الذهبية" : "AL HANA AL ZAHABYAH"}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {language === 'ar' ? "للتصميم وأعمال الديكور" : "Design & Decoration Works"}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-neutral-400 leading-relaxed text-start">
              {t.brand_description}
            </p>

            <div className="pt-2 text-start">
              <a
                href="https://www.alhanaalzahabyah.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 font-mono"
              >
                <span>www.alhanaalzahabyah.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Services (Span 3) */}
          <div className="lg:col-span-3 space-y-4 text-start">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest border-l-2 border-amber-500 pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pr-2">
              {t.footer_services}
            </h3>
            <ul className="space-y-2 text-sm">
              {servicesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1"
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
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest border-l-2 border-amber-500 pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pr-2">
              {t.footer_quick_links}
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1"
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
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest border-l-2 border-amber-500 pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pr-2">
              {language === 'ar' ? "تواصل وتفاصيل" : "Contact & Support"}
            </h3>
            
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{t.address_value}</span>
              </li>
              
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:admin@alhanaalzahabyah.com" className="hover:text-amber-400 font-mono text-xs">
                  admin@alhanaalzahabyah.com
                </a>
              </li>
              <li className="flex items-center gap-2 pl-7 rtl:pl-0 rtl:pr-7 text-xs text-neutral-500 font-mono">
                <span>info@alhanaalzahabyah.com</span>
              </li>
              <li className="flex items-center gap-2 pl-7 rtl:pl-0 rtl:pr-7 text-xs text-neutral-500 font-mono">
                <span>sales@alhanaalzahabyah.com</span>
              </li>

              <li className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono text-xs">{t.phone_label}: +971 50 000 0000</span>
              </li>
            </ul>

            <div className="pt-2">
              <span className="block text-xs text-neutral-500 font-bold uppercase tracking-wider mb-2">
                {t.working_hours_label}
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-semibold">
                {t.working_hours_value}
              </span>
            </div>
          </div>

        </div>

        {/* Social Media Grid */}
        <div className="py-8 text-start border-b border-neutral-900">
          <span className="block text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
            {t.social_media_label} ({language === 'ar' ? 'القنوات الرسمية' : 'Official Channels'})
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded bg-neutral-900 hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/30 transition-all group"
              >
                <div className="text-amber-500 group-hover:scale-110 transition-transform">
                  {social.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-neutral-400 font-semibold truncate">
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

        {/* Bottom Legal Panel */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="text-center md:text-start">
            <p>{t.footer_rights}</p>
            <p className="text-[10px] mt-1 text-neutral-600">
              {language === 'ar' ? 'تم حجز النطاق والاستضافة على Namecheap بتكلفة 503 درهم.' : 'Domain and hosting registered on Namecheap (503 AED total cost).'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-amber-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
              <span>{t.privacy_policy_title}</span>
            </Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-amber-500 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-neutral-600" />
              <span>{t.terms_title}</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
