import React from 'react';
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <p className="text-sm text-slate-500">
              &copy; {currentYear} Hillel Fuld Startup Impact Tracker
            </p>
          </div>
          <div className="mt-4 flex justify-center md:mt-0 space-x-4">
            <a 
              href="https://twitter.com/HillelFuld" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary-600 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaTwitter className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/hilzfuld/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary-600 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}