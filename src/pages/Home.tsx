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

      {/* Main Content with Tighter Padding Top */}
      <main className="flex-grow pt-[88px]">

        {/* Section 1: Hero Banner (Pastel Gradient Background & Circular Frame Cutout Slider - py-16 lg:py-20) */}
        <section className="relative bg-gradient-to-tr from-purple-100/30 via-yellow-100/20 to-teal-100/30 text-zinc-850 py-16 lg:py-20 overflow-hidden border-b border-zinc-100">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Hero Left Column (Title & Rotator) */}
              <div className="lg:col-span-7 flex flex-col space-y-5">
                <span className="text-xs font-black uppercase tracking-widest text-brand-blue bg-white border border-zinc-200/80 px-4 py-1.5 rounded-full w-fit shadow-sm">
                  {data.hero.subtitle}
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-brand-navy max-w-2xl">
                  {currentLang === 'AR' ? 'خبراء رياديون في' : 'Leading Experts in'}{' '}
                  <span className="text-brand-blue inline-block transition-all duration-300 transform translate-y-0 opacity-100 min-h-[48px] md:min-h-[60px] lg:min-h-[72px]">
                    {rotatorWords[rotatorIndex]}
                  </span>
                </h1>

                <p className="text-sm md:text-base text-slate-500 font-semibold leading-relaxed max-w-xl">
                  {data.hero.paragraph}
                </p>

                <div className={`flex items-center gap-4 pt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={(e) => handleLinkClick(e, '#/contact')}
                    className="inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-widest rounded-full text-white bg-brand-blue hover:bg-brand-blue-hover shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/25 transition-all cursor-pointer gap-1.5"
                  >
                    <span>{currentLang === 'AR' ? 'اتصل الآن' : 'Contact Now'}</span>
                    <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                  </button>

                  {/* Circle contact/social buttons */}
                  <a 
                    href="tel:+966114567890"
                    className="p-3.5 bg-brand-bg-light hover:bg-brand-blue hover:text-white text-brand-blue rounded-full transition-all flex items-center justify-center border border-brand-bg-light shadow-sm"
                    aria-label="Call Us"
                  >
                    <Phone className="h-4.5 w-4.5" />
                  </a>
                  <a 
                    href="mailto:info@alkyanat.com"
                    className="p-3.5 bg-brand-bg-light hover:bg-brand-blue hover:text-white text-brand-blue rounded-full transition-all flex items-center justify-center border border-brand-bg-light shadow-sm"
                    aria-label="Email Us"
                  >
                    <Mail className="h-4.5 w-4.5" />
                  </a>
                </div>

                {/* Overlapping Avatars "Trusted By" info */}
                <div className={`flex items-center gap-4 pt-6 border-t border-zinc-200/80 max-w-lg ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <div className={`flex overflow-hidden ${isRtl ? '-space-x-3 space-x-reverse' : '-space-x-3'}`}>
                    <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center text-[10px] font-black text-white shadow-sm">K</div>
                    <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-black text-white shadow-sm">S</div>
                    <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-[10px] font-black text-white shadow-sm">A</div>
                    <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center text-[10px] font-black text-white shadow-sm">2030</div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold text-brand-navy">
                      {currentLang === 'AR' ? 'موثوق من أكثر من ٥٠٠٠+' : 'Trusted By 5000+'}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      {currentLang === 'AR' ? 'شريك وعميل' : 'Brand & Customers'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Right Column (Circular Frame Cutout Image Slider) */}
              <div className="lg:col-span-5 flex justify-center relative select-none">
                
                {/* Floating SVGs / Badges around the circle cutout */}
                <div className="absolute top-10 left-4 bg-white/95 backdrop-blur border border-zinc-150 p-2.5 rounded-2xl shadow-lg z-20 animate-bounce duration-1000">
                  <Activity className="h-6 w-6 text-brand-blue" />
                </div>
                <div className="absolute bottom-12 right-2 bg-white/95 backdrop-blur border border-zinc-150 p-2.5 rounded-2xl shadow-lg z-20">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div className="absolute top-1/2 -right-6 bg-white/95 backdrop-blur border border-zinc-150 p-3 rounded-full shadow-lg z-20 animate-pulse">
                  <Truck className="h-5 w-5 text-brand-blue" />
                </div>

                {/* Main Cutout Container */}
                <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                  
                  {/* Decorative Blue Half-Circle crescent behind the main cutout */}
                  <div className="absolute right-0 bottom-0 w-[88%] h-[88%] rounded-br-[210px] rounded-bl-[105px] rounded-tr-[105px] bg-brand-blue/90 z-0 shadow-lg" />
                  
                  {/* Centered Circular Cutout Frame for Image Slider */}
                  <div className="relative w-[90%] h-[90%] rounded-full overflow-hidden border-[6px] border-white shadow-2xl bg-white z-10 aspect-square group">
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-lighter/30 via-transparent to-transparent z-10 pointer-events-none" />
                    
                    {/* Sliding Images */}
                    <div className="relative w-full h-full">
                      {heroImages.map((img, idx) => (
                        <img 
                          key={idx}
                          src={img} 
                          alt="Al Kyanat KSA Fleet" 
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform ${
                            idx === activeImage 
                              ? 'opacity-100 scale-100 z-0' 
                              : 'opacity-0 scale-105 pointer-events-none'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Manual controls (Overlay dots on hover) */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/25 px-3 py-1.5 rounded-full">
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

        {/* Section 2: Core Strengths (3 columns - py-14) */}
        <section className="py-14 bg-white border-b border-zinc-150">
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

        {/* Section 3: About Holding Group (Side-by-side - py-16) */}
        <section className="py-16 bg-white border-b border-zinc-150">
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

        {/* Section 4: Services Offered (py-16) */}
        <section className="py-16 bg-brand-bg-lighter/40 border-b border-zinc-150">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
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

        {/* Section 5: Experience / Our Professional Journey Timeline (py-16) */}
        <section id="journey-section" className="py-16 bg-brand-bg-lighter/30 border-b border-zinc-150">
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
                <span className="text-xs font-black uppercase tracking-widest text-brand-blue bg-white border border-zinc-200 px-4 py-1.5 rounded-full w-fit shadow-sm">
                  {data.journey.subtitle}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
                  {data.journey.title}
                </h2>
                <div className="w-16 h-1 bg-brand-blue rounded-full mt-2" />
              </div>

              {/* Right Column (Vertical Timeline with Scroll Reveal Animations) */}
              <div className="lg:col-span-7 flex flex-col space-y-2">
                {data.journey.items.map((item, idx) => {
                  // Staggered delays
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
                        <div className={`absolute ${isRtl ? 'right-6' : 'left-6'} top-12 bottom-0 w-0.5 bg-zinc-200 group-hover:bg-brand-blue/30 transition-colors`} />
                      )}
                      
                      {/* Circular Step Badge */}
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white text-brand-blue border border-zinc-200 font-extrabold text-sm flex items-center justify-center z-10 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue shadow-sm transition-all duration-300">
                        {`0${idx + 1}`}
                      </div>
                      
                      {/* Item Details */}
                      <div className="space-y-2 pb-6">
                        <h4 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-250">
                          {item.title}
                        </h4>
                        <p className="text-xs md:text-sm text-slate-500 font-semibold leading-relaxed">
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

        {/* Section 6: Our Expertise progress bars (py-16) */}
        <section id="expertise-section" className="py-16 bg-white border-b border-zinc-150">
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
                <span className="text-xs font-black uppercase tracking-widest text-brand-blue bg-brand-bg-light px-3.5 py-1.5 rounded-lg w-fit">
                  {data.expertise.subtitle}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
                  {data.expertise.title}
                </h2>
                <p className="text-xs md:text-sm text-zinc-500 font-semibold leading-relaxed">
                  {currentLang === 'AR' 
                    ? 'نعمل باستمرار على تطوير قدراتنا الفنية لنقدم شاحنات نظافة متقدمة ورافعات ثقيلة للمشاريع البلدية والإعمار بالمملكة بمهنية وأمان.'
                    : 'We continuously improve our technical capabilities and fleet systems to deliver reliable, high-capacity road cleaning, heavy lifting, and material dispatch solutions across KSA.'}
                </p>
              </div>

              {/* Right Column (Progress Bars at 100% capacity with Dynamic Loading Animations) */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                {data.expertise.items.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className={`flex justify-between text-xs font-extrabold text-brand-navy ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-blue rounded-full transition-all duration-[1200ms] cubic-bezier(0.1, 0.8, 0.2, 1)" 
                        style={{ width: expertiseVisible ? `${item.value}%` : '0%' }} 
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Section 7: Testimonials Slider (py-16) */}
        <section className="py-16 bg-brand-bg-lighter/40 border-b border-zinc-150">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-blue bg-white border border-zinc-200 px-3 py-1.5 rounded-lg shadow-sm">
                {data.testimonials.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                {data.testimonials.title}
              </h2>
            </div>

            {/* Testimonials Slider Body */}
            <div className="relative max-w-4xl mx-auto text-center px-6 mt-8 group">
              <div className="text-6xl text-brand-blue/15 font-serif absolute -top-8 left-10 pointer-events-none">“</div>
              
              <div className="min-h-[140px] flex items-center justify-center">
                {data.testimonials.items.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`transition-all duration-500 ease-in-out ${
                      idx === activeTestimonial ? 'opacity-100 scale-100 block' : 'opacity-0 scale-95 hidden'
                    }`}
                  >
                    <p className="text-base md:text-lg text-brand-navy/90 font-medium italic leading-relaxed">
                      "{item.quote}"
                    </p>
                    <h4 className="text-sm font-extrabold text-brand-navy mt-6">
                      {item.author}
                    </h4>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mt-1">
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
                      idx === activeTestimonial ? 'w-6 bg-brand-blue' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
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
