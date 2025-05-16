import Link from 'next/link';

export default function WhitepaperPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-6 text-white">White Paper Coming Soon</h1>
        <p className="text-xl text-white mb-8">
          We're currently updating our industry growth trends analysis with more accurate data.
          The whitepaper will be available again after further research and validation.
        </p>
        <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
} 