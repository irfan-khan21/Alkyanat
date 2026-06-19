import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Calendar, Tag } from 'lucide-react';
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
    <div className={`min-h-screen bg-slate-50 text-slate-700 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="blog" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[88px] relative">
        
        {/* Glow decoration */}
        <div className="absolute top-20 left-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Breadcrumb Header Banner (Futuristic Charcoal/Navy theme) */}
        <section className="bg-brand-navy text-white py-20 relative overflow-hidden border-b border-white/[0.06]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
              {data.hero.title}
            </h1>
            <p className="text-sm md:text-base text-slate-450 max-w-2xl mx-auto leading-relaxed font-medium">
              {data.hero.subtitle}
            </p>
            {/* Breadcrumb nav */}
            <div className={`flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-widest pt-2`}>
              <a href="#/home" onClick={(e) => handleLinkClick(e, 'home')} className="text-slate-400 hover:text-brand-orange transition-colors">
                {data.hero.breadcrumbHome}
              </a>
              <span className="text-slate-600">/</span>
              <span className="text-brand-orange font-extrabold">
                {data.hero.breadcrumbCurrent}
              </span>
            </div>
          </div>
        </section>

        {/* Blog Post List Section */}
        <section className="py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.posts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white border border-slate-200/80 hover:border-brand-orange/30 rounded-3xl p-8 hover:bg-slate-50/50 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[0_10px_30px_-15px_rgba(255,107,0,0.08)] relative overflow-hidden group shadow-sm"
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  
                  <div className="space-y-5">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                      <span className="inline-flex items-center gap-1.5 text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 rounded-full font-extrabold text-[10px] uppercase tracking-wider font-display shadow-sm">
                        <Tag className="h-3 w-3" />
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                        <Calendar className="h-3.5 w-3.5 opacity-85" />
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-brand-orange transition-colors duration-200 font-display">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
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
