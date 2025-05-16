/**
 * Utility functions for parsing CSV files with complex formats
 */

export interface IndustryDataPoint {
  industry: string;
  year: string;
  value: number;
  normalizedValue: number;
  unit: string;
  originalText: string;
  hasValue: boolean; // Flag to indicate if the data point has a valid numeric value
  trend: 'up' | 'down' | 'stable' | 'unknown'; // Trend direction
}

/**
 * Parses a specialized CSV format containing industry trend data
 * Handles complexities like citations, bracketed content, and mixed data types
 */
export async function parseIndustryTrendCSV(csvUrl: string): Promise<{
  years: string[];
  data: IndustryDataPoint[];
}> {
  try {
    // Fetch the CSV data
    const response = await fetch(csvUrl);
    const csvData = await response.text();
    
    // Parse the CSV data - handling the special format
    const lines = csvData.split('\n');
    
    // Extract years from header row
    const headerLine = lines[0].replace(/"/g, '');
    const headerParts = headerLine.split(',');
    const years = headerParts.slice(1);
    
    if (years.length === 0) {
      throw new Error('Could not parse header row');
    }
    
    const parsedData: IndustryDataPoint[] = [];
    
    // Process each industry line
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      
      // Extract industry and data cells
      const line = lines[i].replace(/^"|"$/g, '');
      const industryMatch = line.match(/^([^,]+),/);
      if (!industryMatch) continue;
      
      const industry = industryMatch[1].trim();
      
      // Split the rest of the line into cells
      let content = line.substring(industry.length + 1);
      
      // Handle the complex CSV format with nested quotes and brackets
      const cells: string[] = [];
      let currentCell = '';
      let quoteCount = 0;
      let bracketDepth = 0;
      
      for (let j = 0; j < content.length; j++) {
        const char = content[j];
        
        if (char === '"') {
          quoteCount++;
        } else if (char === '[') {
          bracketDepth++;
        } else if (char === ']') {
          bracketDepth--;
        } else if (char === ',' && (quoteCount % 2 === 0) && bracketDepth === 0) {
          cells.push(currentCell.trim());
          currentCell = '';
          continue;
        }
        
        currentCell += char;
      }
      
      if (currentCell.trim()) {
        cells.push(currentCell.trim());
      }
      
      // Process each cell
      cells.forEach((cell, idx) => {
        if (!cell || idx >= years.length) return;
        
        const year = years[idx];
        const originalText = cell.replace(/"/g, '').trim();
        
        if (!originalText) return;
        
        // Extract numeric value if available
        let value = 0;
        let unit = '';
        let hasValue = false;
        let trend: 'up' | 'down' | 'stable' | 'unknown' = 'unknown';
        
        // Look for numeric values in the text
        const numericMatch = originalText.match(/(\d+\.?\d*)/);
        
        if (numericMatch) {
          value = parseFloat(numericMatch[0]);
          hasValue = true;
          
          // Determine the unit based on text content
          if (originalText.includes('Billion USD')) {
            unit = 'Billion USD';
          } else if (originalText.includes('Million')) {
            unit = 'Million';
          } else if (originalText.match(/\d+%/) || originalText.includes('Growth')) {
            unit = '% Growth';
            
            // Extract percentage if available
            const percentMatch = originalText.match(/(\d+\.?\d*)%/);
            if (percentMatch) {
              value = parseFloat(percentMatch[1]);
            }
          } else if (originalText.includes('Households')) {
            unit = 'Households';
          } else {
            unit = 'Count';
          }
          
          // Determine trend
          if (originalText.includes('Growth') || originalText.includes('Increase')) {
            trend = 'up';
          } else if (originalText.includes('Decline') || originalText.includes('Decrease')) {
            trend = 'down';
          } else if (originalText.includes('Stable') || originalText.includes('Unchanged')) {
            trend = 'stable';
          }
        } else {
          // Handle purely textual data
          if (originalText.includes('Growth') || originalText.includes('Increase')) {
            trend = 'up';
          } else if (originalText.includes('Decline') || originalText.includes('Decrease')) {
            trend = 'down';
          } else if (originalText.includes('Stable') || originalText.includes('Unchanged')) {
            trend = 'stable';
          }
        }
        
        parsedData.push({
          industry,
          year,
          value,
          normalizedValue: 0, // Will be calculated later
          unit,
          originalText,
          hasValue,
          trend
        });
      });
    }
    
    // Only keep industries with at least 2 data points for better visualization
    const industryDataPoints: Record<string, number> = {};
    parsedData.forEach(point => {
      if (point.hasValue) {
        industryDataPoints[point.industry] = (industryDataPoints[point.industry] || 0) + 1;
      }
    });
    
    const filteredData = parsedData.filter(point => industryDataPoints[point.industry] >= 2);
    
    // Group by industry to normalize within each industry
    const industriesInData = [...new Set(filteredData.map(d => d.industry))];
    
    industriesInData.forEach(industry => {
      const industryPoints = filteredData.filter(d => d.industry === industry);
      if (industryPoints.length === 0) return;
      
      // Find min and max values for this industry (only for points with values)
      const validPoints = industryPoints.filter(p => p.hasValue);
      if (validPoints.length < 2) return;
      
      const values = validPoints.map(d => d.value);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const range = maxValue - minValue;
      
      // Normalize each data point
      industryPoints.forEach(point => {
        if (point.hasValue) {
          if (range === 0) {
            point.normalizedValue = 0.5; // If all values are the same
          } else {
            point.normalizedValue = (point.value - minValue) / range;
          }
        }
      });
    });
    
    return { years, data: filteredData };
  } catch (error) {
    console.error('Error parsing industry trend CSV:', error);
    return { years: [], data: [] };
  }
} 