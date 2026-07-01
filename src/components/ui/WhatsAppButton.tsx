// src/components/ui/WhatsAppButton.tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle } from 'lucide-react';
import { COMPANY } from '../../lib/constants';

export const WhatsAppButton: React.FC = () => {
  const { language, t } = useApp();

  const defaultMessage = encodeURIComponent(
    language === 'ar'
      ? "مرحباً الهنا الذهبية، أود الاستفسار عن خدمات التصميم والديكور والدهانات في الإمارات."
      : "Hello Al Hana Al Zahabyah, I would like to inquire about your design, painting, and decoration services."
  );

  const whatsappUrl = `https://wa.me/971555587699?text=${defaultMessage}`;

  return (
    <div
      id="floating-whatsapp-container"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group pointer-events-auto"
    >
      {/* Tooltip text (Reveals on hover) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#050505]/95 backdrop-blur-md border border-luxury-gold/30 text-luxury-gold text-[10px] uppercase tracking-widest font-bold px-4 py-2 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto font-mono"
      >
        <span>{t.btn_chat_whatsapp || 'WhatsApp'}</span>
      </a>

      {/* Floating Animated Button */}
      <a
        id="whatsapp-floating-trigger"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-luxury-gold text-black rounded-full shadow-lg shadow-luxury-gold/20 hover:shadow-luxury-gold/50 hover:scale-105 transition-all cursor-pointer group"
        aria-label="Chat with Al Hana Al Zahabyah on WhatsApp"
      >
        {/* Ring animations */}
        <span className="absolute inset-0 rounded-full bg-luxury-gold animate-ping opacity-20"></span>
        <span className="absolute -inset-1 rounded-full border border-luxury-gold/20 animate-pulse"></span>
        
        {/* Chat icon */}
        <MessageCircle size={22} className="stroke-[1.75]" />
      </a>
    </div>
  );
};

