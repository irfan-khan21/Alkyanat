import React from 'react';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
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
    <footer className="bg-brand-bg-lighter border-t border-zinc-200/60 pt-12 pb-8 text-zinc-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Tier 1: Directory Columns */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 ${isRtl ? 'text-right' : 'text-left'}`}>
          
          {/* Section 1: Logo & Info */}
          <div className="space-y-6">
            <div className={`flex items-center gap-3.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="p-1.5 bg-white border border-zinc-200 rounded-xl shadow-sm">
                <svg viewBox="0 0 100 100" className="w-9 h-9">
                  {/* Top Diamond (Blue) */}
                  <path d="M 50,12 L 66,28 L 50,44 L 34,28 Z" fill="#5777FF" />
                  {/* Left Diamond (Dark Navy) */}
                  <path d="M 32,30 L 48,46 L 32,62 L 16,46 Z" fill="#152A40" />
                  {/* Right Diamond (Dark Navy) */}
                  <path d="M 68,30 L 84,46 L 68,62 L 52,46 Z" fill="#152A40" />
                  {/* Bottom Diamond (Blue) */}
                  <path d="M 50,48 L 66,64 L 50,80 L 34,64 Z" fill="#5777FF" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-wider text-brand-navy uppercase font-sans pb-0.5">
                  {data.logo.brandName}
                </span>
                <span className="text-[8px] tracking-[0.25em] text-brand-blue font-black uppercase">
                  {data.logo.subtitle}
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500 font-medium">
              {footer.aboutText}
            </p>
            <div className={`flex gap-3 pt-2 ${isRtl ? 'justify-end' : ''}`}>
              {data.socialLinks.map((social: { platform: string; url: string }) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white border border-zinc-200 text-zinc-650 hover:text-white hover:bg-brand-blue hover:border-brand-blue hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm"
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
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-brand-blue transition-colors duration-250 flex items-center group cursor-pointer"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full bg-zinc-300 group-hover:bg-brand-blue transition-all duration-250 ${isRtl ? 'ml-2.5' : 'mr-2.5'}`} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Section 3: Headquarters & Contacts */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy mb-2">
              {footer.contactInfo.title}
            </h3>
            
            {/* Address Card */}
            <div className="flex gap-3.5 p-3 bg-white border border-zinc-200/80 rounded-xl hover:border-brand-blue transition-all duration-300 shadow-sm">
              <div className="p-2 bg-brand-bg-light text-brand-blue rounded-lg h-9 w-9 shrink-0 flex items-center justify-center">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-zinc-400">
                  {currentLang === 'AR' ? 'العنوان' : 'Location'}
                </span>
                <span className="text-xs text-brand-navy font-bold mt-0.5 leading-normal">
                  {footer.contactInfo.address}
                </span>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex gap-3.5 p-3 bg-white border border-zinc-200/80 rounded-xl hover:border-brand-blue transition-all duration-300 shadow-sm">
              <div className="p-2 bg-brand-bg-light text-brand-blue rounded-lg h-9 w-9 shrink-0 flex items-center justify-center">
                <Phone className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-zinc-400">
                  {currentLang === 'AR' ? 'رقم الاتصال' : 'Operations Desk'}
                </span>
                <a
                  href={`tel:${footer.contactInfo.phone}`}
                  className="text-xs text-brand-navy font-extrabold hover:text-brand-blue mt-0.5 transition-colors"
                >
                  {footer.contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="flex gap-3.5 p-3 bg-white border border-zinc-200/80 rounded-xl hover:border-brand-blue transition-all duration-300 shadow-sm">
              <div className="p-2 bg-brand-bg-light text-brand-blue rounded-lg h-9 w-9 shrink-0 flex items-center justify-center">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-zinc-400">
                  {currentLang === 'AR' ? 'البريد الإلكتروني' : 'Official Inquiry'}
                </span>
                <a
                  href={`mailto:${footer.contactInfo.email}`}
                  className="text-xs text-brand-navy font-extrabold hover:text-brand-blue mt-0.5 transition-colors"
                >
                  {footer.contactInfo.email}
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Tier 2: Bottom Compliance bar */}
        <div className={`pt-6 border-t border-zinc-200/60 flex flex-col md:flex-row items-center justify-between gap-4 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
            &copy; {new Date().getFullYear()} {footer.copyright}
          </span>

          {/* Vision 2030 Badge */}
          <div className="flex items-center gap-2.5 py-1.5 px-4 bg-white border border-zinc-200 rounded-full shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-[9px] font-black tracking-widest text-zinc-500 uppercase">
              {currentLang === 'AR' ? 'متوافق مع رؤية المملكة ٢٠٣٠' : 'Vision 2030 Aligned'}
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-brand-blue transition-colors group cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <span>{footer.backToTop}</span>
            <div className="p-2.5 bg-white border border-zinc-200 rounded-xl group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-sm">
              <ArrowUp className="h-4.5 w-4.5 stroke-[2.5]" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};
