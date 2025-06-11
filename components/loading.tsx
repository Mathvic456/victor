"use client"

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-white/20 border-t-white`} />
    </div>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="space-y-4">
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
          <div className="h-32 bg-white/10 rounded"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-white/10 rounded w-16"></div>
            <div className="h-6 bg-white/10 rounded w-20"></div>
            <div className="h-6 bg-white/10 rounded w-14"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <div className="h-48 bg-white/10"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-white/10 rounded w-3/4"></div>
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-2/3"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-white/10 rounded w-16"></div>
          <div className="h-6 bg-white/10 rounded w-20"></div>
        </div>
      </div>
    </div>
  )
}
