// src/pages/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getLocalQuoteSubmissions } from '../data/mockData';
import {
  Sparkles,
  Layers,
  Users,
  CheckCircle2,
  Calendar,
  DollarSign,
  Briefcase,
  TrendingUp,
  MapPin,
  Trash2,
  Check,
  ClipboardList
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { language, t } = useApp();
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    // Sync with local quotes log
    const localData = getLocalQuoteSubmissions();
    setSubmissions(localData);
  }, []);

  const handleDeleteLead = (indexToDelete: number) => {
    try {
      const stored = localStorage.getItem('ahz_quote_submissions');
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.splice(indexToDelete, 1);
        localStorage.setItem('ahz_quote_submissions', JSON.stringify(parsed));
        setSubmissions(parsed);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [approvedIndices, setApprovedIndices] = useState<number[]>([]);
  const handleApproveLead = (index: number) => {
    setApprovedIndices((prev) => [...prev, index]);
  };

  return (
    <div id="admin-dashboard-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans text-start">
      
      {/* 1. Page Header */}
      <section className="relative py-12 px-4 border-b border-amber-500/10 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-500/5 border border-amber-500/20">
              {language === 'ar' ? "منصة تخطيط موارد المؤسسة - ERP" : "Enterprise ERP Console"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              {language === 'ar' ? "لوحة تحكم الإدارة" : "Administrator Hub"}
            </h1>
          </div>
          
          <div className="text-[10px] text-neutral-500 font-mono">
            {language === 'ar' ? "تحت إشراف م. وائل مدبولي" : "Under Supervison of Eng. Wael Madbouli"}
          </div>
        </div>
      </section>

      {/* 2. ERP Metrics Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Leads */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-850 shadow flex items-center justify-between">
            <div className="space-y-1 text-start">
              <span className="text-[10px] text-neutral-500 font-mono uppercase">Total Inquiries</span>
              <span className="text-2xl font-bold font-mono text-white block">
                {6 + submissions.length}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+15% This Month</span>
              </span>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Active Projects */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-850 shadow flex items-center justify-between">
            <div className="space-y-1 text-start">
              <span className="text-[10px] text-neutral-500 font-mono uppercase">Active Remodels</span>
              <span className="text-2xl font-bold font-mono text-white block">2</span>
              <span className="text-[10px] text-amber-500 font-mono">Jumeirah & Al Bateen</span>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Inspections */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-850 shadow flex items-center justify-between">
            <div className="space-y-1 text-start">
              <span className="text-[10px] text-neutral-500 font-mono uppercase">Booked Visits</span>
              <span className="text-2xl font-bold font-mono text-white block">
                {3 + submissions.length}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">Pending scheduling</span>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Revenue */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-850 shadow flex items-center justify-between">
            <div className="space-y-1 text-start">
              <span className="text-[10px] text-neutral-500 font-mono uppercase">Contracts Invoiced</span>
              <span className="text-2xl font-bold font-mono text-white block">184,000 AED</span>
              <span className="text-[10px] text-neutral-500 font-mono">Q2 Handover target</span>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Leads CRM Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-850 shadow-md space-y-4">
          <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-800 pb-2 flex items-center gap-1.5">
            <ClipboardList className="w-5 h-5 text-amber-500" />
            <span>{language === 'ar' ? "إدارة طلبات المعاينة الواردة" : "Lead Pipeline CRM"}</span>
          </h3>

          {submissions.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-500">
              {language === 'ar' ? "لا توجد طلبات واردة في لوحة التحكم حتى الآن." : "No live quote requests found in system storage."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-neutral-300 text-start border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 font-mono text-neutral-500 uppercase tracking-wider">
                    <th className="py-3 px-2 text-start">Request Ref</th>
                    <th className="py-3 px-2 text-start">Client</th>
                    <th className="py-3 px-2 text-start">Emirate / Location</th>
                    <th className="py-3 px-2 text-start">Service Required</th>
                    <th className="py-3 px-2 text-start">Preferred Visit</th>
                    <th className="py-3 px-2 text-start">Contact Method</th>
                    <th className="py-3 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, idx) => {
                    const isApproved = approvedIndices.includes(idx);
                    return (
                      <tr key={idx} className="border-b border-neutral-850/50 hover:bg-neutral-950/40 transition-colors">
                        <td className="py-4 px-2 font-mono font-bold text-amber-400">{sub.request_number}</td>
                        <td className="py-4 px-2">
                          <span className="font-bold text-white block">{sub.full_name}</span>
                          <span className="text-[10px] text-neutral-500 font-mono">{sub.phone}</span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="block">{sub.emirate}</span>
                          <span className="text-[10px] text-neutral-500">{sub.area}</span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="font-mono text-neutral-400 uppercase">{sub.service_type.replace('-', ' ')}</span>
                        </td>
                        <td className="py-4 px-2 font-mono">{sub.preferred_visit_date}</td>
                        <td className="py-4 px-2 font-mono text-neutral-400">{sub.preferred_contact_method}</td>
                        <td className="py-4 px-2 text-center">
                          {isApproved ? (
                            <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold font-mono text-[9px] uppercase tracking-wider">
                              Approved & Scheduled
                            </span>
                          ) : (
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleApproveLead(idx)}
                                className="p-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500 hover:text-neutral-950 border border-emerald-500/25 text-emerald-400 transition-colors cursor-pointer"
                                title="Approve Visit & Assign Supervisor"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(idx)}
                                className="p-1.5 rounded bg-red-500/10 hover:bg-red-500 hover:text-neutral-950 border border-red-500/25 text-red-400 transition-colors cursor-pointer"
                                title="Archive Request"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* 4. Active Project Milestones Kanban board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-850 shadow-md space-y-6">
          <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-800 pb-2 flex items-center gap-1.5">
            <ClipboardList className="w-5 h-5 text-amber-500" />
            <span>{language === 'ar' ? "لوحة التخطيط والجدولة - المشاريع الميدانية" : "Field Project Milestones Kanban"}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* Col 1 */}
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-850/80 space-y-3">
              <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-bold">
                Stage 1: Registered ({submissions.length})
              </span>
              <div className="space-y-2">
                {submissions.map((sub, i) => (
                  <div key={i} className="p-2.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] space-y-1 text-start">
                    <span className="font-bold text-amber-400 font-mono block">{sub.request_number}</span>
                    <span className="text-white block truncate">{sub.full_name}</span>
                    <span className="text-neutral-500 block truncate">{sub.service_type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 2 */}
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-850/80 space-y-3">
              <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-bold">
                Stage 2: Technical Visit (0)
              </span>
              <div className="p-4 rounded border border-dashed border-neutral-900 text-center text-[10px] text-neutral-600">
                Empty column
              </div>
            </div>

            {/* Col 3 */}
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-850/80 space-y-3">
              <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-bold">
                Stage 3: Agreement Contract (0)
              </span>
              <div className="p-4 rounded border border-dashed border-neutral-900 text-center text-[10px] text-neutral-600">
                Empty column
              </div>
            </div>

            {/* Col 4 */}
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-850/80 space-y-3">
              <span className="block text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                Stage 4: Active Works (1)
              </span>
              <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] space-y-1 text-start">
                <span className="font-bold text-amber-400 font-mono block">AHZ-2026-0001</span>
                <span className="text-white block font-semibold">Wael Madbouli</span>
                <span className="text-neutral-500 block">Jumeirah, Dubai</span>
                <span className="text-amber-500 block font-semibold text-[9px] mt-1">Supervising Gypsum Track LEDs</span>
              </div>
            </div>

            {/* Col 5 */}
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-850/80 space-y-3">
              <span className="block text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                Stage 5: QC & Handover (1)
              </span>
              <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] space-y-1 text-start">
                <span className="font-bold text-amber-400 font-mono block">AHZ-2026-0002</span>
                <span className="text-white block font-semibold">Abu Dhabi Majlis</span>
                <span className="text-neutral-500 block">Al Bateen, Abu Dhabi</span>
                <span className="text-emerald-400 block font-semibold text-[9px] mt-1">Double Jotun coat inspect</span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
