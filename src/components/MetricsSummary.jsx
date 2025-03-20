import React from 'react';
import { 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  NewspaperIcon, 
  BuildingOfficeIcon,
  ArrowTrendingUpIcon  
} from '@heroicons/react/24/outline';

export default function MetricsSummary({ impactTotals, startupCount }) {
  const formatFunding = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };
  
  const metrics = [
    {
      name: 'Startups Advised',
      value: startupCount,
      icon: BuildingOfficeIcon,
      color: 'bg-gradient-to-r from-primary-500 to-primary-600',
      growth: null
    },
    {
      name: 'Additional Funding',
      value: formatFunding(impactTotals.fundingRaised),
      icon: CurrencyDollarIcon,
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      growth: 'Raised'
    },
    {
      name: 'User Growth',
      value: impactTotals.userGrowth.toLocaleString(),
      icon: UserGroupIcon,
      color: 'bg-gradient-to-r from-violet-500 to-violet-600',
      growth: 'New'
    },
    {
      name: 'Media Mentions',
      value: impactTotals.mediaMentions,
      icon: NewspaperIcon,
      color: 'bg-gradient-to-r from-amber-500 to-amber-600',
      growth: 'Generated'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="card overflow-hidden group card-hover">
          <div className={`absolute top-0 left-0 w-full h-1 ${metric.color}`}></div>
          <div className="flex items-center p-4">
            <div className={`${metric.color} p-3 rounded-xl shadow-md text-white`}>
              <metric.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-slate-500">{metric.name}</h3>
              <p className="mt-1 text-xl font-semibold text-slate-900 group-hover:text-primary-600 transition-colors duration-300">{metric.value}</p>
              {metric.growth && (
                <div className="flex items-center mt-1 text-xs font-medium text-emerald-600">
                  <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                  <span>{metric.growth}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}