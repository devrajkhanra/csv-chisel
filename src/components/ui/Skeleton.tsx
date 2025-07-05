export function Skeleton({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`skeleton rounded-md ${className}`}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 space-y-4 border border-slate-200 dark:border-slate-700">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <Skeleton className="h-12 w-80 rounded-xl" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}