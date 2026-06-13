import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface HomeProps {
  currentLang: 'EN' | 'AR';
  onLangChange: (lang: 'EN' | 'AR') => void;
}

export const Home: React.FC<HomeProps> = ({ currentLang, onLangChange }) => {
  const isRtl = currentLang === 'AR';

  return (
    <div className={`min-h-screen bg-zinc-950 text-white flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} />

      {/* Main Content Area (Clean Slate) */}
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 relative">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />
        
        <div className="text-center space-y-4 max-w-md px-4 relative z-10">
          <h2 className="text-2xl font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-400 via-amber-400 to-amber-500 bg-clip-text text-transparent font-sans">
            {currentLang === 'AR' ? 'مجموعة الكيانات' : 'Al Kayanat'}
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed font-sans font-light">
            {currentLang === 'AR'
              ? 'المحتوى فارغ وجاهز لتصميم الصفحة الرئيسية.'
              : 'Main workspace is empty and ready for homepage designs.'}
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />
    </div>
  );
};

export default Home;
