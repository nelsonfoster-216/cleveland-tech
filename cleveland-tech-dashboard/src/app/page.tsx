import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Cleveland Tech Dashboard</h1>
        <p className="text-xl text-black max-w-3xl mx-auto">
          Explore tech organizations, groups, and events in the Cleveland area and discover insights through interactive visualizations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-3 text-blue-700">Organization Directory</h2>
          <p className="mb-6 text-black">
            Browse through Cleveland's tech organizations, filter by industry, and discover new companies.
          </p>
          <Link 
            href="/organizations" 
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Organizations
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-3 text-blue-700">Tech Groups</h2>
          <p className="mb-6 text-black">
            Find local tech groups, meetups, and communities to join and connect with like-minded professionals.
          </p>
          <Link 
            href="/groups" 
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Groups
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-3 text-blue-700">Tech Events</h2>
          <p className="mb-6 text-black">
            Discover conferences, hackathons, and workshops happening in the Cleveland area.
          </p>
          <Link 
            href="/events" 
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Events
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-3 text-blue-700">Data Dashboard</h2>
          <p className="mb-6 text-black">
            Explore interactive visualizations showing key insights about Cleveland's tech ecosystem.
          </p>
          <Link 
            href="/dashboard" 
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Dashboard
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-3 text-blue-700">Industry Research</h2>
          <p className="mb-6 text-black">
            Access verified industry trends, research sources, and key statistics about Cleveland's technology sector.
          </p>
          <Link 
            href="/industry-research" 
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Research
          </Link>
        </div>
      </div>
    </div>
  );
}
