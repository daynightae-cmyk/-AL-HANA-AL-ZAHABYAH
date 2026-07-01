// src/components/common/ServiceCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layout, 
  Paintbrush, 
  Sparkles, 
  Wrench, 
  Home, 
  Briefcase, 
  Layers, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { COMPANY } from '../../lib/constants';

export interface ServiceType {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  slug: string;
  icon: string;
  image_url?: string;
}

interface ServiceCardProps {
  service: ServiceType;
  language: 'en' | 'ar';
  index: number;
  btnRequestQuoteText?: string;
  btnDetailsText?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Layout,
  Paintbrush,
  Sparkles,
  Wrench,
  Home,
  Briefcase,
  Layers
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  language,
  index,
  btnRequestQuoteText = 'Request Quote',
  btnDetailsText = 'Details'
}) => {
  const isRtl = language === 'ar';
  const name = isRtl ? service.name_ar : service.name_en;
  const description = isRtl ? service.description_ar : service.description_en;

  // Resolve Icon component, default to Layers
  const IconComponent = iconMap[service.icon] || Layers;

  return (
    <div
      id={`service-card-${service.id}`}
      className="group relative bg-[#0a0a0a] border border-white/5 p-6 hover:border-luxury-gold/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 flex flex-col justify-between overflow-hidden rounded-sm"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Dynamic Gold Gradient Corner Border effect */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-luxury-gold/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
      
      {/* Decorative Shimmer Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

      <div>
        {/* Floating Item Index Number */}
        <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} font-mono text-[9px] text-white/20 tracking-wider group-hover:text-luxury-gold/50 transition-colors`}>
          {isRtl ? `٠${index + 1}` : `0${index + 1}`}
        </div>

        {/* Lucide Icon Wrapper with Hover Scale & Rotate */}
        <div className={`mb-5 p-3 rounded-none bg-neutral-950 border border-white/5 inline-block group-hover:border-luxury-gold/30 group-hover:bg-luxury-gold/5 transition-all duration-500 ${isRtl ? 'text-right' : 'text-left'}`}>
          <IconComponent 
            size={24} 
            className="text-luxury-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 stroke-[1.5]" 
          />
        </div>

        {/* Dynamic Text Alignment based on Language */}
        <h3 className={`text-base sm:text-lg font-serif font-semibold text-luxury-offwhite mb-3 group-hover:text-luxury-gold transition-colors tracking-wide leading-snug ${isRtl ? 'text-right' : 'text-left'}`}>
          {name}
        </h3>

        <p className={`text-xs text-luxury-muted leading-relaxed line-clamp-3 mb-6 font-sans ${isRtl ? 'text-right' : 'text-left'}`}>
          {description}
        </p>
      </div>

      {/* Action Buttons with localized styling */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
        <Link
          to={`/services/${service.slug}`}
          className="text-[11px] font-mono text-luxury-gold font-bold hover:text-yellow-500 flex items-center gap-1.5 transition-colors"
        >
          <span>{btnDetailsText}</span>
          <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 ${isRtl ? 'rotate-180' : ''}`} />
        </Link>
        <Link
          to="/request-quote"
          className="text-[10px] px-3.5 py-2 bg-neutral-950 text-luxury-gold font-bold border border-luxury-gold/25 hover:bg-luxury-gold hover:text-black transition-all uppercase tracking-wider font-mono rounded-none"
        >
          {btnRequestQuoteText}
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
