import React, { useState } from 'react';
import { Calculator, Loader2 } from 'lucide-react';
import { calculateEstimate, saveQuoteEstimate, EstimateResult } from '../services/estimateService';

const services = ['Interior Design', 'Decoration', 'Painting', 'Renovation', 'Full Villa Design', 'Majlis Design', 'Fit-out / Execution'];
const projects = ['Apartment', 'Villa', 'Majlis', 'Office', 'Restaurant', 'Salon', 'Shop'];
const levels = ['Standard', 'Premium', 'Luxury', 'Royal'];

export const CostEstimator: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const isAr = language === 'ar';
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('450');
  const [service, setService] = useState('Decoration');
  const [project, setProject] = useState('Villa');
  const [level, setLevel] = useState('Premium');
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const runEstimate = async () => {
    setError('');
    setSaving(true);
    try {
      const estimate = calculateEstimate({ customer_name: customer, phone, area_sqft: Number(area), service_type: service, project_type: project, finish_level: level });
      setResult(estimate);
      await saveQuoteEstimate(estimate);
    } catch {
      setError(isAr ? 'يرجى إدخال مساحة صحيحة أكبر من صفر.' : 'Please enter a valid area greater than zero.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-3xl border border-luxury-gold/20 bg-neutral-950 p-5 sm:p-7 shadow-2xl" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-full bg-luxury-gold p-2 text-black"><Calculator className="h-5 w-5" /></div>
        <div><h2 className="font-serif text-2xl font-bold text-white">{isAr ? 'حاسبة تقدير التكلفة' : 'Quick Cost Estimator'}</h2><p className="text-xs text-neutral-400">{isAr ? 'تقدير مبدئي واحد بدون تكرار واجهات.' : 'One clean initial estimate widget.'}</p></div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <input id="estimate_customer" name="customer_name" value={customer} onChange={e => setCustomer(e.target.value)} placeholder={isAr ? 'اسم العميل' : 'Customer name'} className="rounded-xl border border-white/10 bg-black px-3 py-3 text-sm text-white" />
        <input id="estimate_phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder={isAr ? 'رقم الهاتف' : 'Phone'} className="rounded-xl border border-white/10 bg-black px-3 py-3 text-sm text-white" />
        <input id="estimate_area" name="area_sqft" value={area} onChange={e => setArea(e.target.value)} placeholder="Area sqft" className="rounded-xl border border-white/10 bg-black px-3 py-3 text-sm text-white" />
        <select id="estimate_service" name="service_type" value={service} onChange={e => setService(e.target.value)} className="rounded-xl border border-white/10 bg-black px-3 py-3 text-sm text-white">{services.map(x => <option key={x}>{x}</option>)}</select>
        <select id="estimate_project" name="project_type" value={project} onChange={e => setProject(e.target.value)} className="rounded-xl border border-white/10 bg-black px-3 py-3 text-sm text-white">{projects.map(x => <option key={x}>{x}</option>)}</select>
        <select id="estimate_finish" name="finish_level" value={level} onChange={e => setLevel(e.target.value)} className="rounded-xl border border-white/10 bg-black px-3 py-3 text-sm text-white">{levels.map(x => <option key={x}>{x}</option>)}</select>
        <button type="button" onClick={runEstimate} className="rounded-xl bg-luxury-gold px-5 py-3 font-black text-black lg:col-span-2">{saving ? <Loader2 className="h-5 w-5 animate-spin" /> : isAr ? 'احسب التقدير' : 'Calculate Estimate'}</button>
      </div>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      {result && <div className="mt-6 rounded-2xl border border-luxury-gold/30 bg-black/60 p-5"><p className="text-sm text-neutral-400">{isAr ? 'النطاق المبدئي' : 'Initial range'}</p><h3 className="mt-1 text-3xl font-black text-luxury-gold">{result.estimated_min.toLocaleString()} – {result.estimated_max.toLocaleString()} AED</h3><p className="mt-3 text-xs leading-relaxed text-neutral-300">This is an initial estimate only. Final pricing depends on site visit, material selection, drawings, project scope, and approval.</p></div>}
    </section>
  );
};

export default CostEstimator;
