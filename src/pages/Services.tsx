import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CheckCircle, ChevronRight, Clock, Wrench, MapPin, BookOpen, HelpCircle } from 'lucide-react';
import servicesData from '../data/servicesData.json';

interface ServicesProps {
  currentLang: 'EN' | 'AR';
  onLangChange: (lang: 'EN' | 'AR') => void;
  onPageChange: (page: 'home' | 'about' | 'services' | 'blog' | 'contact') => void;
}

export const Services: React.FC<ServicesProps> = ({ currentLang, onLangChange, onPageChange }) => {
  const langKey = currentLang.toLowerCase() as 'en' | 'ar';
  const data = servicesData[langKey];
  const isRtl = currentLang === 'AR';

  const renderSupportIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Clock className="h-6 w-6 text-brand-orange" />;
      case 1:
        return <Wrench className="h-6 w-6 text-brand-orange" />;
      case 2:
        return <MapPin className="h-6 w-6 text-brand-orange" />;
      case 3:
        return <BookOpen className="h-6 w-6 text-brand-orange" />;
      default:
        return <HelpCircle className="h-6 w-6 text-brand-orange" />;
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'about' | 'services' | 'blog' | 'contact') => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-700 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="services" onPageChange={onPageChange} />

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
            <div className={`flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-widest text-slate-400 pt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <a href="#/home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-brand-orange transition-colors">
                {data.hero.breadcrumbHome}
              </a>
              <span className="text-slate-600">/</span>
              <span className="text-brand-orange font-extrabold">
                {data.hero.breadcrumbCurrent}
              </span>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-20 bg-transparent border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 rounded-xl inline-block shadow-sm">
              {data.intro.subtitle}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              {data.intro.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
              {data.intro.paragraph}
            </p>
          </div>
        </section>

        {/* Services List Section */}
        <section className="py-24 bg-transparent border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {data.servicesList.map((service) => (
                <div 
                  key={service.id}
                  id={service.id}
                  className="bg-white border border-slate-200/80 hover:border-brand-orange/30 rounded-3xl p-8 hover:bg-slate-50/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_10px_30px_-15px_rgba(255,107,0,0.08)]"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-brand-orange transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3 py-1.5 rounded-lg font-display">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 tracking-tight font-display group-hover:text-brand-orange transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs md:text-sm text-slate-655 font-medium leading-relaxed">
                      {service.description}
                    </p>

                    {/* Specs Bullet Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-5 border-t border-slate-100">
                      {service.specs.map((spec, i) => (
                        <div key={i} className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                          <CheckCircle className="h-4 w-4 text-brand-orange shrink-0 animate-pulse" />
                          <span className="text-xs font-semibold text-slate-600">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#/contact"
                    onClick={(e) => handleLinkClick(e, 'contact')}
                    className="inline-flex items-center gap-1.5 mt-8 text-xs font-black uppercase tracking-widest text-slate-800 hover:text-brand-orange transition-colors w-fit cursor-pointer font-display"
                  >
                    <span>{data.intro.getQuote}</span>
                    <ChevronRight className={`h-4 w-4 stroke-[3.5] ${isRtl ? 'rotate-180' : ''}`} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Operating Process */}
        <section className="py-24 bg-brand-navy border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-white/[0.02] border border-white/[0.08] px-3.5 py-1.5 rounded-xl inline-block shadow-lg">
                {data.process.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-display">
                {data.process.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.process.steps.map((step, index) => (
                <div 
                  key={index}
                  className="bg-white/[0.02] border border-white/[0.06] hover:border-brand-orange/30 rounded-3xl p-8 relative overflow-hidden group hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="absolute right-4 top-4 text-4xl md:text-5xl font-black text-white/[0.02] group-hover:text-brand-orange/10 transition-all font-display">
                    {step.number}
                  </div>
                  <span className="text-2xl font-extrabold text-brand-orange block mb-4 font-display drop-shadow-[0_0_8px_rgba(255,107,0,0.2)]">
                    {step.number}
                  </span>
                  <h3 className="text-base font-bold text-white tracking-tight font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-3.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Customer Support Section */}
        <section className="py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 rounded-xl inline-block shadow-sm">
                {data.supportSection.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                {data.supportSection.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                {data.supportSection.paragraph}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.supportSection.items.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white border border-slate-200/80 hover:border-brand-orange/30 rounded-3xl p-6 hover:bg-slate-50/50 transition-all duration-300 relative overflow-hidden group hover:shadow-[0_10px_30px_-15px_rgba(255,107,0,0.08)]"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-orange transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl w-fit mb-5 shadow-sm">
                    {renderSupportIcon(index)}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight font-display group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-3 leading-relaxed">
                    {item.description}
                  </p>
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

export default Services;
