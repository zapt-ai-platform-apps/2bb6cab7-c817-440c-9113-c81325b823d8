import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStartups } from '../context/StartupsContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AddStartup() {
  const navigate = useNavigate();
  const { addStartup } = useStartups();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    founder: '',
    industry: '',
    stage: 'Seed',
    description: '',
    yearFounded: new Date().getFullYear(),
    website: '',
    metrics: {
      before: {
        fundingRaised: 0,
        userGrowth: 0,
        mediaMentions: 0
      },
      after: {
        fundingRaised: 0,
        userGrowth: 0,
        mediaMentions: 0
      }
    }
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested fields for metrics
    if (name.includes('.')) {
      const [category, subcategory, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [subcategory]: {
            ...prev[category][subcategory],
            [field]: field === 'fundingRaised' 
              ? Number(value) 
              : (field === 'userGrowth' || field === 'mediaMentions') 
                ? parseInt(value, 10) || 0 
                : value
          }
        }
      }));
    } else {
      // For normal fields
      setFormData(prev => ({
        ...prev,
        [name]: name === 'yearFounded' ? parseInt(value, 10) || '' : value
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate the form
    if (!formData.name || !formData.founder || !formData.industry) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API request
    setTimeout(() => {
      const newStartupId = addStartup(formData);
      setIsSubmitting(false);
      navigate(`/startup/${newStartupId}`);
    }, 800);
  };
  
  const industryOptions = [
    'Artificial Intelligence', 'AgTech', 'Blockchain', 'Cybersecurity',
    'E-commerce', 'EdTech', 'FinTech', 'Healthcare', 'IoT',
    'Quantum Technology', 'SaaS', 'Transportation'
  ];
  
  const stageOptions = [
    'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+'
  ];
  
  return (
    <div>
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 cursor-pointer"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to Dashboard
      </button>
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Add New Startup</h1>
      
      <form onSubmit={handleSubmit} className="card space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Startup Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Founder Name *
              </label>
              <input
                type="text"
                name="founder"
                value={formData.founder}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="select"
                required
              >
                <option value="">Select Industry</option>
                {industryOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stage
              </label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="select"
              >
                {stageOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year Founded
              </label>
              <input
                type="number"
                name="yearFounded"
                value={formData.yearFounded}
                onChange={handleChange}
                className="input"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="input"
                placeholder="https://example.com"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input h-24 resize-none"
              placeholder="Brief description of the startup..."
            ></textarea>
          </div>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-4">Impact Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-gray-50">
              <h3 className="text-md font-medium mb-3">Before Hillel's Involvement</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Funding Raised ($)
                  </label>
                  <input
                    type="number"
                    name="metrics.before.fundingRaised"
                    value={formData.metrics.before.fundingRaised}
                    onChange={handleChange}
                    className="input"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Users/Clients
                  </label>
                  <input
                    type="number"
                    name="metrics.before.userGrowth"
                    value={formData.metrics.before.userGrowth}
                    onChange={handleChange}
                    className="input"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Media Mentions
                  </label>
                  <input
                    type="number"
                    name="metrics.before.mediaMentions"
                    value={formData.metrics.before.mediaMentions}
                    onChange={handleChange}
                    className="input"
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            <div className="card bg-blue-50">
              <h3 className="text-md font-medium mb-3">After Hillel's Involvement</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Funding Raised ($)
                  </label>
                  <input
                    type="number"
                    name="metrics.after.fundingRaised"
                    value={formData.metrics.after.fundingRaised}
                    onChange={handleChange}
                    className="input"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Users/Clients
                  </label>
                  <input
                    type="number"
                    name="metrics.after.userGrowth"
                    value={formData.metrics.after.userGrowth}
                    onChange={handleChange}
                    className="input"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Media Mentions
                  </label>
                  <input
                    type="number"
                    name="metrics.after.mediaMentions"
                    value={formData.metrics.after.mediaMentions}
                    onChange={handleChange}
                    className="input"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary mr-2"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </div>
            ) : (
              'Add Startup'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}