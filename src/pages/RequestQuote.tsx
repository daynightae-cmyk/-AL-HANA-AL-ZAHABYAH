import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { useApp } from '../context/AppContext';
import { CostEstimator } from '../components/CostEstimator';
import { saveLocalQuoteSubmission } from '../data/mockData';

export const RequestQuotePage: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Decoration');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const record = saveLocalQuoteSubmission({
      full_name: fullName,
      phone,
      whatsapp: phone,
      email: '',
      emirate: '',
      area: '',
      property_type: '',
      service_type: service,
      project_size: '',
      budget_range: '',
      preferred_contact_method: 'phone',
      preferred_visit_date: '',
      project_description: message,
    });
    setSuccess(record.request_number);
  };

  return (
    <>
      <SEOHead title={isAr ? 'اطلب عرض سعر' : 'Request Quote'} description={isAr ? 'اطلب عرض سعر وتقدير تكلفة مبدئي لمشروع التصميم والديكور.' : 'Request a quote and initial cost estimate for design and decoration works.'} />
      <main className="min-h-screen bg-neutral-950 px-4 py-28 text-white sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <section className="mx-auto max-w-7xl space-y-10">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-luxury-gold">{isAr ? 'عرض سعر ومعاينة' : 'Quote & Estimate'}</p>
            <h1 className="font-serif text-4xl font-bold md:text-6xl">{isAr ? 'اطلب عرض سعر لمشروعك' : 'Request a Quote for Your Project'}</h1>
            <p className="mt-5 text-sm leading-7 text-neutral-400">{isAr ? 'احصل على تقدير تكلفة مبدئي ثم أرسل بياناتك لفريق الهنا الذهبية للمراجعة والمعاينة.' : 'Get an initial cost range, then send your details to the AL HANA AL ZAHABYAH team for review and inspection.'}</p>
          </div>

          <CostEstimator language={language} />

          <form onSubmit={submit} className="rounded-3xl border border-luxury-gold/20 bg-black/60 p-5 sm:p-8">
            <h2 className="mb-5 font-serif text-2xl font-bold text-luxury-gold">{isAr ? 'إرسال طلب للفريق' : 'Send Request to Team'}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <input id="quote_full_name" name="full_name" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder={isAr ? 'الاسم الكامل' : 'Full name'} className="rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white" />
              <input id="quote_phone" name="phone" required value={phone} onChange={e => setPhone(e.target.value)} placeholder={isAr ? 'رقم الهاتف' : 'Phone number'} className="rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white" />
              <select id="quote_service" name="service_type" value={service} onChange={e => setService(e.target.value)} className="rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white"><option>Interior Design</option><option>Decoration</option><option>Painting</option><option>Renovation</option><option>Full Villa Design</option><option>Majlis Design</option></select>
              <textarea id="quote_message" name="project_description" value={message} onChange={e => setMessage(e.target.value)} placeholder={isAr ? 'وصف مختصر للمشروع' : 'Brief project description'} className="min-h-[120px] rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white md:col-span-2" />
            </div>
            <button className="mt-5 rounded-xl bg-luxury-gold px-7 py-3 font-black text-black">{isAr ? 'إرسال الطلب' : 'Submit Request'}</button>
            {success && <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">{isAr ? 'تم تسجيل الطلب. رقم التتبع: ' : 'Request saved. Tracking number: '}<b>{success}</b></p>}
          </form>
        </section>
      </main>
    </>
  );
};
