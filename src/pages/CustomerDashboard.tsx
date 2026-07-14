// src/pages/CustomerDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getLocalQuoteSubmissions } from '../data/mockData';
import { SEOHead } from '../components/common/SEOHead';
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
  ArrowUpRight,
  MessageCircle,
  Search,
  Activity,
  Compass,
  FileCheck,
  FolderOpen,
  Printer,
  Download,
  X
} from 'lucide-react';

interface InvoiceItem {
  name: string;
  nameAr: string;
  qty: string;
  price: number;
}

interface Invoice {
  id: string;
  projectCode: string;
  title: string;
  titleAr: string;
  clientName: string;
  clientNameAr: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  vat: number;
  total: number;
  status: 'paid' | 'pending';
}

const mockInvoices: Invoice[] = [
  {
    id: "ALH-2026-8801",
    projectCode: "AHZ-2026-0001",
    title: "Villa Living Room Refurbish - Jumeirah",
    titleAr: "تشطيب جدران فيلا جميرا - دبي",
    clientName: "Ahmed Al Maktoum",
    clientNameAr: "أحمد المكتوم",
    date: "2026-07-10",
    dueDate: "2026-07-25",
    items: [
      { name: "Premium Jotun Fenomastic (Silk finish)", nameAr: "دهانات جوتن فينوماستيك حريرية فاخرة", qty: "1,200 sq ft", price: 5400 },
      { name: "Knauf Luxury Gypsum Suspended Ceiling", nameAr: "أسقف جبس كناوف فاخرة معلقة بالإنارة", qty: "1 Job", price: 4800 },
      { name: "Dual-Directional Ambient LED Profile Track Lights", nameAr: "مسارات إنارة ليد مغناطيسية مخفية", qty: "6 Units", price: 3200 },
      { name: "Field Architect Supervision Fees (Stage 4)", nameAr: "رسوم الإشراف الهندسي المباشر للمرحلة الرابعة", qty: "1 Phase", price: 2500 }
    ],
    subtotal: 15900,
    vat: 795, // 5% UAE VAT
    total: 16695,
    status: 'paid'
  },
  {
    id: "ALH-2026-8802",
    projectCode: "AHZ-2026-0002",
    title: "Classic Arabic Majlis Decor - Al Bateen",
    titleAr: "مجلس كلاسيكي معتق - البطين أبوظبي",
    clientName: "Ahmed Al Maktoum",
    clientNameAr: "أحمد المكتوم",
    date: "2026-07-02",
    dueDate: "2026-07-15",
    items: [
      { name: "Jotun Lady Design Stucco (Velvet Texture Plaster)", nameAr: "معجون جوتن ستوكو ليدي ديزاين مخملي", qty: "2,200 sq ft", price: 11800 },
      { name: "Intricate Symmetrical Islamic Geometric Gesso Ceiling", nameAr: "نقوش وأسقف جبسية مغربية كلاسيكية متوازنة", qty: "1 Job", price: 9500 },
      { name: "Custom Hand-Painted Gold-Leaf Architectural Moldings", nameAr: "إطارات وبانوهات كلاسيكية مطلية بماء الذهب", qty: "1 Job", price: 7800 }
    ],
    subtotal: 29100,
    vat: 1455,
    total: 30555,
    status: 'paid'
  }
];

export const CustomerDashboardPage: React.FC = () => {
  const { language, theme, t } = useApp();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [supportNote, setSupportNote] = useState('');
  const [noteSent, setNoteSent] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
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

  const isLight = theme === 'light';

  return (
    <>
      <SEOHead
        title={language === 'ar' ? "لوحة تحكم بوابة العميل" : "Customer Portal Dashboard"}
        description={language === 'ar' ? "تتبع عقودك، والتقارير الهندسية، وفريق العمل المكلف بمشروعك لدى الهنا الذهبية." : "Track your bespoke paint formulations, site inspection schedules, and live progress metrics."}
      />
      <div 
        id="customer-dashboard-container" 
        className={`pt-28 pb-20 min-h-screen font-sans transition-colors duration-300 text-start ${
          isLight ? 'bg-[#F8F5ED] text-neutral-900' : 'bg-neutral-950 text-white'
        }`}
      >
        
        {/* 1. Header Banner */}
        <section className={`relative py-12 px-4 border-b transition-colors ${
          isLight 
            ? 'bg-[#EFECE6]/50 border-luxury-gold/30' 
            : 'bg-gradient-to-b from-neutral-950 to-neutral-900 border-white/5'
        }`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-luxury-gold/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-start">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 border rounded ${
                isLight 
                  ? 'text-luxury-gold-dark border-luxury-gold/40 bg-white' 
                  : 'text-luxury-gold border-luxury-gold/25 bg-luxury-gold/5'
              }`}>
                {language === 'ar' ? "بوابة العملاء الكرام" : "Exclusive Customer Hub"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                {language === 'ar' ? "لوحة تحكم العميل" : "Your Property Dashboard"}
              </h1>
              <p className={`text-xs sm:text-sm ${isLight ? 'text-neutral-600' : 'text-luxury-muted'}`}>
                {language === 'ar' 
                  ? "تتبع طلبات الأسعار والتقارير الفنية لمشروعك بجميع مدن دولة الإمارات." 
                  : "Monitor your bespoke paint formulations, gypsum metrics, and inspection dates across the UAE."}
              </p>
            </div>

            {/* Quick Stats bar */}
            <div className={`flex items-center gap-5 p-4 border font-mono text-xs ${
              isLight ? 'bg-white border-black/10' : 'bg-neutral-900 border-white/5'
            }`}>
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase">Quotes</span>
                <span className="text-base font-bold text-luxury-gold-dark">{submissions.length} submitted</span>
              </div>
              <span className="text-neutral-300 font-bold">|</span>
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase">Active Projects</span>
                <span className="text-base font-bold text-emerald-500">2 Supervising</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Main content panels */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Quotes and timelines list (Span 8) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Active tracking cards */}
              <div className={`p-6 border ${isLight ? 'bg-white border-black/10' : 'bg-neutral-900 border-white/5'}`}>
                <div className="flex items-center justify-between border-b pb-3 mb-4 text-start">
                  <h3 className="text-sm font-serif font-bold text-luxury-gold-dark uppercase tracking-wider">
                    {language === 'ar' ? "مشاريعك النشطة وتتبع الحالة" : "Active Supervised Remodels"}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-mono">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    <span>{language === 'ar' ? "مباشر من موقع العمل" : "Live Supervision"}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-start">
                  {/* Mock Card 1 */}
                  <div className={`p-4 border transition-all space-y-3 ${
                    isLight ? 'bg-[#F8F5ED] border-black/5 hover:border-luxury-gold' : 'bg-neutral-950 border-white/5 hover:border-luxury-gold/50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-luxury-gold-dark">AHZ-2026-0001</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-luxury-gold/10 text-luxury-gold-dark uppercase font-mono">Stage 4 / Paint</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold">{language === 'ar' ? "تشطيب جدران فيلا جميرا" : "Villa Living Room Refurbish"}</h4>
                      <p className="text-[11px] text-neutral-500">Jumeirah 1, Dubai | Gypsum ceiling LEDs & Jotun silk</p>
                    </div>
                    
                    <div className="pt-2 border-t border-black/5 flex items-center justify-between gap-2">
                      <Link
                        to="/track-project?code=AHZ-2026-0001"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-luxury-gold-dark hover:underline"
                      >
                        <span>{language === 'ar' ? "تتبع الخطوات" : "Track Steps"}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                      
                      <a
                        href="https://wa.me/971555587699?text=Hi,%20I%20am%20inquiring%20about%20my%20active%20project%20AHZ-2026-0001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-500 hover:underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? "المهندس" : "WhatsApp Team"}</span>
                      </a>
                    </div>
                  </div>

                  {/* Mock Card 2 */}
                  <div className={`p-4 border transition-all space-y-3 ${
                    isLight ? 'bg-[#F8F5ED] border-black/5 hover:border-luxury-gold' : 'bg-neutral-950 border-white/5 hover:border-luxury-gold/50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-luxury-gold-dark">AHZ-2026-0002</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 uppercase font-mono">Stage 5 / Handover</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold">{language === 'ar' ? "مجلس كلاسيكي معتق" : "Classic Arabic Majlis Decor"}</h4>
                      <p className="text-[11px] text-neutral-500">Al Bateen, Abu Dhabi | Jotun Stucco texture</p>
                    </div>
                    
                    <div className="pt-2 border-t border-black/5 flex items-center justify-between gap-2">
                      <Link
                        to="/track-project?code=AHZ-2026-0002"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-luxury-gold-dark hover:underline"
                      >
                        <span>{language === 'ar' ? "تتبع الخطوات" : "Track Steps"}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                      
                      <a
                        href="https://wa.me/971555587699?text=Hi,%20I%20am%20inquiring%20about%20my%20active%20project%20AHZ-2026-0002"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-500 hover:underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? "المهندس" : "WhatsApp Team"}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* List of custom submissions */}
              <div className={`p-6 border text-start ${isLight ? 'bg-white border-black/10' : 'bg-neutral-900 border-white/5'}`}>
                <h3 className="text-sm font-serif font-bold text-luxury-gold-dark uppercase tracking-wider border-b border-black/5 pb-2 mb-4">
                  {language === 'ar' ? "تاريخ طلبات معاينة موقعك" : "Logged Site Visits & Estimations"}
                </h3>

                {submissions.length === 0 ? (
                  <div className="py-8 text-center text-xs text-neutral-500 space-y-2">
                    <FileText className="w-8 h-8 text-neutral-400 mx-auto" />
                    <p>{language === 'ar' ? "لم تقم بتقديم أي طلب أسعار حتى الآن." : "No personalized submissions detected in local cache."}</p>
                    <Link to="/request-quote" className="text-luxury-gold-dark font-bold hover:underline">
                      {language === 'ar' ? "اطلب معاينة وقياس جدران مجانية الآن" : "Create your first quote request"}
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((sub, idx) => (
                      <div
                        key={sub.request_number || idx}
                        className={`p-4 border text-xs space-y-3 ${
                          isLight ? 'bg-[#F8F5ED] border-black/5' : 'bg-neutral-950 border-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-black/5 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-luxury-gold-dark font-mono">
                              {sub.request_number}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              ({sub.created_at})
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded bg-luxury-gold/10 text-luxury-gold-dark font-bold text-[9px] uppercase tracking-wider font-mono">
                            Pending Schedule
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div>
                            <span className="block text-[9px] text-neutral-500 uppercase font-mono">City / Location</span>
                            <span className="font-bold mt-0.5 block">{sub.emirate} ({sub.area})</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-neutral-500 uppercase font-mono">Service Needed</span>
                            <span className="font-bold mt-0.5 block truncate uppercase">{sub.service_type.replace('-', ' ')}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-neutral-500 uppercase font-mono">Size / Budget</span>
                            <span className="font-bold mt-0.5 block truncate">{sub.project_size || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-neutral-500 uppercase font-mono">Visit Date</span>
                            <span className="font-bold mt-0.5 block font-mono">{sub.preferred_visit_date}</span>
                          </div>
                        </div>

                        {sub.project_description && (
                          <div className={`p-2.5 rounded text-[11px] italic ${
                            isLight ? 'bg-white text-neutral-600 border border-black/5' : 'bg-neutral-900 text-neutral-400 border border-white/5'
                          }`}>
                            " {sub.project_description} "
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Premium Invoices & Receipts (Export PDF) */}
              <div className={`p-6 border text-start ${isLight ? 'bg-white border-black/10' : 'bg-neutral-900 border-white/5'}`}>
                <h3 className="text-sm font-serif font-bold text-luxury-gold-dark uppercase tracking-wider border-b border-black/5 pb-2 mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4.5 h-4.5 text-luxury-gold-dark" />
                    <span>{language === 'ar' ? "فواتير وسندات الدفع الفاخرة" : "Luxury Invoices & Paid Receipts"}</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 lowercase">
                    {language === 'ar' ? "صيغة بي دي اف معتمدة" : "certified pdf format"}
                  </span>
                </h3>
                
                <p className="text-[11px] text-neutral-500 mb-4 leading-relaxed">
                  {language === 'ar'
                    ? "استعرض تفاصيل الفواتير وجداول الكميات المعتمدة لمشروعك، وقم بتصديرها كملف PDF رسمي للاحتفاظ بسجلاتك المعمارية."
                    : "Review itemized billings and professional paint matrices approved for your property. Export beautiful, print-ready PDF receipts for your personal records."}
                </p>

                <div className="space-y-3">
                  {mockInvoices.map((inv) => (
                    <div 
                      key={inv.id}
                      className={`p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                        isLight ? 'bg-[#F8F5ED] border-black/5 hover:border-luxury-gold' : 'bg-neutral-950 border-white/5 hover:border-luxury-gold/30'
                      }`}
                    >
                      <div className="space-y-1.5 text-start">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-luxury-gold-dark">{inv.id}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold uppercase tracking-wider">
                            {language === 'ar' ? "مدفوعة" : "Paid"}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold">
                          {language === 'ar' ? inv.titleAr : inv.title}
                        </h4>
                        <p className="text-[10px] text-neutral-500">
                          {language === 'ar' ? `تاريخ الإصدار: ${inv.date}` : `Issued: ${inv.date}`} | {inv.items.length} {language === 'ar' ? "أقسام رئيسية" : "items listed"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-black/5">
                        <div className="text-start sm:text-end">
                          <span className="block text-[9px] text-neutral-500 uppercase font-mono">{language === 'ar' ? "الإجمالي مع الضريبة" : "Amount Paid"}</span>
                          <span className="text-sm font-mono font-bold text-luxury-gold-dark">
                            {inv.total.toLocaleString()} AED
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="px-3.5 py-2 bg-luxury-gold hover:bg-yellow-500 text-neutral-950 font-mono text-[11px] font-bold uppercase transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? "عرض وتصدير PDF" : "View & Export"}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved Files & Specifications PDF list */}
              <div className={`p-6 border text-start ${isLight ? 'bg-white border-black/10' : 'bg-neutral-900 border-white/5'}`}>
                <h3 className="text-sm font-serif font-bold text-luxury-gold-dark uppercase tracking-wider border-b border-black/5 pb-2 mb-4 flex items-center gap-2">
                  <FolderOpen className="w-4.5 h-4.5 text-luxury-gold-dark" />
                  <span>{language === 'ar' ? "الملفات الفنية وجداول خامات جوتن" : "Technical Files & Bill of Quantities"}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-3 border flex items-center gap-3 ${isLight ? 'bg-[#F8F5ED] border-black/5' : 'bg-neutral-950 border-white/5'}`}>
                    <FileCheck className="w-8 h-8 text-luxury-gold-dark shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate">AHZ-Wall-Paints-Jotun-BOQ.pdf</p>
                      <p className="text-[10px] text-neutral-500 font-mono">1.8 MB | Approved Specs</p>
                    </div>
                    <a href="#" className="text-luxury-gold hover:underline text-[11px] font-bold">Download</a>
                  </div>

                  <div className={`p-3 border flex items-center gap-3 ${isLight ? 'bg-[#F8F5ED] border-black/5' : 'bg-neutral-950 border-white/5'}`}>
                    <FileCheck className="w-8 h-8 text-luxury-gold-dark shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate">AHZ-Gypsum-LED-Ceiling-Layout.pdf</p>
                      <p className="text-[10px] text-neutral-500 font-mono">3.4 MB | Architectural Dwg</p>
                    </div>
                    <a href="#" className="text-luxury-gold hover:underline text-[11px] font-bold">Download</a>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT: Profile card and support chat message box (Span 4) */}
            <div className="lg:col-span-4 space-y-6 text-center">
              
              {/* Customer Profile card */}
              <div className={`p-6 border text-start space-y-4 ${isLight ? 'bg-white border-black/10' : 'bg-neutral-900 border-white/5'}`}>
                <h3 className="text-sm font-serif font-bold text-luxury-gold-dark uppercase tracking-wider border-b border-black/5 pb-2">
                  {language === 'ar' ? "الملف الشخصي للعميل" : "Your Account Details"}
                </h3>

                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 border rounded-full flex items-center justify-center ${
                    isLight ? 'bg-[#F8F5ED] border-luxury-gold/50 text-luxury-gold-dark' : 'bg-neutral-950 border-white/10 text-luxury-gold'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold truncate">
                      {submissions[0]?.full_name || (language === 'ar' ? "ضيف الهنا الذهبية" : "Honorable Guest")}
                    </h4>
                    <span className="text-[10px] text-neutral-500 font-mono block truncate">
                      {submissions[0]?.email || "customer@alhanaalzahabyah.com"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs pt-2 border-t border-black/5">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">{t.phone_label}</span>
                    <span className="font-mono font-bold">{submissions[0]?.phone || "+971 55 558 7699"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Contact Method</span>
                    <span className="font-mono font-bold">{submissions[0]?.preferred_contact_method || "WhatsApp"}</span>
                  </div>
                </div>
              </div>

              {/* Live Design Assistant helper Banner */}
              <div className="p-6 border text-start bg-gradient-to-r from-neutral-950 to-neutral-900 border-luxury-gold/25 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
                <div className="space-y-3 relative z-10">
                  <Sparkles className="w-6 h-6 text-luxury-gold animate-spin" />
                  <h4 className="text-sm font-serif font-bold text-white">
                    {language === 'ar' ? "هل تحتاج لإلهام لوني فوري؟" : "Need Instant Style Inspiration?"}
                  </h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    {language === 'ar'
                      ? "جرب مساعد التصميم الذكي بالذكاء الاصطناعي لتنسيق ألوان جوتن واختيار خامات الجبس والكسوات فوراً."
                      : "Use our interactive assistant to preview actual paint combinations and gypsum layouts before meeting our engineers."}
                  </p>
                  <Link
                    to="/design-assistant"
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-luxury-gold hover:underline"
                  >
                    <span>{language === 'ar' ? "افتح مساعد التصميم الآن ←" : "Launch AI Assistant →"}</span>
                  </Link>
                </div>
              </div>

              {/* Engineer support leave notes */}
              <div className={`p-6 border text-start space-y-4 ${isLight ? 'bg-white border-black/10' : 'bg-neutral-900 border-white/5'}`}>
                <h3 className="text-sm font-serif font-bold text-luxury-gold-dark uppercase tracking-wider border-b border-black/5 pb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-luxury-gold-dark" />
                  <span>{language === 'ar' ? "ملاحظة سريعة للمشرف" : "Request Site Adjustments"}</span>
                </h3>

                {noteSent ? (
                  <div className="p-4 rounded bg-emerald-500/5 border border-emerald-500/25 text-center text-emerald-600 text-xs font-bold">
                    {language === 'ar' ? "تم إرسال ملحوظتك للمشرف بنجاح." : "Notes logged and sent directly to Eng. Wael."}
                  </div>
                ) : (
                  <form onSubmit={handleSendNote} className="space-y-3">
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      {language === 'ar'
                        ? "هل تريد تغيير موعد المعاينة أو إبلاغ المشرف بنوع طلاء معين؟ اكتب ملحوظتك هنا."
                        : "Request date changes, paint finish preferences, or gypsum details directly to our field supervisors."}
                    </p>
                    <textarea
                      rows={3}
                      value={supportNote}
                      onChange={(e) => setSupportNote(e.target.value)}
                      placeholder={language === 'ar' ? "مثال: يرجى إحضار كتالوج جوتن لزيارة السبت..." : "e.g. Please bring Jotun velvet samples..."}
                      className={`w-full border p-2.5 text-xs rounded-none focus:outline-none resize-none ${
                        isLight ? 'bg-[#F8F5ED] border-black/10 focus:border-luxury-gold-dark text-neutral-900' : 'bg-neutral-950 border-neutral-800 focus:border-luxury-gold text-white'
                      }`}
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-luxury-gold text-black hover:bg-yellow-500 text-xs font-bold uppercase transition-all"
                    >
                      {language === 'ar' ? "إرسال للمشرف" : "Deliver Notes"}
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* PRINTABLE LUXURY INVOICE MODAL / PDF EXPORTER */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in no-print">
            <div 
              className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto border p-6 sm:p-8 flex flex-col justify-between relative rounded-none ${
                isLight ? 'bg-white text-neutral-900 border-luxury-gold/50' : 'bg-neutral-900 text-white border-luxury-gold/30'
              }`}
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* PDF Preview container */}
              <div className="flex-1 space-y-6 pt-4">
                
                <div className="flex items-center justify-between border-b border-luxury-gold/20 pb-4">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-luxury-gold font-bold">
                    {language === 'ar' ? "معاينة الفاتورة قبل التصدير" : "Bespoke Invoice Exporter"}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-luxury-gold hover:bg-yellow-500 text-neutral-950 font-mono text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? "طباعة / حفظ PDF" : "Print & Save PDF"}</span>
                    </button>
                  </div>
                </div>

                {/* Actual document that gets styled specifically for PDF print */}
                <div 
                  id="printable-invoice" 
                  className="bg-white text-black p-6 sm:p-10 border border-double border-luxury-gold/30 space-y-8 font-sans text-start relative"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {/* Watermark/Background gold border detail */}
                  <div className="absolute inset-4 border border-luxury-gold/10 pointer-events-none"></div>
                  
                  {/* Invoice Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-luxury-gold/20 pb-6 relative z-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-serif font-bold text-luxury-gold-dark tracking-wider uppercase">
                          AL HANA AL ZAHABYAH
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-500 leading-relaxed font-mono">
                        Al Hana Al Zahabyah Interior Decoration LLC<br />
                        License No: 1045582 | TRN: 100485938200003<br />
                        Jumeirah, Dubai, United Arab Emirates<br />
                        Email: info@alhanaalzahabyah.com | +971 4 555 8769
                      </p>
                    </div>

                    <div className="text-left sm:text-right space-y-1">
                      <span className="text-sm font-mono font-bold text-luxury-gold-dark block">
                        TAX INVOICE / PROJECT SUMMARY
                      </span>
                      <p className="text-xs font-bold font-mono text-black">{selectedInvoice.id}</p>
                      <p className="text-[10px] text-neutral-500 font-mono">
                        Date: {selectedInvoice.date}<br />
                        Due Date: {selectedInvoice.dueDate}<br />
                        Project Code: {selectedInvoice.projectCode}
                      </p>
                    </div>
                  </div>

                  {/* Bill To Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs relative z-10 border-b border-gray-100 pb-6">
                    <div>
                      <span className="block text-[9px] uppercase font-mono tracking-wider text-gray-500 mb-1">
                        Billed To / CLIENT:
                      </span>
                      <p className="font-serif font-bold text-sm text-black">
                        {language === 'ar' ? selectedInvoice.clientNameAr : selectedInvoice.clientName}
                      </p>
                      <p className="text-[10px] text-neutral-500 leading-relaxed font-mono mt-1">
                        Residential Villa Development<br />
                        Dubai, UAE<br />
                        Tel: +971 50 000 0000
                      </p>
                    </div>
                    
                    <div className="text-left sm:text-right">
                      <span className="block text-[9px] uppercase font-mono tracking-wider text-gray-500 mb-1">
                        Scope of Works:
                      </span>
                      <p className="font-bold text-xs text-black">
                        {language === 'ar' ? selectedInvoice.titleAr : selectedInvoice.title}
                      </p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold font-mono">
                        ✓ PAID / APPROVED BY ARCHITECT
                      </span>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="space-y-2 relative z-10">
                    <span className="block text-[9px] uppercase font-mono tracking-wider text-gray-500">
                      ITEMIZED STATEMENT:
                    </span>
                    <table className="w-full text-xs text-left rtl:text-right border-collapse">
                      <thead>
                        <tr className="border-b border-luxury-gold/30 font-mono text-[9px] text-gray-500 uppercase">
                          <th className="py-2">Description of Services & Materials</th>
                          <th className="py-2 text-right">Quantity</th>
                          <th className="py-2 text-right">Amount (AED)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-mono">
                        {selectedInvoice.items.map((item, i) => (
                          <tr key={i} className="text-black">
                            <td className="py-3 pr-4">
                              <p className="font-bold">{language === 'ar' ? item.nameAr : item.name}</p>
                              <p className="text-[9px] text-gray-500 italic">Includes certified Jotun formulation & Knauf standards</p>
                            </td>
                            <td className="py-3 text-right text-gray-600 font-bold whitespace-nowrap">{item.qty}</td>
                            <td className="py-3 text-right font-bold whitespace-nowrap">{item.price.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Calculations */}
                  <div className="flex justify-end relative z-10 border-t border-luxury-gold/20 pt-6">
                    <div className="w-full sm:w-1/2 space-y-2 text-xs font-mono text-right">
                      <div className="flex justify-between text-gray-500">
                        <span>Subtotal:</span>
                        <span>{selectedInvoice.subtotal.toLocaleString()} AED</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>UAE VAT (5%):</span>
                        <span>{selectedInvoice.vat.toLocaleString()} AED</span>
                      </div>
                      <div className="flex justify-between text-black font-serif font-bold text-sm border-t border-gray-100 pt-2">
                        <span className="text-luxury-gold-dark">Total Paid (VAT Incl.):</span>
                        <span className="text-luxury-gold-dark">{selectedInvoice.total.toLocaleString()} AED</span>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Footer / Signatures */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs pt-8 border-t border-gray-100 relative z-10">
                    <div className="space-y-1">
                      <p className="font-bold text-[10px] text-gray-500 uppercase font-mono">Payment Terms & Guarantee:</p>
                      <p className="text-[9px] text-neutral-400 leading-relaxed font-mono">
                        All wall finish projects carry a 5-year official warranty against flaking, fading, or moisture intrusion. Gypsum installations comply with ASTM and UAE civil defense standards. Thank you for choosing Al Hana Al Zahabyah.
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end justify-end space-y-2">
                      <div className="w-40 border-b border-black text-center pb-1">
                        <span className="font-serif italic text-sm text-luxury-gold-dark">Eng. Wael Madbouli</span>
                      </div>
                      <span className="text-[9px] font-mono text-gray-400">Authorized Signature & Stamp</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom bar */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end gap-3 no-print">
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className={`px-4 py-2 border text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                    isLight ? 'bg-[#F8F5ED] border-black/15 text-neutral-800' : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                  }`}
                >
                  {language === 'ar' ? "إلغاء المعاينة" : "Close Preview"}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-gradient-to-r from-luxury-gold to-yellow-600 text-neutral-950 font-mono text-xs font-bold uppercase hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'ar' ? "تصدير وطباعة الآن" : "Export & Print PDF"}</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
};
