import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';
import { getMeetingById } from '@/lib/meetings-db';

interface MeetingDetailPageProps {
  params: Promise<{ id: string }>;
}

async function fetchMeeting(idNum: number): Promise<SacramentMeeting | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const res = await fetch(`${baseUrl}/api/meetings/${idNum}`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback during static generation
  }
  return getMeetingById(idNum);
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

export default async function MeetingDetailPage({ params }: MeetingDetailPageProps) {
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

