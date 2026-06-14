import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  Shield, 
  Activity, 
  Leaf, 
  ChevronRight, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Truck,
  Sliders,
  Wrench,
  Building
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

  // Lead Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    equipment: 'elgin',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      equipment: 'elgin',
      message: ''
    });
    setIsSubmitted(false);
  };

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
        return <Sliders className="h-6 w-6 text-brand-yellow" />;
      case 1:
        return <Wrench className="h-6 w-6 text-brand-yellow" />;
      case 2:
        return <Building className="h-6 w-6 text-brand-yellow" />;
      default:
        return <Shield className="h-6 w-6 text-brand-yellow" />;
    }
  };

  // Icon mapping helper for services
  const renderServiceIcon = (id: string) => {
    switch (id) {
      case 'elgin':
      case 'johnston':
      case 'scarab':
        return <Truck className="h-7 w-7 text-brand-yellow" />;
      case 'gardens':
        return <Leaf className="h-7 w-7 text-brand-yellow" />;
      case 'boomtrucks':
      case 'forklifts':
      case 'cranes':
        return <Activity className="h-7 w-7 text-brand-yellow" />;
      default:
        return <Shield className="h-7 w-7 text-brand-yellow" />;
    }
  };

  return (
    <div className={`min-h-screen bg-white text-zinc-800 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="home" onPageChange={onPageChange} />

      {/* Main Homepage Content */}
      <main className="flex-grow pt-[104px]">

        {/* Section 1: Hero Banner Section (Dark theme, CD-headline text rotator, Floating social) */}
        <section className="relative bg-brand-dark text-white py-24 lg:py-32 overflow-hidden border-b border-zinc-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20 pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Hero Left Column (Info & Rotator) */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-brand-yellow bg-zinc-900 border border-zinc-850 px-4 py-1.5 rounded-full w-fit">
                  {data.hero.subtitle}
                </span>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white max-w-2xl">
                  {data.hero.title} <br/>
                  <span className="text-brand-yellow inline-block transition-all duration-300 transform translate-y-0 opacity-100 min-h-[48px] md:min-h-[60px] lg:min-h-[72px]">
                    {rotatorWords[rotatorIndex]}
                  </span>
                </h1>

                <p className="text-xs md:text-sm lg:text-base text-zinc-400 font-medium leading-relaxed max-w-xl">
                  {data.hero.paragraph}
                </p>

                <div className={`flex flex-col sm:flex-row gap-4 pt-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                  <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-widest rounded-xl text-brand-dark bg-brand-yellow hover:bg-brand-yellow-hover shadow-lg shadow-brand-yellow/5 hover:shadow-brand-yellow/10 transition-all cursor-pointer"
                  >
                    <span>{data.hero.cta}</span>
                    <ArrowRight className={`ml-2 h-4 w-4 stroke-[3] ${isRtl ? 'rotate-180 mr-2 ml-0' : ''}`} />
                  </a>
                </div>

                <div className={`flex items-center gap-3 pt-6 border-t border-zinc-900 max-w-lg ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <span className="h-2 w-2 rounded-full bg-brand-yellow animate-pulse shrink-0" />
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-500">
                    {data.hero.trustedLabel}
                  </p>
                </div>
              </div>

              {/* Hero Right Column (Banner Image) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-850 shadow-2xl bg-zinc-950 p-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-10" />
                  <img 
                    src="/images/machinery_banner.png" 
                    alt="Al Kyanat KSA Fleet" 
                    className="w-full h-full object-cover rounded-2xl opacity-95 hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 2: Core Strengths (3 cards matching reference design features) */}
        <section className="py-20 bg-[#F9F9F9] border-b border-zinc-150">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.strengths.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white border border-zinc-200/60 rounded-2xl p-8 hover:border-brand-yellow transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-brand-yellow transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl w-fit mb-5 shadow-sm">
                    {renderStrengthIcon(index)}
                  </div>
                  <h3 className="text-lg font-black text-brand-dark tracking-tight">
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

        {/* Section 3: About Holding Group (Side-by-side layout with stats counters) */}
        <section className="py-24 bg-white border-b border-zinc-150">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* About Text */}
              <div className="lg:col-span-7 flex flex-col space-y-5">
                <span className="text-xs font-black uppercase tracking-widest text-brand-yellow bg-zinc-950 px-3.5 py-1.5 rounded-lg w-fit">
                  {data.about.subtitle}
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-brand-dark tracking-tight leading-tight">
                  {data.about.title}
                </h2>
                <p className="text-xs md:text-sm text-zinc-500 font-semibold leading-relaxed">
                  {data.about.paragraph}
                </p>
                <button
                  onClick={(e) => handleLinkClick(e, '#/services')}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl text-white bg-brand-dark hover:bg-zinc-900 shadow-md transition-all w-fit cursor-pointer"
                >
                  <span>{data.about.cta}</span>
                  <ChevronRight className={`ml-1.5 h-4 w-4 stroke-[3.5] text-brand-yellow ${isRtl ? 'rotate-180 mr-1.5 ml-0' : ''}`} />
                </button>
              </div>

              {/* Stats Counters */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                  {data.about.stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-brand-dark text-white rounded-2xl p-6 border border-zinc-900 shadow-lg relative overflow-hidden flex flex-col justify-center"
                    >
                      <div className="absolute right-4 bottom-4 text-brand-yellow/5 transform translate-y-6 translate-x-4">
                        <Truck className="h-32 w-32" />
                      </div>
                      <span className="text-3xl md:text-4xl font-black text-brand-yellow block">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mt-1">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Services Offered (Grid of 8 service cards matching UFM design layout) */}
        <section className="py-24 bg-[#F9F9F9] border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-yellow bg-zinc-950 px-3 py-1.5 rounded-lg">
                {data.servicesSection.subtitle}
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-brand-dark tracking-tight">
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
                  className="bg-white border border-zinc-200/60 rounded-2xl p-6 transition-all duration-300 hover:border-brand-yellow hover:shadow-lg flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl w-fit group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-all">
                      <div className="group-hover:text-brand-dark text-brand-yellow transition-all">
                        {renderServiceIcon(item.id)}
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h3 className="text-base font-black text-brand-dark tracking-tight mt-0.5 group-hover:text-brand-yellow transition-all">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleLinkClick(e, '#/services')}
                    className="inline-flex items-center gap-1 mt-6 text-[10px] font-black uppercase tracking-widest text-brand-dark hover:text-brand-yellow transition-all cursor-pointer w-fit"
                  >
                    <span>{data.servicesSection.cta}</span>
                    <ChevronRight className={`h-3.5 w-3.5 stroke-[3] ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Section 5: Lead Inquiry Form (Split contact section) */}
        <section id="contact-form" className="py-24 bg-brand-dark text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Form Info details (Left / LTR) */}
              <div className="lg:col-span-5 flex flex-col space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-black uppercase tracking-widest text-brand-yellow bg-zinc-900 px-3.5 py-1.5 rounded-lg border border-zinc-850 w-fit">
                    {data.leadForm.subtitle}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                    {data.leadForm.title}
                  </h2>
                  <p className="text-xs md:text-sm text-zinc-400 font-semibold leading-relaxed">
                    {data.leadForm.paragraph}
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex gap-4 p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl">
                    <div className="p-2.5 bg-brand-dark text-brand-yellow border border-zinc-900 rounded-xl h-10 w-10 shrink-0 flex items-center justify-center">
                      <Phone className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-wider font-extrabold text-zinc-500">
                        {currentLang === 'AR' ? 'رقم الاتصال' : 'Operations Desk'}
                      </span>
                      <a href="tel:+966114567890" className="text-xs text-zinc-300 font-extrabold hover:text-brand-yellow mt-1">
                        +966 11 456 7890
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl">
                    <div className="p-2.5 bg-brand-dark text-brand-yellow border border-zinc-900 rounded-xl h-10 w-10 shrink-0 flex items-center justify-center">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-wider font-extrabold text-zinc-500">
                        {currentLang === 'AR' ? 'البريد الإلكتروني' : 'Official Inquiry'}
                      </span>
                      <a href="mailto:info@alkyanat.com" className="text-xs text-zinc-300 font-extrabold hover:text-brand-yellow mt-1">
                        info@alkyanat.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl">
                    <div className="p-2.5 bg-brand-dark text-brand-yellow border border-zinc-900 rounded-xl h-10 w-10 shrink-0 flex items-center justify-center">
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-wider font-extrabold text-zinc-500">
                        {currentLang === 'AR' ? 'العنوان' : 'Office Address'}
                      </span>
                      <span className="text-xs text-zinc-300 font-bold mt-1">
                        King Fahd Road, Al Rahmaniyah, Riyadh 12341, KSA
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Input fields (Right / LTR) */}
              <div className="lg:col-span-7 bg-zinc-950/50 border border-zinc-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                    <CheckCircle className="h-14 w-14 text-brand-yellow" />
                    <h3 className="text-xl font-extrabold text-white">
                      {data.leadForm.success}
                    </h3>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-brand-yellow text-white hover:text-brand-yellow font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      {data.leadForm.reset}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider font-black text-zinc-450">
                          {data.leadForm.nameLabel}
                        </label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={data.leadForm.placeholderName}
                          className="px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-brand-yellow rounded-xl focus:bg-zinc-900 focus:outline-none text-xs font-semibold text-white placeholder-zinc-550"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider font-black text-zinc-450">
                          {data.leadForm.emailLabel}
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={data.leadForm.placeholderEmail}
                          className="px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-brand-yellow rounded-xl focus:bg-zinc-900 focus:outline-none text-xs font-semibold text-white placeholder-zinc-550"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider font-black text-zinc-450">
                          {data.leadForm.phoneLabel}
                        </label>
                        <input
                          required
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={data.leadForm.placeholderPhone}
                          className="px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-brand-yellow rounded-xl focus:bg-zinc-900 focus:outline-none text-xs font-semibold text-white placeholder-zinc-550"
                        />
                      </div>

                      {/* Equipment Type */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider font-black text-zinc-450">
                          {data.leadForm.selectLabel}
                        </label>
                        <select
                          name="equipment"
                          value={formData.equipment}
                          onChange={handleInputChange}
                          className="px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-brand-yellow rounded-xl focus:outline-none text-xs font-semibold text-white cursor-pointer"
                        >
                          {data.leadForm.options.map((opt: { id: string; label: string }) => (
                            <option key={opt.id} value={opt.id} className="bg-zinc-950">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message Details */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider font-black text-zinc-450">
                        {data.leadForm.messageLabel}
                      </label>
                      <textarea
                        required
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={data.leadForm.placeholderMessage}
                        className="px-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-brand-yellow rounded-xl focus:outline-none text-xs font-semibold text-white placeholder-zinc-550 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-black uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{data.leadForm.submitBtn}</span>
                      <ChevronRight className={`h-4.5 w-4.5 stroke-[3.5] ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                  </form>
                )}
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
