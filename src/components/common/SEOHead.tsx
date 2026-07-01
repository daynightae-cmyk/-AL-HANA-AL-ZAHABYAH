// src/components/common/SEOHead.tsx

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY } from '../../lib/constants';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description }) => {
  const { language } = useApp();

  useEffect(() => {
    // 1. Update Document Title
    const brandName = language === 'ar' ? COMPANY.arabicName : COMPANY.name;
    const suffix = language === 'ar' ? 'الهنا الذهبية' : 'Al Hana Al Zahabyah';
    
    if (title) {
      document.title = `${title} | ${suffix}`;
    } else {
      document.title = `${brandName} - ${COMPANY.tagline}`;
    }

    // 2. Update Document Lang Attribute
    document.documentElement.lang = language || 'en';
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    // 3. Update Meta Description
    const defaultDesc = language === 'ar'
      ? "الهنا الذهبية للتصميم الداخلي والديكور في الإمارات. أفضل خدمات تركيب الجبس بورد والأصباغ الفاخرة وتشطيب الفلل والشقق في دبي."
      : "Al Hana Al Zahabyah Interior Design & Decoration in UAE. Premium gypsum board ceiling, Jotun paints, villa and apartment renovations in Dubai.";

    const targetDesc = description || defaultDesc;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', targetDesc);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', targetDesc);
      document.head.appendChild(metaDesc);
    }

    // 4. Update OpenGraph Tags for Social Previews
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title ? `${title} | ${suffix}` : brandName);
    }

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', targetDesc);
    }
  }, [title, description, language]);

  return null; // This component updates the DOM head side effects and renders nothing in the body
};

export default SEOHead;
