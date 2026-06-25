import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Phone, Mail, MessageCircle } from 'lucide-react';

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
            {/* Logo Image */}
            <div className="p-4 bg-white rounded-3xl shadow-2xl">
              <img 
                src="/images/logo.png" 
                alt="Al Kyanat" 
                className="w-24 h-24 object-contain"
              />
            </div>
            {/* Title / Corporate Brand Text */}
            <div className="flex flex-col items-center space-y-2 text-center">
              <span className="text-2xl font-black tracking-widest text-white uppercase font-display">
                AL KYANAT
              </span>
              <span className="text-xs font-bold tracking-widest text-brand-orange uppercase font-display" dir="rtl">
                الكيانات المشتركة
              </span>
            </div>
          </div>
        </div>
      )}
      
      
      {/* Global Floating Contact Sidebar (Right) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-0.5 select-none hidden md:flex font-sans">
        {/* Phone */}
        <a 
          href="tel:+966557062353" 
          className="flex flex-col items-center py-4 px-2.5 text-white bg-brand-red hover:bg-brand-red-dark transition-all duration-300 rounded-l-lg border-l border-t border-b border-white/10 shadow-lg group"
        >
          <Phone className="h-4 w-4 text-brand-yellow group-hover:scale-110 transition-transform" />
          <span className="text-[9.5px] font-black tracking-widest [writing-mode:vertical-rl] select-all mt-2.5">+966 55 706 2353</span>
        </a>
        {/* Email */}
        <a 
          href="mailto:info@alkyanat-almushtarika.com" 
          className="flex flex-col items-center py-4 px-2.5 text-white bg-[#0e271a] hover:bg-[#0b1f14] transition-all duration-300 rounded-l-lg border-l border-t border-b border-white/10 shadow-lg group"
        >
          <Mail className="h-4 w-4 text-brand-yellow group-hover:scale-110 transition-transform" />
          <span className="text-[9.5px] font-black tracking-widest [writing-mode:vertical-rl] select-all mt-2.5">info@alkyanat-almushtarika.com</span>
        </a>
      </div>

      {/* Global WhatsApp Floating Button */}
      <a 
        href="https://wa.me/966557062353" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-45 bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer font-bold text-xs"
      >
        <MessageCircle className="h-4.5 w-4.5 fill-current" />
        <span>{lang === 'AR' ? 'كيف يمكنني مساعدتك؟' : 'How can I help you?'}</span>
      </a>

      <div key={page} className="animate-page-in">
        {renderPage()}
      </div>
    </>
  );
}

export default App;

