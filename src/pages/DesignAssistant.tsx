// src/pages/DesignAssistant.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Maximize2,
  MapPin
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

  // UAE Trends Feed state
  const [trends, setTrends] = useState<any[]>([]);
  const [loadingTrends, setLoadingTrends] = useState(true);

  // Style Finder Quiz State
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizResult, setQuizResult] = useState<{
    style: string;
    styleAr: string;
    description: string;
    descriptionAr: string;
    colors: string;
    notes: string;
    materials: string[];
    materialsAr: string[];
    recommendedPackage: { name_en: string; name_ar: string; price: string; link: string };
  } | null>(null);

  const determineQuizResult = (q1: string, q2: string, q3: string) => {
    let style = 'Modern Luxury';
    let styleAr = 'مودرن فاخر';
    let description = 'A sleek, contemporary layout incorporating continuous linear LEDs, high-contrast dark marbles, and premium PVD metal features.';
    let descriptionAr = 'تصميم مودرن معاصر يعتمد على قنوات الإضاءة المغناطيسية، والرخام الداكن الفاخر، واللمسات المعدنية المصقولة.';
    let colorsStr = '#1C1C1C, #D4AF37, #EAE6DF';
    let materials = ['Calacatta Gold Quartz', 'Smoked Walnut Veneer', 'Brushed Bronze'];
    let materialsAr = ['رخام كلكتا غولد', 'قشرة خشب الجوز المدخن', 'برونز مصقول'];
    let recommendedPackage = {
      name_en: 'Golden 3D Premium Package',
      name_ar: 'الباقة الذهبية ثلاثية الأبعاد',
      price: '9,999 AED',
      link: '/services'
    };

    if (q1 === 'paint-only') {
      if (q2 === 'luxury-gold') {
        style = 'Neo-Classic Decorative Paints';
        styleAr = 'أصباغ نيو كلاسيك الديكورية';
        description = 'Elegant classical tones paired with luxurious velvet stucco texture, perfect for majlises and master rooms.';
        descriptionAr = 'تدرجات كلاسيكية راقية مدمجة بدهانات الستوكو المخملية والمارمو الإيطالي، مثالية للمجالس وغرف النوم الرئيسية.';
        colorsStr = '#F5F2EB, #D4AF37, #8B7D6B';
        materials = ['Italian Velvet Stucco', 'Gold Leaf Accents', 'Satin Trim'];
        materialsAr = ['دهان ستوكو مخملي إيطالي', 'لمسات ورق الذهب', 'إطارات ساتان'];
        recommendedPackage = {
          name_en: 'Royal Decorative Paints Package',
          name_ar: 'باقة الدهانات الديكورية واللمسات الملكية',
          price: '5,500 AED',
          link: '/services'
        };
      } else {
        style = 'Classic Minimalist Solid Paints';
        styleAr = 'أصباغ الجدران الكلاسيكية الهادئة';
        description = 'Clean, highly durable solid colors utilizing premium moisture-resistant Jotun Silk paints.';
        descriptionAr = 'دهانات جدارية صلبة ومقاومة للرطوبة من تشكيلة جوتن الفاخرة، تمنح المكان اتساعاً ونظافة تامة.';
        colorsStr = '#F5F2EB, #D2B48C, #1024 (Timeless)';
        materials = ['Jotun Phenom Silk', 'Wall Smoothing Fillers', 'Fungus Resistant Primers'];
        materialsAr = ['أصباغ جوتن حريرية', 'معجون تنعيم جدران ممتاز', 'بادئ مقاوم للفطريات والرطوبة'];
        recommendedPackage = {
          name_en: 'Classic Paints Package',
          name_ar: 'باقة الدهانات الكلاسيكية',
          price: '2,500 AED',
          link: '/services'
        };
      }
    } else if (q1 === 'concept-3d') {
      style = 'Photorealistic 3D Concept Studio';
      styleAr = 'استوديو التصميم ثلاثي الأبعاد والواقعي';
      description = 'Full-scale spatial planning with photorealistic renders, 360 panoramic views, and coordinated materials boards.';
      descriptionAr = 'مخططات وتوزيع معمارية كاملة مع رندرات ثلاثية الأبعاد واقعية، لقطات 360 درجة، ومطابقة دقيقة لكافة الخامات.';
      colorsStr = '#D4AF37, #F5F2EB, #1A1A1A';
      materials = ['3D Architectural Render', 'Interactive Moodboard', 'AutoCad Space Layout'];
      materialsAr = ['لقطات ثلاثية الأبعاد', 'لوحة إلهام تفاعلية', 'مخططات أوتوكاد للمساحة'];
      recommendedPackage = {
        name_en: 'Golden 3D Premium Package',
        name_ar: 'الباقة الذهبية ثلاثية الأبعاد',
        price: '9,999 AED',
        link: '/services'
      };
    } else {
      // design-build
      if (q2 === 'luxury-gold') {
        style = 'Neo-Classic Golden Luxury';
        styleAr = 'نيو كلاسيك ذهبي ملكي';
        description = 'Stately architectural styling utilizing classic polyurethane moldings, warm LEDs, and elegant marble surfaces.';
        descriptionAr = 'تصميم كلاسيكي مدمج بأحدث اللمسات، يشمل إطارات الفوم بورد، وأسقف الجبس مع دمج قنوات الإضاءة الدافئة.';
        colorsStr = '#D4AF37, #F8F5ED, #4A4A4A';
        materials = ['Carrara Italian Marble', 'Polyurethane Panels', 'Hidden 3000K LED'];
        materialsAr = ['رخام كرارا إيطالي', 'إطارات فوم كلاسيكية', 'إنارة ليد مخفية 3000K'];
        recommendedPackage = {
          name_en: 'Classic Gypsum & Ceilings Package',
          name_ar: 'ديكور الصالات الكلاسيكية والجبس',
          price: '7,500 AED',
          link: '/services'
        };
      } else if (q2 === 'earthy-minimal') {
        style = 'Minimalist Sand Oasis';
        styleAr = 'واحة الرمال المينيماليست الهادئة';
        description = 'Embracing natural daylight, raw travertine texture, organic wooden panels, and understated modern elegance.';
        descriptionAr = 'نمط يعتمد على الحجر الطبيعي غير المصقول كالترافرتين، وخشب البلوط الفاتح، والكتان ليعطي شعوراً هادئاً كواحة رملية.';
        colorsStr = '#F5F2EB, #D2B48C, #8B7D6B';
        materials = ['Travertine Stone', 'Raw Linen Textile', 'Bleached Oak Cladding'];
        materialsAr = ['حجر ترافرتين طبيعي', 'منسوجات الكتان العضوي', 'خشب بلوط مبيض'];
        recommendedPackage = {
          name_en: 'Silver Design Package',
          name_ar: 'الباقة الفضية للتصميم',
          price: '4,999 AED',
          link: '/services'
        };
      } else {
        style = 'Contemporary Bold Luxury';
        styleAr = 'تصميم معاصر كوني جريء';
        description = 'High contrast dark stone, continuous magnetic track lighting, smoked walnut wood paneling, and brushed brass details.';
        descriptionAr = 'ألوان داكنة جريئة ومتباينة مع مسارات إضاءة مغناطيسية بالكامل، خشب الجوز المدخن الفاخر، ولمسات برونزية.';
        colorsStr = '#1C1C1C, #9C7A3C, #4A4A4A';
        materials = ['Smoked Walnut Veneer', 'PVD Gold Stainless Steel', 'Recessed Magnetic LED Track'];
        materialsAr = ['قشرة خشب الجوز المدخن', 'ستانلس ستيل ذهبي PVD', 'مسار إضاءة مغناطيسي ليد'];
        recommendedPackage = {
          name_en: 'Golden 3D Premium Package',
          name_ar: 'الباقة الذهبية ثلاثية الأبعاد',
          price: '9,999 AED',
          link: '/services'
        };
      }
    }

    return {
      style,
      styleAr,
      description,
      descriptionAr,
      colors: colorsStr,
      notes: `Recommended style: "${style}" with key materials ${materials.join(', ')}.`,
      materials,
      materialsAr,
      recommendedPackage
    };
  };

  const handleSelectQuizOption = (stepIdx: number, val: string) => {
    setQuizAnswers(prev => {
      const updated = { ...prev, [stepIdx]: val };
      
      // If it's the last step (step 2, which is 3rd question), compute results!
      if (stepIdx === 2) {
        const result = determineQuizResult(updated[0], updated[1], val);
        setQuizResult(result);
        localStorage.setItem('ahz_style_finder_result', JSON.stringify(result));
      }
      return updated;
    });

    if (stepIdx < 2) {
      setCurrentQuizStep(stepIdx + 1);
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setCurrentQuizStep(0);
    setQuizResult(null);
    localStorage.removeItem('ahz_style_finder_result');
  };

  const applyQuizToConfigurator = () => {
    if (!quizResult) return;
    
    // Map quiz result to configuration states
    if (quizResult.style.includes('Paints') || quizResult.style.includes('Solid')) {
      setProjectType('home-paint');
    } else if (quizResult.style.includes('Concept')) {
      setProjectType('home-design');
    } else {
      setProjectType('home-decoration');
    }

    if (quizResult.style.includes('Classic') || quizResult.style.includes('Neo')) {
      setDesignStyle('neo-classic');
      setMood('luxury-dark');
    } else if (quizResult.style.includes('Minimalist') || quizResult.style.includes('Sand')) {
      setDesignStyle('minimalist');
      setMood('neutral-calming');
    } else {
      setDesignStyle('modern');
      setMood('luxury-dark');
    }

    setColors(quizResult.colors);
    setNotes(`Applied style preference "${quizResult.style}" from Style Finder quiz result. Materials recommended: ${quizResult.materials.join(', ')}.`);
    
    // Scroll to the configurator form
    const formElement = document.getElementById('configurator-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Persist general configurator form states in localStorage
  useEffect(() => {
    const config = {
      projectType,
      designStyle,
      mood,
      budget,
      colors,
      notes
    };
    localStorage.setItem('ahz_design_assistant_config', JSON.stringify(config));
  }, [projectType, designStyle, mood, budget, colors, notes]);

  // AI Moodboard Generator State
  const [moodboardPrompt, setMoodboardPrompt] = useState('Modern Gold Luxury');
  const [isGeneratingMoodboard, setIsGeneratingMoodboard] = useState(false);
  const [moodboardResult, setMoodboardResult] = useState<any>(null);

  const generateMoodboard = () => {
    setIsGeneratingMoodboard(true);
    setTimeout(() => {
      const promptLower = moodboardPrompt.toLowerCase();
      let res = {
        prompt: moodboardPrompt || 'Custom Elite Vibe',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        palette: ['#C5A059', '#1A1A1A', '#F0EBE1', '#4A4A4A'],
        materials: ['Calacatta Gold Quartz', 'Smoked Walnut Veneer', 'Brushed Bronze'],
        lighting: '3000K Technical Downlights'
      };

      if (promptLower.includes('gold') || promptLower.includes('luxury') || promptLower.includes('modern')) {
        res = {
          prompt: moodboardPrompt || 'Modern Gold Luxury',
          image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
          palette: ['#D4AF37', '#1C1C1C', '#EAE6DF', '#9C7A3C'],
          materials: ['White Carrara Marble', 'Brushed Brass', 'Velvet Trim'],
          lighting: 'Warm 2700K Indirect Led Lines'
        };
      } else if (promptLower.includes('beige') || promptLower.includes('minimalist') || promptLower.includes('sand') || promptLower.includes('cream')) {
        res = {
          prompt: moodboardPrompt || 'Minimalist Beige',
          image: 'https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?auto=format&fit=crop&w=800&q=80',
          palette: ['#F5F2EB', '#D2B48C', '#E5DCD3', '#8B7D6B'],
          materials: ['Travertine Stone', 'Raw Linen', 'Bleached Oak Wood'],
          lighting: 'Natural Daylight with 3000K Accent Spotlights'
        };
      } else if (promptLower.includes('emerald') || promptLower.includes('majlis') || promptLower.includes('dark') || promptLower.includes('classic')) {
        res = {
          prompt: moodboardPrompt || 'Luxury Dark Majlis',
          image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
          palette: ['#0B3C2A', '#E3C16F', '#2C2C2C', '#F7F5F0'],
          materials: ['Green Onyx Marble', 'Gold Foiled Molding', 'Rich Satin Silk'],
          lighting: 'Grand Crystal Chandelier with Warm Sconces'
        };
      }

      setMoodboardResult(res);
      setIsGeneratingMoodboard(false);
    }, 1500);
  };

  useEffect(() => {
    fetch('/api/trends')
      .then(res => res.json())
      .then(data => {
        if (data && data.trends) {
          setTrends(data.trends);
        }
        setLoadingTrends(false);
      })
      .catch(err => {
        console.error("Failed to load trends:", err);
        setLoadingTrends(false);
      });
  }, []);

  const applyTrend = (trend: any) => {
    const titleLower = trend.title.toLowerCase();
    if (titleLower.includes('classic') || titleLower.includes('majlis')) {
      setDesignStyle('classic');
      setMood('luxury-dark');
    } else if (titleLower.includes('minimalist') || titleLower.includes('sand') || titleLower.includes('oasis') || titleLower.includes('cozy')) {
      setDesignStyle('minimalist');
      setMood('neutral-calming');
    } else if (titleLower.includes('brutalism') || titleLower.includes('concrete') || titleLower.includes('desert')) {
      setDesignStyle('modern');
      setMood('luxury-dark');
    } else {
      setDesignStyle('modern');
      setMood('bright-airy');
    }
    setColors(trend.colors.join(', ') + ' (' + trend.jotunColors.join(', ') + ')');
    setNotes(`Inspired by UAE Luxury Trend: "${trend.title}" popular in ${trend.location}.\nDescription: ${trend.description}\nMaterials: ${trend.materials.join(', ')}.`);
    
    // Smooth scroll to the form panel
    const formElement = document.getElementById('configurator-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

          {/* AI-Powered UAE Luxury Trends Feed */}
          <div className="mb-14 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-luxury-gold animate-pulse" />
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                  {language === 'ar' ? "اتجاهات التصميم الفاخر في الإمارات" : "UAE Luxury Interior Trends Feed"}
                </h2>
              </div>
              <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest bg-luxury-gold/10 px-2.5 py-0.5 rounded-full font-bold">
                {language === 'ar' ? "تحديث حي بالذكاء الاصطناعي" : "AI-Powered Live Feed"}
              </span>
            </div>

            {loadingTrends ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="glass-panel p-5 rounded-none border border-white/5 animate-pulse space-y-4">
                    <div className="h-4 bg-neutral-900 w-3/4"></div>
                    <div className="h-10 bg-neutral-900 w-full"></div>
                    <div className="flex gap-2">
                      <div className="h-5 w-5 rounded-full bg-neutral-900"></div>
                      <div className="h-5 w-5 rounded-full bg-neutral-900"></div>
                      <div className="h-5 w-5 rounded-full bg-neutral-900"></div>
                    </div>
                    <div className="h-8 bg-neutral-900 w-full pt-1"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trends.map((trend, idx) => (
                  <div 
                    key={idx}
                    className="glass-panel p-5 rounded-none border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all flex flex-col justify-between space-y-4 bg-gradient-to-b from-neutral-950 to-black relative group"
                  >
                    <div className="absolute top-0 right-0 w-2 h-2 bg-luxury-gold/20"></div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-luxury-gold font-bold uppercase tracking-wider flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-luxury-gold" />
                          {trend.location}
                        </span>
                      </div>
                      <h3 className="text-sm font-serif font-bold text-luxury-offwhite group-hover:text-luxury-gold transition-colors text-start">
                        {trend.title}
                      </h3>
                      <p className="text-[11px] text-neutral-400 leading-relaxed text-start">
                        {trend.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/5 text-start">
                      <div className="space-y-1">
                        <span className="text-[9px] text-neutral-500 font-mono block uppercase">Curated Shades:</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {trend.colors && trend.colors.map((color: string, cIdx: number) => (
                            <div key={cIdx} className="flex items-center gap-1 bg-white/5 pr-1.5 py-0.5 rounded-full">
                              <div className="w-3.5 h-3.5 rounded-full border border-white/10 shrink-0" style={{ backgroundColor: color }}></div>
                              <span className="text-[8px] font-mono text-neutral-400">{color}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] text-neutral-500 font-mono block uppercase">Materials:</span>
                        <div className="flex flex-wrap gap-1">
                          {trend.materials && trend.materials.map((mat: string, mIdx: number) => (
                            <span key={mIdx} className="text-[9px] px-1.5 py-0.5 bg-neutral-900 border border-white/5 text-neutral-300 font-sans">
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] text-neutral-500 font-mono block uppercase">Jotun Swatches:</span>
                        <div className="text-[10px] font-mono text-luxury-gold/90 font-bold">
                          {trend.jotunColors && trend.jotunColors.join(' & ')}
                        </div>
                      </div>

                      <div className="text-[10px] italic text-neutral-500 font-serif pt-1">
                        "{trend.popularity}"
                      </div>
                    </div>

                    <button
                      onClick={() => applyTrend(trend)}
                      className="w-full py-2 bg-white/5 hover:bg-luxury-gold hover:text-neutral-950 border border-white/10 hover:border-luxury-gold text-neutral-300 text-[10px] uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                    >
                      <span>{language === 'ar' ? "تطبيق النمط على الموزع" : "Apply to Configurator"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Style Finder Quiz Section */}
          <div className="mb-14 glass-panel p-6 sm:p-8 rounded-none border border-luxury-gold/25 relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-start">
            {/* Elegant corner accents */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-luxury-gold/50"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-luxury-gold/50"></div>
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-luxury-gold/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-5 border-b border-white/5 mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-luxury-gold animate-pulse" />
                  <h2 className="text-xl font-serif font-bold text-white tracking-wide">
                    {language === 'ar' ? "الباحث التفاعلي عن الأسلوب" : "Interactive Design Style Finder"}
                  </h2>
                </div>
                <p className="text-xs text-neutral-400">
                  {language === 'ar' 
                    ? "أجب عن 3 أسئلة سريعة لنقوم بتحليل ذوقك المعماري ومطابقته مع أفضل باقات الخدمات والخامات المناسبة لك." 
                    : "Answer 3 quick questions to analyze your spatial design preference and get recommended service packages."}
                </p>
              </div>
              
              {!quizActive && !quizResult && (
                <button
                  onClick={() => setQuizActive(true)}
                  className="px-6 py-2.5 bg-luxury-gold hover:bg-yellow-500 text-neutral-950 font-extrabold font-mono text-xs uppercase tracking-wider transition-all shadow-md shadow-luxury-gold/10 cursor-pointer"
                >
                  {language === 'ar' ? "ابدأ الاختبار الآن" : "Start Style Quiz"}
                </button>
              )}
            </div>

            {quizActive && !quizResult && (
              <div className="space-y-6">
                {/* Progress tracker */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-luxury-gold font-bold uppercase">
                    {language === 'ar' ? `السؤال ${currentQuizStep + 1} من 3` : `Question ${currentQuizStep + 1} of 3`}
                  </span>
                  <span className="text-neutral-500">
                    {Math.round(((currentQuizStep) / 3) * 100)}% {language === 'ar' ? "مكتمل" : "Completed"}
                  </span>
                </div>
                
                <div className="w-full h-1 bg-neutral-900 border border-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-luxury-gold to-yellow-600 transition-all duration-500"
                    style={{ width: `${((currentQuizStep) / 3) * 100}%` }}
                  ></div>
                </div>

                {/* Render current question */}
                {currentQuizStep === 0 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-sm sm:text-base font-serif font-bold text-neutral-200">
                      {language === 'ar' ? "1. ما هو هدفك الأساسي من هذا المشروع؟" : "1. What is your primary project goal?"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          value: 'design-build',
                          title_en: "Luxury Renovation & Decoration",
                          title_ar: "تجديد وديكورات فاخرة",
                          desc_en: "Bespoke ceilings, custom woodworks, and professional space planning.",
                          desc_ar: "تشمل تركيب أسقف جبس بورد، أعمال خشبية مخصصة، وإعادة تخطيط وتأثيث بالكامل."
                        },
                        {
                          value: 'paint-only',
                          title_en: "Premium Paint & Finishes",
                          title_ar: "أصباغ جدران ودهانات ديكورية",
                          desc_en: "High-quality Jotun solid colors or customized textured stucco finishes.",
                          desc_ar: "تطبيق دهانات صلبة أصلية أو لمسات فنية كالستوكو المخملي والمارمو الجداري."
                        },
                        {
                          value: 'concept-3d',
                          title_en: "3D Photorealistic Concept",
                          title_ar: "مخططات وتصاميم ثلاثية الأبعاد",
                          desc_en: "Visualizing layout renders and materials specifications prior to physical works.",
                          desc_ar: "تجهيز رندرات واقعية بجودة متناهية لتتخيل بيتك تماماً قبل البدء الفعلي بأي أعمال."
                        }
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectQuizOption(0, opt.value)}
                          className={`p-5 text-start border transition-all hover:bg-white/5 group relative rounded-none flex flex-col justify-between h-40 ${
                            quizAnswers[0] === opt.value ? 'border-luxury-gold bg-luxury-gold/5' : 'border-white/10 bg-black/40'
                          }`}
                        >
                          <div className="space-y-2">
                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-luxury-gold transition-colors">
                              {language === 'ar' ? opt.title_ar : opt.title_en}
                            </h4>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">
                              {language === 'ar' ? opt.desc_ar : opt.desc_en}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest mt-2 block">
                            {language === 'ar' ? "اختر" : "Select"} →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentQuizStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-sm sm:text-base font-serif font-bold text-neutral-200">
                      {language === 'ar' ? "2. ما هي الأجواء الجمالية التي تصف رؤيتك للمكان؟" : "2. Which aesthetic atmosphere represents your vision?"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          value: 'luxury-gold',
                          title_en: "Neo-Classic Luxury & Gold Trims",
                          title_ar: "فخامة كلاسيكية وتفاصيل مذهبة",
                          desc_en: "Symmetrical moldings, rich velvet textures, and warm marble surfaces.",
                          desc_ar: "إطارات جدارية متوازنة، ولمسات معدنية مطلية بالذهب، مع أقمشة مخملية فخمة."
                        },
                        {
                          value: 'earthy-minimal',
                          title_en: "Earthy Sands & Warm Wood Minimalist",
                          title_ar: "ألوان رملية دافئة وبساطة عصرية",
                          desc_en: "Raw travertine stone textures, organic unbleached linen, and light oaks.",
                          desc_ar: "حجر طبيعي ناعم (ترافرتين)، خشب بلوط مبيض، وبساطة متناهية تعتمد على الضوء الطبيعي."
                        },
                        {
                          value: 'modern-contrast',
                          title_en: "Cosmic Charcoal & Contemporary Contrast",
                          title_ar: "رمادي كوني داكن وجريء",
                          desc_en: "High-contrast dark stone textures, continuous magnetic LED tracks, and smoked walnut.",
                          desc_ar: "تداخل لافت لدرجات الرخام الأسود والرمادي الداكن مع مسارات إضاءة مغناطيسية مخفية."
                        }
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectQuizOption(1, opt.value)}
                          className={`p-5 text-start border transition-all hover:bg-white/5 group relative rounded-none flex flex-col justify-between h-40 ${
                            quizAnswers[1] === opt.value ? 'border-luxury-gold bg-luxury-gold/5' : 'border-white/10 bg-black/40'
                          }`}
                        >
                          <div className="space-y-2">
                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-luxury-gold transition-colors">
                              {language === 'ar' ? opt.title_ar : opt.title_en}
                            </h4>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">
                              {language === 'ar' ? opt.desc_ar : opt.desc_en}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest mt-2 block">
                            {language === 'ar' ? "اختر" : "Select"} →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentQuizStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-sm sm:text-base font-serif font-bold text-neutral-200">
                      {language === 'ar' ? "3. ما هي الميزانية التقريبية التي تفضلها للتشطيب؟" : "3. What is your preferred budget & execution scope?"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          value: 'budget-basic',
                          title_en: "Economy & High Efficiency",
                          title_ar: "اقتصادي وفعال للغاية",
                          desc_en: "Solid high-durability finishes with clean work practices and cost control.",
                          desc_ar: "دهانات جدارية نظيفة وصلبة بجودة أصيلة وسعر اقتصادي ومدروس يناسب الميزانية."
                        },
                        {
                          value: 'budget-premium',
                          title_en: "Bespoke Premium Custom",
                          title_ar: "مخصص ومميز جداً (بريميوم)",
                          desc_en: "Layered lighting channels, customized textured paints, and custom wall panels.",
                          desc_ar: "إضاءات مخفية، درجات دهان ديكورية متميزة كالمارمو والستوكو، وإطارات فوم مخصصة."
                        },
                        {
                          value: 'budget-royal',
                          title_en: "Royal Opulence & Custom Materials",
                          title_ar: "ملكـي فاخر بلا تنازلات",
                          desc_en: "Full photorealistic 3D rendering, custom PVD gold trims, and daily expert supervision.",
                          desc_ar: "تصاميم ثلاثية الأبعاد واقعية، ستانلس ستيل ذهبي فاخر، وإشراف هندسي يومي دقيق لضمان الكمال."
                        }
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectQuizOption(2, opt.value)}
                          className={`p-5 text-start border transition-all hover:bg-white/5 group relative rounded-none flex flex-col justify-between h-40 ${
                            quizAnswers[2] === opt.value ? 'border-luxury-gold bg-luxury-gold/5' : 'border-white/10 bg-black/40'
                          }`}
                        >
                          <div className="space-y-2">
                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-luxury-gold transition-colors">
                              {language === 'ar' ? opt.title_ar : opt.title_en}
                            </h4>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">
                              {language === 'ar' ? opt.desc_ar : opt.desc_en}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest mt-2 block">
                            {language === 'ar' ? "اختر" : "Select"} →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back control */}
                {currentQuizStep > 0 && (
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() => setCurrentQuizStep(prev => prev - 1)}
                      className="text-xs font-mono text-neutral-500 hover:text-white transition-colors cursor-pointer"
                    >
                      ← {language === 'ar' ? "السابق" : "Back"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Quiz Results Screen */}
            {quizResult && (
              <div className="space-y-6 animate-fade-in text-start">
                <div className="border border-luxury-gold/20 p-5 bg-black/50 relative">
                  <div className="absolute top-0 right-0 w-2 h-2 bg-luxury-gold"></div>
                  <span className="text-[9px] font-mono text-luxury-gold uppercase tracking-widest block mb-1">
                    {language === 'ar' ? "النتيجة والأسلوب المقترح بالذكاء الاصطناعي" : "Your Recommended Style Profile"}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-2">
                    {language === 'ar' ? quizResult.styleAr : quizResult.style}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
                    {language === 'ar' ? quizResult.descriptionAr : quizResult.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Recommended Package */}
                  <div className="bg-neutral-900/60 p-5 border border-white/5 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-neutral-500 block uppercase">
                        {language === 'ar' ? "باقة الخدمة الموصى بها:" : "Recommended Service Package:"}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-luxury-gold">
                        {language === 'ar' ? quizResult.recommendedPackage.name_ar : quizResult.recommendedPackage.name_en}
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        {language === 'ar' 
                          ? `تبدأ الباقة من سعر ${quizResult.recommendedPackage.price} وتشمل إعدادات معتمدة وضمان جودة حقيقي.` 
                          : `Package starts from ${quizResult.recommendedPackage.price} with guaranteed luxury-tier specifications.`}
                      </p>
                    </div>
                    <Link
                      to="/request-quote"
                      onClick={() => {
                        // Populate form when they click link
                        localStorage.setItem('ahz_selected_package_prefill', JSON.stringify({
                          service_type: quizResult.style.includes('Paints') ? 'home-paint' : quizResult.style.includes('Concept') ? 'home-design' : 'home-decoration',
                          budget_range: quizResult.recommendedPackage.price.includes('2,500') ? 'Under 10,000 AED' : quizResult.recommendedPackage.price.includes('5,500') ? '10,000-25,000 AED' : '50,000-100,000 AED'
                        }));
                      }}
                      className="w-full text-center py-2.5 bg-luxury-gold hover:bg-yellow-500 text-neutral-950 font-bold font-mono text-[10px] uppercase tracking-wider transition-all"
                    >
                      {language === 'ar' ? "اطلب عرض سعر لهذه الباقة" : "Request Quote For This Package"}
                    </Link>
                  </div>

                  {/* Recommended Colors & Materials */}
                  <div className="bg-neutral-900/60 p-5 border border-white/5 space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-neutral-500 block uppercase">
                        {language === 'ar' ? "تدرجات الألوان المناسبة:" : "Curated Color Palette:"}
                      </span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {quizResult.colors.split(', ').map((col, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-full border border-white/5 text-[10px] font-mono">
                            {col.startsWith('#') && (
                              <div className="w-3.5 h-3.5 rounded-full border border-white/10 shrink-0" style={{ backgroundColor: col }}></div>
                            )}
                            <span className="text-neutral-300">{col}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-neutral-500 block uppercase">
                        {language === 'ar' ? "المواد والخامات الأساسية:" : "Primary Architectural Materials:"}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(language === 'ar' ? quizResult.materialsAr : quizResult.materials).map((mat, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 bg-neutral-950 text-neutral-300 border border-white/5 font-sans">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action triggers */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={applyQuizToConfigurator}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white text-neutral-950 hover:bg-neutral-200 font-extrabold font-mono text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>{language === 'ar' ? "تطبيق الألوان والإعدادات على الموزع" : "Apply Styles to Configurator"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="w-full sm:w-auto px-5 py-2.5 bg-transparent text-neutral-400 hover:text-white border border-white/10 hover:border-white font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {language === 'ar' ? "إعادة الاختبار" : "Retake Quiz"}
                  </button>
                </div>
              </div>
            )}

            {!quizActive && !quizResult && (
              <div className="py-4 text-center text-neutral-500 border border-dashed border-white/5 flex flex-col items-center justify-center gap-2">
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-luxury-gold/20 animate-ping"></div>
                  <span className="text-[10px] font-mono uppercase tracking-widest">
                    {language === 'ar' ? "هل تبحث عن إلهام فني؟ جرب الباحث عن النمط الآن" : "Confused about styling? Try our instant style analyzer"}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Input Form (Span 7) */}
            <div className="lg:col-span-7 space-y-8">
              <div id="configurator-form" className="glass-panel p-6 sm:p-8 rounded-none border border-luxury-gold/15 relative">
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

              {/* AI-Inspired Moodboard Generator Card */}
              <div className="glass-panel p-6 rounded-none border border-luxury-gold/15 relative bg-gradient-to-b from-neutral-950 to-black text-start space-y-5">
                <div className="absolute top-0 right-0 w-2 h-2 bg-luxury-gold/45"></div>
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <Paintbrush className="w-5 h-5 text-luxury-gold" />
                  <h3 className="text-sm font-serif font-bold text-white">
                    {language === 'ar' ? "منشئ لوحات الإلهام البصري (Moodboards)" : "AI Moodboard Generator Studio"}
                  </h3>
                </div>

                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {language === 'ar'
                    ? "أدخل كلمات دلالية (مثال: 'مودرن ذهبي فاخر'، 'بيج كلاسيكي هادئ') لإنشاء لوحة إلهام فني فورية بالذكاء الاصطناعي لمساحتك."
                    : "Enter style keywords (e.g., 'Modern Gold Luxury', 'Minimalist Beige', 'Dark Emerald Majlis') to generate an AI-curated architectural moodboard."}
                </p>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={moodboardPrompt}
                      onChange={(e) => setMoodboardPrompt(e.target.value)}
                      placeholder={language === 'ar' ? "مثال: مودرن ذهبي فاخر..." : "e.g., Modern Gold Luxury..."}
                      className="flex-1 bg-neutral-900 border border-white/10 p-2.5 text-xs text-white rounded-none focus:border-luxury-gold"
                    />
                    <button
                      onClick={generateMoodboard}
                      disabled={isGeneratingMoodboard}
                      className="px-4 py-2.5 bg-luxury-gold hover:bg-yellow-500 text-neutral-950 font-bold font-mono text-[10px] uppercase transition-all shrink-0 cursor-pointer"
                    >
                      {isGeneratingMoodboard ? (
                        <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        language === 'ar' ? "توليد" : "Generate"
                      )}
                    </button>
                  </div>

                  {/* Suggestion tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      { ar: "ذهبي فاخر مريح", en: "Modern Gold Luxury" },
                      { ar: "بيج ناعم وبسيط", en: "Minimalist Beige" },
                      { ar: "مجلس كلاسيكي داكن", en: "Luxury Dark Majlis" }
                    ].map((tag, tIdx) => (
                      <button
                        key={tIdx}
                        type="button"
                        onClick={() => setMoodboardPrompt(tag.en)}
                        className="text-[9px] px-2 py-0.5 bg-white/5 hover:bg-luxury-gold/20 text-neutral-400 hover:text-luxury-gold transition-colors font-mono border border-white/5"
                      >
                        {language === 'ar' ? tag.ar : tag.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Moodboard Results Display */}
                {moodboardResult ? (
                  <div className="space-y-4 pt-3 border-t border-white/5 animate-fade-in text-start">
                    <div className="relative aspect-video overflow-hidden border border-luxury-gold/20 bg-neutral-900">
                      <img 
                        src={moodboardResult.image} 
                        alt="AI Generated Moodboard" 
                        className="w-full h-full object-cover filter brightness-95" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-3">
                        <span className="text-[8px] font-mono text-luxury-gold uppercase tracking-widest bg-black/80 px-1.5 py-0.5 rounded-full w-max mb-1">
                          AI Render Concept
                        </span>
                        <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider truncate">
                          {moodboardResult.prompt}
                        </h4>
                      </div>
                    </div>

                    {/* Color Swatch row */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono text-neutral-500 block uppercase">Matching Paint Codes:</span>
                      <div className="grid grid-cols-4 gap-2">
                        {moodboardResult.palette.map((color: string, i: number) => (
                          <div key={i} className="flex flex-col gap-1 items-center bg-white/5 p-1.5 border border-white/5">
                            <div className="w-5 h-5 rounded-full border border-white/10 shrink-0" style={{ backgroundColor: color }}></div>
                            <span className="text-[8px] font-mono text-neutral-400">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specifications row */}
                    <div className="grid grid-cols-2 gap-3 text-[10px] bg-neutral-900/50 p-2.5 border border-white/5">
                      <div>
                        <span className="text-neutral-500 block text-[8px] font-mono uppercase">Key Materials:</span>
                        <span className="text-neutral-300 font-sans block truncate">{moodboardResult.materials.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[8px] font-mono uppercase">Luminosity Profile:</span>
                        <span className="text-neutral-300 font-sans block truncate">{moodboardResult.lighting}</span>
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      type="button"
                      onClick={() => {
                        setColors(moodboardResult.palette.join(', '));
                        setNotes(`AI-Inspired Moodboard style prompt "${moodboardResult.prompt}" with ${moodboardResult.materials.join(', ')} textures.`);
                        
                        // Scroll up to form
                        const formElement = document.getElementById('configurator-form');
                        if (formElement) {
                          formElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full py-2 bg-neutral-900 hover:bg-luxury-gold hover:text-neutral-950 border border-luxury-gold/30 hover:border-luxury-gold text-neutral-300 font-mono text-[9px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? "تطبيق ألوان المودبورد على النموذج" : "Apply Palette to Configurator"}</span>
                    </button>
                  </div>
                ) : (
                  <div className="py-8 text-center text-neutral-600 border border-dashed border-white/5 flex flex-col items-center gap-2">
                    <Paintbrush className="w-8 h-8 text-neutral-700 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase">
                      {language === 'ar' ? "في انتظار الكلمات الدلالية للتوليد" : "Waiting for keywords..."}
                    </span>
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
