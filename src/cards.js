const asset = (file) => `${import.meta.env.BASE_URL}assets/${file}`

export const CARDS = [
  {
    id: 'title',
    word: 'Final exam',
    headline: [
      { text: 'Okay, final exam.', role: 'setup' },
      { text: 'Are you Israeli yet?', role: 'slang' },
    ],
    background: 'bg-title',
    media: asset('meme-zohan-letsgo.mp4'),
    notes: [
      'Okay, final exam. Are you Israeli yet?',
      'You set the scene. They shout the word.',
    ],
  },
  {
    id: 'yalla',
    word: 'Yalla',
    headline: [
      { text: 'We’re late for a meeting.', role: 'setup' },
      { text: 'Yalla!', role: 'slang' },
    ],
    background: 'bg-yalla',
    media: asset('meme-kramer-yalla.mp4'),
    notes: [
      'We’re late for a meeting.',
      'Wait for it — Yalla!',
    ],
  },
  {
    id: 'sababa',
    word: 'Sababa',
    headline: [
      { text: 'Someone asks if the plan', role: 'setup' },
      { text: 'works for you.', role: 'setup' },
      { text: 'Sababa.', role: 'slang' },
    ],
    background: 'bg-sababa',
    media: asset('meme-joey-sababa.mp4'),
    notes: [
      'Someone asks if the plan works for you.',
      'Wait for it — Sababa.',
    ],
  },
  {
    id: 'balagan',
    word: 'Balagan',
    headline: [
      { text: 'Your Figma file has 47', role: 'setup' },
      { text: 'unresolved comments.', role: 'setup' },
      { text: 'What a balagan.', role: 'slang' },
    ],
    background: 'bg-balagan',
    media: asset('meme-simpsons-balagan.mp4'),
    notes: [
      'Your Figma file has 47 unresolved comments.',
      'Wait for it — What a balagan.',
    ],
  },
  {
    id: 'tachles',
    word: 'Tachles',
    headline: [
      { text: 'Someone has been talking', role: 'setup' },
      { text: 'for five minutes and still', role: 'setup' },
      { text: 'hasn’t made their point.', role: 'setup' },
      { text: 'Tachles?', role: 'slang' },
    ],
    background: 'bg-tachles',
    media: asset('meme-george-tachles.mp4'),
    notes: [
      'Someone has been talking for five minutes and still hasn’t made their point.',
      'Wait for it — Tachles?',
    ],
  },
  {
    id: 'nu',
    word: 'Nu?',
    headline: [
      { text: 'And someone says,', role: 'setup' },
      { text: '“I have some news…”', role: 'setup' },
      { text: 'and then stops.', role: 'setup' },
      { text: 'Nu?!', role: 'slang' },
    ],
    background: 'bg-nu',
    media: asset('meme-phoebe-nu.mp4'),
    notes: [
      'And someone says, “I have some news…” and then stops.',
      'Wait for it — Nu?!',
    ],
  },
  {
    id: 'exam',
    word: 'Yalla, bye',
    headline: [
      { text: 'Sababa.', role: 'slang' },
      { text: 'You’re ready for Israel.', role: 'setup' },
      { text: 'Yalla, bye!', role: 'slang', emoji: '🇮🇱' },
    ],
    background: 'bg-exam',
    media: asset('meme-ww-bye.mp4'),
    notes: [
      'Sababa. You’re ready for Israel. Yalla, bye!',
    ],
  },
]

export const DEFAULT_SETTINGS = {
  springDuration: 0.3,
  springBounce: 0.3,
  xSpringDuration: 0.5,
  xSpringBounce: 0.1,
  dragElastic: 0.7,
  swipeConfidenceThreshold: 8000,
  zIndexDelay: 0.05,
}
