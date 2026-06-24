import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import navigationData from '../data/navigationData.json';

interface FooterProps {
  currentLang: 'EN' | 'AR';
  onPageChange?: (page: 'home' | 'about' | 'services' | 'blog' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onPageChange }) => {
  const langKey = currentLang.toLowerCase() as 'en' | 'ar';
  const data = navigationData[langKey];
  const { footer } = data;
  const isRtl = currentLang === 'AR';

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
          <svg fill="currentColor" viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
          </svg>
        );
      case 'Twitter / X':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'Instagram':
        return (
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );
      case 'Facebook':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="w-full flex flex-col font-sans select-none overflow-hidden relative bg-[#7F1D1D] -mt-1">
      
      {/* Main Footer (Deep Red Background with faint industrial watermark) */}
      <div className="bg-brand-red text-slate-100 pt-16 pb-12 relative overflow-hidden">
        {/* Faint industrial background overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.12] mix-blend-overlay pointer-events-none">
          <img src="/images/contact_banner.png" alt="Footer BG" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
          
          {/* Social Capsule Header (Completely Inside with Red above it) */}
          <div className="bg-brand-yellow rounded-[24px] md:rounded-full px-8 py-5 shadow-lg border border-brand-yellow/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo block */}
            <div className="bg-[#121212] px-5 py-3 rounded-lg text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center font-display border border-[#2d2d2d] shadow-sm select-none">
              <span className="text-white tracking-[0.1em]">{data.logo.brandName.toUpperCase()}</span>
            </div>

            {/* Social Links in Dark Blue outline circles */}
            <div className={`flex items-center gap-3.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-[#1E293B] text-[#1E293B] hover:bg-[#1E293B] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hover:scale-110"
                aria-label="Facebook"
              >
                {renderSocialIcon('Facebook')}
              </a>
              {/* Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-[#1E293B] text-[#1E293B] hover:bg-[#1E293B] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hover:scale-110"
                aria-label="Twitter"
              >
                {renderSocialIcon('Twitter / X')}
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-[#1E293B] text-[#1E293B] hover:bg-[#1E293B] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hover:scale-110"
                aria-label="LinkedIn"
              >
                {renderSocialIcon('LinkedIn')}
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-[#1E293B] text-[#1E293B] hover:bg-[#1E293B] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hover:scale-110"
                aria-label="Instagram"
              >
                {renderSocialIcon('Instagram')}
              </a>
            </div>
          </div>

          {/* Spacer border line */}
          <div className="border-t border-white/10 hidden md:block"></div>

          {/* Grid Columns */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 ${isRtl ? 'text-right' : 'text-left'}`}>
            
            {/* Column 1: Contact Us (4 spans) */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b-2 border-brand-yellow/30 pb-3 font-display">
                {isRtl ? 'اتصل بنا' : 'Contact Us'}
              </h3>
              
              <div className="space-y-4 text-xs font-semibold">
                {/* Location */}
                <div className={`flex items-start gap-3.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 border border-brand-yellow/45 text-brand-yellow rounded-full h-9 w-9 shrink-0 flex items-center justify-center">
                    <MapPin className="h-4.5 w-4.5" />
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
                  <div className="p-2 border border-brand-yellow/45 text-brand-yellow rounded-full h-9 w-9 shrink-0 flex items-center justify-center">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-yellow/85 block font-bold">
                      {isRtl ? 'اتصل بنا' : 'Call Us'}
                    </span>
                    <div className="flex flex-col mt-0.5">
                      <a href={`tel:${footer.contactInfo.phone}`} className="text-white hover:text-brand-yellow transition-colors font-extrabold leading-tight">
                        {footer.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Us */}
                <div className={`flex items-start gap-3.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-2 border border-brand-yellow/45 text-brand-yellow rounded-full h-9 w-9 shrink-0 flex items-center justify-center">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-yellow/85 block font-bold">
                      {isRtl ? 'البريد الإلكتروني' : 'Email Us'}
                    </span>
                    <div className="flex flex-col mt-0.5">
                      <a href={`mailto:${footer.contactInfo.email}`} className="text-white hover:text-brand-yellow transition-colors font-extrabold leading-tight">
                        {footer.contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links (2 spans) */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b-2 border-brand-yellow/30 pb-3 font-display">
                {isRtl ? 'روابط سريعة' : 'Quick Links'}
              </h3>
              <ul className="space-y-3.5">
                {footer.sections[0].links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-xs font-extrabold uppercase tracking-widest text-slate-200 hover:text-brand-yellow transition-colors flex items-center gap-1.5 group cursor-pointer ${
                        isRtl ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span className="text-brand-yellow font-black">&#x2197;</span>
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
                      className={`text-xs font-bold text-slate-200 hover:text-brand-yellow transition-colors flex items-center gap-1.5 group cursor-pointer ${
                        isRtl ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span className="text-brand-yellow font-black">&#x2197;</span>
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Working Hours & Support (3 spans) */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b-2 border-brand-yellow/30 pb-3 font-display">
                {isRtl ? 'ساعات العمل والدعم' : 'Working Hours & Support'}
              </h3>
              
              <div className="space-y-5">
                {/* Working Hours */}
                <div className="pt-2">
                  <span className="text-[10px] font-black uppercase text-brand-yellow tracking-widest block mb-1">
                    {isRtl ? 'ساعات العمل:' : 'Working Hours:'}
                  </span>
                  <div className={`flex items-start gap-2 text-xs text-slate-200 font-bold ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-brand-yellow">&#9679;</span>
                    <div className="flex flex-col">
                      <span>{isRtl ? 'السبت إلى الخميس: ٩ صباحًا - ٥ مساءً' : 'Saturday to Thursday: 9AM - 5PM'}</span>
                      <span>{isRtl ? 'الجمعة عطلة' : 'Friday is Closed'}</span>
                    </div>
                  </div>
                </div>

                {/* Urgent Query call and email */}
                <div className="space-y-3 pt-4 border-t border-white/10 text-slate-200">
                  <div>
                    <span className="text-[10px] font-black uppercase text-brand-yellow tracking-widest block">
                      {isRtl ? 'للاستفسارات العاجلة اتصل بنا:' : 'urgent query pls call'}
                    </span>
                    <span className="text-xs text-white/95 font-bold block mt-0.5 leading-snug">
                      mobile/WhatsApp: <a href="tel:+966557062353" className="hover:underline">+966 55 706 2353</a>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-brand-yellow tracking-widest block">
                      {isRtl ? 'للاستفسارات العاجلة راسلنا:' : 'urgent query pls email'}
                    </span>
                    <span className="text-[11px] text-white/95 font-bold block mt-0.5 leading-snug">
                      email: <a href="mailto:info@alkyanat-almushtarika.com" className="hover:underline">info@alkyanat-almushtarika.com</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Wave Cutout Decoration */}
      <div className="w-full overflow-hidden leading-none z-10 bg-brand-red -mt-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] text-brand-yellow fill-current">
          <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,0 L1200,120 L0,120 Z" transform="rotate(180 600 60)"></path>
        </svg>
      </div>

      {/* Tier 3: Bottom Copyright (Deep Dark Red) */}
      <div className="bg-[#7F1D1D] py-6 text-slate-300">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs text-white/80 font-bold uppercase tracking-widest">
            Copyright &copy; {new Date().getFullYear()} {data.logo.brandName} Clean. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
