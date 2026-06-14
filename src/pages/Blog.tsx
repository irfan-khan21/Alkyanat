import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChevronRight } from 'lucide-react';
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
    <div className={`min-h-screen bg-white text-zinc-800 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="blog" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[104px]">
        
        {/* Breadcrumb Header Banner (Dark theme) */}
        <section className="bg-brand-dark text-white py-16 relative overflow-hidden border-b border-zinc-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              {data.hero.title}
            </h1>
            <p className="text-xs md:text-sm text-zinc-450 max-w-2xl mx-auto leading-relaxed">
              {data.hero.subtitle}
            </p>
            {/* Breadcrumb nav */}
            <div className={`flex items-center justify-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 pt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <a href="#/home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-brand-yellow transition-colors">
                {data.hero.breadcrumbHome}
              </a>
              <span className="text-zinc-700">/</span>
              <span className="text-brand-yellow">
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
                  className="bg-zinc-50/40 border border-zinc-200/60 rounded-3xl p-8 hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between hover:shadow-md relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-brand-yellow transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  
                  <div className="space-y-4">
                    <div className={`flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-zinc-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="text-brand-yellow bg-brand-dark px-2.5 py-1 rounded-lg">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-lg font-black text-brand-dark tracking-tight leading-snug group-hover:text-brand-yellow transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <a 
                    href="#/blog"
                    onClick={(e) => handleLinkClick(e, 'blog')}
                    className="inline-flex items-center gap-1 mt-6 text-[10px] font-black uppercase tracking-widest text-brand-dark hover:text-brand-yellow transition-all w-fit cursor-pointer"
                  >
                    <span>{post.readMore}</span>
                    <ChevronRight className={`h-3.5 w-3.5 stroke-[3] ${isRtl ? 'rotate-180' : ''}`} />
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
