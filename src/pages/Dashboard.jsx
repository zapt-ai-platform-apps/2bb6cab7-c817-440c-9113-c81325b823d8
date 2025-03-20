import React from 'react';
import { Link } from 'react-router-dom';
import { useStartups } from '../context/StartupsContext';
import StartupCard from '../components/StartupCard';
import MetricsSummary from '../components/MetricsSummary';

export default function Dashboard() {
  const { startups } = useStartups();
  
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
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Startup Impact Dashboard</h1>
        <Link to="/add-startup" className="btn btn-primary">
          Add Startup
        </Link>
      </div>
      
      <MetricsSummary impactTotals={impactTotals} startupCount={startups.length} />
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Startup Portfolio</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map(startup => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
        
        {startups.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">No startups yet</h3>
            <p className="mt-1 text-gray-500">
              Start by adding your first startup to track its growth and your impact.
            </p>
            <div className="mt-6">
              <Link to="/add-startup" className="btn btn-primary">
                Add Your First Startup
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}