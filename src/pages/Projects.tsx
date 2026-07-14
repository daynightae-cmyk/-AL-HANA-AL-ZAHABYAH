// src/pages/Projects.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockProjectGallery } from '../data/mockData';
import { ProjectGallery } from '../types/database';
import { X, Search, MapPin, ZoomIn, Eye, Sparkles } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { language, t } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectGallery | null>(null);
  const [lightboxMode, setLightboxMode] = useState<'main' | 'before' | 'after'>('main');

  const categories = [
    { label_ar: "الكل", label_en: "All Projects", value: "all" },
    { label_ar: "فيلات ومجالس", label_en: "Villas & Majlis", value: "villa" },
    { label_ar: "شقق سكنية", label_en: "Apartments", value: "apartment" },
    { label_ar: "مشاريع تجارية ومكاتب", label_en: "Commercial", value: "commercial" },
    { label_ar: "التصميم ثلاثي الأبعاد", label_en: "3D Design", value: "home-design" },
    { label_ar: "الدهانات الفاخرة", label_en: "Paints", value: "home-paint" },
    { label_ar: "أعمال الجبس والديكور", label_en: "Gypsum & Ceilings", value: "home-decoration" }
  ];

  const filteredProjects = mockProjectGallery.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'villa') return p.property_type === 'villa' || p.service_type === 'villa-renovation';
    if (filter === 'apartment') return p.property_type === 'apartment';
    if (filter === 'commercial') return p.service_type === 'commercial-decoration' || p.property_type === 'office' || p.property_type === 'salon';
    return p.service_type === filter;
  });

  const openLightbox = (project: ProjectGallery) => {
    setSelectedProject(project);
    setLightboxMode('main');
  };

  return (
    <div id="projects-page-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans">
      
      {/* Page Header */}
      <section className="relative py-16 px-4 text-center border-b border-amber-500/10 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-500/5 border border-amber-500/15">
            {language === 'ar' ? "معرض أعمال الهنا الذهبية" : "Our Visual Masterpieces"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.nav_projects}
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            {language === 'ar' ? "تصفح صور مشاريعنا المنفذة للفلل والمجالس والشقق والدهانات الديكورية الفاخرة في الإمارات." : "Filter and inspect our authentic interior decorations, paints, and gypsum layouts."}
          </p>
        </div>
      </section>

      {/* Filter Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-2 flex-wrap pb-4 border-b border-neutral-900">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer ${
                filter === cat.value
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/15'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/25'
              }`}
            >
              {language === 'ar' ? cat.label_ar : cat.label_en}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {filteredProjects.length === 0 ? (
          <div className="p-12 rounded-xl bg-neutral-900 border border-neutral-850 text-center max-w-md mx-auto">
            <span className="text-sm font-bold text-neutral-400 block mb-2">
              {language === 'ar' ? "قريباً في المعرض" : "Coming Soon"}
            </span>
            <p className="text-xs text-neutral-500">
              {language === 'ar' ? "يرفع مهندسونا صور المشاريع الجديدة بانتظام. تفضل باختيار تصنيف آخر." : "Our site supervisors upload real progress photos regularly. Select another category."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-xl overflow-hidden bg-neutral-900 border border-neutral-850 shadow-lg hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                {/* Visual block */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={project.main_image_url}
                    alt={language === 'ar' ? project.title_ar : project.title_en}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Glass overlayer on hover */}
                  <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => openLightbox(project)}
                      className="p-3 rounded-full bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-transform hover:scale-110 shadow-lg font-bold cursor-pointer"
                      title={language === 'ar' ? "تكبير واستعراض" : "Enlarge Lightbox"}
                    >
                      <ZoomIn className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Top-right featured badge */}
                  {project.is_featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded shadow">
                      {language === 'ar' ? "فاخر ★" : "LUX ★"}
                    </div>
                  )}

                  {/* Before/After tag overlay */}
                  {project.before_image_url && project.after_image_url && (
                    <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md border border-amber-500/30 px-2 py-0.5 rounded text-[9px] font-mono text-amber-400">
                      {language === 'ar' ? "مقارنة قبل / بعد" : "Before & After"}
                    </div>
                  )}
                </div>

                {/* Meta details */}
                <div className="p-5 text-start space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-widest">
                      {project.service_type.replace('-', ' ')}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{project.emirate}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {language === 'ar' ? project.title_ar : project.title_en}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {language === 'ar' ? project.description_ar : project.description_en}
                  </p>

                  <div className="pt-3 border-t border-neutral-850 flex items-center justify-between">
                    <button
                      onClick={() => openLightbox(project)}
                      className="text-xs font-mono font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 shrink-0" />
                      <span>{language === 'ar' ? "عرض التفاصيل والصور" : "Inspect Images"}</span>
                    </button>
                    <span className="text-[9px] text-neutral-600 font-mono">
                      AHZ-00{project.id.replace('g', '')}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal overlay */}
      {selectedProject && (
        <div
          id="gallery-lightbox-overlay"
          className="fixed inset-0 z-50 bg-neutral-950/98 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch">
            
            {/* Close trigger */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-950/80 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Graphics viewport (Left/Span 7) */}
            <div className="md:w-7/12 bg-neutral-950 flex flex-col justify-center relative min-h-[300px] md:min-h-[450px]">
              
              <img
                src={
                  lightboxMode === 'before'
                    ? selectedProject.before_image_url
                    : lightboxMode === 'after'
                    ? selectedProject.after_image_url
                    : selectedProject.main_image_url
                }
                alt="Active viewing"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[500px]"
              />

              {/* Toggle controls for Before / After */}
              {selectedProject.before_image_url && selectedProject.after_image_url && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-neutral-900/90 backdrop-blur-md border border-amber-500/20 px-3 py-1.5 rounded-full shadow-lg">
                  <button
                    onClick={() => setLightboxMode('before')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full font-mono ${
                      lightboxMode === 'before' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-neutral-400'
                    }`}
                  >
                    {language === 'ar' ? "قبل" : "Before"}
                  </button>
                  <button
                    onClick={() => setLightboxMode('main')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full font-mono ${
                      lightboxMode === 'main' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400'
                    }`}
                  >
                    {language === 'ar' ? "التسليم" : "Handover"}
                  </button>
                  <button
                    onClick={() => setLightboxMode('after')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full font-mono ${
                      lightboxMode === 'after' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-neutral-400'
                    }`}
                  >
                    {language === 'ar' ? "بعد" : "After"}
                  </button>
                </div>
              )}
            </div>

            {/* Project logs (Right/Span 5) */}
            <div className="md:w-5/12 p-6 sm:p-8 flex flex-col justify-between text-start space-y-6 bg-neutral-900">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-amber-500/5 border border-amber-500/20 text-amber-400 text-[10px] font-mono uppercase tracking-wider font-bold">
                    {selectedProject.service_type.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    {selectedProject.emirate}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  {language === 'ar' ? selectedProject.title_ar : selectedProject.title_en}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed pt-2 border-t border-neutral-800">
                  {language === 'ar' ? selectedProject.description_ar : selectedProject.description_en}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="block text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    {language === 'ar' ? "المنطقة والموقع:" : "Property Specifications:"}
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400 font-sans">
                    <div className="bg-neutral-950 p-2.5 rounded border border-neutral-850">
                      <span className="block text-[9px] text-neutral-500 font-mono uppercase">Emirate</span>
                      <span className="font-bold text-white">{selectedProject.emirate}</span>
                    </div>
                    <div className="bg-neutral-950 p-2.5 rounded border border-neutral-850">
                      <span className="block text-[9px] text-neutral-500 font-mono uppercase">Property Type</span>
                      <span className="font-bold text-white">{selectedProject.property_type || "Villa"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800">
                <Link
                  to="/request-quote"
                  className="block w-full text-center py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-extrabold text-xs shadow-md"
                  onClick={() => setSelectedProject(null)}
                >
                  {language === 'ar' ? "طلب معاينة لمشروع مماثل" : "Request Quote For Similar Project"}
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
