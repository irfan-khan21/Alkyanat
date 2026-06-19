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

  return renderPage();
}

export default App;
