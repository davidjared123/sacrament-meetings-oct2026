'use client';

import { useSyncExternalStore, Suspense } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}

function getServerSnapshot() {
  return 'Sunday Service';
}

export default function Header() {
  const currentDate = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur sticky top-0 z-50 print:hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Rexburg 1st Ward
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            The Church of Jesus Christ of Latter-day Saints • {currentDate}
          </p>
        </div>

        <Suspense
          fallback={
            <nav className="flex items-center gap-2 text-sm text-slate-400 animate-pulse">
              <span>Home</span>
              <span>All Meetings</span>
              <span>This Sunday</span>
            </nav>
          }
        >
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}
