'use client';

import { ResearchSource } from '@/utils/industryResearchData';
import Image from 'next/image';
import { useState } from 'react';

interface SourceCardProps {
  source: ResearchSource;
}

export default function SourceCard({ source }: SourceCardProps) {
  const [imageError, setImageError] = useState(false);

  // Function to determine if the image URL is external or local
  const isExternalImage = (url?: string) => {
    if (!url) return false;
    return url.startsWith('http');
  };

  // Create a placeholder image with the publisher name
  const renderPlaceholder = () => (
    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center p-2">
      <div className="text-blue-600 font-bold text-lg px-4 text-center">{source.publisher}</div>
    </div>
  );
  
  return (
    <a 
      href={source.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
    >
      <div className="relative h-40 w-full overflow-hidden bg-blue-50">
        {source.imageUrl && !imageError ? (
          <Image
            src={source.imageUrl}
            alt={source.title}
            fill={true}
            sizes="(max-width: 768px) 100vw, 300px"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            priority={false}
            loading="lazy"
          />
        ) : (
          renderPlaceholder()
        )}
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-medium">
          {source.category === 'local' ? 'Cleveland' : 'Global'}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">{source.date}</div>
          <div className="text-xs text-gray-500">{source.publisher}</div>
        </div>
        
        <h3 className="font-bold text-black mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {source.title}
        </h3>
        
        <p className="text-sm text-gray-700 line-clamp-3">
          {source.description}
        </p>
        
        <div className="mt-3 text-blue-600 text-sm font-medium flex items-center">
          Read more
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </a>
  );
} 