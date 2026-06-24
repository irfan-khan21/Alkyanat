import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CheckCircle, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
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
    
    // Find the label for the selected option in the current language
    const selectedOption = data.form.options.find((opt: { id: string; label: string }) => opt.id === formData.type);
    const equipmentLabel = selectedOption ? selectedOption.label : formData.type;

    // Construct WhatsApp message
    const intro = currentLang === 'AR' ? 'مرحباً الكيانات، أود إرسال استفسار تشغيل:' : 'Hello Al Kyanat, I would like to submit a dispatch inquiry:';
    const nameLabel = currentLang === 'AR' ? 'الاسم' : 'Name';
    const emailLabel = currentLang === 'AR' ? 'البريد الإلكتروني' : 'Email';
    const phoneLabel = currentLang === 'AR' ? 'الهاتف' : 'Phone';
    const equipLabel = currentLang === 'AR' ? 'المعدة المطلوبة' : 'Equipment Type';
    const detailsLabel = currentLang === 'AR' ? 'التفاصيل' : 'Details';

    const formattedMessage = `${intro}\n\n• *${nameLabel}:* ${formData.name}\n• *${emailLabel}:* ${formData.email}\n• *${phoneLabel}:* ${formData.phone}\n• *${equipLabel}:* ${equipmentLabel}\n• *${detailsLabel}:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/966557062353?text=${encodeURIComponent(formattedMessage)}`;
    
    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank');

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

  const renderSweeperSVG = (bgFill: string, brushFill: string) => {
    return (
      <svg viewBox="0 0 64 64" className="w-12 h-12 opacity-85 shrink-0 select-none hidden sm:block">
        <path d="M16,40 L48,40 L44,20 C43,18 41,16 38,16 L24,16 C21,16 19,18 18,20 Z" fill={bgFill} stroke="#94A3B8" strokeWidth="2" />
        <rect x="20" y="22" width="10" height="8" rx="1" fill="#38BDF8" opacity="0.6" />
        <circle cx="22" cy="44" r="5" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <circle cx="42" cy="44" r="5" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <path d="M46,38 C50,38 52,36 52,34 L50,30" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10,44 Q6,48 10,52 Q14,48 10,44 Z" fill={brushFill} />
      </svg>
    );
  };

  return (
    <div className={`min-h-screen bg-premium-gradient text-slate-700 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="contact" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[88px] lg:pt-[112px] relative">
        
        {/* Glow decoration */}
        <div className="absolute top-20 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Banner (Wave Bottom Cutout Style) */}
        <section className="relative min-h-[300px] flex items-center justify-start py-20 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/contact_banner.png" alt="Contact" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0F172A]/75 mix-blend-multiply" />
          </div>

          {/* Sparkles decoration */}
          <div className="absolute top-10 left-12 text-sky-400 opacity-60 animate-pulse">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="absolute bottom-16 right-16 text-sky-400 opacity-60 animate-pulse">
            <Sparkles className="h-6 w-6" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-left space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-display uppercase">
              {currentLang === 'AR' ? 'اتصل بنا' : 'Contact'}
            </h1>
            
            {/* Breadcrumb Navigation */}
            <div className={`flex items-center justify-start gap-2 text-xs font-black uppercase tracking-wider text-slate-350 pt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
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

        {/* Section 2: Contact Information capsules */}
        <section className="py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 space-y-12 animate-page-in">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight">
                {currentLang === 'AR' ? 'معلومات الاتصال بنا' : 'Our Contact Information'}
              </h2>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Address */}
              <div className={`bg-white border border-slate-100/90 rounded-full py-4.5 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center justify-between gap-4 hover:shadow-lg transition-all duration-300 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-full h-12 w-12 shrink-0 flex items-center justify-center shadow-inner">
                    <MapPin className="h-5.5 w-5.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                      {data.info.addressLabel}
                    </span>
                    <span className="text-xs md:text-sm text-slate-700 font-extrabold mt-0.5 leading-snug">
                      {data.info.address}
                    </span>
                  </div>
                </div>
                {/* Custom SVG Sweeper illustration */}
                {renderSweeperSVG('#E2E8F0', '#94A3B8')}
              </div>

              {/* Card 2: Contact Number 1 */}
              <div className={`bg-white border border-slate-100/90 rounded-full py-4.5 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center justify-between gap-4 hover:shadow-lg transition-all duration-300 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-600 rounded-full h-12 w-12 shrink-0 flex items-center justify-center shadow-inner">
                    <Phone className="h-5.5 w-5.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                      {currentLang === 'AR' ? 'رقم التواصل' : 'Contact Number'}
                    </span>
                    <a href={`tel:${data.info.phone}`} className="text-xs md:text-sm text-slate-700 font-extrabold mt-0.5 leading-snug hover:text-brand-orange transition-colors">
                      {data.info.phone}
                    </a>
                  </div>
                </div>
                {/* Custom SVG Sweeper illustration */}
                {renderSweeperSVG('#DCFCE7', '#22C55E')}
              </div>

              {/* Card 3: Contact Number 2 */}
              <div className={`bg-white border border-slate-100/90 rounded-full py-4.5 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center justify-between gap-4 hover:shadow-lg transition-all duration-300 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 rounded-full h-12 w-12 shrink-0 flex items-center justify-center shadow-inner">
                    <Phone className="h-5.5 w-5.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                      {currentLang === 'AR' ? 'رقم التواصل' : 'Contact Number'}
                    </span>
                    <a href={`tel:+966580006668`} className="text-xs md:text-sm text-slate-700 font-extrabold mt-0.5 leading-snug hover:text-brand-orange transition-colors">
                      {currentLang === 'AR' ? '+٩٦٦ ٥٨٠٠٠ ٦٦٦٨' : '+966 58000 6668'}
                    </a>
                  </div>
                </div>
                {/* Custom SVG Sweeper illustration */}
                {renderSweeperSVG('#FEF3C7', '#F59E0B')}
              </div>
            </div>

            {/* Centered Row for Email */}
            <div className="flex justify-center w-full">
              <div className="w-full md:max-w-xl">
                <div className={`bg-white border border-slate-100/90 rounded-full py-4.5 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center justify-between gap-4 hover:shadow-lg transition-all duration-300 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-full h-12 w-12 shrink-0 flex items-center justify-center shadow-inner">
                      <Mail className="h-5.5 w-5.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                        {data.info.emailLabel}
                      </span>
                      <div className="flex flex-col sm:flex-row sm:gap-4 mt-0.5">
                        <a href={`mailto:${data.info.email}`} className="text-xs md:text-sm text-slate-700 font-extrabold hover:text-brand-orange transition-colors">
                          {data.info.email}
                        </a>
                        <span className="hidden sm:inline text-slate-300">|</span>
                        <a href={`mailto:project@aidecarts.com`} className="text-xs md:text-sm text-slate-700 font-extrabold hover:text-brand-orange transition-colors">
                          project@alkyanat-almushtarika.com
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Custom SVG Sweeper illustration */}
                  {renderSweeperSVG('#FEE2E2', '#EF4444')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form and Image Side-by-Side split layout */}
        <section className="py-24 bg-transparent border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Contact Form Container (Left) */}
              <div className="lg:col-span-6 bg-slate-50/70 border border-slate-100 rounded-[32px] p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="mb-8 space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display">
                    {currentLang === 'AR' ? 'تواصل معنا' : 'Get In Touch'}
                  </h3>
                </div>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-10 space-y-4 flex-grow">
                    <CheckCircle className="h-14 w-14 text-brand-orange animate-bounce" />
                    <h4 className="text-lg font-bold text-slate-900 font-display">
                      {data.form.success}
                    </h4>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-slate-50 border border-slate-200 hover:border-brand-orange text-slate-700 hover:text-brand-orange font-bold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-sm font-display"
                    >
                      {data.form.reset}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                          <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={data.form.nameLabel}
                            className="px-6 py-4 bg-white border border-slate-200 focus:border-brand-yellow rounded-full focus:outline-none text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all w-full shadow-sm"
                          />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={data.form.emailLabel}
                            className="px-6 py-4 bg-white border border-slate-200 focus:border-brand-yellow rounded-full focus:outline-none text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all w-full shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                          <input
                            required
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={data.form.phoneLabel}
                            className="px-6 py-4 bg-white border border-slate-200 focus:border-brand-yellow rounded-full focus:outline-none text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all w-full shadow-sm"
                          />
                        </div>

                        {/* Equipment Type select dropdown */}
                        <div className="flex flex-col gap-1.5">
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="px-6 py-4 bg-white border border-slate-200 focus:border-brand-yellow rounded-full focus:outline-none text-xs font-semibold text-slate-800 cursor-pointer transition-all w-full shadow-sm appearance-none"
                          >
                            {data.form.options.map((opt: { id: string; label: string }) => (
                              <option key={opt.id} value={opt.id} className="text-slate-800 bg-white">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Inquiry message */}
                      <div className="flex flex-col gap-1.5">
                        <textarea
                          required
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={data.form.messageLabel}
                          className="px-6 py-5 bg-white border border-slate-200 focus:border-brand-yellow rounded-3xl focus:outline-none text-xs font-semibold text-slate-800 placeholder-slate-400 resize-none transition-all w-full shadow-sm"
                        />
                      </div>
                    </div>

                    <div className={`pt-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <button
                        type="submit"
                        className="py-4.5 px-10 bg-brand-yellow hover:bg-brand-yellow-hover text-white font-extrabold uppercase tracking-widest text-xs rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
                      >
                        <span>{currentLang === 'AR' ? 'إرسال الرسالة +' : 'SUBMIT MESSAGE +'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Modern Floor Sweeper Side Image (Right) */}
              <div className="lg:col-span-6 rounded-[32px] overflow-hidden shadow-md border border-slate-100/80 relative">
                <img src="/images/contact_sweeper.png" alt="Sweeper Machine" className="w-full h-full object-cover min-h-[400px] lg:min-h-full" />
              </div>

            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pb-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-4 md:p-6 shadow-sm overflow-hidden relative group">
              {/* Decorative background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-[0.2] pointer-events-none" />
              
              <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-50/50 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="p-4 bg-slate-100 border border-slate-200 text-brand-orange rounded-full shadow-sm z-10 animate-pulse">
                  <MapPin className="h-8 w-8" />
                </div>
                <div className="z-10 max-w-md">
                  <h4 className="text-lg font-extrabold text-slate-900 tracking-tight font-display">
                    {data.info.mapTitle}
                  </h4>
                  <p className="text-xs text-slate-600 font-semibold mt-2 leading-relaxed">
                    {data.info.address}
                  </p>
                  <p className="text-[10px] text-brand-orange font-bold uppercase tracking-widest mt-4 font-display">
                    {data.info.mapAddress}
                  </p>
                </div>
                {/* Styled map background graphics (mockup) */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-center justify-center">
                  <svg viewBox="0 0 800 400" className="w-full h-full stroke-slate-400 stroke-[2.5] fill-none">
                    <path d="M 0,50 L 800,50 M 0,150 L 800,150 M 0,250 L 800,250 M 0,350 L 800,350" />
                    <path d="M 100,0 L 100,400 M 300,0 L 300,400 M 500,0 L 500,400 M 700,0 L 700,400" />
                    <path d="M 50,0 Q 150,100 250,0 T 450,0 T 650,0" strokeDasharray="5 5" />
                    <circle cx="300" cy="150" r="40" className="fill-brand-orange/20 stroke-brand-orange" />
                    <circle cx="500" cy="250" r="60" className="fill-brand-orange/5" />
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

