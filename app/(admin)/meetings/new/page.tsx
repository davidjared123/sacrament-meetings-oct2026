import { Suspense } from 'react';
import CreateMeetingForm from '@/components/CreateMeetingForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan New Meeting — Sacrament Meeting Planner',
  description: 'Author and schedule a new Sunday sacrament meeting agenda.',
};

export default function NewMeetingPage() {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-100">Plan Sacrament Meeting</h1>
        <p className="text-sm text-slate-400 mt-1">
          Complete the agenda details below. The schedule will immediately be published to the ward calendar.
        </p>
      </div>

      <Suspense fallback={<div className="h-96 rounded-xl bg-slate-900 border border-slate-800 animate-pulse max-w-3xl mx-auto" />}>
        <CreateMeetingForm />
      </Suspense>
    </div>
  );
}
