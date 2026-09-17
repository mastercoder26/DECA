export const SPONSOR_TIERS = [
  {
    tier: 'Diamond',
    amount: '$1,000+',
    blurb: 'Full-season partnership with the chapter.',
    perks: [
      'Logo on chapter shirts and competition banner',
      'Named recognition at every chapter event',
      'Invitation to judge mock districts',
      'Social media feature each semester',
    ],
    featured: true,
  },
  {
    tier: 'Blue',
    amount: '$500',
    blurb: 'Supports conference travel for competitors.',
    perks: ['Logo on the chapter banner', 'Recognition at mock districts', 'Social media thank-you post'],
  },
  {
    tier: 'Chapter',
    amount: '$250',
    blurb: 'Covers registration for two competitors.',
    perks: ['Name listed on the sponsor wall', 'Season recap letter'],
  },
  {
    tier: 'Friend',
    amount: 'Any amount',
    blurb: 'Every dollar goes straight to students.',
    perks: ['Name listed on the sponsor wall'],
  },
]

export const CURRENT_SPONSORS = [
  { name: 'Leander Coffee Co.', tier: 'Diamond', since: '2023' },
  { name: 'Hill Country Financial', tier: 'Diamond', since: '2024' },
  { name: 'Brushy Creek Print', tier: 'Blue', since: '2022' },
  { name: 'Rouse Booster Club', tier: 'Blue', since: '2021' },
  { name: 'Cedar Park Orthodontics', tier: 'Chapter', since: '2025' },
  { name: 'Northline Realty', tier: 'Chapter', since: '2025' },
]

export const SPONSOR_IMPACT = [
  { value: '$4,800', label: 'Raised last season' },
  { value: '22', label: 'Competitors funded' },
  { value: '100%', label: 'Goes to student costs' },
]
