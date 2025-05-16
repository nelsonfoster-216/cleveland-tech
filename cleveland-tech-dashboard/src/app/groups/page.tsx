import { fetchGroupsData } from '@/utils/data';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function GroupsPage() {
  const groups = await fetchGroupsData();
  
  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Cleveland Tech Groups</h1>
        <p className="text-black max-w-4xl">
          Browse the tech groups in the Cleveland area. Connect with the local tech community and find events to participate in.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-2 text-black">{group.name}</h2>
            {group.description && (
              <p className="text-black mb-4">{group.description}</p>
            )}
            {group.url && (
              <a 
                href={group.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-block mt-2"
              >
                Visit Website
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 