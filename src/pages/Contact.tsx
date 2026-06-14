import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CheckCircle, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
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
    <div className={`min-h-screen bg-white text-zinc-800 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="contact" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[104px]">
        
        {/* Breadcrumb Header Banner (Dark theme) */}
        <section className="bg-brand-dark text-white py-16 relative overflow-hidden border-b border-zinc-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              {data.hero.title}
            </h1>
            <p className="text-xs md:text-sm text-zinc-450 max-w-2xl mx-auto leading-relaxed">
              {data.hero.subtitle}
            </p>
            {/* Breadcrumb nav */}
            <div className={`flex items-center justify-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 pt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <a href="#/home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-brand-yellow transition-colors">
                {data.hero.breadcrumbHome}
              </a>
              <span className="text-zinc-700">/</span>
              <span className="text-brand-yellow">
                {data.hero.breadcrumbCurrent}
              </span>
            </div>
          </div>
        </section>

        {/* Contact Split layout Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Contact Information (Left / LTR) */}
              <div className="lg:col-span-5 flex flex-col space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-black uppercase tracking-widest text-brand-yellow bg-brand-dark px-3.5 py-1.5 rounded-lg w-fit">
                    {data.info.subtitle}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-brand-dark tracking-tight leading-tight">
                    {data.info.title}
                  </h2>
                </div>

                <div className="space-y-5">
                  {/* Address Card */}
                  <div className="flex gap-4 p-5 bg-zinc-50 border border-zinc-200/60 rounded-2xl hover:border-brand-yellow transition-all duration-300">
                    <div className="p-3 bg-brand-dark text-brand-yellow border border-zinc-900 rounded-xl h-11 w-11 shrink-0 flex items-center justify-center shadow-sm">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-zinc-400">
                        {data.info.addressLabel}
                      </span>
                      <span className="text-xs md:text-sm text-brand-dark font-bold mt-1.5 leading-normal">
                        {data.info.address}
                      </span>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="flex gap-4 p-5 bg-zinc-50 border border-zinc-200/60 rounded-2xl hover:border-brand-yellow transition-all duration-300">
                    <div className="p-3 bg-brand-dark text-brand-yellow border border-zinc-900 rounded-xl h-11 w-11 shrink-0 flex items-center justify-center shadow-sm">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-zinc-400">
                        {data.info.phoneLabel}
                      </span>
                      <a 
                        href={`tel:${data.info.phone}`}
                        className="text-xs md:text-sm text-brand-dark font-extrabold hover:text-brand-yellow mt-1.5 transition-colors"
                      >
                        {data.info.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="flex gap-4 p-5 bg-zinc-50 border border-zinc-200/60 rounded-2xl hover:border-brand-yellow transition-all duration-300">
                    <div className="p-3 bg-brand-dark text-brand-yellow border border-zinc-900 rounded-xl h-11 w-11 shrink-0 flex items-center justify-center shadow-sm">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-zinc-400">
                        {data.info.emailLabel}
                      </span>
                      <a 
                        href={`mailto:${data.info.email}`}
                        className="text-xs md:text-sm text-brand-dark font-extrabold hover:text-brand-yellow mt-1.5 transition-colors"
                      >
                        {data.info.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Container (Right / LTR) */}
              <div className="lg:col-span-7 bg-brand-dark text-white rounded-3xl p-8 md:p-10 border border-zinc-900 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="mb-8 space-y-3">
                  <span className="text-xs font-black uppercase tracking-widest text-brand-yellow">
                    {data.form.subtitle}
                  </span>
                  <h3 className="text-xl md:text-3xl font-black text-white tracking-tight">
                    {data.form.title}
                  </h3>
                </div>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                    <CheckCircle className="h-14 w-14 text-brand-yellow" />
                    <h4 className="text-lg font-extrabold text-white">
                      {data.form.success}
                    </h4>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-zinc-900 border border-zinc-850 hover:border-brand-yellow text-white hover:text-brand-yellow font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      {data.form.reset}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider font-black text-zinc-400">
                          {data.form.nameLabel}
                        </label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={data.form.placeholderName}
                          className="px-4 py-3.5 bg-zinc-900 border border-zinc-800 focus:border-brand-yellow rounded-xl focus:outline-none text-xs font-semibold text-white placeholder-zinc-600"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider font-black text-zinc-400">
                          {data.form.emailLabel}
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={data.form.placeholderEmail}
                          className="px-4 py-3.5 bg-zinc-900 border border-zinc-800 focus:border-brand-yellow rounded-xl focus:outline-none text-xs font-semibold text-white placeholder-zinc-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider font-black text-zinc-400">
                          {data.form.phoneLabel}
                        </label>
                        <input
                          required
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={data.form.placeholderPhone}
                          className="px-4 py-3.5 bg-zinc-900 border border-zinc-800 focus:border-brand-yellow rounded-xl focus:outline-none text-xs font-semibold text-white placeholder-zinc-600"
                        />
                      </div>

                      {/* Equipment Type */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider font-black text-zinc-400">
                          {data.form.typeLabel}
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="px-4 py-3.5 bg-zinc-900 border border-zinc-800 focus:border-brand-yellow rounded-xl focus:outline-none text-xs font-semibold text-white cursor-pointer"
                        >
                          {data.form.options.map((opt: { id: string; label: string }) => (
                            <option key={opt.id} value={opt.id} className="bg-zinc-950">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Inquiry message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider font-black text-zinc-400">
                        {data.form.messageLabel}
                      </label>
                      <textarea
                        required
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={data.form.placeholderMessage}
                        className="px-4 py-3.5 bg-zinc-900 border border-zinc-800 focus:border-brand-yellow rounded-xl focus:outline-none text-xs font-semibold text-white placeholder-zinc-600 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-black uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{data.form.submitBtn}</span>
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

export default Contact;
