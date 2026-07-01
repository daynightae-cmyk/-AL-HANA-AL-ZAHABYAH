// src/pages/RequestQuote.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { saveLocalQuoteSubmission } from '../data/mockData';
import {
  CheckCircle,
  FileText,
  User,
  Home,
  Calendar,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const RequestQuotePage: React.FC = () => {
  const { language, t } = useApp();
  const navigate = useNavigate();

  // Multi-step tracking
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ request_number: string } | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    whatsapp: '',
    email: '',
    emirate: '',
    area: '',
    property_type: '',
    service_type: '',
    project_size: '',
    budget_range: '',
    preferred_contact_method: '',
    preferred_visit_date: '',
    project_description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setValidationError(null); // clear errors
  };

  const validateStep = (): boolean => {
    if (step === 1) {
      if (!formData.full_name || !formData.phone || !formData.email) {
        setValidationError(
          language === 'ar'
            ? "يرجى ملء جميع الحقول الإلزامية: الاسم الكامل، رقم الهاتف، والبريد الإلكتروني."
            : "Please fill in all required fields: Full Name, Phone, and Email."
        );
        return false;
      }
    } else if (step === 2) {
      if (!formData.emirate || !formData.area || !formData.property_type || !formData.service_type) {
        setValidationError(
          language === 'ar'
            ? "يرجى تحديد الإمارة، المنطقة، نوع العقار، والخدمة المطلوبة."
            : "Please select your Emirate, Area, Property Type, and Service Needed."
        );
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const handleBack = () => {
    setValidationError(null);
    setStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.preferred_contact_method || !formData.preferred_visit_date) {
      setValidationError(
        language === 'ar'
          ? "يرجى تحديد طريقة التواصل وتاريخ المعاينة الفنية المفضل."
          : "Please specify your preferred contact method and visit date."
      );
      return;
    }

    setLoading(true);
    setValidationError(null);

    // Simulate database insertion lag
    setTimeout(() => {
      try {
        const record = saveLocalQuoteSubmission({
          full_name: formData.full_name,
          phone: formData.phone,
          whatsapp: formData.whatsapp || formData.phone,
          email: formData.email,
          emirate: formData.emirate,
          area: formData.area,
          property_type: formData.property_type,
          service_type: formData.service_type,
          project_size: formData.project_size || 'Full Space',
          budget_range: formData.budget_range || 'Not Sure',
          preferred_contact_method: formData.preferred_contact_method,
          preferred_visit_date: formData.preferred_visit_date,
          project_description: formData.project_description
        });

        setSuccessData(record);
      } catch (err) {
        console.error(err);
        setValidationError(
          language === 'ar'
            ? "حدث خطأ غير متوقع أثناء تسجيل طلبك. يرجى المحاولة لاحقاً."
            : "An unexpected error occurred while storing your request. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const emiratesList = [
    { value: "دبي", label_ar: "دبي", label_en: "Dubai" },
    { value: "أبوظبي", label_ar: "أبوظبي", label_en: "Abu Dhabi" },
    { value: "الشارقة", label_ar: "الشارقة", label_en: "Sharjah" },
    { value: "عجمان", label_ar: "عجمان", label_en: "Ajman" },
    { value: "العين", label_ar: "العين", label_en: "Al Ain" },
    { value: "رأس الخيمة", label_ar: "رأس الخيمة", label_en: "Ras Al Khaimah" },
    { value: "الفجيرة", label_ar: "الفجيرة", label_en: "Fujairah" },
    { value: "أم القيوين", label_ar: "أم القيوين", label_en: "Umm Al Quwain" }
  ];

  const propertyTypes = [
    { value: "villa", label_ar: "فيلا مستقلة / تاون هاوس", label_en: "Villa / Townhouse" },
    { value: "apartment", label_ar: "شقة سكنية", label_en: "Apartment" },
    { value: "office", label_ar: "مكتب إداري", label_en: "Corporate Office" },
    { value: "shop", label_ar: "محل تجاري / معرض", label_en: "Retail Store / Showroom" },
    { value: "restaurant", label_ar: "مطعم / مقهى", label_en: "Restaurant / Cafe" },
    { value: "salon", label_ar: "صالون تجميل / سبا", label_en: "Beauty Salon / Spa" },
    { value: "other", label_ar: "عقار آخر", label_en: "Other" }
  ];

  const servicesList = [
    { value: "home-design", label_ar: "التصميم المنزلي / 3D", label_en: "Home Design / 3D concept" },
    { value: "home-paint", label_ar: "دهانات المنازل والأصباغ", label_en: "Home Paint / Solid Wall Paints" },
    { value: "home-decoration", label_ar: "أعمال الديكور والجبس بورد", label_en: "Home Decoration & Gypsum Ceilings" },
    { value: "home-renovation", label_ar: "تجديد كامل للمنازل والشقق", label_en: "Home Renovation / Overhaul" },
    { value: "villa-renovation", label_ar: "تجديد وتجميل الفلل الكبرى", label_en: "Grand Villa Renovation" },
    { value: "commercial-decoration", label_ar: "ديكور وتجهيز المشاريع التجارية", label_en: "Commercial Fitting" }
  ];

  const sizeOptions = [
    { value: "Small Room", label_ar: "غرفة واحدة أو جدار ديكوري", label_en: "Single Room / Accent Wall" },
    { value: "Medium Space", label_ar: "غرفتان أو صالة معيشة معينة", label_en: "Two Rooms / Lounge" },
    { value: "Full Apartment", label_ar: "شقة سكنية كاملة", label_en: "Full Apartment" },
    { value: "Full Villa", label_ar: "فيلا كاملة (طابق أو أكثر)", label_en: "Full Villa (Multi-story)" },
    { value: "Commercial Space", label_ar: "مساحة تجارية متكاملة", label_en: "Full Commercial Space" },
    { value: "Other", label_ar: "مساحة مخصصة أخرى", label_en: "Other Custom metrics" }
  ];

  const budgetOptions = [
    { value: "Under 10,000 AED", label_ar: "أقل من 10,000 درهم", label_en: "Under 10,000 AED" },
    { value: "10,000-25,000 AED", label_ar: "من 10,000 إلى 25,000 درهم", label_en: "10,000 - 25,000 AED" },
    { value: "25,000-50,000 AED", label_ar: "من 25,000 إلى 50,000 درهم", label_en: "25,000 - 50,000 AED" },
    { value: "50,000-100,000 AED", label_ar: "من 50,000 إلى 100,000 درهم", label_en: "50,000 - 100,000 AED" },
    { value: "Above 100,000 AED", label_ar: "أكثر من 100,000 درهم", label_en: "Above 100,000 AED" },
    { value: "Not Sure", label_ar: "غير متأكد / يحتاج لمعاينة ومناقشة", label_en: "Not Sure / Depends on visit" }
  ];

  return (
    <div id="quote-page-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      
      {/* Upper header */}
      <section className="relative py-12 px-4 text-center border-b border-amber-500/10 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            {t.quote_form_title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {t.quote_form_subtitle}
          </p>
        </div>
      </section>

      {/* Main Grid form wrapper */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        
        {successData ? (
          /* SUCCESS SCREEN */
          <div
            id="quote-success-card"
            className="p-8 sm:p-12 rounded-2xl bg-neutral-900 border border-amber-500/30 shadow-2xl text-center space-y-6 max-w-2xl mx-auto animate-fade-in"
          >
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold text-white">
                {t.quote_success_title}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {t.quote_success_msg_1}
              </p>
            </div>

            {/* Generated Code Panel */}
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg max-w-xs mx-auto">
              <span className="block text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                Your Custom tracking number
              </span>
              <span className="text-2xl font-extrabold text-amber-400 font-mono tracking-wider block mt-1">
                {successData.request_number}
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              {t.quote_success_msg_2}
            </p>

            <div className="pt-6 border-t border-neutral-850 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={`/track-project?code=${successData.request_number}`}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/15"
              >
                {language === 'ar' ? "تتبع حالة الطلب الآن" : "Track Status Now"}
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-sm font-bold"
              >
                {language === 'ar' ? "العودة للرئيسية" : "Go to Homepage"}
              </Link>
            </div>
          </div>
        ) : (
          /* MULTI STEP FORM FORMULARY */
          <div className="bg-neutral-900 border border-neutral-850 rounded-2xl shadow-xl overflow-hidden">
            
            {/* Step Indicators */}
            <div className="grid grid-cols-3 border-b border-neutral-850 text-center text-xs font-mono">
              <div className={`p-4 font-bold border-r border-neutral-850 flex items-center justify-center gap-2 ${step === 1 ? 'bg-neutral-950 text-amber-400 border-b-2 border-amber-500' : 'text-neutral-500'}`}>
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'ar' ? "البيانات الشخصية" : "Personal info"}</span>
                <span className="sm:hidden">1</span>
              </div>
              <div className={`p-4 font-bold border-r border-neutral-850 flex items-center justify-center gap-2 ${step === 2 ? 'bg-neutral-950 text-amber-400 border-b-2 border-amber-500' : 'text-neutral-500'}`}>
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'ar' ? "تفاصيل المشروع" : "Project details"}</span>
                <span className="sm:hidden">2</span>
              </div>
              <div className={`p-4 font-bold flex items-center justify-center gap-2 ${step === 3 ? 'bg-neutral-950 text-amber-400 border-b-2 border-amber-500' : 'text-neutral-500'}`}>
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'ar' ? "طريقة التواصل" : "Visit Date"}</span>
                <span className="sm:hidden">3</span>
              </div>
            </div>

            {/* Validation Notification */}
            {validationError && (
              <div className="m-5 p-4 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5 text-start">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-start">
              
              {/* STEP 1: Personal Coordinates */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-800 pb-2">
                    {t.form_personal_info}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_full_name} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder={language === 'ar' ? "مثال: م. وائل مدبولي" : "e.g. Eng. Wael Madbouli"}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_phone} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 000 0000"
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_whatsapp} ({language === 'ar' ? 'اختياري' : 'Optional'})
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="+971 50 000 0000"
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_email} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="admin@alhanaalzahabyah.com"
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none font-mono"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Project Parameters */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-800 pb-2">
                    {t.form_property_info}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_emirate} <span className="text-amber-500">*</span>
                      </label>
                      <select
                        name="emirate"
                        value={formData.emirate}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none"
                        required
                      >
                        <option value="">{t.placeholder_select}</option>
                        {emiratesList.map(e => (
                          <option key={e.value} value={e.value}>
                            {language === 'ar' ? e.label_ar : e.label_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_area} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder={language === 'ar' ? "مثال: جميرا 1، الخوانيج، البطين" : "e.g. Jumeirah 1, Al Bateen"}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_property_type} <span className="text-amber-500">*</span>
                      </label>
                      <select
                        name="property_type"
                        value={formData.property_type}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none"
                        required
                      >
                        <option value="">{t.placeholder_select}</option>
                        {propertyTypes.map(p => (
                          <option key={p.value} value={p.value}>
                            {language === 'ar' ? p.label_ar : p.label_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_service_needed} <span className="text-amber-500">*</span>
                      </label>
                      <select
                        name="service_type"
                        value={formData.service_type}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none"
                        required
                      >
                        <option value="">{t.placeholder_select}</option>
                        {servicesList.map(s => (
                          <option key={s.value} value={s.value}>
                            {language === 'ar' ? s.label_ar : s.label_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_project_size}
                      </label>
                      <select
                        name="project_size"
                        value={formData.project_size}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none"
                      >
                        <option value="">{t.placeholder_select}</option>
                        {sizeOptions.map(s => (
                          <option key={s.value} value={s.value}>
                            {language === 'ar' ? s.label_ar : s.label_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_budget_range}
                      </label>
                      <select
                        name="budget_range"
                        value={formData.budget_range}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none"
                      >
                        <option value="">{t.placeholder_select}</option>
                        {budgetOptions.map(b => (
                          <option key={b.value} value={b.value}>
                            {language === 'ar' ? b.label_ar : b.label_en}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Timeline & Handover */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-800 pb-2">
                    {t.form_contact_preference}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_contact_method} <span className="text-amber-500">*</span>
                      </label>
                      <select
                        name="preferred_contact_method"
                        value={formData.preferred_contact_method}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none"
                        required
                      >
                        <option value="">{t.placeholder_select}</option>
                        <option value="WhatsApp">{language === 'ar' ? "رسالة عبر واتساب" : "WhatsApp Chat"}</option>
                        <option value="Phone Call">{language === 'ar' ? "اتصال هاتفي مباشر" : "Direct Phone Call"}</option>
                        <option value="Email">{language === 'ar' ? "بريد إلكتروني رسمي" : "Official Email Support"}</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                        {t.field_visit_date} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="preferred_visit_date"
                        value={formData.preferred_visit_date}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                      {t.field_description}
                    </label>
                    <textarea
                      name="project_description"
                      value={formData.project_description}
                      onChange={handleChange}
                      rows={4}
                      placeholder={language === 'ar' ? "يرجى ذكر أي تفاصيل تهمك، مثلاً: نوع دهان معين، تكسير حوائط، تمديد جبس ليد مخفي..." : "Enter any specifications, e.g., preferred paint luster, gypsum sheets counts, LED magnetic tracks length..."}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="space-y-1.5 p-4 rounded bg-neutral-950 border border-neutral-800">
                    <span className="block text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                      {t.field_upload_images}
                    </span>
                    <p className="text-[10px] text-neutral-500">
                      {language === 'ar' ? "يمكنك رفع حتى 5 صور للمساحة الحالية. سيتم ربط ميزة الرفع السحابي فور ربط Supabase." : "You may attach progress photo logs. Cloud storage is prepared and connects directly."}
                    </p>
                    <input
                      type="file"
                      disabled
                      className="w-full bg-neutral-900 border border-dashed border-neutral-800 text-xs text-neutral-500 rounded p-3 cursor-not-allowed"
                    />
                  </div>
                </div>
              )}

              {/* Step Actions console */}
              <div className="pt-6 border-t border-neutral-850 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                    <span>{t.btn_back}</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>{t.btn_next}</span>
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                        <span>{language === 'ar' ? "جاري التسجيل..." : "Submitting..."}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-neutral-950" />
                        <span>{language === 'ar' ? "تقديم الطلب النهائي" : "Confirm Quote Request"}</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          </div>
        )}

      </section>

    </div>
  );
};
