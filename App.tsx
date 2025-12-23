import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhatBuilding from './components/WhatBuilding';
import HowItWorks from './components/HowItWorks';
import PainSolution from './components/PainSolution';
import Services from './components/Services';
import MetricsSection from './components/MetricsSection';
import LiveMap from './components/LiveMap';
import Ecosystem from './components/Ecosystem';
import WhyPartner from './components/WhyPartner';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import LocatorPage from './components/LocatorPage';
import TeamPage from './components/TeamPage';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'services' | 'contact' | 'locator' | 'team'>('home');

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

  return (
    <div className="min-h-screen selection:bg-emerald-600 selection:text-white bg-[#020617] antialiased">
      <Header 
        scrolled={scrolled} 
        currentPage={currentPage as any} 
        onNavigate={(page) => setCurrentPage(page as any)} 
      />
      
      <main className="relative">
        {currentPage === 'home' ? (
          <>
            <Hero />
            <WhatBuilding />
            <HowItWorks />
            <Services />
            <PainSolution />
            <MetricsSection />
            {/* <LiveMap /> */}
            <WhyPartner />
            <Ecosystem />
          </>
        ) : currentPage === 'about' ? (
          <AboutPage onNavigate={(page) => setCurrentPage(page as any)} />
        ) : currentPage === 'services' ? (
          <ServicesPage onNavigate={(page) => setCurrentPage(page as any)} />
        ) : currentPage === 'contact' ? (
          <ContactPage onNavigate={(page) => setCurrentPage(page as any)} />
        ) : currentPage === 'team' ? (
          <TeamPage onNavigate={(page) => setCurrentPage(page as any)} />
        ) : (
          <LocatorPage onNavigate={(page) => setCurrentPage(page as any)} />
        )}
      </main>
      
      {currentPage !== 'locator' && <Footer />}
    </div>
  );
};

export default App;