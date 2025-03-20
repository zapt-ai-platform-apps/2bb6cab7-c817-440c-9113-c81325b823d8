import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { 
  FaBrain, 
  FaSeedling, 
  FaShieldAlt, 
  FaShoppingCart, 
  FaGraduationCap, 
  FaMoneyBillWave, 
  FaHeartbeat, 
  FaMicrochip, 
  FaCubes, 
  FaServer, 
  FaTruck, 
  FaBuilding 
} from 'react-icons/fa';

export default function StartupCard({ startup }) {
  // Calculate growth percentages
  const calculateGrowth = (before, after) => {
    if (before === 0) return after > 0 ? 100 : 0;
    return Math.round(((after - before) / before) * 100);
  };
  
  const fundingGrowth = calculateGrowth(
    startup.metrics.before.fundingRaised,
    startup.metrics.after.fundingRaised
  );
  
  const userGrowth = calculateGrowth(
    startup.metrics.before.userGrowth,
    startup.metrics.after.userGrowth
  );
  
  const mediaMentionsGrowth = calculateGrowth(
    startup.metrics.before.mediaMentions,
    startup.metrics.after.mediaMentions
  );
  
  const formatFunding = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };
  
  const getStageColor = (stage) => {
    switch (stage) {
      case 'Pre-seed': return 'bg-gray-100 text-gray-800';
      case 'Seed': return 'bg-emerald-100 text-emerald-800';
      case 'Series A': return 'bg-blue-100 text-blue-800';
      case 'Series B': return 'bg-purple-100 text-purple-800';
      case 'Series C': return 'bg-indigo-100 text-indigo-800';
      case 'Series D+': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get icon based on industry
  const getIndustryIcon = (industry) => {
    const iconSize = 24;
    const iconColor = "#4B5563"; // Gray-600
    
    switch (industry?.toLowerCase()) {
      case 'artificial intelligence':
        return <FaBrain size={iconSize} color={iconColor} />;
      case 'agtech':
        return <FaSeedling size={iconSize} color={iconColor} />;
      case 'blockchain':
        return <FaCubes size={iconSize} color={iconColor} />;
      case 'cybersecurity':
        return <FaShieldAlt size={iconSize} color={iconColor} />;
      case 'e-commerce':
        return <FaShoppingCart size={iconSize} color={iconColor} />;
      case 'edtech':
        return <FaGraduationCap size={iconSize} color={iconColor} />;
      case 'fintech':
        return <FaMoneyBillWave size={iconSize} color={iconColor} />;
      case 'healthcare':
        return <FaHeartbeat size={iconSize} color={iconColor} />;
      case 'iot':
        return <FaMicrochip size={iconSize} color={iconColor} />;
      case 'quantum technology':
        return <FaServer size={iconSize} color={iconColor} />;
      case 'saas':
        return <FaServer size={iconSize} color={iconColor} />;
      case 'transportation':
        return <FaTruck size={iconSize} color={iconColor} />;
      default:
        return <FaBuilding size={iconSize} color={iconColor} />;
    }
  };
  
  return (
    <div className="card hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
            {getIndustryIcon(startup.industry)}
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">{startup.name}</h3>
            <p className="text-sm text-gray-500">{startup.founder}</p>
          </div>
        </div>
        <span className={`badge ${getStageColor(startup.stage)} whitespace-nowrap`}>
          {startup.stage}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{startup.industry}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Funding</span>
          <div className="flex items-center">
            <span className="text-sm font-medium">{formatFunding(startup.metrics.after.fundingRaised)}</span>
            {fundingGrowth > 0 && (
              <div className="ml-2 flex items-center text-green-600 text-xs">
                <ArrowUpIcon className="h-3 w-3" />
                <span>{fundingGrowth}%</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Users/Clients</span>
          <div className="flex items-center">
            <span className="text-sm font-medium">{startup.metrics.after.userGrowth.toLocaleString()}</span>
            {userGrowth > 0 && (
              <div className="ml-2 flex items-center text-green-600 text-xs">
                <ArrowUpIcon className="h-3 w-3" />
                <span>{userGrowth}%</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Media Mentions</span>
          <div className="flex items-center">
            <span className="text-sm font-medium">{startup.metrics.after.mediaMentions}</span>
            {mediaMentionsGrowth > 0 && (
              <div className="ml-2 flex items-center text-green-600 text-xs">
                <ArrowUpIcon className="h-3 w-3" />
                <span>{mediaMentionsGrowth}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Link 
        to={`/startup/${startup.id}`}
        className="block w-full btn btn-secondary text-center"
      >
        View Details
      </Link>
    </div>
  );
}