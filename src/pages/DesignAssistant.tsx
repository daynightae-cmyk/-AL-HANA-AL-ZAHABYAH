// src/pages/DesignAssistant.tsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { 
  Sparkles, 
  Paintbrush, 
  Layout, 
  Compass, 
  HelpCircle, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  Info, 
  FileText, 
  Trash2,
  Sliders,
  Maximize2
} from 'lucide-react';

interface AIRecommendation {
  colorPalette: string[];
  materials: string[];
  lightingTips: string;
  jotunCodes: string[];
  stylingAdvice: string;
}

export const DesignAssistantPage: React.FC = () => {
  const { language } = useApp();
  const [projectType, setProjectType] = useState('home-decoration');
  const [designStyle, setDesignStyle] = useState('neo-classic');
  const [mood, setMood] = useState('luxury-dark');
  const [budget, setBudget] = useState('premium');
  const [colors, setColors] = useState('');
  const [notes, setNotes] = useState('');
  
  // Image Upload state
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; preview: string }[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Recommendations state
  const [recommendations, setRecommendations] = useState<AIRecommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Generate recommendation on change of inputs
  useEffect(() => {
    generateInstantRecommendations();
  }, [projectType, designStyle, mood, budget]);

  const generateInstantRecommendations = () => {
    // Elegant client-side recommendation engine based on user selections
    let recs: AIRecommendation = {
      colorPalette: ['#D4AF37', '#1A1A1A', '#F8F5ED'],
      materials: ['Italian Marble', 'Brass Trim', 'Veined Quartz'],
      lightingTips: 'Layered warm ambient channels paired with 3000K spotlights.',
      jotunCodes: ['Jotun 1024 (Timeless)', 'Jotun 9918 (Classic White)'],
      stylingAdvice: 'Create balance with geometric plaster moldings on primary walls.'
    };

    if (designStyle === 'classic' || designStyle === 'neo-classic') {
      recs = {
        colorPalette: language === 'ar' 
          ? ['ذهبي كلاسيكي (AHZ-Gold)', 'أوف وايت فاخر', 'كابتشينو دافئ']
          : ['Gold Accents', 'Ivory / Off-white', 'Warm Cappuccino'],
        materials: language === 'ar'
          ? ['رخام كرارا إيطالي', 'إطارات خشبية مطلية بماء الذهب', 'أقمشة مخملية']
          : ['Carrara Italian Marble', 'Gold-leafed Wood Frames', 'Rich Velvet Textiles'],
        lightingTips: language === 'ar'
          ? 'ثريات كريستال مركزية مدعومة بإضاءة حائط دافئة مخفية بارتفاع 2.7 متر.'
          : 'Central crystal chandeliers supplemented by warm wall sconces at 2.7m height.',
        jotunCodes: ['Jotun 10341 (Limestone)', 'Jotun 1001 (Egg White)'],
        stylingAdvice: language === 'ar'
          ? 'استخدم إطارات الفوم بورد الكلاسيكية بارتفاعات متوازنة مع مرايا مشطوفة لزيادة الاتساع والعمق الجمالي.'
          : 'Utilize symmetrical wall molding layouts with custom antique mirrors to augment depth and classical proportions.'
      };
    } else if (designStyle === 'minimalist' || designStyle === 'scandinavian') {
      recs = {
        colorPalette: language === 'ar'
          ? ['أبيض مطفي ناصع', 'رمادي ترابي هادئ', 'لمسات من خشب البلوط الطبيعي']
          : ['Matte Pure White', 'Earthy Gray', 'Natural Oak Accents'],
        materials: language === 'ar'
          ? ['خشب بلوط طبيعي فاتح', 'خرسانة ناعمة الملمس', 'أقمشة كتان طبيعي']
          : ['Light Oak Wood', 'Microcement Surfaces', 'Unbleached Organic Linen'],
        lightingTips: language === 'ar'
          ? 'إضاءة طبيعية واسعة مع سبوت لايت مدمج مخفي تماماً بدرجة لون 3500K.'
          : 'Abundant daylighting combined with absolute flush-mount deep anti-glare downlights (3500K).',
        jotunCodes: ['Jotun 1624 (Skylight)', 'Jotun 1024 (Timeless)'],
        stylingAdvice: language === 'ar'
          ? 'ركز على تقليل قطع الأثاث غير الضرورية والاعتماد على الخزائن الجدارية المخفية التي تتطابق مع لون الجدران.'
          : 'Focus on clean vertical profiles and seamless full-height floor-to-ceiling cabinets matched precisely to the wall colors.'
      };
    } else if (designStyle === 'majlis' || designStyle === 'traditional') {
      recs = {
        colorPalette: language === 'ar'
          ? ['ذهبي الهنا الملكي', 'أحمر قرمزي دافئ', 'بني ملكي داكن']
          : ['Royal Gold Accent', 'Crimson Red', 'Royal Walnut Brown'],
        materials: language === 'ar'
          ? ['أخشاب محفورة يدوياً', 'نحاس دمشقي معتق', 'سجاد شرقي فاخر']
          : ['Hand-carved Teakwood', 'Aged Damascus Brass', 'Premium Handmade Silk Carpets'],
        lightingTips: language === 'ar'
          ? 'إضاءة غير مباشرة تحت المجالس الأرضية وجدران مزينة بسبوت لايت ثنائي الاتجاه.'
          : 'Under-seating linear LED glow paired with dual-emission decorative wall columns.',
        jotunCodes: ['Jotun 10678 (Space)', 'Jotun 1623 (Marrakesh)'],
        stylingAdvice: language === 'ar'
          ? 'نقوش جبسية مغربية أو أندلسية رقيقة حول الأسقف مع إنارة خفية دافئة بلون الشروق تعطي إحساساً ملكياً دافئاً.'
          : 'Incorporate intricate Islamic geometric patterns on false ceilings combined with rich amber linear lights for a majestic feel.'
      };
    } else {
      recs = {
        colorPalette: language === 'ar'
          ? ['ذهبي', 'رمادي داكن كوني', 'حجر ترافرتين']
          : ['Luxury Gold', 'Cosmic Charcoal', 'Travertine Gray'],
        materials: language === 'ar'
          ? ['رخام ترافرتين مفتوح العروق', 'شرائح معدنية مطلية بالذهب', 'أخشاب جوز مدخنة']
          : ['Open-pore Travertine Marble', 'Gold PVD Steel Channels', 'Smoked Dark Walnut Wood'],
        lightingTips: language === 'ar'
          ? 'إنارة مغناطيسية سوداء مدمجة في السقف (Magnetic Tracks) مع إنارة أرضية تصاعدية.'
          : 'Slim magnetic tracks recessed in matte black ceilings alongside architectural uplighting.',
        jotunCodes: ['Jotun 1141 (Natural Clay)', 'Jotun 9938 (Blackish)'],
        stylingAdvice: language === 'ar'
          ? 'امزج بديل الرخام اللامع ذو العروق الذهبية مع بديل الخشب العمودي لإعطاء تباين فاخر ومودرن للغاية.'
          : 'Contrast high-gloss bookmatched marble slabs with matte dark vertical louvers to create a striking contemporary wall focal point.'
      };
    }

    setRecommendations(recs);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      preview: URL.createObjectURL(file)
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate AI Generation
    setTimeout(() => {
      setIsGenerating(false);
      setSuccessMessage(true);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }, 1800);
  };

  return (
    <>
      <SEOHead
        title={language === 'ar' ? "مساعد التصميم الذكي بالذكاء الاصطناعي" : "AI Design Assistant Portal"}
        description={language === 'ar' ? "استخدم تجربة مساعد التصميم الذكي بالذكاء الاصطناعي لرفع المواصفات، وتنسيق الألوان، والحصول على التوجيه وخامات جوتن وماتريال مجاناً." : "Generate dynamic color schemes, material guidelines, Jotun codes, and custom layouts using our AI-guided assistant portal."}
      />
      <div className="pt-28 pb-20 min-h-screen bg-neutral-950 font-sans text-white relative overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Hero section */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-mono rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{language === 'ar' ? "تجربة ذكية تفاعلية" : "Interactive Smart Experience"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight">
              {language === 'ar' ? "مساعد التصميم الذكي" : "AI Design Assistant"}
            </h1>
            <p className="text-sm sm:text-base text-luxury-muted leading-relaxed">
              {language === 'ar'
                ? "صمم مساحتك، حدد ذوقك، ودع المساعد الذكي يطابق لك الخامات، ألوان جوتن المناسبة، والإنارة الهندسية بناءً على خياراتك وسرعة المعاينة."
                : "Input your spatial requirements, preferred style, and budget to instantly view expert color pairings, Jotun codes, material profiles, and lighting directions."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Input Form (Span 7) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="glass-panel p-6 sm:p-8 rounded-none border border-luxury-gold/15 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-luxury-gold/5 rounded-bl-full pointer-events-none"></div>
                
                <h2 className="text-lg font-serif font-bold text-luxury-gold border-l-2 border-luxury-gold pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pr-2 mb-6">
                  {language === 'ar' ? "مواصفات وتفضيلات مشروعك" : "Define Your Spatial Taste"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Project Type & Style */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 text-start">
                      <label className="text-xs uppercase font-semibold text-luxury-muted tracking-wider block">
                        {language === 'ar' ? "نوع المشروع" : "Project Type"}
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 p-3 text-xs rounded-none text-white focus:border-luxury-gold"
                      >
                        <option value="home-design">{language === 'ar' ? "التصميم المنزلي" : "Home Design"}</option>
                        <option value="home-paint">{language === 'ar' ? "دهانات المنازل" : "Home Paint"}</option>
                        <option value="home-decoration">{language === 'ar' ? "أعمال الديكور" : "Home Decoration"}</option>
                        <option value="home-renovation">{language === 'ar' ? "تجديد المنازل" : "Home Renovation"}</option>
                        <option value="villa-renovation">{language === 'ar' ? "تجديد الفلل" : "Villa Renovation"}</option>
                        <option value="commercial-decoration">{language === 'ar' ? "ديكور المشاريع التجارية" : "Commercial Decoration"}</option>
                      </select>
                    </div>

                    <div className="space-y-2 text-start">
                      <label className="text-xs uppercase font-semibold text-luxury-muted tracking-wider block">
                        {language === 'ar' ? "نمط التصميم المفضل" : "Preferred Style"}
                      </label>
                      <select
                        value={designStyle}
                        onChange={(e) => setDesignStyle(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 p-3 text-xs rounded-none text-white focus:border-luxury-gold"
                      >
                        <option value="modern">{language === 'ar' ? "حديث / مودرن" : "Modern / Contemporary"}</option>
                        <option value="classic">{language === 'ar' ? "كلاسيكي فاخر" : "Classic Luxury"}</option>
                        <option value="neo-classic">{language === 'ar' ? "نيو كلاسيك" : "Neo-Classic"}</option>
                        <option value="minimalist">{language === 'ar' ? "مينيماليست (بسيط)" : "Minimalist"}</option>
                        <option value="scandinavian">{language === 'ar' ? "اسكندنافي هادئ" : "Scandinavian"}</option>
                        <option value="majlis">{language === 'ar' ? "مجلس عربي تقليدي" : "Traditional Majlis"}</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Mood & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 text-start">
                      <label className="text-xs uppercase font-semibold text-luxury-muted tracking-wider block">
                        {language === 'ar' ? "الأجواء والمزاج اللوني" : "Ambience & Mood"}
                      </label>
                      <select
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 p-3 text-xs rounded-none text-white focus:border-luxury-gold"
                      >
                        <option value="luxury-dark">{language === 'ar' ? "مظلم وفخم (أسود وذهبي)" : "Dark & Luxurious (Black/Gold)"}</option>
                        <option value="bright-airy">{language === 'ar' ? "مشرق ومفتوح (أوف وايت)" : "Bright & Airy (Off-whites)"}</option>
                        <option value="warm-cozy">{language === 'ar' ? "دافئ ومريح (بيج وبني)" : "Warm & Cozy (Beige/Earth)"}</option>
                        <option value="bold-colorful">{language === 'ar' ? "جريء وملون" : "Bold & Expressive"}</option>
                        <option value="neutral-calming">{language === 'ar' ? "حيادي وهادئ" : "Neutral & Calming"}</option>
                      </select>
                    </div>

                    <div className="space-y-2 text-start">
                      <label className="text-xs uppercase font-semibold text-luxury-muted tracking-wider block">
                        {language === 'ar' ? "فئة الميزانية المتوقعة" : "Expected Budget Category"}
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 p-3 text-xs rounded-none text-white focus:border-luxury-gold"
                      >
                        <option value="economy">{language === 'ar' ? "اقتصادية وعملية" : "Economy / Budget-safe"}</option>
                        <option value="standard">{language === 'ar' ? "قياسية / جودة متوازنة" : "Standard Premium Quality"}</option>
                        <option value="premium">{language === 'ar' ? "فاخرة / تفصيل خاص ورخام" : "Ultra Luxury / Bespoke & Marble"}</option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Color Palette & Extra Description */}
                  <div className="space-y-2 text-start">
                    <label className="text-xs uppercase font-semibold text-luxury-muted tracking-wider block">
                      {language === 'ar' ? "ألوان تفضلها بالتحديد (مثال: ذهبي، أزرق كحلي)" : "Specific Colors You Love (e.g. Navy, Sand Gold)"}
                    </label>
                    <input
                      type="text"
                      value={colors}
                      onChange={(e) => setColors(e.target.value)}
                      placeholder={language === 'ar' ? "تفضيلاتك الخاصة بالألوان..." : "Specify custom shades..."}
                      className="w-full bg-neutral-900 border border-white/10 p-3 text-xs rounded-none text-white focus:border-luxury-gold"
                    />
                  </div>

                  <div className="space-y-2 text-start">
                    <label className="text-xs uppercase font-semibold text-luxury-muted tracking-wider block">
                      {language === 'ar' ? "صف ما تتمنى تحقيقه في هذه المساحة" : "Describe what you wish to achieve"}
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      placeholder={language === 'ar' ? "أبعاد الغرفة، استخدامها، الطابع الخاص..." : "Write down space dimensions, specific ideas, curtain ideas..."}
                      className="w-full bg-neutral-900 border border-white/10 p-3 text-xs rounded-none text-white focus:border-luxury-gold"
                    />
                  </div>

                  {/* Drag and Drop Image upload area */}
                  <div className="space-y-3 text-start">
                    <label className="text-xs uppercase font-semibold text-luxury-muted tracking-wider block">
                      {language === 'ar' ? "أرفق صوراً للمساحة الحالية أو الهاماً بصرياً" : "Upload existing layouts or inspiration images"}
                    </label>
                    
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed p-6 text-center transition-all cursor-pointer relative ${
                        isDragOver ? 'border-luxury-gold bg-luxury-gold/5' : 'border-white/10 bg-black/40 hover:border-luxury-gold/35'
                      }`}
                      onClick={() => document.getElementById('ai-file-input')?.click()}
                    >
                      <input
                        type="file"
                        id="ai-file-input"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Upload className="w-8 h-8 text-luxury-gold mx-auto mb-2 animate-pulse" />
                      <p className="text-xs font-semibold text-luxury-offwhite">
                        {language === 'ar' ? "اسحب الملفات وأفلتها هنا أو اضغط للتصفح" : "Drag & drop image files here, or click to browse"}
                      </p>
                      <p className="text-[10px] text-neutral-500 mt-1">
                        {language === 'ar' ? "يدعم ملفات JPG, PNG حتى حجم 10 ميغابايت" : "Supports JPG, PNG up to 10MB per file"}
                      </p>
                    </div>

                    {/* Previews of uploaded files */}
                    {uploadedFiles.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3">
                        {uploadedFiles.map((file, idx) => (
                          <div key={idx} className="relative p-2 bg-neutral-900 border border-white/10 rounded-none flex items-center gap-2 group">
                            <img src={file.preview} alt="Preview" className="w-10 h-10 object-cover shrink-0" />
                            <div className="min-w-0 flex-1 text-left">
                              <p className="text-[10px] text-white truncate font-semibold">{file.name}</p>
                              <p className="text-[9px] text-neutral-500 font-mono">{file.size}</p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(idx);
                              }}
                              className="text-red-500 hover:text-red-600 transition-colors shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit buttons / TODO and DB labels */}
                  <div className="pt-4 border-t border-white/5 space-y-4">
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full py-3.5 bg-gradient-to-r from-luxury-gold to-yellow-600 hover:brightness-110 text-neutral-950 text-xs uppercase font-bold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                          <span>{language === 'ar' ? "يرجى الانتظار..." : "Analyzing Concept..."}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-neutral-950" />
                          <span>{language === 'ar' ? "احفظ التفضيلات وقدم الطلب" : "Submit Plan to Interior Team"}</span>
                        </>
                      )}
                    </button>

                    <p className="text-[9px] text-neutral-500 font-mono text-center">
                      {language === 'ar'
                        ? "/* ملاحظة: سيتم دمج هذا النموذج مع قاعدة بيانات Supabase وSupabase Storage لرفع وحفظ عينات التصاميم */"
                        : "/* TODO: Connect this with Supabase DB & Storage buckets to persist client style matrices dynamically */"}
                    </p>
                  </div>

                </form>
              </div>

              {/* Success Notification */}
              {successMessage && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-none text-start flex items-start gap-3 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">
                      {language === 'ar' ? "تم حفظ تفضيلات التصميم بنجاح!" : "Preferences Saved Successfully!"}
                    </h3>
                    <p className="text-xs text-neutral-300">
                      {language === 'ar'
                        ? "شكراً لك. تم إرسال ملف التصميم ومزيج الألوان والملفات إلى مهندس الديكور المشرف. سيتصل بك مهندسنا للمطابقة في المعاينة."
                        : "Our lead architects have received your spatial metrics and uploaded reference files. We will carry these exact Jotun swatches during your site visit."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Dynamic Recommendation Engine (Span 5) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="glass-panel p-6 rounded-none border border-luxury-gold/20 relative bg-neutral-950">
                <div className="absolute top-0 left-0 w-2 h-full bg-luxury-gold"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <Sliders className="w-5 h-5 text-luxury-gold" />
                  <h3 className="text-base font-serif font-bold text-luxury-offwhite">
                    {language === 'ar' ? "توجيهات الهنا الذكية الفورية" : "Al Hana Architectural Advice"}
                  </h3>
                </div>

                {recommendations ? (
                  <div className="space-y-6 text-start">
                    
                    {/* Color Swatch Display */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold font-bold">
                        {language === 'ar' ? "لوحة الألوان المقترحة" : "Recommended Palette"}
                      </span>
                      <div className="flex items-center gap-3 pt-1">
                        {recommendations.colorPalette.map((color, i) => (
                          <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                            <div className="w-full h-12 border border-white/10 rounded-none shadow" style={{ backgroundColor: i === 0 ? '#D4AF37' : i === 1 ? '#F8F5ED' : '#2C2A29' }}></div>
                            <span className="text-[9px] font-mono text-neutral-400 truncate w-full text-center">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Jotun Codes */}
                    <div className="space-y-2 border-t border-white/5 pt-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold font-bold flex items-center gap-1.5">
                        <Paintbrush className="w-3.5 h-3.5" />
                        {language === 'ar' ? "أكواد دهانات جوتن الموصى بها" : "Jotun Paints Codes"}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {recommendations.jotunCodes.map((code, i) => (
                          <div key={i} className="p-2 bg-black/40 border border-white/5 text-[11px] font-mono text-neutral-300">
                            ✓ {code}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Materials Swatch */}
                    <div className="space-y-2 border-t border-white/5 pt-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold font-bold flex items-center gap-1.5">
                        <Layout className="w-3.5 h-3.5" />
                        {language === 'ar' ? "الخامات والكسوات المناسبة" : "Suggested Material Claddings"}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {recommendations.materials.map((mat, i) => (
                          <span key={i} className="px-2.5 py-1 bg-white/5 text-luxury-muted text-[10px] font-bold border border-white/10">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Lighting Tips */}
                    <div className="space-y-2 border-t border-white/5 pt-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold font-bold flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        {language === 'ar' ? "توزيع الإضاءة وتفاصيل التأسيس" : "Lighting Distribution Specs"}
                      </span>
                      <p className="text-xs text-neutral-300 leading-relaxed bg-[#0d0d0d] p-3 border-l border-luxury-gold font-mono">
                        {recommendations.lightingTips}
                      </p>
                    </div>

                    {/* Styling Advice */}
                    <div className="space-y-2 border-t border-white/5 pt-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {language === 'ar' ? "توجيهات معمارية وتفاصيل السقف" : "Architectural Advice"}
                      </span>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {recommendations.stylingAdvice}
                      </p>
                    </div>

                  </div>
                ) : (
                  <div className="py-20 text-center space-y-2">
                    <Sparkles className="w-8 h-8 text-neutral-600 mx-auto animate-spin" />
                    <p className="text-xs text-neutral-500">
                      {language === 'ar' ? "جاري تنسيق الألوان والخامات..." : "Synthesizing recommendations..."}
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ help card */}
              <div className="glass-panel p-5 border border-white/5 text-start space-y-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-luxury-gold shrink-0" />
                  <h4 className="text-xs uppercase font-serif font-bold text-luxury-offwhite">
                    {language === 'ar' ? "كيف تعمل التوصيات؟" : "How are swatches generated?"}
                  </h4>
                </div>
                <p className="text-[11px] text-luxury-muted leading-relaxed">
                  {language === 'ar'
                    ? "يقوم مهندسونا ببرمجة قواعد التصميم الداخلي المعتمدة في الإمارات لمطابقة ذوق العميل، اختيار ألوان دهانات جوتن، وتوجيهات الإضاءة المخفية ونوع الجبس مجاناً ومباشرة."
                    : "Our dynamic framework cross-references classical, minimalist, and majlis spatial rules alongside Jotun Silk paints matching actual UAE humidity levels to provide instant direction."}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};
