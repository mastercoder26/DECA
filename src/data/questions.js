// Seed thread for the officer Q&A board. Replace with an API call when a backend exists.
export const SEED_QUESTIONS = [
  {
    id: 'q1',
    author: 'Anonymous',
    topic: 'Competition',
    body: 'Can I switch events after registration closes?',
    createdAt: '2026-10-24T14:02:00-05:00',
    answer: {
      body:
        'Not once the state portal locks on November 14. Before that, talk to Ms. Reyes and we can usually move you if there is an open slot in the event you want.',
      author: 'Jordan Ellis · President',
      answeredAt: '2026-10-24T18:40:00-05:00',
    },
    upvotes: 14,
  },
  {
    id: 'q2',
    author: 'Anonymous',
    topic: 'Logistics',
    body: 'Do I need a blazer for Districts or is a cardigan okay?',
    createdAt: '2026-10-20T11:15:00-05:00',
    answer: {
      body:
        'A blazer or suit jacket is the standard, and the dress code is checked at the door. If cost is the issue, message Priya — the chapter keeps loaner blazers in a few sizes.',
      author: 'Priya Nair · VP of Membership',
      answeredAt: '2026-10-20T16:05:00-05:00',
    },
    upvotes: 27,
  },
  {
    id: 'q3',
    author: 'Anonymous',
    topic: 'Prep',
    body: 'How many practice roleplays should I do before Districts?',
    createdAt: '2026-10-18T09:44:00-05:00',
    answer: {
      body:
        'Ten timed reps is the number that separates people who place from people who do not. Two a week from now until December gets you there comfortably.',
      author: 'Jordan Ellis · President',
      answeredAt: '2026-10-18T20:12:00-05:00',
    },
    upvotes: 31,
  },
  {
    id: 'q4',
    author: 'Anonymous',
    topic: 'Joining',
    body: 'Is it too late to join if I have never done DECA before?',
    createdAt: '2026-10-26T08:30:00-05:00',
    answer: null,
    upvotes: 9,
  },
]

export const QUESTION_TOPICS = ['Joining', 'Competition', 'Prep', 'Logistics', 'Other']
