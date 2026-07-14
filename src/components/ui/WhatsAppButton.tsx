// src/components/ui/WhatsAppButton.tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle } from 'lucide-react';
import { COMPANY } from '../../lib/constants';

export const WhatsAppButton: React.FC = () => {
  const { language, t } = useApp();

  const getDynamicWhatsappUrl = () => {
    // 1. Get Style Finder Quiz Recommendation
    let styleResult: any = null;
    const styleSaved = localStorage.getItem('ahz_style_finder_result');
    if (styleSaved) {
      try {
        styleResult = JSON.parse(styleSaved);
      } catch (e) {}
    }

    // 2. Get general design assistant configurations
    let assistantConfig: any = null;
    const assistantSaved = localStorage.getItem('ahz_design_assistant_config');
    if (assistantSaved) {
      try {
        assistantConfig = JSON.parse(assistantSaved);
      } catch (e) {}
    }

    // 3. Get quotation/estimator form data
    let quoteData: any = null;
    const quoteSaved = localStorage.getItem('ahz_latest_quote_form_data');
    if (quoteSaved) {
      try {
        quoteData = JSON.parse(quoteSaved);
      } catch (e) {}
    }

    // Now, build a beautiful text block
    let message = '';
    
    if (language === 'ar') {
      message = "مرحباً الهنا الذهبية، أود حجز استشارة ومناقشة تفاصيل مشروعي كالتالي:\n\n";
      
      let hasDetails = false;
      if (quoteData && (quoteData.full_name || quoteData.phone || quoteData.emirate)) {
        hasDetails = true;
        if (quoteData.full_name) message += `👤 العميل: ${quoteData.full_name}\n`;
        if (quoteData.phone) message += `📞 الهاتف: ${quoteData.phone}\n`;
        if (quoteData.emirate) message += `📍 الإمارة/المنطقة: ${quoteData.emirate} - ${quoteData.area || ''}\n`;
        if (quoteData.property_type) message += `🏡 نوع العقار: ${quoteData.property_type}\n`;
        if (quoteData.service_type) message += `🛠️ الخدمة المطلوبة: ${quoteData.service_type}\n`;
        if (quoteData.project_size) message += `📐 المساحة/الحجم: ${quoteData.project_size}\n`;
        if (quoteData.budget_range) message += `💰 نطاق الميزانية: ${quoteData.budget_range}\n`;
      }

      if (styleResult) {
        hasDetails = true;
        message += `🎨 النمط المقترح: ${styleResult.styleAr}\n`;
        message += `📦 الباقة الموصى بها: ${styleResult.recommendedPackage?.name_ar || ''} (${styleResult.recommendedPackage?.price || ''})\n`;
      } else if (assistantConfig) {
        hasDetails = true;
        message += `🎨 النمط المفضل: ${assistantConfig.designStyle || ''}\n`;
        if (assistantConfig.colors) message += `✨ الألوان المفضلة: ${assistantConfig.colors || ''}\n`;
      }

      if (quoteData && quoteData.project_description) {
        hasDetails = true;
        message += `📝 تفاصيل إضافية: ${quoteData.project_description}\n`;
      }

      if (!hasDetails) {
        message = "مرحباً الهنا الذهبية، أود الاستفسار عن خدمات التصميم والديكور والدهانات في الإمارات.";
      }
    } else {
      message = "Hello Al Hana Al Zahabyah, I would like to book a consultation or discuss my project details:\n\n";
      
      let hasDetails = false;
      if (quoteData && (quoteData.full_name || quoteData.phone || quoteData.emirate)) {
        hasDetails = true;
        if (quoteData.full_name) message += `👤 Client: ${quoteData.full_name}\n`;
        if (quoteData.phone) message += `📞 Phone: ${quoteData.phone}\n`;
        if (quoteData.emirate) message += `📍 Location: ${quoteData.emirate} - ${quoteData.area || ''}\n`;
        if (quoteData.property_type) message += `🏡 Property: ${quoteData.property_type}\n`;
        if (quoteData.service_type) message += `🛠️ Service: ${quoteData.service_type}\n`;
        if (quoteData.project_size) message += `📐 Size: ${quoteData.project_size}\n`;
        if (quoteData.budget_range) message += `💰 Budget: ${quoteData.budget_range}\n`;
      }

      if (styleResult) {
        hasDetails = true;
        message += `🎨 Recommended Style: ${styleResult.style}\n`;
        message += `📦 Recommended Package: ${styleResult.recommendedPackage?.name_en || ''} (${styleResult.recommendedPackage?.price || ''})\n`;
      } else if (assistantConfig) {
        hasDetails = true;
        message += `🎨 Preferred Style: ${assistantConfig.designStyle || ''}\n`;
        if (assistantConfig.colors) message += `✨ Preferred Colors: ${assistantConfig.colors || ''}\n`;
      }

      if (quoteData && quoteData.project_description) {
        hasDetails = true;
        message += `📝 Project Notes: ${quoteData.project_description}\n`;
      }

      if (!hasDetails) {
        message = "Hello Al Hana Al Zahabyah, I would like to inquire about your design, painting, and decoration services.";
      }
    }

    return `https://wa.me/971555587699?text=${encodeURIComponent(message.trim())}`;
  };

  const whatsappUrl = getDynamicWhatsappUrl();

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

