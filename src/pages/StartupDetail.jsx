import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStartups } from '../context/StartupsContext';
import MetricsComparisonChart from '../components/MetricsComparisonChart';
import ConnectionsList from '../components/ConnectionsList';
import SuccessStories from '../components/SuccessStories';
import AddConnectionForm from '../components/AddConnectionForm';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  DocumentTextIcon,
  LinkIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
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

export default function StartupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getStartupById, 
    getConnectionsByStartupId,
    getSuccessStoriesByStartupId,
    generateSuccessStory 
  } = useStartups();
  
  const [showConnectionForm, setShowConnectionForm] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [activeSection, setActiveSection] = useState('metrics');
  const [animateContent, setAnimateContent] = useState(false);
  
  const startup = getStartupById(id);
  const connections = getConnectionsByStartupId(id);
  const successStories = getSuccessStoriesByStartupId(id);
  
  useEffect(() => {
    // Trigger animation after initial render
    const timer = setTimeout(() => {
      setAnimateContent(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!startup) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-md">
        <div className="bg-red-50 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
          <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold mt-4 mb-2">Startup not found</h2>
        <p className="text-slate-500 mb-6">The startup you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">
          Return to Dashboard
        </Link>
      </div>
    );
  }
  
  const handleGenerateStory = () => {
    setIsGeneratingStory(true);
    setTimeout(() => {
      generateSuccessStory(id);
      setIsGeneratingStory(false);
      setActiveSection('stories');
    }, 1000); // Simulate generation delay
  };
  
  // Format funding for display
  const formatFunding = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };
  
  // Function to get icon based on industry
  const getIndustryIcon = (industry) => {
    const iconSize = 28;
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
  
  // Calculate percentage growth for metrics
  const calculateGrowth = (before, after) => {
    if (before === 0) return after > 0 ? 100 : 0;
    return Math.round(((after - before) / before) * 100);
  };
  
  const metrics = [
    {
      name: 'Funding Raised',
      before: startup.metrics.before.fundingRaised,
      after: startup.metrics.after.fundingRaised,
      formatValue: formatFunding,
      icon: FaMoneyBillWave
    },
    {
      name: 'Users/Clients',
      before: startup.metrics.before.userGrowth,
      after: startup.metrics.after.userGrowth,
      formatValue: (value) => value.toLocaleString(),
      icon: FaUsers
    },
    {
      name: 'Media Mentions',
      before: startup.metrics.before.mediaMentions,
      after: startup.metrics.after.mediaMentions,
      formatValue: (value) => value,
      icon: FaNewspaper
    }
  ];
  
  const tabs = [
    { id: 'metrics', label: 'Impact Metrics' },
    { id: 'connections', label: 'Connections' },
    { id: 'stories', label: 'Success Stories' }
  ];
  
  return (
    <div className={`transition-opacity duration-500 ${animateContent ? 'opacity-100' : 'opacity-0'}`}>
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-primary-600 hover:text-primary-700 mb-6 cursor-pointer transition-colors duration-200"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        <span>Back to Dashboard</span>
      </button>
      
      <div className="card mb-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500"></div>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex items-start">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg shadow-sm">
              {getIndustryIcon(startup.industry)}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{startup.name}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="badge bg-slate-100 text-slate-800 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-slate-400 mr-1"></span>
                  {startup.industry}
                </span>
                <span className="badge bg-blue-100 text-blue-800 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-1"></span>
                  {startup.stage}
                </span>
                <span className="badge bg-amber-100 text-amber-800 flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  Founded {startup.yearFounded}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end md:text-right space-y-1 px-4 py-3 bg-slate-50 rounded-lg md:ml-auto">
            <div className="text-sm text-slate-500">Founder</div>
            <div className="font-semibold text-slate-900">{startup.founder}</div>
            {startup.website && (
              <a 
                href={startup.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-600 hover:text-primary-700 text-sm flex items-center md:justify-end transition-colors duration-200"
              >
                <LinkIcon className="h-3.5 w-3.5 mr-1" />
                Visit Website
              </a>
            )}
          </div>
        </div>
        
        {startup.description && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-medium text-slate-500 mb-2">About the Startup</h3>
            <p className="text-slate-700">{startup.description}</p>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <ul className="flex flex-wrap border-b border-slate-200">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-1">
              <button
                onClick={() => setActiveSection(tab.id)}
                className={`inline-block py-3 px-4 text-sm font-medium rounded-t-lg transition duration-200 cursor-pointer ${
                  activeSection === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-500 bg-white'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="card animate-fade-in">
        {activeSection === 'metrics' && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {metrics.map((metric) => {
                const growth = calculateGrowth(metric.before, metric.after);
                return (
                  <div key={metric.name} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-slate-700">
                        <metric.icon className="h-4 w-4 mr-2 text-slate-500" />
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      {growth > 0 && (
                        <div className="flex items-center text-emerald-600 text-sm font-medium">
                          <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                          {growth}% Growth
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Before</div>
                        <div className="text-lg font-semibold text-slate-700">
                          {metric.formatValue(metric.before)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-emerald-600 mb-1">After</div>
                        <div className="text-lg font-semibold text-emerald-700">
                          {metric.formatValue(metric.after)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <MetricsComparisonChart startup={startup} />
          </section>
        )}
        
        {activeSection === 'connections' && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Key Connections</h2>
              <button 
                onClick={() => setShowConnectionForm(!showConnectionForm)} 
                className="btn btn-secondary flex items-center shadow hover:shadow-md cursor-pointer"
              >
                <PlusIcon className="h-4 w-4 mr-1.5" />
                {showConnectionForm ? 'Cancel' : 'Add Connection'}
              </button>
            </div>
            
            {showConnectionForm && (
              <div className="card mb-6 border border-primary-100 bg-primary-50/30">
                <AddConnectionForm 
                  startupId={id} 
                  onComplete={() => setShowConnectionForm(false)} 
                />
              </div>
            )}
            
            <ConnectionsList connections={connections} />
          </section>
        )}
        
        {activeSection === 'stories' && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Success Stories</h2>
              
              {successStories.length === 0 && (
                <button 
                  onClick={handleGenerateStory} 
                  disabled={isGeneratingStory}
                  className="btn btn-primary flex items-center shadow hover:shadow-md cursor-pointer"
                >
                  {isGeneratingStory ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <DocumentTextIcon className="h-4 w-4 mr-1.5" />
                      Generate Story
                    </>
                  )}
                </button>
              )}
            </div>
            
            <SuccessStories stories={successStories} startup={startup} />
          </section>
        )}
      </div>
    </div>
  );
}