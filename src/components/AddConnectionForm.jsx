import React, { useState } from 'react';
import { useStartups } from '../context/StartupsContext';

export default function AddConnectionForm({ startupId, onComplete }) {
  const { addConnection } = useStartups();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    startupId,
    contactName: '',
    contactPosition: '',
    contactCompany: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Investment',
    description: '',
    outcome: '',
    status: 'Successful'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate the form
    if (!formData.contactName || !formData.description) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }
    
    setTimeout(() => {
      addConnection(formData);
      setIsSubmitting(false);
      onComplete();
    }, 500); // Simulate API request
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Add New Connection</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Name *
          </label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Position
          </label>
          <input
            type="text"
            name="contactPosition"
            value={formData.contactPosition}
            onChange={handleChange}
            className="input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company/Organization
          </label>
          <input
            type="text"
            name="contactCompany"
            value={formData.contactCompany}
            onChange={handleChange}
            className="input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select"
          >
            <option value="Investment">Investment</option>
            <option value="Partnership">Partnership</option>
            <option value="Media">Media</option>
            <option value="Client">Client</option>
            <option value="Advisor">Advisor</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select"
          >
            <option value="Successful">Successful</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input h-24 resize-none"
          placeholder="Describe the introduction or connection..."
          required
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Outcome
        </label>
        <textarea
          name="outcome"
          value={formData.outcome}
          onChange={handleChange}
          className="input h-24 resize-none"
          placeholder="What was the result of this connection?"
        ></textarea>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onComplete}
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
            'Add Connection'
          )}
        </button>
      </div>
    </form>
  );
}