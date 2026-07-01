-- supabase/seed.sql
-- Seed Data for AL HANA AL ZAHABYAH - Design & Decoration Works
-- Prepared by Sadek Elgazar

-- Seed Services
insert into public.services (name_ar, name_en, slug, description_ar, description_en, icon, image_url, sort_order)
values
('التصميم المنزلي', 'Home Design', 'home-design', 'تصميم المساحات المنزلية بأسلوب يجمع بين الجمال والوظيفة، مع اختيار الألوان، توزيع الأثاث، الإضاءة، والخامات بما يناسب ذوق العميل وطبيعة المكان.', 'Designing residential spaces combining beauty and functionality, including color selection, furniture layout, lighting, and premium materials.', 'Layout', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', 1),

('دهانات المنازل', 'Home Paint', 'home-paint', 'تنفيذ أعمال الدهانات الداخلية والخارجية، الدهانات الديكورية، المعالجات الجدارية، واختيار الألوان المناسبة لكل مساحة بأسلوب احترافي ونظيف.', 'Professional interior and exterior painting, decorative paint textures, wall treatments, and color consulting.', 'Paintbrush', 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80', 2),

('أعمال الديكور', 'Home Decoration', 'home-decoration', 'أعمال ديكور متكاملة تشمل الجبس، الإضاءة، اللوحات الجدارية، التشطيبات الجمالية، الستائر، واللمسات النهائية التي تمنح المكان طابعاً فاخراً.', 'Comprehensive decoration including gypsum ceilings, custom lighting, wall panels, premium finishes, and luxury draperies.', 'Sparkles', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', 3),

('تجديد المنازل', 'Home Renovation', 'home-renovation', 'تجديد المنازل والشقق من خلال تحسين التصميم، تحديث التشطيبات، تغيير الأرضيات، تطوير المطابخ والحمامات، وإعادة إحياء المساحة بالكامل.', 'Renovating homes and apartments by updating designs, finishes, premium floorings, modern kitchens, and luxury bathrooms.', 'Wrench', 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80', 4),

('تجديد الفلل', 'Villa Renovation', 'villa-renovation', 'حلول متقدمة لتجديد الفلل تشمل الواجهات، المجالس، غرف النوم، المداخل، الحدائق، الإضاءة، والديكور الداخلي والخارجي.', 'Premium villa renovation services covering structural facades, majlis areas, master bedrooms, entrances, and luxury landscaping.', 'Home', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 5),

('ديكور المشاريع التجارية', 'Commercial Decoration', 'commercial-decoration', 'تصميم وتنفيذ ديكورات المكاتب، المحلات، المطاعم، الصالونات، والمعارض التجارية بشكل يخدم العلامة ويجذب العملاء.', 'Designing and executing high-end interiors for offices, retail stores, restaurants, luxury salons, and showrooms.', 'Briefcase', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', 6);

-- Seed FAQ Items
insert into public.faq_items (question_ar, question_en, answer_ar, answer_en, category, sort_order)
values
('هل تقدمون زيارة معاينة؟', 'Do you provide on-site inspections?', 'نعم، نوفر خدمة زيارة المعاينة وقياس المساحات للموقع في جميع أنحاء الإمارات لمناقشة الأفكار والاحتياجات مباشرة.', 'Yes, we provide site visits and space measurements across the UAE to discuss your design requirements and ideas in person.', 'general', 1),

('هل يمكن طلب عرض سعر قبل التنفيذ؟', 'Can I request a quote before execution?', 'بالتأكيد، بعد زيارة المعاينة وتحديد نطاق العمل والتشطيبات المطلوبة، نرسل عرض سعر مفصل وواضح يوضح كافة التكاليف والمواد المستخدمة.', 'Absolutely! After the site visit and defining the scope of work and materials, we provide a transparent, detailed cost estimate.', 'quotes', 2),

('هل تعملون في جميع إمارات الدولة؟', 'Do you operate in all Emirates?', 'نعم، نحن نقدم خدماتنا في دبي، أبوظبي، الشارقة، عجمان، العين، الفجيرة، رأس الخيمة، وأم القيوين.', 'Yes, we execute luxury projects across Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, Fujairah, Ras Al Khaimah, and Umm Al Quwain.', 'general', 3),

('هل تقدمون تصاميم ثلاثية الأبعاد؟', 'Do you provide 3D designs?', 'نعم، لدينا قسم متخصص في التصاميم ثلاثية الأبعاد (3D Concept Design) لتمكين العميل من رؤية النتيجة النهائية لبيته أو فيلته قبل بدء العمل الفعلي.', 'Yes, we have a dedicated 3D Concept Design team that creates photorealistic renders so you can visualize your project before execution.', 'design', 4);

-- Seed Testimonials
insert into public.testimonials (customer_name, rating, comment_ar, comment_en, is_active)
values
('أحمد المهيري', 5, 'تجربة ممتازة مع شركة الهنا الذهبية لتجديد مجلس الفيلا الخاص بنا. العمل منظم جداً والالتزام بالوقت رائع والتشطيب يفوق التوقعات.', 'Excellent experience with Al Hana Al Zahabyah for our villa majlis renovation. Very organized work, amazing timing, and the finish exceeded expectations.', true),
('سارة الحمادي', 5, 'قمنا بالاتفاق معهم على تصميم وتنفيذ دهانات وديكورات الشقة بالكامل. شغل راقي وأسلوب تعامل احترافي، أنصح بالتعامل معهم بشدة.', 'We hired them for our apartment paints and decoration. Sophisticated work and professional communication. Highly recommended!', true),
('طارق الشامسي', 5, 'فريق عمل محترف صمم ونفذ ديكور مكتبنا الجديد في دبي. جودة المواد والجبس والإضاءة ممتازة، ويسهل متابعة مراحل العمل من خلال الموقع.', 'A highly professional team designed and executed our new office in Dubai. Outstanding gypsum, lighting, and materials quality.', true);
