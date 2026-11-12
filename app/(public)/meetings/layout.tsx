import React from 'react';
import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Meetings Section Sub-header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 print:hidden">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Sacrament Meeting Agendas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Select a Sunday service to view the complete order of meeting or print bulletin copies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/meetings"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          >
            All Dates
          </Link>
          <Link
            href="/meetings/current"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            This Sunday
          </Link>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}

