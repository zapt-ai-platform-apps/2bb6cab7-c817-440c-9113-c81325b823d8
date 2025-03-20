import React from 'react';
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  CalendarIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

export default function ConnectionsList({ connections }) {
  // Sort connections by date, newest first
  const sortedConnections = [...connections].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  // Function to get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'successful': return 'bg-green-100 text-green-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get type badge color
  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'investment': return 'bg-emerald-100 text-emerald-800';
      case 'partnership': return 'bg-purple-100 text-purple-800';
      case 'media': return 'bg-blue-100 text-blue-800';
      case 'client': return 'bg-amber-100 text-amber-800';
      case 'advisor': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (connections.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100">
        <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No connections yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start adding key connections and introductions to track their impact.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {sortedConnections.map((connection) => (
        <div key={connection.id} className="card">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
            <div className="flex-1">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  {connection.contactName}
                </h3>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <span className="font-medium">{connection.contactPosition}</span>
                <span className="mx-1">•</span>
                <span>{connection.contactCompany}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className={`badge ${getTypeColor(connection.type)}`}>
                {connection.type}
              </span>
              <span className={`badge ${getStatusColor(connection.status)}`}>
                {connection.status}
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{formatDate(connection.date)}</span>
          </div>
          
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Introduction</h4>
            <p className="text-gray-600">{connection.description}</p>
          </div>
          
          {connection.outcome && (
            <div className="pt-3 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" />
                Outcome
              </h4>
              <p className="text-gray-600">{connection.outcome}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}