import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface ServicesProps {
  currentLang: 'EN' | 'AR';
  onLangChange: (lang: 'EN' | 'AR') => void;
  onPageChange: (page: 'home' | 'about' | 'services' | 'blog' | 'contact') => void;
}

export const Services: React.FC<ServicesProps> = ({ currentLang, onLangChange, onPageChange }) => {
  const isRtl = currentLang === 'AR';

  return (
    <div className={`min-h-screen bg-[#0b132b] text-zinc-300 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="services" onPageChange={onPageChange} />

      {/* Main Content (Blank Placeholder) */}
      <main className="flex-grow flex items-center justify-center pt-36 pb-20 relative">
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          {currentLang === 'AR' ? 'الخدمات' : 'Services'}
        </h1>
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} onPageChange={onPageChange} />
    </div>
  );
};

export default Services;
