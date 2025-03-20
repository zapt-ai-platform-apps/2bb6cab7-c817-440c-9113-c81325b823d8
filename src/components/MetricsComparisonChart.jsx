import React from 'react';
import SingleMetricChart from './SingleMetricChart';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export default function MetricsComparisonChart({ startup }) {
  // Format funding for display
  const formatFunding = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
        <ArrowTrendingUpIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
        <p className="italic">
          These metrics compare the startup's performance before and after Hillel Fuld's involvement.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-4 hover:shadow-md transition-all duration-300">
          <SingleMetricChart 
            title="Funding Raised"
            beforeValue={startup.metrics.before.fundingRaised}
            afterValue={startup.metrics.after.fundingRaised}
            formatValue={formatFunding}
            color="rgb(16, 185, 129)"
          />
        </div>
        
        <div className="card p-4 hover:shadow-md transition-all duration-300">
          <SingleMetricChart 
            title="Users/Clients"
            beforeValue={startup.metrics.before.userGrowth}
            afterValue={startup.metrics.after.userGrowth}
            formatValue={(value) => value.toLocaleString()}
            color="rgb(99, 102, 241)"
          />
        </div>
        
        <div className="card p-4 hover:shadow-md transition-all duration-300">
          <SingleMetricChart 
            title="Media Mentions"
            beforeValue={startup.metrics.before.mediaMentions}
            afterValue={startup.metrics.after.mediaMentions}
            color="rgb(245, 158, 11)"
          />
        </div>
      </div>
    </div>
  );
}