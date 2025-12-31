
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Hero from './components/Hero';
import PainSolution from './components/PainSolution';
import WhatBuilding from './components/WhatBuilding';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import MetricsSection from './components/MetricsSection';
import GetStartedSection from './components/GetStarted';
import Ecosystem from './components/Ecosystem';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import LocatorPage from './components/LocatorPage';
import TeamPage from './components/TeamPage';
import ProductsPage from './components/ProductsPage';
import NewsPage from './components/NewsPage';
import SingleNewsPage from './components/SingleNewsPage';
import LegalPage from './components/LegalPage';
import LeaseToOwnPage from './components/LeaseToOwnPage';
import NewsCategoryPage from './components/NewsCategoryPage';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'services' | 'contact' | 'locator' | 'team' | 'products' | 'news' | 'single-news' | 'privacy' | 'terms' | 'lease-to-own' | 'news-category'>('home');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  // Theme state for Single News Page (defaulting to 'light' as requested)
  const [newsTheme, setNewsTheme] = useState<'light' | 'dark'>('light');
  
  // Theme state for Locator Page (defaulting to 'light' as requested)
  const [locatorTheme, setLocatorTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleReadArticle = (article: any) => {
    setSelectedArticle(article);
    setCurrentPage('single-news');
    // Reset theme to light when opening a new article (optional preference)
    setNewsTheme('light'); 
  };

  const handleNavigate = (page: any) => {
    setCurrentPage(page);
  };

  const handleNavigateToCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('news-category');
  };

  // Determine if header should be scrolled based on page and theme
  const getHeaderScrolledState = () => {
    if (currentPage === 'single-news') {
      return newsTheme === 'light';
    }
    // For Locator, we ALWAYS return true to enforce the compact "scrolled" height
    if (currentPage === 'locator') {
      return true;
    }
    return scrolled;
  };

  // Helper to check if we are on a dark mode page (for header contrast)
  const isDarkPage = 
    currentPage === 'home' || 
    currentPage === 'services' || 
    currentPage === 'products' || 
    currentPage === 'team' || // Team hero is dark
    currentPage === 'contact' || // Contact hero is dark
    currentPage === 'privacy' || // Legal hero is dark
    currentPage === 'terms' ||   // Legal hero is dark
    currentPage === 'lease-to-own' || // LeaseToOwn hero is dark
    currentPage === 'news-category'; // Category page hero is dark

  return (
    <div className={`min-h-screen selection:bg-emerald-600 selection:text-white antialiased ${
      (currentPage === 'single-news' && newsTheme === 'light') || 
      (currentPage === 'locator' && locatorTheme === 'light') ||
      currentPage === 'privacy' || 
      currentPage === 'terms' ||
      currentPage === 'lease-to-own' ||
      currentPage === 'news-category'
      ? 'bg-white' 
      : 'bg-[#020617]'
    }`}>
      <Header 
        scrolled={getHeaderScrolledState()} 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        showThemeToggle={false}
        isDarkMode={
          currentPage === 'single-news' ? newsTheme === 'dark' : 
          currentPage === 'locator' ? locatorTheme === 'dark' : 
          false
        }
        onToggleTheme={() => {
          if (currentPage === 'single-news') setNewsTheme(prev => prev === 'light' ? 'dark' : 'light');
          if (currentPage === 'locator') setLocatorTheme(prev => prev === 'light' ? 'dark' : 'light');
        }}
      />
      
      <main className="relative">
        {currentPage === 'home' ? (
          <>
            <Hero />
            <PainSolution />
            <WhatBuilding />
            <HowItWorks />
            <Services />
            <MetricsSection onNavigate={handleNavigate} />
            <NewsSection onReadArticle={handleReadArticle} onNavigate={handleNavigate} onNavigateToCategory={handleNavigateToCategory} />
            <GetStartedSection onNavigate={handleNavigate} />
            <Ecosystem />
          </>
        ) : currentPage === 'about' ? (
          <AboutPage onNavigate={handleNavigate} />
        ) : currentPage === 'services' ? (
          <ServicesPage onNavigate={handleNavigate} />
        ) : currentPage === 'products' ? (
          <ProductsPage onNavigate={handleNavigate} />
        ) : currentPage === 'lease-to-own' ? (
          <LeaseToOwnPage onNavigate={handleNavigate} />
        ) : currentPage === 'news' ? (
          <NewsPage onNavigate={handleNavigate} onReadArticle={handleReadArticle} onNavigateToCategory={handleNavigateToCategory} />
        ) : currentPage === 'news-category' ? (
          <NewsCategoryPage 
            category={selectedCategory} 
            onNavigate={handleNavigate} 
            onReadArticle={handleReadArticle} 
          />
        ) : currentPage === 'single-news' ? (
          <SingleNewsPage 
            article={selectedArticle} 
            onNavigate={handleNavigate} 
            onReadArticle={handleReadArticle}
            onNavigateToCategory={handleNavigateToCategory}
            isDarkMode={newsTheme === 'dark'}
            onToggleTheme={() => setNewsTheme(prev => prev === 'light' ? 'dark' : 'light')}
          />
        ) : currentPage === 'contact' ? (
          <ContactPage onNavigate={handleNavigate} />
        ) : currentPage === 'team' ? (
          <TeamPage onNavigate={handleNavigate} />
        ) : currentPage === 'privacy' ? (
          <LegalPage type="privacy" onNavigate={handleNavigate} />
        ) : currentPage === 'terms' ? (
          <LegalPage type="terms" onNavigate={handleNavigate} />
        ) : (
          <LocatorPage 
            onNavigate={handleNavigate}
            isDarkMode={locatorTheme === 'dark'}
            onToggleTheme={() => setLocatorTheme(prev => prev === 'light' ? 'dark' : 'light')}
          />
        )}
      </main>
      
      {currentPage !== 'locator' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;
