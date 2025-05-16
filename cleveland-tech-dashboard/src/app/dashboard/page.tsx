import { fetchOrganizationData, getOrganizationsByIndustry, getTopTechnologies, getUniqueIndustries } from '@/utils/data';
import IndustryBarChart from './components/IndustryBarChart';
import TechnologyBarChart from './components/TechnologyBarChart';
import StatCard from './components/StatCard';
import ClevelandTechMap from './components/ClevelandTechMap';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const organizations = await fetchOrganizationData();
  const industryData = getOrganizationsByIndustry(organizations);
  const topTechnologies = getTopTechnologies(organizations, 10);
  const industries = getUniqueIndustries(organizations);
  
  // Calculate stats
  const totalOrganizations = organizations.length;
  const uniqueIndustries = Object.keys(industryData).length;
  const uniqueTechnologies = Object.keys(
    organizations.reduce((acc, org) => {
      if (Array.isArray(org.technologies)) {
        org.technologies.forEach(tech => { acc[tech] = true; });
      }
      return acc;
    }, {} as Record<string, boolean>)
  ).length;
  
  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Cleveland Tech Dashboard</h1>
        <p className="text-black max-w-4xl">
          Visualizations and insights about the Cleveland tech ecosystem based on data from the Cleveland Tech repository.
        </p>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Organizations" 
          value={totalOrganizations} 
          icon="🏢"
        />
        <StatCard 
          title="Industries" 
          value={uniqueIndustries} 
          icon="🏭"
        />
        <StatCard 
          title="Technologies" 
          value={uniqueTechnologies} 
          icon="💻"
        />
      </div>
      
      {/* Map Visualization */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-black">Cleveland Tech Map</h2>
        <p className="text-sm text-black mb-4">
          Geographic distribution of tech organizations in the Cleveland area. 
          <em className="block mt-1">Note: Map displays a mix of geocoded locations and approximated positions based on organization data.</em>
        </p>
        <div className="h-[400px]">
          <ClevelandTechMap organizations={organizations} />
        </div>
      </div>
      
      {/* Charts - Now stacked vertically */}
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4 text-black">Organizations by Industry</h2>
          <div className="h-[650px]">
            <IndustryBarChart data={industryData} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-black">Top Technologies</h2>
          <div className="h-[550px]">
            <TechnologyBarChart data={topTechnologies} />
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">About the Data</h3>
        <p className="text-sm text-black">
          This dashboard visualizes data from the <a href="https://github.com/mrfright/cleveland-tech" className="underline" target="_blank" rel="noopener noreferrer">Cleveland Tech GitHub repository</a>. 
          The data is updated periodically and reflects the known tech organizations in the Cleveland area.
        </p>
      </div>
    </div>
  );
} 