// src/pages/CustomerDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getLocalQuoteSubmissions } from '../data/mockData';
import {
  User,
  Clock,
  CheckCircle2,
  Phone,
  FileText,
  MessageSquare,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { language, t } = useApp();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [supportNote, setSupportNote] = useState('');
  const [noteSent, setNoteSent] = useState(false);

  useEffect(() => {
    // Read local storage quote submissions
    const localData = getLocalQuoteSubmissions();
    setSubmissions(localData);
  }, []);

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportNote.trim()) return;

    setNoteSent(true);
    setSupportNote('');
    setTimeout(() => {
      setNoteSent(false);
    }, 3000);
  };

  return (
    <div id="customer-dashboard-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans text-start">
      
      {/* 1. Header Banner */}
      <section className="relative py-12 px-4 border-b border-amber-500/10 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-500/5 border border-amber-500/20">
              {language === 'ar' ? "بوابة العملاء الكرام" : "Exclusive Customer Hub"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === 'ar' ? "لوحة تحكم العميل" : "Your Property Dashboard"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400">
              {language === 'ar' ? "تتبع طلبات الأسعار والتقارير الفنية لمشروعك بالإمارات." : "Monitor your bespoke paint formulations, gypsum metrics, and inspection dates."}
            </p>
          </div>

          {/* Quick Stats bar */}
          <div className="flex items-center gap-4 bg-neutral-950 p-4 rounded-xl border border-neutral-850 font-mono text-xs text-start">
            <div>
              <span className="block text-neutral-500 uppercase">Quotes Submitted</span>
              <span className="text-lg font-bold text-amber-500">{submissions.length} Record(s)</span>
            </div>
            <span className="text-neutral-800 font-bold">|</span>
            <div>
              <span className="block text-neutral-500 uppercase">Active Projects</span>
              <span className="text-lg font-bold text-emerald-400">2 Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main content panels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Quotes and timelines list (Span 8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Active tracking cards quick link */}
            <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-850 shadow-md space-y-4">
              <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-800 pb-2">
                {language === 'ar' ? "مشاريعك النشطة وتتبع الحالة" : "Active Supervised Remodels"}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-start">
                {/* Mock Card 1 */}
                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-850 hover:border-amber-500/20 transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">AHZ-2026-0001</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 uppercase font-mono">Stage 4 / Active</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Villa Living Room Refurbish</h4>
                    <p className="text-[11px] text-neutral-500">Jumeirah 1, Dubai | Gypsum ceiling LEDs & paints</p>
                  </div>
                  <Link
                    to="/track-project?code=AHZ-2026-0001"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-500 hover:underline pt-2 border-t border-neutral-900 w-full"
                  >
                    <span>{language === 'ar' ? "شاهد الخطوات والتقارير الفنية" : "View Live Timeline steps"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Mock Card 2 */}
                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-850 hover:border-amber-500/20 transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">AHZ-2026-0002</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 uppercase font-mono">Stage 5 / Handover</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Classic Arabic Majlis Wall Paint</h4>
                    <p className="text-[11px] text-neutral-500">Al Bateen, Abu Dhabi | Jotun Stucco texture</p>
                  </div>
                  <Link
                    to="/track-project?code=AHZ-2026-0002"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-500 hover:underline pt-2 border-t border-neutral-900 w-full"
                  >
                    <span>{language === 'ar' ? "شاهد الخطوات والتقارير الفنية" : "View Live Timeline steps"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* List of custom submissions */}
            <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-850 shadow-md space-y-4">
              <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-800 pb-2">
                {language === 'ar' ? "تاريخ طلبات معاينة موقعك" : "Your Logged Quote Submissions"}
              </h3>

              {submissions.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500 space-y-2">
                  <FileText className="w-8 h-8 text-neutral-700 mx-auto" />
                  <p>{language === 'ar' ? "لم تقم بتقديم أي طلب أسعار حتى الآن." : "No personalized submissions detected in local cache."}</p>
                  <Link to="/request-quote" className="text-amber-500 font-bold hover:underline">
                    {language === 'ar' ? "اطلب معاينة وقياس جدران مجانية الآن" : "Create your first quote request"}
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((sub, idx) => (
                    <div
                      key={sub.request_number || idx}
                      className="p-4 rounded-lg bg-neutral-950 border border-neutral-850 text-xs text-neutral-300 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-amber-400 font-mono">
                            {sub.request_number}
                          </span>
                          <span className="text-[9px] text-neutral-500 font-mono">
                            ({sub.created_at})
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-amber-500/5 border border-amber-500/15 text-amber-400 font-bold text-[9px] uppercase tracking-wider font-mono">
                          Pending Schedule
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <span className="block text-[9px] text-neutral-500 uppercase font-mono">City / Location</span>
                          <span className="font-bold text-white mt-0.5 block">{sub.emirate} ({sub.area})</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-neutral-500 uppercase font-mono">Service Needed</span>
                          <span className="font-bold text-white mt-0.5 block truncate">{sub.service_type.replace('-', ' ').toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-neutral-500 uppercase font-mono">Size / Budget</span>
                          <span className="font-bold text-white mt-0.5 block truncate">{sub.project_size || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-neutral-500 uppercase font-mono">Visit Date</span>
                          <span className="font-bold text-white mt-0.5 block font-mono">{sub.preferred_visit_date}</span>
                        </div>
                      </div>

                      {sub.project_description && (
                        <div className="p-2.5 bg-neutral-900 rounded border border-neutral-850 text-[11px] text-neutral-400 italic">
                          " {sub.project_description} "
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Profile card and support chat message box (Span 4) */}
          <div className="lg:col-span-4 space-y-6 text-center">
            
            {/* Customer Profile card */}
            <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-850 shadow-md space-y-4 text-start">
              <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-800 pb-2">
                {language === 'ar' ? "الملف الشخصي للعميل" : "Your Account Details"}
              </h3>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-neutral-950 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {submissions[0]?.full_name || (language === 'ar' ? "ضيف الهنا الذهبية" : "Honorable Guest")}
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-mono block">
                    {submissions[0]?.email || "customer@alhanaalzahabyah.com"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                <div className="flex justify-between">
                  <span>{t.phone_label}</span>
                  <span className="font-mono text-white">{submissions[0]?.phone || "+971 50 000 0000"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact Method</span>
                  <span className="font-mono text-white">{submissions[0]?.preferred_contact_method || "WhatsApp"}</span>
                </div>
              </div>
            </div>

            {/* Engineer support leave notes */}
            <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-850 shadow-md space-y-4 text-start">
              <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-800 pb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4.5 h-4.5 text-amber-500" />
                <span>{language === 'ar' ? "ملاحظة سريعة للمهندس المشرف" : "Request Site Adjustments"}</span>
              </h3>

              {noteSent ? (
                <div className="p-4 rounded bg-emerald-500/5 border border-emerald-500/25 text-center text-emerald-400 text-xs">
                  {language === 'ar' ? "تم إرسال ملحوظتك للمشرف بنجاح." : "Notes logged and sent directly to Eng. Wael."}
                </div>
              ) : (
                <form onSubmit={handleSendNote} className="space-y-3">
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    {language === 'ar'
                      ? "هل تريد تغيير موعد المعاينة أو إبلاغ المشرف بنوع طلاء معين؟ اكتب ملحوظتك هنا."
                      : "Request date changes, paint finish preferences, or gypsum details."}
                  </p>
                  <textarea
                    rows={3}
                    value={supportNote}
                    onChange={(e) => setSupportNote(e.target.value)}
                    placeholder={language === 'ar' ? "مثال: يرجى إحضار كتالوج جوتن لزيارة السبت..." : "e.g. Please bring Jotun velvet samples..."}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-2.5 text-xs focus:outline-none resize-none"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-2 rounded bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold transition-all"
                  >
                    {language === 'ar' ? "إرسال للمشرف" : "Deliver Notes"}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
