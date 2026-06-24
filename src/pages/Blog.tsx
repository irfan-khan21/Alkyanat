import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
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

  const getPostImage = (id: number) => {
    switch (id) {
      case 1:
        return '/images/road_sweeper_riyadh.png';
      case 2:
        return '/images/heavy_forklift_ksa.png';
      case 3:
        return '/images/boom_truck_crane.png';
      default:
        return '/images/road_sweeper_riyadh.png';
    }
  };

  return (
    <div className={`min-h-screen bg-premium-gradient text-slate-700 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="blog" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[88px] lg:pt-[112px] relative">
        
        {/* Glow decoration */}
        <div className="absolute top-20 left-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Banner (Wave Bottom Cutout Style) */}
        <section className="relative min-h-[300px] flex items-center justify-center py-20 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/blog_banner.png" alt="Blog" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0F172A]/75 mix-blend-multiply" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-display uppercase">
              {currentLang === 'AR' ? 'المدونة' : 'Blog'}
            </h1>
            
            {/* Breadcrumb Navigation */}
            <div className={`flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-slate-350 pt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <a href="#/home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-brand-yellow transition-colors">
                {data.hero.breadcrumbHome}
              </a>
              <span className="text-brand-red font-black">&gt;</span>
              <span className="text-brand-yellow font-black">
                {data.hero.breadcrumbCurrent}
              </span>
            </div>
          </div>

          {/* SVG Wave bottom cutout */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-white fill-current">
              <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,0 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        {/* Blog Post List Section */}
        <section className="py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.posts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white border border-slate-100/90 rounded-[32px] hover:bg-slate-50/10 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 relative overflow-hidden group shadow-md shadow-slate-200/40"
                >
                  {/* Top Image */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative">
                    <img 
                      src={getPostImage(post.id)} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle Category Tag Overlay */}
                    <span className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} inline-flex items-center gap-1.5 text-white bg-brand-red/90 px-3.5 py-1.5 rounded-full font-black text-[10px] uppercase tracking-wider font-display shadow-lg`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-3">
                      {/* Date */}
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">
                        {post.date}
                      </span>
                      {/* Red Title */}
                      <h3 className="text-xl font-black text-brand-red hover:text-brand-red-dark leading-snug font-display transition-colors duration-200">
                        {post.title}
                      </h3>
                      {/* Excerpt */}
                      <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <div className="pt-4 border-t border-slate-50 flex justify-start">
                      <a 
                        href={`#/blog`}
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-1 text-xs font-black text-brand-red hover:text-brand-red-dark uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                      >
                        {isRtl ? 'اقرأ المزيد +' : 'READ MORE +'}
                      </a>
                    </div>
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

