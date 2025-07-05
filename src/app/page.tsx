import { Suspense } from 'react';
import HeaderNav from '@/components/HeaderNav';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        <Hero />
        <Suspense fallback={<PageSkeleton />}>
          <HeaderNav />
        </Suspense>
      </div>
    </main>
  );
}