import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Hillel Fuld Startup Impact Tracker
            </p>
          </div>
          <div className="mt-4 flex justify-center md:mt-0">
            <a 
              href="https://twitter.com/HillelFuld" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Twitter
            </a>
            <span className="mx-2 text-gray-500">•</span>
            <a 
              href="https://www.linkedin.com/in/hillelfuld/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}