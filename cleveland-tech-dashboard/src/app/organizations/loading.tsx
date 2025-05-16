export default function Loading() {
  return (
    <div className="py-8">
      <div className="mb-8">
        <div className="h-10 w-80 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      <div className="mb-6">
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="flex gap-3">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md h-44 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 w-40 bg-gray-200 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
} 