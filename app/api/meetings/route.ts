import { NextRequest, NextResponse } from 'next/server';
import { getAllMeetings } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');
  const meetings = await getAllMeetings(date);
  return NextResponse.json(meetings);
}

