export function SkeletonPost() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full shimmer"></div>
          <div>
            <div className="w-24 h-4 bg-gray-200 rounded mb-1 shimmer"></div>
            <div className="w-16 h-3 bg-gray-200 rounded shimmer"></div>
          </div>
        </div>
        <div className="w-5 h-5 bg-gray-200 rounded shimmer"></div>
      </div>

      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-200 shimmer"></div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Action buttons */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-gray-200 rounded shimmer"></div>
            <div className="w-6 h-6 bg-gray-200 rounded shimmer"></div>
            <div className="w-6 h-6 bg-gray-200 rounded shimmer"></div>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded shimmer"></div>
        </div>

        {/* Like count */}
        <div className="w-20 h-4 bg-gray-200 rounded mb-2 shimmer"></div>

        {/* Caption */}
        <div className="space-y-2 mb-3">
          <div className="w-full h-4 bg-gray-200 rounded shimmer"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded shimmer"></div>
        </div>

        {/* Product tags */}
        <div className="flex gap-2 mb-3">
          <div className="w-20 h-6 bg-gray-200 rounded-full shimmer"></div>
          <div className="w-24 h-6 bg-gray-200 rounded-full shimmer"></div>
          <div className="w-16 h-6 bg-gray-200 rounded-full shimmer"></div>
        </div>

        {/* Comments */}
        <div className="w-32 h-4 bg-gray-200 rounded shimmer"></div>
      </div>
    </div>
  );
}

export function SkeletonFeed() {
  return (
    <div className="px-4 pb-20">
      <div className="max-w-md mx-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </div>
    </div>
  );
}