import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  Shield, 
  ArrowRight,
  ChevronRight, 
  Truck,
  Sliders,
  Wrench,
  Building,
  Leaf,
  Activity
} from 'lucide-react';
import homeData from '../data/homeData.json';

interface HomeProps {
  currentLang: 'EN' | 'AR';
  onLangChange: (lang: 'EN' | 'AR') => void;
  onPageChange?: (page: 'home' | 'about' | 'services' | 'blog' | 'contact') => void;
}

export const Home: React.FC<HomeProps> = ({ currentLang, onLangChange, onPageChange }) => {
  const langKey = currentLang.toLowerCase() as 'en' | 'ar';
  const data = homeData[langKey];
  const isRtl = currentLang === 'AR';

  // Hero Rotator Word index state
  const [rotatorIndex, setRotatorIndex] = useState(0);
  const rotatorWords = data.hero.textRotator;

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorIndex((prev) => (prev + 1) % rotatorWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatorWords.length]);

  // Hero Image Slider State
  const heroImages = [
    '/images/road_sweeper_riyadh.png',
    '/images/boom_truck_crane.png',
    '/images/heavy_forklift_ksa.png'
  ];
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    const pageName = href.replace('#/', '') as 'home' | 'about' | 'services' | 'blog' | 'contact';
    if (onPageChange && ['home', 'about', 'services', 'blog', 'contact'].includes(pageName)) {
      e.preventDefault();
      onPageChange(pageName);
    }
  };

  // Icon mapping helper for strengths
  const renderStrengthIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Sliders className="h-6 w-6 text-brand-blue" />;
      case 1:
        return <Wrench className="h-6 w-6 text-brand-blue" />;
      case 2:
        return <Building className="h-6 w-6 text-brand-blue" />;
      default:
        return <Shield className="h-6 w-6 text-brand-blue" />;
    }
  };

  // Icon mapping helper for services
  const renderServiceIcon = (id: string) => {
    switch (id) {
      case 'elgin':
      case 'johnston':
      case 'scarab':
        return <Truck className="h-7 w-7 text-brand-blue" />;
      case 'gardens':
        return <Leaf className="h-7 w-7 text-brand-blue" />;
      case 'boomtrucks':
      case 'forklifts':
      case 'cranes':
        return <Activity className="h-7 w-7 text-brand-blue" />;
      default:
        return <Shield className="h-7 w-7 text-brand-blue" />;
    }
  };

  return (
    <div className={`min-h-screen bg-white text-zinc-650 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="home" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[104px]">

        {/* Section 1: Hero Banner (Light theme soft ice-blue background with Image Slider) */}
        <section className="relative bg-brand-bg-lighter text-zinc-850 py-24 lg:py-32 overflow-hidden border-b border-zinc-100">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0e7ff_1px,transparent_1px),linear-gradient(to_bottom,#e0e7ff_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-40 pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Hero Left Column (Title & Rotator) */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-brand-blue bg-white border border-zinc-200/80 px-4 py-1.5 rounded-full w-fit shadow-sm">
                  {data.hero.subtitle}
                </span>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-brand-navy max-w-2xl">
                  {data.hero.title} <br/>
                  <span className="text-brand-blue inline-block transition-all duration-300 transform translate-y-0 opacity-100 min-h-[48px] md:min-h-[60px] lg:min-h-[72px]">
                    {rotatorWords[rotatorIndex]}
                  </span>
                </h1>

                <p className="text-xs md:text-sm lg:text-base text-zinc-500 font-semibold leading-relaxed max-w-xl">
                  {data.hero.paragraph}
                </p>

                <div className={`flex flex-col sm:flex-row gap-4 pt-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                  <button
                    onClick={(e) => handleLinkClick(e, '#/contact')}
                    className="inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-widest rounded-xl text-white bg-brand-blue hover:bg-brand-blue-hover shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/25 transition-all cursor-pointer"
                  >
                    <span>{data.hero.cta}</span>
                    <ArrowRight className={`ml-2 h-4 w-4 stroke-[3] ${isRtl ? 'rotate-180 mr-2 ml-0' : ''}`} />
                  </button>
                </div>

                <div className={`flex items-center gap-3 pt-6 border-t border-zinc-200 max-w-lg ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <span className="h-2 w-2 rounded-full bg-brand-blue animate-pulse shrink-0" />
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-400">
                    {data.hero.trustedLabel}
                  </p>
                </div>
              </div>

              {/* Hero Right Column (Banner Image Slider) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-200/80 shadow-2xl bg-white p-2.5 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-lighter/30 via-transparent to-transparent z-10 pointer-events-none" />
                  
                  {/* Images container */}
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    {heroImages.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img} 
                        alt="Al Kyanat KSA Fleet Slider" 
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform ${
                          idx === activeImage 
                            ? 'opacity-100 scale-100 z-0' 
                            : 'opacity-0 scale-105 pointer-events-none'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Prev/Next Navigation Controls */}
                  <button 
                    onClick={() => setActiveImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/85 hover:bg-white text-brand-navy hover:text-brand-blue p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 stroke-[3]" />
                  </button>
                  <button 
                    onClick={() => setActiveImage((prev) => (prev + 1) % heroImages.length)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/85 hover:bg-white text-brand-navy hover:text-brand-blue p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="h-4 w-4 stroke-[3]" />
                  </button>
                </div>

                {/* Dots indicators */}
                <div className="flex items-center gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeImage 
                          ? 'w-6 bg-brand-blue' 
                          : 'w-2.5 bg-zinc-300 hover:bg-zinc-450'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 2: Core Strengths (3 columns) */}
        <section className="py-20 bg-white border-b border-zinc-150">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.strengths.map((item, index) => (
                <div 
                  key={index}
                  className="bg-brand-bg-lighter/40 border border-zinc-200/60 rounded-2xl p-8 hover:border-brand-blue transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <div className="p-3 bg-white border border-zinc-200 rounded-xl w-fit mb-5 shadow-sm">
                    {renderStrengthIcon(index)}
                  </div>
                  <h3 className="text-lg font-black text-brand-navy tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 font-semibold mt-3.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: About Holding Group (Side-by-side) */}
        <section className="py-24 bg-white border-b border-zinc-150">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* About Text Column */}
              <div className="lg:col-span-7 flex flex-col space-y-5">
                <span className="text-xs font-black uppercase tracking-widest text-brand-blue bg-brand-bg-light px-3.5 py-1.5 rounded-lg w-fit">
                  {data.about.subtitle}
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight leading-tight">
                  {data.about.title}
                </h2>
                <p className="text-xs md:text-sm text-zinc-500 font-semibold leading-relaxed">
                  {data.about.paragraph}
                </p>
                <button
                  onClick={(e) => handleLinkClick(e, '#/services')}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl text-white bg-brand-navy hover:bg-brand-navy-dark shadow-md transition-all w-fit cursor-pointer"
                >
                  <span>{data.about.cta}</span>
                  <ChevronRight className={`ml-1.5 h-4 w-4 stroke-[3.5] text-brand-blue ${isRtl ? 'rotate-180 mr-1.5 ml-0' : ''}`} />
                </button>
              </div>

              {/* Stats Counters Column */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                  {data.about.stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-brand-bg-lighter border border-zinc-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-center"
                    >
                      <div className="absolute right-4 bottom-4 text-brand-blue/5 transform translate-y-6 translate-x-4">
                        <Truck className="h-32 w-32" />
                      </div>
                      <span className="text-3xl md:text-4xl font-black text-brand-blue block">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy block mt-1">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Services Offered */}
        <section className="py-24 bg-brand-bg-lighter/40 border-b border-zinc-150">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-blue bg-white border border-zinc-200 px-3 py-1.5 rounded-lg shadow-sm">
                {data.servicesSection.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
                {data.servicesSection.title}
              </h2>
              <p className="text-xs md:text-sm text-zinc-500 font-semibold leading-relaxed">
                {data.servicesSection.paragraph}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.servicesSection.items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-zinc-200/60 rounded-2xl p-6 transition-all duration-300 hover:border-brand-blue hover:shadow-lg flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-brand-bg-light border border-transparent rounded-xl w-fit group-hover:bg-brand-blue group-hover:border-brand-blue transition-all">
                      <div className="group-hover:text-white text-brand-blue transition-all">
                        {renderServiceIcon(item.id)}
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h3 className="text-base font-black text-brand-navy tracking-tight mt-0.5 group-hover:text-brand-blue transition-all">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleLinkClick(e, '#/services')}
                    className="inline-flex items-center gap-1 mt-6 text-[10px] font-black uppercase tracking-widest text-brand-navy hover:text-brand-blue transition-all cursor-pointer w-fit"
                  >
                    <span>{data.servicesSection.cta}</span>
                    <ChevronRight className={`h-3.5 w-3.5 stroke-[3] ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
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

export default Home;
