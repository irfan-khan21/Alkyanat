import React from 'react';
import { MapPin, Phone, Mail, Clock, Landmark, ArrowUp } from 'lucide-react';
import { homeData } from '../data/homeData';

export const Footer: React.FC = () => {
  const { footer } = homeData;

  const getSocialIcon = (iconName: string) => {
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

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Landmark className="h-6 w-6 text-zinc-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider text-white uppercase">
                  Al Kayanat
                </span>
                <span className="text-[9px] tracking-[0.25em] text-amber-500 uppercase font-medium">
                  Holding Group
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 pt-2">
              {footer.aboutText}
            </p>
            <div className="flex space-x-4 pt-2">
              {footer.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-amber-500 hover:text-zinc-950 text-zinc-400 transition-all duration-300 border border-zinc-800 hover:border-amber-400"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Our Portfolios
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#entities" className="text-sm hover:text-amber-500 transition-colors">
                  Heavy Machinery Rental
                </a>
              </li>
              <li>
                <a href="#entities" className="text-sm hover:text-amber-500 transition-colors">
                  Smart Logistics & Haulage
                </a>
              </li>
              <li>
                <a href="#entities" className="text-sm hover:text-amber-500 transition-colors">
                  Real Estate Development
                </a>
              </li>
              <li>
                <a href="#entities" className="text-sm hover:text-amber-500 transition-colors">
                  Venture Capital & Tech
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Headquarters & Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed text-zinc-400">
                    {footer.contactInfo.address}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                  <a href={`tel:${footer.contactInfo.phone}`} className="text-sm hover:text-white transition-colors">
                    {footer.contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-amber-500 shrink-0" />
                  <a href={`mailto:${footer.contactInfo.email}`} className="text-sm hover:text-white transition-colors">
                    {footer.contactInfo.email}
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed text-zinc-500">
                    {footer.contactInfo.hours}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-zinc-900 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-zinc-600 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Al Kayanat Holding Group. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-xs font-semibold text-zinc-500 hover:text-amber-500 transition-colors uppercase tracking-wider group focus:outline-none"
          >
            <span>Back to top</span>
            <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
              <ArrowUp className="h-3 w-3" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
