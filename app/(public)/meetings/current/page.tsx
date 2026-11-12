import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getAllMeetings } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); // roll back to Sunday

  // Format as YYYY-MM-DD
  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');
  const currentSundayIso = `${year}-${month}-${day}`;

  // Query database for this Sunday's date
  const matches = await getAllMeetings(currentSundayIso);

  if (matches.length > 0) {
    redirect(`/meetings/${matches[0].id}`);
  }

  // If no meeting is found for that exact Sunday, check upcoming Sunday
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + ((7 - dayOfWeek) % 7 || 7));
  const nextYear = nextSunday.getFullYear();
  const nextMonth = String(nextSunday.getMonth() + 1).padStart(2, '0');
  const nextDay = String(nextSunday.getDate()).padStart(2, '0');
  const nextSundayIso = `${nextYear}-${nextMonth}-${nextDay}`;

  const nextMatches = await getAllMeetings(nextSundayIso);
  if (nextMatches.length > 0) {
    redirect(`/meetings/${nextMatches[0].id}`);
  }

  // Fallback: redirect to the first available meeting or /meetings
  const allMeetings = await getAllMeetings();
  if (allMeetings.length > 0) {
    redirect(`/meetings/${allMeetings[0].id}`);
  }

  redirect('/meetings');
}
