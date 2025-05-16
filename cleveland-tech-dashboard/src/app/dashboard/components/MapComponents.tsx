'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import { GeocodedOrganization, CLEVELAND_CENTER } from '@/utils/geocoding';
import type { Map as LeafletMap } from 'leaflet';
import L from 'leaflet';

// Need to import Leaflet CSS
import 'leaflet/dist/leaflet.css';

interface MapComponentsProps {
  geocodedOrgs: GeocodedOrganization[];
  selectedIndustry: string | null;
  getIndustryColor: (industry?: string) => string;
  setMapRef: (map: LeafletMap) => void;
}

// Component to control marker visibility based on selected industry
function MarkerController({ selectedIndustry }: { selectedIndustry: string | null }) {
  const map = useMap();
  
  useEffect(() => {
    // We need to wait a bit for all markers to be rendered
    const updateMarkers = () => {
      // Get all markers
      const markers = document.querySelectorAll('.leaflet-marker-pane .leaflet-interactive, .leaflet-pane svg circle');
      
      // Reset all markers if nothing is selected
      if (!selectedIndustry) {
        markers.forEach(marker => {
          // Reset opacity - make sure all markers are fully visible
          marker.setAttribute('opacity', '1');
          marker.setAttribute('stroke-opacity', '1');
          marker.setAttribute('fill-opacity', '0.8');
          marker.setAttribute('stroke-width', '1');
        });
        
        // Also make sure to reset any data-industry markers
        document.querySelectorAll('[data-industry]').forEach(marker => {
          marker.setAttribute('opacity', '1');
          marker.setAttribute('stroke-opacity', '1'); 
          marker.setAttribute('fill-opacity', '0.8');
          marker.setAttribute('stroke-width', '1');
        });
        
        return;
      }
      
      // Otherwise, update opacity based on selected industry
      document.querySelectorAll('[data-industry]').forEach(marker => {
        const industry = marker.getAttribute('data-industry');
        
        if (industry === selectedIndustry) {
          // Highlight selected markers
          marker.setAttribute('opacity', '1');
          marker.setAttribute('stroke-opacity', '1');
          marker.setAttribute('fill-opacity', '0.9');
          marker.setAttribute('stroke-width', '2');
        } else {
          // Fade out others
          marker.setAttribute('opacity', '0.3');
          marker.setAttribute('stroke-opacity', '0.3');
          marker.setAttribute('fill-opacity', '0.3');
        }
      });
    };
    
    // Run after a small delay to ensure DOM is ready
    const timer = setTimeout(updateMarkers, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, [selectedIndustry, map]);
  
  return null;
}

// Fix Leaflet icons
function FixLeafletIcons() {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });
  }, []);
  
  return null;
}

// Get map reference
function GetMapRef({ setMapRef }: { setMapRef: (map: LeafletMap) => void }) {
  const map = useMap();
  
  useEffect(() => {
    setMapRef(map);
  }, [map, setMapRef]);
  
  return null;
}

export default function MapComponents({ 
  geocodedOrgs, 
  selectedIndustry, 
  getIndustryColor,
  setMapRef
}: MapComponentsProps) {
  return (
    <MapContainer
      center={[CLEVELAND_CENTER.lat, CLEVELAND_CENTER.lng]}
      zoom={10}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Fix Leaflet icons */}
      <FixLeafletIcons />
      
      {/* Get map reference */}
      <GetMapRef setMapRef={setMapRef} />
      
      {/* Controller component for marker visibility */}
      <MarkerController selectedIndustry={selectedIndustry} />
      
      {geocodedOrgs.map((org, index) => {
        if (!org.coordinates) return null;
        
        const color = getIndustryColor(org.industry);
        
        return (
          <CircleMarker
            key={index}
            center={[org.coordinates.lat, org.coordinates.lng]}
            radius={6}
            pathOptions={{ 
              fillColor: color, 
              fillOpacity: 0.8,
              color: 'white',
              weight: 1
            }}
            // Add data attribute for filtering
            eventHandlers={{
              add: (e) => {
                // Add data attribute when marker is added to map
                const element = e.target.getElement();
                if (element) {
                  element.setAttribute('data-industry', org.industry || 'Unknown');
                }
              }
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-sm">{org.name}</h3>
                {org.industry && <p className="text-xs mt-1">Industry: {org.industry}</p>}
                {org.url && (
                  <a 
                    href={org.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline block mt-1"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
} 