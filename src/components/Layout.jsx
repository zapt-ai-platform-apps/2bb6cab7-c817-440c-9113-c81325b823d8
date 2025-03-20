import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 bg-pattern">
      <Header />
      <main className="flex-grow px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-fade-in">
        {children}
      </main>
      <Footer />
    </div>
  );
}