import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CheckCircle, ChevronRight, Clock, Wrench, MapPin, BookOpen, HelpCircle, Sparkles } from 'lucide-react';
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
        return <Clock className="h-6 w-6 text-brand-red" />;
      case 1:
        return <Wrench className="h-6 w-6 text-brand-red" />;
      case 2:
        return <MapPin className="h-6 w-6 text-brand-red" />;
      case 3:
        return <BookOpen className="h-6 w-6 text-brand-red" />;
      default:
        return <HelpCircle className="h-6 w-6 text-brand-red" />;
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'about' | 'services' | 'blog' | 'contact') => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className={`min-h-screen bg-premium-gradient text-slate-700 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="services" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[88px] lg:pt-[112px] relative">
        
        {/* Glow decoration */}
        <div className="absolute top-20 left-0 w-80 h-80 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Banner (Wave Bottom Cutout Style) */}
        <section className="relative min-h-[300px] flex items-center justify-center py-20 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/services_banner.png" alt="Our Services" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0F172A]/75 mix-blend-multiply" />
          </div>

          {/* Decorative absolute sparkles */}
          <div className="absolute top-10 left-12 text-sky-400 opacity-60 animate-pulse">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="absolute bottom-16 right-16 text-sky-400 opacity-60 animate-pulse">
            <Sparkles className="h-6 w-6" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4 font-display">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              {data.hero.title}
            </h1>
            <p className="text-sm md:text-base text-slate-350 max-w-2xl mx-auto leading-relaxed font-medium font-sans">
              {data.hero.subtitle}
            </p>
            
            {/* Breadcrumb Navigation */}
            <div className={`flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-slate-350 pt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <a href="#/home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-brand-yellow transition-colors">
                {data.hero.breadcrumbHome}
              </a>
              <span className="text-brand-red font-black">&gt;</span>
              <span className="text-brand-yellow font-black font-sans">
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

        {/* Intro Section */}
        <section className="py-20 bg-transparent border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-brand-red bg-brand-red/10 border border-brand-red/20 px-3.5 py-1.5 rounded-xl inline-block shadow-sm">
              {data.intro.subtitle}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              {data.intro.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed font-sans">
              {data.intro.paragraph}
            </p>
          </div>
        </section>

        {/* Services List Section (Redesigned with images in a 3-column grid) */}
        <section className="py-24 bg-transparent border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.servicesList.map((service) => (
                <div 
                  key={service.id}
                  id={service.id}
                  className="bg-white border border-slate-100/90 rounded-[32px] hover:bg-slate-50/10 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 relative overflow-hidden group shadow-md shadow-slate-200/40"
                >
                  {/* Top Image Cover */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Floating Category Tag Overlay */}
                    <span className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} inline-flex items-center gap-1.5 text-white bg-brand-red/90 px-3.5 py-1.5 rounded-full font-black text-[10px] uppercase tracking-wider font-display shadow-lg`}>
                      {service.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col justify-between flex-grow space-y-5">
                    <div className="space-y-3.5">
                      <h3 className="text-xl font-black text-brand-red leading-snug font-display transition-colors duration-200 group-hover:text-brand-red-dark">
                        {service.title}
                      </h3>

                      <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed font-sans">
                        {service.description}
                      </p>

                      {/* Specs Bullet Grid */}
                      <div className="grid grid-cols-1 gap-2.5 pt-4 border-t border-slate-100">
                        {service.specs.map((spec, i) => (
                          <div key={i} className={`flex items-start gap-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                            <CheckCircle className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                            <span className="text-xs font-semibold text-slate-600 font-sans">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Inquiry CTA Link */}
                    <div className="pt-4 border-t border-slate-100 flex justify-start">
                      <a 
                        href="#/contact"
                        onClick={(e) => handleLinkClick(e, 'contact')}
                        className="inline-flex items-center gap-1.5 text-xs font-black text-brand-red hover:text-brand-red-dark uppercase tracking-widest transition-colors duration-200 cursor-pointer font-display animate-pulse"
                      >
                        <span>{data.intro.getQuote}</span>
                        <ChevronRight className={`h-4 w-4 stroke-[3.5] ${isRtl ? 'rotate-180' : ''}`} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Operating Process */}
        <section className="py-24 bg-brand-navy border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-yellow bg-white/[0.02] border border-white/[0.08] px-3.5 py-1.5 rounded-xl inline-block shadow-lg">
                {data.process.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-display">
                {data.process.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-sans">
              {data.process.steps.map((step, index) => (
                <div 
                  key={index}
                  className="bg-white/[0.02] border border-white/[0.06] hover:border-brand-yellow/30 rounded-[32px] p-8 relative overflow-hidden group hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="absolute right-4 top-4 text-4xl md:text-5xl font-black text-white/[0.02] group-hover:text-brand-yellow/10 transition-all font-display">
                    {step.number}
                  </div>
                  <span className="text-2xl font-extrabold text-brand-yellow block mb-4 font-display drop-shadow-[0_0_8px_rgba(255,199,21,0.2)]">
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
        <section className="py-24 bg-transparent font-sans">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-red bg-brand-red/10 border border-brand-red/20 px-3.5 py-1.5 rounded-xl inline-block shadow-sm">
                {data.supportSection.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                {data.supportSection.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed font-sans">
                {data.supportSection.paragraph}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.supportSection.items.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white border border-slate-100 hover:border-brand-red/30 rounded-[32px] p-6.5 hover:bg-slate-50/10 transition-all duration-300 relative overflow-hidden group hover:shadow-xl"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-red transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl w-fit mb-5 shadow-sm text-brand-red group-hover:bg-[#A31D1D] group-hover:text-white transition-all">
                    {renderSupportIcon(index)}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight font-display group-hover:text-brand-red transition-colors font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-550 font-medium mt-3 leading-relaxed font-sans">
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
