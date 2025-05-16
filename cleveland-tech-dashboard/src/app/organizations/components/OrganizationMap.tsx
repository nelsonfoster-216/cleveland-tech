'use client';

import { useEffect, useState, useRef } from 'react';
import { Organization } from '@/utils/data';
import { GeocodedOrganization, CLEVELAND_CENTER, batchGeocodeOrganizations } from '@/utils/geocoding';
import dynamic from 'next/dynamic';
import type { Map as LeafletMap } from 'leaflet';

// Need to use dynamic imports for Leaflet components to avoid SSR issues
const MapComponents = dynamic(
  () => import('@/app/organizations/components/MapComponents'),
  { 
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    ),
    ssr: false 
  }
);

interface OrganizationMapProps {
  organizations: Organization[];
  selectedIndustry: string | null;
  onIndustryChange?: (industry: string | null) => void;
}

// Get color for industry
const getIndustryColor = (industry?: string): string => {
  const industryColors: Record<string, string> = {
    'Software': '#3b82f6',
    'Healthcare': '#ec4899',
    'Manufacturing': '#22c55e',
    'IT Services': '#8b5cf6',
    'Finance': '#f59e0b',
    'Digital Agency': '#ef4444',
    'Enterprise Software': '#0ea5e9',
    'Insurance': '#84cc16',
    'Marketing': '#f43f5e',
    'E-commerce': '#14b8a6',
    'Consulting': '#a855f7',
    'Education': '#6366f1', 
  };
  
  return industry && industryColors[industry] 
    ? industryColors[industry] 
    : '#9ca3af'; // Default gray
};

export default function OrganizationMap({ organizations, selectedIndustry, onIndustryChange }: OrganizationMapProps) {
  const [geocodedOrgs, setGeocodedOrgs] = useState<GeocodedOrganization[]>([]);
  const [loading, setLoading] = useState(true);
  const [localSelectedIndustry, setLocalSelectedIndustry] = useState<string | null>(selectedIndustry);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  // Sync the local state with the prop
  useEffect(() => {
    setLocalSelectedIndustry(selectedIndustry);
  }, [selectedIndustry]);

  // Effect to load geocoded data
  useEffect(() => {
    async function geocodeOrganizations() {
      setLoading(true);
      try {
        // First check if we already have cached data in localStorage
        const cachedData = localStorage.getItem('geocodedOrganizations');
        
        if (cachedData) {
          console.log('Using cached geocoded data');
          setGeocodedOrgs(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
        
        // If no cached data, perform geocoding
        // Limit to 10 real geocoded orgs to avoid too many API calls
        const geocodedResults = await batchGeocodeOrganizations(organizations, 10);
        
        // Cache the results
        localStorage.setItem('geocodedOrganizations', JSON.stringify(geocodedResults));
        
        setGeocodedOrgs(geocodedResults);
      } catch (error) {
        console.error('Error geocoding organizations:', error);
      } finally {
        setLoading(false);
      }
    }
    
    geocodeOrganizations();
  }, [organizations]);

  // Handle industry click for filtering
  const handleIndustryClick = (industry: string) => {
    if (localSelectedIndustry === industry) {
      // Clicking the same industry again deselects it
      clearFilter();
    } else {
      setLocalSelectedIndustry(industry);
      // Notify parent component of industry change
      onIndustryChange?.(industry);
    }
  };

  // Function to clear the filter
  const clearFilter = () => {
    setLocalSelectedIndustry(null);
    // Notify parent component that filter was cleared
    onIndustryChange?.(null);
    
    // Force reset of all markers immediately
    setTimeout(() => {
      // Reset all circle markers - both general markers and those with data-industry
      const markers = document.querySelectorAll('.leaflet-marker-pane .leaflet-interactive, .leaflet-pane svg circle');
      markers.forEach(marker => {
        marker.setAttribute('opacity', '1');
        marker.setAttribute('stroke-opacity', '1');
        marker.setAttribute('fill-opacity', '0.8');
        marker.setAttribute('stroke-width', '1');
      });
      
      // Specifically target data-industry markers to ensure they're reset
      document.querySelectorAll('[data-industry]').forEach(marker => {
        marker.setAttribute('opacity', '1');
        marker.setAttribute('stroke-opacity', '1');
        marker.setAttribute('fill-opacity', '0.8');
        marker.setAttribute('stroke-width', '1');
      });
      
      // Force a repaint to ensure changes are visible
      setTimeout(() => {
        const container = document.querySelector('.leaflet-container') as HTMLElement;
        if (container) {
          const display = container.style.display;
          container.style.display = 'none';
          void container.offsetHeight; // Trigger reflow
          container.style.display = display;
        }
      }, 10);
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map data...</p>
        </div>
      </div>
    );
  }

  // Only show organizations with coordinates
  const orgsWithCoordinates = geocodedOrgs.filter(org => org.coordinates);

  // Get array of unique industries
  const uniqueIndustries = Array.from(
    new Set(geocodedOrgs.map(org => org.industry).filter(Boolean))
  ).sort();

  return (
    <div className="w-full h-full rounded-md overflow-hidden relative" ref={containerRef}>
      {localSelectedIndustry && (
        <button 
          onClick={clearFilter}
          className="absolute top-3 left-3 z-[1000] bg-white px-3 py-1.5 rounded-md shadow-md border border-gray-200 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex items-center clear-filter-button"
        >
          <span className="mr-1">×</span> Clear Filter
        </button>
      )}
      
      <MapComponents 
        geocodedOrgs={orgsWithCoordinates} 
        selectedIndustry={localSelectedIndustry}
        getIndustryColor={getIndustryColor}
        setMapRef={(map: LeafletMap) => { mapRef.current = map; }}
      />
      
      {/* Interactive Legend */}
      <div className="absolute top-3 right-3 bg-white p-3 rounded-lg shadow-md z-[1000] max-h-[calc(100%-20px)] overflow-y-auto border border-gray-200 map-legend">
        <h4 className="font-bold mb-2 text-sm text-center border-b pb-1 text-black">Map Legend</h4>
        <div className="text-[10px] text-black mb-2">Click to filter by industry</div>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {Object.entries({
            'Software': '#3b82f6',
            'Healthcare': '#ec4899',
            'Manufacturing': '#22c55e',
            'IT Services': '#8b5cf6',
            'Finance': '#f59e0b',
            'Digital Agency': '#ef4444',
            'Enterprise Software': '#0ea5e9',
            'Insurance': '#84cc16',
            'Marketing': '#f43f5e',
            'E-commerce': '#14b8a6',
            'Consulting': '#a855f7',
            'Education': '#6366f1'
          }).sort().map(([industry, color]) => (
            <div 
              key={industry} 
              className={`flex items-center px-1 py-0.5 rounded cursor-pointer transition-colors ${
                localSelectedIndustry === industry ? 'bg-blue-100 font-medium' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleIndustryClick(industry)}
            >
              <div 
                className="w-4 h-4 rounded-full mr-2 flex-shrink-0 border border-white shadow-sm" 
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-xs text-black">{industry}</span>
              {localSelectedIndustry === industry && (
                <span className="ml-auto text-xs">✓</span>
              )}
            </div>
          ))}
        </div>
        {localSelectedIndustry && (
          <button 
            onClick={clearFilter}
            className="w-full mt-2 pt-1 text-[10px] text-blue-600 border-t hover:text-blue-800 clear-filter-button"
          >
            Clear Filter
          </button>
        )}
        {!localSelectedIndustry && (
          <div className="text-[10px] text-black mt-2 pt-1 border-t">
            Click on markers for details
          </div>
        )}
      </div>
    </div>
  );
} 