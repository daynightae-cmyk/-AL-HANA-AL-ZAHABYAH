// src/pages/TrackProject.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getProjectByCode } from '../data/mockData';
import {
  Search,
  CheckCircle2,
  Circle,
  Clock,
  User,
  Phone,
  MessageSquare,
  Sparkles,
  MapPin,
  Calendar,
  AlertTriangle,
  UserCheck,
  AlertCircle
} from 'lucide-react';

export const TrackProjectPage: React.FC = () => {
  const { language, t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [inputCode, setInputCode] = useState('');
  const [project, setProject] = useState<any | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Read code parameter from URL query
  const codeParam = searchParams.get('code');

  useEffect(() => {
    if (codeParam) {
      setInputCode(codeParam);
      const found = getProjectByCode(codeParam);
      setProject(found || null);
      setSearchAttempted(true);
    }
  }, [codeParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    setSearchParams({ code: inputCode.trim().toUpperCase() });
  };

  // Predefined stages text mapping
  const stages = [
    {
      num: 1,
      title_ar: "تم استلام الطلب وتسجيله",
      title_en: "Request Registered",
      desc_ar: "تم استلام المقاسات وتعيين المهندس المشرف.",
      desc_en: "Received measurements and assigned our supervisor."
    },
    {
      num: 2,
      title_ar: "المعاينة الفنية والمقايسة",
      title_en: "Technical Site Visit",
      desc_ar: "زيارة الموقع، فحص الرطوبة، واختيار كتالوج الألوان.",
      desc_en: "Humidity assessment and Jotun catalog choices on-site."
    },
    {
      num: 3,
      title_ar: "توقيع العقد وتوريد الخامات",
      title_en: "Contract & Material Delivery",
      desc_ar: "توقيع العقد الرسمي وتوريد معجون وعلب أصباغ جوتن الأصلية.",
      desc_en: "Agreement signed, delivering genuine Jotun materials to site."
    },
    {
      num: 4,
      title_ar: "تنفيذ أعمال الدهان والديكور",
      title_en: "Active Site Execution",
      desc_ar: "تأسيس المعجون، تركيب الجبس بورد، الدهانات الديكورية الأساسية.",
      desc_en: "Double plaster coat, gypsum ceilings framing, solid paint application."
    },
    {
      num: 5,
      title_ar: "التنظيف النهائي وفحص الجودة",
      title_en: "QC & Handover Audit",
      desc_ar: "التنظيف النهائي للأرضيات، فحص استواء الجدران بالليزر، وتسليم المفاتيح.",
      desc_en: "Final polish, laser inspection, and keys handover to owner."
    }
  ];

  return (
    <div id="track-project-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      
      {/* Page Header */}
      <section className="relative py-12 px-4 text-center border-b border-amber-500/10 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-500/5 border border-amber-500/15">
            {language === 'ar' ? "تتبع المشاريع في دبي والإمارات" : "Live Construction Timeline"}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            {t.track_title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            {t.track_subtitle}
          </p>
        </div>
      </section>

      {/* Search Console and Tracking Display */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        
        {/* Search Field Box */}
        <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-850 shadow-md max-w-2xl mx-auto mb-10 text-center">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder={language === 'ar' ? "أدخل رمز التتبع (مثال: AHZ-2026-0001)" : "Enter tracking code (e.g., AHZ-2026-0001)"}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded-lg py-3 pl-10 pr-4 text-sm font-mono focus:outline-none placeholder:text-neutral-600 uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-extrabold uppercase font-mono tracking-wider cursor-pointer"
            >
              {language === 'ar' ? "تتبع الحالة" : "Track Status"}
            </button>
          </form>

          {/* Quick links to demo codes for user ease */}
          <div className="mt-4 pt-4 border-t border-neutral-850 flex items-center justify-center gap-3 flex-wrap text-xs text-neutral-500">
            <span>{language === 'ar' ? "رموز تجريبية جاهزة:" : "Demo codes for quick evaluation:"}</span>
            <button
              onClick={() => { setInputCode('AHZ-2026-0001'); setSearchParams({ code: 'AHZ-2026-0001' }); }}
              className="px-2 py-1 rounded bg-neutral-950 text-amber-500 hover:text-amber-400 border border-neutral-800 font-mono text-[10px]"
            >
              AHZ-2026-0001
            </button>
            <button
              onClick={() => { setInputCode('AHZ-2026-0002'); setSearchParams({ code: 'AHZ-2026-0002' }); }}
              className="px-2 py-1 rounded bg-neutral-950 text-amber-500 hover:text-amber-400 border border-neutral-800 font-mono text-[10px]"
            >
              AHZ-2026-0002
            </button>
          </div>
        </div>

        {/* Display results */}
        {searchAttempted && (
          project ? (
            /* PROJECT FOUND */
            <div className="space-y-8 animate-fade-in text-start">
              
              {/* 1. Project Info Header Panel */}
              <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-850 shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-500">Project Reference</span>
                  <span className="text-xl font-mono font-extrabold text-amber-400 block mt-1">{project.code}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-mono inline-block mt-2 font-bold uppercase tracking-wide">
                    {project.status === 'Active' ? (language === 'ar' ? "نشط - قيد العمل" : "Active Execution") : (language === 'ar' ? "مكتمل ومسلم" : "Completed")}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-500">Property Details</span>
                  <span className="text-sm font-bold text-white block mt-1">{project.client_name}</span>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{project.emirate} - {project.area}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-500">Required Service</span>
                  <span className="text-sm font-bold text-amber-500 block mt-1">
                    {project.service_type.replace('-', ' ').toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{language === 'ar' ? "تاريخ البدء:" : "Started:"} {project.start_date || 'June 2026'}</span>
                  </div>
                </div>
              </div>

              {/* 2. Timeline Grid */}
              <div className="p-6 sm:p-8 rounded-xl bg-neutral-900 border border-neutral-850 shadow-md space-y-8">
                <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-800 pb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span>{language === 'ar' ? "الجدول الزمني ومراحل الإنجاز" : "Milestones Progress Indicator"}</span>
                </h3>

                <div className="space-y-6 relative before:absolute before:top-2 before:bottom-2 before:left-[15px] rtl:before:left-auto rtl:before:right-[15px] before:w-0.5 before:bg-neutral-800">
                  {stages.map((stg) => {
                    const isCompleted = project.current_stage_num > stg.num;
                    const isActive = project.current_stage_num === stg.num;
                    const isPending = project.current_stage_num < stg.num;

                    return (
                      <div key={stg.num} className="flex items-start gap-4 relative pl-8 rtl:pl-0 rtl:pr-8">
                        {/* Bullet indicators */}
                        <div className="absolute left-0 rtl:left-auto rtl:right-0 top-1 z-10 flex items-center justify-center">
                          {isCompleted && (
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center font-bold text-xs">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            </div>
                          )}
                          {isActive && (
                            <div className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-extrabold text-xs animate-pulse">
                              {stg.num}
                            </div>
                          )}
                          {isPending && (
                            <div className="w-8 h-8 rounded-full bg-neutral-950 border-2 border-neutral-850 text-neutral-600 flex items-center justify-center font-bold text-xs">
                              {stg.num}
                            </div>
                          )}
                        </div>

                        {/* Content text */}
                        <div className={`p-4 rounded-lg flex-1 border ${
                          isActive
                            ? 'bg-amber-500/5 border-amber-500/20'
                            : isCompleted
                            ? 'bg-neutral-900/60 border-neutral-850'
                            : 'bg-neutral-950/30 border-neutral-950/30'
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className={`text-sm font-bold ${isActive ? 'text-amber-400' : isCompleted ? 'text-white' : 'text-neutral-500'}`}>
                              {language === 'ar' ? stg.title_ar : stg.title_en}
                            </span>
                            {isActive && (
                              <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono font-bold uppercase tracking-wide inline-block max-w-[100px] text-center">
                                {language === 'ar' ? "جاري العمل" : "In Progress"}
                              </span>
                            )}
                          </div>
                          <p className={`text-xs mt-1.5 leading-relaxed ${isActive ? 'text-neutral-300' : isCompleted ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            {language === 'ar' ? stg.desc_ar : stg.desc_en}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Supervisor & remarks Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Engineer Card (Span 5) */}
                <div className="md:col-span-5 p-6 rounded-xl bg-neutral-900 border border-neutral-850 flex flex-col justify-between space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-neutral-950 border border-amber-500/25 flex items-center justify-center text-amber-400">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div className="text-start">
                      <span className="text-[10px] uppercase font-mono text-neutral-500">Assigned Engineer</span>
                      <h4 className="text-sm font-bold text-white block mt-0.5">
                        {project.supervisor_name}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-neutral-800">
                    <a
                      href="tel:+971500000000"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500/25 text-xs text-neutral-300 font-bold transition-all font-mono"
                    >
                      <Phone className="w-4 h-4 text-amber-500" />
                      <span>{t.phone_label}: +971 50 000 0000</span>
                    </a>
                    
                    <a
                      href="https://wa.me/971500000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 text-xs font-bold transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>{t.btn_chat_whatsapp}</span>
                    </a>
                  </div>
                </div>

                {/* Technical Remarks (Span 7) */}
                <div className="md:col-span-7 p-6 rounded-xl bg-neutral-900 border border-neutral-850 text-start space-y-3">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 block">Latest Supervisor Remarks</span>
                  
                  <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-lg">
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans italic">
                      " {language === 'ar' ? project.latest_remark_ar : project.latest_remark_en} "
                    </p>
                  </div>

                  <div className="text-[10px] text-neutral-500 font-mono text-end pt-2">
                    {language === 'ar' ? "تاريخ آخر تحديث:" : "Last updated:"} {project.last_update_date || "26 June 2026"}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* PROJECT NOT FOUND */
            <div
              id="project-not-found-banner"
              className="p-8 sm:p-12 rounded-xl bg-neutral-900 border border-neutral-850 shadow-md text-center space-y-4 max-w-xl mx-auto"
            >
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-white">
                {language === 'ar' ? "رمز تتبع غير صحيح" : "Invalid Tracking Code"}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {language === 'ar'
                  ? "عذراً، لم نتمكن من العثور على أي مشروع مرتبط بالرمز المدخل. يرجى مراجعة الرمز والتأكد من تطابقه (مثال: AHZ-2026-0001)."
                  : "We could not map the specified reference to any active decoration log. Make sure capitalization and dashes match (e.g., AHZ-2026-0001)."}
              </p>
            </div>
          )
        )}

      </section>

    </div>
  );
};
