// src/data/heroSlides.ts

export interface HeroSlide {
  id: string;
  image: string;
  eyebrowAr: string;
  eyebrowEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  primaryCtaAr: string;
  primaryCtaEn: string;
  primaryHref: string;
  secondaryCtaAr: string;
  secondaryCtaEn: string;
  secondaryHref: string;
  serviceHref: string;
  align: string;
  imagePosition: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "luxury-lounge",
    image: "https://i.postimg.cc/NjvQZ2dd/1.png",
    eyebrowAr: "تصميم فاخر • تنفيذ راقٍ • رؤية متكاملة",
    eyebrowEn: "Luxury Design • Refined Execution • Complete Vision",
    titleAr: "نحو فضاءات راقية تعكس رؤيتك",
    titleEn: "Crafting Majestic Spaces That Reflect Your Vision",
    subtitleAr: "نقدم حلول التصميم، الديكور، الدهانات، وتجديد المنازل بأسلوب فاخر وتنفيذ احترافي داخل الإمارات.",
    subtitleEn: "Premium design, decoration, painting, and renovation solutions with refined execution across the UAE.",
    primaryCtaAr: "اطلب عرض سعر",
    primaryCtaEn: "Request a Quote",
    primaryHref: "/request-quote",
    secondaryCtaAr: "شاهد أعمالنا",
    secondaryCtaEn: "View Projects",
    secondaryHref: "/projects",
    serviceHref: "/services/home-design",
    align: "left",
    imagePosition: "center center"
  },
  {
    id: "villa-exterior",
    image: "https://i.postimg.cc/T3jTx2sB/2.png",
    eyebrowAr: "واجهات فاخرة • حضور معماري • قيمة أعلى",
    eyebrowEn: "Luxury Facades • Architectural Presence • Higher Value",
    titleAr: "تجديد فلل بلمسة معمارية فاخرة",
    titleEn: "Luxury Villa Renovation With Architectural Presence",
    subtitleAr: "نحو واجهات ومساحات خارجية تمنح الفيلا حضوراً راقياً وترفع قيمة العقار.",
    subtitleEn: "Transforming villa facades and outdoor spaces into elegant architectural statements.",
    primaryCtaAr: "اطلب تجديد الفيلا",
    primaryCtaEn: "Request Villa Renovation",
    primaryHref: "/services/villa-renovation",
    secondaryCtaAr: "تواصل واتساب",
    secondaryCtaEn: "WhatsApp Us",
    secondaryHref: "https://wa.me/971555587699",
    serviceHref: "/services/villa-renovation",
    align: "left",
    imagePosition: "center center"
  },
  {
    id: "arabian-majlis",
    image: "https://i.postimg.cc/dVRJFQXP/3.png",
    eyebrowAr: "مجالس عربية • إضاءة دافئة • تفاصيل ذهبية",
    eyebrowEn: "Arabian Majlis • Warm Lighting • Golden Details",
    titleAr: "تصميم مجالس فاخرة بروح عربية راقية",
    titleEn: "Luxury Majlis Design With Refined Arabian Character",
    subtitleAr: "جلسات، إضاءة، نقوش، وستايل ضيافة فاخر يعكس ذوق أصحاب المكان.",
    subtitleEn: "Elegant seating, lighting, patterns, and hospitality details with a luxury Arabian feel.",
    primaryCtaAr: "اطلب أعمال الديكور",
    primaryCtaEn: "Request Decoration Works",
    primaryHref: "/services/home-decoration",
    secondaryCtaAr: "شاهد قبل / بعد",
    secondaryCtaEn: "See Before / After",
    secondaryHref: "/before-after",
    serviceHref: "/services/home-decoration",
    align: "left",
    imagePosition: "center center"
  },
  {
    id: "luxury-bedroom",
    image: "https://i.postimg.cc/kgN7CMHk/4.png",
    eyebrowAr: "راحة • فخامة • تفاصيل فندقية",
    eyebrowEn: "Comfort • Luxury • Hotel-Inspired Details",
    titleAr: "غرف نوم هادئة بتفاصيل فاخرة",
    titleEn: "Calm Luxury Bedrooms With Refined Details",
    subtitleAr: "تصميم يوازن بين الراحة اليومية، الإضاءة الهادئة، والخامات الراقية.",
    subtitleEn: "A balance of daily comfort, soft lighting, and premium materials.",
    primaryCtaAr: "اطلب التصميم",
    primaryCtaEn: "Request Design",
    primaryHref: "/services/home-design",
    secondaryCtaAr: "ابدأ مشروعك",
    secondaryCtaEn: "Start Your Project",
    secondaryHref: "/request-quote",
    serviceHref: "/services/home-design",
    align: "left",
    imagePosition: "center center"
  },
  {
    id: "kitchen-dining",
    image: "https://i.postimg.cc/rwGqTyb6/5.png",
    eyebrowAr: "مطابخ • طعام • خامات عملية وفاخرة",
    eyebrowEn: "Kitchens • Dining • Practical Luxury Materials",
    titleAr: "مطابخ ومساحات طعام بتشطيبات راقية",
    titleEn: "Luxury Kitchens and Dining Spaces",
    subtitleAr: "رخام، إضاءة، خامات ممتازة، وتفاصيل عملية تخدم الاستخدام اليومي.",
    subtitleEn: "Marble, lighting, premium materials, and functional details for daily living.",
    primaryCtaAr: "اطلب التجديد",
    primaryCtaEn: "Request Renovation",
    primaryHref: "/services/home-renovation",
    secondaryCtaAr: "اطلب معاينة",
    secondaryCtaEn: "Claim Site Inspection",
    secondaryHref: "/request-quote",
    serviceHref: "/services/home-renovation",
    align: "left",
    imagePosition: "center center"
  },
  {
    id: "office-reception",
    image: "https://i.postimg.cc/FHbhvFq9/6.png",
    eyebrowAr: "مكاتب • استقبال • هوية تجارية",
    eyebrowEn: "Offices • Reception • Commercial Identity",
    titleAr: "مكاتب واستقبالات تعكس قوة العلمة",
    titleEn: "Offices and Receptions That Reflect Brand Power",
    subtitleAr: "تصميم تجاري فاخر يمنح عملاءك انطباعاً قوياً من أول لحظة.",
    subtitleEn: "Premium commercial interiors that create a strong first impression.",
    primaryCtaAr: "اطلب ديكور تجاري",
    primaryCtaEn: "Request Commercial Decoration",
    primaryHref: "/services/commercial-decoration",
    secondaryCtaAr: "تواصل معنا",
    secondaryCtaEn: "Contact Us",
    secondaryHref: "/contact",
    serviceHref: "/services/commercial-decoration",
    align: "left",
    imagePosition: "center center"
  },
  {
    id: "commercial-showroom",
    image: "https://i.postimg.cc/T3jTx2S2/7.png",
    eyebrowAr: "محلات • معارض • عرض فاخر",
    eyebrowEn: "Shops • Showrooms • Premium Display",
    titleAr: "ديكور مشاريع تجارية يجذب العملاء",
    titleEn: "Commercial Decoration That Attracts Customers",
    subtitleAr: "محلات، معارض، صالونات، ومطاعم بتصميم منظم وفاخر.",
    subtitleEn: "Shops, showrooms, salons, and restaurants with organized luxury design.",
    primaryCtaAr: "ابدأ مشروعك التجاري",
    primaryCtaEn: "Start Your Commercial Project",
    primaryHref: "/services/commercial-decoration",
    secondaryCtaAr: "شاهد المشاريع",
    secondaryCtaEn: "View Projects",
    secondaryHref: "/projects",
    serviceHref: "/services/commercial-decoration",
    align: "left",
    imagePosition: "center center"
  },
  {
    id: "before-after",
    image: "https://i.postimg.cc/jS6RTq92/8.png",
    eyebrowAr: "قبل / بعد • تحويل كامل • نتيجة ملموسة",
    eyebrowEn: "Before / After • Full Transformation • Real Impact",
    titleAr: "حوّل مساحتك من عادية إلى فاخرة",
    titleEn: "Transform Your Space From Ordinary to Luxury",
    subtitleAr: "ارفع صور المكان ودع فريقنا يقترح أفضل اتجاه للتصميم أو التجديد.",
    subtitleEn: "Upload your space photos and let our team suggest the best design or renovation direction.",
    primaryCtaAr: "جرّب قبل / بعد",
    primaryCtaEn: "Explore Before / After",
    primaryHref: "/before-after",
    secondaryCtaAr: "ارفع صور المكان",
    secondaryCtaEn: "Upload Your Space",
    secondaryHref: "/before-after#upload-space",
    serviceHref: "/before-after",
    align: "left",
    imagePosition: "center center"
  },
  {
    id: "ai-design",
    image: "https://i.postimg.cc/g2yGpc5n/9.png",
    eyebrowAr: "تصميم ذكي • تصور مبدئي • تجربة حديثة",
    eyebrowEn: "Smart Design • Initial Vision • Modern Experience",
    titleAr: "ابدأ مشروعك مع مساعد التصميم الذكي",
    titleEn: "Start Your Project With AI Design Assistant",
    subtitleAr: "اختر النمط، ارفع الصور، وحدد ذوقك ليتم توجيهك نحو تصور مبدئي مناسب.",
    subtitleEn: "Choose your style, upload images, and define your taste to get a guided initial direction.",
    primaryCtaAr: "جرّب المساعد الذكي",
    primaryCtaEn: "Try AI Assistant",
    primaryHref: "/design-assistant",
    secondaryCtaAr: "اطلب عرض سعر",
    secondaryCtaEn: "Request Quote",
    secondaryHref: "/request-quote",
    serviceHref: "/design-assistant",
    align: "left",
    imagePosition: "center center"
  },
  {
    id: "materials-moodboard",
    image: "https://i.postimg.cc/cL7dW1jv/10.png",
    eyebrowAr: "خامات • ألوان • مخططات تنفيذ",
    eyebrowEn: "Materials • Colors • Execution Plans",
    titleAr: "اختيار الخامات يبدأ من رؤية واضحة",
    titleEn: "Material Selection Starts With a Clear Vision",
    subtitleAr: "ألوان، خامات، مخططات، ولمسات نهائية تصنع هوية المكان.",
    subtitleEn: "Colors, materials, plans, and finishing details that define the identity of the space.",
    primaryCtaAr: "اكتشف خدماتنا",
    primaryCtaEn: "Explore Services",
    primaryHref: "/services",
    secondaryCtaAr: "تواصل واتساب",
    secondaryCtaEn: "WhatsApp Us",
    secondaryHref: "https://wa.me/971555587699",
    serviceHref: "/services",
    align: "left",
    imagePosition: "center center"
  }
];
