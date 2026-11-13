import Link from 'next/link';

export default function NewMeetingPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-100">Create Meeting</h1>
        <p className="text-slate-400">
          Coming in Week 04 — Dynamic meeting agenda authoring with full database persistence.
        </p>
        <div className="pt-4">
          <Link
            href="/meetings"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors text-sm"
          >
            ← Back to Meetings
          </Link>
        </div>
      </div>
    </div>
  );
}
