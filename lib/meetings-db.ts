import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
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
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
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
      { name: 'Youth Speaker: Nathan Cruz', topic: 'Youth Theme 2026: Discipleship', type: 'speaker' },
      { name: 'Sister Rachel Bennett', topic: 'The Power of Daily Scripture Study', type: 'speaker' },
      { name: 'Violin Solo: Lucas Gray', topic: 'Medley of Reverence', type: 'musical-number' },
      { name: 'Brother Daniel Evans', topic: 'Serving Others with a Willing Heart', type: 'speaker' },
    ],
    closingHymn: { number: 270, title: 'I\'ll Go Where You Want Me to Go' },
    closingPrayer: 'Brother Gabriel Soto',
  },
  {
    id: 4,
    date: '2026-10-18',
    meetingType: 'stake',
    presiding: 'President Alan Sterling (Stake President)',
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
    closingHymn: { number: 26, title: 'Joseph Smith\'s First Prayer' },
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
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: 'Be Still, My Soul', type: 'musical-number' },
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((m) => m.date === date);
  }
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}

