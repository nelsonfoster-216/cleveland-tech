'use client';

import { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';

interface TechnologyBarChartProps {
  data: [string, number][];
}

export default function TechnologyBarChart({ data }: TechnologyBarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;
    
    // Transform the data for Plot
    const plotData = data.map(([technology, count]) => ({ technology, count }));
    
    // Create the Plot chart
    const chart = Plot.plot({
      marginLeft: 220,
      marginRight: 60,
      marginTop: 40,
      marginBottom: 60,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
      y: {
        label: "Technology",
        domain: plotData.map(d => d.technology),
        padding: 0.6,
      },
      x: {
        label: "Number of Organizations",
        grid: true,
        tickSpacing: 80,
      },
      color: {
        scheme: "greens"
      },
      marks: [
        Plot.barX(plotData, {
          y: "technology",
          x: "count",
          fill: "count",
          sort: { y: "-x" },
          title: (d) => `${d.technology}: ${d.count} organizations`,
          rx: 4,
          strokeWidth: 1,
          stroke: "white",
        }),
        Plot.ruleX([0]),
        Plot.textX(plotData, {
          y: "technology",
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
          
          if (el.getAttribute('text-anchor') === 'end') {
            el.setAttribute('font-size', '13px');
            el.setAttribute('letter-spacing', '0.3px');
          }
          
          if (el.getAttribute('text-anchor') === 'middle') {
            el.setAttribute('font-size', '14px');
            el.setAttribute('font-weight', 'bold');
          }
        });
        
        const xAxisLabel = containerRef.current.querySelector('.plot-x-label');
        if (xAxisLabel) {
          xAxisLabel.setAttribute('font-size', '16px');
          xAxisLabel.setAttribute('font-weight', 'bold');
        }
        
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