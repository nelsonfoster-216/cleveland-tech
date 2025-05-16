'use client';

import { useEffect, useRef } from 'react';
import { Organization } from '@/utils/data';
import * as Plot from '@observablehq/plot';

interface IndustryTechHeatmapProps {
  organizations: Organization[];
}

export default function IndustryTechHeatmap({ organizations }: IndustryTechHeatmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !organizations.length) return;
    
    // Filter to organizations that have both industry and technologies
    const validOrgs = organizations.filter(org => 
      org.industry && Array.isArray(org.technologies) && org.technologies.length > 0
    );
    
    // If we don't have valid data, show a placeholder
    if (validOrgs.length === 0) {
      const placeholderText = document.createElement('div');
      placeholderText.innerHTML = `
        <div class="flex h-full w-full items-center justify-center text-gray-500">
          <p>No industry-technology data available</p>
        </div>
      `;
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(placeholderText);
      return;
    }
    
    // Get top industries and technologies
    const industries = Array.from(new Set(validOrgs.map(org => org.industry))).filter(Boolean).slice(0, 10) as string[];
    
    // Count technologies across all organizations
    const techCounts: Record<string, number> = {};
    validOrgs.forEach(org => {
      org.technologies?.forEach(tech => {
        techCounts[tech] = (techCounts[tech] || 0) + 1;
      });
    });
    
    // Get top technologies
    const topTechnologies = Object.entries(techCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([tech]) => tech);
    
    // Generate heatmap data
    const heatmapData: {industry: string; technology: string; count: number}[] = [];
    
    // For each industry-technology pair, count occurrences
    industries.forEach(industry => {
      const orgsInIndustry = validOrgs.filter(org => org.industry === industry);
      
      topTechnologies.forEach(tech => {
        // Count organizations in this industry using this technology
        const count = orgsInIndustry.filter(org => 
          org.technologies?.includes(tech)
        ).length;
        
        heatmapData.push({
          industry,
          technology: tech,
          count
        });
      });
    });
    
    // Create the Plot heatmap
    const chart = Plot.plot({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
      marginLeft: 150,
      marginBottom: 100,
      x: {
        domain: topTechnologies,
        label: "Technology",
      },
      y: {
        domain: industries,
        label: "Industry",
      },
      color: {
        type: "linear",
        scheme: "YlOrRd",
        legend: true,
        label: "Number of Organizations"
      },
      marks: [
        Plot.cell(heatmapData, {
          x: "technology",
          y: "industry",
          fill: "count",
          title: d => `${d.industry} - ${d.technology}: ${d.count} organizations`,
        }),
        Plot.text(heatmapData, {
          x: "technology",
          y: "industry",
          text: d => d.count > 0 ? d.count.toString() : "",
          fill: d => d.count > 3 ? "white" : "black",
          fontSize: 10,
        }),
      ],
      style: {
        backgroundColor: "white",
      }
    });
    
    // Append the chart to the container
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(chart);
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [organizations]);
  
  return (
    <div ref={containerRef} className="w-full h-full" />
  );
} 