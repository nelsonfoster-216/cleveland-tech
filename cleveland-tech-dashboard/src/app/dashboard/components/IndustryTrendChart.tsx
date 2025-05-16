'use client';

import { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';
import { parseIndustryTrendCSV, IndustryDataPoint } from '@/utils/csvParser';

interface IndustryTrendChartProps {
  industries: string[];
}

export default function IndustryTrendChart({ industries }: IndustryTrendChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const renderChart = async () => {
      try {
        // Use the utility function to parse the CSV
        const { years, data } = await parseIndustryTrendCSV('/datasets/tech-industry-trends-2020-2024.csv');
        
        if (data.length === 0) {
          console.error('No valid data found in CSV');
          return;
        }
        
        // Group data by industry to ensure consistent handling
        const industriesMap = new Map<string, IndustryDataPoint[]>();
        data.forEach(point => {
          if (!industriesMap.has(point.industry)) {
            industriesMap.set(point.industry, []);
          }
          industriesMap.get(point.industry)?.push(point);
        });
        
        // Sort industries by data completeness for better visualization
        const sortedIndustries = Array.from(industriesMap.entries())
          .sort((a, b) => {
            // Sort by number of valid data points (descending)
            const aValidPoints = a[1].filter(p => p.hasValue).length;
            const bValidPoints = b[1].filter(p => p.hasValue).length;
            return bValidPoints - aValidPoints;
          })
          .map(([industry]) => industry);
        
        // Filter to top industries with most complete data for readability
        const topIndustries = sortedIndustries.slice(0, 7);
        const filteredData = data.filter(d => topIndustries.includes(d.industry));
        
        // Create a more readable tooltip function
        const tooltipFormat = (d: IndustryDataPoint) => {
          let trendIndicator = '';
          if (d.trend === 'up') trendIndicator = '↑ ';
          else if (d.trend === 'down') trendIndicator = '↓ ';
          
          if (d.hasValue) {
            let valueText = `${d.value.toLocaleString()}`;
            if (d.unit) valueText += ` ${d.unit}`;
            return `${d.industry} (${d.year}): ${trendIndicator}${valueText}`;
          } else {
            return `${d.industry} (${d.year}): ${d.originalText}`;
          }
        };

        // Create the Plot chart with clear axes and improved styling
        const chart = Plot.plot({
          width: containerRef.current!.offsetWidth,
          height: containerRef.current!.offsetHeight,
          marginRight: 120, // Add space for labels
          x: {
            type: "point",
            domain: years,
            label: "Year"
          },
          y: {
            grid: true,
            label: "Growth (Normalized by Industry)",
            domain: [0, 1],
            tickFormat: () => "" // Hide Y-axis numbers for clarity
          },
          color: {
            legend: true,
            domain: topIndustries,
            scheme: "category10"
          },
          marks: [
            // Only draw lines between points that have actual values
            ...topIndustries.map(industry => {
              const industryPoints = filteredData
                .filter(d => d.industry === industry && d.hasValue)
                .sort((a, b) => years.indexOf(a.year) - years.indexOf(b.year));
              
              return Plot.line(industryPoints, {
                x: "year",
                y: "normalizedValue",
                stroke: d => d.industry,
                strokeWidth: 2.5,
                curve: "monotone-x", // Use monotone-x for more natural trends
                tip: true
              });
            }),
            Plot.dot(filteredData.filter(d => d.hasValue), {
              x: "year",
              y: "normalizedValue",
              stroke: "industry",
              fill: "white",
              strokeWidth: 2,
              r: 4,
              title: tooltipFormat
            }),
            // Add clear labels on the right side
            Plot.text(filteredData.filter(d => 
              d.hasValue && 
              d.year === years[years.length - 1] && 
              topIndustries.includes(d.industry)
            ), {
              x: "year",
              y: "normalizedValue",
              text: "industry",
              dx: 15,
              dy: 0,
              fontSize: 12,
              fontWeight: "bold",
              fill: "industry",
              textAnchor: "start"
            })
          ]
        });
        
        // Append the chart to the container
        containerRef.current!.innerHTML = '';
        containerRef.current!.appendChild(chart);
      } catch (error) {
        console.error('Error rendering industry trend chart:', error);
      }
    };
    
    renderChart();
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="w-full h-full" />
  );
} 