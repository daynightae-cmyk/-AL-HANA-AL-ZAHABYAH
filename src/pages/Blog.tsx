// src/pages/Blog.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockBlogPosts } from '../data/mockData';
import { Calendar, User, Clock, ArrowRight, Search, FileText } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { language, t } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tags = [
    { label_ar: "الكل", label_en: "All", value: "all" },
    { label_ar: "الأصباغ والدهانات", label_en: "Paints", value: "paints" },
    { label_ar: "الجبس والديكور", label_en: "Gypsum", value: "gypsum" },
    { label_ar: "أفكار التصميم", label_en: "Design", value: "design" }
  ];

  const getPostCategory = (id: string) => {
    if (id === 'b1') return 'paints';
    if (id === 'b2') return 'gypsum';
    return 'design';
  };

  const getPostCategoryLabel = (id: string) => {
    const cat = getPostCategory(id);
    if (cat === 'paints') return language === 'ar' ? "دهانات وأصباغ" : "Paints & Coatings";
    if (cat === 'gypsum') return language === 'ar' ? "ديكور وجبس" : "Gypsum & Decor";
    return language === 'ar' ? "أفكار تصاميم" : "Design Ideas";
  };

  const filteredPosts = mockBlogPosts.filter((post) => {
    const postCategory = getPostCategory(post.id);
    const matchesTag = selectedTag === 'all' || postCategory === selectedTag;
    
    // search query filter
    const query = searchQuery.toLowerCase();
    const titleText = (language === 'ar' ? post.title_ar : post.title_en).toLowerCase();
    const excerptText = (language === 'ar' ? post.excerpt_ar : post.excerpt_en).toLowerCase();
    const matchesSearch = titleText.includes(query) || excerptText.includes(query);

    return matchesTag && matchesSearch;
  });

  return (
    <div id="blog-page-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      
      {/* Page Header */}
      <section className="relative py-12 px-4 text-center border-b border-amber-500/10 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-500/5 border border-amber-500/15">
            {language === 'ar' ? "مدونة الهنا الذهبية" : "Expert Insights"}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            {t.nav_blog}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            {language === 'ar' ? "مقالات هندسية ونصائح من خبرائنا حول اختيار أصباغ جوتن وتنسيق أسقف الجبس والديكور." : "Professional articles and guidelines from our lead interior architects."}
          </p>
        </div>
      </section>

      {/* Filter and Search controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-neutral-900">
          
          {/* Categories Toggle buttons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {tags.map((tag) => (
              <button
                key={tag.value}
                onClick={() => setSelectedTag(tag.value)}
                className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
                  selectedTag === tag.value
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400'
                }`}
              >
                {language === 'ar' ? tag.label_ar : tag.label_en}
              </button>
            ))}
          </div>

          {/* Text Filter Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? "ابحث في المقالات..." : "Search articles..."}
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/50 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none placeholder:text-neutral-600"
            />
          </div>

        </div>
      </section>

      {/* Articles Grid List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 w-full flex-1">
        {filteredPosts.length === 0 ? (
          <div className="p-12 rounded-xl bg-neutral-900 border border-neutral-850 text-center max-w-sm mx-auto">
            <FileText className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            <span className="text-sm font-bold text-neutral-400 block">
              {language === 'ar' ? "لا توجد منشورات متطابقة" : "No posts found"}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-start">
            {filteredPosts.map((post) => {
              const formattedDate = post.created_at.split('T')[0];
              const categoryLabel = getPostCategoryLabel(post.id);

              return (
                <div
                  key={post.id}
                  className="group rounded-xl overflow-hidden bg-neutral-900 border border-neutral-850 shadow-lg hover:border-amber-500/20 transition-all flex flex-col justify-between"
                >
                  {/* Image block */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.cover_image_url}
                      alt={language === 'ar' ? post.title_ar : post.title_en}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-neutral-950/80 px-2 py-0.5 rounded text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      {categoryLabel}
                    </div>
                  </div>

                  {/* Content summary */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-mono">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formattedDate}</span>
                        </div>
                        <span>|</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{language === 'ar' ? "قراءة 5 دقائق" : "5 min read"}</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                        {language === 'ar' ? post.title_ar : post.title_en}
                      </h3>

                      <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                        {language === 'ar' ? post.excerpt_ar : post.excerpt_en}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-850 flex items-center justify-between">
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-xs font-mono font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1"
                      >
                        <span>{language === 'ar' ? "اقرأ المقال الكامل" : "Read Full Post"}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </Link>
                      <span className="text-[10px] text-neutral-600 font-mono font-bold">
                        BY: {language === 'ar' ? "الهنا الذهبية" : "AHZ Team"}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};
