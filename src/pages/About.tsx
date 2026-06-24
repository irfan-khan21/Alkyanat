import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  Play, 
  Star, 
  User, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Sparkles,
  Shield,
  Settings,
  Leaf,
  CheckSquare
} from 'lucide-react';
import aboutData from '../data/aboutData.json';
import homeData from '../data/homeData.json';

interface AboutProps {
  currentLang: 'EN' | 'AR';
  onLangChange: (lang: 'EN' | 'AR') => void;
  onPageChange: (page: 'home' | 'about' | 'services' | 'blog' | 'contact') => void;
}

export const About: React.FC<AboutProps> = ({ currentLang, onLangChange, onPageChange }) => {
  const langKey = currentLang.toLowerCase() as 'en' | 'ar';
  const data = aboutData[langKey];
  const isRtl = currentLang === 'AR';

  // FAQ accordion active state index
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'about' | 'services' | 'blog' | 'contact') => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const renderPolicyIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Shield className="h-5 w-5" />;
      case 1:
        return <Settings className="h-5 w-5" />;
      case 2:
        return <Leaf className="h-5 w-5" />;
      case 3:
        return <CheckSquare className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  // Local translations to match HADI's exact UI design copy while preserving site context
  const copy = {
    en: {
      aboutTitle: "Keeping Your Premises Clean 24/7",
      aboutTag: "ABOUT US",
      statsLabel1: "Satisfied Our Customers",
      statsLabel2: "Cleaning Expert Members",
      statsLabel3: "Company Award Winner",
      
      whyTag: "WHY CHOOSE US",
      visionTitle: "Our Vision",
      visionDesc: "To lead sustainable infrastructure and road sanitation support by driving the transition to modern, efficient, and eco-friendly sweeping and material lifting solutions.",
      missionTitle: "Our Mission",
      missionDesc: "To provide innovative, high-performance heavy-duty machinery, street sweepers, and lift fleets managed by certified operators, directly supporting Saudi Vision 2030 objectives.",
      
      testTag: "TESTIMONIALS",
      testTitle: "Feedback About Their Experience With Us",
      policyTag: "OUR FOUNDATIONS"
    },
    ar: {
      aboutTitle: "نحافظ على نظافة منشآتكم طوال اليوم",
      aboutTag: "من نحن",
      statsLabel1: "عملاء راضون عن خدماتنا",
      statsLabel2: "أعضاء فريق العمل المعتمدين",
      statsLabel3: "مؤشرات الجودة والجوائز",

      whyTag: "لماذا تختارنا",
      visionTitle: "رؤيتنا",
      visionDesc: "الريادة في تقديم خدمات البنية التحتية والكنس وصيانة الطرق من خلال قيادة التحول نحو حلول لوجستية وصديقة للبيئة تلبي أعلى تطلعات عملائنا.",
      missionTitle: "رسالتنا",
      missionDesc: "توفير معدات ثقيلة وكناسات شوارع ورافعات شوكية حديثة وموثوقة يقودها مشغلون معتمدون، بما يتماشى بالكامل مع تطلعات رؤية المملكة ٢٠٣٠.",

      testTag: "آراء العملاء",
      testTitle: "التقييمات والآراء حول تجربتهم الفنية معنا",
      policyTag: "ركائزنا الأساسية"
    }
  }[langKey];

  return (
    <div className={`min-h-screen bg-white text-slate-700 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="about" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[88px] lg:pt-[112px] relative">
        
        {/* Section 1: Hero Banner (Wave Bottom Cutout Style) */}
        <section className="relative min-h-[300px] flex items-center justify-center py-20 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/realestate_banner.png" alt="Who We Are" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0F172A]/75 mix-blend-multiply" />
          </div>

          {/* Decorative absolute sparkles */}
          <div className="absolute top-10 left-12 text-sky-400 opacity-60 animate-pulse">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="absolute bottom-16 right-16 text-sky-400 opacity-60 animate-pulse">
            <Sparkles className="h-6 w-6" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-display uppercase">
              {currentLang === 'AR' ? 'من نحن' : 'About'}
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

        {/* Section 2: "Keeping Your Premises Clean 24/7" */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Left Column Collage */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                <div className="grid grid-cols-12 gap-4 w-full max-w-[480px]">
                  {/* Top Left Main Image */}
                  <div className="col-span-8 rounded-3xl overflow-hidden shadow-md aspect-[4/3] border border-slate-100">
                    <img src="/images/road_sweeper_riyadh.png" alt="Sweeper operations" className="w-full h-full object-cover" />
                  </div>
                  {/* Floating Play Video style box */}
                  <div className="col-span-4 self-end relative rounded-2xl overflow-hidden aspect-square border border-slate-100 bg-[#0F172A] flex items-center justify-center group cursor-pointer shadow-lg">
                    <img src="/images/boom_truck_crane.png" alt="Play media" className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-all duration-350" />
                    <div className="relative z-10 w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-slate-900 shadow-md">
                      <Play className="h-4.5 w-4.5 fill-current ml-0.5" />
                    </div>
                  </div>
                  {/* Bottom Right Secondary Image */}
                  <div className="col-span-8 col-start-3 rounded-3xl overflow-hidden shadow-md aspect-[4/3] border border-slate-100 relative">
                    <img src="/images/realestate_banner.png" alt="Holding works" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Red "15 Years Of" Badge overlay */}
                <div className={`absolute -bottom-6 ${isRtl ? 'left-6' : 'right-6'} bg-[#A31D1D] rounded-3xl p-5 shadow-2xl flex items-center gap-3 select-none text-white border border-[#b92c2c]`}>
                  <span className="text-5xl font-black font-display leading-none">15</span>
                  <div className="flex flex-col text-[10px] font-black uppercase tracking-wider leading-none">
                    <span className="text-brand-yellow">Years</span>
                    <span className="mt-1">Of</span>
                    <span className="mt-1">Excellence</span>
                  </div>
                </div>
              </div>

              {/* Right Column Text Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="h-0.5 w-8 bg-brand-red" />
                  <span className="text-xs font-black uppercase tracking-widest text-brand-red font-display">
                    {copy.aboutTag}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4.5xl font-black text-slate-900 tracking-tight leading-tight font-display">
                  {copy.aboutTitle}
                </h2>

                <div className="space-y-4 text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                  <p>{data.history.paragraph1}</p>
                  <p>{data.history.paragraph2}</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 3: Capsule Stats Banner (Yellow background capsule) */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-6xl mx-auto bg-brand-yellow px-8 py-10 rounded-[50px] shadow-lg flex flex-col md:flex-row items-center justify-around gap-8 text-slate-900 border border-brand-yellow">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl lg:text-5xl font-black font-display leading-none text-slate-950">1650+</span>
                <span className="text-[10px] font-black uppercase tracking-wider mt-3.5 text-slate-800">
                  {copy.statsLabel1}
                </span>
              </div>
              
              {/* Divider */}
              <span className="hidden md:block h-12 w-0.5 bg-slate-950/15" />

              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl lg:text-5xl font-black font-display leading-none text-slate-950">180+</span>
                <span className="text-[10px] font-black uppercase tracking-wider mt-3.5 text-slate-800">
                  {copy.statsLabel2}
                </span>
              </div>

              {/* Divider */}
              <span className="hidden md:block h-12 w-0.5 bg-slate-950/15" />

              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl lg:text-5xl font-black font-display leading-none text-slate-950">120+</span>
                <span className="text-[10px] font-black uppercase tracking-wider mt-3.5 text-slate-800">
                  {copy.statsLabel3}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: HSE Quality Policies (Clean white cards, red accents) */}
        <section className="py-24 bg-slate-50/50 border-t border-b border-slate-100 mt-12">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span className="h-0.5 w-6 bg-brand-red" />
                <span className="text-xs font-black uppercase tracking-widest text-brand-red">
                  {copy.policyTag}
                </span>
                <span className="h-0.5 w-6 bg-brand-red" />
              </div>
              <h2 className="text-3xl lg:text-4.5xl font-black text-slate-900 tracking-tight font-display">
                {data.policiesSection.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.policiesSection.items.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white border border-slate-100 hover:border-brand-red/30 rounded-3xl p-6.5 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-red transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <div className="p-3 bg-slate-50 border border-slate-100 text-brand-red group-hover:bg-[#A31D1D] group-hover:text-white rounded-2xl w-fit mb-5 shadow-sm transition-all">
                    {renderPolicyIcon(index)}
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight font-display group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-3.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Section 5: Vision & Mission (Split Grid with video checkmark block) */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Left Column Video Player */}
              <div className="lg:col-span-6 relative flex justify-center">
                <div className="relative w-full max-w-[480px] aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-black group border border-slate-100">
                  <img src="/images/realestate_banner.png" alt="Video cover" className="absolute inset-0 w-full h-full object-cover opacity-65" />
                  <button className="absolute inset-0 flex items-center justify-center cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-[#A31D1D] text-white flex items-center justify-center shadow-2xl hover:bg-brand-yellow hover:text-slate-950 transition-all duration-300">
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Right Column Vision & Mission text content */}
              <div className="lg:col-span-6 space-y-6">
                <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="h-0.5 w-8 bg-brand-red" />
                  <span className="text-xs font-black uppercase tracking-widest text-brand-red font-display">
                    {copy.whyTag}
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Vision */}
                  <div className={`flex gap-4 items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="p-1 bg-[#A31D1D] text-white rounded-lg mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 font-display">{copy.visionTitle}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1 font-medium">{copy.visionDesc}</p>
                    </div>
                  </div>

                  {/* Mission */}
                  <div className={`flex gap-4 items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="p-1 bg-[#A31D1D] text-white rounded-lg mt-0.5">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 font-display">{copy.missionTitle}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1 font-medium">{copy.missionDesc}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 6: Testimonials (Feedback about experience) */}
        <section className="py-24 bg-slate-50/50 border-t border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span className="h-0.5 w-6 bg-brand-red" />
                <span className="text-xs font-black uppercase tracking-widest text-brand-red">
                  {copy.testTag}
                </span>
                <span className="h-0.5 w-6 bg-brand-red" />
              </div>
              <h2 className="text-3xl lg:text-4.5xl font-black text-slate-900 tracking-tight font-display">
                {copy.testTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {homeData[langKey].testimonials.items.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative space-y-4">
                  {/* Rating stars */}
                  <div className={`flex items-center gap-1 text-brand-yellow ${isRtl ? 'flex-row-reverse' : ''}`}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-medium italic leading-relaxed">
                    "{item.quote}"
                  </p>
                  <div className={`border-t border-slate-50 pt-4 flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                      <User className="h-4.5 w-4.5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-950 font-display leading-none">
                        {item.author}
                      </h4>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1 block">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Section 7: FAQ Accordions (Folding accordion boards) */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            
            <div className="text-center mb-16 space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span className="h-0.5 w-6 bg-brand-red" />
                <span className="text-xs font-black uppercase tracking-widest text-brand-red font-display">
                  {data.faqsSection.subtitle}
                </span>
                <span className="h-0.5 w-6 bg-brand-red" />
              </div>
              <h2 className="text-3xl lg:text-4.5xl font-black text-slate-900 tracking-tight font-display">
                {data.faqsSection.title}
              </h2>
            </div>

            <div className="space-y-4">
              {data.faqsSection.items.map((item, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen ? 'border-brand-red bg-white shadow-md shadow-brand-red/5' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className={`w-full py-5 px-6 font-extrabold text-xs md:text-sm tracking-tight flex items-center justify-between cursor-pointer transition-colors font-display ${
                        isOpen ? 'text-brand-red' : 'text-slate-800 hover:text-brand-red'
                      } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                    >
                      <span>{item.question}</span>
                      <div className={`p-1.5 rounded-lg transition-colors ${
                        isOpen ? 'bg-brand-red/10 text-brand-red' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </div>
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-60 border-t border-slate-100 bg-slate-50/30' : 'max-h-0'
                    }`}>
                      <p className="p-6 text-xs text-slate-500 font-medium leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} onPageChange={onPageChange} />

    </div>
  );
};

export default About;
