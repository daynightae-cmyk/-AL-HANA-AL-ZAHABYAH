// src/components/ui/WhatsAppButton.tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquareCode } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { language, t } = useApp();

  // Official WhatsApp placeholder number
  // Can be replaced easily in one location
  const whatsappNumber = "+971500000000";
  const defaultMessage = encodeURIComponent(
    language === 'ar'
      ? "مرحباً الهنا الذهبية، أود الاستفسار عن خدمات التصميم والديكور والدهانات في الإمارات."
      : "Hello Al Hana Al Zahabyah, I would like to inquire about your design, painting, and decoration services."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

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
        className="flex items-center gap-2.5 bg-neutral-900/90 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-2 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto font-mono"
      >
        <span>{t.btn_chat_whatsapp}</span>
      </a>

      {/* Floating Animated Button */}
      <a
        id="whatsapp-floating-trigger"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-500 to-green-600 text-neutral-950 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/50 hover:scale-105 transition-all cursor-pointer group"
        aria-label="Chat with Al Hana Al Zahabyah on WhatsApp"
      >
        {/* Ring animations */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-25"></span>
        <span className="absolute -inset-1 rounded-full border border-emerald-500/20 animate-pulse"></span>
        
        {/* Chat icon */}
        <MessageSquareCode className="w-6 h-6 text-neutral-950 stroke-[2.5]" />
      </a>
    </div>
  );
};
