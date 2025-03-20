import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStartups } from '../context/StartupsContext';
import StartupCard from '../components/StartupCard';
import MetricsSummary from '../components/MetricsSummary';
import { SparklesIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { startups } = useStartups();
  const [animateCards, setAnimateCards] = useState(false);
  
  // Calculate overall impact metrics
  const calculateTotalImpact = () => {
    return startups.reduce((totals, startup) => {
      totals.fundingRaised += (startup.metrics.after.fundingRaised - startup.metrics.before.fundingRaised);
      totals.userGrowth += (startup.metrics.after.userGrowth - startup.metrics.before.userGrowth);
      totals.mediaMentions += (startup.metrics.after.mediaMentions - startup.metrics.before.mediaMentions);
      return totals;
    }, { fundingRaised: 0, userGrowth: 0, mediaMentions: 0 });
  };
  
  const impactTotals = calculateTotalImpact();
  
  useEffect(() => {
    // Animate cards after initial render
    const timer = setTimeout(() => {
      setAnimateCards(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold relative">
            <SparklesIcon className="h-7 w-7 text-amber-400 absolute -left-8 -top-3 opacity-70 animate-pulse-slow hidden md:block" />
            Startup Impact Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Track and visualize your impact on startups</p>
        </div>
        <Link to="/add-startup" className="btn btn-primary flex items-center shadow-md hover:shadow-lg">
          <PlusIcon className="h-5 w-5 mr-1.5" />
          Add Startup
        </Link>
      </div>
      
      <section className="dashboard-section animate-fade-in">
        <MetricsSummary impactTotals={impactTotals} startupCount={startups.length} />
      </section>
      
      <section className="dashboard-section">
        <h2 className="section-title">
          Startup Portfolio
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup, index) => (
            <div 
              key={startup.id} 
              className={`transform transition-all duration-500 ${
                animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <StartupCard startup={startup} />
            </div>
          ))}
        </div>
        
        {startups.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md border border-slate-100 animate-fade-in">
            <div className="bg-primary-50 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
              <SparklesIcon className="h-8 w-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mt-4">No startups yet</h3>
            <p className="mt-2 text-slate-500 max-w-md mx-auto">
              Start by adding your first startup to track its growth and your impact.
            </p>
            <div className="mt-6">
              <Link to="/add-startup" className="btn btn-primary shadow-md hover:shadow-lg inline-flex items-center">
                <PlusIcon className="h-5 w-5 mr-1.5" />
                Add Your First Startup
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}