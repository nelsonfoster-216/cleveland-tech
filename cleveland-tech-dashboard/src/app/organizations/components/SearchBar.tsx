'use client';

import { useState, useEffect } from 'react';
import { Organization } from '@/utils/data';

interface SearchBarProps {
  organizations: Organization[];
  onSearchResults: (results: Organization[]) => void;
}

export default function SearchBar({ organizations, onSearchResults }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<'name' | 'technology' | 'all'>('all');
  
  // Update search results when query or category changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      // If search is empty, return all organizations
      onSearchResults(organizations);
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    
    const results = organizations.filter(org => {
      if (searchCategory === 'name' || searchCategory === 'all') {
        if (org.name.toLowerCase().includes(query)) {
          return true;
        }
      }
      
      if (searchCategory === 'technology' || searchCategory === 'all') {
        if (Array.isArray(org.technologies) && org.technologies.some(tech => 
          tech.toLowerCase().includes(query)
        )) {
          return true;
        }
      }
      
      return false;
    });
    
    onSearchResults(results);
  }, [searchQuery, searchCategory, organizations, onSearchResults]);
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div>
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value as 'name' | 'technology' | 'all')}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
          >
            <option value="all">All Fields</option>
            <option value="name">Name</option>
            <option value="technology">Technology</option>
          </select>
        </div>
      </div>
      
      {searchQuery && (
        <p className="mt-2 text-sm text-black">
          {searchCategory === 'all' && `Searching in all fields for "${searchQuery}"`}
          {searchCategory === 'name' && `Searching in organization names for "${searchQuery}"`}
          {searchCategory === 'technology' && `Searching in technologies for "${searchQuery}"`}
        </p>
      )}
    </div>
  );
} 