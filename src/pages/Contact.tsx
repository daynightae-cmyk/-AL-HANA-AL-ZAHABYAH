// src/pages/Contact.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, t } = useApp();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.message) return;

    setLoading(true);

    // Simulate sending progress lag
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div id="contact-page-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      
      {/* Header section */}
      <section className="relative py-12 px-4 text-center border-b border-amber-500/10 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-500/5 border border-amber-500/15">
            {language === 'ar' ? "تواصل مباشر" : "Connect with Us"}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            {t.nav_contact}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            {language === 'ar' ? "يسعدنا الرد على استفساراتكم وجدولة زيارات المعاينة في كافة أنحاء الإمارات." : "Reach out regarding paint coatings, gypsum borders, or entire villa remodels."}
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Info details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Form Column (Span 7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-850 shadow-xl text-start space-y-6">
            <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              <span>{t.contact_form_title}</span>
            </h2>

            {success ? (
              <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {language === 'ar' ? "تم إرسال رسالتك بنجاح" : "Message Sent Successfully"}
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  {language === 'ar'
                    ? "نشكرك على اهتمامك بالهنا الذهبية. سيقوم أحد مهندسينا بمراجعة الرسالة والتواصل معك قريباً."
                    : "Thank you for reaching out. Our engineering consultants will review your message and reply shortly."}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-5 py-2 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-amber-500 text-xs font-bold"
                >
                  {language === 'ar' ? "إرسال رسالة أخرى" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                      {t.field_full_name} <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={language === 'ar' ? "الاسم الكريم" : "Your Name"}
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
                    placeholder="name@example.com"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none font-mono"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                    {language === 'ar' ? "موضوع الاستفسار" : "Subject"}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={language === 'ar' ? "مثال: استفسار عن دهانات الفلل" : "e.g. Gypsum Board designs"}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                    {language === 'ar' ? "تفاصيل الرسالة" : "Your Message"} <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={language === 'ar' ? "اكتب رسالتك أو استفسارك هنا بالتفصيل..." : "Describe your request in detail..."}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500/50 rounded p-3 text-sm focus:outline-none resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 rounded bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>{loading ? (language === 'ar' ? "جاري الإرسال..." : "Sending...") : (language === 'ar' ? "إرسال الرسالة" : "Send Message")}</span>
                </button>

              </form>
            )}
          </div>

          {/* Contact Info Column (Span 5) */}
          <div className="lg:col-span-5 space-y-6 text-start flex flex-col justify-between">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-850 shadow-xl space-y-6 flex-1">
              <h2 className="text-xl font-bold text-amber-400 border-b border-neutral-800 pb-3 uppercase tracking-widest font-mono">
                {language === 'ar' ? "قنوات التواصل الرسمية" : "Official Channels"}
              </h2>

              <ul className="space-y-4">
                {/* Physical Location */}
                <li className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-neutral-950 border border-neutral-850 text-amber-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-neutral-500 uppercase tracking-wider">
                      {t.address_label}
                    </span>
                    <p className="text-sm text-neutral-200 mt-1">
                      {t.address_value}
                    </p>
                  </div>
                </li>

                {/* Email Support */}
                <li className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-neutral-950 border border-neutral-850 text-amber-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-mono text-neutral-500 uppercase tracking-wider">
                      {t.email_label}
                    </span>
                    <a href="mailto:admin@alhanaalzahabyah.com" className="text-sm text-neutral-200 font-mono hover:text-amber-400 mt-1 block truncate">
                      admin@alhanaalzahabyah.com
                    </a>
                    <span className="block text-xs text-neutral-500 font-mono mt-0.5">info@alhanaalzahabyah.com</span>
                  </div>
                </li>

                {/* Direct Phone */}
                <li className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-neutral-950 border border-neutral-850 text-amber-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-neutral-500 uppercase tracking-wider">
                      {t.phone_label}
                    </span>
                    <p className="text-sm text-neutral-200 font-mono mt-1">
                      +971 50 000 0000
                    </p>
                  </div>
                </li>

                {/* Working hours */}
                <li className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-neutral-950 border border-neutral-850 text-amber-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-neutral-500 uppercase tracking-wider">
                      {t.working_hours_label}
                    </span>
                    <p className="text-sm text-neutral-200 mt-1">
                      {t.working_hours_value}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Premium Satellite Map Widget */}
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850 shadow-xl overflow-hidden relative min-h-[150px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[9px] font-mono text-neutral-500">
                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                <span>GPS SATELLITE HUD</span>
              </div>
              
              <div className="text-center relative z-10 space-y-1">
                <span className="block text-xs text-amber-500 font-mono font-bold uppercase tracking-widest">
                  AL HANA AL ZAHABYAH HQ
                </span>
                <span className="block text-[10px] text-neutral-400 font-mono">
                  LAT: 25.2048° N | LON: 55.2708° E (Dubai, UAE)
                </span>
                <p className="text-[10px] text-neutral-500 max-w-[250px] mx-auto mt-2 leading-snug">
                  {language === 'ar'
                    ? "سيتوفر الإسقاط الجغرافي التفاعلي فور ربط رمز الخرائط. تقع مكاتبنا الرئيسية في إمارة دبي."
                    : "Interactive map plotting activates upon loading API keys. Headquartered in Dubai."}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
