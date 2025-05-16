'use client';

import { useState } from 'react';
import { industryTrends, researchSources } from '@/utils/industryResearchData';
import TrendCard from './components/TrendCard';
import SourceCard from './components/SourceCard';

export default function IndustryResearchPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'local' | 'global'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter sources based on active tab and search query
  const filteredSources = researchSources.filter(source => {
    // Filter by category
    if (activeTab !== 'all' && source.category !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        source.title.toLowerCase().includes(query) ||
        source.description.toLowerCase().includes(query) ||
        source.publisher.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Get local and global trends
  const localTrends = industryTrends.filter(trend => trend.scope === 'local');
  const globalTrends = industryTrends.filter(trend => trend.scope === 'global');
  
  return (
    <div className="py-8">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Cleveland Tech Industry Research</h1>
        <p className="text-black max-w-4xl">
          Explore key technology trends affecting Cleveland's tech landscape and the global technology industry.
          This research is based on verified sources and provides insights into market growth, technological adoption,
          and business transformation in the tech sector.
        </p>
      </div>
      
      {/* Key Trends Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Key Industry Trends
        </h2>
        
        {/* Cleveland Local Trends */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Cleveland Tech Trends
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localTrends.map(trend => (
              <TrendCard key={trend.id} trend={trend} sources={researchSources} />
            ))}
          </div>
        </div>
        
        {/* Global Trends */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Global Tech Trends
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {globalTrends.map(trend => (
              <TrendCard key={trend.id} trend={trend} sources={researchSources} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Research Sources Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Research Sources
        </h2>
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {/* Category Tabs */}
            <div className="flex bg-gray-200 rounded-lg p-1 self-start">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'all' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-black hover:bg-gray-300'
                }`}
              >
                All Sources
              </button>
              <button
                onClick={() => setActiveTab('local')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'local' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-black hover:bg-gray-300'
                }`}
              >
                Cleveland
              </button>
              <button
                onClick={() => setActiveTab('global')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'global' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-black hover:bg-gray-300'
                }`}
              >
                Global
              </button>
            </div>
            
            {/* Search Box */}
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
          </div>
        </div>
        
        {/* Source Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSources.map(source => (
            <SourceCard key={source.id} source={source} />
          ))}
          
          {filteredSources.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-black">No research sources found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 