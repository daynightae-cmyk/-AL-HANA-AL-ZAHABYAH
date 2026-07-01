// src/pages/ServiceDetail.tsx
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockServices, mockServicePackages, mockProjectGallery } from '../data/mockData';
import { CheckCircle2, ChevronRight, Calendar, Coins, ArrowLeft, Layout, Sparkles, AlertTriangle } from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useApp();
  const navigate = useNavigate();

  const service = mockServices.find(s => s.slug === slug);
  const packages = slug ? mockServicePackages[slug] || [] : [];
  const relatedProjects = slug ? mockProjectGallery.filter(p => p.service_type === slug) : [];

  useEffect(() => {
    // Scroll to top on page mount
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center text-center px-4">
        <AlertTriangle className="w-16 h-16 text-amber-500 mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold mb-2">
          {language === 'ar' ? "الخدمة غير متوفرة" : "Service Not Found"}
        </h1>
        <p className="text-sm text-neutral-400 mb-6 max-w-md">
          {language === 'ar' ? "عذراً، الخدمة التي تحاول الوصول إليها غير صالحة أو تم نقلها." : "Sorry, the specified service does not exist or has been relocated."}
        </p>
        <Link
          to="/services"
          className="px-6 py-2.5 rounded bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-sm"
        >
          {language === 'ar' ? "العودة لصفحة الخدمات" : "Back to Services"}
        </Link>
      </div>
    );
  }

  return (
    <div id="service-detail-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans">
      
      {/* 1. Page Hero */}
      <section className="relative py-20 px-4 text-center border-b border-amber-500/10 overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/5 border border-amber-500/25 text-amber-400 text-xs font-mono">
            <Link to="/services" className="hover:underline">
              {language === 'ar' ? "خدماتنا" : "Services"}
            </Link>
            <span>/</span>
            <span>{slug}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {language === 'ar' ? service.name_ar : service.name_en}
          </h1>
          
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {language === 'ar' ? service.description_ar : service.description_en}
          </p>
        </div>
      </section>

      {/* 2. Packages & Estimators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">
            {language === 'ar' ? "الباقات والأسعار" : "Flexible Project Estimates"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            {language === 'ar' ? "باقات فنية مرنة ومكتوبة بدقة" : "Guideline Packages & Specs"}
          </h2>
          <p className="text-sm text-neutral-400">
            {language === 'ar' 
              ? "تفاصيل واضحة بالمواد والمواصفات والأسعار التوجيهية لمشروعك"
              : "Baseline quotes detailing materials, structural specs, and expected duration"}
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="p-8 rounded-xl bg-neutral-900 border border-neutral-850 text-center max-w-xl mx-auto">
            <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">
              {language === 'ar' ? "باقات تسعير مخصصة" : "Bespoke Estimations Only"}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {language === 'ar'
                ? "هذه الخدمة تتطلب معاينة دقيقة ومسح جدران للموقع لتقديم عرض سعر مخصص مجاناً. لا توجد باقات جاهزة نظراً لتغير الخامات والمقاسات."
                : "This service requires custom site metrics and structural assessments to generate a precise quotation. Tap Request Quote to schedule."}
            </p>
            <div className="mt-4">
              <Link
                to="/request-quote"
                className="inline-block px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold"
              >
                {t.btn_request_quote}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-850 shadow-xl hover:border-amber-500/30 transition-all relative"
              >
                {/* Special accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>

                <div className="space-y-6">
                  <div className="border-b border-neutral-800 pb-4 text-start">
                    <h3 className="text-lg font-bold text-amber-400">
                      {language === 'ar' ? pkg.package_name_ar : pkg.package_name_en}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      {language === 'ar' ? pkg.description_ar : pkg.description_en}
                    </p>
                  </div>

                  {/* Price and duration metrics */}
                  <div className="grid grid-cols-2 gap-4 bg-neutral-950 p-4 rounded-lg text-start">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-amber-500 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-mono text-neutral-500">
                          {language === 'ar' ? "يبدأ من" : "Starting price"}
                        </span>
                        <span className="text-sm font-bold text-white font-mono">
                          {pkg.starting_price} AED
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-mono text-neutral-500">
                          {language === 'ar' ? "التسليم المتوقع" : "Expected Time"}
                        </span>
                        <span className="text-sm font-bold text-white font-mono">
                          {pkg.estimated_days} {language === 'ar' ? "أيام" : "Days"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet features */}
                  <div className="space-y-3 text-start">
                    <span className="block text-xs font-mono uppercase font-bold text-amber-500 tracking-wider">
                      {language === 'ar' ? "محتويات وعناصر الباقة:" : "What is Included:"}
                    </span>
                    <div className="space-y-2">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800 mt-6">
                  <Link
                    to="/request-quote"
                    className="block w-full text-center py-2.5 rounded bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold text-xs shadow-md"
                  >
                    {language === 'ar' ? "اطلب معاينة لهذه الباقة" : "Request Free On-Site Inspection"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Related Projects Gallery */}
      {relatedProjects.length > 0 && (
        <section className="bg-neutral-900/40 border-t border-neutral-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl font-extrabold">
                {language === 'ar' ? "مشاريع مماثلة نفذناها" : "Our Related Projects"}
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                {language === 'ar' 
                  ? "شاهد جودة تشطيباتنا الفاخرة للفلل والشقق والمكاتب في الإمارات"
                  : "Explore our real on-site painting and gypsum outputs logged across cities"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg overflow-hidden bg-neutral-900 border border-neutral-850 shadow-md flex flex-col justify-between"
                >
                  <img
                    src={project.main_image_url}
                    alt={language === 'ar' ? project.title_ar : project.title_en}
                    referrerPolicy="no-referrer"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-start space-y-2">
                    <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wide">
                      {project.emirate}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {language === 'ar' ? project.title_ar : project.title_en}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {language === 'ar' ? project.description_ar : project.description_en}
                    </p>
                    <Link
                      to="/before-after"
                      className="inline-block text-[11px] font-mono font-bold text-amber-500 hover:underline pt-2 border-t border-neutral-800 w-full"
                    >
                      {language === 'ar' ? "مقارنة قبل / بعد ←" : "Before & After →"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Request estimate banner */}
      <section className="py-16 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-center border-t border-amber-500/10">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            {language === 'ar' ? "احصل على معاينة وقياس جدران مجاني" : "Secure Your On-Site Measurement Visit"}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            {language === 'ar'
              ? "سيقوم مهندسونا بفحص الرطوبة ورفع المقاسات وتقديم كتالوج جوتن للأصباغ المعتمد مجاناً."
              : "Our local supervisors carry authentic color charts and assess plaster stability at no cost."}
          </p>
          <div className="pt-2">
            <Link
              to="/request-quote"
              className="px-6 py-3 rounded bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold text-xs uppercase"
            >
              {t.btn_request_quote}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
