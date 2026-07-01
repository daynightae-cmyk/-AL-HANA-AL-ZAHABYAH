// src/pages/Services.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockServices, mockServicePackages } from '../data/mockData';
import { Layout, Paintbrush, Sparkles, Wrench, Home, Briefcase, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const ServicesPage: React.FC = () => {
  const { language, t } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-10 h-10 text-luxury-gold" />;
      case 'Paintbrush': return <Paintbrush className="w-10 h-10 text-luxury-gold" />;
      case 'Sparkles': return <Sparkles className="w-10 h-10 text-luxury-gold" />;
      case 'Wrench': return <Wrench className="w-10 h-10 text-luxury-gold" />;
      case 'Home': return <Home className="w-10 h-10 text-luxury-gold" />;
      case 'Briefcase': return <Briefcase className="w-10 h-10 text-luxury-gold" />;
      default: return <Layers className="w-10 h-10 text-luxury-gold" />;
    }
  };

  // Service inclusions details
  const serviceInclusions: Record<string, string[]> = {
    "home-design": [
      language === 'ar' ? "مخططات ثنائية الأبعاد (2D Layouts)" : "2D CAD layouts",
      language === 'ar' ? "لوحات الألوان والمزاج (Moodboards)" : "Color boards & moodboards",
      language === 'ar' ? "تصميمات ثلاثية الأبعاد (3D Rendering)" : "3D Concept visualizations",
      language === 'ar' ? "توزيع الإضاءة ونقاط المفاتيح" : "Lighting points layouts",
      language === 'ar' ? "قائمة تسوق قطع الأثاث المنسقة" : "Curated furniture shopping lists"
    ],
    "home-paint": [
      language === 'ar' ? "أصباغ جوتن الفاخرة المعتمدة" : "Genuine Jotun premium paints",
      language === 'ar' ? "معالجة الشروخ والعيوب الجدارية" : "Treating wall cracks & dampness",
      language === 'ar' ? "تأسيس معجون وصنفرة مستوية" : "Double plaster coat & sanding",
      language === 'ar' ? "أصباغ ديكورية (ستوكو، قطيفة، مارمو)" : "Venetian stucco & velvet textures",
      language === 'ar' ? "تغطية كاملة للأرضيات والأثاث" : "Heavy protection for furniture & floor"
    ],
    "home-decoration": [
      language === 'ar' ? "أسقف الجبس بورد (Humid-resistant)" : "Moisture-resistant Gypsum ceilings",
      language === 'ar' ? "ممرات إضاءة بروفايل ليد حديثة" : "Modern LED magnetic profile tracks",
      language === 'ar' ? "براويز فوم وبوليريثان أنيقة" : "Polyurethane classic wall panels",
      language === 'ar' ? "ورق حائط فاخر ثنائي وثلاثي الأبعاد" : "Luxury 2D & 3D wallpapers",
      language === 'ar' ? "تركيب ستائر مدمجة مخفية" : "Hidden curtain tracks integrated"
    ],
    "home-renovation": [
      language === 'ar' ? "تكسير وتعديل جدران الصالة" : "Knocking down non-structural walls",
      language === 'ar' ? "تحديث وتجديد حمامات الشقق" : "Apartment bathrooms modernization",
      language === 'ar' ? "تغيير الأرضيات (باركيه، بورسلان)" : "Floor tiling (Parquet / Porcelain)",
      language === 'ar' ? "تجديد وتفصيل مطابخ عصرية" : "Modern kitchen refitting & design",
      language === 'ar' ? "تحديث الأسلاك وتمديدات السباكة" : "Plumbing & electric wire overhauls"
    ],
    "villa-renovation": [
      language === 'ar' ? "ترميم وإعادة دهان واجهات الفلل" : "Exterior villa facade restorations",
      language === 'ar' ? "تجهيز وتصميم المجالس العربية الكبرى" : "Grand Arabic Majlis designs",
      language === 'ar' ? "تجديد المداخل وتنسيق الإضاءة" : "Entrance remodels & landscape light",
      language === 'ar' ? "عزل الرطوبة والأمطار المتكامل" : "Comprehensive moisture insulation",
      language === 'ar' ? "مظلات وجلسات خارجية جبسية وخشبية" : "Pergolas & gypsum outdoor designs"
    ],
    "commercial-decoration": [
      language === 'ar' ? "تصميم مكاتب زجاجية عازلة للصوت" : "Soundproof glass office partitions",
      language === 'ar' ? "أسقف جبس مستعارة للممرات الكبرى" : "Suspended corridor gypsum sheets",
      language === 'ar' ? "تجهيز معارض ومحلات بيع التجزئة" : "Retail store display counters",
      language === 'ar' ? "إضاءة ليد مكثفة تناسب هوية العمل" : "Commercial brand-matched LEDs",
      language === 'ar' ? "دهانات مضادة للبكتيريا وسهلة التنظيف" : "Anti-bacterial wipeable wall paints"
    ]
  };

  const serviceIdeals: Record<string, string> = {
    "home-design": language === 'ar' ? "أصحاب الفلل والشقق تحت الإنشاء ويرغبون برؤية بيوتهم قبل التأثيث." : "New property owners wishing to visualize layout limits before locking in orders.",
    "home-paint": language === 'ar' ? "من يبحث عن دهان نظيف وبأصباغ أصلية دون رائحة أو تقشر على المدى البعيد." : "Clients seeking pristine solid color application using genuine Jotun, free of odor.",
    "home-decoration": language === 'ar' ? "من يرغب في إضافة لمسات جبس بورد حديثة وإضاءات مخفية وبراويز جدارية فخمة." : "Homeowners wanting luxury profile LED strip tracks and polyurethane wall frames.",
    "home-renovation": language === 'ar' ? "الشقق والبيوت المستعملة التي تحتاج لإعادة تصميم الصالات أو تحديث الحمامات والمطابخ." : "Old apartment layouts requiring room enlargements or toilet/kitchen updates.",
    "villa-renovation": language === 'ar' ? "أصحاب الفلل الكبرى والقصور والمجالس في الإمارات الراغبين في تجديد شامل وراقٍ." : "Large scale villa and palace owners in Dubai and Abu Dhabi requesting grand status.",
    "commercial-decoration": language === 'ar' ? "الشركات والمكاتب، وصالونات التجميل الفخمة والمطاعم والمقاهي في دبي والإمارات." : "Corporate offices, luxury nail salons, chic coffee shops, and restaurants."
  };

  return (
    <>
      <SEOHead
        title={language === 'ar' ? "خدماتنا وتصاميمنا" : "Our Luxury Services"}
        description={language === 'ar' ? "استكشف خدماتنا الاحترافية في مجالات التصميم الداخلي، معالجة الرطوبة، تزيين الأسقف بالجبس بورد، والأصباغ الفاخرة." : "Explore our premium line of interior design, Jotun architectural paints, moisture control, and customized gypsum false ceilings in UAE."}
      />
      <div id="services-page-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header Banner */}
      <section className="relative py-20 px-4 text-center border-b border-luxury-gold/10 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono text-luxury-gold font-bold uppercase tracking-widest px-3 py-1 rounded bg-luxury-gold/5 border border-luxury-gold/15">
            {language === 'ar' ? "خدماتنا الهندسية والتزيينية" : "Core Professional Catalog"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {t.services_page_title}
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            {t.services_page_subtitle}
          </p>
        </div>
      </section>

      {/* Services List Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {mockServices.map((service, idx) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 sm:p-8 rounded-none bg-[#0a0a0a] border border-white/5 hover:border-luxury-gold/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 relative overflow-hidden ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Backside gold glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-bl-full pointer-events-none"></div>

              {/* Service Graphics (Span 5) */}
              <div className={`lg:col-span-5 relative min-h-[250px] rounded-none overflow-hidden ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
                <img
                  src={service.image_url}
                  alt={language === 'ar' ? service.name_ar : service.name_en}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-neutral-900/90 backdrop-blur-md px-4 py-2 rounded-none border border-luxury-gold/20 shadow-md">
                  {getIcon(service.icon)}
                  <span className="text-xs font-mono font-bold text-luxury-gold">
                    {language === 'ar' ? `البند ${idx + 1}` : `Item 0${idx + 1}`}
                  </span>
                </div>
              </div>

              {/* Service Descriptions (Span 7) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-start">
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white hover:text-luxury-gold transition-colors font-serif">
                    {language === 'ar' ? service.name_ar : service.name_en}
                  </h2>
                  <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                    {language === 'ar' ? service.description_ar : service.description_en}
                  </p>

                  {/* inclusions */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-luxury-gold">
                      {t.services_included_title}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(serviceInclusions[service.slug] || []).map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ideal properties */}
                  <div className="pt-2 text-xs border-t border-white/5">
                    <span className="font-bold text-neutral-400 font-mono block mb-1">
                      {t.services_ideal_for}
                    </span>
                    <p className="text-neutral-500">
                      {serviceIdeals[service.slug] || ''}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/5">
                  <Link
                    to={`/services/${service.slug}`}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-none bg-neutral-950 hover:bg-neutral-900 border border-white/5 hover:border-luxury-gold/30 text-luxury-gold text-xs font-bold text-center flex items-center justify-center gap-2 transition-all font-mono"
                  >
                    <span>{language === 'ar' ? "تصفح التفاصيل والباقات السعرية" : "View Packages & Estimator"}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                  <Link
                    to="/request-quote"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-none bg-luxury-gold text-neutral-950 text-xs font-bold text-center hover:bg-yellow-500 transition-colors uppercase tracking-wider font-serif"
                  >
                    {t.services_request_service}
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  </>
  );
};
