import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';

type PageType = 'home' | 'about' | 'services' | 'blog' | 'contact';

function App() {
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');
  const [page, setPage] = useState<PageType>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Sync document language and RTL layout direction dynamically
  useEffect(() => {
    const isAr = lang === 'AR';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';
  }, [lang]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Sync page state with window.location.hash for back button / refresh support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (['home', 'about', 'services', 'blog', 'contact'].includes(hash)) {
        setPage(hash as PageType);
      } else if (!hash) {
        setPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    // End loading screen after 1.2s
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const timer2 = setTimeout(() => {
        setIsLoading(false);
      }, 500); // matches fadeOut animation duration
      return () => clearTimeout(timer2);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (newPage: PageType) => {
    window.location.hash = `/${newPage}`;
    setPage(newPage);
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home currentLang={lang} onLangChange={setLang} onPageChange={handlePageChange} />;
      case 'about':
        return <About currentLang={lang} onLangChange={setLang} onPageChange={handlePageChange} />;
      case 'services':
        return <Services currentLang={lang} onLangChange={setLang} onPageChange={handlePageChange} />;
      case 'blog':
        return <Blog currentLang={lang} onLangChange={setLang} onPageChange={handlePageChange} />;
      case 'contact':
        return <Contact currentLang={lang} onLangChange={setLang} onPageChange={handlePageChange} />;
      default:
        return <Home currentLang={lang} onLangChange={setLang} onPageChange={handlePageChange} />;
    }
  };

  return (
    <>
      {isLoading && (
        <div 
          className={`fixed inset-0 z-[9999] bg-[#070A13] flex flex-col items-center justify-center ${
            isFadingOut ? 'animate-fade-out' : ''
          }`}
        >
          <div className="flex flex-col items-center space-y-6 animate-logo-pulse">
            {/* Logo SVG */}
            <div className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-3xl shadow-2xl">
              <svg viewBox="0 0 100 100" className="w-16 h-16">
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
            {/* Title / Corporate Brand Text */}
            <div className="flex flex-col items-center space-y-2 text-center">
              <span className="text-2xl font-black tracking-widest text-white uppercase font-display">
                AL KAYANAT
              </span>
              <span className="text-xs font-bold tracking-widest text-brand-orange uppercase font-display" dir="rtl">
                الكيانات المشتركة
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div key={page} className="animate-page-in">
        {renderPage()}
      </div>
    </>
  );
}

export default App;

