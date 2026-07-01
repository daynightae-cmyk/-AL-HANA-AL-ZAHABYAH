// src/pages/Terms.tsx
import React from 'react';
import { useApp } from '../context/AppContext';

export const TermsPage: React.FC = () => {
  const { language, t } = useApp();

  return (
    <div id="terms-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans text-start">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-400 border-b border-neutral-900 pb-3">
          {t.terms_title}
        </h1>

        <div className="space-y-6 text-sm text-neutral-400 leading-relaxed">
          {language === 'ar' ? (
            <>
              <p>مرحباً بك في موقع <strong>شركة الهنا الذهبية للتصميم وأعمال الديكور</strong>. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بالشروط والأحكام التالية:</p>

              <div className="space-y-2">
                <h3 className="font-bold text-white">1. دقة الأسعار والمقايسات</h3>
                <p>تعتبر جميع الأسعار التوجيهية المذكورة في باقات الخدمات هي تقديرات أولية. السعر النهائي والملزم يتم اعتماده فقط بموجب عقد رسمي مكتوب وموقع من المهندس المسؤول بعد زيارة ومعاينة موقع العقار في دبي أو بقية الإمارات.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white">2. المواد المستخدمة</h3>
                <p>تضمن الشركة استخدام دهانات وأصباغ أصلية بالكامل (مثل جوتن أو علامات معتمدة ومكافئة) حسب بنود اتفاقية المشروع المكتوبة.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white">3. الالتزام بجداول التسليم</h3>
                <p>تبذل طواقمنا الهندسية أقصى الجهود لتسليم الفلل والمجالس في الأيام المذكورة، مع مراعاة أي تعديلات أو إضافات يطلبها العميل أثناء سير العمل الميداني.</p>
              </div>
            </>
          ) : (
            <>
              <p>Welcome to <strong>AL HANA AL ZAHABYAH Design & Decoration Works</strong> website. By interacting here, you accept our standard terms of use:</p>

              <div className="space-y-2">
                <h3 className="font-bold text-white">1. Guideline Estimates Limits</h3>
                <p>All package starting prices represent structural guidelines. Definitive, binding prices are confirmed exclusively under written contracts signed after on-site visits and measurement protocols are executed across Dubai and other Emirates.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white">2. Genuine Products Guarantee</h3>
                <p>We guarantee utilizing authentic, genuine painting formulations (e.g., premium Jotun) and moisture-resistant gypsum framing as detailed in our contract documents.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white">3. Project Handover timelines</h3>
                <p>Our crews commit to scheduled milestones, subject only to variations requested by property owners during operational schedules.</p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
