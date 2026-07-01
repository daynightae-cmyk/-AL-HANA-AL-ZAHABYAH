// src/components/common/SEOHead.tsx

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { COMPANY } from '../../lib/constants';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  canonicalPath?: string;
}

const upsertMeta = (selector: string, attributeName: 'name' | 'property', attributeValue: string, content: string) => {
  let tag = document.querySelector(selector) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
};

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description, image, canonicalPath }) => {
  const { language } = useApp();
  const location = useLocation();

  useEffect(() => {
    const brandName = language === 'ar' ? COMPANY.arabicName : COMPANY.name;
    const suffix = language === 'ar' ? 'الهنا الذهبية' : 'AL HANA AL ZAHABYAH';
    const pageTitle = title ? `${title} | ${suffix}` : `${brandName} - ${COMPANY.tagline}`;
    const defaultDesc = language === 'ar'
      ? 'الهنا الذهبية للتصميم الداخلي والديكور في الإمارات. خدمات تصميم وديكور ودهانات وتجديد فلل ومنازل ومشاريع تجارية بجودة فاخرة.'
      : 'AL HANA AL ZAHABYAH provides luxury interior design, home painting, decoration works, villa renovation, and commercial decoration services across the UAE.';
    const targetDesc = description || defaultDesc;
    const targetImage = image || COMPANY.defaultHeroImage;
    const canonicalUrl = `${COMPANY.websiteUrl}${canonicalPath || location.pathname}`;

    document.title = pageTitle;
    document.documentElement.lang = language || 'ar';
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    upsertCanonical(canonicalUrl);
    upsertMeta('meta[name="description"]', 'name', 'description', targetDesc);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', targetDesc);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', targetImage);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', targetDesc);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', targetImage);
  }, [title, description, image, canonicalPath, language, location.pathname]);

  return null;
};

export default SEOHead;
