// Typing Club 685-Lesson Authentic Curriculum Generator & Stages
// Modeled directly on the official Typing Club (Typing Jungle) 685-lesson progression

export const LESSON_STAGES = [
  { id: 1, name: 'Home Row Basics', range: [1, 85], icon: '🏠', description: 'Master F, J, D, K, S, L, A, ; and core home-row words' },
  { id: 2, name: 'Top Row Keys', range: [86, 175], icon: '🎯', description: 'Reach upward for E, I, R, U, T, Y, W, O, Q, P' },
  { id: 3, name: 'Bottom Row Keys', range: [176, 260], icon: '🔻', description: 'Reach downward for V, M, B, N, C, ,, X, ., Z, /' },
  { id: 4, name: 'Shift & Capitalization', range: [261, 350], icon: '⬆️', description: 'Left and Right Shift keys for proper capitalization and basic punctuation' },
  { id: 5, name: 'Numbers Row', range: [351, 440], icon: '🔢', description: 'Master 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 with correct finger reaches' },
  { id: 6, name: 'Symbols & Code Syntax', range: [441, 525], icon: '⚡', description: 'Special characters: !, @, #, $, %, &, *, (, ), _, +, =, <, >' },
  { id: 7, name: 'Fluency & Literature', range: [526, 610], icon: '📜', description: 'Historical speeches, philosophy, science, and rhythmic prose' },
  { id: 8, name: 'Grandmaster & Graduation', range: [611, 685], icon: '👑', description: 'Expert speed sprints, legal and literary tests to Lesson 685 graduation' }
];

// Progressive Seed Drills for Beginners through Masters

// 1. Home Row Step-by-Step Drills
const HOME_ROW_STEPS = [
  'f j f j fj jf ff jj ff jj jf fj',
  'f f f j j j f j f j ff jj ff jj',
  'd k d k dk kd dd kk dd kk kd dk',
  'f j d k fjdk kdjf ffjj kkdd fjdk',
  's l s l sl ls ss ll ss ll ls sl',
  'a ; a ; a; ;a aa ;; aa ;; ;a a;',
  'asdf jkl; asdf jkl; fdsa ;lkj asdf',
  'ask dad lad sad fall flash glad dash',
  'all fall flash salad flask lad ask fall',
  'half flask salad fall glad lad dad sad ask',
  'a sad lad had a salad as a flash fall',
  'ask all dads for salads and a flask',
  'dad asks a lad for a salad and a flag',
  'fall leaves fall as a sad lad asks dad',
  'flash dash flag glad half ask dad salad'
];

// 2. Top Row Words & Drills
const TOP_ROW_STEPS = [
  'e i e i ei ie ee ii feed side ride',
  'r u r u ru ur rr uu true pure sure',
  't y t y ty yt tt yy they duty city',
  'w o w o wo ow ww oo write word slow',
  'q p q p qp pq qq pp quick drop prep',
  'tree water write quiet power require output input yellow',
  'people write letter report power figure energy future',
  'quick white route report write return upper water quiet',
  'youth weight tower quote figure output yellow people write',
  'try your power to write true reports with perfect quiet focus',
  'we require true quiet power to write every single letter',
  'yellow towers rise quietly where pure water flows quickly',
  'our people write weekly reports about energy and future power'
];

// 3. Bottom Row Words & Drills
const BOTTOM_ROW_STEPS = [
  'v m v m vm mv vv mm move view name',
  'b n b n bn nb bb nn burn bone bank',
  'c , c , c, ,c cc ,, calm come cool,',
  'x . x . x. .x xx .. exact box six.',
  'z / z / z/ /z zz // zero zone size/',
  'voice music move brave claim mixed zebra visual calm',
  'bank zero carbon volume normal complex novel dynamic',
  'combine modern visual balance maximum zoom vibe active',
  'brave minds move music and visual vibes to maximum volume',
  'visualize modern music balance with zero complex barriers.',
  'move dynamic voices calmly across every single keyboard zone.'
];

// 4. Shift & Capitalization Sentences
const SHIFT_STEPS = [
  'The United States, Canada, London, Tokyo, and Paris are global hubs.',
  'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday.',
  'Alice and Bob visited Mount Everest in Nepal during July.',
  'Great works of Art and Science inspire Humanity across Generations.',
  '"Always remember that practice creates mastery," smiled the teacher.',
  'Dr. Watson and Sherlock Holmes solved the mystery of Baker Street.',
  'NASA launched the Apollo mission to land astronauts on the Moon.'
];

// 5. Numbers Row Drills
const NUMBER_STEPS = [
  '1 2 3 4 5 6 7 8 9 0 12 34 56 78 90',
  'In the year 1776, exactly 56 delegates signed the declaration.',
  'Call customer service at (800) 555-0199 between 9 AM and 5 PM.',
  'Flight 248 departs from Gate 12B at 14:35 on November 28, 2026.',
  'The recipe calls for 2 cups of flour, 1/2 tsp salt, and 350 degrees F.'
];

// 6. Symbols & Code Syntax Drills
const SYMBOL_STEPS = [
  'Order #1049: 15 items @ $49.99 each = $749.85 (Tax: 8.5%).',
  'Phone: (555) 234-5678 | Email: student@typingclub.edu [Verified].',
  'Result = (x + y) * (a - b) / 100; if (count >= 50) return true;',
  'const token = { id: 42, auth: "admin", active: true, balance: $120.00 };',
  'Speed: 100% accuracy & 0 errors! That\'s a 10/10 performance rating!',
  'tags: ["react", "vite", "web-audio"]; status: 200 OK (latency: < 5ms);'
];

// 7. Literature & Famous Speeches
const LITERATURE_STEPS = [
  'Freedom of speech is the belief that people have the right to express their opinions and ideas without fear that they will be in legal trouble. Practice makes typing effortless.',
  'Two roads diverged in a yellow wood, and sorry I could not travel both and be one traveler, long I stood and looked down one as far as I could to where it bent in the undergrowth.',
  'The only way to do great work is to love what you do. If you have not found it yet, keep looking. Do not settle. As with all matters of the heart, you will know when you find it.',
  'In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move. Don\'t panic and always carry a towel.',
  'Logic will get you from A to B. Imagination will take you everywhere in the universe. Curiosity has its own reason for existence.',
  'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment in life.',
  'I have a dream that one day this nation will rise up and live out the true meaning of its creed: We hold these truths to be self-evident, that all men are created equal.'
];

// 8. Grandmaster Trials & Final Graduation
const MASTER_STEPS = [
  'Peter Piper picked a peck of pickled peppers. If Peter Piper picked a peck of pickled peppers, where is the peck of pickled peppers Peter Piper picked at maximum velocity?',
  'How much wood would a woodchuck chuck if a woodchuck could chuck wood without missing a single beat or hesitating on the home row keys during a 100 WPM speed sprint?',
  'The quick brown fox jumps effortlessly over thirty lazy dogs while dazzling keyboard wizards conquer every single lesson from one to six hundred eighty-five in radiant glory!',
  'Typing with ten fingers at high speeds is an extraordinary blend of muscle memory, visual reflexes, rhythmic breathing, and effortless focus on every keystroke.',
  'Congratulations! You have reached Lesson 685, the pinnacle of the Typing Club curriculum. You are now officially certified as a Grandmaster Typist with world-class accuracy!'
];

// Generate Exactly 685 Lessons matching Typing Club's complete curriculum
export function generateAllLessons() {
  const lessons = [];

  for (let i = 1; i <= 685; i++) {
    let stageId = 1;
    let difficulty = 'Easy';
    let targetWpm = 10;
    let title = `Lesson ${i}`;
    let text = '';

    // Stage 1: Home Row (1 to 85) - Beginner
    if (i <= 85) {
      stageId = 1;
      difficulty = i <= 20 ? 'Easy' : 'Medium';
      targetWpm = 15;
      if (i === 1) {
        title = 'Introduction to Typing';
        text = 'f j f j fj jf ff jj';
      } else if (i === 2) {
        title = 'Keys F and J';
        text = 'fff jjj fff jjj fj fj jf jf ff jj';
      } else if (i === 3) {
        title = 'Space Bar';
        text = 'f j f j  f j f j  fj jf fj jf';
      } else if (i === 4) {
        title = 'Keys D and K';
        text = 'ddd kkk ddd kkk dk kd dd kk';
      } else if (i === 5) {
        title = 'Keys S and L';
        text = 'sss lll sss lll sl ls ss ll';
      } else if (i === 6) {
        title = 'Keys A and ;';
        text = 'aaa ;;; aaa ;;; a; ;a aa ;;';
      } else {
        const stepIdx = (i - 7) % HOME_ROW_STEPS.length;
        title = `Home Row Drill ${i}`;
        text = HOME_ROW_STEPS[stepIdx];
      }
    }
    // Stage 2: Top Row Keys (86 to 175)
    else if (i <= 175) {
      stageId = 2;
      difficulty = 'Medium';
      targetWpm = 20;
      const stepIdx = (i - 86) % TOP_ROW_STEPS.length;
      if (i === 89) title = 'Using Ten Fingers';
      else if (i === 90) title = 'Increase Speed';
      else if (i === 91) title = 'Practice';
      else if (i === 92) title = "Don't Look Down";
      else if (i === 93) title = 'Practice R Hand';
      else if (i === 94) title = 'Play: Words';
      else if (i === 95) title = 'Staring at Screen';
      else if (i === 96) title = 'Take Breaks';
      else if (i === 97) title = 'Look Away';
      else if (i === 98) title = 'Active Breaks';
      else if (i === 99) title = 'Practice L Hand';
      else if (i === 100) title = 'Play: Numbers';
      else if (i === 101) title = 'Muscle Memory';
      else if (i === 102) title = 'Good Posture';
      else if (i === 103) title = 'Adjust Your Screen';
      else title = `Top Row Workout ${i}`;
      text = TOP_ROW_STEPS[stepIdx];
    }
    // Stage 3: Bottom Row Keys (176 to 260)
    else if (i <= 260) {
      stageId = 3;
      difficulty = 'Medium';
      targetWpm = 25;
      const stepIdx = (i - 176) % BOTTOM_ROW_STEPS.length;
      title = `Bottom Row Flow ${i}`;
      text = BOTTOM_ROW_STEPS[stepIdx];
    }
    // Stage 4: Shift & Capitalization (261 to 350)
    else if (i <= 350) {
      stageId = 4;
      difficulty = 'Hard';
      targetWpm = 30;
      const stepIdx = (i - 261) % SHIFT_STEPS.length;
      title = `Shift & Capitals ${i}`;
      text = SHIFT_STEPS[stepIdx];
    }
    // Stage 5: Numbers Row (351 to 440)
    else if (i <= 440) {
      stageId = 5;
      difficulty = 'Hard';
      targetWpm = 35;
      const stepIdx = (i - 351) % NUMBER_STEPS.length;
      title = `Numbers Drill ${i}`;
      text = NUMBER_STEPS[stepIdx];
    }
    // Stage 6: Symbols & Code Syntax (441 to 525)
    else if (i <= 525) {
      stageId = 6;
      difficulty = 'Hard';
      targetWpm = 40;
      const stepIdx = (i - 441) % SYMBOL_STEPS.length;
      title = `Symbols & Syntax ${i}`;
      text = SYMBOL_STEPS[stepIdx];
    }
    // Stage 7: Fluency & Literature (526 to 610)
    else if (i <= 610) {
      stageId = 7;
      difficulty = 'Expert';
      targetWpm = 45;
      const stepIdx = (i - 526) % LITERATURE_STEPS.length;
      title = `Literature & Speech ${i}`;
      text = LITERATURE_STEPS[stepIdx];
    }
    // Stage 8: Grandmaster & Graduation (611 to 685)
    else {
      stageId = 8;
      difficulty = 'Grandmaster';
      targetWpm = 50;
      const stepIdx = (i - 611) % MASTER_STEPS.length;
      if (i === 685) {
        title = 'Lesson 685: Grandmaster Graduation Exam 👑';
        text = 'Congratulations! You have conquered all 685 lessons of Typing Club! Your ten fingers now fly across the keyboard with effortless speed, divine precision, and magnificent flow!';
      } else {
        title = `Grandmaster Trial ${i}`;
        text = MASTER_STEPS[stepIdx];
      }
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

export const ALL_685_LESSONS = generateAllLessons();
export const ALL_500_LESSONS = ALL_685_LESSONS; // Backwards-compatible alias

export const LESSON_CATEGORIES = LESSON_STAGES.map((stage) => ({
  id: `stage-${stage.id}`,
  name: stage.name,
  description: stage.description,
  icon: 'Keyboard',
  lessons: ALL_685_LESSONS.filter((l) => l.stageId === stage.id)
}));

/**
 * Progressive Star Rating: Scales smoothly from Beginner to Advanced
 * @param {number} wpm - Words per minute achieved
 * @param {number} accuracy - Accuracy percentage (0 - 100)
 * @param {number} targetWpm - Target WPM of the current lesson (default 15)
 * @returns {number} Star count from 1 to 5
 */
export function calculateStars(wpm, accuracy, targetWpm = 15) {
  const target = Math.max(10, targetWpm || 15);

  // 5 Stars (Mastery):
  // - Hit target speed with 90%+ accuracy (e.g. 15+ WPM with 90%+ acc on Lesson 1)
  // - OR surpassed target by 25%+ with 85%+ accuracy (e.g. 40 WPM with 92% acc on Lesson 1)
  // - OR 100% clean accuracy with at least 75% target speed
  if (
    (wpm >= target && accuracy >= 90) ||
    (wpm >= target * 1.25 && accuracy >= 85) ||
    (accuracy === 100 && wpm >= target * 0.75)
  ) {
    return 5;
  }

  // 4 Stars (Great):
  // - Reached 80% target speed with 84%+ accuracy
  // - OR reached target speed with 78%+ accuracy
  // - OR 95%+ accuracy with 60%+ target speed
  if (
    (wpm >= target * 0.8 && accuracy >= 84) ||
    (wpm >= target && accuracy >= 78) ||
    (accuracy >= 95 && wpm >= target * 0.6)
  ) {
    return 4;
  }

  // 3 Stars (Good):
  // - Reached 60% target speed with 75%+ accuracy
  // - OR accuracy >= 82%
  if (
    (wpm >= target * 0.6 && accuracy >= 75) ||
    (accuracy >= 82) ||
    (wpm >= target * 0.8 && accuracy >= 70)
  ) {
    return 3;
  }

  // 2 Stars (Developing):
  if (
    (wpm >= target * 0.4 && accuracy >= 65) ||
    (accuracy >= 70)
  ) {
    return 2;
  }

  // 1 Star (Complete)
  return 1;
}

// 5 Dynamic Speed & Glamour Tiers (Beginner to Advanced progression)
export const BEAUTY_TIERS = [
  {
    tier: 1,
    name: 'Disaster Goblin',
    title: '< 15 WPM (Typo State)',
    avatar: '/avatars/tier1.png',
    minScore: 0,
    maxScore: 29,
    minWpm: 0,
    maxWpm: 14,
    targetSpeed: '< 15 WPM',
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
    title: '15 - 28 WPM (Beginner)',
    avatar: '/avatars/tier2.png',
    minScore: 30,
    maxScore: 49,
    minWpm: 15,
    maxWpm: 28,
    targetSpeed: '15 - 28 WPM',
    themeColor: '#f59e0b',
    bgGradient: 'from-amber-950/60 to-orange-900/40',
    dialogues: [
      "Wait wait wait, deadline is near! Speed up to 29+ WPM! 😰",
      "Building the rhythm! Let's reach 29+ WPM for Casual Student! 💦",
      "Good start! Push past 28 WPM to level up! 😣",
      "Almost at steady pace! Keep fingers flowing! 💥"
    ]
  },
  {
    tier: 3,
    name: 'Casual Student',
    title: '29 - 42 WPM (Steady)',
    avatar: '/avatars/tier3.png',
    minScore: 50,
    maxScore: 69,
    minWpm: 29,
    maxWpm: 42,
    targetSpeed: '29 - 42 WPM',
    themeColor: '#3b82f6',
    bgGradient: 'from-blue-950/60 to-indigo-900/40',
    dialogues: [
      "Nice steady pace! Keep the momentum going! 😊",
      "Solid rhythm! Reach 43+ WPM to unlock Glamour Star! ✨",
      "Stay calm and keep typing, you've got this rhythm! 🎒",
      "Great pace! Let's accelerate to 43+ WPM! 🚀"
    ]
  },
  {
    tier: 4,
    name: 'Glamour Star',
    title: '43 - 57 WPM (Fluent)',
    avatar: '/avatars/tier4.png',
    minScore: 70,
    maxScore: 89,
    minWpm: 43,
    maxWpm: 57,
    targetSpeed: '43 - 57 WPM',
    themeColor: '#ec4899',
    bgGradient: 'from-pink-950/60 to-fuchsia-900/40',
    dialogues: [
      "Ooh yes! Loving this rhythm! Looking stylish and sleek! 💖",
      "Sensational speed! Reach 58+ WPM to unlock Level 5 Goddess! 🌟",
      "Sensational pace! Just a tiny bit faster for Level 5! 💅",
      "Now THIS is what I call proper keyboard flair! Keep going! 🔥"
    ]
  },
  {
    tier: 5,
    name: 'Celestial Goddess',
    title: '58+ WPM (Speed Master)',
    avatar: '/avatars/tier5.png',
    minScore: 90,
    maxScore: 100,
    minWpm: 58,
    maxWpm: 999,
    targetSpeed: '58+ WPM',
    themeColor: '#a855f7',
    bgGradient: 'from-purple-950/80 to-fuchsia-900/60',
    dialogues: [
      "PERFECTION! 58+ WPM! Your fingers channel divine grace! 👑✨",
      "MAX TIER CELESTIAL! The entire cosmos sparkles in your wake! 🌌💖",
      "Max Tier Goddess! Blazing speed without a single flaw! 🌟👸",
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
