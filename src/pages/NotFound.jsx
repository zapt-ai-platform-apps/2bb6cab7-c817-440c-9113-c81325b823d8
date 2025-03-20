import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="bg-red-50 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
        <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
      </div>
      <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
      <p className="text-xl text-slate-600 mb-8">Page not found</p>
      <Link to="/" className="btn btn-primary shadow-md hover:shadow-lg cursor-pointer">
        Return to Dashboard
      </Link>
    </div>
  );
}