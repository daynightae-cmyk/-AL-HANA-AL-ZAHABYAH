// src/data/services.ts
// Detailed, high-quality, bilingual service catalog for AL HANA AL ZAHABYAH

import { Service } from '../types/database';

export interface DetailedService extends Service {
  detailed_desc_ar: string;
  detailed_desc_en: string;
  features_ar: string[];
  features_en: string[];
  process_ar: string[];
  process_en: string[];
  suitable_for_ar: string[];
  suitable_for_en: string[];
  cta_text_ar: string;
  cta_text_en: string;
  before_image: string;
  after_image: string;
  faqs: {
    question_ar: string;
    question_en: string;
    answer_ar: string;
    answer_en: string;
  }[];
}

export const servicesData: DetailedService[] = [
  {
    id: "home-design",
    slug: "home-design",
    icon: "Home",
    image_url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    name_ar: "التصميم المنزلي",
    name_en: "Home Design",
    description_ar: "تصميم داخلي راقٍ للمنازل والشقق والفلل يعكس ذوق العميل واحتياجاته.",
    description_en: "Elegant interior design for homes, apartments, and villas tailored to the client's taste and lifestyle.",
    detailed_desc_ar: "نقدم خدمة التصميم المنزلي المتكامل للمجالس، غرف النوم، الصالات، المطابخ، المداخل، والمساحات العائلية، مع دراسة الألوان، توزيع الأثاث، الإضاءة، الخامات، والهوية الجمالية لكل مساحة.",
    detailed_desc_en: "We provide complete home design services for majlis rooms, bedrooms, living rooms, kitchens, entrances, and family spaces, including color direction, furniture layout, lighting, materials, and the full aesthetic identity of each area.",
    features_ar: [
      "تصميم داخلي للمنازل والفلل والشقق",
      "اختيار الألوان والخامات بدقة تامة",
      "توزيع الأثاث والإضاءة بطريقة علمية وجمالية",
      "تصميم مجالس وغرف نوم وصالات بأساليب مختلفة",
      "مقترحات تنفيذ قابلة للتطبيق مع مخططات 2D/3D"
    ],
    features_en: [
      "Interior design for homes, villas, and apartments",
      "Color and material selection with high precision",
      "Furniture and lighting layout for beauty and function",
      "Majlis, bedroom, and living room customized design",
      "Practical execution-ready design concepts with 2D/3D plans"
    ],
    process_ar: [
      "استلام متطلبات العميل وفهم رؤيته وتفضيلاته",
      "تحليل المساحة والذوق المطلوب ورفع القياسات",
      "تقديم تصور مبدئي ومخططات توزيع الأثاث",
      "اختيار الألوان النهائية وتنسيق الخامات والديكورات",
      "تجهيز خطة التنفيذ المتكاملة مع ملفات 3D"
    ],
    process_en: [
      "Collect client requirements and understand their vision",
      "Analyze space, measure dimensions, and study preferred styles",
      "Prepare initial concept and space planning arrangements",
      "Select final colors, match materials, and direct aesthetics",
      "Prepare complete execution blueprints and detailed 3D files"
    ],
    suitable_for_ar: ["فلل", "شقق", "مجالس", "غرف نوم", "صالات", "منازل جديدة"],
    suitable_for_en: ["Villas", "Apartments", "Majlis", "Bedrooms", "Living rooms", "New homes"],
    cta_text_ar: "اطلب تصميم منزلك الآن",
    cta_text_en: "Request Home Design Now",
    before_image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
    after_image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    is_active: true,
    sort_order: 1,
    created_at: "2026-07-01T00:00:00.000Z",
    faqs: [
      {
        question_ar: "كم من الوقت يستغرق تصميم فيلا بالكامل؟",
        question_en: "How long does a complete villa design take?",
        answer_ar: "يستغرق التصميم المتكامل عادة ما بين 15 إلى 30 يوماً حسب حجم المساحات وعدد التعديلات المطلوبة.",
        answer_en: "A complete villa design typically takes between 15 to 30 days depending on space volume and requested iterations."
      },
      {
        question_ar: "هل تقدمون تصاميم ثلاثية الأبعاد 3D قبل البدء بالعمل؟",
        question_en: "Do you provide photorealistic 3D renders before starting?",
        answer_ar: "نعم، نقدم لعملائنا تصاميم ثلاثية الأبعاد واقعية توضح الإضاءة والأصباغ والديكورات والجبس بورد بشكل كامل.",
        answer_en: "Yes, we provide realistic 3D renderings showcasing custom lighting, Jotun paints, and false ceiling designs."
      }
    ]
  },
  {
    id: "home-paint",
    slug: "home-paint",
    icon: "Paintbrush",
    image_url: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80",
    name_ar: "دهانات المنازل",
    name_en: "Home Paint",
    description_ar: "دهانات داخلية وخارجية وتشطيبات جدارية فاخرة بجودة تنفيذ عالية.",
    description_en: "Interior and exterior painting with premium wall finishes and refined execution quality.",
    detailed_desc_ar: "نوفر خدمات دهانات المنازل والفلل والشقق باستخدام ألوان عصرية وتشطيبات نظيفة تشمل الدهانات الداخلية، الخارجية، الدهانات الديكورية، الجدران المميزة، الملمس الجمالي، والاستشارات اللونية.",
    detailed_desc_en: "We provide home, villa, and apartment painting services using modern colors and clean finishing, including interior paint, exterior paint, decorative paint, feature walls, texture finishes, and color consultation.",
    features_ar: [
      "دهانات داخلية وخارجية بضمان جودة الألوان",
      "دهانات ديكورية فخمة (بدائل خامات، ترخيم، ملمس خاص)",
      "جدران مميزة وألوان مخصصة تناسب الديكور الداخلي",
      "اختيار ألوان احترافي ومطابقة لكتالوجات جوتن وساف",
      "تشطيبات نظيفة ودقيقة وحماية كاملة للأرضيات والأثاث"
    ],
    features_en: [
      "Interior and exterior painting with color durability guarantees",
      "Luxury decorative paints (marble texture, specialized textures)",
      "Feature walls and custom palettes matching your interior style",
      "Professional color selection with Jotun & Sav catalogs",
      "Clean, precise finishing with full floor and furniture protection"
    ],
    process_ar: [
      "معاينة جدران الموقع والتأكد من عدم وجود رطوبة أو مشاكل فنية",
      "تحديد نوع الدهان ومستوى اللمعان المطلوب",
      "اختيار درجات الألوان وتنسيقها مع الإضاءة",
      "تجهيز السطح بالكامل (صنفرة، معجون، عوازل رطوبة)",
      "تنفيذ الدهانات بالخطوات الهندسية المعتمدة والتسليم نظيفاً"
    ],
    process_en: [
      "Inspect wall surfaces and check for dampness or cracks",
      "Determine paint type and preferred gloss/sheen level",
      "Select color shades and balance with space lighting",
      "Complete surface preparation (sanding, puttying, primers)",
      "Execute professional paint coats and deliver a clean space"
    ],
    suitable_for_ar: ["منازل", "فلل", "شقق", "واجهات", "صالات", "غرف"],
    suitable_for_en: ["Homes", "Villas", "Apartments", "Facades", "Living rooms", "Bedrooms"],
    cta_text_ar: "اطلب خدمة الدهانات الاحترافية",
    cta_text_en: "Request Professional Paint Service",
    before_image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    after_image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
    is_active: true,
    sort_order: 2,
    created_at: "2026-07-01T00:00:00.000Z",
    faqs: [
      {
        question_ar: "أي أنواع الأصباغ تستخدمون في أعمالكم؟",
        question_en: "Which paint brands do you utilize?",
        answer_ar: "نحن نستخدم بشكل أساسي أصباغ جوتن (Jotun) الفاخرة مثل فينوماستيك، بالإضافة لأصباغ ناشيونال وساف المعتمدة هندسياً.",
        answer_en: "We primarily utilize premium Jotun paints (such as Fenomastic) alongside top engineered paints like National and Sav."
      },
      {
        question_ar: "هل تقومون بحماية الأرضيات والأثاث أثناء الصبغ؟",
        question_en: "Do you protect our floors and furniture?",
        answer_ar: "نعم، نوفر تغطية وحماية كاملة لجميع الأرضيات والنوافذ والأثاث باستخدام رولات البلاستيك والشريط اللاصق قبل الصبغ.",
        answer_en: "Yes, we apply robust multi-layer plastic sheets and adhesive tapes to guarantee spotless floors and clean furniture."
      }
    ]
  },
  {
    id: "home-decoration",
    slug: "home-decoration",
    icon: "Sparkles",
    image_url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    name_ar: "أعمال الديكور",
    name_en: "Home Decoration",
    description_ar: "أعمال ديكور متكاملة تشمل الجبس، الإضاءة، اللوحات الجدارية، التشطيبات الجمالية، الستائر، واللمسات الكاملة.",
    description_en: "Complete decoration works including gypsum, lighting, wall panels, aesthetic finishes, curtains, and refined final touches.",
    detailed_desc_ar: "أعمال ديكور متكاملة تشمل الجبس، الإضاءة، اللوحات الجدارية، التشطيبات الجمالية، الستائر، المرايا، الإكسسوارات، واللمسات النهائية التي تمنح المكان فخامة وشخصية مميزة.",
    detailed_desc_en: "Complete decoration works including gypsum, lighting, wall panels, aesthetic finishes, curtains, mirrors, accessories, and final touches that give the space a luxurious and distinctive character.",
    features_ar: [
      "تركيب جبس بورد ديكوري وأسقف بتصاميم حديثة وكلاسيكية",
      "إضاءة مخفية، سبوت لايت، وتنسيق إضاءة متكامل",
      "تركيب كسوات جدارية فاخرة (بديل الرخام، بديل الخشب، ورق حائط)",
      "تفصيل ستائر، تركيب مرايا جدارية، وإطارات فوم فخمة",
      "تنسيق ديكور داخلي متكامل يعبر عن فخامة الهوية"
    ],
    features_en: [
      "Installation of gypsum board false ceilings with modern/classic patterns",
      "Hidden LED light channels, spotlight distribution, and ambient setups",
      "Premium wall cladding (marble alternative, wood louvers, wallpaper)",
      "Custom curtain designs, structural mirrors, and luxury foam profiles",
      "Coordinating full luxury interior decorations reflecting your taste"
    ],
    process_ar: [
      "تحليل أبعاد الغرفة أو الصالة ورفع المقاسات الفنية",
      "اختيار نمط الديكور المناسب والخامات مع مهندس الديكور",
      "تحديد نوع الإضاءة وتوزيع الديكورات الجدارية والجبس بورد",
      "تنفيذ أعمال الجبس والنجارة والكسوات بدقة وإشراف هندسي",
      "إضافة اللمسات الديكورية النهائية والمرايا والستائر والتسليم"
    ],
    process_en: [
      "Analyze room dimensions and complete precise technical measurements",
      "Choose decorative styles, panels, and materials with our designers",
      "Map out hidden lighting channels and false ceiling structures",
      "Execute gypsum framing, carpentry, and wall claddings under supervision",
      "Mount custom mirrors, install luxury curtains, and deliver your polished space"
    ],
    suitable_for_ar: ["مجالس", "صالات", "غرف نوم", "مداخل", "فلل", "شقق"],
    suitable_for_en: ["Majlis", "Living rooms", "Bedrooms", "Entrances", "Villas", "Apartments"],
    cta_text_ar: "اطلب تصميم وتركيب الديكور الآن",
    cta_text_en: "Request Custom Decoration Now",
    before_image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
    after_image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    is_active: true,
    sort_order: 3,
    created_at: "2026-07-01T00:00:00.000Z",
    faqs: [
      {
        question_ar: "هل تقومون بتركيب الجبس بورد المقاوم للرطوبة؟",
        question_en: "Do you offer moisture-resistant gypsum?",
        answer_ar: "نعم، نستخدم الجبس بورد الأخضر المقاوم للرطوبة والحرائق في المطابخ والحمامات والمناطق المعرضة للرطوبة.",
        answer_en: "Yes, we install premium green moisture-resistant gypsum boards in kitchens, bathrooms, and areas prone to humidity."
      },
      {
        question_ar: "هل تشمل أسعار الديكور تمديدات الإضاءة والكهرباء؟",
        question_en: "Are lighting wires and electrical setups included?",
        answer_ar: "نعم، تتضمن عروض أسعارنا أعمال تمديد كابلات الإضاءة المخفية والسبوت لايت وتهيئة التوصيلات الكهربائية بالكامل.",
        answer_en: "Yes, our quotations cover all back-end wiring for LED strips, spotlights, and standard electrical provisions."
      }
    ]
  },
  {
    id: "home-renovation",
    slug: "home-renovation",
    icon: "Wrench",
    image_url: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80",
    name_ar: "تجديد المنازل",
    name_en: "Home Renovation",
    description_ar: "تجديد شامل للمنازل والشقق لتحسين الشكل، الوظيفة، الراحة، وجودة الاستخدام.",
    description_en: "Complete home and apartment renovation to improve aesthetics, function, comfort, and usability.",
    detailed_desc_ar: "نقدم خدمات تجديد المنازل من التخطيط إلى التنفيذ، وتشمل المطابخ، الحمامات، الأرضيات، الأسقف، الإضاءة، الدهانات، الديكور، وتحسين توزيع المساحات بما يناسب احتياجات الأسرة.",
    detailed_desc_en: "We provide home renovation services from planning to execution, including kitchens, bathrooms, flooring, ceilings, lighting, painting, decoration, and layout improvements that match family needs.",
    features_ar: [
      "تجديد شامل للحمامات والمطابخ (عزل وتغيير سيراميك وأنابيب)",
      "تحديث أو تغيير الأرضيات (رخام، سيراميك، بورسلان، باركيه)",
      "تحسين وتعديل توزيع الغرف والجدران لزيادة الاتساع",
      "أعمال دهان وإعادة طلاء وصيانة جدران ومعالجة الرطوبة والملوحة",
      "تحديث كلي للمكان من الشكل القديم والمتهالك لشكل عصري فاخر"
    ],
    features_en: [
      "Complete kitchen and bathroom makeover (leak proofing, tiling, plumbing)",
      "Flooring replacement or polishing (marble, ceramic, porcelain, parquet)",
      "Wall re-allocations and room restructuring to optimize spaces",
      "Complete repaint, damp-proofing, and efflorescence wall treatments",
      "Transforming aged layout properties into modern functional homes"
    ],
    process_ar: [
      "معاينة الموقع الفنية لتقييم الأنابيب والكهرباء والجدران الحالية",
      "تحديد نطاق التجديد والمواد المطلوبة وصياغة عرض السعر",
      "تجهيز المخططات الفنية واعتمادات الألوان والرخام والبورسلان",
      "بدء أعمال الهدم والعزل والتأسيسات الكهربائية والصحية والتشطيبات",
      "مرحلة الدهان والديكور النهائي ثم التنظيف العميق والتسليم"
    ],
    process_en: [
      "On-site property inspection evaluating structural, plumbing, and wall issues",
      "Establish renovation scopes, select materials, and formulate quotation",
      "Draft layout blueprints and approve tiles, marbles, and color boards",
      "Initiate demolition, waterproofing, plumbing, flooring, and roughing works",
      "Apply premium final paints, mount decorations, complete deep cleaning, and deliver"
    ],
    suitable_for_ar: ["منازل قديمة", "شقق", "مساحات تحتاج تحسين", "مطابخ", "حمامات"],
    suitable_for_en: ["Old homes", "Apartments", "Spaces needing improvement", "Kitchens", "Bathrooms"],
    cta_text_ar: "اطلب معاينة لتجديد منزلك",
    cta_text_en: "Request Home Renovation Consultation",
    before_image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    after_image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
    is_active: true,
    sort_order: 4,
    created_at: "2026-07-01T00:00:00.000Z",
    faqs: [
      {
        question_ar: "هل يتطلب تجديد الشقة أو البيت إخلاء المكان بالكامل؟",
        question_en: "Do we need to vacate our home during renovation?",
        answer_ar: "حسب نطاق العمل، في حال تجديد الحمامات أو المطابخ والدهانات الشاملة، نفضل الإخلاء لضمان الحماية والسرعة في التنفيذ.",
        answer_en: "Depending on scale, for major wet-area work and full painting, vacating is highly recommended for speed and safety."
      },
      {
        question_ar: "هل تقومون بأعمال العزل المائي للحمامات والمطابخ؟",
        question_en: "Do you handle bathroom and kitchen waterproofing?",
        answer_ar: "نعم، نقوم بتطبيق عزل مائي احترافي متعدد الطبقات مع فحصه واختباره بالماء لمدة 48 ساعة قبل تركيب البورسلان.",
        answer_en: "Yes, we apply robust multi-coat liquid waterproofing membranes and carry out 48-hour water pond testing before tiles."
      }
    ]
  },
  {
    id: "villa-renovation",
    slug: "villa-renovation",
    icon: "Home",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    name_ar: "تجديد الفلل",
    name_en: "Villa Renovation",
    description_ar: "تجديد فلل شامل من الواجهات والحدائق إلى المساحات الداخلية والتشطيبات.",
    description_en: "Full villa renovation from facades and outdoor areas to interiors and luxury finishes.",
    detailed_desc_ar: "ننفذ تجديد الفلل بأسلوب متكامل يشمل الواجهات، المداخل، المجالس، الصالات، غرف النوم، المطابخ، الحمامات، الإضاءة، الأرضيات، الدهانات، والديكور الداخلي والخارجي.",
    detailed_desc_en: "We deliver complete villa renovation including facades, entrances, majlis rooms, living areas, bedrooms, kitchens, bathrooms, lighting, flooring, painting, and indoor/outdoor decoration.",
    features_ar: [
      "ترميم وتجديد واجهات الفلل بالدهانات المقاومة للطقس والبروفايل والأحجار",
      "تصميم وتجهيز المجالس الفاخرة والصالات بنقوش جبسية وإضاءة راقية",
      "صيانة وعزل الحمامات وإعادة تركيب أرضيات رخامية فخمة",
      "تجديد المطابخ بالكامل بأنظمة مطابخ عصرية وتجهيزات ذكية",
      "تحديث الديكور الخارجي والحدائق وتنسيق الإنارة الجدارية الخارجية للفيلا"
    ],
    features_en: [
      "Restoring villa exterior facades with weather-proof profile paints and stone",
      "Custom luxurious majlis room decoration with intricate gypsum and lighting",
      "Bathroom leak repairs, floor tile leveling, and marble installation",
      "Complete modern kitchen restructuring with intelligent layouts",
      "Upgrading outdoor seating areas, landscapes, and facade accent lighting"
    ],
    process_ar: [
      "زيارة ميدانية تفصيلية للفيلا وتقييم الحالة الإنشائية والفنية العامة",
      "مراجعة المخططات الهندسية وتحديد متطلبات التحديث والصيانة",
      "إعداد مقترحات التصميم ثلاثي الأبعاد وعرض السعر المفصل للمراحل",
      "البدء الفعلي للتنفيذ تحت إشراف هندسي صارم ومطابقة جدول الإنجاز",
      "مرحلة التشطيبات الفاخرة والتنظيف العام وتسليم الفيلا جاهزة للسكن"
    ],
    process_en: [
      "Conduct in-depth villa site survey evaluating structural and aesthetic levels",
      "Review layout constraints and document custom renovation plans",
      "Present photorealistic 3D concepts and draft detailed modular quotes",
      "Commence structural and finishing tasks under rigorous engineering supervision",
      "Apply luxury coatings, execute deep clean, and handover your magnificent villa"
    ],
    suitable_for_ar: ["فلل سكنية", "فلل قديمة", "مداخل", "واجهات", "مجالس", "مساحات خارجية"],
    suitable_for_en: ["Residential villas", "Older villas", "Entrances", "Facades", "Majlis", "Outdoor spaces"],
    cta_text_ar: "اطلب استشارة مجانية لتجديد الفيلا",
    cta_text_en: "Request Villa Renovation Site Visit",
    before_image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    after_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    is_active: true,
    sort_order: 5,
    created_at: "2026-07-01T00:00:00.000Z",
    faqs: [
      {
        question_ar: "ما هي تكلفة تجديد واجهة الفيلا الخارجية؟",
        question_en: "What is the cost of villa facade renovation?",
        answer_ar: "تعتمد التكلفة على نوع المواد (أحجار، دهان بروفايل مقاوم للحرارة، بديل الخشب الخارجي) ومساحة الواجهة، ونوفر عروضاً تنافسية بعد المعاينة.",
        answer_en: "Cost depends on chosen materials (stone, thermo-reflective paints, exterior composite wood) and surface size. We compile custom options after inspection."
      },
      {
        question_ar: "هل تشرفون على استخراج تصاريح البلدية للترميم؟",
        question_en: "Do you supervise municipality approvals for modifications?",
        answer_ar: "نعم، لدينا مهندسون يساعدون في توفير المخططات والمستندات الفنية اللازمة لتقديمها للجهات المعنية لتسهيل استخراج التصاريح.",
        answer_en: "Yes, our engineers compile all necessary blueprints and technical logs to assist in obtaining municipal modification permits."
      }
    ]
  },
  {
    id: "commercial-decoration",
    slug: "commercial-decoration",
    icon: "Building2",
    image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    name_ar: "ديكور المشاريع التجارية",
    name_en: "Commercial Decoration",
    description_ar: "تصميم وتنفيذ ديكور للمكاتب، المحلات، المطاعم، الصالونات، والمعارض.",
    description_en: "Design and decoration execution for offices, shops, restaurants, salons, and showrooms.",
    detailed_desc_ar: "نساعد المشاريع التجارية على بناء مساحة تعكس هوية النشاط وتخدم تجربة العملاء، من خلال تصميم وتنفيذ ديكورات المكاتب، المحلات، المطاعم، الصالونات، المعارض، ومناطق الاستقبال.",
    detailed_desc_en: "We help commercial projects create spaces that reflect their brand identity and improve customer experience through design and decoration for offices, shops, restaurants, salons, showrooms, and reception areas.",
    features_ar: [
      "تصميم وتقسيم مكاتب الشركات بمواد عزل صوت وتنسيق ألوان ملهم",
      "تنفيذ ديكورات محلات تجارية ومعارض لزيادة الجذب والمبيعات",
      "ديكورات وتنسيقات داخلية للمطاعم والمقاهي والصالونات الفخمة",
      "تصميم وتنفيذ مناطق الاستقبال وكونترات الخدمات الفاخرة",
      "تنفيذ تشطيبات وديكورات مطابقة للاشتراطات الفنية والبلدية والدفاع المدني"
    ],
    features_en: [
      "Office partition design using acoustic panel elements and inspiring colors",
      "Execution of retail store decorations and showcases to attract buyers",
      "Luxury layouts and decorations for restaurants, cafes, and premium salons",
      "Designing receptions, lobby spaces, and luxury service counters",
      "Execution matching local municipality and civil defense compliance criteria"
    ],
    process_ar: [
      "دراسة طبيعة النشاط التجاري وفهم الهوية البصرية للعلامة",
      "تحليل حركة العملاء والموظفين لتنظيم المساحة هندسياً",
      "اقتراح التصميم المناسب وعينات الخامات والأصباغ المتينة",
      "تنفيذ الديكور والتشطيبات الكهربائية والإضاءة تحت إشراف هندسي دائم",
      "تسليم نهائي منظم ومطابق لمتطلبات الترخيص التجاري والتشغيل"
    ],
    process_en: [
      "Study your commercial business and analyze corporate visual guidelines",
      "Analyze customer footprints and employee workflows to structure the layout",
      "Suggest compliant design directions, durable materials, and tailored paints",
      "Execute gypsum, partition, electrical, and decorative works under supervision",
      "Meticulous handover compliant with municipal commercial licensing schedules"
    ],
    suitable_for_ar: ["مكاتب", "محلات", "مطاعم", "صالونات", "معارض", "استقبالات"],
    suitable_for_en: ["Offices", "Shops", "Restaurants", "Salons", "Showrooms", "Reception areas"],
    cta_text_ar: "اطلب ديكور مشروعك التجاري",
    cta_text_en: "Request Commercial Decoration Quote",
    before_image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
    after_image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    is_active: true,
    sort_order: 6,
    created_at: "2026-07-01T00:00:00.000Z",
    faqs: [
      {
        question_ar: "هل تلتزمون بالمواعيد لتجنب خسائر الإيجار للمحل؟",
        question_en: "Can you guarantee tight delivery to avoid rent loss?",
        answer_ar: "نعم، نضع جدولاً زمنياً صارماً ومكتوباً في العقد ونضاعف فترات العمل لتسليم المحل بأسرع وقت لبدء التشغيل الفعلي.",
        answer_en: "Yes, we draft strict schedules in contracts and coordinate multi-shift crews to deliver your retail space swiftly."
      },
      {
        question_ar: "هل توفرون تصاميم معتمدة للدفاع المدني والبلدية؟",
        question_en: "Do you supply approved layouts for Civil Defense filings?",
        answer_ar: "نعم، نصمم المخططات والرسومات الفنية المطابقة للمعايير لتسهيل الحصول على موافقات بلدية دبي والدفاع المدني.",
        answer_en: "Yes, we draft layouts adhering strictly to regulations, helping you secure Dubai Municipality and Civil Defense approvals."
      }
    ]
  }
];
