import React from 'react';
import { MapPin, Phone, Mail, ArrowUp, Send } from 'lucide-react';
import navigationData from '../data/navigationData.json';

interface FooterProps {
  currentLang: 'EN' | 'AR';
  onPageChange?: (page: 'home' | 'about' | 'services' | 'blog' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onPageChange }) => {
  const langKey = currentLang.toLowerCase() as 'en' | 'ar';
  const data = navigationData[langKey];
  const { footer } = data;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const pageName = href.replace('#/', '') as 'home' | 'about' | 'services' | 'blog' | 'contact';
    if (onPageChange && ['home', 'about', 'services', 'blog', 'contact'].includes(pageName)) {
      e.preventDefault();
      onPageChange(pageName);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'LinkedIn':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
          </svg>
        );
      case 'Twitter / X':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'Instagram':
        return (
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );
      default:
        return null;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isRtl = currentLang === 'AR';

  return (
    <footer className="w-full flex flex-col font-sans select-none overflow-hidden">
      {/* Tier 1: Social Bar (Yellow Background) */}
      <div className="bg-brand-yellow py-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo block */}
          <div className="bg-[#121212] px-4 py-2.5 rounded-lg text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center font-display border border-[#2d2d2d]">
            <span className="text-white tracking-[0.1em]">{data.logo.brandName.toUpperCase()}</span>
          </div>

          {/* Social Links */}
          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {data.socialLinks.map((social: { platform: string; url: string }) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#121212] text-white hover:bg-brand-red flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
                aria-label={social.platform}
              >
                {renderSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tier 2: Info Grid (Deep Red Background) */}
      <div className="bg-brand-red text-slate-100 pt-16 pb-12 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 ${isRtl ? 'text-right' : 'text-left'}`}>
            
            {/* Column 1: Contact Us (4 spans) */}
            <div className="lg:col-span-3.5 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b-2 border-brand-yellow/30 pb-3 font-display">
                {isRtl ? 'اتصل بنا' : 'Contact Us'}
              </h3>
              
              <div className="space-y-4 text-xs font-semibold">
                {/* Location */}
                <div className={`flex items-start gap-3.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 bg-brand-yellow text-slate-900 rounded-full h-8.5 w-8.5 shrink-0 flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-yellow/85 block font-bold">
                      {isRtl ? 'العنوان' : 'Address'}
                    </span>
                    <span className="text-white font-bold leading-relaxed block mt-0.5">
                      {footer.contactInfo.address}
                    </span>
                  </div>
                </div>

                {/* Call Us */}
                <div className={`flex items-start gap-3.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 bg-brand-yellow text-slate-900 rounded-full h-8.5 w-8.5 shrink-0 flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-yellow/85 block font-bold">
                      {isRtl ? 'اتصل بنا' : 'Call Us'}
                    </span>
                    <a href={`tel:${footer.contactInfo.phone}`} className="text-white hover:text-brand-yellow transition-colors font-extrabold block mt-0.5">
                      {footer.contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email Us */}
                <div className={`flex items-start gap-3.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 bg-brand-yellow text-slate-900 rounded-full h-8.5 w-8.5 shrink-0 flex items-center justify-center">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-yellow/85 block font-bold">
                      {isRtl ? 'البريد الإلكتروني' : 'Email Us'}
                    </span>
                    <a href={`mailto:${footer.contactInfo.email}`} className="text-white hover:text-brand-yellow transition-colors font-extrabold block mt-0.5">
                      {footer.contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links (2.5 spans) */}
            <div className="lg:col-span-2.5 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b-2 border-brand-yellow/30 pb-3 font-display">
                {isRtl ? 'روابط سريعة' : 'Quick Links'}
              </h3>
              <ul className="space-y-3.5">
                {footer.sections[0].links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-xs font-extrabold uppercase tracking-widest text-slate-200 hover:text-brand-yellow transition-colors flex items-center group cursor-pointer ${
                        isRtl ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-all duration-200 ${
                        isRtl ? 'ml-2.5' : 'mr-2.5'
                      }`} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Services (3 spans) */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b-2 border-brand-yellow/30 pb-3 font-display">
                {isRtl ? 'خدماتنا' : 'Our Services'}
              </h3>
              <ul className="space-y-3.5">
                {data.servicesDropdown.items.slice(0, 5).map((item: { label: string; href: string }) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`text-xs font-bold text-slate-200 hover:text-brand-yellow transition-colors flex items-center group cursor-pointer ${
                        isRtl ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-all duration-200 ${
                        isRtl ? 'ml-2.5' : 'mr-2.5'
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter & Info (3 spans) */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b-2 border-brand-yellow/30 pb-3 font-display">
                {isRtl ? 'النشرة البريدية' : 'Newsletter'}
              </h3>
              <div className="space-y-5">
                <span className="text-xs text-slate-200 leading-relaxed block font-medium">
                  {isRtl ? 'اشترك في نشرتنا البريدية للحصول على آخر الأخبار.' : 'Subscribe to our newsletter for latest news.'}
                </span>

                {/* Newsletter Form */}
                <form className="relative flex items-center w-full" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder={isRtl ? 'بريدك الإلكتروني' : 'Enter Mail'}
                    className={`w-full px-4 py-3 bg-white text-slate-800 rounded-full focus:outline-none text-xs font-semibold placeholder-slate-400 ${
                      isRtl ? 'pl-12 text-right' : 'pr-12 text-left'
                    }`}
                  />
                  <button
                    type="submit"
                    className={`absolute p-2 bg-brand-red text-white hover:bg-brand-red-dark rounded-full transition-colors cursor-pointer ${
                      isRtl ? 'left-1' : 'right-1'
                    }`}
                    aria-label="Send"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Working Hours */}
                <div className="pt-2">
                  <span className="text-[10px] font-black uppercase text-brand-yellow tracking-widest block mb-1">
                    {isRtl ? 'ساعات العمل:' : 'Working Hours:'}
                  </span>
                  <span className="text-xs text-slate-200 font-bold block">
                    {isRtl ? 'السبت إلى الخميس: ٨ صباحًا - ٥ مساءً' : 'Saturday to Thursday: 8AM - 5PM'}
                  </span>
                  <span className="text-xs text-slate-200 font-bold block">
                    {isRtl ? 'الجمعة عطلة' : 'Friday is Closed'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tier 3: Bottom Copyright (Deep Dark Red) */}
      <div className="bg-[#7F1D1D] py-6 text-slate-300 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/80 font-bold uppercase tracking-wider">
            &copy; {new Date().getFullYear()} {footer.copyright}
          </span>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/90 hover:text-brand-yellow transition-colors group cursor-pointer ${
              isRtl ? 'flex-row-reverse' : ''
            }`}
          >
            <span>{footer.backToTop}</span>
            <div className="p-2 bg-white/5 border border-white/10 rounded-full group-hover:bg-brand-yellow group-hover:text-slate-900 transition-all duration-300 shadow-md">
              <ArrowUp className="h-4 w-4 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
