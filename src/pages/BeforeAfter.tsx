// src/pages/BeforeAfter.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockProjectGallery } from '../data/mockData';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { Sparkles, ArrowRight, Layers, HelpCircle, Wrench, Trophy } from 'lucide-react';

export const BeforeAfterPage: React.FC = () => {
  const { language, t } = useApp();
  
  // Filter only projects that have both before and after URLs
  const beforeAfterProjects = mockProjectGallery.filter(
    (p) => p.before_image_url && p.after_image_url
  );

  // Custom challenges and solutions matching our mock projects
  const caseStudiesInfo: Record<string, {
    challenge_ar: string;
    challenge_en: string;
    solution_ar: string;
    solution_en: string;
    result_ar: string;
    result_en: string;
  }> = {
    "g1": {
      challenge_ar: "كانت الفيلا تعاني من رطوبة جدارية شديدة في الزوايا، أسقف قديقة متشققة، وضعف شديد في توزيع الإضاءة، مما جعل المساحة تبدو مظلمة وضيقة.",
      challenge_en: "The villa suffered from severe wall moisture in corners, cracked outdated plaster ceilings, and extremely poor illumination making the grand space feel dark and tight.",
      solution_ar: "قمنا بمعالجة الرطوبة كيميائياً بالكامل، وتوريد وتركيب أسقف جبس بورد معلقة مع بروفايل ليد مغناطيسي مدمج، وتطبيق أصباغ جوتن نصف اللامعة باللون العاجي.",
      solution_en: "Successfully applied deep chemical moisture barriers, installed suspended moisture-resistant gypsum sheets with integrated magnetic track LEDs, and double coated with solid Jotun Phenom in warm ivory.",
      result_ar: "مساحة واسعة مشرقة، توزيع إضاءة مريح ومبهر للعين، وجدران صحية مضمونة لسنوات طويلة.",
      result_en: "A grand, radiant living room with seamless uniform light dissemination, and humidity-proof walls guaranteed for years."
    },
    "g2": {
      challenge_ar: "مجلس قديم بأسقف متهالكة وجدران عادية تفتقر للطابع الفخم والترحيب الملائم لثقافة الضيافة.",
      challenge_en: "An outdated majlis with crumbling ceilings, flat dull walls, lacking any high-end character suitable for receiving honorable UAE guests.",
      solution_ar: "تكسير الأسقف القديمة بالكامل، تأسيس هيكل جبس بورد ملكي بإنارة ليد دافئة، تركيب براويز الفوم الأنيقة (بوادري)، وصباغة الحائط الرئيسي بستوكو إيطالي رمادي مذهب.",
      solution_en: "Demolished old plaster sheets, formulated a royal gypsum ceiling layout with warm accent stripes, attached polyurethane wall frames, and hand-textured the main accent wall with gold-infused Venetian stucco.",
      result_ar: "مجلس عربي فاخر يجمع بين الأصالة والحداثة، وتشطيب ذهبي معدني يعكس الفخامة.",
      result_en: "A majestic modern Arabic majlis merging cultural pride with modern styling, anchored by gold metallic reflective finishes."
    },
    "g3": {
      challenge_ar: "شقة سكنية مقسمة بشكل عشوائي بجدران قاطعة تقلل من تدفق الضوء والتهوية وباركيه أرضيات مخدوش.",
      challenge_en: "A segmented apartment with redundant block partition walls that blocked sunlight, choked wind ventilation, and scratched laminate flooring.",
      solution_ar: "هدم جدران الصالة غير الإنشائية لزيادة المدى البصري، تركيب باركيه خشب ألماني ثقيل، دهانات جدران ناصعة البياض، وتشطيب جدار التلفاز بديكور جبسي ناعم مدمج.",
      solution_en: "Cleared redundant partition structures to expand view parameters, laid heavy-duty German wood parquet flooring, applied pristine solid white coats, and executed a custom TV drywall media console.",
      result_ar: "صالة معيشة مفتوحة ومشرقة، إضاءة طبيعية دافئة، وأرضيات راقية ومقاومة للخدش.",
      result_en: "A beautiful open-concept living space flooded with natural light, boasting scratch-proof luxury wooden flooring."
    }
  };

  return (
    <div id="before-after-page-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans">
      
      {/* Header Banner */}
      <section className="relative py-16 px-4 text-center border-b border-amber-500/10 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-500/5 border border-amber-500/15">
            {language === 'ar' ? "قبل وبعد بالصور" : "The Magic of Transformation"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.before_after_title}
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            {t.before_after_subtitle}
          </p>
        </div>
      </section>

      {/* Comparisons showcase list */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">
        <div className="space-y-20">
          {beforeAfterProjects.map((project) => {
            const caseStudy = caseStudiesInfo[project.id];
            
            return (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-850 shadow-2xl relative"
              >
                
                {/* Image Comparison Screen (Span 6) */}
                <div className="lg:col-span-6 flex flex-col justify-center relative">
                  <BeforeAfterSlider
                    beforeImage={project.before_image_url!}
                    afterImage={project.after_image_url!}
                    beforeLabel={language === 'ar' ? "قبل العمل" : "BEFORE"}
                    afterLabel={language === 'ar' ? "بعد التسليم" : "AFTER"}
                    heightClass="h-[320px] sm:h-[420px]"
                  />
                  {/* Emirate Indicator Floating under slider */}
                  <div className="flex items-center justify-between mt-3 px-1">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      {language === 'ar' ? "اسحب الشريط للمقارنة" : "← Drag bar to compare →"}
                    </span>
                    <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 text-luxury-gold uppercase font-bold">
                      {project.emirate}
                    </span>
                  </div>
                </div>

                {/* Technical Case Study details (Span 6) */}
                <div className="lg:col-span-6 flex flex-col justify-between text-start space-y-6">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-widest block">
                      {project.service_type.replace('-', ' ')}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                      {language === 'ar' ? project.title_ar : project.title_en}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {language === 'ar' ? project.description_ar : project.description_en}
                    </p>

                    <div className="space-y-4 pt-4 border-t border-neutral-850">
                      {/* Challenge */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-red-400 font-bold uppercase font-mono">
                          <HelpCircle className="w-4 h-4" />
                          <span>{t.ba_challenge}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {language === 'ar' ? caseStudy?.challenge_ar : caseStudy?.challenge_en}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold uppercase font-mono">
                          <Wrench className="w-4 h-4" />
                          <span>{t.ba_solution}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {language === 'ar' ? caseStudy?.solution_ar : caseStudy?.solution_en}
                        </p>
                      </div>

                      {/* Result */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase font-mono">
                          <Trophy className="w-4 h-4" />
                          <span>{t.ba_result}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {language === 'ar' ? caseStudy?.result_ar : caseStudy?.result_en}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-850">
                    <Link
                      to="/request-quote"
                      className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 font-mono"
                    >
                      <span>{language === 'ar' ? "ابدأ مشروع تحول مساحتك الآن ←" : "Initiate your space transformation now →"}</span>
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
