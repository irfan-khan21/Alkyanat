import React from 'react';
import { MapPin, Phone, Mail, ArrowUp, MessageCircle } from 'lucide-react';
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
    <footer className="bg-brand-navy-dark border-t border-white/[0.06] pt-16 pb-10 text-slate-400 relative overflow-hidden">
      {/* Dynamic Background subtle glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Tier 1: Directory Columns */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12 ${isRtl ? 'text-right' : 'text-left'}`}>
          
          {/* Section 1: Logo & Info */}
          <div className="space-y-6">
            <div className={`flex items-center gap-3.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="p-1.5 bg-white/[0.02] border border-white/[0.08] rounded-xl shadow-lg">
                <svg viewBox="0 0 100 100" className="w-9 h-9">
                  {/* Top Diamond (Neon Orange) */}
                  <path d="M 50,12 L 66,28 L 50,44 L 34,28 Z" fill="#FF6B00" />
                  {/* Left Diamond (Amber) */}
                  <path d="M 32,30 L 48,46 L 32,62 L 16,46 Z" fill="#F59E0B" />
                  {/* Right Diamond (Amber) */}
                  <path d="M 68,30 L 84,46 L 68,62 L 52,46 Z" fill="#F59E0B" />
                  {/* Bottom Diamond (Neon Orange) */}
                  <path d="M 50,48 L 66,64 L 50,80 L 34,64 Z" fill="#FF6B00" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-wider text-white uppercase font-display pb-0.5">
                  {data.logo.brandName}
                </span>
                <span className="text-[8px] tracking-[0.25em] text-brand-orange font-black uppercase">
                  {data.logo.subtitle}
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 font-medium max-w-sm">
              {footer.aboutText}
            </p>
            <div className={`flex gap-3 pt-2 ${isRtl ? 'justify-end' : ''}`}>
              {data.socialLinks.map((social: { platform: string; url: string }) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-brand-orange hover:border-brand-orange hover:scale-105 transition-all duration-300 cursor-pointer shadow-md"
                  aria-label={social.platform}
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Quick Links */}
          {footer.sections.map((section: { title: string; links: { label: string; href: string }[] }) => (
            <div key={section.title} className={`${isRtl ? 'lg:pr-12' : 'lg:pl-12'}`}>
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-5 font-display">
                {section.title}
              </h3>
              <ul className="space-y-3.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-colors duration-200 flex items-center group cursor-pointer"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-brand-orange transition-all duration-200 ${isRtl ? 'ml-2.5' : 'mr-2.5'}`} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Section 3: Headquarters & Contacts */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-3 font-display">
              {footer.contactInfo.title}
            </h3>
            
            {/* Address Card */}
            <div className="flex gap-3.5 p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-brand-orange/30 transition-all duration-300 shadow-sm group">
              <div className="p-2 bg-brand-bg-light text-brand-orange rounded-xl h-9 w-9 shrink-0 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                <MapPin className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500">
                  {currentLang === 'AR' ? 'العنوان' : 'Location'}
                </span>
                <span className="text-xs text-white font-bold mt-0.5 leading-normal">
                  {footer.contactInfo.address}
                </span>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex gap-3.5 p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-brand-orange/30 transition-all duration-300 shadow-sm group">
              <div className="p-2 bg-brand-bg-light text-brand-orange rounded-xl h-9 w-9 shrink-0 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                <Phone className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500">
                  {currentLang === 'AR' ? 'رقم الاتصال' : 'Operations Desk'}
                </span>
                <a
                  href={`tel:${footer.contactInfo.phone}`}
                  className="text-xs text-white font-extrabold hover:text-brand-orange mt-0.5 transition-colors"
                >
                  {footer.contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="flex gap-3.5 p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-brand-orange/30 transition-all duration-300 shadow-sm group">
              <div className="p-2 bg-brand-bg-light text-brand-orange rounded-xl h-9 w-9 shrink-0 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                <Mail className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500">
                  {currentLang === 'AR' ? 'البريد الإلكتروني' : 'Official Inquiry'}
                </span>
                <a
                  href={`mailto:${footer.contactInfo.email}`}
                  className="text-xs text-white font-extrabold hover:text-brand-orange mt-0.5 transition-colors"
                >
                  {footer.contactInfo.email}
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="flex gap-3.5 p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-emerald-500/50 transition-all duration-300 shadow-sm group">
              <div className="p-2 bg-emerald-950 text-emerald-400 rounded-xl h-9 w-9 shrink-0 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <MessageCircle className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500">
                  {currentLang === 'AR' ? 'واتساب' : 'WhatsApp Support'}
                </span>
                <a
                  href="https://wa.me/966557062353"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white font-extrabold hover:text-emerald-400 mt-0.5 transition-colors"
                >
                  {currentLang === 'AR' ? 'تواصل معنا مباشرة' : 'Chat with Operations'}
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Tier 2: Bottom Compliance bar */}
        <div className={`pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider font-display">
            &copy; {new Date().getFullYear()} {footer.copyright}
          </span>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-colors group cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <span>{footer.backToTop}</span>
            <div className="p-2 bg-white/[0.02] border border-white/[0.08] rounded-xl group-hover:bg-brand-orange group-hover:text-white transition-all duration-350 shadow-md">
              <ArrowUp className="h-4.5 w-4.5 stroke-[2.5]" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};
