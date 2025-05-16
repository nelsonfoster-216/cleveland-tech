'use client';

import { useState } from 'react';
import { IndustryTrend, ResearchSource } from '@/utils/industryResearchData';

interface TrendCardProps {
  trend: IndustryTrend;
  sources: ResearchSource[];
}

export default function TrendCard({ trend, sources }: TrendCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Filter sources to only include those referenced by this trend
  const trendSources = sources.filter(source => trend.sourceIds.includes(source.id));
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-black">{trend.title}</h3>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            trend.scope === 'global' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {trend.scope === 'global' ? 'Global' : 'Cleveland'}
          </span>
        </div>
        
        <p className="text-black mb-4">{trend.description}</p>
        
        <div className="mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <span>{isExpanded ? 'Hide details' : 'Show details'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-semibold text-black mb-2">Key Statistics</h4>
              <ul className="list-disc pl-5 text-sm text-black space-y-1">
                {trend.keyStats.map((stat, index) => (
                  <li key={index}>{stat}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-2">Sources</h4>
              <div className="flex flex-wrap gap-2">
                {trendSources.map(source => (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200"
                  >
                    {source.publisher}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 