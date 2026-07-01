import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { useApp } from '../context/AppContext';
import { generateProjectSummaryPDF } from '../utils/pdfGenerator';
import { defaultMilestones } from '../services/projectService';
import { Download, FileText } from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';
  const [loading, setLoading] = useState(false);

  const projectData = {
    projectTitle: 'Luxury Majlis Decoration',
    customerName: 'AL HANA Client',
    projectType: 'Decoration Works',
    location: 'United Arab Emirates',
    progress: 35,
    estimateMin: 25000,
    estimateMax: 41000,
    milestones: defaultMilestones,
  };

  const downloadPdf = async () => {
    setLoading(true);
    try { await generateProjectSummaryPDF(projectData); } finally { setLoading(false); }
  };

  return (
    <>
      <SEOHead title={isAr ? 'بوابة العميل' : 'Customer Portal'} />
      <main className="min-h-screen bg-neutral-950 px-4 py-28 text-white sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <section className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-luxury-gold">{isAr ? 'بوابة العملاء' : 'Customer Portal'}</p>
              <h1 className="font-serif text-4xl font-bold md:text-6xl">{isAr ? 'لوحة تحكم العميل' : 'Your Project Dashboard'}</h1>
              <p className="mt-5 text-sm leading-7 text-neutral-400">{isAr ? 'تابع ملخص المشروع وقم بتحميل PDF احترافي.' : 'Review project summary and download a branded PDF.'}</p>
            </div>
            <button onClick={downloadPdf} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-luxury-gold px-6 py-3 font-black text-black">
              <Download className="h-5 w-5" /> {loading ? (isAr ? 'جاري التحميل...' : 'Preparing...') : (isAr ? 'تحميل PDF' : 'Download PDF')}
            </button>
          </div>

          <div id="customer-project-summary" className="rounded-3xl border border-luxury-gold/20 bg-black/60 p-6 shadow-2xl">
            <div className="mb-5 flex items-center gap-3"><FileText className="h-6 w-6 text-luxury-gold" /><h2 className="font-serif text-2xl font-bold text-luxury-gold">{projectData.projectTitle}</h2></div>
            <div className="grid gap-4 md:grid-cols-2">
              <Info label={isAr ? 'العميل' : 'Customer'} value={projectData.customerName} />
              <Info label={isAr ? 'نوع المشروع' : 'Project Type'} value={projectData.projectType} />
              <Info label={isAr ? 'الموقع' : 'Location'} value={projectData.location} />
              <Info label={isAr ? 'نسبة الإنجاز' : 'Progress'} value={`${projectData.progress}%`} />
              <Info label={isAr ? 'التقدير' : 'Estimate'} value={`${projectData.estimateMin} - ${projectData.estimateMax} AED`} />
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-neutral-900"><div className="h-full bg-luxury-gold" style={{ width: `${projectData.progress}%` }} /></div>
          </div>

          <div className="flex flex-wrap gap-3"><Link to="/request-quote" className="rounded-xl border border-luxury-gold/30 px-5 py-3 text-sm text-luxury-gold">{isAr ? 'اطلب عرض سعر' : 'Request Quote'}</Link><Link to="/track-project" className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white">{isAr ? 'تتبع المشروع' : 'Track Project'}</Link></div>
        </section>
      </main>
    </>
  );
};

const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => <div className="rounded-2xl border border-white/10 bg-neutral-950 p-4"><span className="text-xs text-neutral-500">{label}</span><b className="mt-1 block text-white">{value}</b></div>;
