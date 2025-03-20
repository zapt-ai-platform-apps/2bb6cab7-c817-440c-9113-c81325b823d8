import React from 'react';
import SingleMetricChart from './SingleMetricChart';

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
      <h3 className="text-lg font-semibold mb-4">Impact Metrics Comparison</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-4">
          <SingleMetricChart 
            title="Funding Raised"
            beforeValue={startup.metrics.before.fundingRaised}
            afterValue={startup.metrics.after.fundingRaised}
            formatValue={formatFunding}
          />
        </div>
        
        <div className="card p-4">
          <SingleMetricChart 
            title="Users/Clients"
            beforeValue={startup.metrics.before.userGrowth}
            afterValue={startup.metrics.after.userGrowth}
            formatValue={(value) => value.toLocaleString()}
          />
        </div>
        
        <div className="card p-4">
          <SingleMetricChart 
            title="Media Mentions"
            beforeValue={startup.metrics.before.mediaMentions}
            afterValue={startup.metrics.after.mediaMentions}
          />
        </div>
      </div>
    </div>
  );
}