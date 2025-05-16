'use client';

import { useState, useCallback, useEffect } from 'react';
import { Organization } from '@/utils/data';
import OrganizationMap from './OrganizationMap';
import SearchBar from './SearchBar';
import EmailFinder from './EmailFinder';
import { exportOrganizationsToCSV, downloadCSV } from '@/utils/exportData';

interface OrganizationCardProps {
  organization: Organization;
  onEmailFound: (email: string) => void;
}

function OrganizationCard({ organization, onEmailFound }: OrganizationCardProps) {
  const [orgData, setOrgData] = useState<Organization>(organization);
  
  const {
    name,
    industry,
    description,
    url,
    email,
    social,
  } = orgData;

  const handleEmailFound = (newEmail: string) => {
    setOrgData({
      ...orgData,
      email: newEmail
    });
    onEmailFound(newEmail);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-black">{name}</h3>
        {industry && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {industry}
          </span>
        )}
      </div>
      
      {description && (
        <p className="text-black mb-4">{description}</p>
      )}
      
      <div className="flex flex-wrap gap-2 mt-4">
        {url && (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm flex items-center"
          >
            Website
          </a>
        )}
        
        {email && (
          <a 
            href={`mailto:${email}`}
            className="text-green-600 hover:underline text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact
          </a>
        )}
        
        {social?.github && (
          <a 
            href={social.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:underline text-sm flex items-center"
          >
            GitHub
          </a>
        )}
        
        {social?.twitter && (
          <a 
            href={social.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm flex items-center"
          >
            Twitter
          </a>
        )}
        
        {social?.linkedin && (
          <a 
            href={social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline text-sm flex items-center"
          >
            LinkedIn
          </a>
        )}
      </div>
      
      <EmailFinder organization={orgData} onEmailFound={handleEmailFound} />
    </div>
  );
}

interface OrganizationListProps {
  organizations: Organization[];
  industries: string[];
}

type ViewMode = 'list' | 'map' | 'table';

export default function OrganizationList({ organizations, industries }: OrganizationListProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchResults, setSearchResults] = useState<Organization[]>(organizations);
  const [organizationsWithEmails, setOrganizationsWithEmails] = useState<Map<string, string>>(new Map());
  const [selectedEmails, setSelectedEmails] = useState<Map<string, boolean>>(new Map());
  const [selectAll, setSelectAll] = useState<boolean>(false);
  
  // Apply both search results and industry filter
  const filteredOrganizations = selectedIndustry
    ? searchResults.filter(org => org.industry === selectedIndustry)
    : searchResults;
  
  // Handle search results from SearchBar
  const handleSearchResults = useCallback((results: Organization[]) => {
    setSearchResults(results);
  }, []);

  // Handle industry selection from map
  const handleMapIndustryChange = useCallback((industry: string | null) => {
    setSelectedIndustry(industry || '');
  }, []);
  
  // Export organizations with contact information to CSV
  const handleExport = useCallback(() => {
    // Create a copy of filtered organizations with any added emails
    const exportOrgs = filteredOrganizations.map(org => {
      const email = organizationsWithEmails.get(org.name) || org.email;
      return { ...org, email };
    });
    
    const csvData = exportOrganizationsToCSV(exportOrgs);
    downloadCSV(csvData, 'cleveland_tech_organizations.csv');
  }, [filteredOrganizations, organizationsWithEmails]);
  
  // Track organizations with emails for export
  const trackEmailFound = useCallback((org: Organization, email: string) => {
    setOrganizationsWithEmails(prev => {
      const newMap = new Map(prev);
      newMap.set(org.name, email);
      return newMap;
    });
  }, []);

  // Handle email selection toggle
  const toggleEmailSelection = useCallback((orgName: string, email: string) => {
    setSelectedEmails(prev => {
      const newMap = new Map(prev);
      if (newMap.has(orgName)) {
        newMap.delete(orgName);
      } else {
        newMap.set(orgName, true);
      }
      return newMap;
    });
  }, []);

  // Handle select all toggle
  const toggleSelectAll = useCallback(() => {
    setSelectAll(prev => !prev);
    
    if (!selectAll) {
      // Select all organizations with emails
      const newSelectedEmails = new Map();
      filteredOrganizations.forEach(org => {
        const email = organizationsWithEmails.get(org.name) || org.email;
        if (email) {
          newSelectedEmails.set(org.name, true);
        }
      });
      setSelectedEmails(newSelectedEmails);
    } else {
      // Deselect all
      setSelectedEmails(new Map());
    }
  }, [selectAll, filteredOrganizations, organizationsWithEmails]);

  // Get selected email addresses
  const getSelectedEmails = useCallback(() => {
    const emails: string[] = [];
    
    selectedEmails.forEach((_, orgName) => {
      const org = filteredOrganizations.find(o => o.name === orgName);
      if (org) {
        const email = organizationsWithEmails.get(org.name) || org.email;
        if (email) {
          emails.push(email);
        }
      }
    });
    
    return emails;
  }, [selectedEmails, filteredOrganizations, organizationsWithEmails]);

  // Open email client with selected emails
  const handleSendEmail = useCallback(() => {
    const emails = getSelectedEmails();
    if (emails.length > 0) {
      window.location.href = `mailto:?bcc=${emails.join(',')}`;
    }
  }, [getSelectedEmails]);

  // Copy selected emails to clipboard
  const handleCopyEmails = useCallback(() => {
    const emails = getSelectedEmails();
    if (emails.length > 0) {
      navigator.clipboard.writeText(emails.join(', '))
        .then(() => {
          alert(`${emails.length} email addresses copied to clipboard!`);
        })
        .catch(err => {
          console.error('Failed to copy emails: ', err);
          alert('Failed to copy emails to clipboard');
        });
    }
  }, [getSelectedEmails]);

  // Update selectAll state when all organizations with emails are selected
  useEffect(() => {
    const organizationsWithEmailsCount = filteredOrganizations.filter(org => 
      organizationsWithEmails.has(org.name) || org.email
    ).length;
    
    setSelectAll(selectedEmails.size === organizationsWithEmailsCount && organizationsWithEmailsCount > 0);
  }, [selectedEmails, filteredOrganizations, organizationsWithEmails]);
  
  return (
    <div>
      {/* Search Bar */}
      <SearchBar 
        organizations={organizations} 
        onSearchResults={handleSearchResults} 
      />
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <label htmlFor="industry-filter" className="block text-sm font-medium text-black mb-2">
              Filter by Industry
            </label>
            <div className="flex gap-3">
              <select
                id="industry-filter"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full max-w-xs text-black bg-white"
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              
              {selectedIndustry && (
                <button
                  onClick={() => setSelectedIndustry('')}
                  className="px-3 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-black">View:</span>
            <div className="flex bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-black hover:bg-gray-300'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-md ${
                  viewMode === 'table' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-black hover:bg-gray-300'
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md ${
                  viewMode === 'map' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-black hover:bg-gray-300'
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-3">
          <p className="text-sm text-black">
            Showing {filteredOrganizations.length} of {organizations.length} organizations
          </p>
          
          <div className="flex flex-wrap gap-2">
            {viewMode === 'table' && selectedEmails.size > 0 && (
              <>
                <button
                  onClick={handleSendEmail}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email ({selectedEmails.size})
                </button>
                
                <button
                  onClick={handleCopyEmails}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Email Addresses
                </button>
              </>
            )}
            
            <button
              onClick={handleExport}
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export to CSV
            </button>
          </div>
        </div>
      </div>
      
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizations.map((org, index) => {
            const handleEmailFoundWrapper = (email: string) => {
              trackEmailFound(org, email);
            };
            
            return (
              <OrganizationCard 
                key={`${org.name}-${index}`} 
                organization={org} 
                onEmailFound={handleEmailFoundWrapper}
              />
            );
          })}
          
          {filteredOrganizations.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-black">No organizations found with the selected criteria.</p>
            </div>
          )}
        </div>
      )}
      
      {viewMode === 'table' && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-xs text-black uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-3 py-3 w-6">
                  <div className="flex items-center">
                    <input
                      id="select-all-checkbox"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                    <label htmlFor="select-all-checkbox" className="sr-only">Select All</label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">Organization Name</th>
                <th scope="col" className="px-6 py-3">Industry</th>
                <th scope="col" className="px-6 py-3">Website</th>
                <th scope="col" className="px-6 py-3">Contact Email</th>
                <th scope="col" className="px-6 py-3">Location</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrganizations.map((org, index) => {
                const email = organizationsWithEmails.get(org.name) || org.email;
                const isSelected = selectedEmails.has(org.name);
                
                return (
                  <tr key={`${org.name}-${index}`} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-4 w-6">
                      {email && (
                        <div className="flex items-center">
                          <input
                            id={`checkbox-${index}`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            checked={isSelected}
                            onChange={() => toggleEmailSelection(org.name, email)}
                          />
                          <label htmlFor={`checkbox-${index}`} className="sr-only">Select {org.name}</label>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">{org.name}</td>
                    <td className="px-6 py-4">{org.industry || '-'}</td>
                    <td className="px-6 py-4">
                      {org.url ? (
                        <a 
                          href={org.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Website
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      {email ? (
                        <a 
                          href={`mailto:${email}`}
                          className="text-green-600 hover:underline"
                        >
                          {email}
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4">{org.location || 'Cleveland Area'}</td>
                    <td className="px-6 py-4">
                      {!email && org.url && (
                        <button
                          onClick={() => {
                            const finder = document.getElementById(`email-finder-${index}`);
                            if (finder) {
                              finder.classList.toggle('hidden');
                            }
                          }}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Find email
                        </button>
                      )}
                      <div id={`email-finder-${index}`} className="hidden mt-2">
                        <EmailFinder 
                          organization={org} 
                          onEmailFound={(newEmail) => trackEmailFound(org, newEmail)} 
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {filteredOrganizations.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    No organizations found with the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {viewMode === 'map' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-[600px]">
            <OrganizationMap
              organizations={searchResults} 
              selectedIndustry={selectedIndustry || null}
              onIndustryChange={handleMapIndustryChange}
            />
          </div>
          {filteredOrganizations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-black">No organizations found with the selected criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 