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

const slide = (
  id: string,
  image: string,
  eyebrowAr: string,
  eyebrowEn: string,
  titleAr: string,
  titleEn: string,
  subtitleAr: string,
  subtitleEn: string,
  primaryCtaAr: string,
  primaryCtaEn: string,
  primaryHref: string,
  secondaryCtaAr: string,
  secondaryCtaEn: string,
  secondaryHref: string,
  serviceHref: string,
  imagePosition = 'center center'
): HeroSlide => ({
  id,
  image,
  eyebrowAr,
  eyebrowEn,
  titleAr,
  titleEn,
  subtitleAr,
  subtitleEn,
  primaryCtaAr,
  primaryCtaEn,
  primaryHref,
  secondaryCtaAr,
  secondaryCtaEn,
  secondaryHref,
  serviceHref,
  align: 'left',
  imagePosition,
});

export const heroSlides: HeroSlide[] = [
  slide('luxury-lounge', 'https://i.postimg.cc/NjvQZ2dd/1.png', 'تصميم فاخر • تنفيذ راقٍ • رؤية متكاملة', 'Luxury Design • Refined Execution • Complete Vision', 'نحو فضاءات راقية تعكس رؤيتك', 'Crafting Majestic Spaces That Reflect Your Vision', 'نقدم حلول التصميم والديكور والدهانات وتجديد المنازل بأسلوب فاخر وتنفيذ احترافي داخل الإمارات.', 'Premium design, decoration, painting, and renovation solutions with refined execution across the UAE.', 'اطلب عرض سعر', 'Request a Quote', '/request-quote', 'شاهد أعمالنا', 'View Projects', '/projects', '/services/home-design'),
  slide('villa-exterior', 'https://i.postimg.cc/T3jTx2sB/2.png', 'واجهات فاخرة • حضور معماري • قيمة أعلى', 'Luxury Facades • Architectural Presence • Higher Value', 'تجديد فلل بلمسة معمارية فاخرة', 'Luxury Villa Renovation With Architectural Presence', 'نحو واجهات ومساحات خارجية تمنح الفيلا حضوراً راقياً وترفع قيمة العقار.', 'Transforming villa facades and outdoor spaces into elegant architectural statements.', 'اطلب تجديد الفيلا', 'Request Villa Renovation', '/services/villa-renovation', 'تواصل معنا', 'Contact Us', '/contact', '/services/villa-renovation'),
  slide('arabian-majlis', 'https://i.postimg.cc/dVRJFQXP/3.png', 'مجالس عربية • إضاءة دافئة • تفاصيل ذهبية', 'Arabian Majlis • Warm Lighting • Golden Details', 'تصميم مجالس فاخرة بروح عربية راقية', 'Luxury Majlis Design With Refined Arabian Character', 'جلسات، إضاءة، نقوش، وستايل ضيافة فاخر يعكس ذوق أصحاب المكان.', 'Elegant seating, lighting, patterns, and hospitality details with a luxury Arabian feel.', 'اطلب أعمال الديكور', 'Request Decoration Works', '/services/home-decoration', 'شاهد قبل / بعد', 'See Before / After', '/before-after', '/services/home-decoration'),
  slide('luxury-bedroom', 'https://i.postimg.cc/kgN7CMHk/4.png', 'راحة • فخامة • تفاصيل فندقية', 'Comfort • Luxury • Hotel-Inspired Details', 'غرف نوم هادئة بتفاصيل فاخرة', 'Calm Luxury Bedrooms With Refined Details', 'تصميم يوازن بين الراحة اليومية والإضاءة الهادئة والخامات الراقية.', 'A balance of daily comfort, soft lighting, and premium materials.', 'اطلب التصميم', 'Request Design', '/services/home-design', 'ابدأ مشروعك', 'Start Your Project', '/request-quote', '/services/home-design'),
  slide('kitchen-dining', 'https://i.postimg.cc/rwGqTyb6/5.png', 'مطابخ • طعام • خامات عملية وفاخرة', 'Kitchens • Dining • Practical Luxury Materials', 'مطابخ ومساحات طعام بتشطيبات راقية', 'Luxury Kitchens and Dining Spaces', 'رخام، إضاءة، خامات ممتازة، وتفاصيل عملية تخدم الاستخدام اليومي.', 'Marble, lighting, premium materials, and functional details for daily living.', 'اطلب التجديد', 'Request Renovation', '/services/home-renovation', 'اطلب معاينة', 'Claim Site Inspection', '/request-quote', '/services/home-renovation'),
  slide('office-reception', 'https://i.postimg.cc/FHbhvFq9/6.png', 'مكاتب • استقبال • هوية تجارية', 'Offices • Reception • Commercial Identity', 'مكاتب واستقبالات تعكس قوة العلامة', 'Offices and Receptions That Reflect Brand Power', 'تصميم تجاري فاخر يمنح عملاءك انطباعاً قوياً من أول لحظة.', 'Premium commercial interiors that create a strong first impression.', 'اطلب ديكور تجاري', 'Request Commercial Decoration', '/services/commercial-decoration', 'تواصل معنا', 'Contact Us', '/contact', '/services/commercial-decoration'),
  slide('commercial-showroom', 'https://i.postimg.cc/T3jTx2S2/7.png', 'محلات • معارض • عرض فاخر', 'Shops • Showrooms • Premium Display', 'ديكور مشاريع تجارية يجذب العملاء', 'Commercial Decoration That Attracts Customers', 'محلات، معارض، صالونات، ومطاعم بتصميم منظم وفاخر.', 'Shops, showrooms, salons, and restaurants with organized luxury design.', 'ابدأ مشروعك التجاري', 'Start Your Commercial Project', '/services/commercial-decoration', 'شاهد المشاريع', 'View Projects', '/projects', '/services/commercial-decoration'),
  slide('before-after', 'https://i.postimg.cc/jS6RTq92/8.png', 'قبل / بعد • تحويل كامل • نتيجة ملموسة', 'Before / After • Full Transformation • Real Impact', 'حوّل مساحتك من عادية إلى فاخرة', 'Transform Your Space From Ordinary to Luxury', 'ارفع صور المكان ودع فريقنا يقترح أفضل اتجاه للتصميم أو التجديد.', 'Upload your space photos and let our team suggest the best design or renovation direction.', 'جرّب قبل / بعد', 'Explore Before / After', '/before-after', 'ارفع صور المكان', 'Upload Your Space', '/before-after#upload-space', '/before-after'),
  slide('ai-design', 'https://i.postimg.cc/g2yGpc5n/9.png', 'تصميم ذكي • تصور مبدئي • تجربة حديثة', 'Smart Design • Initial Vision • Modern Experience', 'ابدأ مشروعك مع مساعد التصميم الذكي', 'Start Your Project With AI Design Assistant', 'اختر النمط، ارفع الصور، وحدد ذوقك ليتم توجيهك نحو تصور مبدئي مناسب.', 'Choose your style, upload images, and define your taste to get a guided initial direction.', 'جرّب المساعد الذكي', 'Try AI Assistant', '/design-assistant', 'اطلب عرض سعر', 'Request Quote', '/request-quote', '/design-assistant'),
  slide('materials-moodboard', 'https://i.postimg.cc/cL7dW1jv/10.png', 'خامات • ألوان • مخططات تنفيذ', 'Materials • Colors • Execution Plans', 'اختيار الخامات يبدأ من رؤية واضحة', 'Material Selection Starts With a Clear Vision', 'ألوان، خامات، مخططات، ولمسات نهائية تصنع هوية المكان.', 'Colors, materials, plans, and finishing details that define the identity of the space.', 'اكتشف خدماتنا', 'Explore Services', '/services', 'تواصل معنا', 'Contact Us', '/contact', '/services'),
];
