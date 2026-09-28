// Adaptive Weakness Analyzer & Dynamic Paragraph Generator
// Analyzes keystroke latencies, identifies slow fingers, letters, and challenging words,
// and synthesizes full, coherent paragraphs of NEW REAL WORDS (not isolated letters) to overcome weaknesses.

import { KEY_FINGER_MAP } from '../data/lessons';

export const FINGER_ORDER = [
  'Left Pinky',
  'Left Ring',
  'Left Middle',
  'Left Index',
  'Thumb',
  'Right Index',
  'Right Middle',
  'Right Ring',
  'Right Pinky'
];

export const FINGER_META = {
  'Left Pinky': {
    name: 'Left Pinky',
    shortName: 'L. Pinky',
    hand: 'left',
    color: '#f43f5e',
    keys: ['q', 'a', 'z', '1', '`'],
    typicalAvgMs: 270
  },
  'Left Ring': {
    name: 'Left Ring',
    shortName: 'L. Ring',
    hand: 'left',
    color: '#fb923c',
    keys: ['w', 's', 'x', '2'],
    typicalAvgMs: 250
  },
  'Left Middle': {
    name: 'Left Middle',
    shortName: 'L. Middle',
    hand: 'left',
    color: '#eab308',
    keys: ['e', 'd', 'c', '3'],
    typicalAvgMs: 210
  },
  'Left Index': {
    name: 'Left Index',
    shortName: 'L. Index',
    hand: 'left',
    color: '#22c55e',
    keys: ['r', 't', 'f', 'g', 'v', 'b', '4', '5'],
    typicalAvgMs: 195
  },
  'Thumb': {
    name: 'Thumb',
    shortName: 'Thumb',
    hand: 'both',
    color: '#8b5cf6',
    keys: [' '],
    typicalAvgMs: 180
  },
  'Right Index': {
    name: 'Right Index',
    shortName: 'R. Index',
    hand: 'right',
    color: '#06b6d4',
    keys: ['y', 'u', 'h', 'j', 'n', 'm', '6', '7'],
    typicalAvgMs: 195
  },
  'Right Middle': {
    name: 'Right Middle',
    shortName: 'R. Middle',
    hand: 'right',
    color: '#3b82f6',
    keys: ['i', 'k', ',', '8'],
    typicalAvgMs: 210
  },
  'Right Ring': {
    name: 'Right Ring',
    shortName: 'R. Ring',
    hand: 'right',
    color: '#a855f7',
    keys: ['o', 'l', '.', '9'],
    typicalAvgMs: 250
  },
  'Right Pinky': {
    name: 'Right Pinky',
    shortName: 'R. Pinky',
    hand: 'right',
    color: '#ec4899',
    keys: ['p', ';', "'", '/', '-', '=', '[', ']', '0'],
    typicalAvgMs: 275
  }
};

// Rich vocabulary categorized by target finger and complex key combinations
// "based on the weakness of our word it will give new words not new letter please"
export const FINGER_VOCABULARY = {
  'Left Pinky': [
    'amaze', 'aquatic', 'antique', 'quartz', 'equal', 'plaza', 'hazard', 'analyze',
    'bizarre', 'zeal', 'quality', 'quaint', 'dazzle', 'squeeze', 'ablaze', 'applaud',
    'awake', 'acquire', 'casual', 'galaxy', 'splash', 'attack', 'drama', 'panic',
    'radar', 'zigzag', 'zodiac', 'bazaar', 'lizard', 'frozen', 'pajama', 'citizen',
    'breeze', 'puzzle', 'stanza', 'qualify', 'zealous', 'quench', 'altitude', 'annual'
  ],
  'Left Ring': [
    'shadow', 'switch', 'complex', 'explore', 'syntax', 'matrix', 'whisper', 'wisdom',
    'expand', 'sunset', 'swiftly', 'reflex', 'mixture', 'expect', 'expert', 'simple',
    'subtle', 'system', 'season', 'silver', 'slowly', 'square', 'stress', 'sudden',
    'sweep', 'oxygen', 'fixture', 'wax', 'index', 'pretext', 'wealth', 'worthy',
    'wizard', 'awkward', 'witness', 'western', 'welcome', 'wander', 'warmth', 'answer'
  ],
  'Left Middle': [
    'decide', 'direct', 'delicate', 'credit', 'cadence', 'deduce', 'cedar', 'declare',
    'candle', 'distinct', 'exceed', 'circle', 'center', 'discover', 'defend', 'demand',
    'define', 'depth', 'decade', 'doctor', 'desert', 'device', 'degree', 'detail',
    'detect', 'decent', 'curious', 'custom', 'clarity', 'clever', 'cinema', 'calmly'
  ],
  'Left Index': [
    'brave', 'gravity', 'tribute', 'future', 'bright', 'freedom', 'gather', 'victory',
    'trigger', 'travel', 'vibrant', 'forget', 'bridge', 'border', 'breath', 'flight',
    'gentle', 'garden', 'guitar', 'harvest', 'target', 'trust', 'thought', 'velvet',
    'virtue', 'buffer', 'benefit', 'balance', 'battery', 'beauty', 'becoming', 'beyond'
  ],
  'Right Index': [
    'human', 'journey', 'rhythm', 'genuine', 'harmony', 'nature', 'humor', 'youth',
    'unknown', 'jump', 'humble', 'summary', 'jungle', 'margin', 'memory', 'moment',
    'honey', 'highway', 'myth', 'nuance', 'mirror', 'mountain', 'joyful', 'enjoy',
    'major', 'manner', 'modern', 'manage', 'motion', 'market', 'native', 'number'
  ],
  'Right Middle': [
    'kindred', 'strike', 'kitchen', 'shield', 'quick', 'skill', 'knife', 'mimic',
    'shrink', 'liquid', 'silent', 'skip', 'trick', 'brink', 'link', 'blink',
    'picnic', 'kick', 'thick', 'sticky', 'brick', 'clinic', 'risk', 'brisk',
    'kingdom', 'knight', 'kettle', 'kidney', 'kinetic', 'kitten', 'ticket', 'cricket'
  ],
  'Right Ring': [
    'blossom', 'colorful', 'lonely', 'sorrow', 'willow', 'golden', 'follow', 'colossal',
    'glow', 'swallow', 'polar', 'hollow', 'floral', 'loyal', 'glory', 'solar',
    'local', 'float', 'cloud', 'floor', 'bloom', 'loop', 'scroll', 'follow',
    'cool', 'fool', 'wool', 'solo', 'polo', 'look', 'book', 'tool', 'spoon', 'moon'
  ],
  'Right Pinky': [
    'people', 'prompt', 'purpose', 'philosophy', 'polite', 'sparkle', 'prepare', 'symptom',
    'pattern', 'popular', 'explore', 'apply', 'purple', 'puppy', 'impact', 'oppose',
    'poetry', 'physics', 'puppet', 'pepper', 'ripple', 'supply', 'copper', 'temple',
    'simple', 'sample', 'planet', 'portal', 'palace', 'pocket', 'potion', 'powder'
  ],
  'Thumb': [
    'space', 'tempo', 'rhythm', 'balance', 'poise', 'breath', 'stride', 'motion', 'flow'
  ]
};

// Natural themes & paragraph templates that weave targeted words into elegant English prose
const PARAGRAPH_TEMPLATES = [
  {
    topic: 'Mastery & Focus',
    sentences: [
      'True typing mastery begins when fingers move with quiet {w1} and effortless {w2}.',
      'As you navigate every challenging {w3}, your hands unlock a deeper sense of {w4}.',
      'The mind learns to {w5} each subtle movement, turning raw effort into pure {w6}.',
      'With steady rhythm, even the most {w7} patterns transform into a smooth {w8} across the keys.',
      'Celebrate every leap forward as your {w9} mind commands the keys with renewed {w10}.'
    ]
  },
  {
    topic: 'Exploration & Discovery',
    sentences: [
      'Travelers who dare to {w1} the unknown often discover an unexpected {w2}.',
      'Beyond the crowded {w3}, a vibrant {w4} stretches toward the distant horizon.',
      'Curious explorers seek to {w5} hidden secrets with patience and bold {w6}.',
      'Every ancient {w7} whispers tales of courage that can {w8} the human spirit.',
      'In the quiet {w9} of the evening, new insights sparkle with enduring {w10}.'
    ]
  },
  {
    topic: 'Nature & Harmony',
    sentences: [
      'When morning light touches the {w1}, a gentle {w2} sweeps across the valley.',
      'Golden leaves begin to {w3} upon calm waters where graceful shadows {w4}.',
      'Nature preserves a delicate {w5} that human wisdom strives to {w6}.',
      'The radiant {w7} of wild flowers brings a sudden {w8} to all who behold it.',
      'Let your inner cadence echo this timeless {w9} as you embrace quiet {w10}.'
    ]
  },
  {
    topic: 'Innovation & Artistry',
    sentences: [
      'Great thinkers design each {w1} with meticulous care and creative {w2}.',
      'They refuse to {w3} when encountering a {w4} barrier in their research.',
      'Instead they {w5} novel paths, turning abstract thoughts into a tangible {w6}.',
      'Such dedication can {w7} ordinary ideas into an extraordinary {w8}.',
      'True craft demands persistent {w9} and the courage to seek higher {w10}.'
    ]
  },
  {
    topic: 'Cosmic Horizons',
    sentences: [
      'Beneath the starlit sky, distant galaxies {w1} with ancient and majestic {w2}.',
      'Astronomers peer through the darkness to {w3} the mysteries of our boundless {w4}.',
      'A silent comet leaves a shimmering {w5} that will {w6} observers across generations.',
      'Each cosmic {w7} reminds us of our humble place within this grand {w8}.',
      'The journey to knowledge is endless, inviting us to {w9} our vision with luminous {w10}.'
    ]
  }
];

const STORAGE_KEY = 'glowtype_weakness_profile';

// Create initial baseline profile with realistic touch-typing calibrations
export function createDefaultProfile() {
  const fingers = {};
  FINGER_ORDER.forEach((fingerName) => {
    const meta = FINGER_META[fingerName];
    fingers[fingerName] = {
      name: fingerName,
      hits: 0,
      totalMs: 0,
      avgMs: meta.typicalAvgMs,
      errors: 0
    };
  });

  const letters = {};
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach((ch) => {
    letters[ch] = {
      char: ch,
      hits: 0,
      totalMs: 0,
      avgMs: 230,
      errors: 0
    };
  });

  return {
    version: 1,
    fingers,
    letters,
    weakWords: [
      { word: 'complex', avgMs: 310, errors: 1, timestamp: Date.now() },
      { word: 'quartz', avgMs: 340, errors: 1, timestamp: Date.now() },
      { word: 'explore', avgMs: 290, errors: 0, timestamp: Date.now() },
      { word: 'people', avgMs: 295, errors: 1, timestamp: Date.now() }
    ],
    completedWorkouts: 0,
    lastWorkoutTime: null
  };
}

// Load profile from localStorage
export function loadWeaknessProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.fingers && parsed.letters) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load weakness profile from localStorage:', err);
  }
  const defaultProf = createDefaultProfile();
  saveWeaknessProfile(defaultProf);
  return defaultProf;
}

// Save profile to localStorage
export function saveWeaknessProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.warn('Failed to save weakness profile:', err);
  }
}

// Map key character to finger name
export function getFingerForKey(char) {
  if (!char) return null;
  const lower = char.toLowerCase();
  const mapping = KEY_FINGER_MAP[lower];
  if (mapping && mapping.finger) {
    return mapping.finger;
  }
  if (char === ' ') return 'Thumb';
  return null;
}

// Record a single keystroke
export function recordKeystroke(profile, char, typedChar, isCorrect, latencyMs) {
  if (!profile || !char) return profile;

  // Filter out anomalies (e.g. user took a break: > 3000ms, or impossible < 30ms)
  const clampedLatency = Math.max(50, Math.min(latencyMs || 200, 2000));
  const lowerChar = char.toLowerCase();
  const fingerName = getFingerForKey(lowerChar);

  // Update finger stats
  if (fingerName && profile.fingers[fingerName]) {
    const f = profile.fingers[fingerName];
    f.hits = (f.hits || 0) + 1;
    f.totalMs = (f.totalMs || 0) + clampedLatency;
    f.avgMs = Math.round(f.totalMs / f.hits);
    if (!isCorrect) {
      f.errors = (f.errors || 0) + 1;
    }
  }

  // Update letter stats (for a-z)
  if (lowerChar >= 'a' && lowerChar <= 'z') {
    if (!profile.letters[lowerChar]) {
      profile.letters[lowerChar] = { char: lowerChar, hits: 0, totalMs: 0, avgMs: 230, errors: 0 };
    }
    const l = profile.letters[lowerChar];
    l.hits = (l.hits || 0) + 1;
    l.totalMs = (l.totalMs || 0) + clampedLatency;
    l.avgMs = Math.round(l.totalMs / l.hits);
    if (!isCorrect) {
      l.errors = (l.errors || 0) + 1;
    }
  }

  return profile;
}

// Record completed word metrics
export function recordWordCompleted(profile, word, durationMs, errorCount) {
  if (!profile || !word) return profile;
  const cleanWord = word.trim().toLowerCase().replace(/[^a-z]/g, '');
  if (cleanWord.length < 3) return profile;

  const msPerChar = Math.round(durationMs / Math.max(1, cleanWord.length));
  const isTricky = errorCount > 0 || msPerChar > 280;

  if (isTricky) {
    if (!Array.isArray(profile.weakWords)) profile.weakWords = [];

    // Check if word already exists in weakWords
    const existingIdx = profile.weakWords.findIndex((item) => item.word === cleanWord);
    if (existingIdx !== -1) {
      const prev = profile.weakWords[existingIdx];
      profile.weakWords[existingIdx] = {
        word: cleanWord,
        avgMs: Math.round((prev.avgMs + msPerChar) / 2),
        errors: (prev.errors || 0) + errorCount,
        timestamp: Date.now()
      };
    } else {
      profile.weakWords.unshift({
        word: cleanWord,
        avgMs: msPerChar,
        errors: errorCount,
        timestamp: Date.now()
      });
      // Keep up to 35 unique weak words
      if (profile.weakWords.length > 35) {
        profile.weakWords = profile.weakWords.slice(0, 35);
      }
    }
  }

  return profile;
}

// Get comprehensive speed and health report for all 9 fingers
export function getFingerSpeedReport(profile) {
  return FINGER_ORDER.map((fingerName) => {
    const meta = FINGER_META[fingerName];
    const stat = profile?.fingers?.[fingerName] || {
      hits: 0,
      avgMs: meta.typicalAvgMs,
      errors: 0
    };

    const avg = stat.avgMs || meta.typicalAvgMs;
    const errorRate = stat.hits > 0 ? (stat.errors / stat.hits) : 0;

    // Weakness score combines response time (latency) + error penalty
    const weaknessScore = avg + (errorRate * 400);

    let status = 'fast';
    let statusLabel = 'Fast';
    let statusColor = 'text-emerald-500 dark:text-emerald-400';
    let bgBadge = 'bg-emerald-500/10 border-emerald-500/30';

    if (avg > 280 || errorRate > 0.12) {
      status = 'slow';
      statusLabel = 'Needs Practice';
      statusColor = 'text-rose-600 dark:text-rose-400';
      bgBadge = 'bg-rose-500/15 border-rose-500/30';
    } else if (avg > 225 || errorRate > 0.06) {
      status = 'moderate';
      statusLabel = 'Moderate';
      statusColor = 'text-amber-500 dark:text-amber-300';
      bgBadge = 'bg-amber-500/15 border-amber-500/30';
    }

    return {
      fingerName,
      shortName: meta.shortName,
      hand: meta.hand,
      color: meta.color,
      keys: meta.keys,
      avgMs: avg,
      hits: stat.hits || 0,
      errors: stat.errors || 0,
      weaknessScore,
      status,
      statusLabel,
      statusColor,
      bgBadge
    };
  });
}

// Identify the top weakest fingers
export function getWeakestFingers(profile, topN = 2) {
  const report = getFingerSpeedReport(profile);
  // Exclude Thumb unless it has high errors
  const fingersOnly = report.filter((f) => f.fingerName !== 'Thumb');
  fingersOnly.sort((a, b) => b.weaknessScore - a.weaknessScore);
  return fingersOnly.slice(0, topN);
}

// Identify the slowest/error-prone letters
export function getSlowestLetters(profile, topN = 5) {
  if (!profile?.letters) return ['q', 'p', 'z', 'x', 'w'];
  const list = Object.values(profile.letters).map((l) => {
    const errorRate = l.hits > 0 ? (l.errors / l.hits) : 0;
    const score = (l.avgMs || 230) + (errorRate * 350);
    return {
      char: l.char,
      avgMs: l.avgMs || 230,
      hits: l.hits,
      errors: l.errors,
      score
    };
  });
  list.sort((a, b) => b.score - a.score);
  return list.slice(0, topN);
}

// Get the user's recorded challenging words
export function getChallengingWords(profile, topN = 8) {
  if (!profile?.weakWords || profile.weakWords.length === 0) {
    return ['quartz', 'complex', 'explore', 'people', 'shadow', 'amaze'];
  }
  return profile.weakWords
    .slice(0, topN)
    .map((item) => item.word);
}

// Helper to shuffle an array
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Adaptive Generator: Synthesizes a brand new paragraph composed of real, rich words
 * targeting the user's specific weak fingers, slowest letters, and tricky words.
 * "based on the weakness of our word it will give new words not new letter please"
 */
export function generateWeaknessWorkout({
  profile = null,
  length = 'medium', // 'short' (25-35 words) | 'medium' (45-60 words) | 'long' (75-95 words)
  mode = 'adaptive', // 'adaptive' | 'pinky' | 'ring' | 'tricky' | 'speed'
  focusFinger = null
} = {}) {
  const prof = profile || loadWeaknessProfile();
  const slowestFingers = getWeakestFingers(prof, 3);
  const slowestLetters = getSlowestLetters(prof, 5);
  const userWeakWords = getChallengingWords(prof, 8);

  // Determine which finger(s) to target
  let targetFingerNames = [];
  if (focusFinger && FINGER_META[focusFinger]) {
    targetFingerNames = [focusFinger];
  } else if (mode === 'pinky') {
    targetFingerNames = ['Left Pinky', 'Right Pinky'];
  } else if (mode === 'ring') {
    targetFingerNames = ['Left Ring', 'Right Ring'];
  } else {
    // Adaptive: Top 2 weakest fingers
    targetFingerNames = slowestFingers.slice(0, 2).map((f) => f.fingerName);
  }

  // Gather vocabulary targeting these fingers
  const targetWordsPool = [];
  targetFingerNames.forEach((fName) => {
    const words = FINGER_VOCABULARY[fName] || [];
    targetWordsPool.push(...words);
  });

  // Also include words from slow letters if pool is small
  slowestLetters.forEach(({ char }) => {
    Object.values(FINGER_VOCABULARY).forEach((list) => {
      list.forEach((w) => {
        if (w.includes(char) && !targetWordsPool.includes(w)) {
          targetWordsPool.push(w);
        }
      });
    });
  });

  // Inject recent user weak words
  userWeakWords.forEach((w) => {
    if (!targetWordsPool.includes(w)) {
      targetWordsPool.unshift(w);
    }
  });

  const shuffledPool = shuffle(targetWordsPool);

  // Pick 10 target words to slot into our paragraph template
  const pickedWords = shuffledPool.slice(0, 10);
  while (pickedWords.length < 10) {
    pickedWords.push('focus', 'rhythm', 'balance', 'mastery');
  }

  // Pick a thematic paragraph template
  const template = PARAGRAPH_TEMPLATES[Math.floor(Math.random() * PARAGRAPH_TEMPLATES.length)];

  // Determine number of sentences based on length setting
  let sentenceCount = 3;
  if (length === 'short') sentenceCount = 2;
  if (length === 'long') sentenceCount = 5;

  const chosenSentences = template.sentences.slice(0, sentenceCount);

  // Replace placeholders {w1} through {w10} with picked target words
  let paragraphText = chosenSentences.join(' ');
  const usedTargetWords = [];

  for (let i = 1; i <= 10; i++) {
    const token = `{w${i}}`;
    if (paragraphText.includes(token)) {
      const word = pickedWords[i - 1];
      paragraphText = paragraphText.replace(token, word);
      if (!usedTargetWords.includes(word)) {
        usedTargetWords.push(word);
      }
    }
  }

  const wordCount = paragraphText.split(/\s+/).filter(Boolean).length;

  return {
    id: `weakness-${Date.now()}`,
    title: `${targetFingerNames.join(' & ')} Adaptive Workout`,
    topic: template.topic,
    targetFingers: targetFingerNames,
    slowLetters: slowestLetters.slice(0, 4).map((l) => l.char),
    targetWords: usedTargetWords,
    text: paragraphText,
    wordCount,
    length,
    mode,
    timestamp: Date.now()
  };
}
