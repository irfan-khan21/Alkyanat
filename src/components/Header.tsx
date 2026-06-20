import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import navigationData from '../data/navigationData.json';

interface HeaderProps {
  currentLang: 'EN' | 'AR';
  onLangChange: (lang: 'EN' | 'AR') => void;
  activePage?: 'home' | 'about' | 'services' | 'blog' | 'contact';
  onPageChange?: (page: 'home' | 'about' | 'services' | 'blog' | 'contact') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onLangChange, activePage = 'home', onPageChange }) => {
  const langKey = currentLang.toLowerCase() as 'en' | 'ar';
  const data = navigationData[langKey];
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    setIsOpen(false);
    setIsServicesOpen(false);
    const pageName = href.replace('#/', '').split('?')[0] as 'home' | 'about' | 'services' | 'blog' | 'contact';
    
    if (onPageChange && ['home', 'about', 'services', 'blog', 'contact'].includes(pageName)) {
      e.preventDefault();
      onPageChange(pageName);
    }
  };

  const isRtl = currentLang === 'AR';

  return (
    <div className="fixed top-0 w-full z-50 flex flex-col">
      {/* Top Bar (Deep Red) */}
      <div className={`bg-brand-red text-white text-[11px] border-b border-white/10 hidden lg:block select-none font-sans font-medium transition-all duration-300 ${
        isScrolled ? 'max-h-0 py-0 opacity-0 overflow-hidden border-b-0' : 'max-h-12 py-2.5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className={`flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <a href={`tel:${data.footer.contactInfo.phone}`} className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors">
              <Phone className="h-3.5 w-3.5 text-brand-yellow" />
              <span>{data.footer.contactInfo.phone}</span>
            </a>
            <a href={`mailto:${data.footer.contactInfo.email}`} className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors">
              <Mail className="h-3.5 w-3.5 text-brand-yellow" />
              <span>{data.footer.contactInfo.email}</span>
            </a>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand-yellow" />
              <span>{isRtl ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, KSA'}</span>
            </div>
          </div>
          <div className={`flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="text-white/60">{isRtl ? 'تابعنا:' : 'Follow Us:'}</span>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors font-bold">FB</a>
              <span className="text-white/20">|</span>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors font-bold">TW</a>
              <span className="text-white/20">|</span>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors font-bold">LN</a>
            </div>
            <span className="text-white/20">|</span>
            <button 
              onClick={() => onLangChange(currentLang === 'EN' ? 'AR' : 'EN')}
              className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors cursor-pointer font-bold"
            >
              <Globe className="h-3.5 w-3.5 text-brand-yellow" />
              <span>{currentLang === 'EN' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar (White background, shadow, gold action button) */}
      <header className={`w-full bg-white border-b border-slate-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.07)] transition-all duration-300 ${
        isScrolled ? 'py-2.5' : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center justify-between h-16 ${isRtl ? 'flex-row-reverse' : ''}`}>
            
            {/* Logo Group (Black block logo style) */}
            <a
              href="#/home"
              onClick={(e) => handleLinkClick(e, '#/home')}
              className="flex items-center group relative z-50"
            >
              <div className="bg-[#121212] hover:bg-brand-red px-5 py-2.5 rounded-lg text-white font-extrabold text-base tracking-wider transition-all duration-300 shadow-md flex items-center justify-center font-display border border-[#2d2d2d]">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-black leading-none text-white tracking-[0.1em]">{data.logo.brandName.toUpperCase()}</span>
                  <span className="text-[7px] text-brand-yellow font-bold uppercase tracking-[0.2em] mt-1">{data.logo.subtitle}</span>
                </div>
              </div>
            </a>
     
            {/* Desktop Navigation Links */}
            <nav className={`hidden md:flex items-center gap-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {data.headerLinks.map((link) => {
                const pageName = link.href.replace('#/', '') as 'home' | 'about' | 'services' | 'blog' | 'contact';
                const isActive = activePage === pageName;

                if (pageName === 'services') {
                  return (
                    <div 
                      key={link.label}
                      className="relative group py-2"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <button
                        onClick={(e) => handleLinkClick(e, '#/services')}
                        className={`text-[13px] font-extrabold tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer font-display ${
                          isActive 
                            ? 'text-brand-red font-black' 
                            : 'text-slate-800 hover:text-brand-red'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                      </button>

                      {/* Services Dropdown */}
                      <div className={`absolute left-1/2 -translate-x-1/2 top-full w-80 bg-white border border-slate-100 rounded-2xl p-5 shadow-2xl transition-all duration-300 origin-top ${
                        isServicesOpen 
                          ? 'opacity-100 visible scale-100 translate-y-2' 
                          : 'opacity-0 invisible scale-95 translate-y-0 pointer-events-none'
                      }`}>
                        <h4 className={`text-[9px] font-black text-brand-red uppercase tracking-widest border-b border-slate-100 pb-2.5 mb-2.5 ${
                          isRtl ? 'text-right' : 'text-left'
                        }`}>
                          {data.servicesDropdown.title}
                        </h4>
                        <div className="flex flex-col gap-1">
                          {data.servicesDropdown.items.map((item: { label: string; href: string }) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={(e) => handleLinkClick(e, item.href)}
                              className={`text-[11px] font-bold text-slate-700 hover:text-brand-red py-2 px-3 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-between ${
                                isRtl ? 'flex-row-reverse text-right' : 'text-left'
                              }`}
                            >
                              <span>{item.label}</span>
                              <ChevronRight className={`h-3 w-3 text-slate-400 group-hover:text-brand-red ${isRtl ? 'rotate-180' : ''}`} />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
    
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-[13px] font-extrabold tracking-wider uppercase transition-all relative py-2 font-display ${
                      isActive 
                        ? 'text-brand-red font-black' 
                        : 'text-slate-800 hover:text-brand-red'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
      
            {/* Action Button & Mobile / Language */}
            <div className={`hidden md:flex items-center gap-4.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {/* Language Switcher (Tablet only, as desktop has it in top bar) */}
              <button
                onClick={() => onLangChange(currentLang === 'EN' ? 'AR' : 'EN')}
                className="flex lg:hidden items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-full hover:border-brand-red text-xs font-bold text-slate-800 cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5 text-brand-red" />
                <span>{data.langSwitcher}</span>
              </button>
    
              {/* Quote CTA Button (Yellow, bold) */}
              <button
                onClick={(e) => handleLinkClick(e, '#/contact')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-full text-slate-900 bg-brand-yellow hover:bg-brand-yellow-hover transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-yellow/15 cursor-pointer font-display"
              >
                <span>{data.ctaBtn}</span>
              </button>
            </div>
     
            {/* Mobile menu toggle */}
            <div className={`md:hidden flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => onLangChange(currentLang === 'EN' ? 'AR' : 'EN')}
                className="p-2.5 border border-slate-200 rounded-full flex items-center cursor-pointer text-slate-700 hover:text-brand-red hover:border-brand-red"
              >
                <Globe className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 border border-slate-200 rounded-full flex items-center focus:outline-none cursor-pointer text-slate-700 hover:text-brand-red hover:border-brand-red"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
    
          </div>
        </div>
    
        {/* Mobile Drawer */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-white transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
          }`}
          style={{ top: '64px' }}
        >
          <div className="flex flex-col h-[calc(100vh-64px)] justify-between pb-16 pt-8 px-6 bg-white border-t border-slate-100 overflow-y-auto">
            <nav className="flex flex-col space-y-6">
              {data.headerLinks.map((link) => {
                const pageName = link.href.replace('#/', '') as 'home' | 'about' | 'services' | 'blog' | 'contact';
                const isActive = activePage === pageName;
                
                if (pageName === 'services') {
                  return (
                    <div key={link.label} className="flex flex-col">
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={`text-lg font-extrabold uppercase tracking-wide transition-all duration-200 border-b border-slate-100 pb-3.5 flex items-center justify-between cursor-pointer font-display ${
                          isActive ? 'text-brand-red font-black' : 'text-slate-800 hover:text-brand-red'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-brand-red' : 'text-slate-400'}`} />
                      </button>
                      
                      <div className={`flex flex-col pl-4 pr-4 gap-3.5 overflow-hidden transition-all duration-300 ${
                        isServicesOpen ? 'max-h-80 mt-4 pb-3' : 'max-h-0'
                      }`}>
                        <a
                          href="#/services"
                          onClick={(e) => handleLinkClick(e, '#/services')}
                          className={`text-xs font-black uppercase tracking-wider text-brand-red hover:text-brand-red py-1.5 ${
                            isRtl ? 'text-right' : 'text-left'
                          }`}
                        >
                          {currentLang === 'AR' ? 'عرض جميع الخدمات' : 'View All Services'}
                        </a>
                        {data.servicesDropdown.items.map((item: { label: string; href: string }) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className={`text-xs font-semibold text-slate-500 hover:text-brand-red transition-all flex items-center justify-between py-1 ${
                              isRtl ? 'text-right' : 'text-left'
                            }`}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                }
  
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-lg font-extrabold uppercase tracking-wide transition-all duration-200 border-b border-slate-100 pb-3.5 font-display ${
                      isActive ? 'text-brand-red font-black' : 'text-slate-800 hover:text-brand-red'
                    } ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
    
            <button
              onClick={(e) => handleLinkClick(e, '#/contact')}
              className="block w-full text-center py-4 px-6 text-xs font-black uppercase tracking-widest rounded-full text-slate-900 bg-brand-yellow hover:bg-brand-yellow-hover shadow-lg transition-all duration-300 cursor-pointer font-display"
            >
              {data.ctaBtn}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
