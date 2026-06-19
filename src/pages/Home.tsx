import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  Shield, 
  ArrowUpRight,
  ChevronRight, 
  Truck,
  Sliders,
  Wrench,
  Building,
  Leaf,
  Activity,
  Phone,
  Mail,
  AlertTriangle
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

  // Testimonial Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % data.testimonials.items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [data.testimonials.items.length]);

  // Scroll Animations intersection observer states
  const [journeyVisible, setJourneyVisible] = useState(false);
  const [expertiseVisible, setExpertiseVisible] = useState(false);

  useEffect(() => {
    const journeyEl = document.getElementById('journey-section');
    const expertiseEl = document.getElementById('expertise-section');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === 'journey-section' && entry.isIntersecting) {
          setJourneyVisible(true);
        }
        if (entry.target.id === 'expertise-section' && entry.isIntersecting) {
          setExpertiseVisible(true);
        }
      });
    }, observerOptions);

    if (journeyEl) observer.observe(journeyEl);
    if (expertiseEl) observer.observe(expertiseEl);

    return () => {
      if (journeyEl) observer.unobserve(journeyEl);
      if (expertiseEl) observer.unobserve(expertiseEl);
    };
  }, []);

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
        return <Sliders className="h-6 w-6 text-brand-orange" />;
      case 1:
        return <Wrench className="h-6 w-6 text-brand-orange" />;
      case 2:
        return <Building className="h-6 w-6 text-brand-orange" />;
      default:
        return <Shield className="h-6 w-6 text-brand-orange" />;
    }
  };

  // Icon mapping helper for services
  const renderServiceIcon = (id: string) => {
    switch (id) {
      case 'elgin':
      case 'johnston':
      case 'scarab':
        return <Truck className="h-6 w-6 text-brand-orange animate-pulse" />;
      case 'gardens':
        return <Leaf className="h-6 w-6 text-brand-orange" />;
      case 'boomtrucks':
      case 'forklifts':
      case 'cranes':
        return <Activity className="h-6 w-6 text-brand-orange" />;
      default:
        return <Shield className="h-6 w-6 text-brand-orange" />;
    }
  };

  return (
    <div className={`min-h-screen bg-premium-gradient text-slate-700 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="home" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[88px] relative">
        
        {/* Glow decoration */}
        <div className="absolute top-10 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-80 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section 1: Hero Banner */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-[0.4] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Hero Left Column (Title & Rotator) */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full w-fit shadow-sm">
                  {data.hero.subtitle}
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 max-w-2xl font-display">
                  {data.hero.rotatorPrefix}{' '}
                  <span className={`text-brand-orange inline-block transition-all duration-300 transform translate-y-0 opacity-100 min-h-[48px] md:min-h-[60px] lg:min-h-[72px] drop-shadow-[0_0_10px_rgba(255,107,0,0.15)] ${
                    rotatorWords[rotatorIndex].length > 24
                      ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
                      : rotatorWords[rotatorIndex].length > 18
                      ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
                      : ''
                  }`}>
                    {rotatorWords[rotatorIndex]}
                  </span>
                </h1>

                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl font-medium">
                  {data.hero.paragraph}
                </p>

                <div className={`flex items-center gap-4 pt-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={(e) => handleLinkClick(e, '#/contact')}
                    className="inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-widest rounded-full text-white bg-brand-orange hover:bg-brand-orange-hover shadow-lg shadow-brand-orange/15 hover:shadow-brand-orange/30 transition-all cursor-pointer gap-1.5 font-display"
                  >
                    <span>{data.hero.cta}</span>
                    <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                  </button>

                  {/* Circular contact/social buttons */}
                  <a 
                    href="tel:+966557062353"
                    className="p-3.5 bg-white border border-slate-200 hover:border-brand-orange hover:text-brand-orange text-slate-700 rounded-full transition-all flex items-center justify-center shadow-sm"
                    aria-label="Call Us"
                  >
                    <Phone className="h-4.5 w-4.5" />
                  </a>
                  <a 
                    href="mailto:info@alkyanat-almushtarika.com"
                    className="p-3.5 bg-white border border-slate-200 hover:border-brand-orange hover:text-brand-orange text-slate-700 rounded-full transition-all flex items-center justify-center shadow-sm"
                    aria-label="Email Us"
                  >
                    <Mail className="h-4.5 w-4.5" />
                  </a>
                </div>

                {/* Overlapping Avatars "Trusted By" info */}
                <div className={`flex items-center gap-4 pt-6 border-t border-slate-200 max-w-lg ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <div className={`flex overflow-hidden ${isRtl ? '-space-x-3 space-x-reverse' : '-space-x-3'}`}>
                    <img src="/images/avatar1.png" alt="Saudi Executive" className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-50 object-cover shadow-md" />
                    <img src="/images/avatar2.png" alt="Saudi Engineer" className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-50 object-cover shadow-md" />
                    <img src="/images/avatar3.png" alt="Saudi Manager" className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-50 object-cover shadow-md" />
                    <img src="/images/avatar4.png" alt="Arab Professional" className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-50 object-cover shadow-md" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold text-slate-900">
                      {data.hero.trustedTitle}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {data.hero.trustedSubtitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Right Column (Circular Frame Cutout Image Slider) */}
              <div className="lg:col-span-5 flex justify-center relative select-none">
                
                {/* Floating SVGs / Badges around the circle cutout */}
                <div className="absolute top-10 left-4 bg-white/95 backdrop-blur border border-slate-200 p-3 rounded-2xl shadow-xl z-20 animate-bounce">
                  <Activity className="h-6 w-6 text-brand-orange" />
                </div>
                <div className="absolute bottom-12 right-2 bg-white/95 backdrop-blur border border-slate-200 p-3 rounded-2xl shadow-xl z-20">
                  <AlertTriangle className="h-6 w-6 text-amber-500 animate-pulse" />
                </div>
                <div className="absolute top-1/2 -right-6 bg-white/95 backdrop-blur border border-slate-200 p-3 rounded-full shadow-xl z-20">
                  <Truck className="h-5 w-5 text-brand-orange" />
                </div>

                {/* Main Cutout Container */}
                <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                  
                  {/* Decorative Gradient crescent behind the main cutout */}
                  <div className="absolute right-0 bottom-0 w-[88%] h-[88%] rounded-br-[210px] rounded-bl-[105px] rounded-tr-[105px] bg-gradient-to-tr from-brand-orange via-amber-500 to-yellow-500 z-0 shadow-xl opacity-90 blur-sm" />
                  
                  {/* Centered Circular Cutout Frame for Image Slider */}
                  <div className="relative w-[90%] h-[90%] rounded-full overflow-hidden border-[6px] border-white shadow-2xl bg-slate-100 z-10 aspect-square group">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-10 pointer-events-none" />
                    
                    {/* Sliding Images */}
                    <div className="relative w-full h-full">
                      {heroImages.map((img, idx) => (
                        <img 
                          key={idx}
                          src={img} 
                          alt="Al Kayanat KSA Fleet" 
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform ${
                            idx === activeImage 
                              ? 'opacity-100 scale-100 z-0' 
                              : 'opacity-0 scale-105 pointer-events-none'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Manual controls (Overlay dots on hover) */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 px-3 py-1.5 rounded-full">
                      {heroImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                            idx === activeImage ? 'w-4 bg-white' : 'w-2 bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Section 2: Core Strengths */}
        <section className="py-16 bg-transparent border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.strengths.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white border border-slate-200/80 hover:border-brand-orange/30 rounded-3xl p-8 hover:bg-slate-50/50 transition-all duration-300 shadow-sm relative overflow-hidden group hover:shadow-[0_10px_30px_-15px_rgba(255,107,0,0.08)]"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-brand-orange transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl w-fit mb-6 shadow-sm">
                    {renderStrengthIcon(index)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-650 font-medium mt-3.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: About Holding Group */}
        <section className="py-20 bg-transparent border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* About Text Column */}
              <div className="lg:col-span-7 flex flex-col space-y-5">
                <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 rounded-xl w-fit shadow-sm">
                  {data.about.subtitle}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                  {data.about.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                  {data.about.paragraph}
                </p>
                <button
                  onClick={(e) => handleLinkClick(e, '#/services')}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl text-white bg-brand-orange hover:bg-brand-orange-hover transition-all w-fit cursor-pointer shadow-md shadow-brand-orange/10 font-display"
                >
                  <span>{data.about.cta}</span>
                  <ChevronRight className={`ml-1.5 h-4 w-4 stroke-[3.5] ${isRtl ? 'rotate-180 mr-1.5 ml-0' : ''}`} />
                </button>
              </div>

              {/* Stats Counters Column */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                  {data.about.stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-center group hover:border-brand-orange/20 transition-colors"
                    >
                      <div className="absolute right-4 bottom-4 text-brand-orange/[0.02] transform translate-y-6 translate-x-4">
                        <Truck className="h-32 w-32" />
                      </div>
                      <span className="text-3xl md:text-4xl font-black text-brand-orange block font-display drop-shadow-[0_0_8px_rgba(255,107,0,0.15)]">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mt-1 font-display">
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
        <section className="py-20 bg-transparent border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 rounded-xl shadow-sm inline-block">
                {data.servicesSection.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                {data.servicesSection.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                {data.servicesSection.paragraph}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.servicesSection.items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-slate-200/80 hover:border-brand-orange/30 rounded-3xl p-7 hover:bg-slate-50/50 transition-all duration-300 shadow-sm flex flex-col justify-between group"
                >
                  <div className="space-y-5">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl w-fit group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                      <div className="group-hover:text-white text-brand-orange transition-all">
                        {renderServiceIcon(item.id)}
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 tracking-tight mt-1 group-hover:text-brand-orange transition-colors duration-200 font-display">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleLinkClick(e, '#/services')}
                    className="inline-flex items-center gap-1.5 mt-6 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-orange transition-colors cursor-pointer w-fit font-display"
                  >
                    <span>{data.servicesSection.cta}</span>
                    <ChevronRight className={`h-3.5 w-3.5 stroke-[3] ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Section 5: Experience Timeline */}
        <section id="journey-section" className="py-20 bg-transparent border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Left Column (Section Heading with Animation) */}
              <div 
                className={`lg:col-span-5 flex flex-col space-y-4 transition-all duration-1000 ease-out transform ${
                  journeyVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-12 pointer-events-none'
                }`}
              >
                <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full w-fit shadow-sm font-display">
                  {data.journey.subtitle}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                  {data.journey.title}
                </h2>
                <div className="w-16 h-1 bg-brand-orange rounded-full mt-2" />
              </div>

              {/* Right Column (Vertical Timeline) */}
              <div className="lg:col-span-7 flex flex-col space-y-2">
                {data.journey.items.map((item, idx) => {
                  const delayClass = [
                    'delay-[100ms]',
                    'delay-[300ms]',
                    'delay-[500ms]',
                    'delay-[700ms]'
                  ][idx] || 'delay-0';

                  return (
                    <div 
                      key={idx} 
                      className={`flex gap-6 relative group transition-all duration-700 ease-out transform ${
                        journeyVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8 pointer-events-none'
                      } ${delayClass} ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                    >
                      {/* Vertical connecting line */}
                      {idx < data.journey.items.length - 1 && (
                        <div className={`absolute ${isRtl ? 'right-6' : 'left-6'} top-12 bottom-0 w-0.5 bg-slate-200 group-hover:bg-brand-orange/30 transition-colors`} />
                      )}
                      
                      {/* Circular Step Badge */}
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-slate-50 text-brand-orange border border-slate-200 font-bold text-sm flex items-center justify-center z-10 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange shadow-sm transition-all duration-300">
                        {`0${idx + 1}`}
                      </div>
                      
                      {/* Item Details */}
                      <div className="space-y-2 pb-6">
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-orange transition-colors duration-200 font-display">
                          {item.title}
                        </h4>
                        <p className="text-xs md:text-sm text-slate-650 font-medium leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* Section 6: Our Expertise progress bars */}
        <section id="expertise-section" className="py-20 bg-transparent border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Left Column (Details with Animation) */}
              <div 
                className={`lg:col-span-5 flex flex-col space-y-4 transition-all duration-1000 ease-out transform ${
                  expertiseVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-12 pointer-events-none'
                }`}
              >
                <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 rounded-xl w-fit">
                  {data.expertise.subtitle}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                  {data.expertise.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-650 font-medium leading-relaxed">
                  {data.expertise.description}
                </p>
              </div>

              {/* Right Column (Progress Bars at 100% capacity) */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                {data.expertise.items.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className={`flex justify-between text-xs font-extrabold text-slate-800 ${isRtl ? 'flex-row-reverse' : ''} font-display`}>
                      <span>{item.label}</span>
                      <span className="text-brand-orange">{item.value}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 border border-slate-200/60 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-orange to-amber-500 rounded-full transition-all duration-[1500ms] ease-out shadow-[0_0_8px_rgba(255,107,0,0.3)]" 
                        style={{ width: expertiseVisible ? `${item.value}%` : '0%' }} 
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Section 7: Testimonials Slider */}
        <section className="py-20 bg-transparent border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3 py-1.5 rounded-lg shadow-sm">
                {data.testimonials.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                {data.testimonials.title}
              </h2>
            </div>

            {/* Testimonials Slider Body */}
            <div className="relative max-w-4xl mx-auto text-center px-6 mt-8 group bg-white border border-slate-200/80 rounded-3xl p-10 shadow-lg">
              <div className="text-6xl text-brand-orange/10 font-serif absolute -top-4 left-8 pointer-events-none select-none">“</div>
              
              <div className="min-h-[140px] flex items-center justify-center">
                {data.testimonials.items.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`transition-all duration-500 ease-in-out ${
                      idx === activeTestimonial ? 'opacity-100 scale-100 block' : 'opacity-0 scale-95 hidden'
                    }`}
                  >
                    <p className="text-base md:text-lg text-slate-700 font-medium italic leading-relaxed">
                      "{item.quote}"
                    </p>
                    <h4 className="text-sm font-extrabold text-slate-950 mt-6 font-display">
                      {item.author}
                    </h4>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mt-1 font-display">
                      {item.role}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dots indicators */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {data.testimonials.items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeTestimonial ? 'w-6 bg-brand-orange' : 'w-2 bg-slate-250 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
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
