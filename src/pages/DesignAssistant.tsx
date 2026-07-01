import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { useApp } from '../context/AppContext';
import { AIStyleGenerator } from '../components/AIStyleGenerator';

export const DesignAssistantPage: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  return (
    <>
      <SEOHead
        title={isAr ? 'مساعد التصميم الذكي' : 'AI Design Assistant'}
        description={isAr ? 'مولد ستايل وMoodboard ذكي لمشاريع التصميم والديكور.' : 'AI-inspired style generator and moodboard assistant for design and decoration projects.'}
      />
      <main className="min-h-screen bg-neutral-950 px-4 py-28 text-white sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl text-start" dir={isAr ? 'rtl' : 'ltr'}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-luxury-gold">{isAr ? 'تجربة تصميم ذكية' : 'Smart Design Experience'}</p>
            <h1 className="font-serif text-4xl font-bold md:text-6xl">{isAr ? 'مساعد التصميم الذكي' : 'AI Design Assistant'}</h1>
            <p className="mt-5 text-sm leading-7 text-neutral-400 md:text-base">
              {isAr
                ? 'ابدأ بتوليد اتجاه تصميم فاخر من خلال الكلمات المفتاحية ونوع الغرفة، ثم احفظ النتيجة داخل Supabase عند تفعيل الجداول.'
                : 'Generate a luxury design direction from keywords and room type, then save the moodboard to Supabase when tables are active.'}
            </p>
          </div>
          <AIStyleGenerator language={language} />
        </section>
      </main>
    </>
  );
};
