'use client';

import { useEffect, useRef } from 'react';
import { Organization } from '@/utils/data';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';

interface TechNetworkGraphProps {
  organizations: Organization[];
}

interface Node {
  id: string;
  type: 'organization' | 'technology';
  name: string;
  x?: number;
  y?: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
}

export default function TechNetworkGraph({ organizations }: TechNetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !organizations.length) return;
    
    // Filter to organizations that have technologies listed
    const orgsWithTech = organizations.filter(org => 
      Array.isArray(org.technologies) && org.technologies.length > 0
    );
    
    // If we don't have any organizations with technologies, show a placeholder
    if (orgsWithTech.length === 0) {
      const placeholderText = document.createElement('div');
      placeholderText.innerHTML = `
        <div class="flex h-full w-full items-center justify-center text-gray-500">
          <p>No technology relationships to display</p>
        </div>
      `;
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(placeholderText);
      return;
    }
    
    // Create nodes and links for the network graph
    const nodes: Node[] = [];
    const links: Link[] = [];
    
    // Add organizations as nodes
    orgsWithTech.slice(0, 30).forEach(org => {
      nodes.push({
        id: `org-${org.name}`,
        type: 'organization',
        name: org.name
      });
      
      // For each technology used by this organization
      org.technologies?.forEach(tech => {
        // Add the technology as a node if not already added
        if (!nodes.some(n => n.id === `tech-${tech}`)) {
          nodes.push({
            id: `tech-${tech}`,
            type: 'technology',
            name: tech
          });
        }
        
        // Add the link between organization and technology
        links.push({
          source: `org-${org.name}`,
          target: `tech-${tech}`
        });
      });
    });
    
    // Pre-compute positions using D3 force simulation
    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(links as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[]).id((d: any) => d.id).distance(50))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(containerRef.current.offsetWidth / 2, containerRef.current.offsetHeight / 2))
      .stop();
    
    // Run the simulation
    for (let i = 0; i < 300; ++i) simulation.tick();
    
    // Now links have proper source and target objects with x,y coordinates
    const linkData = links.map(link => ({
      source: typeof link.source === 'string' ? link.source : link.source.id,
      target: typeof link.target === 'string' ? link.target : link.target.id,
      sourceX: (link.source as any).x,
      sourceY: (link.source as any).y,
      targetX: (link.target as any).x,
      targetY: (link.target as any).y
    }));
    
    try {
      // Create the network graph
      const chart = Plot.plot({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        marginRight: 120,
        style: {
          color: "black",
          backgroundColor: "white"
        },
        marks: [
          Plot.link(linkData, {
            x1: "sourceX",
            y1: "sourceY",
            x2: "targetX",
            y2: "targetY",
            stroke: "#ccc"
          }),
          Plot.dot(nodes, {
            x: "x",
            y: "y",
            r: (d: Node) => d.type === 'organization' ? 6 : 4,
            fill: (d: Node) => d.type === 'organization' ? '#1e40af' : '#15803d',
            title: (d: Node) => `${d.name} (${d.type})`,
            stroke: "white",
            strokeWidth: 1
          }),
          Plot.text(nodes, {
            x: "x",
            y: "y",
            text: (d: Node) => d.name,
            fontSize: (d: Node) => d.type === 'organization' ? 8 : 6,
            fill: "black",
            // @ts-ignore - Plot library type issue with dx
            dx: (d: Node) => d.type === 'organization' ? -8 : 8,
            // @ts-ignore - Plot library type issue with textAnchor
            textAnchor: (d: Node) => d.type === 'organization' ? 'end' : 'start',
            filter: (d: Node, i: number) => d.type === 'organization' ? i % 2 === 0 : i % 2 === 0
          })
        ]
      });
      
      // Append the chart to the container
      containerRef.current.innerHTML = '';
      // @ts-ignore - Plot library return type issue
      containerRef.current.appendChild(chart);
    } catch (error) {
      console.error("Error rendering network graph:", error);
      
      // Show error message
      const errorElement = document.createElement('div');
      errorElement.innerHTML = `
        <div class="flex h-full w-full items-center justify-center text-red-500">
          <p>Error rendering technology network. Please try again later.</p>
        </div>
      `;
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(errorElement);
    }
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [organizations]);
  
  return (
    <div ref={wrapperRef} className="w-full h-full">
      <div ref={containerRef} className="w-full h-[calc(100%-30px)]" />
      <div className="flex items-center justify-end mt-2 pr-4 text-sm h-[30px]">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 rounded-full bg-[#1e40af] mr-2"></div>
          <span>Organization</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#15803d] mr-2"></div>
          <span>Technology</span>
        </div>
      </div>
    </div>
  );
} 