// src/components/common/SafeImage.tsx

import React from 'react';

interface SafeImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, alt = 'AL HANA AL ZAHABYAH', className = '' }) => {
  if (!src) {
    return <div className={className} role="img" aria-label={alt}>{alt}</div>;
  }

  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" referrerPolicy="no-referrer" />;
};

export default SafeImage;
