'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between border-t border-slate-800 pt-6 mt-8"
    >
      <div>
        {currentPage > 1 ? (
          <Link
            href={createPageURL(currentPage - 1)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
          >
            ← Previous
          </Link>
        ) : (
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-slate-900/40 rounded-md cursor-not-allowed">
            ← Previous
          </span>
        )}
      </div>

      <span className="text-sm text-slate-400 font-medium">
        Page <span className="text-slate-100 font-semibold">{currentPage}</span> of{' '}
        <span className="text-slate-100 font-semibold">{totalPages}</span>
      </span>

      <div>
        {currentPage < totalPages ? (
          <Link
            href={createPageURL(currentPage + 1)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
          >
            Next →
          </Link>
        ) : (
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-slate-900/40 rounded-md cursor-not-allowed">
            Next →
          </span>
        )}
      </div>
    </nav>
  );
}
