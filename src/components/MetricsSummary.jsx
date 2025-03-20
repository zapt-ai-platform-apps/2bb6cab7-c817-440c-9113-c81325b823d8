import React from 'react';
import { 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  NewspaperIcon, 
  BuildingOfficeIcon 
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
      color: 'bg-blue-500'
    },
    {
      name: 'Additional Funding',
      value: formatFunding(impactTotals.fundingRaised),
      icon: CurrencyDollarIcon,
      color: 'bg-green-500'
    },
    {
      name: 'User Growth',
      value: impactTotals.userGrowth.toLocaleString(),
      icon: UserGroupIcon,
      color: 'bg-purple-500'
    },
    {
      name: 'Media Mentions',
      value: impactTotals.mediaMentions,
      icon: NewspaperIcon,
      color: 'bg-amber-500'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="card flex items-center p-5">
          <div className={`${metric.color} p-3 rounded-full`}>
            <metric.icon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}