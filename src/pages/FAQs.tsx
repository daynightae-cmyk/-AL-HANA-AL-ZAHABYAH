// src/pages/FAQs.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockFAQs } from '../data/mockData';
import { HelpCircle, ChevronDown, Search, ArrowRight, MessageSquareCode } from 'lucide-react';

export const FAQsPage: React.FC = () => {
  const { language, t } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter based on search criteria
  const filteredFaqs = mockFAQs.filter((faq) => {
    const query = searchQuery.toLowerCase();
    const qText = (language === 'ar' ? faq.question_ar : faq.question_en).toLowerCase();
    const aText = (language === 'ar' ? faq.answer_ar : faq.answer_en).toLowerCase();
    return qText.includes(query) || aText.includes(query);
  });

  return (
    <div id="faqs-page-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      
      {/* Header section */}
      <section className="relative py-12 px-4 text-center border-b border-amber-500/10 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-500/5 border border-amber-500/15">
            {language === 'ar' ? "الأسئلة المتكررة" : "Knowledge Base"}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            {t.nav_faqs}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            {language === 'ar' ? "إجابات شفافة حول الضمان، المواد، المواعيد، وتكاليف الدهانات والديكور في الإمارات." : "Clear engineering responses regarding warranties, materials, and payment stages."}
          </p>
        </div>
      </section>

      {/* Main accordion list */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        
        {/* Search Input Bar */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? "ابحث عن سؤال معين (مثال: ضمان، رطوبة، دفع)..." : "Search FAQs (e.g. Jotun, warranty, payment)..."}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg py-3 pl-11 pr-4 text-sm focus:outline-none placeholder:text-neutral-600"
          />
        </div>

        {/* FAQs List */}
        {filteredFaqs.length === 0 ? (
          <div className="p-8 rounded-xl bg-neutral-900 border border-neutral-850 text-center max-w-md mx-auto">
            <HelpCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            <span className="text-sm font-bold text-neutral-400 block mb-1">
              {language === 'ar' ? "لا توجد نتائج بحث" : "No results found"}
            </span>
            <p className="text-xs text-neutral-500">
              {language === 'ar' ? "يرجى المحاولة بكلمة بحث بديلة، أو تواصل معنا عبر الواتساب مباشرة." : "Try adjusting your query, or contact our team on WhatsApp directly."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-neutral-900 border border-neutral-850 overflow-hidden shadow-sm hover:border-amber-500/15 transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-start font-bold text-white text-sm sm:text-base hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <span>{language === 'ar' ? faq.question_ar : faq.question_en}</span>
                    <ChevronDown className={`w-5 h-5 text-amber-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-neutral-400 border-t border-neutral-850 leading-relaxed text-start space-y-2">
                      <p>{language === 'ar' ? faq.answer_ar : faq.answer_en}</p>
                      {faq.category && (
                        <span className="inline-block text-[9px] font-mono text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                          Tag: {faq.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* CTA helper strip */}
      <section className="py-12 bg-neutral-900 border-t border-neutral-900 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-3">
          <h3 className="text-sm font-bold text-white">
            {language === 'ar' ? "لديك سؤال هندسي مخصص لمشروعك؟" : "Have a Custom Structural Question?"}
          </h3>
          <p className="text-xs text-neutral-400">
            {language === 'ar'
              ? "مستشارونا الهندسيون متواجدون للرد وحساب الكميات مجاناً عبر القنوات الرسمية."
              : "Ask us directly on WhatsApp or book an on-site visit for an exact bill of quantities."}
          </p>
          <div className="pt-2 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/request-quote"
              className="px-5 py-2.5 rounded bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 text-xs font-bold"
            >
              {t.btn_request_quote}
            </Link>
            <a
              href="https://wa.me/971500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-xs font-bold flex items-center gap-1.5"
            >
              <MessageSquareCode className="w-4 h-4 text-emerald-400" />
              <span>{t.btn_chat_whatsapp}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
