'use client';

import { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';

interface IndustryBarChartProps {
  data: Record<string, number>;
}

export default function IndustryBarChart({ data }: IndustryBarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || Object.keys(data).length === 0) return;
    
    // Transform the data for Plot - limit to top 30 for better readability
    const plotData = Object.entries(data)
      .map(([industry, count]) => ({ industry, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30); // Limit to top 30 industries for better spacing
    
    // Create the Plot chart
    const chart = Plot.plot({
      marginLeft: 220, // Further increased left margin for labels
      marginRight: 60,
      marginTop: 40,
      marginBottom: 60, // Increased bottom margin for x-axis labels
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
      y: {
        label: "Industry",
        domain: plotData.map(d => d.industry),
        padding: 0.6, // Further increased padding between bars
      },
      x: {
        label: "Number of Organizations",
        grid: true,
        tickSpacing: 80, // Increased spacing between x-axis ticks
      },
      color: {
        scheme: "blues"
      },
      marks: [
        Plot.barX(plotData, {
          y: "industry",
          x: "count",
          fill: "count",
          sort: { y: "-x" },
          title: (d) => `${d.industry}: ${d.count} organizations`,
          rx: 4, // Rounded corners for bars
          strokeWidth: 1,
          stroke: "white",
        }),
        Plot.ruleX([0]),
        Plot.textX(plotData, {
          y: "industry",
          x: "count",
          text: (d) => d.count.toString(),
          dx: 8,
          fontSize: 14,
          fontWeight: "bold",
          fill: "black"
        }),
      ],
    });
    
    // Append the chart to the container
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(chart);
    
    // After chart is rendered, update the axis labels to be black
    setTimeout(() => {
      if (containerRef.current) {
        const textElements = containerRef.current.querySelectorAll('text');
        textElements.forEach(el => {
          el.setAttribute('fill', 'black');
          
          // Increase font size for y-axis labels (industry names)
          if (el.getAttribute('text-anchor') === 'end') {
            el.setAttribute('font-size', '13px');
            // Add slight spacing between characters
            el.setAttribute('letter-spacing', '0.3px');
          }
          
          // Increase font size for x-axis labels
          if (el.getAttribute('text-anchor') === 'middle') {
            el.setAttribute('font-size', '14px');
            el.setAttribute('font-weight', 'bold');
          }
        });
        
        // Make x-axis label larger and bolder
        const xAxisLabel = containerRef.current.querySelector('.plot-x-label');
        if (xAxisLabel) {
          xAxisLabel.setAttribute('font-size', '16px');
          xAxisLabel.setAttribute('font-weight', 'bold');
        }
        
        // Make y-axis label larger and bolder
        const yAxisLabel = containerRef.current.querySelector('.plot-y-label');
        if (yAxisLabel) {
          yAxisLabel.setAttribute('font-size', '16px');
          yAxisLabel.setAttribute('font-weight', 'bold');
        }
      }
    }, 100);
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [data]);
  
  return (
    <div ref={containerRef} className="w-full h-full" />
  );
} 