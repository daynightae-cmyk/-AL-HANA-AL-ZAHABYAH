// src/pages/PrivacyPolicy.tsx
import React from 'react';
import { useApp } from '../context/AppContext';

export const PrivacyPolicyPage: React.FC = () => {
  const { language, t } = useApp();

  return (
    <div id="privacy-policy-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans text-start">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-400 border-b border-neutral-900 pb-3">
          {t.privacy_policy_title}
        </h1>

        <div className="space-y-6 text-sm text-neutral-400 leading-relaxed">
          {language === 'ar' ? (
            <>
              <p>نحن في <strong>شركة الهنا الذهبية للتصميم وأعمال الديكور</strong> نولي أهمية قصوى لخصوصية بيانات عملائنا في الإمارات وخارجها.</p>
              
              <div className="space-y-2">
                <h3 className="font-bold text-white">1. جمع البيانات الشخصية</h3>
                <p>نقوم بجمع البيانات التي تزودنا بها بمحض إرادتك عبر نماذج طلبات المعاينة وتقدير الأسعار، بما في ذلك الاسم، ورقم الهاتف، والبريد الإلكتروني، وتفاصيل العقار.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white">2. استخدام البيانات</h3>
                <p>تُستخدم بياناتك لجدولة الزيارات الميدانية، والاتصال بك عبر واتساب، وتقديم مقترحات التصميم والدهانات الفاخرة.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white">3. حماية البيانات والأمن</h3>
                <p>نلتزم بحفظ كافة التفاصيل الهندسية والملفات المرفوعة لبيتك في بيئة سحابية مشفرة وآمنة، ولا نبيع أو نشارك بياناتك مع أي طرف ثالث تجاري على الإطلاق.</p>
              </div>
            </>
          ) : (
            <>
              <p>At <strong>AL HANA AL ZAHABYAH Design & Decoration Works</strong>, we hold client data confidentiality in the highest regard.</p>

              <div className="space-y-2">
                <h3 className="font-bold text-white">1. Information We Collect</h3>
                <p>We process coordinates willingly provided via our baseline quotation estimators, including phone records, WhatsApp IDs, and property metrics.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white">2. Application of Collected Logs</h3>
                <p>Your details operate exclusively to schedule on-site visits, compile structural price metrics, and communicate during painting processes.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white">3. Data Integrity & Security</h3>
                <p>All physical property files are saved in secure environments and never shared with unauthorized secondary commercial channels.</p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
