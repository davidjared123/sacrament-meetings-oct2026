import { Suspense } from 'react';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Meetings — Sacrament Meeting Planner',
  description: 'Browse current and past sacrament meeting programs.',
};

async function MeetingsList({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query ?? '';
  const currentPage = Number(resolvedParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <>
      {meetings.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-dashed border-slate-800 p-8">
          <p className="text-slate-400">
            No meeting agendas found{query ? ` for "${query}"` : ''}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </>
  );
}

export default function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-100">Sacrament Meeting Agendas</h1>
        <p className="text-sm text-slate-400">
          Filter agendas by speaker, leader, or meeting type with instant pagination.
        </p>
      </div>

      <MeetingSearch />

      <Suspense fallback={<div className="p-8 text-slate-400 animate-pulse">Loading agendas...</div>}>
        <MeetingsList searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
