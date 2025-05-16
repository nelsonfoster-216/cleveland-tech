'use client';

import { useEffect, useState } from 'react';
import { parseIndustryTrendCSV, IndustryDataPoint } from '@/utils/csvParser';

interface IndustryTrendDisplayProps {
  industries: string[];
}

type TrendData = {
  industry: string;
  latestYear: string;
  earliestYear: string;
  latestValue: string;
  earliestValue: string;
  trend: 'up' | 'down' | 'stable' | 'unknown';
  percentChange?: string;
  color: string;
  unit: string;
  scope: 'Global' | 'US' | 'Ohio' | 'Cleveland';
};

export default function IndustryTrendDisplay({ industries }: IndustryTrendDisplayProps) {
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);

  // Define industry colors
  const colorMap: Record<string, string> = {
    'AI': '#ef4444',
    '3D Printing': '#3b82f6',
    'Cloud Services': '#8b5cf6', 
    'Assistive Technology': '#10b981',
    'Aerospace': '#f59e0b',
    'Automotive': '#ec4899',
    'Aviation': '#6366f1',
    'Banking': '#14b8a6',
    'Childcare': '#f97316',
    'Communications': '#64748b'
  };

  // Manual override for geographic scope per industry
  const manualScopeOverrides: Record<string, 'Cleveland' | 'Ohio' | 'US' | 'Global'> = {
    '3D Printing': 'Global',
    'AI': 'Global',
    'Assistive Technology': 'Global',
    'Aviation': 'Cleveland',
    'Cloud Services': 'Global',
    'Aerospace': 'Ohio',
    'Automotive': 'US',
    'Childcare': 'Ohio',
    'Banking': 'Ohio',
    'Communications': 'Cleveland'
  };

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const { years, data } = await parseIndustryTrendCSV('/datasets/tech-industry-trends-2020-2024.csv');
        
        if (data.length === 0) {
          setLoading(false);
          return;
        }

        // Group data by industry
        const industryData = new Map<string, IndustryDataPoint[]>();
        data.forEach(point => {
          if (!industryData.has(point.industry)) {
            industryData.set(point.industry, []);
          }
          industryData.get(point.industry)?.push(point);
        });

        // Process each industry's data
        const processedData: TrendData[] = [];
        
        industryData.forEach((points, industry) => {
          // Only include industries with at least one valid data point
          const validPoints = points.filter(p => p.hasValue);
          if (validPoints.length === 0) return;
          
          // Sort by year
          validPoints.sort((a, b) => parseInt(a.year) - parseInt(b.year));
          
          const earliestPoint = validPoints[0];
          const latestPoint = validPoints[validPoints.length - 1];
          
          // Skip if we don't have a valid comparison
          if (!earliestPoint || !latestPoint || earliestPoint.year === latestPoint.year) return;
          
          // Calculate trend
          let trend: 'up' | 'down' | 'stable' | 'unknown' = 'unknown';
          let percentChange: string | undefined;
          
          if (earliestPoint.hasValue && latestPoint.hasValue) {
            if (latestPoint.value > earliestPoint.value) {
              trend = 'up';
            } else if (latestPoint.value < earliestPoint.value) {
              trend = 'down';
            } else {
              trend = 'stable';
            }
            
            // Calculate percent change if we have numeric values
            const change = ((latestPoint.value - earliestPoint.value) / earliestPoint.value) * 100;
            percentChange = `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
          } else {
            // Use the trend from the latest point if available
            trend = latestPoint.trend;
          }
          
          // Clean unit for display
          let unit = earliestPoint.unit || latestPoint.unit || '';
          
          // Format the values for display - removing citations, formatting numbers
          const formatValue = (point: IndustryDataPoint) => {
            if (!point.hasValue) {
              // For non-numeric data, extract main part and remove citations
              return point.originalText
                .replace(/\[\d+\]/g, '')  // Remove citation markers
                .split('(')[0].trim();    // Keep only the first part before any parentheses
            }
            
            // For numeric values, just return the formatted number
            return point.value.toLocaleString();
          };
          
          // Determine geographic scope from original text
          const determineScope = (point: IndustryDataPoint): 'Global' | 'US' | 'Ohio' | 'Cleveland' => {
            const text = point.originalText.toLowerCase();
            
            if (text.includes('cleveland')) {
              return 'Cleveland';
            } else if (text.includes('ohio') || text.includes('northeast ohio')) {
              return 'Ohio';
            } else if (text.includes('us') || text.match(/\bu\.?s\.?\b/)) {
              return 'US';
            } else {
              return 'Global';
            }
          };
          
          // Get scope from either point - prioritize earliest (if both differ, we'll use the earliest's scope)
          const scope = manualScopeOverrides[industry] || determineScope(earliestPoint);
          
          // Add to processed data
          processedData.push({
            industry,
            earliestYear: earliestPoint.year,
            latestYear: latestPoint.year,
            earliestValue: formatValue(earliestPoint),
            latestValue: formatValue(latestPoint),
            trend,
            percentChange,
            color: colorMap[industry] || '#6b7280', // Default to gray if no color defined
            unit,
            scope
          });
        });
        
        // Sort by industries with most growth
        const sortedData = processedData.sort((a, b) => {
          // First sort by trend: up > stable > down > unknown
          const trendOrder: Record<string, number> = { 'up': 3, 'stable': 2, 'down': 1, 'unknown': 0 };
          const trendCompare = trendOrder[b.trend] - trendOrder[a.trend];
          
          // If same trend, sort by industry name
          if (trendCompare === 0) {
            return a.industry.localeCompare(b.industry);
          }
          
          return trendCompare;
        });
        
        setTrendData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error('Error processing industry trend data:', error);
        setLoading(false);
      }
    };
    
    fetchAndProcessData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (trendData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-16">
        No trend data available for industries.
      </div>
    );
  }
  
  // Icon and trend indicators
  const getTrendIcon = (trend: 'up' | 'down' | 'stable' | 'unknown') => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500 font-bold text-xl">↑</span>;
      case 'down':
        return <span className="text-red-500 font-bold text-xl">↓</span>;
      case 'stable':
        return <span className="text-blue-500 font-bold text-xl">→</span>;
      default:
        return <span className="text-gray-500 font-bold text-xl">•</span>;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trendData.map((item, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 transition-transform hover:shadow-lg hover:-translate-y-1"
          style={{ borderLeftColor: item.color }}
        >
          <div className="p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg text-gray-800 truncate" title={item.industry}>{item.industry}</h3>
              {getTrendIcon(item.trend)}
            </div>
            
            <div className="flex flex-col space-y-3">
              {/* Trend visualization */}
              <div className="flex items-center space-x-2">
                <div className="w-20 text-sm font-semibold text-gray-900">{item.earliestYear}</div>
                <div className="h-2 flex-1 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${item.trend === 'up' ? 'bg-green-500' : item.trend === 'down' ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: item.trend === 'up' ? '100%' : item.trend === 'down' ? '33%' : '66%' }} 
                  ></div>
                </div>
                <div className="w-20 text-sm font-semibold text-gray-900 text-right">{item.latestYear}</div>
              </div>

              {/* Values */}
              <div className="flex justify-between items-center pt-2">
                <div className="flex flex-col">
                  <div className="text-xs font-semibold text-gray-800">Initial</div>
                  <div className="flex items-baseline">
                    <span className="text-sm font-semibold text-gray-900">{item.earliestValue}</span>
                    {item.unit && <span className="text-xs font-medium text-gray-800 ml-1 whitespace-nowrap">{item.unit}</span>}
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  <div className="text-xs font-semibold text-gray-800">Latest</div>
                  <div className="flex items-baseline justify-end">
                    <span className="text-sm font-bold text-gray-900">{item.latestValue}</span>
                    {item.unit && <span className="text-xs font-medium text-gray-800 ml-1 whitespace-nowrap">{item.unit}</span>}
                  </div>
                  {item.percentChange && (
                    <span className={`text-xs font-bold ${item.trend === 'up' ? 'text-green-700' : item.trend === 'down' ? 'text-red-700' : 'text-blue-700'}`}>
                      {item.percentChange}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Geographic Scope Tag */}
              <div className="mt-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-md font-semibold text-sm ${
                  item.scope === 'Cleveland' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                  item.scope === 'Ohio' ? 'bg-green-100 text-green-800 border border-green-300' :
                  item.scope === 'US' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                  'bg-gray-100 text-gray-800 border border-gray-300'
                }`}>
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  {item.scope}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 