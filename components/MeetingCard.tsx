import Link from 'next/link';
import type { SacramentMeeting, MeetingType } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

const meetingTypeLabels: Record<MeetingType, { label: string; badgeClass: string }> = {
  regular: {
    label: 'Regular Meeting',
    badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  },
  testimony: {
    label: 'Fast & Testimony',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  },
  stake: {
    label: 'Stake Conference',
    badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  },
  general: {
    label: 'General Conference',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  },
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  // Format date: 'YYYY-MM-DD' -> 'Sunday, May 3, 2026'
  const [year, month, day] = meeting.date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(dateObj);

  const badgeInfo = meetingTypeLabels[meeting.meetingType] || meetingTypeLabels.regular;

  return (
    <article className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {meeting.date}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeInfo.badgeClass}`}
          >
            {badgeInfo.label}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {formattedDate}
        </h3>

        <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
          <p>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Presiding:</span>{' '}
            {meeting.presiding}
          </p>
          <p>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Conducting:</span>{' '}
            {meeting.conducting}
          </p>
          {meeting.openingHymn?.title && (
            <p className="truncate">
              <span className="font-semibold text-slate-700 dark:text-slate-200">Opening:</span>{' '}
              #{meeting.openingHymn.number} &ldquo;{meeting.openingHymn.title}&rdquo;
            </p>
          )}
          <p>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Items:</span>{' '}
            {meeting.speakers.length} program {meeting.speakers.length === 1 ? 'part' : 'parts'}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 focus:outline-none focus:underline"
          aria-label={`View agenda details for ${formattedDate}`}
        >
          View Program &rarr;
        </Link>
        <span className="text-xs text-slate-400">ID #{meeting.id}</span>
      </div>
    </article>
  );
}

