'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingFromDb,
} from './meetings-db';
import type { MeetingType, SpeakerItem } from './types';

const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special']),
  presiding: z.string().min(2, 'Presiding leader name must be at least 2 characters.'),
  conducting: z.string().min(2, 'Conducting leader name must be at least 2 characters.'),
  openingHymnNumber: z.coerce.number().int().positive('Opening hymn number must be greater than 0.'),
  openingHymnTitle: z.string().min(2, 'Opening hymn title is required.'),
  openingPrayer: z.string().min(2, 'Opening prayer name is required.'),
  sacramentHymnNumber: z.coerce.number().int().positive('Sacrament hymn number must be greater than 0.'),
  sacramentHymnTitle: z.string().min(2, 'Sacrament hymn title is required.'),
  closingHymnNumber: z.coerce.number().int().positive('Closing hymn number must be greater than 0.'),
  closingHymnTitle: z.string().min(2, 'Closing hymn title is required.'),
  closingPrayer: z.string().min(2, 'Closing prayer name is required.'),
  speakers: z.string().optional(),
  announcements: z.string().optional(),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.coerce.boolean().optional().default(false),
});

export type MeetingState = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
    speakers?: string[];
    announcements?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
  };
  message?: string | null;
};

function parseSpeakers(raw?: string): SpeakerItem[] {
  if (!raw || !raw.trim()) return [];
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.includes(' - ')) {
        const [name, topic] = line.split(' - ');
        return { name: name.trim(), topic: (topic || '').trim(), type: 'speaker' as const };
      }
      return { name: line, topic: 'Sacrament Address', type: 'speaker' as const };
    });
}

function parseTextArray(raw?: string): string[] {
  if (!raw || !raw.trim()) return [];
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

export async function createMeeting(
  prevState: MeetingState,
  formData: FormData
): Promise<MeetingState> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
    speakers: formData.get('speakers'),
    announcements: formData.get('announcements'),
    wardBusiness: formData.get('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness') === 'true' || formData.get('stakeBusiness') === 'on',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create meeting agenda.',
    };
  }

  const data = validatedFields.data;

  try {
    await addMeeting({
      date: data.date,
      meetingType: data.meetingType as MeetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements: parseTextArray(data.announcements),
      openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
      openingPrayer: data.openingPrayer,
      wardBusiness: parseTextArray(data.wardBusiness).map((desc) => ({ description: desc })),
      stakeBusiness: data.stakeBusiness,
      sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
      speakers: parseSpeakers(data.speakers),
      closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
      closingPrayer: data.closingPrayer,
    });
  } catch (error) {
    console.error('Error creating meeting:', error);
    return { message: 'Database Error: Failed to create meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: string,
  prevState: MeetingState,
  formData: FormData
): Promise<MeetingState> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
    speakers: formData.get('speakers'),
    announcements: formData.get('announcements'),
    wardBusiness: formData.get('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness') === 'true' || formData.get('stakeBusiness') === 'on',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update meeting agenda.',
    };
  }

  const data = validatedFields.data;

  try {
    const numericId = Number(id);
    const updated = await updateMeetingInDb(numericId, {
      date: data.date,
      meetingType: data.meetingType as MeetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements: parseTextArray(data.announcements),
      openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
      openingPrayer: data.openingPrayer,
      wardBusiness: parseTextArray(data.wardBusiness).map((desc) => ({ description: desc })),
      stakeBusiness: data.stakeBusiness,
      sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
      speakers: parseSpeakers(data.speakers),
      closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
      closingPrayer: data.closingPrayer,
    });

    if (!updated) {
      return { message: 'Meeting not found to update.' };
    }
  } catch (error) {
    console.error('Error updating meeting:', error);
    return { message: 'Database Error: Failed to update meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: string) {
  try {
    const numericId = Number(id);
    await deleteMeetingFromDb(numericId);
    revalidatePath('/meetings');
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
