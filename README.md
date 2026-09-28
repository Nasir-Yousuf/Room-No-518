# room-no-518 ⌨️

[![React 19](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A high-performance, gamified touch-typing web application engineered with bilingual English and Bangla Avro phonetic curricula, an AI-powered 10-finger weakness diagnostic engine, speed-responsive avatars, and a dual-theme glassmorphism design system.

---

## 🌟 Highlights & Key Features

### 1. 🇬🇧 English Touch Typing (685 Lessons)
An exhaustive, progressive 8-stage curriculum taking learners from single-key home-row drills to grandmaster fluency:
- **Stage 1 (Lessons 1–85)**: Home Row Basics (`F`, `J`, `D`, `K`, `S`, `L`, `A`, `;`)
- **Stage 2 (Lessons 86–175)**: Top Row Reaches (`E`, `I`, `R`, `U`, `T`, `Y`, `W`, `O`, `Q`, `P`)
- **Stage 3 (Lessons 176–260)**: Bottom Row Reaches (`V`, `M`, `B`, `N`, `C`, `,`, `X`, `.`, `Z`, `/`)
- **Stage 4 (Lessons 261–350)**: Shift Keys, Capitalization & Punctuation
- **Stage 5 (Lessons 351–440)**: Number Row Mastery (`1` to `0`)
- **Stage 6 (Lessons 441–525)**: Code Syntax & Special Symbols (`!`, `@`, `#`, `$`, `%`, `&`, `*`, `(`, `)`)
- **Stage 7 (Lessons 526–610)**: Literature, Historic Speeches & Fluid Prose
- **Stage 8 (Lessons 611–685)**: High-Speed Grandmaster Trials & Final Graduation Exam 👑

---

### 2. 🇧🇩 Bangla Avro (অভ্র) Phonetic Mode (80 Lessons)
A complete, built-in curriculum for Bengali touch typing using standard QWERTY phonetic transliteration:
- **Instant Letter-by-Letter Progression**: Matches English typing speed with zero delay or modal popups.
- **Word Cards**: Displays authentic Bengali script on top with real-time phonetic letter guides below.
- **8 Progressive Stages**:
  1. *সহজ শুরু (Easy Start)*: Simple roots like `aam`, `boi`, `maa`.
  2. *মৌলিক শব্দ (Core Words)*: Daily vocabulary (`bhai`, `bon`, `pani`).
  3. *দৈনন্দিন জীবন (Daily Life)*: Practical expressions and actions.
  4. *শিক্ষা ও স্বপ্ন (Education & Dreams)*: Knowledge and aspirations.
  5. *দেশ ও বাংলা ভাষা (Motherland & Bangla)*: Culture and heritage.
  6. *প্রকৃতি ও পরিবেশ (Nature & Environment)*: Rivers, seasons, and greenery.
  7. *দর্শন ও চিন্তাধারা (Philosophy & Thought)*: Wisdom and reflection.
  8. *চূড়ান্ত পরীক্ষা (Mastery Exam)*: Flowing, literary Bengali prose.

---

### 3. 🎯 Weakness AI Adaptive Engine ("Real Words, Not Isolated Letters")
A diagnostic module that identifies and trains weak fingers and slow keystrokes:
- **10-Finger Latency Profiling**: Measures inter-key dwell and flight time in milliseconds (`ms`) for all fingers.
- **Diagnostic Classification**: Categorizes fingers and letters into 🟢 *Fast* (&lt;220ms), 🟡 *Moderate* (220–280ms), and 🔴 *Needs Practice* (&gt;280ms).
- **Tricky Word Detection**: Logs words that caused stumbling, backspaces, or latency spikes.
- **Contextual Paragraph Synthesizer**: Generates **flowing, natural English paragraphs composed of new, rich vocabulary** that specifically exercises the user's weak fingers (e.g. Left Pinky: *quartz*, *amaze*, *plaza*; Left Ring: *complex*, *explore*, *syntax*).
- **Weakness Hub**: Interactive dashboard with real-time finger speed meters, focus mode toggles (*AI Adaptive*, *Pinky Power*, *Ring Fingers*, *Tricky Words*), and length controls (*Short*, *Medium*, *Full*).
- **In-Arena Workout Bar**: Displays target fingers and vocabulary with an instant <kbd>Tab</kbd> shortcut to synthesize new paragraphs on the fly.

---

### 4. ⚡ Speed-Responsive Dynamic Avatars & Glamour Engine
Live visual transformation tied directly to your words per minute (WPM):

| Tier | Target Speed | Status | Theme Color |
|:---:|:---:|:---:|:---:|
| **Tier 1** | &lt; 3 WPM | *Typo / Stressed State* | `#f43f5e` (Rose) |
| **Tier 2** | 3 – 4 WPM | *Focus Building* | `#fb923c` (Orange) |
| **Tier 3** | 5 – 6 WPM | *Baseline Flow* | `#3b82f6` (Blue) |
| **Tier 4** | 7 – 8 WPM | *Glamour Star* | `#a855f7` (Purple) |
| **Tier 5** | 9 – 10+ WPM | *Max Celestial Goddess 👑* | `#f59e0b` (Gold) |

- **Custom Photo Manager**: Upload custom avatars or photos for each tier with automatic `localStorage` persistence.
- **Dynamic Dialogues**: Characters deliver contextual feedback based on speed, combos, and milestones.

---

### 5. 🎨 Design System & Accessibility
- **Dual-Theme Aesthetic**:
  - **Day Mode (Default)**: Warm `#F7F2CF` cream palette with soft parchment cards and amber accents.
  - **Night Mode**: Deep cosmic dark glassmorphism (`#050a18`) with glowing neon gradients.
- **Refined Typography**: Clean pairing of *Inria Sans*, *Gabriela*, *Kurale*, *Roboto*, and *Hind Siliguri*.
- **Virtual Keyboard**: 10-finger color-coded columns, hand overlays, and live keypress indicators.
- **Full Mobile Responsiveness**: Responsive layout with hidden input bridge for mobile virtual keyboards.
- **Web Audio Synthesizer**: Zero-latency synthesized typewriter clicks, spacebar thumps, combo chimes, and level-up fanfares.
- **Social Sharing & Deep Links**: Direct lesson linking (`?lesson=183`), native Web Share API support, and score cards.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|:---|:---|
| <kbd>Enter</kbd> | Proceed to Next Lesson / Next Adaptive Paragraph |
| <kbd>R</kbd> | Restart Current Drill / Try Again |
| <kbd>Tab</kbd> | Generate New Adaptive Paragraph *(Weakness Mode)* |
| <kbd>Esc</kbd> | Return to Curriculum Map |
| <kbd>Space</kbd> | Advance Word |
| <kbd>Backspace</kbd> | Delete Previous Character |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Audio**: Web Audio API (native zero-dependency synthesizer)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Bengali Transliteration**: Avro phonetic engine

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `pnpm`

### Installation
```bash
# Clone the repository
git clone https://github.com/Nasir-Yousuf/Room-No-518.git

# Navigate into the project folder
cd Room-No-518

# Install dependencies
npm install
```

### Run Locally (Development)
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to start typing.

### Production Build & Preview
```bash
# Build the optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 📂 Project Structure

```text
Room-No-518/
├── public/
│   ├── avatars/             # Built-in tier avatar images
│   ├── stars-0.png..5.png   # 5-star progress arc assets
│   └── svgsprite-cmn.svg    # Vector sprite library
├── src/
│   ├── components/
│   │   ├── CustomAvatarModal.jsx    # Custom photo uploader
│   │   ├── Header.jsx               # Navigation bar & mode switchers
│   │   ├── LessonMap.jsx            # 685-lesson interactive curriculum map
│   │   ├── ResultsModal.jsx         # Performance metrics & star rating
│   │   ├── ShareToast.jsx           # Share notification banner
│   │   ├── ThemeToggle.jsx          # Day / Night mode toggle button
│   │   ├── TypingArea.jsx           # Core typing engine with word-wrap
│   │   ├── VirtualKeyboard.jsx      # 10-finger color-coded keyboard & hands
│   │   ├── WeaknessHub.jsx          # 10-finger latency monitor & workout generator
│   │   └── WeaknessWorkoutBar.jsx   # In-arena adaptive workout header
│   ├── data/
│   │   ├── banglaLessons.js         # 80-lesson Bangla Avro phonetic curriculum
│   │   └── lessons.js               # 685-lesson English touch-typing curriculum
│   ├── utils/
│   │   ├── avroPhonetic.js          # Avro phonetic parser & transliterator
│   │   ├── shareUtils.js            # URL parameters & Web Share API
│   │   └── weaknessAnalyzer.js      # Latency profiler & paragraph synthesizer
│   ├── App.jsx                      # Main application orchestrator
│   ├── audio.js                     # Zero-latency Web Audio sound synthesizer
│   ├── index.css                    # Tailwind CSS v4 design tokens & themes
│   └── main.jsx                     # Application entry point
├── package.json
└── vite.config.js
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
