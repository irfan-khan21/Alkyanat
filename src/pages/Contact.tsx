import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CheckCircle, ChevronRight, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import contactData from '../data/contactData.json';

interface ContactProps {
  currentLang: 'EN' | 'AR';
  onLangChange: (lang: 'EN' | 'AR') => void;
  onPageChange: (page: 'home' | 'about' | 'services' | 'blog' | 'contact') => void;
}

export const Contact: React.FC<ContactProps> = ({ currentLang, onLangChange, onPageChange }) => {
  const langKey = currentLang.toLowerCase() as 'en' | 'ar';
  const data = contactData[langKey];
  const isRtl = currentLang === 'AR';

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'elgin',
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
      type: 'elgin',
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
    <div className={`min-h-screen bg-white text-slate-800 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="contact" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[88px]">
        
        {/* Breadcrumb Header Banner (Light Blue/Ice-Blue Theme) */}
        <section className="bg-brand-bg-light text-brand-navy py-16 md:py-20 relative overflow-hidden border-b border-brand-bg-light/80">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#5777ff_1px,transparent_1px),linear-gradient(to_bottom,#5777ff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-navy">
              {data.hero.title}
            </h1>
            <p className="text-sm md:text-base text-slate-650 max-w-2xl mx-auto leading-relaxed font-medium">
              {data.hero.subtitle}
            </p>
            {/* Breadcrumb nav */}
            <div className={`flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-widest pt-2`}>
              <a href="#/home" onClick={(e) => handleLinkClick(e, 'home')} className="text-slate-500 hover:text-brand-blue transition-colors">
                {data.hero.breadcrumbHome}
              </a>
              <span className="text-slate-400">/</span>
              <span className="text-brand-blue font-extrabold">
                {data.hero.breadcrumbCurrent}
              </span>
            </div>
          </div>
        </section>

        {/* Contact Split layout Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start`}>
              
              {/* Contact Information (Left) */}
              <div className="lg:col-span-5 flex flex-col space-y-8">
                <div className="space-y-4">
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-bg-light px-3.5 py-1.5 rounded-full w-fit">
                    {data.info.subtitle}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
                    {data.info.title}
                  </h2>
                </div>

                <div className="space-y-5">
                  {/* Address Card */}
                  <div className="flex gap-4 p-5 bg-slate-50/50 border border-slate-100 rounded-2xl hover:border-brand-blue/30 hover:bg-white hover:shadow-md hover:shadow-brand-navy/2 transition-all duration-300 group">
                    <div className="p-3 bg-brand-bg-light text-brand-blue rounded-xl h-11 w-11 shrink-0 flex items-center justify-center shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                        {data.info.addressLabel}
                      </span>
                      <span className="text-xs md:text-sm text-brand-navy font-bold mt-1.5 leading-normal">
                        {data.info.address}
                      </span>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="flex gap-4 p-5 bg-slate-50/50 border border-slate-100 rounded-2xl hover:border-brand-blue/30 hover:bg-white hover:shadow-md hover:shadow-brand-navy/2 transition-all duration-300 group">
                    <div className="p-3 bg-brand-bg-light text-brand-blue rounded-xl h-11 w-11 shrink-0 flex items-center justify-center shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                        {data.info.phoneLabel}
                      </span>
                      <a 
                        href={`tel:${data.info.phone}`}
                        className="text-xs md:text-sm text-brand-navy font-extrabold hover:text-brand-blue mt-1.5 transition-colors"
                      >
                        {data.info.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="flex gap-4 p-5 bg-slate-50/50 border border-slate-100 rounded-2xl hover:border-brand-blue/30 hover:bg-white hover:shadow-md hover:shadow-brand-navy/2 transition-all duration-300 group">
                    <div className="p-3 bg-brand-bg-light text-brand-blue rounded-xl h-11 w-11 shrink-0 flex items-center justify-center shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                        {data.info.emailLabel}
                      </span>
                      <a 
                        href={`mailto:${data.info.email}`}
                        className="text-xs md:text-sm text-brand-navy font-extrabold hover:text-brand-blue mt-1.5 transition-colors"
                      >
                        {data.info.email}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp Card */}
                  <div className="flex gap-4 p-5 bg-slate-50/50 border border-slate-100 rounded-2xl hover:border-emerald-500/30 hover:bg-white hover:shadow-md hover:shadow-emerald-500/2 transition-all duration-300 group">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl h-11 w-11 shrink-0 flex items-center justify-center shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                        {currentLang === 'AR' ? 'واتساب' : 'WhatsApp Support'}
                      </span>
                      <a 
                        href="https://wa.me/966557062353"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs md:text-sm text-brand-navy font-extrabold hover:text-emerald-500 mt-1.5 transition-colors"
                      >
                        {currentLang === 'AR' ? 'تواصل معنا مباشرة' : 'Chat with Operations'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Container (Right) */}
              <div className="lg:col-span-7 bg-brand-bg-lighter rounded-3xl p-8 md:p-10 border border-brand-bg-light shadow-xl shadow-brand-navy/3 relative overflow-hidden">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="mb-8 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                    {data.form.subtitle}
                  </span>
                  <h3 className="text-xl md:text-3xl font-extrabold text-brand-navy tracking-tight">
                    {data.form.title}
                  </h3>
                </div>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                    <CheckCircle className="h-14 w-14 text-brand-blue" />
                    <h4 className="text-lg font-bold text-brand-navy">
                      {data.form.success}
                    </h4>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-white border border-slate-200 hover:border-brand-blue text-slate-705 hover:text-brand-blue font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      {data.form.reset}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                          {data.form.nameLabel}
                        </label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={data.form.placeholderName}
                          className="px-4 py-3.5 bg-white border border-slate-200 focus:border-brand-blue rounded-xl focus:outline-none text-xs font-semibold text-slate-800 placeholder-slate-400"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                          {data.form.emailLabel}
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={data.form.placeholderEmail}
                          className="px-4 py-3.5 bg-white border border-slate-200 focus:border-brand-blue rounded-xl focus:outline-none text-xs font-semibold text-slate-800 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                          {data.form.phoneLabel}
                        </label>
                        <input
                          required
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={data.form.placeholderPhone}
                          className="px-4 py-3.5 bg-white border border-slate-200 focus:border-brand-blue rounded-xl focus:outline-none text-xs font-semibold text-slate-800 placeholder-slate-400"
                        />
                      </div>

                      {/* Equipment Type */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                          {data.form.typeLabel}
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="px-4 py-3.5 bg-white border border-slate-200 focus:border-brand-blue rounded-xl focus:outline-none text-xs font-semibold text-slate-800 cursor-pointer"
                        >
                          {data.form.options.map((opt: { id: string; label: string }) => (
                            <option key={opt.id} value={opt.id} className="text-slate-800">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Inquiry message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                        {data.form.messageLabel}
                      </label>
                      <textarea
                        required
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={data.form.placeholderMessage}
                        className="px-4 py-3.5 bg-white border border-slate-200 focus:border-brand-blue rounded-xl focus:outline-none text-xs font-semibold text-slate-800 placeholder-slate-400 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-brand-blue hover:bg-brand-blue-hover text-white font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>{data.form.submitBtn}</span>
                      <ChevronRight className={`h-4.5 w-4.5 stroke-[3.5] transition-transform duration-200 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-brand-bg-lighter border border-slate-100 rounded-3xl p-4 md:p-6 shadow-md overflow-hidden relative group">
              {/* Decorative background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-25 pointer-events-none" />
              
              <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="p-4 bg-white text-brand-blue rounded-full shadow-md z-10 animate-pulse">
                  <MapPin className="h-8 w-8" />
                </div>
                <div className="z-10 max-w-md">
                  <h4 className="text-lg font-extrabold text-brand-navy tracking-tight">
                    {currentLang === 'AR' ? 'مقر العمليات والأسطول' : 'Operations & Fleet Hub'}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed">
                    {data.info.address}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-4">
                    {currentLang === 'AR' ? 'منفوحة الجديدة، الرياض، المملكة العربية السعودية' : 'Manfuhah Jadeedah, Riyadh, KSA'}
                  </p>
                </div>
                {/* Styled map background graphics (mockup) */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center justify-center">
                  <svg viewBox="0 0 800 400" className="w-full h-full stroke-brand-navy stroke-[2.5] fill-none">
                    <path d="M 0,50 L 800,50 M 0,150 L 800,150 M 0,250 L 800,250 M 0,350 L 800,350" />
                    <path d="M 100,0 L 100,400 M 300,0 L 300,400 M 500,0 L 500,400 M 700,0 L 700,400" />
                    <path d="M 50,0 Q 150,100 250,0 T 450,0 T 650,0" strokeDasharray="5 5" />
                    <circle cx="300" cy="150" r="40" className="fill-brand-blue/20 stroke-brand-blue" />
                    <circle cx="500" cy="250" r="60" className="fill-brand-navy/10" />
                  </svg>
                </div>
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

export default Contact;
