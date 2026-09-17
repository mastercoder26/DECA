export const CHAPTER = {
  name: 'Rouse DECA',
  school: 'Rouse High School',
  city: 'Leander, Texas',
  tagline: 'Business & leadership, practiced out loud.',
}

export const SOCIAL_LINKS = [
  { label: 'Instagram', handle: '@rousedeca', href: 'https://instagram.com', kind: 'Updates & photos' },
  { label: 'Google Classroom', handle: 'Join code required', href: 'https://classroom.google.com', kind: 'Assignments & handouts' },
  { label: 'Discord', handle: 'Rouse DECA server', href: 'https://discord.com', kind: 'Practice rooms & questions' },
  { label: 'Texas DECA', handle: 'texasdeca.org', href: 'https://www.texasdeca.org', kind: 'Official state association' },
  { label: 'DECA Inc.', handle: 'deca.org', href: 'https://www.deca.org', kind: 'Guidelines & sample exams' },
]

// Events drive both the calendar and the countdown rail.
export const CALENDAR_EVENTS = [
  {
    id: 'meeting-oct',
    title: 'Chapter meeting',
    date: '2026-10-07T16:30:00-05:00',
    end: '2026-10-07T17:30:00-05:00',
    location: 'Room B204',
    category: 'Meeting',
    detail: 'Event selection night. Bring a shortlist of two clusters you are considering.',
  },
  {
    id: 'roleplay-lab-1',
    title: 'Roleplay lab',
    date: '2026-10-21T16:30:00-05:00',
    end: '2026-10-21T18:00:00-05:00',
    location: 'Room B204',
    category: 'Practice',
    detail: 'Timed reps with officer judges. Ten minutes prep, ten to present, written feedback after.',
  },
  {
    id: 'written-checkpoint',
    title: 'Written event checkpoint',
    date: '2026-11-04T16:30:00-05:00',
    end: '2026-11-04T17:30:00-05:00',
    location: 'Library',
    category: 'Deadline',
    detail: 'First full draft due for all written entries. Advisor review same week.',
  },
  {
    id: 'mock-districts',
    title: 'Mock districts',
    date: '2026-11-18T16:00:00-06:00',
    end: '2026-11-18T19:00:00-06:00',
    location: 'Cafeteria',
    category: 'Practice',
    detail: 'Full dress rehearsal: cluster exam, roleplay rotation, professional dress enforced.',
  },
  {
    id: 'districts',
    title: 'District Conference',
    date: '2026-12-07T08:00:00-06:00',
    end: '2026-12-07T17:00:00-06:00',
    location: 'Round Rock',
    category: 'Conference',
    detail: 'Area competition. Buses leave at 6:30 AM. Bring your ID, blazer, and two pens.',
    flagship: true,
  },
  {
    id: 'state-cdc',
    title: 'State CDC',
    date: '2027-02-25T08:00:00-06:00',
    end: '2027-02-27T17:00:00-06:00',
    location: 'Houston',
    category: 'Conference',
    detail: 'Texas Career Development Conference for district qualifiers.',
    flagship: true,
  },
  {
    id: 'icdc',
    title: 'ICDC',
    date: '2027-04-24T08:00:00-05:00',
    end: '2027-04-27T17:00:00-05:00',
    location: 'Orlando, FL',
    category: 'Conference',
    detail: 'International Career Development Conference for state qualifiers.',
    flagship: true,
  },
]

export const ANNOUNCEMENTS = [
  {
    id: 'a1',
    title: 'District registration closes November 14',
    body:
      'Every competitor needs a paid membership and a locked-in event before the deadline. Late entries cannot be added once the state portal closes — no exceptions from the association.',
    author: 'Ms. Reyes · Advisor',
    date: '2026-10-28T15:00:00-05:00',
    pinned: true,
    tag: 'Deadline',
  },
  {
    id: 'a2',
    title: 'Roleplay lab moved to Room B204',
    body: 'The library is booked for testing through November. All Wednesday labs run in B204 until further notice.',
    author: 'Jordan Ellis · VP of Competition',
    date: '2026-10-22T12:10:00-05:00',
    pinned: false,
    tag: 'Logistics',
  },
  {
    id: 'a3',
    title: 'Blazer order form is open',
    body:
      'Chapter blazers run about three weeks from order to delivery, so anyone competing at Districts should order by November 1. Sizing samples are in the officer room.',
    author: 'Priya Nair · VP of Membership',
    date: '2026-10-15T09:30:00-05:00',
    pinned: false,
    tag: 'Chapter',
  },
  {
    id: 'a4',
    title: 'New sample exams posted',
    body: 'Cluster exams for marketing, finance, and hospitality are in the resources hub under Exam prep.',
    author: 'Ms. Reyes · Advisor',
    date: '2026-10-09T16:45:00-05:00',
    pinned: false,
    tag: 'Resource',
  },
]

export const OFFICERS = [
  { name: 'Jordan Ellis', role: 'President', focus: 'Competition & roleplay coaching' },
  { name: 'Priya Nair', role: 'VP of Membership', focus: 'New members, dues, blazers' },
  { name: 'Marcus Cole', role: 'VP of Finance', focus: 'Fundraising & sponsorships' },
  { name: 'Ava Lindqvist', role: 'VP of Communications', focus: 'Socials, announcements, photos' },
  { name: 'Ms. Reyes', role: 'Advisor', focus: 'Registration, travel, eligibility' },
]
