import React, { useState, useEffect } from 'react';
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
        return <Clock className="h-6 w-6 text-brand-blue" />;
      case 1:
        return <Wrench className="h-6 w-6 text-brand-blue" />;
      case 2:
        return <MapPin className="h-6 w-6 text-brand-blue" />;
      case 3:
        return <BookOpen className="h-6 w-6 text-brand-blue" />;
      default:
        return <HelpCircle className="h-6 w-6 text-brand-blue" />;
    }
  };

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'elgin',
    duration: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync selected type from URL hash query if present
  useEffect(() => {
    const handleHashChange = () => {
      const match = window.location.hash.match(/type=([a-z]+)/);
      if (match && match[1]) {
        setFormData((prev) => ({ ...prev, type: match[1] }));
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      type: 'elgin',
      duration: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'about' | 'services' | 'blog' | 'contact') => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className={`min-h-screen bg-white text-slate-700 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="services" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[88px]">
        
        {/* Breadcrumb Header Banner (Navy theme) */}
        <section className="bg-brand-navy text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              {data.hero.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {data.hero.subtitle}
            </p>
            {/* Breadcrumb nav */}
            <div className={`flex items-center justify-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 pt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <a href="#/home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-brand-blue transition-colors">
                {data.hero.breadcrumbHome}
              </a>
              <span className="text-slate-600">/</span>
              <span className="text-brand-blue">
                {data.hero.breadcrumbCurrent}
              </span>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-20 bg-white border-b border-zinc-100">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-brand-blue bg-brand-bg-light px-3.5 py-1.5 rounded-xl inline-block">
              {data.intro.subtitle}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
              {data.intro.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
              {data.intro.paragraph}
            </p>
          </div>
        </section>

        {/* Services List Section (Grid of Cards with details/specs) */}
        <section className="py-24 bg-brand-bg-lighter border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {data.servicesList.map((service) => (
                <div 
                  key={service.id}
                  id={service.id}
                  className="bg-white border border-slate-100 rounded-3xl p-8 transition-all duration-300 hover:border-brand-blue hover:shadow-lg hover:shadow-brand-blue/5 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-brand-blue bg-brand-bg-light px-3 py-1 rounded-lg">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-brand-navy tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                      {service.description}
                    </p>

                    {/* Specs Bullet Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-brand-bg-light">
                      {service.specs.map((spec, i) => (
                        <div key={i} className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                          <CheckCircle className="h-4 w-4 text-brand-blue shrink-0" />
                          <span className="text-xs font-medium text-slate-700">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#quote-form"
                    className="inline-flex items-center gap-1.5 mt-8 text-xs font-bold uppercase tracking-widest text-brand-navy hover:text-brand-blue transition-all w-fit cursor-pointer"
                  >
                    <span>{currentLang === 'AR' ? 'طلب عرض سعر' : 'Get a Quote'}</span>
                    <ChevronRight className={`h-4 w-4 stroke-[3] ${isRtl ? 'rotate-180' : ''}`} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Operating Process */}
        <section className="py-24 bg-brand-navy-dark text-white">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-blue bg-brand-navy border border-brand-blue/30 px-3.5 py-1.5 rounded-xl inline-block">
                {data.process.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                {data.process.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.process.steps.map((step, index) => (
                <div 
                  key={index}
                  className="bg-brand-navy/35 border border-brand-navy/60 rounded-3xl p-8 relative overflow-hidden group hover:border-brand-blue transition-all duration-300"
                >
                  <div className="absolute right-4 top-4 text-4xl md:text-5xl font-black text-brand-navy/40 group-hover:text-brand-blue/15 transition-all">
                    {step.number}
                  </div>
                  <span className="text-2xl font-extrabold text-brand-blue block mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-3.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Customer Support Section */}
        <section className="py-24 bg-brand-bg-lighter border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-blue bg-brand-bg-light px-3.5 py-1.5 rounded-xl inline-block">
                {data.supportSection.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                {data.supportSection.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                {data.supportSection.paragraph}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.supportSection.items.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white border border-slate-100 rounded-2xl p-6 transition-all duration-300 hover:border-brand-blue hover:shadow-lg hover:shadow-brand-blue/5 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-blue transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <div className="p-3 bg-brand-bg-light rounded-xl w-fit mb-5 shadow-sm">
                    {renderSupportIcon(index)}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Quote Inquiry Form */}
        <section id="quote-form" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="bg-brand-navy text-white rounded-3xl p-8 md:p-12 border border-brand-navy-dark shadow-2xl relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl" />
              
              <div className="text-center mb-10 space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-brand-blue">
                  {data.quoteForm.subtitle}
                </span>
                <h3 className="text-xl md:text-3xl font-extrabold text-white tracking-tight">
                  {data.quoteForm.title}
                </h3>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                  <CheckCircle className="h-14 w-14 text-brand-blue" />
                  <h4 className="text-lg font-extrabold text-white">
                    {data.quoteForm.success}
                  </h4>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-brand-navy-dark border border-brand-navy hover:border-brand-blue text-white hover:text-brand-blue font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    {currentLang === 'AR' ? 'إرسال طلب آخر' : 'Send another request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-slate-300">
                        {data.quoteForm.nameLabel}
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="px-4 py-3.5 bg-brand-navy-dark border border-brand-navy focus:border-brand-blue rounded-xl focus:outline-none text-xs font-medium text-white"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-slate-300">
                        {data.quoteForm.emailLabel}
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="px-4 py-3.5 bg-brand-navy-dark border border-brand-navy focus:border-brand-blue rounded-xl focus:outline-none text-xs font-medium text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Phone */}
                    <div className="flex flex-col gap-1.5 sm:col-span-1">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-slate-300">
                        {data.quoteForm.phoneLabel}
                      </label>
                      <input
                        required
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="px-4 py-3.5 bg-brand-navy-dark border border-brand-navy focus:border-brand-blue rounded-xl focus:outline-none text-xs font-medium text-white"
                      />
                    </div>

                    {/* Equipment Type Selection */}
                    <div className="flex flex-col gap-1.5 sm:col-span-1">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-slate-300">
                        {data.quoteForm.typeLabel}
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="px-4 py-3.5 bg-brand-navy-dark border border-brand-navy focus:border-brand-blue rounded-xl focus:outline-none text-xs font-medium text-white cursor-pointer"
                      >
                        <option value="elgin">Elgin Road Sweeper</option>
                        <option value="johnston">Johnston Road Sweeper</option>
                        <option value="scarab">ScaraB Road Sweeper</option>
                        <option value="gardens">Garden Sweepers</option>
                        <option value="boomtrucks">Boom Trucks (10/12/15 Tons)</option>
                        <option value="forklifts">Forklifts</option>
                        <option value="cranes">Cranes</option>
                        <option value="heavyduty">Heavy Duty Construction</option>
                      </select>
                    </div>

                    {/* Rental Duration */}
                    <div className="flex flex-col gap-1.5 sm:col-span-1">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-slate-300">
                        {data.quoteForm.durationLabel}
                      </label>
                      <input
                        required
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="e.g. 3 Months"
                        className="px-4 py-3.5 bg-brand-navy-dark border border-brand-navy focus:border-brand-blue rounded-xl focus:outline-none text-xs font-medium text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  {/* Project Scope */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider font-bold text-slate-300">
                      {data.quoteForm.messageLabel}
                    </label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="px-4 py-3.5 bg-brand-navy-dark border border-brand-navy focus:border-brand-blue rounded-xl focus:outline-none text-xs font-medium text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-brand-blue hover:bg-brand-blue-hover text-white font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{data.quoteForm.submitBtn}</span>
                    <ChevronRight className={`h-4.5 w-4.5 stroke-[3.5] ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </form>
              )}

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
