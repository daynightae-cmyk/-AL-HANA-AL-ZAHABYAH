// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { language, t } = useApp();

  return (
    <div id="not-found-container" className="pt-32 pb-20 min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center text-center px-4">
      <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-4 animate-bounce">
        <AlertTriangle className="w-12 h-12" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
        {language === 'ar' ? "الصفحة غير موجودة (404)" : "Page Not Found (404)"}
      </h1>

      <p className="text-sm text-neutral-400 max-w-md leading-relaxed mb-8">
        {language === 'ar'
          ? "عذراً، ربما أدخلت رابطاً غير صحيح أو تم نقل هذه الصفحة لموقع آخر."
          : "The specified URL is invalid or has been archived. Check your route spelling."}
      </p>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 text-xs font-bold font-mono tracking-wider shadow-lg"
        >
          {language === 'ar' ? "العودة للرئيسية" : "Go to Home"}
        </Link>
        <Link
          to="/services"
          className="px-6 py-3 rounded-lg bg-neutral-900 border border-neutral-850 text-neutral-300 hover:text-amber-500 text-xs font-bold"
        >
          {t.nav_services}
        </Link>
      </div>
    </div>
  );
};
