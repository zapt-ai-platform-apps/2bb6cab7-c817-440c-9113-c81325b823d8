import React from 'react';
import { 
  ChartBarIcon, 
  DocumentTextIcon,
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline';

export default function SuccessStories({ stories, startup }) {
  if (stories.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="bg-slate-50 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto">
          <DocumentTextIcon className="h-7 w-7 text-slate-400" />
        </div>
        <h3 className="mt-4 text-xl font-medium text-slate-900">No success stories yet</h3>
        <p className="mt-2 text-slate-500 max-w-md mx-auto">
          Generate a success story based on the impact data and connections for this startup.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stories.map((story) => (
        <div key={story.id} className="card card-hover">
          <h3 className="text-xl font-bold mb-3 text-primary-700">{story.title}</h3>
          <p className="text-slate-700 mb-6 bg-slate-50 p-4 rounded-lg border-l-4 border-primary-400">{story.summary}</p>
          
          <div className="mb-6">
            <h4 className="font-medium text-slate-800 flex items-center mb-3">
              <ChartBarIcon className="h-5 w-5 mr-2 text-primary-500" />
              Key Results
            </h4>
            <ul className="space-y-2 pl-6">
              {story.keyPoints.map((point, index) => (
                <li key={index} className="text-slate-700 flex items-start">
                  <span className="inline-block w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex-shrink-0 text-xs flex items-center justify-center mr-2 mt-0.5 font-semibold">{index + 1}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {story.testimonial && (
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-5 rounded-lg border border-primary-100">
              <div className="flex items-center mb-3">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-primary-500 mr-2" />
                <h4 className="font-medium text-primary-700">Testimonial</h4>
              </div>
              <p className="text-slate-700 italic">"{story.testimonial}"</p>
              <p className="text-slate-600 text-sm mt-3 font-medium">— {story.testimonialAuthor}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}