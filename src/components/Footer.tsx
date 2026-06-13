import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';
import translationData from '../data/translationData.json';

interface FooterProps {
  currentLang: 'EN' | 'AR';
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const langKey = currentLang.toLowerCase() as 'en' | 'ar';
  const { footerSections, contactInfo, socialLinks, copyright, backToTop } = translationData[langKey].navigation;

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
          </svg>
        );
      case 'Twitter':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'Instagram':
        return (
          <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
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
    <footer className="bg-zinc-950 border-t border-indigo-950/40 pt-20 pb-10 text-zinc-400 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-[250px] h-[250px] bg-amber-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-indigo-950/40 ${isRtl ? 'text-right' : ''}`}>
          
          {/* Brand Info & Summary */}
          <div className="space-y-6">
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <img
                src="/assets/logo.png"
                alt="Al Kayanat Logo"
                className="h-10 w-10 object-contain rounded-xl border border-indigo-950"
              />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold tracking-wider text-white uppercase font-sans leading-none pb-1">
                  {currentLang === 'AR' ? 'الكيانات' : 'Al Kayanat'}
                </span>
                <span className="text-[9px] tracking-[0.25em] text-amber-500 uppercase font-semibold leading-none">
                  {currentLang === 'AR' ? 'مجموعة قابضة' : 'Holding Group'}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500">
              {currentLang === 'AR' 
                ? 'مجموعة الكيانات هي تكتل صناعي سعودي رائد متخصص في توفير المركبات والمعدات الثقيلة، وآليات مشاريع البناء والتشييد الحكومية والخاصة، وتجهيز أساطيل النظافة وصيانة الطرق والحدائق.'
                : 'Al Kayanat Group is a premier Saudi conglomerate specializing in heavy-duty vehicles, construction equipment, heavy machinery for governmental and private sectors, and urban road/garden maintenance fleets.'}
            </p>
            {/* Social Hub */}
            <div className={`flex space-x-3 pt-2 ${isRtl ? 'justify-end space-x-reverse' : ''}`}>
              {socialLinks.map((social: { platform: string; url: string; iconName: string }) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900/60 hover:bg-amber-500 hover:text-zinc-950 text-zinc-400 transition-all duration-300 border border-indigo-950 hover:border-amber-400 hover:scale-110 shadow-sm cursor-pointer"
                  aria-label={social.platform}
                >
                  {renderSocialIcon(social.iconName)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links / Portfolios */}
          {footerSections.map((section) => (
            <div key={section.title} className={`${isRtl ? 'lg:pr-8' : 'lg:pl-8'}`}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6 font-sans">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-amber-400 transition-colors duration-250 flex items-center group font-sans"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors duration-250 ${isRtl ? 'ml-2.5 mr-0' : 'mr-2.5'}`} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Headquarters / Operations Desk */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6 font-sans">
              {currentLang === 'AR' ? 'المقر الرئيسي' : 'Headquarters'}
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPin className={`h-5 w-5 text-amber-500 shrink-0 mt-0.5 ${isRtl ? 'ml-3 mr-0' : 'mr-3'}`} />
                <span className="text-sm leading-relaxed text-zinc-400 font-sans">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className={`h-5 w-5 text-amber-500 shrink-0 ${isRtl ? 'ml-3 mr-0' : 'mr-3'}`} />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm hover:text-white transition-colors duration-250 font-medium font-sans"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className={`h-5 w-5 text-amber-500 shrink-0 ${isRtl ? 'ml-3 mr-0' : 'mr-3'}`} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm hover:text-white transition-colors duration-250 font-medium font-sans"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <Clock className={`h-5 w-5 text-amber-500 shrink-0 mt-0.5 ${isRtl ? 'ml-3 mr-0' : 'mr-3'}`} />
                <span className="text-sm text-zinc-500 leading-relaxed font-sans">
                  {contactInfo.hours}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to top */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between border-t border-indigo-950/40 mt-12 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
          <p className="text-xs text-zinc-600 text-center sm:text-left mb-4 sm:mb-0 font-sans">
            &copy; {new Date().getFullYear()} {copyright}
          </p>
          <button
            onClick={scrollToTop}
            className={`flex items-center space-x-2 text-xs font-semibold text-zinc-500 hover:text-amber-400 transition-colors uppercase tracking-wider group focus:outline-none cursor-pointer ${isRtl ? 'space-x-reverse' : ''}`}
          >
            <span>{backToTop}</span>
            <div className="p-2 bg-zinc-900 border border-indigo-950 rounded-lg group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors duration-300">
              <ArrowUp className="h-4 w-4" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};
