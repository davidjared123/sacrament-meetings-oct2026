'use client';

import Link from 'next/link';
import type { SacramentMeeting, MeetingType } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

const typeDescriptions: Record<MeetingType, string> = {
  regular: 'Regular Sacrament Meeting',
  testimony: 'Fast & Testimony Meeting',
  stake: 'Stake Conference (Non-sacrament meeting)',
  general: 'General Conference Broadcast',
};

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const [year, month, day] = meeting.date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(dateObj);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/meetings"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          &larr; Back to all meetings
        </Link>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Print this sacrament meeting program"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print Program
        </button>
      </div>

      {/* Program Bulletin Card (Print-optimized) */}
      <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm print:border-none print:shadow-none print:p-0 print:dark:bg-white print:dark:text-black">
        {/* Header Block */}
        <header className="text-center border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 print:border-slate-400">
          <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold mb-1 print:text-slate-600">
            Rexburg 1st Ward • Rexburg Idaho Stake
          </p>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white print:text-black">
            Sacrament Meeting
          </h1>
          <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mt-1 print:text-slate-700">
            {typeDescriptions[meeting.meetingType] || 'Sacrament Meeting'}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 print:text-slate-800 font-medium">
            {formattedDate}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-sm print:border-slate-300">
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300 print:text-black">
                Presiding:
              </span>{' '}
              <span className="text-slate-800 dark:text-slate-200 print:text-black">{meeting.presiding}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300 print:text-black">
                Conducting:
              </span>{' '}
              <span className="text-slate-800 dark:text-slate-200 print:text-black">{meeting.conducting}</span>
            </div>
          </div>
        </header>

        {/* Announcements (if present) */}
        {meeting.announcements && meeting.announcements.length > 0 && (
          <section className="mb-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 print:bg-transparent print:border-slate-300">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Announcements
            </h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300 print:text-black">
              {meeting.announcements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Meeting Program Flow */}
        <section className="space-y-6">
          <div className="flex justify-between items-baseline border-b border-dotted border-slate-300 dark:border-slate-700 pb-2">
            <span className="font-medium text-sm text-slate-700 dark:text-slate-300 print:text-black">
              Opening Hymn
            </span>
            <span className="text-sm text-right text-slate-900 dark:text-white print:text-black font-semibold">
              #{meeting.openingHymn.number} &ldquo;{meeting.openingHymn.title}&rdquo;
            </span>
          </div>

          <div className="flex justify-between items-baseline border-b border-dotted border-slate-300 dark:border-slate-700 pb-2">
            <span className="font-medium text-sm text-slate-700 dark:text-slate-300 print:text-black">
              Invocation (Opening Prayer)
            </span>
            <span className="text-sm text-right text-slate-800 dark:text-slate-200 print:text-black">
              {meeting.openingPrayer}
            </span>
          </div>

          {/* Ward & Stake Business */}
          {(meeting.stakeBusiness || meeting.wardBusiness.length > 0) && (
            <div className="py-2 px-3 rounded-lg bg-blue-50/50 dark:bg-slate-800/40 border border-blue-100 dark:border-slate-800 text-sm print:bg-transparent print:border-slate-300">
              <span className="font-bold text-xs uppercase tracking-wider text-blue-900 dark:text-blue-300 block mb-1">
                Ward & Stake Business
              </span>
              {meeting.stakeBusiness && (
                <p className="text-xs italic text-blue-800 dark:text-blue-200 mb-1">
                  Stake business conducted by representative of the stake presidency.
                </p>
              )}
              {meeting.wardBusiness.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300 print:text-black">
                  {meeting.wardBusiness.map((b, idx) => (
                    <li key={idx}>{b.description}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500 italic">No ward business items.</p>
              )}
            </div>
          )}

          {/* Sacrament Hymn */}
          <div className="flex justify-between items-baseline border-b border-dotted border-slate-300 dark:border-slate-700 pb-2">
            <span className="font-medium text-sm text-slate-700 dark:text-slate-300 print:text-black">
              Sacrament Hymn
            </span>
            <span className="text-sm text-right text-slate-900 dark:text-white print:text-black font-semibold">
              #{meeting.sacramentHymn.number} &ldquo;{meeting.sacramentHymn.title}&rdquo;
            </span>
          </div>

          <div className="text-center py-2 text-xs uppercase tracking-widest text-slate-500 italic">
            Administration of the Sacrament by the Priesthood
          </div>

          {/* Speakers and Musical Items */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Speakers & Messages
            </h2>
            {meeting.speakers.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-baseline py-2 border-b border-slate-100 dark:border-slate-800 text-sm"
              >
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white print:text-black">
                    {item.name}
                  </span>
                  {item.type === 'musical-number' && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                      Musical Number
                    </span>
                  )}
                </div>
                {item.topic && (
                  <span className="text-xs text-slate-600 dark:text-slate-400 italic mt-0.5 sm:mt-0 print:text-slate-700">
                    &ldquo;{item.topic}&rdquo;
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-baseline border-b border-dotted border-slate-300 dark:border-slate-700 pb-2 pt-4">
            <span className="font-medium text-sm text-slate-700 dark:text-slate-300 print:text-black">
              Closing Hymn
            </span>
            <span className="text-sm text-right text-slate-900 dark:text-white print:text-black font-semibold">
              #{meeting.closingHymn.number} &ldquo;{meeting.closingHymn.title}&rdquo;
            </span>
          </div>

          <div className="flex justify-between items-baseline pb-2">
            <span className="font-medium text-sm text-slate-700 dark:text-slate-300 print:text-black">
              Benediction (Closing Prayer)
            </span>
            <span className="text-sm text-right text-slate-800 dark:text-slate-200 print:text-black">
              {meeting.closingPrayer}
            </span>
          </div>
        </section>

        {/* Footer in print */}
        <footer className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 print:text-slate-600">
          <p>Please return hymnbooks after the service and assist in reverently leaving the chapel.</p>
        </footer>
      </article>
    </div>
  );
}

