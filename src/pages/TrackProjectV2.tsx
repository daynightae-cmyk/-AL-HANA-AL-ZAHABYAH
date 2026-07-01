import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { useApp } from '../context/AppContext';
import { ProjectTimeline } from '../components/ProjectTimeline';
import { CustomerProject, lookupProject } from '../services/projectService';

export const TrackProjectPage: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';
  const [query, setQuery] = useState('');
  const [project, setProject] = useState<CustomerProject | null>(null);
  const [searched, setSearched] = useState(false);

  const runSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setProject(await lookupProject(query));
  };

  return (
    <>
      <SEOHead title={isAr ? 'تتبع المشروع' : 'Track Project'} />
      <main className="min-h-screen bg-neutral-950 px-4 py-28 text-white sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        <section className="mx-auto max-w-7xl space-y-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-luxury-gold">{isAr ? 'متابعة تنفيذ' : 'Project Tracking'}</p>
            <h1 className="font-serif text-4xl font-bold md:text-6xl">{isAr ? 'تتبع مراحل مشروعك' : 'Track Your Project Lifecycle'}</h1>
            <p className="mt-5 text-sm leading-7 text-neutral-400">{isAr ? 'ابحث برقم المشروع أو رقم التواصل.' : 'Search by project ID or contact number.'}</p>
          </div>
          <form onSubmit={runSearch} className="flex max-w-3xl flex-col gap-3 rounded-3xl border border-white/10 bg-black/60 p-4 sm:flex-row">
            <input id="project_lookup" name="project_lookup" value={query} onChange={e => setQuery(e.target.value)} placeholder={isAr ? 'رقم المشروع أو رقم التواصل' : 'Project ID or contact number'} className="flex-1 rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-luxury-gold" />
            <button className="rounded-2xl bg-luxury-gold px-6 py-3 font-black text-black">{isAr ? 'بحث' : 'Search'}</button>
          </form>
          {searched && !project && <div className="rounded-3xl border border-white/10 bg-black/50 p-8 text-neutral-300">{isAr ? 'لا يوجد مشروع مطابق حالياً.' : 'No matching project found.'}</div>}
          <ProjectTimeline project={project} language={language} />
        </section>
      </main>
    </>
  );
};
