import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';
import { getMeetingById } from '@/lib/meetings-db';
import { Suspense } from 'react';

interface MeetingDetailPageProps {
  params: Promise<{ id: string }>;
}

async function fetchMeeting(idNum: number): Promise<SacramentMeeting | null> {
  return await getMeetingById(idNum);
}

export async function generateMetadata({
  params,
}: MeetingDetailPageProps): Promise<Metadata> {
  const { id: rawId } = await params;
  const idNum = Number(rawId);

  if (Number.isNaN(idNum)) {
    return { title: 'Meeting Not Found' };
  }

  const meeting = await fetchMeeting(idNum);
  if (!meeting) {
    return { title: 'Meeting Not Found' };
  }

  return {
    title: `Sacrament Meeting — ${meeting.date}`,
    description: `Order of service, hymns, prayers, and speakers for sacrament meeting on ${meeting.date}.`,
  };
}

async function MeetingDetailContent({ params }: MeetingDetailPageProps) {
  const { id: rawId } = await params;
  const idNum = Number(rawId);

  if (Number.isNaN(idNum) || !Number.isInteger(idNum)) {
    notFound();
  }

  const meeting = await fetchMeeting(idNum);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}

export default function MeetingDetailPage(props: MeetingDetailPageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400">Loading meeting agenda...</div>}>
      <MeetingDetailContent {...props} />
    </Suspense>
  );
}
