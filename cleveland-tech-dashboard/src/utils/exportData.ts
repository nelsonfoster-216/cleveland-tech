import { Organization } from './data';

/**
 * Converts data to CSV format
 * @param data Array of data objects
 * @param headers Object mapping column names to header labels
 * @returns CSV string
 */
export function convertToCSV<T extends Record<string, any>>(
  data: T[],
  headers: Record<string, string>
): string {
  // Create CSV header row
  const headerRow = Object.values(headers).join(',');
  
  // Create data rows
  const rows = data.map(item => {
    return Object.keys(headers)
      .map(key => {
        const value = item[key];
        
        // Handle null or undefined
        if (value === null || value === undefined) {
          return '';
        }
        
        // Convert objects to string representation
        if (typeof value === 'object') {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        
        // Escape quotes and wrap in quotes if value contains commas or quotes
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        
        return stringValue;
      })
      .join(',');
  });
  
  // Combine header and data rows
  return [headerRow, ...rows].join('\n');
}

/**
 * Export organization data to CSV
 * @param organizations List of organizations
 * @returns CSV string
 */
export function exportOrganizationsToCSV(organizations: Organization[]): string {
  const headers = {
    name: 'Organization Name',
    industry: 'Industry',
    url: 'Website',
    email: 'Contact Email',
    location: 'Location'
  };
  
  return convertToCSV(organizations, headers);
}

/**
 * Download data as a CSV file
 * @param data CSV string data
 * @param filename Filename for the downloaded file
 */
export function downloadCSV(data: string, filename: string = 'export.csv'): void {
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 