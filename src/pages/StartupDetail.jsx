import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStartups } from '../context/StartupsContext';
import MetricsComparisonChart from '../components/MetricsComparisonChart';
import ConnectionsList from '../components/ConnectionsList';
import SuccessStories from '../components/SuccessStories';
import AddConnectionForm from '../components/AddConnectionForm';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

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
  
  const startup = getStartupById(id);
  const connections = getConnectionsByStartupId(id);
  const successStories = getSuccessStoriesByStartupId(id);
  
  if (!startup) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Startup not found</h2>
        <Link to="/" className="btn btn-primary">
          Go back to dashboard
        </Link>
      </div>
    );
  }
  
  const handleGenerateStory = () => {
    setIsGeneratingStory(true);
    setTimeout(() => {
      generateSuccessStory(id);
      setIsGeneratingStory(false);
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
  
  return (
    <div>
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 cursor-pointer"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to Dashboard
      </button>
      
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div className="flex items-center">
          <img 
            src={startup.logo || `https://PLACEHOLDER`} 
            alt={`${startup.name} logo`} 
            className="w-16 h-16 rounded object-cover" 
            data-image-request={`${startup.industry} company logo, minimal and modern`}
          />
          <div className="ml-4">
            <h1 className="text-2xl sm:text-3xl font-bold">{startup.name}</h1>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="badge bg-gray-100 text-gray-800">
                {startup.industry}
              </span>
              <span className="badge bg-blue-100 text-blue-800">
                {startup.stage}
              </span>
              <span className="badge bg-amber-100 text-amber-800">
                Founded {startup.yearFounded}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:items-end">
          <div className="text-sm text-gray-600">Founder</div>
          <div className="font-medium">{startup.founder}</div>
          {startup.website && (
            <a 
              href={startup.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 text-sm mt-1"
            >
              Visit Website
            </a>
          )}
        </div>
      </div>
      
      {startup.description && (
        <div className="card mb-8">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{startup.description}</p>
        </div>
      )}
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Impact Metrics</h2>
        <div className="card">
          <MetricsComparisonChart startup={startup} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-500">Funding Raised</h3>
              <div className="mt-1 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-900">
                  {formatFunding(startup.metrics.before.fundingRaised)}
                </span>
                <span className="mx-2 text-gray-400">→</span>
                <span className="text-lg font-semibold text-green-600">
                  {formatFunding(startup.metrics.after.fundingRaised)}
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-500">Users/Clients</h3>
              <div className="mt-1 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-900">
                  {startup.metrics.before.userGrowth.toLocaleString()}
                </span>
                <span className="mx-2 text-gray-400">→</span>
                <span className="text-lg font-semibold text-green-600">
                  {startup.metrics.after.userGrowth.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-500">Media Mentions</h3>
              <div className="mt-1 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-900">
                  {startup.metrics.before.mediaMentions}
                </span>
                <span className="mx-2 text-gray-400">→</span>
                <span className="text-lg font-semibold text-green-600">
                  {startup.metrics.after.mediaMentions}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Key Connections</h2>
          <button 
            onClick={() => setShowConnectionForm(!showConnectionForm)} 
            className="btn btn-secondary flex items-center cursor-pointer"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            {showConnectionForm ? 'Cancel' : 'Add Connection'}
          </button>
        </div>
        
        {showConnectionForm && (
          <div className="card mb-4">
            <AddConnectionForm 
              startupId={id} 
              onComplete={() => setShowConnectionForm(false)} 
            />
          </div>
        )}
        
        <ConnectionsList connections={connections} />
      </section>
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Success Stories</h2>
          
          {successStories.length === 0 && (
            <button 
              onClick={handleGenerateStory} 
              disabled={isGeneratingStory}
              className="btn btn-secondary flex items-center cursor-pointer"
            >
              {isGeneratingStory ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  Generating...
                </>
              ) : (
                <>
                  <DocumentTextIcon className="h-4 w-4 mr-1" />
                  Generate Story
                </>
              )}
            </button>
          )}
        </div>
        
        <SuccessStories stories={successStories} startup={startup} />
      </section>
    </div>
  );
}