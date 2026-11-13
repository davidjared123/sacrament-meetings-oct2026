import Link from 'next/link';
import { Suspense } from 'react';

async function EditMeetingContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-100">Edit Meeting #{id}</h1>
        <p className="text-slate-400">
          Coming in Week 04 — Edit and update agenda details with real-time validation.
        </p>
        <div className="pt-4">
          <Link
            href={`/meetings/${id}`}
            className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors text-sm"
          >
            ← View Agenda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function EditMeetingPage(props: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400">Loading edit form...</div>}>
      <EditMeetingContent params={props.params} />
    </Suspense>
  );
}
