// src/pages/About.tsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Sparkles, Clock, Compass, HeartHandshake, Eye } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, t } = useApp();

  return (
    <div id="about-page-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans">
      
      {/* Page Header Hero */}
      <section className="relative py-20 px-4 text-center border-b border-amber-500/10 overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-500/5 border border-amber-500/15">
            {language === 'ar' ? "رحلتنا وقيمنا" : "Our Journey & Philosophy"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {t.about_title}
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            {language === 'ar' ? "تعرف على تاريخ الهنا الذهبية ورسالتها في تطوير أجمل المساحات داخل الإمارات" : "Discover the history and core objectives behind our luxury renovations across the UAE"}
          </p>
        </div>
      </section>

      {/* Main Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text block (Span 7) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-400">
              {t.about_intro_title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {t.about_intro_desc}
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {language === 'ar' 
                ? "انطلقت شركة الهنا الذهبية بدافع توفير التميز الحقيقي في أعمال الصباغة، تركيب الجبس بورد، الدهانات الديكورية، وتطوير المجالس والواجهات. نؤمن بأن كل حائط هو لوحة فنية، وكل صالة هي فضاء للراحة والجمال العائلي. لذلك نعتني بكل مرحلة، من مسح رطوبة الجدران وتجهيز المعجون الأولي، حتى اللمسة الأخيرة وتوزيع الإضاءة الموجهة بعناية."
                : "Al Hana Al Zahabyah was founded to bring absolute precision into house painting, gypsum ceiling structures, Venetian textures, and exterior facade remodeling. We believe every wall is a canvas, and every room a sanctuary for families. This drives our strict attention to detail, beginning with technical humidity assessments and ending with perfectly directed ambient LEDs."}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-900 font-mono">
              <div className="p-4 bg-neutral-900/60 rounded border border-neutral-850">
                <span className="block text-2xl font-bold text-amber-500">100%</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                  {language === 'ar' ? 'التزام بالمواعيد' : 'On-Time Commitment'}
                </span>
              </div>
              <div className="p-4 bg-neutral-900/60 rounded border border-neutral-850">
                <span className="block text-2xl font-bold text-amber-500">JOTUN</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                  {language === 'ar' ? 'أصباغ وخامات فاخرة' : 'Premium Paint Products'}
                </span>
              </div>
            </div>
          </div>

          {/* Logo / Image block (Span 5) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-6 rounded-2xl bg-neutral-900/85 border border-amber-500/20 shadow-2xl max-w-sm w-full text-center space-y-6">
              <div className="absolute inset-0 bg-amber-500/5 rounded-2xl blur-xl pointer-events-none"></div>
              
              <img
                src="https://i.postimg.cc/KzbRXw4k/11zon-cropped.png"
                alt="Al Hana Al Zahabyah Official Logo"
                referrerPolicy="no-referrer"
                className="w-48 h-48 mx-auto object-contain bg-neutral-950 border border-amber-500/20 rounded-full shadow-lg"
              />

              <div>
                <h3 className="text-lg font-bold text-amber-400">
                  {language === 'ar' ? "الهنا الذهبية للتصميم والديكور" : "AL HANA AL ZAHABYAH"}
                </h3>
                <span className="text-xs text-neutral-500 font-mono">
                  www.alhanaalzahabyah.com
                </span>
              </div>

              <div className="text-xs text-neutral-400 font-sans border-t border-neutral-800 pt-4">
                {language === 'ar' 
                  ? "تحت إشراف وتوجيه المهندس وائل مدبولي وإعداد Sadek Elgazar"
                  : "Supervised by Eng. Wael Madbouli & Compiled by Sadek Elgazar"}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-neutral-900/40 border-y border-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Mission Box */}
            <div className="p-8 rounded-xl bg-neutral-950 border border-neutral-850 text-start space-y-4">
              <div className="p-3 bg-amber-500/10 rounded-lg inline-block text-amber-500">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {t.about_mission_title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t.about_mission_desc}
              </p>
            </div>

            {/* Vision Box */}
            <div className="p-8 rounded-xl bg-neutral-950 border border-neutral-850 text-start space-y-4">
              <div className="p-3 bg-amber-500/10 rounded-lg inline-block text-amber-500">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {t.about_vision_title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t.about_vision_desc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">
            {language === 'ar' ? "مبادئ العمل لدينا" : "Core Values"}
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            {t.about_values_title}
          </h2>
          <p className="text-sm text-neutral-400">
            {language === 'ar' ? "مجموعة من الالتزامات الأخلاقية والفنية التي نوجه بها كافة مهندسينا وصباغينا" : "Stringent quality principles guiding our daily paint job and gypsum decoration on site"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-850 text-start space-y-3">
            <div className="text-amber-500"><Sparkles className="w-6 h-6" /></div>
            <h3 className="text-base font-bold text-white">{t.value_1_title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{t.value_1_desc}</p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-850 text-start space-y-3">
            <div className="text-amber-500"><Shield className="w-6 h-6" /></div>
            <h3 className="text-base font-bold text-white">{t.value_2_title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{t.value_2_desc}</p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-850 text-start space-y-3">
            <div className="text-amber-500"><Clock className="w-6 h-6" /></div>
            <h3 className="text-base font-bold text-white">{t.value_3_title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{t.value_3_desc}</p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-850 text-start space-y-3">
            <div className="text-amber-500"><HeartHandshake className="w-6 h-6" /></div>
            <h3 className="text-base font-bold text-white">{t.value_4_title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{t.value_4_desc}</p>
          </div>

        </div>
      </section>

    </div>
  );
};
