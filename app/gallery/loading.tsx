import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // Different heights for masonry layout effect
  const skeletonHeights = [
    'h-64', 'h-80', 'h-72', 'h-96',
    'h-72', 'h-64', 'h-88', 'h-80',
    'h-96', 'h-72', 'h-80', 'h-64'
  ];

  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-10 w-48 mx-auto" />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 p-6">
          {skeletonHeights.map((height, index) => (
            <Skeleton 
              key={index} 
              className={`${height} w-full rounded-xl mb-6 break-inside-avoid animate-pulse`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}