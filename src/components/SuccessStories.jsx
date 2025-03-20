import React from 'react';
import { 
  ChartBarIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

export default function SuccessStories({ stories, startup }) {
  if (stories.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100">
        <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No success stories yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Generate a success story based on the impact data and connections for this startup.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stories.map((story) => (
        <div key={story.id} className="card">
          <h3 className="text-xl font-bold mb-2">{story.title}</h3>
          <p className="text-gray-700 mb-4">{story.summary}</p>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 flex items-center mb-2">
              <ChartBarIcon className="h-5 w-5 mr-1 text-blue-500" />
              Key Results
            </h4>
            <ul className="space-y-1 pl-6 list-disc">
              {story.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-700">{point}</li>
              ))}
            </ul>
          </div>
          
          {story.testimonial && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-gray-700 italic">"{story.testimonial}"</p>
              <p className="text-gray-600 text-sm mt-2">— {story.testimonialAuthor}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}