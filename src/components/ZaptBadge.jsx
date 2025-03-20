import React from 'react';

export default function ZaptBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center bg-white px-3 py-2 rounded-full shadow-md text-xs font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
      >
        <span className="text-slate-800">Made on</span>
        <span className="ml-1 text-primary-600 font-semibold">ZAPT</span>
      </a>
    </div>
  );
}