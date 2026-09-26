// Typing Club 500-Lesson Curriculum Generator & Stages

export const LESSON_STAGES = [
  { id: 1, name: 'Home Row Basics', range: [1, 50], icon: '🏠', description: 'Master F, J, D, K, S, L, A, ; and core home-row words' },
  { id: 2, name: 'Top Row Mastery', range: [51, 120], icon: '🎯', description: 'Reach upward for E, I, R, U, T, Y, W, O, Q, P' },
  { id: 3, name: 'Bottom Row Keys', range: [121, 180], icon: '🔻', description: 'Reach downward for V, M, B, N, C, X, Z' },
  { id: 4, name: 'Shift & Capitals', range: [181, 240], icon: '⬆️', description: 'Left and Right Shift keys for proper capitalization' },
  { id: 5, name: 'Numbers & Symbols', range: [241, 300], icon: '🔢', description: 'Top number row, percentages, currency, and punctuation' },
  { id: 6, name: 'Fluency & Speed', range: [301, 380], icon: '⚡', description: 'High-frequency English phrases and fluid rhythm drills' },
  { id: 7, name: 'Literature & Speeches', range: [381, 450], icon: '📜', description: 'Famous historical speeches, science, philosophy, and essays' },
  { id: 8, name: 'Grandmaster Typist', range: [451, 500], icon: '👑', description: 'Expert speed sprints, legal texts, tongue twisters, and tests' }
];

// Base seed content for rich programmatic 500 lessons
const HOME_ROW_PATTERNS = [
  'fff jjj fff jjj fj fj jf jf ff jj ff jj',
  'ddd kkk ddd kkk dk dk kd kd dd kk dd kk',
  'fjdk fjdk kdjf kdjf ffjj kkdd fjdk jfkd',
  'sss lll sss lll sl sl ls ls ss ll ss ll',
  'aaa ;;; aaa ;;; a; a; ;a ;a aa ;; aa ;;',
  'asdf jkl; asdf jkl; fdsa ;lkj asdf jkl;',
  'all fall flash salad flask lad ask fall',
  'sad dad lad ask fall flash glad dash flag',
  'half flask salad fall glad lad dad sad ask',
  'a sad lad had a salad as a flash fall'
];

const TOP_ROW_WORDS = [
  'tree water write quiet power require output input yellow',
  'people write letter report power figure energy future',
  'quick white route report write return upper water quiet',
  'youth weight tower quote figure output yellow people write',
  'try your power to write true reports with perfect quiet focus'
];

const BOTTOM_ROW_WORDS = [
  'voice music move brave claim mixed zebra visual calm',
  'bank zero carbon volume normal complex novel dynamic',
  'combine modern visual balance maximum zoom vibe active',
  'brave minds move music and visual vibes to maximum volume'
];

const SHIFT_SENTENCES = [
  'The United States, Canada, London, Tokyo, and Paris are global hubs.',
  'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday.',
  'Alice and Bob visited Mount Everest in Nepal during July.',
  'Great works of Art and Science inspire Humanity across Generations.'
];

const SYMBOL_SENTENCES = [
  'Order #1049: 15 items @ $49.99 each = $749.85 (Tax: 8.5%).',
  'Phone: (555) 234-5678 | Email: support@typingclub.edu [Verified].',
  'Result = (x + y) * (a - b) / 100; if (count >= 50) return true;',
  'Speed: 100% accuracy & 0 errors! That\'s a 10/10 performance!'
];

const LITERATURE_PARAGRAPHS = [
  'Freedom of speech is the belief that people have the right to express their opinions and ideas without fear that they will be in legal trouble. However, practice makes typing effortless.',
  'Two roads diverged in a yellow wood, and sorry I could not travel both and be one traveler, long I stood and looked down one as far as I could to where it bent in the undergrowth.',
  'The only way to do great work is to love what you do. If you have not found it yet, keep looking. Do not settle. As with all matters of the heart, you will know when you find it.',
  'In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move. Don\'t panic and always carry a towel.',
  'Logic will get you from A to B. Imagination will take you everywhere in the universe. Curiosity has its own reason for existence.',
  'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.'
];

const MASTER_TEXTS = [
  'Peter Piper picked a peck of pickled peppers. If Peter Piper picked a peck of pickled peppers, where is the peck of pickled peppers Peter Piper picked at maximum velocity?',
  'How much wood would a woodchuck chuck if a woodchuck could chuck wood without missing a single beat or hesitating on the home row keys during a 100 WPM speed sprint?',
  'The quick brown fox jumps effortlessly over thirty lazy dogs while dazzling keyboard wizards conquer every single lesson from one to five hundred in radiant glory!'
];

// Generate 500 Progressive Lessons
export function generateAllLessons() {
  const lessons = [];

  for (let i = 1; i <= 500; i++) {
    let stageId = 1;
    let difficulty = 'Easy';
    let targetWpm = 10;
    let title = `Lesson ${i}`;
    let text = '';

    if (i <= 50) {
      stageId = 1;
      difficulty = i < 20 ? 'Easy' : 'Medium';
      targetWpm = 10;
      const patternIdx = (i - 1) % HOME_ROW_PATTERNS.length;
      title = i <= 5 ? `Anchor Keys (Lesson ${i})` : i <= 25 ? `Home Row Drills ${i}` : `Home Row Words ${i}`;
      text = HOME_ROW_PATTERNS[patternIdx];
    } else if (i <= 120) {
      stageId = 2;
      difficulty = 'Medium';
      targetWpm = 10;
      const wordIdx = (i - 51) % TOP_ROW_WORDS.length;
      title = `Top Row Workout ${i}`;
      text = TOP_ROW_WORDS[wordIdx];
    } else if (i <= 180) {
      stageId = 3;
      difficulty = 'Medium';
      targetWpm = 10;
      const wordIdx = (i - 121) % BOTTOM_ROW_WORDS.length;
      title = `Bottom Row Flow ${i}`;
      text = BOTTOM_ROW_WORDS[wordIdx];
    } else if (i <= 240) {
      stageId = 4;
      difficulty = 'Hard';
      targetWpm = 10;
      const shiftIdx = (i - 181) % SHIFT_SENTENCES.length;
      title = `Shift & Capitals ${i}`;
      text = SHIFT_SENTENCES[shiftIdx];
    } else if (i <= 300) {
      stageId = 5;
      difficulty = 'Hard';
      targetWpm = 10;
      const symIdx = (i - 241) % SYMBOL_SENTENCES.length;
      title = `Numbers & Symbols ${i}`;
      text = SYMBOL_SENTENCES[symIdx];
    } else if (i <= 380) {
      stageId = 6;
      difficulty = 'Hard';
      targetWpm = 10;
      const litIdx = (i - 301) % LITERATURE_PARAGRAPHS.length;
      title = `Fluency Sprint ${i}`;
      text = LITERATURE_PARAGRAPHS[litIdx];
    } else if (i <= 450) {
      stageId = 7;
      difficulty = 'Expert';
      targetWpm = 10;
      const litIdx = (i - 381) % LITERATURE_PARAGRAPHS.length;
      title = i === 518 ? `Freedom of Speech` : `Literature & Speech ${i}`;
      text = LITERATURE_PARAGRAPHS[litIdx];
    } else {
      stageId = 8;
      difficulty = 'Grandmaster';
      targetWpm = 10;
      const masterIdx = (i - 451) % MASTER_TEXTS.length;
      title = `Grandmaster Trial ${i}`;
      text = MASTER_TEXTS[masterIdx];
    }

    lessons.push({
      id: `lesson-${i}`,
      number: i,
      stageId,
      title,
      difficulty,
      targetWpm,
      text
    });
  }

  return lessons;
}

export const ALL_500_LESSONS = generateAllLessons();

// Legacy compatibility wrapper
export const LESSON_CATEGORIES = LESSON_STAGES.map((stage) => ({
  id: `stage-${stage.id}`,
  name: stage.name,
  description: stage.description,
  icon: 'Keyboard',
  lessons: ALL_500_LESSONS.filter((l) => l.stageId === stage.id)
}));

// 5 Beauty & Aesthetic Tiers based on 3, 5, 7, 9, 10+ WPM
export const BEAUTY_TIERS = [
  {
    tier: 1,
    name: 'Disaster Goblin',
    title: '< 3 WPM (Typo State)',
    avatar: '/avatars/tier1.png',
    minScore: 0,
    maxScore: 29,
    minWpm: 0,
    maxWpm: 2,
    targetSpeed: '< 3 WPM',
    themeColor: '#ef4444',
    bgGradient: 'from-rose-950/60 to-red-900/40',
    dialogues: [
      "AAAAAH! My hair! My glasses! Stop hitting the wrong keys! 😭",
      "Did a cat walk across your keyboard?! 💀",
      "I look like a mad scientist after an explosion! Press backspace! 😱",
      "My teeth! My face! Fix your accuracy please! 😭💔"
    ]
  },
  {
    tier: 2,
    name: 'Stressed & Disheveled',
    title: '3 - 4 WPM',
    avatar: '/avatars/tier2.png',
    minScore: 30,
    maxScore: 49,
    minWpm: 3,
    maxWpm: 4,
    targetSpeed: '3 - 4 WPM',
    themeColor: '#f59e0b',
    bgGradient: 'from-amber-950/60 to-orange-900/40',
    dialogues: [
      "Wait wait wait, the deadline is here and I have no sleep! 😰",
      "Too many typos! My mascara is running everywhere! 💦",
      "Slow down a bit and hit the right letters! You're stressing me out! 😣",
      "Ouch, that missed key pulled my hair! Concentrate! 💥"
    ]
  },
  {
    tier: 3,
    name: 'Casual Student',
    title: '5 - 6 WPM (Initial)',
    avatar: '/avatars/tier3.png',
    minScore: 50,
    maxScore: 69,
    minWpm: 5,
    maxWpm: 6,
    targetSpeed: '5 - 6 WPM',
    themeColor: '#3b82f6',
    bgGradient: 'from-blue-950/60 to-indigo-900/40',
    dialogues: [
      "Nice steady pace! Keep the momentum going! 😊",
      "You're doing decent. Just reach 9-10 WPM to unlock Level 5! ✨",
      "Stay calm and keep typing, you've got this rhythm! 🎒",
      "Good accuracy! Now let's push the speed to Level 5! 🚀"
    ]
  },
  {
    tier: 4,
    name: 'Glamour Star',
    title: '7 - 8 WPM',
    avatar: '/avatars/tier4.png',
    minScore: 70,
    maxScore: 89,
    minWpm: 7,
    maxWpm: 8,
    targetSpeed: '7 - 8 WPM',
    themeColor: '#ec4899',
    bgGradient: 'from-pink-950/60 to-fuchsia-900/40',
    dialogues: [
      "Ooh yes! Loving this rhythm! Looking stylish and sleek! 💖",
      "Almost at Level 5! Just reach 9-10 WPM! 🌟",
      "Sensational pace! Just a tiny bit faster for Level 5! 💅",
      "Now THIS is what I call proper keyboard flair! Keep going! 🔥"
    ]
  },
  {
    tier: 5,
    name: 'Celestial Goddess',
    title: '9 - 10+ WPM (Max Level 5)',
    avatar: '/avatars/tier5.png',
    minScore: 90,
    maxScore: 100,
    minWpm: 9,
    maxWpm: 999,
    targetSpeed: '9 - 10+ WPM',
    themeColor: '#a855f7',
    bgGradient: 'from-purple-950/80 to-fuchsia-900/60',
    dialogues: [
      "PERFECTION! Level 5 reached! Your fingers channel divine grace! 👑✨",
      "LEVEL 5 UNLOCKED! The entire cosmos sparkles in your wake! 🌌💖",
      "Max Tier Goddess! Not a single mortal flaw in sight! 🌟👸",
      "Maximum glamour unlocked! You are absolute typing royalty! 💎✨"
    ]
  }
];

// Keyboard Finger Map (for Typing Club style guide)
export const KEY_FINGER_MAP = {
  '`': { finger: 'Left Pinky', hand: 'left', color: '#f43f5e' },
  '1': { finger: 'Left Pinky', hand: 'left', color: '#f43f5e' },
  'q': { finger: 'Left Pinky', hand: 'left', color: '#f43f5e' },
  'a': { finger: 'Left Pinky', hand: 'left', color: '#f43f5e' },
  'z': { finger: 'Left Pinky', hand: 'left', color: '#f43f5e' },

  '2': { finger: 'Left Ring', hand: 'left', color: '#fb923c' },
  'w': { finger: 'Left Ring', hand: 'left', color: '#fb923c' },
  's': { finger: 'Left Ring', hand: 'left', color: '#fb923c' },
  'x': { finger: 'Left Ring', hand: 'left', color: '#fb923c' },

  '3': { finger: 'Left Middle', hand: 'left', color: '#eab308' },
  'e': { finger: 'Left Middle', hand: 'left', color: '#eab308' },
  'd': { finger: 'Left Middle', hand: 'left', color: '#eab308' },
  'c': { finger: 'Left Middle', hand: 'left', color: '#eab308' },

  '4': { finger: 'Left Index', hand: 'left', color: '#22c55e' },
  '5': { finger: 'Left Index', hand: 'left', color: '#22c55e' },
  'r': { finger: 'Left Index', hand: 'left', color: '#22c55e' },
  't': { finger: 'Left Index', hand: 'left', color: '#22c55e' },
  'f': { finger: 'Left Index', hand: 'left', color: '#22c55e' },
  'g': { finger: 'Left Index', hand: 'left', color: '#22c55e' },
  'v': { finger: 'Left Index', hand: 'left', color: '#22c55e' },
  'b': { finger: 'Left Index', hand: 'left', color: '#22c55e' },

  ' ': { finger: 'Thumb', hand: 'both', color: '#8b5cf6' },

  '6': { finger: 'Right Index', hand: 'right', color: '#06b6d4' },
  '7': { finger: 'Right Index', hand: 'right', color: '#06b6d4' },
  'y': { finger: 'Right Index', hand: 'right', color: '#06b6d4' },
  'u': { finger: 'Right Index', hand: 'right', color: '#06b6d4' },
  'h': { finger: 'Right Index', hand: 'right', color: '#06b6d4' },
  'j': { finger: 'Right Index', hand: 'right', color: '#06b6d4' },
  'n': { finger: 'Right Index', hand: 'right', color: '#06b6d4' },
  'm': { finger: 'Right Index', hand: 'right', color: '#06b6d4' },

  '8': { finger: 'Right Middle', hand: 'right', color: '#3b82f6' },
  'i': { finger: 'Right Middle', hand: 'right', color: '#3b82f6' },
  'k': { finger: 'Right Middle', hand: 'right', color: '#3b82f6' },
  ',': { finger: 'Right Middle', hand: 'right', color: '#3b82f6' },

  '9': { finger: 'Right Ring', hand: 'right', color: '#a855f7' },
  'o': { finger: 'Right Ring', hand: 'right', color: '#a855f7' },
  'l': { finger: 'Right Ring', hand: 'right', color: '#a855f7' },
  '.': { finger: 'Right Ring', hand: 'right', color: '#a855f7' },

  '0': { finger: 'Right Pinky', hand: 'right', color: '#ec4899' },
  '-': { finger: 'Right Pinky', hand: 'right', color: '#ec4899' },
  '=': { finger: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'p': { finger: 'Right Pinky', hand: 'right', color: '#ec4899' },
  '[': { finger: 'Right Pinky', hand: 'right', color: '#ec4899' },
  ']': { finger: 'Right Pinky', hand: 'right', color: '#ec4899' },
  ';': { finger: 'Right Pinky', hand: 'right', color: '#ec4899' },
  "'": { finger: 'Right Pinky', hand: 'right', color: '#ec4899' },
  '/': { finger: 'Right Pinky', hand: 'right', color: '#ec4899' }
};
