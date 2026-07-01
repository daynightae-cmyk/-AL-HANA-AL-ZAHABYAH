// src/pages/Home.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { ServiceCard } from '../components/common/ServiceCard';
import { SEOHead } from '../components/common/SEOHead';
import { CinematicHeroSlider } from '../components/hero/CinematicHeroSlider';
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
      case 'Layout': return <Layout className="w-8 h-8 text-luxury-gold" />;
      case 'Paintbrush': return <Paintbrush className="w-8 h-8 text-luxury-gold" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-luxury-gold" />;
      case 'Wrench': return <Wrench className="w-8 h-8 text-luxury-gold" />;
      case 'Home': return <Home className="w-8 h-8 text-luxury-gold" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8 text-luxury-gold" />;
      default: return <Layers className="w-8 h-8 text-luxury-gold" />;
    }
  };

  const featuredProjects = mockProjectGallery.filter(p => p.is_featured);
  const homeFaqs = mockFAQs.slice(0, 4);

  return (
    <>
      <SEOHead />
      <div id="home-page-container" className="pt-20 bg-[#050505] text-[#D6D6D6] relative overflow-hidden">
      
      {/* 1. Cinematic Hero Slider */}
      <CinematicHeroSlider />

      {/* 2. Trust Bar */}
      <section id="trust-bar" className="bg-[#050505] py-6 border-b border-white/10 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center lg:justify-between gap-6 sm:gap-8 flex-wrap text-center min-w-[600px] lg:min-w-0">
            {[t.trust_bar_1, t.trust_bar_2, t.trust_bar_3, t.trust_bar_4, t.trust_bar_5].map((text, i) => (
              <div key={i} className="flex items-center gap-2.5 px-3">
                <CheckCircle className="w-4 h-4 text-luxury-gold shrink-0" />
                <span className="text-[10px] font-bold tracking-[0.15em] text-luxury-muted uppercase font-mono">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services Overview */}
      <section id="services-overview" className="py-20 bg-[#050505] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-[0.2em] block">
              {language === 'ar' ? "ما يمكننا فعله" : "What We Deliver"}
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#F8F5ED]">
              {language === 'ar' ? "خدمات التصميم والتشطيب والديكور" : "Core Design & Decoration Services"}
            </h2>
            <p className="text-xs text-luxury-muted">
              {language === 'ar' ? "حلول متكاملة تناسب الفلل والشقق والمشاريع التجارية في الإمارات" : "Comprehensive premium services customized for the UAE high-end market"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockServices.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                language={language}
                index={idx}
                btnRequestQuoteText={t.btn_request_quote}
                btnDetailsText={language === 'ar' ? "التفاصيل والباقات" : "Details & Pricing"}
              />
            ))}
          </div>

          <div className="text-center pt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-serif font-bold tracking-widest text-luxury-gold hover:text-yellow-500 uppercase pb-0.5 border-b border-luxury-gold/30"
            >
              <span>{language === 'ar' ? "تصفح جميع الخدمات وتفاصيل الباقات" : "Explore All Services & Packages"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section id="why-choose-us" className="py-20 bg-[#050505] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-[0.2em] block">
              {language === 'ar' ? "مزايا الهنا الذهبية" : "Our Advantages"}
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#F8F5ED]">
              {t.why_title}
            </h2>
            <p className="text-xs text-luxury-muted">
              {t.why_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 luxury-card">
              <div className="text-luxury-gold text-2xl font-bold font-serif mb-4">01</div>
              <h3 className="text-sm font-serif font-bold text-[#F8F5ED] mb-2">{t.why_1_title}</h3>
              <p className="text-[11px] text-luxury-muted leading-relaxed">{t.why_1_desc}</p>
            </div>

            <div className="p-6 luxury-card">
              <div className="text-luxury-gold text-2xl font-bold font-serif mb-4">02</div>
              <h3 className="text-sm font-serif font-bold text-[#F8F5ED] mb-2">{t.why_2_title}</h3>
              <p className="text-[11px] text-luxury-muted leading-relaxed">{t.why_2_desc}</p>
            </div>

            <div className="p-6 luxury-card">
              <div className="text-luxury-gold text-2xl font-bold font-serif mb-4">03</div>
              <h3 className="text-sm font-serif font-bold text-[#F8F5ED] mb-2">{t.why_3_title}</h3>
              <p className="text-[11px] text-luxury-muted leading-relaxed">{t.why_3_desc}</p>
            </div>

            <div className="p-6 luxury-card">
              <div className="text-luxury-gold text-2xl font-bold font-serif mb-4">04</div>
              <h3 className="text-sm font-serif font-bold text-[#F8F5ED] mb-2">{t.why_4_title}</h3>
              <p className="text-[11px] text-luxury-muted leading-relaxed">{t.why_4_desc}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Process Section */}
      <section id="process" className="py-20 bg-[#050505] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-[0.2em] block">
              {language === 'ar' ? "آلية العمل" : "Workflow Milestones"}
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#F8F5ED]">
              {t.process_title}
            </h2>
            <p className="text-xs text-luxury-muted">
              {t.process_subtitle}
            </p>
          </div>

          <div className="relative">
            {/* Horizontal Timeline Connector (Desktop) */}
            <div className="hidden lg:block absolute top-[55px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-luxury-gold/5 via-luxury-gold/25 to-luxury-gold/5"></div>

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
                  <div className="w-12 h-12 bg-[#0d0d0d] border border-luxury-gold/30 text-luxury-gold font-serif font-bold flex items-center justify-center mx-auto shadow-lg">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[#F8F5ED]">{step.title}</h3>
                  <p className="text-[11px] text-luxury-muted leading-relaxed max-w-[150px] mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5.5 Interactive Before/After Reveal Section */}
      <section id="interactive-reveal" className="py-20 bg-gradient-to-b from-[#050505] to-[#0a0a0a] border-b border-white/10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column (Span 5) */}
            <div className="lg:col-span-5 text-start space-y-6">
              <span className="text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-[0.2em] block">
                {language === 'ar' ? "سحر التحول الهندسي" : "TACTILE CRAFTSMANSHIP REVEAL"}
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#F8F5ED] leading-tight">
                {language === 'ar' ? "شاهد الفارق بنفسك بالتفاعل الحي" : "Interactive Space Metamorphosis"}
              </h2>
              <p className="text-xs text-luxury-muted leading-relaxed">
                {language === 'ar' 
                  ? "اسحب المقبض الذهبي يميناً ويساراً لمقارنة حالة الفراغ السكني قبل التدخل ومعالجة الرطوبة والجبس بورد، وبعد الانتهاء من تطبيق أصباغ جوتن الفينوم الفاخرة وتوزيع ليد بروفايل." 
                  : "Slide the custom gold handle to inspect the raw structural baseline side-by-side with our finalized double-plastered moisture-insulated Jotun Phenom coating and integrated magnetic LED track profiles."}
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold"></div>
                  <span className="text-xs text-[#F8F5ED]">
                    {language === 'ar' ? "معالجة كيميائية معتمدة للرطوبة وتصدع الجدران" : "Chemical vapor barriers for long-term wall integrity"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold"></div>
                  <span className="text-xs text-[#F8F5ED]">
                    {language === 'ar' ? "أسقف جبس بورد مستوية بإنارة مغناطيسية مدمجة" : "Laser-leveled moisture-resistant ceilings with magnetic tracks"}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/before-after"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-luxury-gold/40 text-luxury-gold hover:bg-luxury-gold hover:text-black text-[11px] font-mono font-bold uppercase tracking-widest transition-all"
                >
                  <span>{language === 'ar' ? "استكشف المزيد من الحالات" : "Browse More Case Studies"}</span>
                </Link>
              </div>
            </div>

            {/* Right Slider Column (Span 7) */}
            <div className="lg:col-span-7 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-luxury-gold/10 to-yellow-600/10 rounded-2xl blur-[12px] opacity-75 pointer-events-none"></div>
              <div className="relative p-1.5 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] z-10">
                {mockProjectGallery.find(p => p.before_image_url && p.after_image_url) ? (
                  <BeforeAfterSlider
                    beforeImage={mockProjectGallery.find(p => p.before_image_url && p.after_image_url)!.before_image_url!}
                    afterImage={mockProjectGallery.find(p => p.before_image_url && p.after_image_url)!.after_image_url!}
                    beforeLabel={language === 'ar' ? "قبل العمل" : "BEFORE"}
                    afterLabel={language === 'ar' ? "بعد التسليم" : "AFTER"}
                    heightClass="h-[280px] sm:h-[380px]"
                  />
                ) : (
                  <div className="h-[380px] bg-neutral-900 rounded-xl flex items-center justify-center">
                    <span className="text-neutral-500 text-xs">No before/after imagery found</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Featured Projects */}
      <section id="featured-projects" className="py-20 bg-[#050505] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-[0.2em] block">
              {language === 'ar' ? "مقتطفات من أعمالنا" : "Portfolio Highlights"}
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#F8F5ED]">
              {language === 'ar' ? "مشاريع متميزة وثقنا تحولها" : "Featured Luxury Transformations"}
            </h2>
            <p className="text-xs text-luxury-muted">
              {language === 'ar' ? "فارق ملموس في الديكور وتنسيق الفراغات والتشطيبات الفاخرة" : "Demonstrated elegance in gypsum ceilings, painting, and architectural layout plans"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative luxury-card overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-60 w-full overflow-hidden border-b border-white/5">
                  <img
                    src={project.main_image_url}
                    alt={language === 'ar' ? project.title_ar : project.title_en}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Before/After Tag */}
                  <div className="absolute top-3 left-3 bg-[#050505]/95 backdrop-blur-md border border-luxury-gold/30 px-2.5 py-1 text-[9px] font-mono text-luxury-gold font-bold uppercase tracking-wider">
                    {language === 'ar' ? "قبل / بعد" : "Before & After"}
                  </div>

                  {/* Location Tag */}
                  <div className="absolute bottom-3 right-3 bg-[#050505]/90 px-2.5 py-1 text-[9px] text-[#F8F5ED] uppercase tracking-wider font-mono">
                    {project.emirate}
                  </div>
                </div>

                <div className="p-5 text-start flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[9px] font-mono text-luxury-gold uppercase tracking-[0.15em] font-bold">
                      {project.service_type.replace('-', ' ')}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#F8F5ED] mt-1 line-clamp-1">
                      {language === 'ar' ? project.title_ar : project.title_en}
                    </h3>
                    <p className="text-xs text-luxury-muted mt-2 line-clamp-2 leading-relaxed">
                      {language === 'ar' ? project.description_ar : project.description_en}
                    </p>
                  </div>

                  <Link
                    to="/before-after"
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-luxury-gold hover:text-yellow-500 pt-3 border-t border-white/5 w-full"
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
              className="inline-block px-8 py-3.5 bg-luxury-gold text-black hover:bg-yellow-500 text-xs uppercase tracking-widest font-serif font-bold shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all"
            >
              {language === 'ar' ? "تصفح كامل معرض المشاريع" : "Explore Complete Projects Gallery"}
            </Link>
          </div>

        </div>
      </section>

      {/* 7. Quote CTA */}
      <section id="quote-cta" className="py-20 bg-gradient-to-br from-[#111111] to-[#050505] border-b border-white/10 relative overflow-hidden">
        <div className="luxury-glow-bottom"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F8F5ED]">
            {language === 'ar' ? "هل تبحث عن تشطيب فاخر ومواعيد دقيقة لبيتك؟" : "Looking for Refined Finishes & Strict Handover Timelines?"}
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-luxury-muted leading-relaxed">
            {language === 'ar'
              ? "مهندسونا مستعدون لزيارة موقعك وقياس المساحات وتقديم مقترح تفصيلي للأصباغ والديكورات مجاناً وبدون أي التزام مسبق."
              : "Our engineering consultants are ready to visit your property, provide measurements, and compile a comprehensive quote for free."}
          </p>
          <div className="pt-4">
            <Link
              to="/request-quote"
              className="inline-block px-10 py-4 bg-luxury-gold text-black hover:bg-yellow-500 text-xs uppercase tracking-widest font-serif font-bold shadow-[0_0_30px_rgba(212,175,55,0.35)] transition-all"
            >
              {t.btn_request_quote}
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section id="testimonials" className="py-20 bg-[#050505] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-[0.2em] block">
              {language === 'ar' ? "ثقة عملائنا" : "Client Reviews"}
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#F8F5ED]">
              {language === 'ar' ? "آراء أصحاب الفلل والمكاتب" : "What Our Clients Say in UAE"}
            </h2>
            <p className="text-xs text-luxury-muted">
              {language === 'ar' ? "نسعد بشهادة عملائنا حول جودة دهاناتنا والتزام مشرفينا بالتنفيذ" : "Satisfying property owners through relentless commitment to luxury finish"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-6 luxury-card text-start flex flex-col justify-between h-full space-y-6"
              >
                <p className="text-xs sm:text-sm text-luxury-muted leading-relaxed italic">
                  " {language === 'ar' ? testimonial.comment_ar : testimonial.comment_en} "
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs font-serif font-bold text-[#F8F5ED]">
                      {testimonial.customer_name}
                    </span>
                    <span className="text-[9px] text-luxury-gold font-mono tracking-widest font-semibold uppercase mt-0.5">
                      {language === 'ar' ? "عميل موثق ★★★★★" : "Verified Customer ★★★★★"}
                    </span>
                  </div>
                  <div className="w-8 h-8 border border-luxury-gold/30 flex items-center justify-center rotate-45 bg-black shrink-0">
                    <span className="-rotate-45 text-luxury-gold font-serif text-[10px] font-bold">H</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FAQ Preview */}
      <section id="faq-preview" className="py-20 bg-[#050505] border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12 space-y-3">
            <span className="text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-[0.2em] block">
              {language === 'ar' ? "أسئلة شائعة" : "F.A.Q."}
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#F8F5ED]">
              {language === 'ar' ? "إجابات هندسية سريعة" : "Need Quick Answers?"}
            </h2>
          </div>

          <div className="space-y-4">
            {homeFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-[#0d0d0d] border border-white/5 overflow-hidden transition-all duration-300 hover:border-luxury-gold/25"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-start font-serif font-bold text-[#F8F5ED] text-sm sm:text-base hover:text-luxury-gold transition-colors cursor-pointer"
                  >
                    <span>{language === 'ar' ? faq.question_ar : faq.question_en}</span>
                    <ChevronDown className={`w-4 h-4 text-luxury-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-luxury-muted border-t border-white/5 leading-relaxed">
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
              className="text-xs font-mono text-luxury-gold hover:text-yellow-500 font-bold uppercase tracking-widest"
            >
              {language === 'ar' ? "تصفح جميع الأسئلة الشائعة ←" : "Browse all FAQs →"}
            </Link>
          </div>

        </div>
      </section>

      {/* 10. Contact Strip */}
      <section id="contact-strip" className="bg-[#050505] border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
            <div className="flex flex-col items-center p-6 bg-[#0d0d0d] border border-white/5">
              <Phone className="w-5 h-5 text-luxury-gold mb-3 animate-pulse" />
              <span className="font-serif font-bold text-[#F8F5ED] text-xs uppercase tracking-widest mb-1">{t.phone_label}</span>
              <span className="text-xs text-luxury-muted font-mono">+971 55 558 7699</span>
            </div>

            <div className="flex flex-col items-center p-6 bg-[#0d0d0d] border border-white/5">
              <Mail className="w-5 h-5 text-luxury-gold mb-3" />
              <span className="font-serif font-bold text-[#F8F5ED] text-xs uppercase tracking-widest mb-1">{t.email_label}</span>
              <a href="mailto:admin@alhanaalzahabyah.com" className="text-xs text-luxury-muted font-mono hover:text-luxury-gold">
                admin@alhanaalzahabyah.com
              </a>
            </div>

            <div className="flex flex-col items-center p-6 bg-[#0d0d0d] border border-white/5">
              <MapPin className="w-5 h-5 text-luxury-gold mb-3" />
              <span className="font-serif font-bold text-[#F8F5ED] text-xs uppercase tracking-widest mb-1">{t.address_label}</span>
              <span className="text-xs text-luxury-muted leading-tight font-mono">الإمارات العربية المتحدة</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  </>
  );
};
