import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const ITEMS_PER_PAGE = 5;

const fallbackMeetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-11-01',
    meetingType: 'regular',
    presiding: 'Bishop Ricardo Morales',
    conducting: 'Brother Carlos Silva',
    announcements: [
      'Ward Temple Night this Friday at 7:00 PM.',
      'Youth activity on Wednesday at the cultural hall.',
      'Self-reliance courses starting next Tuesday.',
    ],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Maria Williams',
    wardBusiness: [
      { description: 'Sustaining of Brother David Clark as Sunday School Teacher.' },
      { description: 'Release of Sister Laura Gomez from Primary with a vote of thanks.' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Elena Vance', topic: 'Finding Peace in the Savior', type: 'speaker' },
      { name: 'Ward Youth Choir', topic: 'Nearer, My God, to Thee', type: 'musical-number' },
      { name: 'Brother Matthew Taylor', topic: 'Living the Doctrine of Christ Daily', type: 'speaker' },
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Antonio Davis',
  },
  {
    id: 2,
    date: '2026-11-08',
    meetingType: 'testimony',
    presiding: 'Bishop Ricardo Morales',
    conducting: 'Brother Jonathan Reyes',
    announcements: [
      'Fast Sunday today; please remember your fast offerings.',
      'Ward choir practice at 2:00 PM in the chapel.',
    ],
    openingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    openingPrayer: 'Brother Samuel Ortiz',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Congregation Members', topic: 'Bearing of testimonies', type: 'speaker' },
    ],
    closingHymn: { number: 301, title: 'I Am a Child of God' },
    closingPrayer: 'Sister Sofia Mendoza',
  },
  {
    id: 3,
    date: '2026-10-25',
    meetingType: 'regular',
    presiding: 'Bishop Ricardo Morales',
    conducting: 'Brother Carlos Silva',
    announcements: [
      'Trunk or Treat activity on Saturday at 5:00 PM.',
      'Cleanliness assignment: Zone 3 families.',
    ],
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Andrea Ruiz',
    wardBusiness: [
      { description: 'Sustaining of Sister Veronica Hall as Relief Society Counselor.' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'Nathan Cruz', topic: 'Youth Theme 2026: Discipleship', type: 'speaker' },
      { name: 'Sister Rachel Bennett', topic: 'The Power of Daily Scripture Study', type: 'speaker' },
      { name: 'Lucas Gray', topic: 'Medley of Reverence', type: 'musical-number' },
      { name: 'Brother Daniel Evans', topic: 'Serving Others with a Willing Heart', type: 'speaker' },
    ],
    closingHymn: { number: 270, title: "I'll Go Where You Want Me to Go" },
    closingPrayer: 'Brother Gabriel Soto',
  },
  {
    id: 4,
    date: '2026-10-18',
    meetingType: 'stake',
    presiding: 'President Alan Sterling',
    conducting: 'President Sterling',
    announcements: [
      'Stake Conference General Session broadcast online.',
      'No local ward meetings scheduled today.',
    ],
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Sister Beatriz Ramos',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 184, title: 'Upon the Cross of Calvary' },
    speakers: [
      { name: 'Visiting Area Seventy', topic: 'Building Eternal Foundations', type: 'speaker' },
      { name: 'Stake Presidency', topic: 'Strengthening Stakes of Zion', type: 'speaker' },
    ],
    closingHymn: { number: 26, title: "Joseph Smith's First Prayer" },
    closingPrayer: 'Brother Hector Medina',
  },
  {
    id: 5,
    date: '2026-10-11',
    meetingType: 'general',
    presiding: 'First Presidency of the Church',
    conducting: 'First Presidency',
    announcements: [
      'Rebroadcast of the 196th Semiannual General Conference.',
    ],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Elder Quentin L. Cook',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 196, title: 'Jesus, Once of Humble Birth' },
    speakers: [
      { name: 'Church Leaders', topic: 'General Conference Messages', type: 'speaker' },
    ],
    closingHymn: { number: 144, title: 'Secret Prayer' },
    closingPrayer: 'Sister Tamara W. Runia',
  },
  {
    id: 6,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Ward temple night: May 10'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: 'Be Still, My Soul', type: 'musical-number' },
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
  },
  {
    id: 7,
    date: '2026-04-26',
    meetingType: 'regular',
    presiding: 'Bishop Thompson',
    conducting: 'Brother Nakamura',
    announcements: ['Priesthood preview next Sunday'],
    openingHymn: { number: 134, title: 'I Believe in Christ' },
    openingPrayer: 'Sister Park',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: 'God, Our Father, Hear Us Pray' },
    speakers: [
      { name: 'Sister Chen', topic: 'The Sacrament and Covenants', type: 'speaker' },
      { name: 'Brother Osei', topic: 'Covenant Keeping in Modern Times', type: 'speaker' },
    ],
    closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
    closingPrayer: 'Brother Alvarez',
  },
  {
    id: 8,
    date: '2026-04-19',
    meetingType: 'regular',
    presiding: 'Bishop Thompson',
    conducting: 'Sister Torres',
    announcements: ['Ministering visits this week'],
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Brother Kim',
    wardBusiness: [{ description: 'Sustaining of Sister Agbavor - Primary Teacher' }],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Sister Nakamura', topic: 'Personal Revelation', type: 'speaker' },
      { name: 'Brother Santos', topic: 'Temple Covenants', type: 'speaker' },
    ],
    closingHymn: { number: 226, title: 'Improve the Shining Moments' },
    closingPrayer: 'Sister Jensen',
  },
  {
    id: 9,
    date: '2026-04-12',
    meetingType: 'testimony',
    presiding: 'Bishop Thompson',
    conducting: 'Brother Nakamura',
    announcements: ['Easter Sunday special program next week'],
    openingHymn: { number: 199, title: 'He Is Risen!' },
    openingPrayer: 'Sister Martinez',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      { name: 'Congregation Members', topic: 'Testimonies of the Savior', type: 'speaker' },
    ],
    closingHymn: { number: 200, title: 'Christ the Lord Is Risen Today' },
    closingPrayer: 'Brother White',
  },
];

export async function getMeetings(
  query: string = '',
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const searchTerm = `%${query}%`;
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;

      const rows = await sql`
        SELECT
          id,
          to_char(date, 'YYYY-MM-DD') AS "date",
          meeting_type                AS "meetingType",
          presiding, conducting, announcements,
          opening_hymn                AS "openingHymn",
          opening_prayer              AS "openingPrayer",
          ward_business               AS "wardBusiness",
          stake_business              AS "stakeBusiness",
          sacrament_hymn              AS "sacramentHymn",
          speakers,
          closing_hymn                AS "closingHymn",
          closing_prayer              AS "closingPrayer"
        FROM meetings
        WHERE
          presiding         ILIKE ${searchTerm}
          OR conducting     ILIKE ${searchTerm}
          OR meeting_type   ILIKE ${searchTerm}
          OR speakers::text ILIKE ${searchTerm}
        ORDER BY date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return rows as unknown as SacramentMeeting[];
    } catch (err) {
      console.warn('PostgreSQL getMeetings failed, using fallback:', err);
    }
  }

  const q = query.toLowerCase().trim();
  const filtered = fallbackMeetings.filter((m) => {
    if (!q) return true;
    const presidingMatch = m.presiding.toLowerCase().includes(q);
    const conductingMatch = m.conducting.toLowerCase().includes(q);
    const typeMatch = m.meetingType.toLowerCase().includes(q);
    const speakersMatch = m.speakers.some(
      (s) => s.name.toLowerCase().includes(q) || s.topic.toLowerCase().includes(q)
    );
    return presidingMatch || conductingMatch || typeMatch || speakersMatch;
  });

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  return filtered.slice(offset, offset + ITEMS_PER_PAGE);
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const searchTerm = `%${query}%`;
      const rows = await sql`
        SELECT COUNT(*) FROM meetings
        WHERE
          presiding         ILIKE ${searchTerm}
          OR conducting     ILIKE ${searchTerm}
          OR meeting_type   ILIKE ${searchTerm}
          OR speakers::text ILIKE ${searchTerm}
      `;
      return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
    } catch (err) {
      console.warn('PostgreSQL getMeetingsTotalPages failed, using fallback:', err);
    }
  }

  const q = query.toLowerCase().trim();
  const filtered = fallbackMeetings.filter((m) => {
    if (!q) return true;
    const presidingMatch = m.presiding.toLowerCase().includes(q);
    const conductingMatch = m.conducting.toLowerCase().includes(q);
    const typeMatch = m.meetingType.toLowerCase().includes(q);
    const speakersMatch = m.speakers.some(
      (s) => s.name.toLowerCase().includes(q) || s.topic.toLowerCase().includes(q)
    );
    return presidingMatch || conductingMatch || typeMatch || speakersMatch;
  });

  return Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`
        SELECT
          id,
          to_char(date, 'YYYY-MM-DD') AS "date",
          meeting_type                AS "meetingType",
          presiding, conducting, announcements,
          opening_hymn                AS "openingHymn",
          opening_prayer              AS "openingPrayer",
          ward_business               AS "wardBusiness",
          stake_business              AS "stakeBusiness",
          sacrament_hymn              AS "sacramentHymn",
          speakers,
          closing_hymn                AS "closingHymn",
          closing_prayer              AS "closingPrayer"
        FROM meetings WHERE id = ${id}
      `;
      return (rows[0] as unknown as SacramentMeeting) ?? null;
    } catch (err) {
      console.warn('PostgreSQL getMeetingById failed, using fallback:', err);
    }
  }

  return fallbackMeetings.find((m) => m.id === id) ?? null;
}

export async function getAllMeetings(date?: string | null): Promise<SacramentMeeting[]> {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      if (date) {
        const rows = await sql`
          SELECT
            id,
            to_char(date, 'YYYY-MM-DD') AS "date",
            meeting_type                AS "meetingType",
            presiding, conducting, announcements,
            opening_hymn                AS "openingHymn",
            opening_prayer              AS "openingPrayer",
            ward_business               AS "wardBusiness",
            stake_business              AS "stakeBusiness",
            sacrament_hymn              AS "sacramentHymn",
            speakers,
            closing_hymn                AS "closingHymn",
            closing_prayer              AS "closingPrayer"
          FROM meetings
          WHERE date = ${date}::date
          ORDER BY date DESC
        `;
        return rows as unknown as SacramentMeeting[];
      }
      const rows = await sql`
        SELECT
          id,
          to_char(date, 'YYYY-MM-DD') AS "date",
          meeting_type                AS "meetingType",
          presiding, conducting, announcements,
          opening_hymn                AS "openingHymn",
          opening_prayer              AS "openingPrayer",
          ward_business               AS "wardBusiness",
          stake_business              AS "stakeBusiness",
          sacrament_hymn              AS "sacramentHymn",
          speakers,
          closing_hymn                AS "closingHymn",
          closing_prayer              AS "closingPrayer"
        FROM meetings
        ORDER BY date DESC
      `;
      return rows as unknown as SacramentMeeting[];
    } catch (err) {
      console.warn('PostgreSQL getAllMeetings failed, using fallback:', err);
    }
  }

  if (date) {
    return fallbackMeetings.filter((m) => m.date === date);
  }
  return fallbackMeetings;
}

// Mutation stubs — will be wired to the database in Week 04
export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  throw new Error('addMeeting: database implementation coming in Week 04');
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  throw new Error('updateMeeting: database implementation coming in Week 04');
}

export async function deleteMeeting(id: number): Promise<boolean> {
  throw new Error('deleteMeeting: database implementation coming in Week 04');
}
