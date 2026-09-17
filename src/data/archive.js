export const SEASONS = [
  {
    year: '2025–26',
    headline: 'Six state qualifiers, and the chapter\u2019s first ICDC finalist.',
    stats: { districts: 22, state: 6, icdc: 1 },
    winners: [
      { name: 'Jordan Ellis', event: 'Marketing Communications Series', place: '1st', level: 'Districts' },
      { name: 'Priya Nair & Dev Raman', event: 'Business Law & Ethics Team', place: '2nd', level: 'Districts' },
      { name: 'Marcus Cole', event: 'Accounting Applications Series', place: '3rd', level: 'State' },
      { name: 'Zara Ahmed & Nico Bellanti', event: 'International Business Plan', place: 'Finalist', level: 'ICDC' },
    ],
  },
  {
    year: '2024–25',
    headline: 'Membership doubled; four events advanced to Houston.',
    stats: { districts: 15, state: 4, icdc: 0 },
    winners: [
      { name: 'Ava Lindqvist', event: 'Hotel & Lodging Management Series', place: '1st', level: 'Districts' },
      { name: 'Camille Foster', event: 'Principles of Marketing', place: '2nd', level: 'Districts' },
      { name: 'Felix Moreau & Tessa Lin', event: 'Business Operations Research', place: '4th', level: 'State' },
    ],
  },
  {
    year: '2023–24',
    headline: 'First season running written events.',
    stats: { districts: 9, state: 2, icdc: 0 },
    winners: [
      { name: 'Simone Adler', event: 'Innovation Plan', place: '2nd', level: 'Districts' },
      { name: 'Noah Bergstrom', event: 'Retail Merchandising Series', place: '3rd', level: 'Districts' },
    ],
  },
]

// Photo archive. Replace `src` with real chapter photos in /public/archive/.
// `span` and `ratio` break the uniform grid; `tilt` gives each frame a slight rotation.
export const GALLERY = [
  { id: 'g1', caption: 'District Conference · Round Rock', year: '2026', tone: 'blue', span: 5, ratio: '4 / 3', tilt: -1.4 },
  { id: 'g2', caption: 'Mock districts, full dress', year: '2025', tone: 'ink', span: 3, ratio: '3 / 4', tilt: 1.8 },
  { id: 'g3', caption: 'State CDC · Houston', year: '2025', tone: 'paper', span: 4, ratio: '1 / 1', tilt: 1.1 },
  { id: 'g4', caption: 'Roleplay lab, Wednesday', year: '2025', tone: 'blue', span: 6, ratio: '16 / 10', tilt: -0.8 },
  { id: 'g5', caption: 'Officer team, fall retreat', year: '2025', tone: 'ink', span: 4, ratio: '4 / 3', tilt: 1.5 },
  { id: 'g6', caption: 'ICDC · Orlando', year: '2024', tone: 'paper', span: 3, ratio: '3 / 4', tilt: -1.9 },
  { id: 'g7', caption: 'Chapter fundraiser', year: '2024', tone: 'blue', span: 4, ratio: '1 / 1', tilt: 0.9 },
  { id: 'g8', caption: 'New member night', year: '2024', tone: 'ink', span: 5, ratio: '16 / 10', tilt: -1.2 },
]
