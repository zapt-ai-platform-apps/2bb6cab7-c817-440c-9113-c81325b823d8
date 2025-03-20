import React from 'react';
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  CalendarIcon, 
  CheckCircleIcon,
  ChatBubbleBottomCenterTextIcon
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
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="bg-slate-50 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto">
          <BuildingOfficeIcon className="h-7 w-7 text-slate-400" />
        </div>
        <h3 className="mt-4 text-xl font-medium text-slate-900">No connections yet</h3>
        <p className="mt-2 text-slate-500 max-w-md mx-auto">
          Start adding key connections and introductions to track their impact.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {sortedConnections.map((connection, index) => (
        <div 
          key={connection.id} 
          className="card card-hover"
        >
          <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="bg-slate-100 p-1.5 rounded-full mr-2">
                  <UserIcon className="h-4 w-4 text-slate-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {connection.contactName}
                </h3>
              </div>
              <div className="flex items-center mt-1 text-sm text-slate-600">
                <span className="font-medium">{connection.contactPosition}</span>
                {connection.contactPosition && connection.contactCompany && (
                  <span className="mx-1">•</span>
                )}
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
          
          <div className="flex items-center text-sm text-slate-500 mb-3">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{formatDate(connection.date)}</span>
          </div>
          
          <div className="mb-3">
            <div className="flex items-center text-sm font-medium text-slate-700 mb-1">
              <ChatBubbleBottomCenterTextIcon className="h-4 w-4 mr-1 text-slate-400" />
              Introduction
            </div>
            <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">{connection.description}</p>
          </div>
          
          {connection.outcome && (
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center text-sm font-medium text-slate-700 mb-1">
                <CheckCircleIcon className="h-4 w-4 mr-1 text-emerald-500" />
                Outcome
              </div>
              <p className="text-slate-600 bg-emerald-50 p-3 rounded-lg">{connection.outcome}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}