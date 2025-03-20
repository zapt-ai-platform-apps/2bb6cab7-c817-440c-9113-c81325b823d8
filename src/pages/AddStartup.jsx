import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStartups } from '../context/StartupsContext';
import { ArrowLeftIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function AddStartup() {
  const navigate = useNavigate();
  const { addStartup } = useStartups();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [animateStep, setAnimateStep] = useState(true);
  
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
  
  useEffect(() => {
    setAnimateStep(false);
    const timer = setTimeout(() => {
      setAnimateStep(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [currentStep]);
  
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
  
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
  
  // Determine if the current step is valid to enable the next button
  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.name && formData.founder && formData.industry;
    }
    return true;
  };
  
  // Progress indicator based on steps
  const Progress = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm mb-2 transition-colors duration-300 ${
                step < currentStep 
                  ? 'bg-primary-600 text-white' 
                  : step === currentStep 
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-500' 
                    : 'bg-slate-100 text-slate-500'
              }`}
            >
              {step < currentStep ? '✓' : step}
            </div>
            <span className={`text-xs ${
              step <= currentStep ? 'text-primary-700 font-medium' : 'text-slate-500'
            }`}>
              {step === 1 ? 'Basics' : step === 2 ? 'Before' : 'After'}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="h-1 w-full bg-slate-100 rounded-full"></div>
        <div 
          className="absolute top-0 left-0 h-1 bg-primary-500 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        ></div>
      </div>
    </div>
  );
  
  return (
    <div>
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-primary-600 hover:text-primary-700 mb-6 cursor-pointer transition-colors duration-200"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        <span>Back to Dashboard</span>
      </button>
      
      <div className="flex items-center mb-6">
        <BuildingOfficeIcon className="h-7 w-7 text-primary-600 mr-3" />
        <h1 className="text-2xl sm:text-3xl font-bold">Add New Startup</h1>
      </div>
      
      <div className="card">
        <Progress />
        
        <form onSubmit={handleSubmit}>
          <div className={`transition-all duration-500 ${animateStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {currentStep === 1 && (
              <section>
                <h2 className="text-lg font-semibold mb-4 text-slate-900">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">
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
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
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
            )}
            
            {currentStep === 2 && (
              <section>
                <h2 className="text-lg font-semibold mb-4 text-slate-900">Metrics Before Hillel's Involvement</h2>
                <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 mb-4">
                  <p className="text-sm text-slate-600 italic mb-4">
                    Enter metrics that represent the startup's status before Hillel Fuld's involvement.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
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
                      <label className="block text-sm font-medium text-slate-700 mb-1">
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
                      <label className="block text-sm font-medium text-slate-700 mb-1">
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
              </section>
            )}
            
            {currentStep === 3 && (
              <section>
                <h2 className="text-lg font-semibold mb-4 text-slate-900">Metrics After Hillel's Involvement</h2>
                <div className="p-5 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                  <p className="text-sm text-slate-600 italic mb-4">
                    Enter metrics that represent the startup's improved status after Hillel Fuld's involvement.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Funding Raised ($)
                      </label>
                      <input
                        type="number"
                        name="metrics.after.fundingRaised"
                        value={formData.metrics.after.fundingRaised}
                        onChange={handleChange}
                        className="input"
                        min={formData.metrics.before.fundingRaised}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Users/Clients
                      </label>
                      <input
                        type="number"
                        name="metrics.after.userGrowth"
                        value={formData.metrics.after.userGrowth}
                        onChange={handleChange}
                        className="input"
                        min={formData.metrics.before.userGrowth}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Media Mentions
                      </label>
                      <input
                        type="number"
                        name="metrics.after.mediaMentions"
                        value={formData.metrics.after.mediaMentions}
                        onChange={handleChange}
                        className="input"
                        min={formData.metrics.before.mediaMentions}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
          
          <div className="pt-6 border-t border-slate-200 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-secondary cursor-pointer"
              >
                Previous
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn btn-secondary cursor-pointer"
              >
                Cancel
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary cursor-pointer"
                disabled={!isStepValid()}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary cursor-pointer"
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
            )}
          </div>
        </form>
      </div>
    </div>
  );
}