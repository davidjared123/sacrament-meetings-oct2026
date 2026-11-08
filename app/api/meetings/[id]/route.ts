import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (Number.isNaN(id) || !Number.isInteger(id)) {
    return NextResponse.json(
      { error: 'Invalid id: meeting id must be a valid number' },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(id);

  if (!meeting) {
    return NextResponse.json(
      { error: `Meeting with id ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting, { status: 200 });
}

