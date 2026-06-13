import React, { useState, useEffect } from 'react';
import { Menu, X, Palmtree, Globe, ArrowRight } from 'lucide-react';
import navigationData from '../data/navigationData.json';

export const Header: React.FC = () => {
  const { logo, headerLinks } = navigationData;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  // Handle scroll trigger for sticky background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile scroll locking
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'EN' ? 'AR' : 'EN'));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)] py-4'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Group */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center space-x-3 group relative z-50"
          >
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] group-hover:scale-105 transition-all duration-300 border border-emerald-300/10">
              <Palmtree className="h-6 w-6 text-zinc-950 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-white uppercase font-sans leading-none pb-1 group-hover:text-emerald-400 transition-colors duration-300">
                {logo.brandName}
              </span>
              <span className="text-[9px] tracking-[0.25em] text-emerald-500 uppercase font-semibold leading-none">
                {logo.subtitle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {headerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-zinc-300 hover:text-emerald-400 transition-colors duration-300 relative py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions Desk (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center space-x-1.5 px-3 py-1.5 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all text-xs font-semibold cursor-pointer"
              title="Switch Language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{lang}</span>
            </button>

            {/* CTA button */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-zinc-950 bg-gradient-to-r from-emerald-400 to-green-600 hover:from-emerald-300 hover:to-green-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Inquire Now</span>
              <ArrowRight className="ml-1.5 h-4 w-4 stroke-[2.2]" />
            </a>
          </div>

          {/* Mobile Menu Action Icon */}
          <div className="md:hidden flex items-center space-x-3 z-50">
            {/* Mobile Lang Button */}
            <button
              onClick={toggleLang}
              className="p-2 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all text-xs font-semibold flex items-center"
            >
              <Globe className="h-4 w-4" />
              <span className="ml-1">{lang}</span>
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-xl transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-x-0 visible' : 'opacity-0 translate-x-full invisible'
        }`}
      >
        <div className="flex flex-col h-full justify-between pt-28 pb-12 px-6">
          <nav className="flex flex-col space-y-6">
            {headerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-2xl font-bold tracking-wide text-zinc-300 hover:text-emerald-400 transition-all duration-200 border-b border-zinc-900 pb-3"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="space-y-4">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="block w-full text-center px-6 py-4 border border-transparent text-base font-semibold rounded-xl text-zinc-950 bg-gradient-to-r from-emerald-400 to-green-600 hover:from-emerald-300 hover:to-green-500 transition-all duration-300"
            >
              Inquire Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
