// Bangla Avro (অভ্র) Phonetic Curriculum & Lessons for Room-No-518
// Designed for seamless touch typing practice with English phonetic input converting to Bangla.

export const BANGLA_STAGES = [
  {
    id: 1,
    name: 'মৌলিক সর্বনাম (Basic Pronouns)',
    range: [1, 10],
    icon: '👤',
    description: 'সহজ সর্বনাম ও মূল শব্দ: ami, tumi, se, tara, amra'
  },
  {
    id: 2,
    name: 'অভিবাদন ও সৌজন্য (Greetings & Etiquette)',
    range: [11, 20],
    icon: '🤝',
    description: 'দৈনন্দিন কুশলাদি ও সৌজন্যবোধ: kemon, acho, shuvo, sokal'
  },
  {
    id: 3,
    name: 'পরিবার ও আপনজন (Family & Relations)',
    range: [21, 30],
    icon: '🏡',
    description: 'মা, বাবা, ভাই, বোন, বন্ধু ও আত্মীয় স্বজন'
  },
  {
    id: 4,
    name: 'প্রকৃতি ও চারপাশ (Nature & Everyday Life)',
    range: [31, 40],
    icon: '🌿',
    description: 'নদী, সাগর, আকাশ, বাতাস, ফুল, পাখি ও বৃষ্টি'
  },
  {
    id: 5,
    name: 'দেশ ও বাংলা ভাষা (Motherland & Bangla)',
    range: [41, 50],
    icon: '🇧🇩',
    description: 'সোনার বাংলা, বাংলাদেশ, মাতৃভাষা ও অহংকার'
  },
  {
    id: 6,
    name: 'সুভাষণ ও প্রবাদ (Wisdom & Proverbs)',
    range: [51, 60],
    icon: '💡',
    description: 'উপদেশমূলক বাণী, জ্ঞান ও অনুপ্রেরণাদায়ী কথা'
  },
  {
    id: 7,
    name: 'সাহিত্য ও কবিতা (Literature & Poetry)',
    range: [61, 70],
    icon: '📜',
    description: 'রবীন্দ্রনাথ, নজরুল ও জীবনানন্দ দাশের বিখ্যাত চরণ'
  },
  {
    id: 8,
    name: 'যুক্তাক্ষর ও গতি পরীক্ষা (Conjuncts & Speed Drills)',
    range: [71, 80],
    icon: '👑',
    description: 'জটিল যুক্তাক্ষর, দ্রুত টাইপিং ও মাস্টার লেভেল স্পিড'
  }
];

export const ALL_BANGLA_LESSONS = [
  // ─── Stage 1: Basic Pronouns (Lessons 1 - 10) ───
  {
    number: 1,
    stageId: 1,
    title: 'আমি তুমি সে (I, You, He/She)',
    category: 'Avro Basics',
    targetWpm: 15,
    text: 'আমি তুমি সে',
    phoneticHint: 'ami tumi se',
    words: [
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'তুমি', avro: 'tumi' },
      { bangla: 'সে', avro: 'se' }
    ]
  },
  {
    number: 2,
    stageId: 1,
    title: 'তারা ও আমরা (They & We)',
    category: 'Avro Basics',
    targetWpm: 16,
    text: 'তারা সে আমি তুমি',
    phoneticHint: 'tara se ami tumi',
    words: [
      { bangla: 'তারা', avro: 'tara' },
      { bangla: 'সে', avro: 'se' },
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'তুমি', avro: 'tumi' }
    ]
  },
  {
    number: 3,
    stageId: 1,
    title: 'কে ও কি (Who & What)',
    category: 'Avro Basics',
    targetWpm: 18,
    text: 'কে কি কেন সে আমি',
    phoneticHint: 'ke ki keno se ami',
    words: [
      { bangla: 'কে', avro: 'ke' },
      { bangla: 'কি', avro: 'ki' },
      { bangla: 'কেন', avro: 'keno' },
      { bangla: 'সে', avro: 'se' },
      { bangla: 'আমি', avro: 'ami' }
    ]
  },
  {
    number: 4,
    stageId: 1,
    title: 'হ্যাঁ ও না (Yes & No)',
    category: 'Avro Basics',
    targetWpm: 18,
    text: 'না ভালো সে তুমি আমি',
    phoneticHint: 'na bhalo se tumi ami',
    words: [
      { bangla: 'না', avro: 'na' },
      { bangla: 'ভালো', avro: 'bhalO' },
      { bangla: 'সে', avro: 'se' },
      { bangla: 'তুমি', avro: 'tumi' },
      { bangla: 'আমি', avro: 'ami' }
    ]
  },
  {
    number: 5,
    stageId: 1,
    title: 'এই ও সেই (This & That)',
    category: 'Avro Basics',
    targetWpm: 20,
    text: 'এই সেই আমি তুমি তারা',
    phoneticHint: 'ei sei ami tumi tara',
    words: [
      { bangla: 'এই', avro: 'ei' },
      { bangla: 'সেই', avro: 'sei' },
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'তুমি', avro: 'tumi' },
      { bangla: 'তারা', avro: 'tara' }
    ]
  },
  {
    number: 6,
    stageId: 1,
    title: 'সবাই ও একা (Everyone & Alone)',
    category: 'Avro Basics',
    targetWpm: 20,
    text: 'সবাই একা আমি সে তুমি',
    phoneticHint: 'sobai eka ami se tumi',
    words: [
      { bangla: 'সবাই', avro: 'sobai' },
      { bangla: 'একা', avro: 'eka' },
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'সে', avro: 'se' },
      { bangla: 'তুমি', avro: 'tumi' }
    ]
  },
  {
    number: 7,
    stageId: 1,
    title: 'তুমি কেমন আছো (How Are You)',
    category: 'Avro Sentences',
    targetWpm: 22,
    text: 'তুমি কেমন আছো আমি ভালো',
    phoneticHint: 'tumi kemon acho ami bhalo',
    words: [
      { bangla: 'তুমি', avro: 'tumi' },
      { bangla: 'কেমন', avro: 'kemon' },
      { bangla: 'আছো', avro: 'achhO' },
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'ভালো', avro: 'bhalO' }
    ]
  },
  {
    number: 8,
    stageId: 1,
    title: 'এখানে ও সেখানে (Here & There)',
    category: 'Avro Basics',
    targetWpm: 22,
    text: 'এখানে সেখানে সবাই আছে',
    phoneticHint: 'ekhane shekhane sobai ache',
    words: [
      { bangla: 'এখানে', avro: 'ekhane' },
      { bangla: 'সেখানে', avro: 'sekhane' },
      { bangla: 'সবাই', avro: 'sobai' },
      { bangla: 'আছে', avro: 'ache' }
    ]
  },
  {
    number: 9,
    stageId: 1,
    title: 'কখন ও তখন (When & Then)',
    category: 'Avro Basics',
    targetWpm: 24,
    text: 'কখন তখন এখন আমি আসি',
    phoneticHint: 'kokhon tokhon ekhon ami asi',
    words: [
      { bangla: 'কখন', avro: 'kokhon' },
      { bangla: 'তখন', avro: 'tokhon' },
      { bangla: 'এখন', avro: 'ekhon' },
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'আসি', avro: 'asi' }
    ]
  },
  {
    number: 10,
    stageId: 1,
    title: 'সর্বনাম দক্ষতা পরীক্ষা (Stage 1 Review)',
    category: 'Avro Review',
    targetWpm: 25,
    text: 'আমি তুমি সে তারা সবাই ভালো আছে',
    phoneticHint: 'ami tumi se tara sobai bhalo ache',
    words: [
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'তুমি', avro: 'tumi' },
      { bangla: 'সে', avro: 'se' },
      { bangla: 'তারা', avro: 'tara' },
      { bangla: 'সবাই', avro: 'sobai' },
      { bangla: 'ভালো', avro: 'bhalO' },
      { bangla: 'আছে', avro: 'ache' }
    ]
  },

  // ─── Stage 2: Greetings & Etiquette (Lessons 11 - 20) ───
  {
    number: 11,
    stageId: 2,
    title: 'শুভ সকাল (Good Morning)',
    category: 'Avro Greetings',
    targetWpm: 22,
    text: 'শুভ সকাল বন্ধু কেমন আছো',
    phoneticHint: 'shuvo sokal bondhu kemon acho',
    words: [
      { bangla: 'শুভ', avro: 'shuvo' },
      { bangla: 'সকাল', avro: 'sokal' },
      { bangla: 'বন্ধু', avro: 'bondhu' },
      { bangla: 'কেমন', avro: 'kemon' },
      { bangla: 'আছো', avro: 'achhO' }
    ]
  },
  {
    number: 12,
    stageId: 2,
    title: 'ধন্যবাদ (Thank You)',
    category: 'Avro Greetings',
    targetWpm: 24,
    text: 'ধন্যবাদ অনেক ধন্যবাদ বন্ধু',
    phoneticHint: 'dhonnobad onek dhonnobad bondhu',
    words: [
      { bangla: 'ধন্যবাদ', avro: 'dhon`yobad' },
      { bangla: 'অনেক', avro: 'onek' },
      { bangla: 'ধন্যবাদ', avro: 'dhon`yobad' },
      { bangla: 'বন্ধু', avro: 'bondhu' }
    ]
  },
  {
    number: 13,
    stageId: 2,
    title: 'শুভ রাত্রি (Good Night)',
    category: 'Avro Greetings',
    targetWpm: 24,
    text: 'শুভ রাত্রি ভালো থেকো বন্ধু',
    phoneticHint: 'shuvo ratri bhalo theko bondhu',
    words: [
      { bangla: 'শুভ', avro: 'shuvo' },
      { bangla: 'রাত্রি', avro: 'ratri' },
      { bangla: 'ভালো', avro: 'bhalO' },
      { bangla: 'থেকো', avro: 'thekO' },
      { bangla: 'বন্ধু', avro: 'bondhu' }
    ]
  },
  {
    number: 14,
    stageId: 2,
    title: 'স্বাগতম (Welcome)',
    category: 'Avro Greetings',
    targetWpm: 25,
    text: 'স্বাগতম আমাদের ঘরে আসুন',
    phoneticHint: 'shagotom amader ghore ashun',
    words: [
      { bangla: 'স্বাগতম', avro: 'shagotom' },
      { bangla: 'আমাদের', avro: 'amader' },
      { bangla: 'ঘরে', avro: 'ghore' },
      { bangla: 'আসুন', avro: 'ashun' }
    ]
  },
  {
    number: 15,
    stageId: 2,
    title: 'অনেক শুভেচ্ছা (Best Wishes)',
    category: 'Avro Greetings',
    targetWpm: 25,
    text: 'তোমাকে অনেক শুভেচ্ছা ও ভালোবাসা',
    phoneticHint: 'tomake onek shubheccha o bhalobasha',
    words: [
      { bangla: 'তোমাকে', avro: 'tomake' },
      { bangla: 'অনেক', avro: 'onek' },
      { bangla: 'শুভেচ্ছা', avro: 'shubheccha' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'ভালোবাসা', avro: 'bhalobasha' }
    ]
  },
  {
    number: 16,
    stageId: 2,
    title: 'আজকের দিন (Today)',
    category: 'Avro Phrases',
    targetWpm: 26,
    text: 'আজকের দিনটি অনেক সুন্দর হোক',
    phoneticHint: 'ajker dinti onek shundor hok',
    words: [
      { bangla: 'আজকের', avro: 'ajker' },
      { bangla: 'দিনটি', avro: 'dinti' },
      { bangla: 'অনেক', avro: 'onek' },
      { bangla: 'সুন্দর', avro: 'shundor' },
      { bangla: 'হোক', avro: 'hok' }
    ]
  },
  {
    number: 17,
    stageId: 2,
    title: 'সদা সত্য বলবে (Always Speak Truth)',
    category: 'Avro Phrases',
    targetWpm: 26,
    text: 'সদা সত্য কথা বলবে কখনো মিথ্যা নয়',
    phoneticHint: 'shoda shotyo kotha bolbe kokhono mithya noy',
    words: [
      { bangla: 'সদা', avro: 'shoda' },
      { bangla: 'সত্য', avro: 'shotyo' },
      { bangla: 'কথা', avro: 'kotha' },
      { bangla: 'বলবে', avro: 'bolbe' },
      { bangla: 'কখনো', avro: 'kokhono' },
      { bangla: 'মিথ্যা', avro: 'mithya' },
      { bangla: 'নয়', avro: 'noy' }
    ]
  },
  {
    number: 18,
    stageId: 2,
    title: 'সাহায্য ও দয়া (Help & Kindness)',
    category: 'Avro Phrases',
    targetWpm: 28,
    text: 'দয়া করে আমাকে সাহায্য করুন',
    phoneticHint: 'doya kore amake sahajjo korun',
    words: [
      { bangla: 'দয়া', avro: 'doya' },
      { bangla: 'করে', avro: 'kore' },
      { bangla: 'আমাকে', avro: 'amake' },
      { bangla: 'সাহায্য', avro: 'sahajjo' },
      { bangla: 'করুন', avro: 'korun' }
    ]
  },
  {
    number: 19,
    stageId: 2,
    title: 'কুশল বিনিময় (Polite Conversation)',
    category: 'Avro Phrases',
    targetWpm: 28,
    text: 'আপনি কেমন আছেন আমি ভালো আছি',
    phoneticHint: 'apni kemon achen ami bhalo achi',
    words: [
      { bangla: 'আপনি', avro: 'apni' },
      { bangla: 'কেমন', avro: 'kemon' },
      { bangla: 'আছেন', avro: 'achen' },
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'ভালো', avro: 'bhalO' },
      { bangla: 'আছি', avro: 'achi' }
    ]
  },
  {
    number: 20,
    stageId: 2,
    title: 'সৌজন্য সমাপনী (Stage 2 Review)',
    category: 'Avro Review',
    targetWpm: 30,
    text: 'শুভ সকাল বন্ধু আপনাকে ধন্যবাদ জানাই',
    phoneticHint: 'shuvo sokal bondhu apnake dhonnobad janai',
    words: [
      { bangla: 'শুভ', avro: 'shuvo' },
      { bangla: 'সকাল', avro: 'sokal' },
      { bangla: 'বন্ধু', avro: 'bondhu' },
      { bangla: 'আপনাকে', avro: 'apnake' },
      { bangla: 'ধন্যবাদ', avro: 'dhon`yobad' },
      { bangla: 'জানাই', avro: 'janai' }
    ]
  },

  // ─── Stage 3: Family & Relationships (Lessons 21 - 30) ───
  {
    number: 21,
    stageId: 3,
    title: 'মা ও বাবা (Mother & Father)',
    category: 'Avro Family',
    targetWpm: 25,
    text: 'আমার মা ও বাবা আমার পৃথিবী',
    phoneticHint: 'amar ma o baba amar prithibi',
    words: [
      { bangla: 'আমার', avro: 'amar' },
      { bangla: 'মা', avro: 'ma' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'বাবা', avro: 'baba' },
      { bangla: 'আমার', avro: 'amar' },
      { bangla: 'পৃথিবী', avro: 'prithibi' }
    ]
  },
  {
    number: 22,
    stageId: 3,
    title: 'ভাই ও বোন (Brother & Sister)',
    category: 'Avro Family',
    targetWpm: 26,
    text: 'ছোট ভাই ও বড় বোন খুব প্রিয়',
    phoneticHint: 'choto bhai o boro bon khub priyo',
    words: [
      { bangla: 'ছোট', avro: 'chotO' },
      { bangla: 'ভাই', avro: 'bhai' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'বড়', avro: 'boro' },
      { bangla: 'বোন', avro: 'bon' },
      { bangla: 'খুব', avro: 'khub' },
      { bangla: 'প্রিয়', avro: 'priyo' }
    ]
  },
  {
    number: 23,
    stageId: 3,
    title: 'প্রিয় পরিবার (Loving Family)',
    category: 'Avro Family',
    targetWpm: 28,
    text: 'আমাদের পরিবারে সবাই মিলেমিশে থাকে',
    phoneticHint: 'amader poribare sobai milemishe thake',
    words: [
      { bangla: 'আমাদের', avro: 'amader' },
      { bangla: 'পরিবারে', avro: 'poribare' },
      { bangla: 'সবাই', avro: 'sobai' },
      { bangla: 'মিলেমিশে', avro: 'milemishe' },
      { bangla: 'থাকে', avro: 'thake' }
    ]
  },
  {
    number: 24,
    stageId: 3,
    title: 'বই পড়া (Reading Books)',
    category: 'Avro Daily',
    targetWpm: 28,
    text: 'বই পড়া একটি খুব সুন্দর অভ্যাস',
    phoneticHint: 'boi pora ekti khub shundor ovvas',
    words: [
      { bangla: 'বই', avro: 'boi' },
      { bangla: 'পড়া', avro: 'pora' },
      { bangla: 'একটি', avro: 'ekti' },
      { bangla: 'খুব', avro: 'khub' },
      { bangla: 'সুন্দর', avro: 'shundor' },
      { bangla: 'অভ্যাস', avro: 'ovvas' }
    ]
  },
  {
    number: 25,
    stageId: 3,
    title: 'খাবার ও চা (Food & Tea)',
    category: 'Avro Daily',
    targetWpm: 30,
    text: 'গরম ভাত মাছের ঝোল আর এক কাপ চা',
    phoneticHint: 'gorom bhat macher jhol ar ek kap cha',
    words: [
      { bangla: 'গরম', avro: 'gorom' },
      { bangla: 'ভাত', avro: 'bhat' },
      { bangla: 'মাছের', avro: 'macher' },
      { bangla: 'ঝোল', avro: 'jhol' },
      { bangla: 'আর', avro: 'ar' },
      { bangla: 'এক', avro: 'ek' },
      { bangla: 'কাপ', avro: 'kap' },
      { bangla: 'চা', avro: 'cha' }
    ]
  },
  {
    number: 26,
    stageId: 3,
    title: 'বন্ধুত্ব (Friendship)',
    category: 'Avro Life',
    targetWpm: 30,
    text: 'সত্যিকারের বন্ধু জীবনের শ্রেষ্ঠ উপহার',
    phoneticHint: 'shottikarer bondhu jiboner shreshtho upohar',
    words: [
      { bangla: 'সত্যিকারের', avro: 'shottikarer' },
      { bangla: 'বন্ধু', avro: 'bondhu' },
      { bangla: 'জীবনের', avro: 'jiboner' },
      { bangla: 'শ্রেষ্ঠ', avro: 'shreshtho' },
      { bangla: 'উপহার', avro: 'upohar' }
    ]
  },
  {
    number: 27,
    stageId: 3,
    title: 'আমাদের বাড়ি (Our Home)',
    category: 'Avro Daily',
    targetWpm: 32,
    text: 'আমাদের ছোট্ট সুন্দর ছিমছাম একটি বাড়ি',
    phoneticHint: 'amader chotto shundor chimcham ekti bari',
    words: [
      { bangla: 'আমাদের', avro: 'amader' },
      { bangla: 'ছোট্ট', avro: 'chotto' },
      { bangla: 'সুন্দর', avro: 'shundor' },
      { bangla: 'ছিমছাম', avro: 'chimcham' },
      { bangla: 'একটি', avro: 'ekti' },
      { bangla: 'বাড়ি', avro: 'bari' }
    ]
  },
  {
    number: 28,
    stageId: 3,
    title: 'হাসিখুশি মুখ (Smiling Faces)',
    category: 'Avro Life',
    targetWpm: 32,
    text: 'সবার মুখে হাসি দেখতে ভীষণ ভালো লাগে',
    phoneticHint: 'sobar mukhe hashi dekhte bhishon bhalo lage',
    words: [
      { bangla: 'সবার', avro: 'sobar' },
      { bangla: 'মুখে', avro: 'mukhe' },
      { bangla: 'হাসি', avro: 'hashi' },
      { bangla: 'দেখতে', avro: 'dekhte' },
      { bangla: 'ভীষণ', avro: 'bhishon' },
      { bangla: 'ভালো', avro: 'bhalO' },
      { bangla: 'লাগে', avro: 'lage' }
    ]
  },
  {
    number: 29,
    stageId: 3,
    title: 'পরিশ্রম ও চেষ্টা (Hard Work)',
    category: 'Avro Life',
    targetWpm: 34,
    text: 'কঠোর পরিশ্রম কখনো বৃথা যায় না',
    phoneticHint: 'kothor porishrom kokhono britha jay na',
    words: [
      { bangla: 'কঠোর', avro: 'kothor' },
      { bangla: 'পরিশ্রম', avro: 'porishrom' },
      { bangla: 'কখনো', avro: 'kokhono' },
      { bangla: 'বৃথা', avro: 'britha' },
      { bangla: 'যায়', avro: 'jay' },
      { bangla: 'না', avro: 'na' }
    ]
  },
  {
    number: 30,
    stageId: 3,
    title: 'পরিবার সমাপনী (Stage 3 Review)',
    category: 'Avro Review',
    targetWpm: 35,
    text: 'পরিবার ও বন্ধু আমাদের জীবনের সবচেয়ে বড় শক্তি',
    phoneticHint: 'poribar o bondhu amader jiboner shobcheye boro shokti',
    words: [
      { bangla: 'পরিবার', avro: 'poribar' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'বন্ধু', avro: 'bondhu' },
      { bangla: 'আমাদের', avro: 'amader' },
      { bangla: 'জীবনের', avro: 'jiboner' },
      { bangla: 'সবচেয়ে', avro: 'shobcheye' },
      { bangla: 'বড়', avro: 'boro' },
      { bangla: 'শক্তি', avro: 'shokti' }
    ]
  },

  // ─── Stage 4: Nature & Everyday Life (Lessons 31 - 40) ───
  {
    number: 31,
    stageId: 4,
    title: 'নদী ও সাগর (Rivers & Seas)',
    category: 'Avro Nature',
    targetWpm: 28,
    text: 'নদী বয়ে চলে সাগরের পানে',
    phoneticHint: 'nodi boye chole sagorer pane',
    words: [
      { bangla: 'নদী', avro: 'nodI' },
      { bangla: 'বয়ে', avro: 'boye' },
      { bangla: 'চলে', avro: 'chole' },
      { bangla: 'সাগরের', avro: 'sagorer' },
      { bangla: 'পানে', avro: 'pane' }
    ]
  },
  {
    number: 32,
    stageId: 4,
    title: 'নীল আকাশ (Blue Sky)',
    category: 'Avro Nature',
    targetWpm: 30,
    text: 'নীল আকাশে সাদা মেঘের ভেলা ভাসে',
    phoneticHint: 'neel akashe shada megher bhela bhase',
    words: [
      { bangla: 'নীল', avro: 'neel' },
      { bangla: 'আকাশে', avro: 'akashe' },
      { bangla: 'সাদা', avro: 'shada' },
      { bangla: 'মেঘের', avro: 'megher' },
      { bangla: 'ভেলা', avro: 'bhela' },
      { bangla: 'ভাসে', avro: 'bhase' }
    ]
  },
  {
    number: 33,
    stageId: 4,
    title: 'বৃষ্টির গান (Raining)',
    category: 'Avro Nature',
    targetWpm: 30,
    text: 'টাপুর টুপুর বৃষ্টি পড়ে নদে এলো বান',
    phoneticHint: 'tapur tupur brishti pore node elo ban',
    words: [
      { bangla: 'টাপুর', avro: 'tapur' },
      { bangla: 'টুপুর', avro: 'tupur' },
      { bangla: 'বৃষ্টি', avro: 'brishti' },
      { bangla: 'পড়ে', avro: 'pore' },
      { bangla: 'নদে', avro: 'node' },
      { bangla: 'এলো', avro: 'elo' },
      { bangla: 'বান', avro: 'ban' }
    ]
  },
  {
    number: 34,
    stageId: 4,
    title: 'ফুল ও পাখি (Flowers & Birds)',
    category: 'Avro Nature',
    targetWpm: 32,
    text: 'গাছে গাছে নানা রঙের ফুল ও মিষ্টি পাখি',
    phoneticHint: 'gache gache nana ronger phul o mishti pakhi',
    words: [
      { bangla: 'গাছে', avro: 'gache' },
      { bangla: 'গাছে', avro: 'gache' },
      { bangla: 'নানা', avro: 'nana' },
      { bangla: 'রঙের', avro: 'ronger' },
      { bangla: 'ফুল', avro: 'ful' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'মিষ্টি', avro: 'mishti' },
      { bangla: 'পাখি', avro: 'pakhi' }
    ]
  },
  {
    number: 35,
    stageId: 4,
    title: 'সবুজ গ্রাম (Green Village)',
    category: 'Avro Nature',
    targetWpm: 34,
    text: 'আমাদের গ্রামখানি ছবির মতো সুন্দর সবুজ',
    phoneticHint: 'amader gramkhani chobir moto shundor shobuj',
    words: [
      { bangla: 'আমাদের', avro: 'amader' },
      { bangla: 'গ্রামখানি', avro: 'gramkhani' },
      { bangla: 'ছবির', avro: 'chobir' },
      { bangla: 'মতো', avro: 'moto' },
      { bangla: 'সুন্দর', avro: 'shundor' },
      { bangla: 'সবুজ', avro: 'shobuj' }
    ]
  },
  {
    number: 36,
    stageId: 4,
    title: 'চাঁদ ও তারা (Moon & Stars)',
    category: 'Avro Nature',
    targetWpm: 34,
    text: 'রাতের আকাশে রূপালী চাঁদ আর মিটিমিটি তারা',
    phoneticHint: 'rater akashe rupali chad ar mitimiti tara',
    words: [
      { bangla: 'রাতের', avro: 'rater' },
      { bangla: 'আকাশে', avro: 'akashe' },
      { bangla: 'রূপালী', avro: 'rupali' },
      { bangla: 'চাঁদ', avro: 'chad' },
      { bangla: 'আর', avro: 'ar' },
      { bangla: 'মিটিমিটি', avro: 'mitimiti' },
      { bangla: 'তারা', avro: 'tara' }
    ]
  },
  {
    number: 37,
    stageId: 4,
    title: 'ভোরের হাওয়া (Morning Breeze)',
    category: 'Avro Nature',
    targetWpm: 36,
    text: 'ভোরের হিমেল হাওয়া মন ও শরীর জুড়ায়',
    phoneticHint: 'bhorer himel hawa mon o shorir juray',
    words: [
      { bangla: 'ভোরের', avro: 'bhorer' },
      { bangla: 'হিমেল', avro: 'himel' },
      { bangla: 'হাওয়া', avro: 'hawa' },
      { bangla: 'মন', avro: 'mon' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'শরীর', avro: 'shorir' },
      { bangla: 'জুড়ায়', avro: 'juray' }
    ]
  },
  {
    number: 38,
    stageId: 4,
    title: 'সূর্যোদয় (Sunrise)',
    category: 'Avro Nature',
    targetWpm: 36,
    text: 'পূর্ব আকাশে লাল সূর্য আলো ছড়িয়ে ওঠে',
    phoneticHint: 'purbo akashe lal shurjo alo choriye othe',
    words: [
      { bangla: 'পূর্ব', avro: 'purbo' },
      { bangla: 'আকাশে', avro: 'akashe' },
      { bangla: 'লাল', avro: 'lal' },
      { bangla: 'সূর্য', avro: 'surjo' },
      { bangla: 'আলো', avro: 'alo' },
      { bangla: 'ছড়িয়ে', avro: 'choriye' },
      { bangla: 'ওঠে', avro: 'othe' }
    ]
  },
  {
    number: 39,
    stageId: 4,
    title: 'শরতের কাশফুল (Autumn)',
    category: 'Avro Nature',
    targetWpm: 38,
    text: 'শরতের সাদা মেঘ আর নদীর তীরে কাশফুল ফোটে',
    phoneticHint: 'shoroter shada megh ar nodir teere kashful phote',
    words: [
      { bangla: 'শরতের', avro: 'shoroter' },
      { bangla: 'সাদা', avro: 'shada' },
      { bangla: 'মেঘ', avro: 'megh' },
      { bangla: 'আর', avro: 'ar' },
      { bangla: 'নদীর', avro: 'nodir' },
      { bangla: 'তীরে', avro: 'teere' },
      { bangla: 'কাশফুল', avro: 'kashful' },
      { bangla: 'ফোটে', avro: 'phote' }
    ]
  },
  {
    number: 40,
    stageId: 4,
    title: 'প্রকৃতি সমাপনী (Stage 4 Review)',
    category: 'Avro Review',
    targetWpm: 40,
    text: 'বাংলার রূপ ও প্রকৃতি নয়নজুড়ানো ও অতুলনীয়',
    phoneticHint: 'banglar rup o prokriti noyonjurano o otuloniyo',
    words: [
      { bangla: 'বাংলার', avro: 'banglar' },
      { bangla: 'রূপ', avro: 'rup' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'প্রকৃতি', avro: 'prokriti' },
      { bangla: 'নয়নজুড়ানো', avro: 'noyonjurano' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'অতুলনীয়', avro: 'otuloniyo' }
    ]
  },

  // ─── Stage 5: Motherland & Bangla (Lessons 41 - 50) ───
  {
    number: 41,
    stageId: 5,
    title: 'আমার সোনার বাংলা (National Anthem)',
    category: 'Avro Patriotism',
    targetWpm: 30,
    text: 'আমার সোনার বাংলা আমি তোমায় ভালোবাসি',
    phoneticHint: 'amar shonar bangla ami tomay bhalobashi',
    words: [
      { bangla: 'আমার', avro: 'amar' },
      { bangla: 'সোনার', avro: 'sOnar' },
      { bangla: 'বাংলা', avro: 'bangla' },
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'তোমায়', avro: 'tomay' },
      { bangla: 'ভালোবাসি', avro: 'bhalobashi' }
    ]
  },
  {
    number: 42,
    stageId: 5,
    title: 'চিরদিন তোমার আকাশ (Always Your Sky)',
    category: 'Avro Patriotism',
    targetWpm: 32,
    text: 'চিরদিন তোমার আকাশ তোমার বাতাস আমার প্রাণে বাজায় বাঁশি',
    phoneticHint: 'chirodin tomar akash tomar batash amar prane bajay bashi',
    words: [
      { bangla: 'চিরদিন', avro: 'chirodin' },
      { bangla: 'তোমার', avro: 'tomar' },
      { bangla: 'আকাশ', avro: 'akash' },
      { bangla: 'তোমার', avro: 'tomar' },
      { bangla: 'বাতাস', avro: 'batas' },
      { bangla: 'আমার', avro: 'amar' },
      { bangla: 'প্রাণে', avro: 'prane' },
      { bangla: 'বাজায়', avro: 'bajay' },
      { bangla: 'বাঁশি', avro: 'bashi' }
    ]
  },
  {
    number: 43,
    stageId: 5,
    title: 'বাংলা আমার অহংকার (Bangla My Pride)',
    category: 'Avro Patriotism',
    targetWpm: 34,
    text: 'বাংলা আমার মাতৃভাষা বাংলা আমার গর্ব অহংকার',
    phoneticHint: 'bangla amar matribhasha bangla amar gorbo ohonkar',
    words: [
      { bangla: 'বাংলা', avro: 'bangla' },
      { bangla: 'আমার', avro: 'amar' },
      { bangla: 'মাতৃভাষা', avro: 'matribhasha' },
      { bangla: 'বাংলা', avro: 'bangla' },
      { bangla: 'আমার', avro: 'amar' },
      { bangla: 'গর্ব', avro: 'gorbo' },
      { bangla: 'অহংকার', avro: 'ohonkar' }
    ]
  },
  {
    number: 44,
    stageId: 5,
    title: 'মোদের গরব মোদের আশা (Our Hope)',
    category: 'Avro Patriotism',
    targetWpm: 35,
    text: 'মোদের গরব মোদের আশা আ মরি বাংলা ভাষা',
    phoneticHint: 'moder gorob moder asha a mori bangla bhasha',
    words: [
      { bangla: 'মোদের', avro: 'moder' },
      { bangla: 'গরব', avro: 'gorob' },
      { bangla: 'মোদের', avro: 'moder' },
      { bangla: 'আশা', avro: 'asha' },
      { bangla: 'আ', avro: 'a' },
      { bangla: 'মরি', avro: 'mori' },
      { bangla: 'বাংলা', avro: 'bangla' },
      { bangla: 'ভাষা', avro: 'bhasha' }
    ]
  },
  {
    number: 45,
    stageId: 5,
    title: 'বাংলাদেশ আমাদের দেশ (Bangladesh)',
    category: 'Avro Patriotism',
    targetWpm: 36,
    text: 'বাংলাদেশ আমাদের প্রিয় জন্মভূমি এই সবুজ শ্যামল রূপসী দেশ',
    phoneticHint: 'bangladesh amader priyo jonmobhumi ei shobuj shyamol ruposhi desh',
    words: [
      { bangla: 'বাংলাদেশ', avro: 'bangladesh' },
      { bangla: 'আমাদের', avro: 'amader' },
      { bangla: 'প্রিয়', avro: 'priyo' },
      { bangla: 'জন্মভূমি', avro: 'jonmobhumi' },
      { bangla: 'এই', avro: 'ei' },
      { bangla: 'সবুজ', avro: 'shobuj' },
      { bangla: 'শ্যামল', avro: 'shyamol' },
      { bangla: 'রূপসী', avro: 'ruposhi' },
      { bangla: 'দেশ', avro: 'desh' }
    ]
  },
  {
    number: 46,
    stageId: 5,
    title: 'একুশের গান (Song of 21st Feb)',
    category: 'Avro Patriotism',
    targetWpm: 38,
    text: 'আমার ভাইয়ের রক্তে রাঙানো একুশে ফেব্রুয়ারি আমি কি ভুলিতে পারি',
    phoneticHint: 'amar bhayer rokte rangano ekushey february ami ki bhulite pari',
    words: [
      { bangla: 'আমার', avro: 'amar' },
      { bangla: 'ভাইয়ের', avro: 'bhayer' },
      { bangla: 'রক্তে', avro: 'rokte' },
      { bangla: 'রাঙানো', avro: 'rangano' },
      { bangla: 'একুশে', avro: 'ekushe' },
      { bangla: 'ফেব্রুয়ারি', avro: 'february' },
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'কি', avro: 'ki' },
      { bangla: 'ভুলিতে', avro: 'bhulite' },
      { bangla: 'পারি', avro: 'pari' }
    ]
  },
  {
    number: 47,
    stageId: 5,
    title: 'মাটির গন্ধ (Scent of Soil)',
    category: 'Avro Patriotism',
    targetWpm: 38,
    text: 'দেশের মাটির গন্ধে জড়িয়ে আছে কোটি মানুষের প্রাণ',
    phoneticHint: 'desher matir gondhe joriye ache koti manusher pran',
    words: [
      { bangla: 'দেশের', avro: 'desher' },
      { bangla: 'মাটির', avro: 'matir' },
      { bangla: 'গন্ধে', avro: 'gondhe' },
      { bangla: 'জড়িয়ে', avro: 'joriye' },
      { bangla: 'আছে', avro: 'ache' },
      { bangla: 'কোটি', avro: 'koti' },
      { bangla: 'মানুষের', avro: 'manusher' },
      { bangla: 'প্রাণ', avro: 'pran' }
    ]
  },
  {
    number: 48,
    stageId: 5,
    title: 'মুক্তিযুদ্ধ ও বীরত্ব (Freedom Fighters)',
    category: 'Avro Patriotism',
    targetWpm: 40,
    text: 'বীর মুক্তিযোদ্ধারা দেশের তরে অকাতরে প্রাণ বিলিয়ে দিয়েছিলেন',
    phoneticHint: 'beer muktijoddhara desher tore okatore pran biliye diyechilen',
    words: [
      { bangla: 'বীর', avro: 'beer' },
      { bangla: 'মুক্তিযোদ্ধারা', avro: 'muktijoddhara' },
      { bangla: 'দেশের', avro: 'desher' },
      { bangla: 'তরে', avro: 'tore' },
      { bangla: 'অকাতরে', avro: 'okatore' },
      { bangla: 'প্রাণ', avro: 'pran' },
      { bangla: 'বিলিয়ে', avro: 'biliye' },
      { bangla: 'দিয়েছিলেন', avro: 'diyechilen' }
    ]
  },
  {
    number: 49,
    stageId: 5,
    title: 'পতাকা ও স্বাধীনতা (Flag & Freedom)',
    category: 'Avro Patriotism',
    targetWpm: 40,
    text: 'লাল সবুজের জাতীয় পতাকা আমাদের সার্বভৌমত্বের চিরন্তন প্রতীক',
    phoneticHint: 'lal sobujer jatiyo potaka amader shorbobhoumotter chironton protik',
    words: [
      { bangla: 'লাল', avro: 'lal' },
      { bangla: 'সবুজের', avro: 'sobujer' },
      { bangla: 'জাতীয়', avro: 'jatiyo' },
      { bangla: 'পতাকা', avro: 'potaka' },
      { bangla: 'আমাদের', avro: 'amader' },
      { bangla: 'সার্বভৌমত্বের', avro: 'shorbobhoumotter' },
      { bangla: 'চিরন্তন', avro: 'chironton' },
      { bangla: 'প্রতীক', avro: 'protik' }
    ]
  },
  {
    number: 50,
    stageId: 5,
    title: 'দেশপ্রেম সমাপনী (Stage 5 Review)',
    category: 'Avro Review',
    targetWpm: 42,
    text: 'দেশকে ভালোবাসো দেশের মানুষের পাশে দাঁড়াও সততাই সর্বোত্তম',
    phoneticHint: 'deshke bhalobaso desher manusher pashe darao sototai shorbottom',
    words: [
      { bangla: 'দেশকে', avro: 'deshke' },
      { bangla: 'ভালোবাসো', avro: 'bhalobasho' },
      { bangla: 'দেশের', avro: 'desher' },
      { bangla: 'মানুষের', avro: 'manusher' },
      { bangla: 'পাশে', avro: 'pashe' },
      { bangla: 'দাঁড়াও', avro: 'darao' },
      { bangla: 'সততাই', avro: 'sototai' },
      { bangla: 'সর্বোত্তম', avro: 'shorbottom' }
    ]
  },

  // ─── Stage 6: Wisdom & Proverbs (Lessons 51 - 60) ───
  {
    number: 51,
    stageId: 6,
    title: 'জ্ঞানই আলো (Knowledge is Light)',
    category: 'Avro Proverbs',
    targetWpm: 32,
    text: 'জ্ঞান আলো আনে বই পড়ো জীবন সুন্দর করো',
    phoneticHint: 'gyan alo ane boi poro jibon shundor koro',
    words: [
      { bangla: 'জ্ঞান', avro: 'gyan' },
      { bangla: 'আলো', avro: 'alo' },
      { bangla: 'আনে', avro: 'ane' },
      { bangla: 'বই', avro: 'boi' },
      { bangla: 'পড়ো', avro: 'poro' },
      { bangla: 'জীবন', avro: 'jibon' },
      { bangla: 'সুন্দর', avro: 'shundor' },
      { bangla: 'করো', avro: 'koro' }
    ]
  },
  {
    number: 52,
    stageId: 6,
    title: 'একতাই বল (Unity is Strength)',
    category: 'Avro Proverbs',
    targetWpm: 34,
    text: 'একতাই বল দশে মিলে করি কাজ হারি জিতি নাহি লাজ',
    phoneticHint: 'ektai bol doshe mile kori kaj hari jiti nahi laj',
    words: [
      { bangla: 'একতাই', avro: 'ektai' },
      { bangla: 'বল', avro: 'bol' },
      { bangla: 'দশে', avro: 'doshe' },
      { bangla: 'মিলে', avro: 'mile' },
      { bangla: 'করি', avro: 'kori' },
      { bangla: 'কাজ', avro: 'kaj' },
      { bangla: 'হারি', avro: 'hari' },
      { bangla: 'জিতি', avro: 'jiti' },
      { bangla: 'নাহি', avro: 'nahi' },
      { bangla: 'লাজ', avro: 'laj' }
    ]
  },
  {
    number: 53,
    stageId: 6,
    title: 'সময় ও স্রোত (Time & Tide)',
    category: 'Avro Proverbs',
    targetWpm: 36,
    text: 'সময় ও নদীর স্রোত কখনো কারো জন্য অপেক্ষা করে না',
    phoneticHint: 'shomoy o nodir srot kokhono karo jonno opeksha kore na',
    words: [
      { bangla: 'সময়', avro: 'shomoy' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'নদীর', avro: 'nodir' },
      { bangla: 'স্রোত', avro: 'srot' },
      { bangla: 'কখনো', avro: 'kokhono' },
      { bangla: 'কারো', avro: 'karo' },
      { bangla: 'জন্য', avro: 'jonno' },
      { bangla: 'অপেক্ষা', avro: 'opeksha' },
      { bangla: 'করে', avro: 'kore' },
      { bangla: 'না', avro: 'na' }
    ]
  },
  {
    number: 54,
    stageId: 6,
    title: 'সততা মহৎ গুণ (Honesty is Best)',
    category: 'Avro Proverbs',
    targetWpm: 38,
    text: 'সততা মানুষের সবচেয়ে বড় ভূষণ ও শ্রেষ্ঠ সম্পদ',
    phoneticHint: 'sotota manusher shobcheye boro bhushon o shreshtho shompod',
    words: [
      { bangla: 'সততা', avro: 'sotota' },
      { bangla: 'মানুষের', avro: 'manusher' },
      { bangla: 'সবচেয়ে', avro: 'shobcheye' },
      { bangla: 'বড়', avro: 'boro' },
      { bangla: 'ভূষণ', avro: 'bhushon' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'শ্রেষ্ঠ', avro: 'shreshtho' },
      { bangla: 'সম্পদ', avro: 'shompod' }
    ]
  },
  {
    number: 55,
    stageId: 6,
    title: 'শিক্ষা জাতির মেরুদণ্ড (Education)',
    category: 'Avro Proverbs',
    targetWpm: 40,
    text: 'শিক্ষাই আলো প্রতিটি নাগরিকের শিক্ষা অর্জনের পূর্ণ অধিকার রয়েছে',
    phoneticHint: 'shikkha alo protiti nagoriker shikkha orjoner purno odhikar royeche',
    words: [
      { bangla: 'শিক্ষাই', avro: 'shikkhai' },
      { bangla: 'আলো', avro: 'alo' },
      { bangla: 'প্রতিটি', avro: 'protiti' },
      { bangla: 'নাগরিকের', avro: 'nagoriker' },
      { bangla: 'শিক্ষা', avro: 'shikkha' },
      { bangla: 'অর্জনের', avro: 'orjoner' },
      { bangla: 'পূর্ণ', avro: 'purno' },
      { bangla: 'অধিকার', avro: 'odhikar' },
      { bangla: 'রয়েছে', avro: 'royeche' }
    ]
  },
  {
    number: 56,
    stageId: 6,
    title: 'ধৈর্য ও সহনশীলতা (Patience)',
    category: 'Avro Proverbs',
    targetWpm: 40,
    text: 'ধৈর্য্যের ফল সর্বদা মিষ্টি ও কল্যাণকর হয়',
    phoneticHint: 'dhoirjer phol shorboda mishti o kollyan kor hoy',
    words: [
      { bangla: 'ধৈর্য্যের', avro: 'dhoirjer' },
      { bangla: 'ফল', avro: 'phol' },
      { bangla: 'সর্বদা', avro: 'shorboda' },
      { bangla: 'মিষ্টি', avro: 'mishti' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'কল্যাণকর', avro: 'kollyankor' },
      { bangla: 'হয়', avro: 'hoy' }
    ]
  },
  {
    number: 57,
    stageId: 6,
    title: 'বিনয় ও ভদ্রতা (Modesty)',
    category: 'Avro Proverbs',
    targetWpm: 42,
    text: 'নম্রতা ও বিনয় মহৎ মনের পরিচয় বহন করে',
    phoneticHint: 'nomrota o binoy mohot moner porichoy bohon kore',
    words: [
      { bangla: 'নম্রতা', avro: 'nomrota' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'বিনয়', avro: 'binoy' },
      { bangla: 'মহৎ', avro: 'mohot' },
      { bangla: 'মনের', avro: 'moner' },
      { bangla: 'পরিচয়', avro: 'porichoy' },
      { bangla: 'বহন', avro: 'bohon' },
      { bangla: 'করে', avro: 'kore' }
    ]
  },
  {
    number: 58,
    stageId: 6,
    title: 'সতর্কতা ও প্রজ্ঞা (Wisdom)',
    category: 'Avro Proverbs',
    targetWpm: 44,
    text: 'ভাবিয়া করিও কাজ করিয়া ভাবিও না',
    phoneticHint: 'bhabiya korio kaj koriya bhabio na',
    words: [
      { bangla: 'ভাবিয়া', avro: 'bhabiya' },
      { bangla: 'করিও', avro: 'korio' },
      { bangla: 'কাজ', avro: 'kaj' },
      { bangla: 'করিয়া', avro: 'koriya' },
      { bangla: 'ভাবিও', avro: 'bhabio' },
      { bangla: 'না', avro: 'na' }
    ]
  },
  {
    number: 59,
    stageId: 6,
    title: 'পরোপকার (Kindness to Others)',
    category: 'Avro Proverbs',
    targetWpm: 44,
    text: 'অপরের উপকারে নিজের আনন্দ খুঁজে পাওয়াই আসল মানবতা',
    phoneticHint: 'oporor upokare nijer anondo khuje paowai ashol manobota',
    words: [
      { bangla: 'অপরের', avro: 'oporor' },
      { bangla: 'উপকারে', avro: 'upokare' },
      { bangla: 'নিজের', avro: 'nijer' },
      { bangla: 'আনন্দ', avro: 'anondo' },
      { bangla: 'খুঁজে', avro: 'khuje' },
      { bangla: 'পাওয়াই', avro: 'paowai' },
      { bangla: 'আসল', avro: 'ashol' },
      { bangla: 'মানবতা', avro: 'manobota' }
    ]
  },
  {
    number: 60,
    stageId: 6,
    title: 'প্রবাদ সমাপনী (Stage 6 Review)',
    category: 'Avro Review',
    targetWpm: 46,
    text: 'সততা একতা ও ভালোবাসা দিয়ে বিশ্ব জয় করা সম্ভব',
    phoneticHint: 'sotota ekota o bhalobasha diye bisho joy kora shombhob',
    words: [
      { bangla: 'সততা', avro: 'sotota' },
      { bangla: 'একতা', avro: 'ekota' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'ভালোবাসা', avro: 'bhalobasha' },
      { bangla: 'দিয়ে', avro: 'diye' },
      { bangla: 'বিশ্ব', avro: 'bisho' },
      { bangla: 'জয়', avro: 'joy' },
      { bangla: 'করা', avro: 'kora' },
      { bangla: 'সম্ভব', avro: 'shombhob' }
    ]
  },

  // ─── Stage 7: Literature & Poetry (Lessons 61 - 70) ───
  {
    number: 61,
    stageId: 7,
    title: 'চিত্ত যেথা ভয়শূন্য (Where the Mind is Without Fear)',
    category: 'Rabindranath Tagore',
    targetWpm: 35,
    text: 'চিত্ত যেথা ভয়শূন্য উচ্চ যেথা শির জ্ঞান যেথা মুক্ত',
    phoneticHint: 'chitto jetha bhoyshurno uccho jetha shir gyan jetha mukto',
    words: [
      { bangla: 'চিত্ত', avro: 'chitto' },
      { bangla: 'যেথা', avro: 'jetha' },
      { bangla: 'ভয়শূন্য', avro: 'bhoyshurno' },
      { bangla: 'উচ্চ', avro: 'uccho' },
      { bangla: 'যেথা', avro: 'jetha' },
      { bangla: 'শির', avro: 'shir' },
      { bangla: 'জ্ঞান', avro: 'gyan' },
      { bangla: 'যেথা', avro: 'jetha' },
      { bangla: 'মুক্ত', avro: 'mukto' }
    ]
  },
  {
    number: 62,
    stageId: 7,
    title: 'আলো আমার আলো (Light)',
    category: 'Rabindranath Tagore',
    targetWpm: 36,
    text: 'আলো আমার আলো ওগো আলো ভুবন ভরা আলো নয়ন ধোওয়া আমার',
    phoneticHint: 'alo amar alo ogo alo bhubon bhora alo noyon dhowa amar',
    words: [
      { bangla: 'আলো', avro: 'alo' },
      { bangla: 'আমার', avro: 'amar' },
      { bangla: 'আলো', avro: 'alo' },
      { bangla: 'ওগো', avro: 'ogo' },
      { bangla: 'আলো', avro: 'alo' },
      { bangla: 'ভুবন', avro: 'bhubon' },
      { bangla: 'ভরা', avro: 'bhora' },
      { bangla: 'আলো', avro: 'alo' },
      { bangla: 'নয়ন', avro: 'noyon' },
      { bangla: 'ধোওয়া', avro: 'dhowa' },
      { bangla: 'আমার', avro: 'amar' }
    ]
  },
  {
    number: 63,
    stageId: 7,
    title: 'বল বীর (The Rebel)',
    category: 'Kazi Nazrul Islam',
    targetWpm: 38,
    text: 'বল বীর বল উন্নত মম শির শির নেহারি আমারি নতশির ওই শিখর হিমাদ্রির',
    phoneticHint: 'bol beer bol unnoto momo shir shir nehari amari notoshir oi shikhor himadrir',
    words: [
      { bangla: 'বল', avro: 'bol' },
      { bangla: 'বীর', avro: 'beer' },
      { bangla: 'বল', avro: 'bol' },
      { bangla: 'উন্নত', avro: 'unnoto' },
      { bangla: 'মম', avro: 'momo' },
      { bangla: 'শির', avro: 'shir' },
      { bangla: 'শির', avro: 'shir' },
      { bangla: 'নেহারি', avro: 'nehari' },
      { bangla: 'আমারি', avro: 'amari' },
      { bangla: 'নতশির', avro: 'notoshir' },
      { bangla: 'ওই', avro: 'oi' },
      { bangla: 'শিখর', avro: 'shikhor' },
      { bangla: 'হিমাদ্রির', avro: 'himadrir' }
    ]
  },
  {
    number: 64,
    stageId: 7,
    title: 'মানুষের চেয়ে বড় কিছু নাই (Humanity)',
    category: 'Kazi Nazrul Islam',
    targetWpm: 40,
    text: 'গাহি সাম্যের গান মানুষের চেয়ে বড় কিছু নাই নহে কিছু মহীয়ান',
    phoneticHint: 'gahi samyer gan manusher cheye boro kichu nai nohe kichu mohiyan',
    words: [
      { bangla: 'গাহি', avro: 'gahi' },
      { bangla: 'সাম্যের', avro: 'samyer' },
      { bangla: 'গান', avro: 'gan' },
      { bangla: 'মানুষের', avro: 'manusher' },
      { bangla: 'চেয়ে', avro: 'cheye' },
      { bangla: 'বড়', avro: 'boro' },
      { bangla: 'কিছু', avro: 'kichu' },
      { bangla: 'নাই', avro: 'nai' },
      { bangla: 'নহে', avro: 'nohe' },
      { bangla: 'কিছু', avro: 'kichu' },
      { bangla: 'মহীয়ান', avro: 'mohiyan' }
    ]
  },
  {
    number: 65,
    stageId: 7,
    title: 'আবার আসিব ফিরে (I Shall Return)',
    category: 'Jibanananda Das',
    targetWpm: 42,
    text: 'আবার আসিব ফিরে ধানসিঁড়িটির তীরে এই বাংলায় হয়তো মানুষ নয় হয়তো বা শঙ্খচিল',
    phoneticHint: 'abar ashibo phire dhansiritir teere ei banglay hoyto manush noy hoyto ba shongkhochil',
    words: [
      { bangla: 'আবার', avro: 'abar' },
      { bangla: 'আসিব', avro: 'ashibo' },
      { bangla: 'ফিরে', avro: 'phire' },
      { bangla: 'ধানসিঁড়িটির', avro: 'dhansiritir' },
      { bangla: 'তীরে', avro: 'teere' },
      { bangla: 'এই', avro: 'ei' },
      { bangla: 'বাংলায়', avro: 'banglay' },
      { bangla: 'হয়তো', avro: 'hoyto' },
      { bangla: 'মানুষ', avro: 'manush' },
      { bangla: 'নয়', avro: 'noy' },
      { bangla: 'হয়তো', avro: 'hoyto' },
      { bangla: 'বা', avro: 'ba' },
      { bangla: 'শঙ্খচিল', avro: 'shongkhochil' }
    ]
  },
  {
    number: 66,
    stageId: 7,
    title: 'হাজার বছর ধরে (Banalata Sen)',
    category: 'Jibanananda Das',
    targetWpm: 42,
    text: 'হাজার বছর ধরে আমি পথ হাঁটিতেছি পৃথিবীর পথে সিংহল সমুদ্র থেকে নিশীথের অন্ধকারে',
    phoneticHint: 'hajar bochor dhore ami poth hatitechi prithibir pothe singhol shomudro theke nishither ondhokare',
    words: [
      { bangla: 'হাজার', avro: 'hajar' },
      { bangla: 'বছর', avro: 'bochor' },
      { bangla: 'ধরে', avro: 'dhore' },
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'পথ', avro: 'poth' },
      { bangla: 'হাঁটিতেছি', avro: 'hatitechi' },
      { bangla: 'পৃথিবীর', avro: 'prithibir' },
      { bangla: 'পথে', avro: 'pothe' },
      { bangla: 'সিংহল', avro: 'singhol' },
      { bangla: 'সমুদ্র', avro: 'shomudro' },
      { bangla: 'থেকে', avro: 'theke' },
      { bangla: 'নিশীথের', avro: 'nishither' },
      { bangla: 'অন্ধকারে', avro: 'ondhokare' }
    ]
  },
  {
    number: 67,
    stageId: 7,
    title: 'চলে যাব তবু আজ যতক্ষণ দেহে আছে প্রাণ (Sukanta)',
    category: 'Sukanta Bhattacharya',
    targetWpm: 44,
    text: 'চলে যাব তবু আজ যতক্ষণ দেহে আছে প্রাণ প্রাণপণে পৃথিবীর সরাব জঞ্জাল',
    phoneticHint: 'chole jabo tobu aj jotokkhon dehe ache pran pranpone prithibir shorabo jonjal',
    words: [
      { bangla: 'চলে', avro: 'chole' },
      { bangla: 'যাব', avro: 'jabo' },
      { bangla: 'তবু', avro: 'tobu' },
      { bangla: 'আজ', avro: 'aj' },
      { bangla: 'যতক্ষণ', avro: 'jotokkhon' },
      { bangla: 'দেহে', avro: 'dehe' },
      { bangla: 'আছে', avro: 'ache' },
      { bangla: 'প্রাণ', avro: 'pran' },
      { bangla: 'প্রাণপণে', avro: 'pranpone' },
      { bangla: 'পৃথিবীর', avro: 'prithibir' },
      { bangla: 'সরাব', avro: 'shorabo' },
      { bangla: 'জঞ্জাল', avro: 'jonjal' }
    ]
  },
  {
    number: 68,
    stageId: 7,
    title: 'এ বিশ্বকে এ শিশুর বাসযোগ্য করে যাব আমি',
    category: 'Sukanta Bhattacharya',
    targetWpm: 45,
    text: 'এ বিশ্বকে এ শিশুর বাসযোগ্য করে যাব আমি নবজাতকের কাছে এ আমার দৃঢ় অঙ্গীকার',
    phoneticHint: 'e bishwoke e shishur bashojoggo kore jabo ami nobojatoker kache e amar driro onggikar',
    words: [
      { bangla: 'এ', avro: 'e' },
      { bangla: 'বিশ্বকে', avro: 'bishwoke' },
      { bangla: 'এ', avro: 'e' },
      { bangla: 'শিশুর', avro: 'shishur' },
      { bangla: 'বাসযোগ্য', avro: 'bashojoggo' },
      { bangla: 'করে', avro: 'kore' },
      { bangla: 'যাব', avro: 'jabo' },
      { bangla: 'আমি', avro: 'ami' },
      { bangla: 'নবজাতকের', avro: 'nobojatoker' },
      { bangla: 'কাছে', avro: 'kache' },
      { bangla: 'এ', avro: 'e' },
      { bangla: 'আমার', avro: 'amar' },
      { bangla: 'দৃঢ়', avro: 'driro' },
      { bangla: 'অঙ্গীকার', avro: 'onggikar' }
    ]
  },
  {
    number: 69,
    stageId: 7,
    title: 'স্বাধীনতা তুমি (Shamsur Rahman)',
    category: 'Shamsur Rahman',
    targetWpm: 46,
    text: 'স্বাধীনতা তুমি রবিঠাকুরের অজর কবিতা অবিনাশী গান',
    phoneticHint: 'shadhinota tumi robithakurer ojhor kobita obinashi gan',
    words: [
      { bangla: 'স্বাধীনতা', avro: 'shadhinota' },
      { bangla: 'তুমি', avro: 'tumi' },
      { bangla: 'রবিঠাকুরের', avro: 'robithakurer' },
      { bangla: 'অজর', avro: 'ojhor' },
      { bangla: 'কবিতা', avro: 'kobita' },
      { bangla: 'অবিনাশী', avro: 'obinashi' },
      { bangla: 'গান', avro: 'gan' }
    ]
  },
  {
    number: 70,
    stageId: 7,
    title: 'সাহিত্য সমাপনী (Stage 7 Review)',
    category: 'Avro Review',
    targetWpm: 48,
    text: 'বাংলা সাহিত্য বিশ্ব সংস্কৃতির অমূল্য সম্পদ ও চিরন্তন প্রেরণা',
    phoneticHint: 'bangla shahityo bisho shongskritir omullo shompod o chironton prerona',
    words: [
      { bangla: 'বাংলা', avro: 'bangla' },
      { bangla: 'সাহিত্য', avro: 'shahityo' },
      { bangla: 'বিশ্ব', avro: 'bisho' },
      { bangla: 'সংস্কৃতির', avro: 'shongskritir' },
      { bangla: 'অমূল্য', avro: 'omullo' },
      { bangla: 'সম্পদ', avro: 'shompod' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'চিরন্তন', avro: 'chironton' },
      { bangla: 'প্রেরণা', avro: 'prerona' }
    ]
  },

  // ─── Stage 8: Conjuncts & Speed Drills (Lessons 71 - 80) ───
  {
    number: 71,
    stageId: 8,
    title: 'যুক্তাক্ষর: ক্ষ ও জ্ঞ (kkh & gg)',
    category: 'Avro Conjuncts',
    targetWpm: 40,
    text: 'শিক্ষা ক্ষমা বিজ্ঞান অজ্ঞতা রক্ষা ক্ষতিকর',
    phoneticHint: 'shikkha khoma biggan oggota rokkha khotikor',
    words: [
      { bangla: 'শিক্ষা', avro: 'shikkha' },
      { bangla: 'ক্ষমা', avro: 'khoma' },
      { bangla: 'বিজ্ঞান', avro: 'biggan' },
      { bangla: 'অজ্ঞতা', avro: 'oggota' },
      { bangla: 'রক্ষা', avro: 'rokkha' },
      { bangla: 'ক্ষতিকর', avro: 'khotikor' }
    ]
  },
  {
    number: 72,
    stageId: 8,
    title: 'যুক্তাক্ষর: ঙ্গ ও ঙ্ক (ng & nk)',
    category: 'Avro Conjuncts',
    targetWpm: 42,
    text: 'বাংলা সঙ্গ অঙ্গ অঙ্ক শঙ্কা আতঙ্ক',
    phoneticHint: 'bangla shongo ongo onko shonko atonko',
    words: [
      { bangla: 'বাংলা', avro: 'bangla' },
      { bangla: 'সঙ্গ', avro: 'shongo' },
      { bangla: 'অঙ্গ', avro: 'ongo' },
      { bangla: 'অঙ্ক', avro: 'onko' },
      { bangla: 'শঙ্কা', avro: 'shonko' },
      { bangla: 'আতঙ্ক', avro: 'atonko' }
    ]
  },
  {
    number: 73,
    stageId: 8,
    title: 'যুক্তাক্ষর: ম্প ও ম্ভ (mp & mbh)',
    category: 'Avro Conjuncts',
    targetWpm: 44,
    text: 'সম্পদ কম্পন সম্মান গম্ভীর আরম্ভ সম্ভব',
    phoneticHint: 'shompod kompon shomman gombhir arombho shombhob',
    words: [
      { bangla: 'সম্পদ', avro: 'shompod' },
      { bangla: 'কম্পন', avro: 'kompon' },
      { bangla: 'সম্মান', avro: 'shomman' },
      { bangla: 'গম্ভীর', avro: 'gombhir' },
      { bangla: 'আরম্ভ', avro: 'arombho' },
      { bangla: 'সম্ভব', avro: 'shombhob' }
    ]
  },
  {
    number: 74,
    stageId: 8,
    title: 'যুক্তাক্ষর: ন্ত ও ন্থ (nt & nth)',
    category: 'Avro Conjuncts',
    targetWpm: 45,
    text: 'শান্তি অনন্ত অন্তরে পান্থ গ্রন্থ পন্থা',
    phoneticHint: 'shanti ononto ontore pantho grontho pontha',
    words: [
      { bangla: 'শান্তি', avro: 'shanti' },
      { bangla: 'অনন্ত', avro: 'ononto' },
      { bangla: 'অন্তরে', avro: 'ontore' },
      { bangla: 'পান্থ', avro: 'pantho' },
      { bangla: 'গ্রন্থ', avro: 'grontho' },
      { bangla: 'পন্থা', avro: 'pontha' }
    ]
  },
  {
    number: 75,
    stageId: 8,
    title: 'গতি পরীক্ষা ১ (Speed Sprint 1)',
    category: 'Avro Speed Sprint',
    targetWpm: 48,
    text: 'নিয়মিত টাইপিং অনুশীলন আপনার লেখার গতি ও নির্ভুলতা বহুগুণ বাড়িয়ে তুলবে',
    phoneticHint: 'niyomito typing onushilon apnar lekhar goti o nirbhulota bohugun bariye tulbe',
    words: [
      { bangla: 'নিয়মিত', avro: 'niyomito' },
      { bangla: 'টাইপিং', avro: 'typing' },
      { bangla: 'অনুশীলন', avro: 'onushilon' },
      { bangla: 'আপনার', avro: 'apnar' },
      { bangla: 'লেখার', avro: 'lekhar' },
      { bangla: 'গতি', avro: 'goti' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'নির্ভুলতা', avro: 'nirbhulota' },
      { bangla: 'বহুগুণ', avro: 'bohugun' },
      { bangla: 'বাড়িয়ে', avro: 'bariye' },
      { bangla: 'তুলবে', avro: 'tulbe' }
    ]
  },
  {
    number: 76,
    stageId: 8,
    title: 'গতি পরীক্ষা ২ (Speed Sprint 2)',
    category: 'Avro Speed Sprint',
    targetWpm: 50,
    text: 'বাংলা ভাষায় অভ্র ফোনেটিক টাইপিং পদ্ধতি আমাদের কম্পিউটারে লেখার স্বাধীনতা এনে দিয়েছে',
    phoneticHint: 'bangla bhashay avro phonetic typing poddhoti amader computere lekhar shadhinota ene diyeche',
    words: [
      { bangla: 'বাংলা', avro: 'bangla' },
      { bangla: 'ভাষায়', avro: 'bhashay' },
      { bangla: 'অভ্র', avro: 'avro' },
      { bangla: 'ফোনেটিক', avro: 'phonetic' },
      { bangla: 'টাইপিং', avro: 'typing' },
      { bangla: 'পদ্ধতি', avro: 'poddhoti' },
      { bangla: 'আমাদের', avro: 'amader' },
      { bangla: 'কম্পিউটারে', avro: 'computere' },
      { bangla: 'লেখার', avro: 'lekhar' },
      { bangla: 'স্বাধীনতা', avro: 'shadhinota' },
      { bangla: 'এনে', avro: 'ene' },
      { bangla: 'দিয়েছে', avro: 'diyeche' }
    ]
  },
  {
    number: 77,
    stageId: 8,
    title: 'গতি পরীক্ষা ৩ (Speed Sprint 3)',
    category: 'Avro Speed Sprint',
    targetWpm: 52,
    text: 'যেকোনো কঠিন কাজও বারবার প্রচেষ্টার মাধ্যমে সহজ ও নিখুঁতভাবে সমাধান করা সম্ভব',
    phoneticHint: 'jekono kothin kajo bar bar prochestar maddhome shohoj o nikhutbhabe shomadhan kora shombhob',
    words: [
      { bangla: 'যেকোনো', avro: 'jekono' },
      { bangla: 'কঠিন', avro: 'kothin' },
      { bangla: 'কাজও', avro: 'kajo' },
      { bangla: 'বারবার', avro: 'barbar' },
      { bangla: 'প্রচেষ্টার', avro: 'prochestar' },
      { bangla: 'মাধ্যমে', avro: 'maddhome' },
      { bangla: 'সহজ', avro: 'shohoj' },
      { bangla: 'ও', avro: 'o' },
      { bangla: 'নিখুঁতভাবে', avro: 'nikhutbhabe' },
      { bangla: 'সমাধান', avro: 'shomadhan' },
      { bangla: 'করা', avro: 'kora' },
      { bangla: 'সম্ভব', avro: 'shombhob' }
    ]
  },
  {
    number: 78,
    stageId: 8,
    title: 'গতি পরীক্ষা ৪ (Speed Sprint 4)',
    category: 'Avro Speed Sprint',
    targetWpm: 55,
    text: 'স্বপ্ন দেখতে জানলে এবং সেই স্বপ্নের জন্য অবিরাম শ্রম দিলে সাফল্য ধরা দেবেই',
    phoneticHint: 'shopno dekhte janle ebong shei shopner jonno obiram shrom dile shafollo dhora debei',
    words: [
      { bangla: 'স্বপ্ন', avro: 'shopno' },
      { bangla: 'দেখতে', avro: 'dekhte' },
      { bangla: 'জানলে', avro: 'janle' },
      { bangla: 'এবং', avro: 'ebong' },
      { bangla: 'সেই', avro: 'shei' },
      { bangla: 'স্বপ্নের', avro: 'shopner' },
      { bangla: 'জন্য', avro: 'jonno' },
      { bangla: 'অবিরাম', avro: 'obiram' },
      { bangla: 'শ্রম', avro: 'shrom' },
      { bangla: 'দিলে', avro: 'dile' },
      { bangla: 'সাফল্য', avro: 'shafollo' },
      { bangla: 'ধরা', avro: 'dhora' },
      { bangla: 'দেবেই', avro: 'debei' }
    ]
  },
  {
    number: 79,
    stageId: 8,
    title: 'গ্র্যান্ডমাস্টার প্রস্তুতি (Grandmaster Prep)',
    category: 'Avro Grandmaster',
    targetWpm: 58,
    text: 'বাংলা টাইপিংয়ে আপনি এখন এক অনন্য উচ্চতায় পৌঁছেছেন আপনার একাগ্রতা সত্যিই প্রশংসনীয়',
    phoneticHint: 'bangla typingye apni ekhon ek ononno ucchotay pouchechen apnar ekagrota shotti proshongshoniyo',
    words: [
      { bangla: 'বাংলা', avro: 'bangla' },
      { bangla: 'টাইপিংয়ে', avro: 'typingye' },
      { bangla: 'আপনি', avro: 'apni' },
      { bangla: 'এখন', avro: 'ekhon' },
      { bangla: 'এক', avro: 'ek' },
      { bangla: 'অনন্য', avro: 'ononno' },
      { bangla: 'উচ্চতায়', avro: 'ucchotay' },
      { bangla: 'পৌঁছেছেন', avro: 'pouchechen' },
      { bangla: 'আপনার', avro: 'apnar' },
      { bangla: 'একাগ্রতা', avro: 'ekagrota' },
      { bangla: 'সত্যিই', avro: 'shotti' },
      { bangla: 'প্রশংসনীয়', avro: 'proshongshoniyo' }
    ]
  },
  {
    number: 80,
    stageId: 8,
    title: 'অভ্র গ্র্যান্ডমাস্টার সমাপনী ও গ্র্যাজুয়েশন (Avro Master Graduation)',
    category: 'Avro Graduation',
    targetWpm: 60,
    text: 'অভিনন্দন! আপনি বাংলা অভ্র ফোনেটিক টাইপিংয়ের পূর্ণ কোর্স সফলভাবে সম্পন্ন করে গ্র্যান্ডমাস্টার হয়েছেন',
    phoneticHint: 'obhinondon! apni bangla avro phonetic typingyer purno course shopholbhabe shomponno kore grandmaster hoyechen',
    words: [
      { bangla: 'অভিনন্দন', avro: 'obhinondon' },
      { bangla: 'আপনি', avro: 'apni' },
      { bangla: 'বাংলা', avro: 'bangla' },
      { bangla: 'অভ্র', avro: 'avro' },
      { bangla: 'ফোনেটিক', avro: 'phonetic' },
      { bangla: 'টাইপিংয়ের', avro: 'typingyer' },
      { bangla: 'পূর্ণ', avro: 'purno' },
      { bangla: 'কোর্স', avro: 'course' },
      { bangla: 'সফলভাবে', avro: 'shopholbhabe' },
      { bangla: 'সম্পন্ন', avro: 'shomponno' },
      { bangla: 'করে', avro: 'kore' },
      { bangla: 'গ্র্যান্ডমাস্টার', avro: 'grandmaster' },
      { bangla: 'হয়েছেন', avro: 'hoyechen' }
    ]
  }
];
