import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Shield, Settings, Leaf, CheckSquare, Plus, Minus } from 'lucide-react';
import aboutData from '../data/aboutData.json';

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

  const renderPolicyIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Shield className="h-6 w-6 text-brand-orange" />;
      case 1:
        return <Settings className="h-6 w-6 text-brand-orange" />;
      case 2:
        return <Leaf className="h-6 w-6 text-brand-orange" />;
      case 3:
        return <CheckSquare className="h-6 w-6 text-brand-orange" />;
      default:
        return <Shield className="h-6 w-6 text-brand-orange" />;
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'about' | 'services' | 'blog' | 'contact') => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className={`min-h-screen bg-premium-gradient text-slate-700 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="about" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[88px] relative">
        
        {/* Glow decoration */}
        <div className="absolute top-20 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

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

        {/* History Section (Split Content) */}
        <section className="py-24 bg-transparent border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* History Details */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 rounded-xl w-fit inline-block">
                  {data.history.subtitle}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                  {data.history.title}
                </h2>
                <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                  <p>{data.history.paragraph1}</p>
                  <p>{data.history.paragraph2}</p>
                </div>
              </div>

              {/* History Graphics card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 bg-white p-2.5 shadow-sm">
                  <img 
                    src="/images/realestate_banner.png" 
                    alt="Al Kayanat KSA Operations" 
                    className="w-full h-full object-cover rounded-2xl opacity-90 hover:opacity-100 hover:scale-102 transition-all duration-500"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* HSE & Quality Section (4-card Grid with Dark Background for Contrast) */}
        <section className="py-24 bg-brand-navy border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-white/[0.02] border border-white/[0.08] px-3.5 py-1.5 rounded-xl inline-block shadow-lg">
                {data.policiesSection.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-display">
                {data.policiesSection.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.policiesSection.items.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/[0.02] border border-white/[0.06] hover:border-brand-orange/30 rounded-3xl p-6 hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden group hover:shadow-[0_10px_30px_-15px_rgba(255,107,0,0.08)]"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-orange transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <div className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-xl w-fit mb-5 shadow-md">
                    {renderPolicyIcon(index)}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight font-display group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="py-24 bg-transparent">
          <div className="max-w-4xl mx-auto px-6">
            
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 rounded-xl inline-block shadow-sm">
                {data.faqsSection.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                {data.faqsSection.title}
              </h2>
            </div>

            <div className="space-y-4.5">
              {data.faqsSection.items.map((item, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen ? 'border-brand-orange bg-white shadow-md shadow-brand-orange/5' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className={`w-full py-5 px-6 font-bold text-xs md:text-sm tracking-tight flex items-center justify-between cursor-pointer transition-colors font-display ${
                        isOpen ? 'text-brand-orange' : 'text-slate-800 hover:text-brand-orange'
                      } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                    >
                      <span>{item.question}</span>
                      <div className={`p-1 rounded-lg transition-colors ${
                        isOpen ? 'bg-brand-orange/10 text-brand-orange' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </div>
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-60 border-t border-slate-100 bg-slate-50/30' : 'max-h-0'
                    }`}>
                      <p className="p-6 text-xs text-slate-650 font-medium leading-relaxed">
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
