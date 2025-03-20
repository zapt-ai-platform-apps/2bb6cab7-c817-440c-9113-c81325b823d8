import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/solid';
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
  FaBuilding,
  FaUsers,
  FaNewspaper 
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
      case 'Pre-seed': return 'bg-slate-100 text-slate-800';
      case 'Seed': return 'bg-emerald-100 text-emerald-800';
      case 'Series A': return 'bg-blue-100 text-blue-800';
      case 'Series B': return 'bg-purple-100 text-purple-800';
      case 'Series C': return 'bg-indigo-100 text-indigo-800';
      case 'Series D+': return 'bg-pink-100 text-pink-800';
      default: return 'bg-slate-100 text-slate-800';
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

  // Determine health score based on growth metrics
  const calculateHealthScore = () => {
    const scores = [fundingGrowth, userGrowth, mediaMentionsGrowth];
    const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    
    if (avgScore > 100) return { color: 'text-emerald-500', label: 'Excellent' };
    if (avgScore > 50) return { color: 'text-green-500', label: 'Good' };
    if (avgScore > 20) return { color: 'text-yellow-500', label: 'Fair' };
    if (avgScore > 0) return { color: 'text-orange-500', label: 'Needs Attention' };
    return { color: 'text-red-500', label: 'Critical' };
  };
  
  const healthScore = calculateHealthScore();
  
  return (
    <div className="card card-hover group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg shadow-sm group-hover:bg-slate-50 transition-colors duration-300">
            {getIndustryIcon(startup.industry)}
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors duration-300">{startup.name}</h3>
            <p className="text-sm text-slate-500">{startup.founder}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`badge ${getStageColor(startup.stage)} whitespace-nowrap`}>
            {startup.stage}
          </span>
          <div className={`mt-1 text-xs font-medium ${healthScore.color} flex items-center`}>
            <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
            {healthScore.label}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-slate-600 mb-4">{startup.industry}</p>
      
      <div className="space-y-3 mb-5">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 flex items-center">
            <FaMoneyBillWave className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
            Funding
          </span>
          <div className="flex items-center">
            <span className="text-sm font-medium text-slate-700">{formatFunding(startup.metrics.after.fundingRaised)}</span>
            {fundingGrowth > 0 && (
              <div className="ml-2 flex items-center text-emerald-500 text-xs">
                <ArrowUpIcon className="h-3 w-3" />
                <span>{fundingGrowth}%</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 flex items-center">
            <FaUsers className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
            Users/Clients
          </span>
          <div className="flex items-center">
            <span className="text-sm font-medium text-slate-700">{startup.metrics.after.userGrowth.toLocaleString()}</span>
            {userGrowth > 0 && (
              <div className="ml-2 flex items-center text-emerald-500 text-xs">
                <ArrowUpIcon className="h-3 w-3" />
                <span>{userGrowth}%</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 flex items-center">
            <FaNewspaper className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
            Media Mentions
          </span>
          <div className="flex items-center">
            <span className="text-sm font-medium text-slate-700">{startup.metrics.after.mediaMentions}</span>
            {mediaMentionsGrowth > 0 && (
              <div className="ml-2 flex items-center text-emerald-500 text-xs">
                <ArrowUpIcon className="h-3 w-3" />
                <span>{mediaMentionsGrowth}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-1 bg-slate-100 rounded-full mb-5 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
          style={{ width: `${Math.min(100, Math.max(userGrowth, fundingGrowth, mediaMentionsGrowth))}%` }}
        ></div>
      </div>
      
      <Link 
        to={`/startup/${startup.id}`}
        className="block w-full btn btn-primary text-center transition-transform hover:translate-y-[-1px] group-hover:shadow-md"
      >
        View Details
      </Link>
    </div>
  );
}