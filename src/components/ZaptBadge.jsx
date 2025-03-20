import React from 'react';

export default function ZaptBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center bg-white px-3 py-2 rounded-full shadow-md text-xs font-medium transition-all hover:shadow-lg"
      >
        <span className="text-gray-900">Made on</span>
        <span className="ml-1 text-blue-600 font-semibold">ZAPT</span>
      </a>
    </div>
  );
}