// src/pages/Home.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockServices, mockProjectGallery, mockTestimonials, mockFAQs } from '../data/mockData';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Layout,
  Paintbrush,
  Wrench,
  Home,
  Briefcase,
  Layers,
  CheckCircle,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, t } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-8 h-8 text-amber-500" />;
      case 'Paintbrush': return <Paintbrush className="w-8 h-8 text-amber-500" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-amber-500" />;
      case 'Wrench': return <Wrench className="w-8 h-8 text-amber-500" />;
      case 'Home': return <Home className="w-8 h-8 text-amber-500" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8 text-amber-500" />;
      default: return <Layers className="w-8 h-8 text-amber-500" />;
    }
  };

  const featuredProjects = mockProjectGallery.filter(p => p.is_featured);
  const homeFaqs = mockFAQs.slice(0, 4);

  return (
    <div id="home-page-container" className="pt-20">
      
      {/* 1. Hero Section */}
      <section
        id="hero-section"
        className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-20 px-4 overflow-hidden border-b border-amber-500/10"
      >
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-yellow-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Thin Gold Lines Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-xs sm:text-sm font-mono tracking-wide mb-2 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>{language === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}</span>
          </div>

          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight text-white leading-tight"
          >
            {t.hero_headline}
          </h1>

          <p
            id="hero-subtext"
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-neutral-300 font-sans leading-relaxed"
          >
            {t.hero_subtext}
          </p>

          <div id="hero-actions" className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/request-quote"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-md bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all text-center"
            >
              {t.btn_request_quote}
            </Link>
            <Link
              to="/projects"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-md bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-amber-400 hover:border-amber-400/30 transition-all text-center"
            >
              {t.btn_view_projects}
            </Link>
          </div>

          {/* Miniature Logo in Hero */}
          <div className="pt-8 flex justify-center opacity-70">
            <img
              src="https://i.postimg.cc/KzbRXw4k/11zon-cropped.png"
              alt="Brand watermark"
              referrerPolicy="no-referrer"
              className="w-16 h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-40"
            />
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section id="trust-bar" className="bg-neutral-950 py-6 border-b border-neutral-900 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center lg:justify-between gap-6 sm:gap-8 flex-wrap text-center min-w-[600px] lg:min-w-0">
            {[t.trust_bar_1, t.trust_bar_2, t.trust_bar_3, t.trust_bar_4, t.trust_bar_5].map((text, i) => (
              <div key={i} className="flex items-center gap-2.5 px-3">
                <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-xs sm:text-sm font-bold tracking-wide text-neutral-400 uppercase font-mono">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services Overview */}
      <section id="services-overview" className="py-20 bg-neutral-950 light:bg-neutral-50 border-b border-neutral-900 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">
              {language === 'ar' ? "ما يمكننا فعله" : "What We Deliver"}
            </span>
            <h2 className="text-3xl font-extrabold text-white light:text-neutral-950">
              {language === 'ar' ? "خدمات التصميم والتشطيب والديكور" : "Core Design & Decoration Services"}
            </h2>
            <p className="text-sm text-neutral-400 light:text-neutral-600">
              {language === 'ar' ? "حلول متكاملة تناسب الفلل والشقق والمشاريع التجارية في الإمارات" : "Comprehensive premium services customized for the UAE high-end market"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockServices.map((service) => (
              <div
                key={service.id}
                className="group relative rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800 light:border-neutral-200 p-6 shadow-xl hover:border-amber-500/40 transition-all hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
                
                <div className="mb-4 p-3 rounded-lg bg-neutral-950 light:bg-neutral-100 inline-block">
                  {getIcon(service.icon)}
                </div>

                <h3 className="text-lg font-bold text-white light:text-neutral-950 mb-2 group-hover:text-amber-400 transition-colors">
                  {language === 'ar' ? service.name_ar : service.name_en}
                </h3>

                <p className="text-sm text-neutral-400 light:text-neutral-600 line-clamp-3 mb-6">
                  {language === 'ar' ? service.description_ar : service.description_en}
                </p>

                <div className="flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs font-mono text-amber-500 font-bold hover:text-amber-400 flex items-center gap-1"
                  >
                    <span>{language === 'ar' ? "التفاصيل والباقات" : "Details & Pricing"}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </Link>
                  <Link
                    to="/request-quote"
                    className="text-xs px-3 py-1.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 hover:bg-amber-500 hover:text-neutral-950 transition-colors"
                  >
                    {t.btn_request_quote}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 font-sans border-b border-amber-500/30 pb-0.5"
            >
              <span>{language === 'ar' ? "تصفح جميع الخدمات وتفاصيل الباقات" : "Explore All Services & Packages"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section id="why-choose-us" className="py-20 bg-neutral-900 light:bg-neutral-100 border-b border-neutral-950 light:border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">
              {language === 'ar' ? "مزايا الهنا الذهبية" : "Our Advantages"}
            </span>
            <h2 className="text-3xl font-extrabold text-white light:text-neutral-950">
              {t.why_title}
            </h2>
            <p className="text-sm text-neutral-400 light:text-neutral-600">
              {t.why_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl bg-neutral-950 light:bg-white border border-neutral-800/80 light:border-neutral-200/80 shadow-md">
              <div className="text-amber-500 text-3xl font-bold font-mono mb-4">01</div>
              <h3 className="text-base font-bold text-white light:text-neutral-950 mb-2">{t.why_1_title}</h3>
              <p className="text-xs text-neutral-400 light:text-neutral-600 leading-relaxed">{t.why_1_desc}</p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-950 light:bg-white border border-neutral-800/80 light:border-neutral-200/80 shadow-md">
              <div className="text-amber-500 text-3xl font-bold font-mono mb-4">02</div>
              <h3 className="text-base font-bold text-white light:text-neutral-950 mb-2">{t.why_2_title}</h3>
              <p className="text-xs text-neutral-400 light:text-neutral-600 leading-relaxed">{t.why_2_desc}</p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-950 light:bg-white border border-neutral-800/80 light:border-neutral-200/80 shadow-md">
              <div className="text-amber-500 text-3xl font-bold font-mono mb-4">03</div>
              <h3 className="text-base font-bold text-white light:text-neutral-950 mb-2">{t.why_3_title}</h3>
              <p className="text-xs text-neutral-400 light:text-neutral-600 leading-relaxed">{t.why_3_desc}</p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-950 light:bg-white border border-neutral-800/80 light:border-neutral-200/80 shadow-md">
              <div className="text-amber-500 text-3xl font-bold font-mono mb-4">04</div>
              <h3 className="text-base font-bold text-white light:text-neutral-950 mb-2">{t.why_4_title}</h3>
              <p className="text-xs text-neutral-400 light:text-neutral-600 leading-relaxed">{t.why_4_desc}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Process Section */}
      <section id="process" className="py-20 bg-neutral-950 light:bg-neutral-50 border-b border-neutral-900 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">
              {language === 'ar' ? "آلية العمل" : "Workflow Milestones"}
            </span>
            <h2 className="text-3xl font-extrabold text-white light:text-neutral-950">
              {t.process_title}
            </h2>
            <p className="text-sm text-neutral-400 light:text-neutral-600">
              {t.process_subtitle}
            </p>
          </div>

          <div className="relative">
            {/* Horizontal Timeline Connector (Desktop) */}
            <div className="hidden lg:block absolute top-[55px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber-500/10 via-amber-500/40 to-amber-500/10"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
              {[
                { title: t.process_step_1, desc: t.process_step_1_desc },
                { title: t.process_step_2, desc: t.process_step_2_desc },
                { title: t.process_step_3, desc: t.process_step_3_desc },
                { title: t.process_step_4, desc: t.process_step_4_desc },
                { title: t.process_step_5, desc: t.process_step_5_desc },
                { title: t.process_step_6, desc: t.process_step_6_desc },
              ].map((step, idx) => (
                <div key={idx} className="text-center space-y-3 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-400 font-mono font-bold flex items-center justify-center mx-auto shadow-md">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-white light:text-neutral-950">{step.title}</h3>
                  <p className="text-xs text-neutral-400 light:text-neutral-600 leading-relaxed max-w-[150px] mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Featured Projects */}
      <section id="featured-projects" className="py-20 bg-neutral-950 light:bg-neutral-50 border-b border-neutral-900 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">
              {language === 'ar' ? "مقتطفات من أعمالنا" : "Portfolio Highlights"}
            </span>
            <h2 className="text-3xl font-extrabold text-white light:text-neutral-950">
              {language === 'ar' ? "مشاريع متميزة وثقنا تحولها" : "Featured Luxury Transformations"}
            </h2>
            <p className="text-sm text-neutral-400 light:text-neutral-600">
              {language === 'ar' ? "فارق ملموس في الديكور وتنسيق الفراغات والتشطيبات الفاخرة" : "Demonstrated elegance in gypsum ceilings, painting, and architectural layout plans"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-lg overflow-hidden bg-neutral-900 light:bg-white border border-neutral-850 light:border-neutral-200 shadow-lg hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={project.main_image_url}
                    alt={language === 'ar' ? project.title_ar : project.title_en}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Before/After Tag */}
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md border border-amber-500/30 px-2.5 py-1 rounded text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    {language === 'ar' ? "قبل / بعد" : "Before & After"}
                  </div>

                  {/* Location Tag */}
                  <div className="absolute bottom-3 right-3 bg-neutral-950/85 px-2 py-0.5 rounded text-[10px] text-neutral-300 font-sans">
                    {project.emirate}
                  </div>
                </div>

                <div className="p-5 text-start flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">
                      {project.service_type.replace('-', ' ')}
                    </span>
                    <h3 className="text-base font-bold text-white light:text-neutral-950 mt-1 line-clamp-1">
                      {language === 'ar' ? project.title_ar : project.title_en}
                    </h3>
                    <p className="text-xs text-neutral-400 light:text-neutral-600 mt-2 line-clamp-2">
                      {language === 'ar' ? project.description_ar : project.description_en}
                    </p>
                  </div>

                  <Link
                    to="/before-after"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 pt-3 border-t border-neutral-800 light:border-neutral-200 w-full font-mono"
                  >
                    <span>{language === 'ar' ? "شاهد مقارنة التحول الكامل ←" : "Compare full transformation →"}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-12">
            <Link
              to="/projects"
              className="px-6 py-3.5 rounded bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 text-sm font-bold shadow-md shadow-amber-500/10"
            >
              {language === 'ar' ? "تصفح كامل معرض المشاريع" : "Explore Complete Projects Gallery"}
            </Link>
          </div>

        </div>
      </section>

      {/* 7. Quote CTA */}
      <section id="quote-cta" className="py-16 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-amber-500/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {language === 'ar' ? "هل تبحث عن تشطيب فاخر ومواعيد دقيقة لبيتك؟" : "Looking for Refined Finishes & Strict Handover Timelines?"}
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-neutral-400 leading-relaxed">
            {language === 'ar'
              ? "مهندسونا مستعدون لزيارة موقعك وقياس المساحات وتقديم مقترح تفصيلي للأصباغ والديكورات مجاناً وبدون أي التزام مسبق."
              : "Our engineering consultants are ready to visit your property, provide measurements, and compile a comprehensive quote for free."}
          </p>
          <div className="pt-2">
            <Link
              to="/request-quote"
              className="inline-block px-8 py-4 rounded-md bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-extrabold text-sm shadow-xl shadow-amber-500/20"
            >
              {t.btn_request_quote}
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section id="testimonials" className="py-20 bg-neutral-950 light:bg-neutral-50 border-b border-neutral-900 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">
              {language === 'ar' ? "ثقة عملائنا" : "Client Reviews"}
            </span>
            <h2 className="text-3xl font-extrabold text-white light:text-neutral-950">
              {language === 'ar' ? "آراء أصحاب الفلل والمكاتب" : "What Our Clients Say in UAE"}
            </h2>
            <p className="text-sm text-neutral-400 light:text-neutral-600">
              {language === 'ar' ? "نسعد بشهادة عملائنا حول جودة دهاناتنا والتزام مشرفينا بالتنفيذ" : "Satisfying property owners through relentless commitment to luxury finish"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-6 rounded-xl bg-neutral-900/40 light:bg-white border border-neutral-850 light:border-neutral-200 shadow-md text-start flex flex-col justify-between space-y-6"
              >
                <p className="text-sm text-neutral-300 light:text-neutral-700 leading-relaxed italic">
                  " {language === 'ar' ? testimonial.comment_ar : testimonial.comment_en} "
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-800 light:border-neutral-200">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white light:text-neutral-950">
                      {testimonial.customer_name}
                    </span>
                    <span className="text-[10px] text-amber-500 font-mono tracking-wider">
                      {language === 'ar' ? "عميل موثق ★★★★★" : "Verified Customer ★★★★★"}
                    </span>
                  </div>
                  <img
                    src="https://i.postimg.cc/KzbRXw4k/11zon-cropped.png"
                    alt="Review watermark"
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 object-contain opacity-40 rounded-full bg-neutral-950"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FAQ Preview */}
      <section id="faq-preview" className="py-20 bg-neutral-950 light:bg-neutral-50 border-b border-neutral-900 light:border-neutral-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">
              {language === 'ar' ? "أسئلة شائعة" : "F.A.Q."}
            </span>
            <h2 className="text-3xl font-extrabold text-white light:text-neutral-950">
              {language === 'ar' ? "إجابات هندسية سريعة" : "Need Quick Answers?"}
            </h2>
          </div>

          <div className="space-y-4">
            {homeFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.id}
                  className="rounded-lg bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-start font-bold text-white light:text-neutral-950 text-sm sm:text-base hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <span>{language === 'ar' ? faq.question_ar : faq.question_en}</span>
                    <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-neutral-400 light:text-neutral-600 border-t border-neutral-850 light:border-neutral-100 leading-relaxed">
                      {language === 'ar' ? faq.answer_ar : faq.answer_en}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-8">
            <Link
              to="/faqs"
              className="text-xs font-mono text-amber-500 hover:text-amber-400 font-bold"
            >
              {language === 'ar' ? "تصفح جميع الأسئلة الشائعة ←" : "Browse all FAQs →"}
            </Link>
          </div>

        </div>
      </section>

      {/* 10. Contact Strip */}
      <section id="contact-strip" className="bg-neutral-950 border-b border-amber-500/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
            <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-lg border border-neutral-850">
              <Phone className="w-6 h-6 text-amber-500 mb-2" />
              <span className="font-bold text-white mb-1">{t.phone_label}</span>
              <span className="text-xs text-neutral-400 font-mono">+971 50 000 0000</span>
            </div>

            <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-lg border border-neutral-850">
              <Mail className="w-6 h-6 text-amber-500 mb-2" />
              <span className="font-bold text-white mb-1">{t.email_label}</span>
              <a href="mailto:admin@alhanaalzahabyah.com" className="text-xs text-neutral-400 font-mono hover:text-amber-400">
                admin@alhanaalzahabyah.com
              </a>
            </div>

            <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-lg border border-neutral-850">
              <MapPin className="w-6 h-6 text-amber-500 mb-2" />
              <span className="font-bold text-white mb-1">{t.address_label}</span>
              <span className="text-xs text-neutral-400 leading-tight">الإمارات العربية المتحدة</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
