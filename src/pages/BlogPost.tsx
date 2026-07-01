// src/pages/BlogPost.tsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockBlogPosts } from '../data/mockData';
import { COMPANY } from '../lib/constants';
import { Calendar, Clock, User, ArrowLeft, AlertTriangle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useApp();

  const post = mockBlogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getPostCategoryLabel = (postId: string) => {
    if (postId === 'b1') return language === 'ar' ? 'دهانات وأصباغ' : 'Paints & Coatings';
    if (postId === 'b2') return language === 'ar' ? 'ديكور وجبس' : 'Gypsum & Decor';
    return language === 'ar' ? 'أفكار تصاميم' : 'Design Ideas';
  };

  if (!post) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center text-center px-4">
        <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">
          {language === 'ar' ? 'المقال غير متوفر' : 'Article Not Found'}
        </h1>
        <p className="text-sm text-neutral-400 mb-6 max-w-md">
          {language === 'ar' ? 'عذراً، ربما تم حذف هذا المقال أو تعديل مساره.' : 'Sorry, the specified post cannot be resolved or has been archived.'}
        </p>
        <Link to="/blog" className="px-6 py-2.5 rounded bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-sm">
          {language === 'ar' ? 'تصفح بقية المقالات' : 'Return to Blog'}
        </Link>
      </div>
    );
  }

  const formattedDate = post.created_at.split('T')[0];
  const categoryLabel = getPostCategoryLabel(post.id);

  return (
    <>
      <SEOHead
        title={language === 'ar' ? post.title_ar : post.title_en}
        description={language === 'ar' ? post.excerpt_ar : post.excerpt_en}
        image={post.cover_image_url}
        canonicalPath={`/blog/${post.id}`}
      />
      <div id="blog-post-detail-container" className="pt-24 min-h-screen bg-neutral-950 text-white font-sans text-start">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-12 space-y-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-500 hover:text-amber-400">
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{language === 'ar' ? 'العودة لقائمة المقالات' : 'Back to Blog Hub'}</span>
          </Link>

          <div>
            <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest">
              {categoryLabel}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {language === 'ar' ? post.title_ar : post.title_en}
          </h1>

          <div className="flex items-center gap-4 text-xs text-neutral-500 font-mono border-y border-neutral-900 py-3">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-500" />
              <span>{language === 'ar' ? 'الهنا الذهبية' : 'AHZ Team'}</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>{formattedDate}</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{language === 'ar' ? 'قراءة 5 دقائق' : '5 min read'}</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden h-64 sm:h-[400px] w-full border border-neutral-850 shadow-2xl">
            <img src={post.cover_image_url} alt={language === 'ar' ? post.title_ar : post.title_en} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            <article className="lg:col-span-8 space-y-6 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              <p className="font-semibold text-white text-base border-r-4 border-amber-500 pr-3 rtl:border-r-4 rtl:border-l-0 rtl:pl-0 ltr:border-l-4 ltr:border-r-0 ltr:pl-3">
                {language === 'ar' ? post.excerpt_ar : post.excerpt_en}
              </p>
              <div className="whitespace-pre-line space-y-4">
                {language === 'ar' ? post.content_ar : post.content_en}
              </div>
            </article>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 p-6 rounded-2xl bg-neutral-900 border border-neutral-850 shadow-xl space-y-6 text-center">
                <span className="block text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">
                  {language === 'ar' ? 'استشارة هندسية مجانية' : 'Free On-Site Planning'}
                </span>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {language === 'ar'
                    ? 'هل ترغب في تطبيق هذه الأفكار أو الدهانات الملكية في فلتك أو منزلك بالإمارات؟ قس مساحتك مجاناً الآن.'
                    : 'Would you like to integrate these royal Jotun shades or LED profiles in your UAE residence? Claim your site inspection.'}
                </p>

                <div className="space-y-3 pt-2">
                  <Link to="/request-quote" className="block w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 font-extrabold text-xs shadow-md">
                    {t.btn_request_quote}
                  </Link>
                  <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-xs font-bold font-mono">
                    {t.btn_chat_whatsapp}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
};
