export default function Loading() {
  return (
    <div className="py-8">
      <div className="mb-8">
        <div className="h-10 w-80 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      {/* Stats Loading */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts Loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-[400px] bg-gray-100 rounded animate-pulse"></div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-[400px] bg-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
} 