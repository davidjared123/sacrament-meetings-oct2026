import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import EditMeetingForm from '@/components/EditMeetingForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Meeting — Sacrament Meeting Planner',
  description: 'Update meeting agenda, speakers, and hymns.',
};

async function EditMeetingContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId) || !Number.isInteger(numericId)) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return <EditMeetingForm meeting={meeting} />;
}

export default function EditMeetingPage(props: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-100">Edit Meeting Agenda</h1>
        <p className="text-sm text-slate-400 mt-1">
          Modify hymns, prayers, conducting officers, or speakers.
        </p>
      </div>

      <Suspense fallback={<div className="h-96 rounded-xl bg-slate-900 border border-slate-800 animate-pulse max-w-3xl mx-auto" />}>
        <EditMeetingContent params={props.params} />
      </Suspense>
    </div>
  );
}
