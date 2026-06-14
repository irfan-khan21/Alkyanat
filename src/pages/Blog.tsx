import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChevronRight, Calendar, Tag } from 'lucide-react';
import blogData from '../data/blogData.json';

interface BlogProps {
  currentLang: 'EN' | 'AR';
  onLangChange: (lang: 'EN' | 'AR') => void;
  onPageChange: (page: 'home' | 'about' | 'services' | 'blog' | 'contact') => void;
}

export const Blog: React.FC<BlogProps> = ({ currentLang, onLangChange, onPageChange }) => {
  const langKey = currentLang.toLowerCase() as 'en' | 'ar';
  const data = blogData[langKey];
  const isRtl = currentLang === 'AR';

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'about' | 'services' | 'blog' | 'contact') => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className={`min-h-screen bg-white text-slate-800 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="blog" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[88px]">
        
        {/* Breadcrumb Header Banner (Light Blue/Ice-Blue Theme) */}
        <section className="bg-brand-bg-light text-brand-navy py-16 md:py-20 relative overflow-hidden border-b border-brand-bg-light/80">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#5777ff_1px,transparent_1px),linear-gradient(to_bottom,#5777ff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-navy">
              {data.hero.title}
            </h1>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              {data.hero.subtitle}
            </p>
            {/* Breadcrumb nav */}
            <div className={`flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-widest pt-2`}>
              <a href="#/home" onClick={(e) => handleLinkClick(e, 'home')} className="text-slate-500 hover:text-brand-blue transition-colors">
                {data.hero.breadcrumbHome}
              </a>
              <span className="text-slate-400">/</span>
              <span className="text-brand-blue font-extrabold">
                {data.hero.breadcrumbCurrent}
              </span>
            </div>
          </div>
        </section>

        {/* Blog Post List Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.posts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white border border-slate-100 rounded-3xl p-8 hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-brand-navy/5 relative overflow-hidden group"
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  
                  <div className="space-y-4">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between text-xs font-bold text-slate-450">
                      <span className="inline-flex items-center gap-1.5 text-brand-blue bg-brand-bg-light px-3.5 py-1.5 rounded-full font-extrabold text-[10px] uppercase tracking-wider">
                        <Tag className="h-3 w-3" />
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                        <Calendar className="h-3.5 w-3.5 opacity-80" />
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-brand-navy tracking-tight leading-snug group-hover:text-brand-blue transition-colors duration-200">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <a 
                    href="#/blog"
                    onClick={(e) => handleLinkClick(e, 'blog')}
                    className="inline-flex items-center gap-1 mt-8 text-[11px] font-bold uppercase tracking-widest text-brand-navy hover:text-brand-blue transition-all w-fit cursor-pointer group/link"
                  >
                    <span>{post.readMore}</span>
                    <ChevronRight className={`h-4 w-4 stroke-[3] transition-transform duration-200 group-hover/link:translate-x-1 ${isRtl ? 'rotate-180 group-hover/link:-translate-x-1' : ''}`} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} onPageChange={onPageChange} />
    </div>
  );
};

export default Blog;
