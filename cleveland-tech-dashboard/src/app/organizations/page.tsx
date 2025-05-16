import { fetchOrganizationData, getUniqueIndustries } from '@/utils/data';
import OrganizationList from './components/OrganizationList';

export const dynamic = 'force-dynamic';

export default async function OrganizationsPage() {
  const organizations = await fetchOrganizationData();
  const industries = getUniqueIndustries(organizations);
  
  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Cleveland Tech Organizations</h1>
        <p className="text-black max-w-4xl mb-2">
          Browse the tech organizations in the Cleveland area. Use the filter to narrow down by industry.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <strong>New Feature:</strong> Contact information is now available for selected organizations. For those without contact details, use the "Find contact email" option to search their website for potential contact information.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <OrganizationList 
        organizations={organizations} 
        industries={industries} 
      />
    </div>
  );
} 