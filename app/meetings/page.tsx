import type { Metadata } from 'next';
import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';
import { getMeetings } from '@/lib/meetings-db';

export const metadata: Metadata = {
  title: 'All Meetings — Sacrament Meeting Planner',
  description: 'Browse current and past sacrament meeting programs for Rexburg 1st Ward.',
};

async function fetchMeetings(): Promise<SacramentMeeting[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback to internal data module during build/prerender phase
  }
  return getMeetings();
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing <span className="font-semibold text-slate-900 dark:text-white">{meetings.length}</span> scheduled meeting programs
        </p>
      </div>

      {meetings.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-8">
          <p className="text-slate-500">No meeting agendas found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </div>
  );
}

