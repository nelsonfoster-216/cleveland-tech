'use client';

import { useState } from 'react';
import { Organization } from '@/utils/data';
import { scrapeEmailsFromWebsite, ScrapedEmail, formatEmailForDisplay } from '@/utils/emailScraper';

interface EmailFinderProps {
  organization: Organization;
  onEmailFound: (email: string) => void;
}

export default function EmailFinder({ organization, onEmailFound }: EmailFinderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<ScrapedEmail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const findEmails = async () => {
    if (!organization.url) {
      setError('No website URL available for this organization');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const foundEmails = await scrapeEmailsFromWebsite(organization.url);
      setEmails(foundEmails);
      if (foundEmails.length === 0) {
        setError('No email addresses found on the organization website');
      }
    } catch (err) {
      setError('Error finding emails: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseEmail = (email: string) => {
    onEmailFound(email);
    setIsOpen(false);
  };

  if (organization.email) {
    return null; // Don't show the finder if we already have an email
  }

  return (
    <div className="mt-2">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="text-sm text-blue-600 hover:underline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Find contact email
        </button>
      )}

      {isOpen && (
        <div className="mt-2 bg-gray-50 p-3 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Find Contact Email</h4>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!isLoading && emails.length === 0 && !error && (
            <div className="text-center mb-3">
              <p className="text-sm text-gray-600 mb-3">
                This will search the organization's website for potential contact emails.
              </p>
              <button
                onClick={findEmails}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                Search Website
              </button>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center my-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 p-2 rounded-md text-sm mb-3">
              {error}
            </div>
          )}

          {emails.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Found {emails.length} potential contact{emails.length > 1 ? 's' : ''}:
              </p>
              <ul className="space-y-2">
                {emails.map((emailInfo, index) => (
                  <li key={index} className="text-sm flex justify-between items-center bg-white p-2 rounded border border-gray-200">
                    <div>
                      <div className="font-medium">{emailInfo.email}</div>
                      <div className="text-gray-500 text-xs">{formatEmailForDisplay(emailInfo.email)}</div>
                    </div>
                    <button
                      onClick={() => handleUseEmail(emailInfo.email)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Use this
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 