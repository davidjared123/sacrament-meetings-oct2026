'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('An uncaught error occurred in /meetings:', error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-slate-900 border border-rose-500/30 rounded-xl text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center font-bold text-xl">
        !
      </div>
      <h1 className="text-2xl font-bold text-slate-100">Something went wrong!</h1>
      <p className="text-sm text-slate-400">
        An unexpected error occurred while loading sacrament meeting records. Please try again.
      </p>
      <div className="pt-2 flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}
