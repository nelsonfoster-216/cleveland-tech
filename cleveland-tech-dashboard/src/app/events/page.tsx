import { fetchEventsData } from '@/utils/data';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const events = await fetchEventsData();
  
  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Cleveland Tech Events</h1>
        <p className="text-black max-w-4xl">
          Discover tech events in the Cleveland area. Attend conferences, meetups, and hackathons to network and learn.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-2 text-black">{event.name}</h2>
            {event.description && (
              <p className="text-black mb-4">{event.description}</p>
            )}
            {event.url && (
              <a 
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-block mt-2"
              >
                Event Website
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 