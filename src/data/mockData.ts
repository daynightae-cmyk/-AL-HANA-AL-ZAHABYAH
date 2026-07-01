// src/data/mockData.ts
// Rich Mock Data for AL HANA AL ZAHABYAH - Design & Decoration Works
// Tailored for the UAE market (Dubai, Abu Dhabi, Sharjah, etc.)

import { Service, ServicePackage, Project, ProjectGallery, Testimonial, FAQItem, BlogPost } from '../types/database';
import { servicesData } from './services';

export const mockServices: Service[] = servicesData;


export const mockServicePackages: Record<string, ServicePackage[]> = {
  "home-design": [
    {
      id: "pkg1",
      service_id: "s1",
      package_name_ar: "الباقة الفضية للتصميم",
      package_name_en: "Silver Design Package",
      description_ar: "تصاميم ثنائية الأبعاد وتوزيع مخططات الأثاث والإضاءة.",
      description_en: "2D Layout arrangements, lighting plans, and initial spatial distributions.",
      starting_price: 4999,
      estimated_days: 14,
      features: [
        "مخطط توزيع الأثاث (2D AutoCad Layout)",
        "لوحة إلهام الألوان والأنماط (Moodboard)",
        "مخطط توزيع نقاط الإضاءة والمفاتيح",
        "تعديلان مجانيان على المخططات",
        "ملف مواصفات المواد المقترحة"
      ],
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: "pkg2",
      service_id: "s1",
      package_name_ar: "الباقة الذهبية ثلاثية الأبعاد",
      package_name_en: "Golden 3D Premium Package",
      description_ar: "تصاميم ثلاثية الأبعاد بالكامل مع جودة واقعية واختيار الخامات.",
      description_en: "Full 3D visualization with photorealistic rendering and material coordination.",
      starting_price: 9999,
      estimated_days: 25,
      features: [
        "كل ما تشمله الباقة الفضية",
        "تصميم ثلاثي الأبعاد (3D Rendering) بجودة عالية لجميع الصالات والمجالس",
        "لقطات بانورامية 360 درجة للمساحة",
        "جدول تفصيلي بالخامات والدهانات المستخدمة وكود الألوان الرسمي",
        "3 تعديلات مجانية على التصاميم ثلاثية الأبعاد",
        "دعم فني واستشارة أثناء مرحلة شراء الأثاث"
      ],
      is_active: true,
      created_at: new Date().toISOString()
    }
  ],
  "home-paint": [
    {
      id: "pkg3",
      service_id: "s2",
      package_name_ar: "باقة الدهانات الكلاسيكية",
      package_name_en: "Classic Paints Package",
      description_ar: "أعمال دهان نظيفة وبخامات أصلية ومعالجة الشروخ والعيوب الجدارية.",
      description_en: "Clean, high-quality solid paint jobs, addressing cracks, with premium primers.",
      starting_price: 2500,
      estimated_days: 5,
      features: [
        "استخدام أصباغ جوتن (Jotun Phenom) الفاخرة المعتمدة",
        "صنفرة كاملة للحوائط ومعالجة رطوبة الجدران والشروخ",
        "وجهين معجون ممتاز ووجهين دهان نهائي باللون المختار",
        "تغطية كاملة وحماية فائقة للأرضيات والأثاث أثناء العمل",
        "تنظيف احترافي بعد انتهاء الدهان مباشرة"
      ],
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: "pkg4",
      service_id: "s2",
      package_name_ar: "باقة الدهانات الديكورية واللمسات الملكية",
      package_name_en: "Royal Decorative Paints Package",
      description_ar: "دهانات بمؤثرات فنية راقية كالمارمو والرويال والستوكو المخملي.",
      description_en: "Premium artistic textures including stucco, velvet finish, and metallic accents.",
      starting_price: 5500,
      estimated_days: 8,
      features: [
        "دهانات ديكورية خاصة (Stucco / Velvet / Marmorino / Silk Effect)",
        "تنفيذ حوائط ديكورية متميزة (Accent Walls) للمجالس وغرف النوم رئيسية",
        "معالجات كيميائية ممتازة ومقاومة للرطوبة والعفن",
        "إشراف فني من كبير معلمي الأصباغ الديكورية لدينا",
        "ضمان لمدة عام كامل على جودة التنفيذ وعدم تقشر الأصباغ"
      ],
      is_active: true,
      created_at: new Date().toISOString()
    }
  ],
  "home-decoration": [
    {
      id: "pkg5",
      service_id: "s3",
      package_name_ar: "ديكور الصالات الكلاسيكية والجبس",
      package_name_en: "Classic Gypsum & Ceilings Package",
      description_ar: "أعمال جبس بورد حديثة وتوزيع إضاءة ليد مخفية بأسلوب فاخر.",
      description_en: "Modern gypsum boards with dynamic profile LED channels and hidden lighting layouts.",
      starting_price: 7500,
      estimated_days: 12,
      features: [
        "توريد وتركيب ألواح الجبس بورد المقاومة للرطوبة والحرارة",
        "تصميم وتجهيز ممرات ومجاري الإضاءة المخفية والسبوتلايت",
        "تركيب براويز الفوم (Polyurethane Panels) الأنيقة على الحوائط",
        "تأسيس وتوصيل الأسلاك الكهربائية للإضاءات الجديدة بالكامل",
        "تشطيب وصنفرة ودهان الجبس بمستوى استواء تام"
      ],
      is_active: true,
      created_at: new Date().toISOString()
    }
  ]
};

export const mockProjectGallery: ProjectGallery[] = [
  {
    id: "g1",
    project_id: "p1",
    title_ar: "فيلا الهدوء الفاخرة - جميرا",
    title_en: "Villa Serenity Majestic - Jumeirah",
    service_type: "villa-renovation",
    emirate: "دبي",
    property_type: "villa",
    before_image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    after_image_url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    main_image_url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    description_ar: "تجديد كامل للفيلا يشمل الحوائط، الأسقف الجبسية، تمديد خطوط الإضاءة الحديثة، والدهانات المخملية الهادئة.",
    description_en: "A complete villa overhaul including gypsum ceiling installations, modern magnetic track lights, and soft velvet paint finishes.",
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: "g2",
    project_id: "p2",
    title_ar: "مجلس المها الملكي - أبوظبي",
    title_en: "Al Maha Royal Majlis - Abu Dhabi",
    service_type: "home-decoration",
    emirate: "أبوظبي",
    property_type: "villa",
    before_image_url: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
    after_image_url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    main_image_url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    description_ar: "تصميم مجلس تقليدي مدمج بلمسات عصرية مذهبة، دهان ستوكو فاخر، وبراويز الفوم مع إضاءات جدارية كلاسيكية.",
    description_en: "Combining traditional Majlis elements with luxury gold framing, stucco textured paints, and classic LED wall sconces.",
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: "g3",
    project_id: "p3",
    title_ar: "شقة النخبة المطلة على البحر - الشارقة",
    title_en: "Elite Sea-View Apartment - Sharjah",
    service_type: "home-renovation",
    emirate: "الشارقة",
    property_type: "apartment",
    before_image_url: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
    after_image_url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    main_image_url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    description_ar: "تعديل المساحة الجدارية، تركيب باركيه عالي الجودة، دهانات جدارية نظيفة ناصعة البياض، مع ديكور جبسي ناعم للشاشات.",
    description_en: "Removed redundant partition walls, installed heavy-duty wooden parquet flooring, crisp white paints, and sleek custom TV media unit.",
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: "g4",
    project_id: "p4",
    title_ar: "صالة عائلية دافئة - العين",
    title_en: "Warm Cozy Family Lounge - Al Ain",
    service_type: "home-design",
    emirate: "العين",
    property_type: "villa",
    before_image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    after_image_url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    main_image_url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    description_ar: "تصميم ثلاثي الأبعاد بالكامل وتوزيع مريح للمقاعد، مع تداخل الخشب الدافئ والدهانات المعتمة المميزة لتقليل الإجهاد البصري.",
    description_en: "3D interior design and comfortable styling incorporating warm wooden cladding, decorative spotlights, and cozy textures.",
    is_featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: "g5",
    project_id: "p5",
    title_ar: "مكتب تنفيذي راقي - الخليج التجاري",
    title_en: "Executive Office - Business Bay",
    service_type: "commercial-decoration",
    emirate: "دبي",
    property_type: "office",
    before_image_url: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
    after_image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    main_image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    description_ar: "تنفيذ ديكورات مكاتب زجاجية عازلة للصوت، أسقف مدمجة بإضاءات خطية متصلة ودهانات تخدم الهوية البصرية للشركة.",
    description_en: "Soundproof double-glazed office partitions, gypsum ceiling with custom continuous linear LED channels, and corporate style branding paint.",
    is_featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: "g6",
    project_id: "p6",
    title_ar: "صالون التجميل والسبا الفاخر - عجمان",
    title_en: "Luxury Beauty Salon & Spa - Ajman",
    service_type: "commercial-decoration",
    emirate: "عجمان",
    property_type: "salon",
    before_image_url: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
    after_image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    main_image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description_ar: "تصميم وتشطيب مذهل بدرجات الذهبي الميتاليك والوردي الناعم، تمديدات صحية مخفية وإضاءة محيطية تناسب جلسات التصوير.",
    description_en: "Executing striking details in metallic gold and subtle soft blush hues, hidden plumbing channels, and camera-ready selfie vanity lighting.",
    is_featured: false,
    created_at: new Date().toISOString()
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "t1",
    customer_name: "أحمد المهيري",
    rating: 5,
    comment_ar: "تجربة ممتازة مع شركة الهنا الذهبية لتجديد مجلس الفيلا الخاص بنا في دبي. العمل منظم جداً والالتزام بالوقت رائع والتشطيب يفوق التوقعات ومطابق للمخططات ثلاثية الأبعاد تماماً.",
    comment_en: "Excellent experience with Al Hana Al Zahabyah for our villa majlis renovation in Dubai. Very organized work, amazing timing, and the finish exceeded expectations, exactly matching the 3D blueprints.",
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "t2",
    customer_name: "سارة الحمادي",
    rating: 5,
    comment_ar: "قمنا بالاتفاق معهم على تصميم وتنفيذ دهانات وديكورات الشقة بالكامل في أبوظبي. شغل راقي وأسلوب تعامل احترافي، ونظافة العمل ممتازة ومبهرة.",
    comment_en: "We hired them for our apartment paints and decoration in Abu Dhabi. Sophisticated work, professional communication, and exceptionally clean job execution. Mind-blowing!",
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "t3",
    customer_name: "طارق الشامسي",
    rating: 5,
    comment_ar: "فريق عمل محترف صمم ونفذ ديكور مكتبنا الجديد في دبي. جودة المواد والجبس والإضاءة ممتازة، وموقعهم يتيح تتبع خطوات المشروع يوم بيوم بمنتهى الشفافية والسهولة.",
    comment_en: "A highly professional team designed and executed our new office in Dubai. Outstanding gypsum, lighting, and materials quality. The website status tracker made it incredibly transparent to follow daily site updates.",
    is_active: true,
    created_at: new Date().toISOString()
  }
];

export const mockFAQs: FAQItem[] = [
  {
    id: "f1",
    question_ar: "هل تقدمون زيارة معاينة؟",
    question_en: "Do you provide on-site inspections?",
    answer_ar: "نعم، نوفر خدمة زيارة المعاينة وقياس المساحات للموقع في جميع أنحاء الإمارات لمناقشة الأفكار والاحتياجات مباشرة.",
    answer_en: "Yes, we provide site visits and space measurements across the UAE to discuss your design requirements and ideas in person.",
    category: "general",
    sort_order: 1,
    is_active: true
  },
  {
    id: "f2",
    question_ar: "هل يمكن طلب عرض سعر قبل التنفيذ؟",
    question_en: "Can I request a quote before execution?",
    answer_ar: "بالتأكيد، بعد زيارة المعاينة وتحديد نطاق العمل والتشطيبات المطلوبة، نرسل عرض سعر مفصل وواضح يوضح كافة التكاليف والمواد المستخدمة.",
    answer_en: "Absolutely! After the site visit and defining the scope of work and materials, we provide a transparent, detailed cost estimate.",
    category: "quotes",
    sort_order: 2,
    is_active: true
  },
  {
    id: "f3",
    question_ar: "هل تعملون في جميع إمارات الدولة؟",
    question_en: "Do you operate in all Emirates?",
    answer_ar: "نعم، نحن نقدم خدماتنا في دبي، أبوظبي، الشارقة، عجمان، العين، الفجيرة، رأس الخيمة، وأم القيوين.",
    answer_en: "Yes, we execute luxury projects across Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, Fujairah, Ras Al Khaimah, and Umm Al Quwain.",
    category: "general",
    sort_order: 3,
    is_active: true
  },
  {
    id: "f4",
    question_ar: "هل تقدمون تصاميم ثلاثية الأبعاد؟",
    question_en: "Do you provide 3D designs?",
    answer_ar: "نعم، لدينا قسم متخصص في التصاميم ثلاثية الأبعاد (3D Concept Design) لتمكين العميل من رؤية النتيجة النهائية لبيته أو فيلته قبل بدء العمل الفعلي.",
    answer_en: "Yes, we have a dedicated 3D Concept Design team that creates photorealistic renders so you can visualize your project before execution.",
    category: "design",
    sort_order: 4,
    is_active: true
  },
  {
    id: "f5",
    question_ar: "هل يمكن متابعة مراحل المشروع عن بعد؟",
    question_en: "Can I track my project status remotely?",
    answer_ar: "نعم، تنفرد شركة الهنا الذهبية بنظام تتبع رقمي متكامل عبر موقعنا، حيث يمكنك إدخال كود المشروع الخاص بك ومتابعة نسبة الإنجاز والزيارات القادمة والاطلاع على صور تقدم العمل المحدثة بانتظام من مهندسي الموقع.",
    answer_en: "Yes, Al Hana Al Zahabyah features a unique digital tracking portal on our website. Simply input your custom project ID to monitor completion percentages, check scheduled visits, and view regular photo reports sent directly by site engineers.",
    category: "tracking",
    sort_order: 5,
    is_active: true
  },
  {
    id: "f6",
    question_ar: "هل يمكن رفع صور المكان من الموقع مباشرة؟",
    question_en: "Can I upload photos of my current space?",
    answer_ar: "نعم، يتيح لك نموذج طلب عرض السعر المدمج في موقعنا إرفاق صور مساحتك الحالية، وهو ما يساعد مهندسينا في فهم طبيعة العقار وإجراء دراسة أولية دقيقة للموقع قبل إجراء المعاينة الفعلية.",
    answer_en: "Yes! Our quote request form allows you to attach photos of your current space, helping our engineering team analyze the layout and structural details prior to our site visit.",
    category: "quotes",
    sort_order: 6,
    is_active: true
  },
  {
    id: "f7",
    question_ar: "هل الأسعار ثابتة أم تعتمد على المساحة؟",
    question_en: "Are the prices fixed or space-dependent?",
    answer_ar: "لدينا باقات خدمات توجيهية مرنة بأسعار مبدئية، ولكن السعر النهائي يتم احتسابه بدقة بناءً على الأمتار المربعة للمساحة الفعلية، وخامة الدهانات المختارة، ونطاق الديكورات وتفاصيل الجبس بورد المطلوبة.",
    answer_en: "While we offer baseline packages, the final quotation is calculated based on exact square meters, structural complexity, types of decorative paint selected, and detailed ceiling layout features.",
    category: "billing",
    sort_order: 7,
    is_active: true
  },
  {
    id: "f8",
    question_ar: "كم يستغرق تنفيذ المشروع ككل؟",
    question_en: "How long does a typical project take?",
    answer_ar: "أعمال الدهانات البسيطة تستغرق بين 3 إلى 7 أيام، بينما تجديد الفلل الكامل وأعمال الجبس بورد الفاخرة وتوزيع الإضاءة تستغرق عادة من 3 إلى 6 أسابيع، ويتم تحديد موعد التسليم النهائي بوضوح شديد في العقد المبرم.",
    answer_en: "Simple painting jobs take 3-7 days. Comprehensive luxury villa renovations with extensive gypsum and custom lighting typically require 3-6 weeks. Handover dates are strictly locked and guaranteed within the signed agreement.",
    category: "general",
    sort_order: 8,
    is_active: true
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: "b1",
    title_ar: "كيف تختار ألوان دهانات منزلك لتوسعة الغرف؟",
    title_en: "How to Choose Paint Colors to Make Rooms Look Larger?",
    slug: "choose-paint-colors-room-size",
    excerpt_ar: "دليلك الهندسي لاختيار تدرجات الألوان الفاتحة وتأثير الإضاءة الطبيعية والدهانات العاكسة في خلق مساحات بصرية أوسع في منزلك.",
    excerpt_en: "A professional guide on leveraging light hues, natural illumination, and reflective paint textures to construct visually wider spaces.",
    content_ar: "يعتبر اختيار ألوان الحوائط الركيزة الأساسية في تصميم المساحة الداخلية. الألوان الداكنة تعطي طابعاً بالدفء والفخامة ولكنها قد تجعل المساحات الصغيرة تبدو ضيقة. لتوسيع الغرف بصرياً، يفضل استخدام درجات الأوف وايت (Off-white)، العاجي، والبيج الفاتح مع أصباغ نصف لامعة تعكس الضوء الساقط عليها.\n\nكذلك، دهان السقف بلون أفتح من لون الجدران يعطي إيحاءً بارتفاع الغرفة. ننصح دائماً بدمج إضاءة الليد غير المباشرة الموجهة نحو الأسقف الجبسية لمحو خطوط التقاء الجدران بالأسقف، مما يعزز الفضاء البصري المتاح.",
    content_en: "Wall color selection dictates the atmospheric feel of any interior layout. While dark colors evoke luxury, they can visually shrink tight quarters. To maximize visual space, opt for off-whites, warm ivories, and soft beiges in satin or semi-gloss finishes that bounce ambient light.\n\nFurthermore, painting the ceiling a shade lighter than the walls elongates vertical limits. Integrating indirect LED profiles onto gypsum bulkheads softens ceiling intersections, effectively making the room feel endless and beautifully ventilated.",
    cover_image_url: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
    is_published: true,
    created_at: "2026-06-15T10:00:00Z"
  },
  {
    id: "b2",
    title_ar: "أفكار ديكور فاخرة لتصميم المجالس العربية العصرية",
    title_en: "Luxury Modern Arabic Majlis Design & Styling Ideas",
    slug: "luxury-modern-arabic-majlis-design",
    excerpt_ar: "أبرز صيحات تداخل الفينيل والجبس بورد المعلق مع اللمسات المذهبة والدهانات الديكورية التي تجمع الفخامة بالأصالة.",
    excerpt_en: "Key design trends combining structural gypsum work, warm metallic gold trim panels, and decorative paint textures that respect cultural heritage.",
    content_ar: "المجلس هو واجهة البيت الإماراتي ومكان استقبال الضيوف، لذا يجب أن يجمع تصميمه بين كرم الضيافة والفخامة العصرية. في الآونة الأخيرة، تراجعت النقوش الجبسية المعقدة لصالح الجبس بورد المستوي ذي الخطوط المستقيمة مع دمج بروفايل الإضاءة الليد بلونه الدافئ.\n\nتعتبر حوائط الستوكو (Stucco) الإيطالي اللامع باللون الرمادي الداكن أو العاجي خلفية رائعة لتركيب براويز الفينيل المذهبة. إضافة لمسات خشبية من قشرة الجوز الفاخرة تضفي دفئاً فورياً على المساحة وتعزز الشعور بالراحة والتكامل البصري.",
    content_en: "The Majlis stands as the visual centerpiece of Emirati homes, demanding a layout that respects heritage while expressing contemporary luxury. Modern design shifts away from heavy plaster carvings towards streamlined gypsum profiles embedded with warm linear lighting.\n\nHigh-gloss Venetian stucco in dark grey or warm stone serves as an elegant canvas for thin metallic gold framing. Interjecting natural American walnut wood paneling provides instant thermal warmth, tying the architectural volumes together perfectly.",
    cover_image_url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    is_published: true,
    created_at: "2026-06-20T11:00:00Z"
  },
  {
    id: "b3",
    title_ar: "خطوات تجديد المنزل وتفادي التكاليف الزائدة والمفاجئة",
    title_en: "Steps to Renove Your Home Without Hidden or Unplanned Costs",
    slug: "steps-home-renovation-no-hidden-costs",
    excerpt_ar: "كيف تخطط لمراحل التجديد من المعاينة والاتفاق لمنع حدوث مشاكل فنية بالسباكة أو الكهرباء أثناء التنفيذ الفعلي.",
    excerpt_en: "How to layout and plan your property renovation, starting from professional site preps, to insulate yourself from structural surprises.",
    content_ar: "تجديد البيت قد يبدو خطوة مثيرة، لكن بدون خطة واضحة ومسح فني مسبق قد تتحول إلى دوامة من التكاليف المرتفعة. الخطوة الأولى لتفادي ذلك هي زيارة المعاينة الهندسية الدقيقة للوقوف على كفاءة اللياسة والدهانات الحالية وفحص الرطوبة الجدارية.\n\nتأكد دائماً من استلام عرض سعر تفصيلي يوضح نوع المعجون، الأصباغ، وسمك أسلاك الكهرباء والسباكة. تفادي التغييرات العشوائية أثناء التنفيذ؛ فالاعتماد المسبق للتصاميم ثلاثية الأبعاد يوفر عليك أكثر من 20% من التكاليف الضائعة في الهدم والتعديل اللاحق.",
    content_en: "Home renovation is an exciting venture, but failing to conduct technical structural preps can trigger severe budget inflations. The golden rule is initiating an in-depth engineer visit to test wall moisture levels and examine old plaster adhesion.\n\nAlways secure a line-item quotation detail specifying exact paint brands, chemical wall primers, and plaster coats. Rely heavily on 3D renderings to commit to layouts early, saving you up to 20% of funds usually lost to physical structural reworks on-site.",
    cover_image_url: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
    is_published: true,
    created_at: "2026-06-25T09:30:00Z"
  }
];

// Mock database storage helper for forms (Simulated Supabase local state backup)
export interface MockQuoteSubmission {
  request_number: string;
  full_name: string;
  phone: string;
  whatsapp?: string;
  email: string;
  emirate: string;
  area: string;
  property_type: string;
  service_type: string;
  project_size: string;
  budget_range: string;
  preferred_contact_method: string;
  preferred_visit_date?: string;
  project_description?: string;
  status: string;
  created_at: string;
}

export const getLocalQuoteSubmissions = (): MockQuoteSubmission[] => {
  const data = localStorage.getItem('ahz_quotes');
  if (!data) {
    const initial: MockQuoteSubmission[] = [
      {
        request_number: "AHZ-2026-0001",
        full_name: "سعيد الكتبي",
        phone: "+971 50 123 4567",
        whatsapp: "+971 50 123 4567",
        email: "saeed@example.ae",
        emirate: "دبي",
        area: "الخوانيج 2",
        property_type: "villa",
        service_type: "villa-renovation",
        project_size: "Full Villa",
        budget_range: "50,000-100,000 AED",
        preferred_contact_method: "WhatsApp",
        preferred_visit_date: "2026-07-05",
        project_description: "تجديد واجهة الفيلا الخارجية بالكامل وتغيير دهانات الصالة الرئيسية مع أعمال جبس بورد كلاسيكي.",
        status: "site_visit_scheduled",
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        request_number: "AHZ-2026-0002",
        full_name: "مريم العلي",
        phone: "+971 52 987 6543",
        whatsapp: "+971 52 987 6543",
        email: "mariam@example.ae",
        emirate: "أبوظبي",
        area: "البطين",
        property_type: "apartment",
        service_type: "home-paint",
        project_size: "Full Apartment",
        budget_range: "10,000-25,000 AED",
        preferred_contact_method: "Phone Call",
        preferred_visit_date: "2026-07-07",
        project_description: "تغيير دهانات الشقة بالكامل لدرجات البيج الفاتح وجدار متميز بورق حائط أو ستوكو ناعم في صالة المعيشة.",
        status: "new",
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    localStorage.setItem('ahz_quotes', JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
};

export const saveLocalQuoteSubmission = (submission: Omit<MockQuoteSubmission, 'request_number' | 'status' | 'created_at'>): MockQuoteSubmission => {
  const current = getLocalQuoteSubmissions();
  const nextNum = String(current.length + 1).padStart(4, '0');
  const request_number = `AHZ-2026-${nextNum}`;
  
  const fullRecord: MockQuoteSubmission = {
    ...submission,
    request_number,
    status: 'new',
    created_at: new Date().toISOString()
  };
  
  current.unshift(fullRecord); // add to top
  localStorage.setItem('ahz_quotes', JSON.stringify(current));
  return fullRecord;
};

// Mock projects with active timelines
export interface MockProjectTimelineStep {
  status: string;
  status_ar: string;
  status_en: string;
  is_completed: boolean;
  date?: string;
  note_ar?: string;
  note_en?: string;
}

export interface MockProjectProgress {
  project_number: string;
  customer_name: string;
  title_ar: string;
  title_en: string;
  service_type: string;
  emirate: string;
  area: string;
  progress_percentage: number;
  assigned_supervisor_ar: string;
  assigned_supervisor_en: string;
  assigned_designer_ar: string;
  assigned_designer_en: string;
  next_visit_date: string;
  last_update_ar: string;
  last_update_en: string;
  timeline: MockProjectTimelineStep[];
}

export const mockProjectProgressData: Record<string, MockProjectProgress> = {
  "AHZ-2026-0001": {
    project_number: "AHZ-2026-0001",
    customer_name: "سعيد الكتبي",
    title_ar: "تجديد فيلا الخوانيج الفاخرة",
    title_en: "Al Khawaneej Luxury Villa Renovation",
    service_type: "villa-renovation",
    emirate: "دبي",
    area: "الخوانيج 2",
    progress_percentage: 65,
    assigned_supervisor_ar: "م. محمد الشناوي",
    assigned_supervisor_en: "Eng. Mohamed El Shenawy",
    assigned_designer_ar: "م. ياسمين صبري",
    assigned_designer_en: "Eng. Yasmine Sabry",
    next_visit_date: "2026-07-04",
    last_update_ar: "اكتمال أعمال الجبس بورد في المجالس والبدء بسنفرة ومعالجة حوائط الصالة للدهانات الديكورية.",
    last_update_en: "Gypsum boards completed in Majlis areas. Wall sanding and treatment started for decorative stucco paints.",
    timeline: [
      {
        status: "new",
        status_ar: "تم استلام طلب المعاينة والطلب نشط",
        status_en: "Request received and active",
        is_completed: true,
        date: "2026-06-15",
        note_ar: "تسجيل الطلب الأولي عبر الموقع الإلكتروني.",
        note_en: "Initial request registered via website."
      },
      {
        status: "contacted",
        status_ar: "تم التواصل وتحديد موعد المعاينة",
        status_en: "Contacted and inspection scheduled",
        is_completed: true,
        date: "2026-06-16",
        note_ar: "الاتفاق على زيارة المعاينة وقياس المساحات.",
        note_en: "Agreed on site measurement visit."
      },
      {
        status: "site_visit",
        status_ar: "تمت زيارة الموقع ومسح الحوائط",
        status_en: "Site visit and wall inspection completed",
        is_completed: true,
        date: "2026-06-18",
        note_ar: "رفع المقاسات وفحص رطوبة اللياسة الحالية.",
        note_en: "Measurements taken, humidity tested."
      },
      {
        status: "quote_sent",
        status_ar: "تم إرسال عرض السعر التفصيلي",
        status_en: "Detailed quotation submitted",
        is_completed: true,
        date: "2026-06-20",
        note_ar: "تقديم عرض مالي للمواد والأصباغ والخامات المطلوبة.",
        note_en: "Proposal sent itemizing premium paints and ceiling sheets."
      },
      {
        status: "approved",
        status_ar: "اعتماد المشروع وتوقيع العقد",
        status_en: "Project approved and contract signed",
        is_completed: true,
        date: "2026-06-22",
        note_ar: "توقيع العقد الرسمي واعتماد ألوان الدهانات.",
        note_en: "Official signing and paint color selections locked."
      },
      {
        status: "execution",
        status_ar: "بدء أعمال التنفيذ بالموقع",
        status_en: "Execution phase active on site",
        is_completed: true,
        date: "2026-06-24",
        note_ar: "حماية الأرضيات وتوريد ألواح الجبس والبدء بتركيب الهيكل الحديدي.",
        note_en: "Flooring protected, structural ceiling frames installed."
      },
      {
        status: "finishing",
        status_ar: "مرحلة الجبس والدهان الديكوري",
        status_en: "Ceilings and decorative paints in progress",
        is_completed: false,
        note_ar: "المرحلة الجارية حالياً. العمل على معجون الجدران ودهان الستوكو المخملي.",
        note_en: "Active stage. Executing Venetian stucco textures and gypsum putty coatings."
      },
      {
        status: "final_review",
        status_ar: "المراجعة والتنظيف والتشطيب النهائي",
        status_en: "Final inspection and deep cleaning",
        is_completed: false,
        note_ar: "سيتم تنظيف المكان بالكامل وإزالة الحمايات وإجراء مراجعة لخطوط الإضاءة.",
        note_en: "Complete cleaning and test run of LED lines before inspection."
      },
      {
        status: "handover",
        status_ar: "التسليم النهائي وإقرار الرضا",
        status_en: "Project final handover completed",
        is_completed: false,
        note_ar: "التسليم الرسمي المتوقع للمفتاح بتاريخ 2026-07-15.",
        note_en: "Official key handover estimated by July 15, 2026."
      }
    ]
  },
  "AHZ-2026-0002": {
    project_number: "AHZ-2026-0002",
    customer_name: "مريم العلي",
    title_ar: "أعمال صباغة وتجديد شقة البطين",
    title_en: "Al Bateen Luxury Apartment Paint job",
    service_type: "home-paint",
    emirate: "أبوظبي",
    area: "البطين",
    progress_percentage: 15,
    assigned_supervisor_ar: "م. فادي غبريال",
    assigned_supervisor_en: "Eng. Fady Gabriel",
    assigned_designer_ar: "م. رانيا القاسمي",
    assigned_designer_en: "Eng. Rania Al Qasimi",
    next_visit_date: "2026-07-06",
    last_update_ar: "تمت معاينة الموقع وتحديد تدرجات الألوان. العقد قيد التجهيز تمهيداً للتوقيع والاعتماد.",
    last_update_en: "Site consultation completed. Color shades selected. Quotation contract is being prepared for approval.",
    timeline: [
      {
        status: "new",
        status_ar: "تم استلام طلب عرض السعر بنجاح",
        status_en: "Quote request successfully logged",
        is_completed: true,
        date: "2026-06-30",
        note_ar: "الطلب مسجل لدى علاقات العملاء.",
        note_en: "Logged into the company CRM."
      },
      {
        status: "contacted",
        status_ar: "تم التواصل وتحديد موعد المعاينة",
        status_en: "Contacted and site inspection set",
        is_completed: true,
        date: "2026-07-01",
        note_ar: "تم التنسيق هاتفياً لتحديد يوم المعاينة الفنية.",
        note_en: "Coordinated technical site visit date."
      },
      {
        status: "site_visit",
        status_ar: "زيارة المعاينة ومسح المساحة (مجدولة)",
        status_en: "Scheduled Site measurement visit",
        is_completed: false,
        note_ar: "الزيارة مقررة يوم 2026-07-06 لمطابقة الجدران وقياس المساحات.",
        note_en: "Technical supervisor scheduled to measure wall parameters on July 6, 2026."
      },
      {
        status: "quote_sent",
        status_ar: "تقديم عرض السعر الفني والمالي",
        status_en: "Quotation proposal formulation",
        is_completed: false,
        note_ar: "سيتم تقديمه عقب زيارة المعاينة ورفع المقاسات مباشرة.",
        note_en: "Will be draft-itemized directly following the site measurements."
      },
      {
        status: "approved",
        status_ar: "اعتماد المشروع وتوقيع العقد",
        status_en: "Agreement signing & startup approvals",
        is_completed: false,
        note_ar: "سيتم توقيع العقد واختيار درجات جوتن وتحديد موعد تشغيل الموقع.",
        note_en: "Requires signed contract and secured color codes catalog confirmation."
      }
    ]
  }
};

// Retrieve mock progress logs by unique reference code
export const getProjectByCode = (code: string): MockProjectProgress | undefined => {
  return mockProjectProgressData[code.toUpperCase()];
};
