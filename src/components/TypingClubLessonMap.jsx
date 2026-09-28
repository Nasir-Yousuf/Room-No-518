import React, { useState, useMemo, useRef } from 'react';
import { Search, ChevronUp, ChevronDown, Trophy, Zap, Star, ArrowRight, Crown, Image as ImageIcon, ImageOff, Share2 } from 'lucide-react';
import { LESSON_STAGES, ALL_685_LESSONS } from '../data/lessons';
import { BANGLA_STAGES, ALL_BANGLA_LESSONS } from '../data/banglaLessons';
import ThemeToggle from './ThemeToggle';
import WeaknessHub from './WeaknessHub';

// Helper component to render icons directly from Typing Club's official svgsprite-cmn.svg
function SpriteIcon({ id, className = "w-[80px] h-[80px] sm:w-[94px] sm:h-[94px]" }) {
  return (
    <svg className={`${className} transition-transform duration-500 ease-out group-hover:scale-105 select-none drop-shadow-md`} viewBox="0 0 100 100">
      <use href={`#${id}`} xlinkHref={`#${id}`} />
      <use href={`/svgsprite-cmn.svg#${id}`} xlinkHref={`/svgsprite-cmn.svg#${id}`} />
    </svg>
  );
}

// Authentic Typing Club Padlock for untried lessons
function LessonLockIcon() {
  return (
    <div className="h-[38px] sm:h-[44px] mt-1.5 flex items-center justify-center select-none" title="Not typed yet">
      <svg
        width="40"
        height="35"
        viewBox="0 0 34 30"
        className="select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:scale-110"
      >
        <defs>
          <linearGradient id="tcLockShackle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="35%" stopColor="#F1F5F9" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="tcLockBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEE036" />
            <stop offset="25%" stopColor="#F5B800" />
            <stop offset="100%" stopColor="#D98E04" />
          </linearGradient>
        </defs>

        {/* Soft floor shadow matching the star ground shadow */}
        <ellipse cx="19" cy="27" rx="10" ry="2.2" fill="rgba(100, 116, 139, 0.35)" />

        {/* Metallic Shackle */}
        <path
          d="M12 13 V7.5 A5 5 0 0 1 22 7.5 V13"
          fill="none"
          stroke="url(#tcLockShackle)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Lock Body */}
        <rect
          x="8"
          y="11.5"
          width="18"
          height="14.5"
          rx="3"
          fill="url(#tcLockBody)"
          stroke="#B45309"
          strokeWidth="0.85"
        />

        {/* Highlight inner bevel line */}
        <path
          d="M9.5 13 H24.5"
          stroke="#FFFDF0"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Keyhole */}
        <circle cx="17" cy="17" r="1.5" fill="#5A2E05" />
        <polygon points="16,17.5 18,17.5 17.6,21 16.4,21" fill="#5A2E05" />
      </svg>
    </div>
  );
}

// Authentic 5-Star Arc Cluster & Lock state resolver
function StarsCluster({ earnedCount = 0, isCurrent = false, isTried = false }) {
  const count = Math.max(0, Math.min(5, earnedCount));

  // If not tried / completed and not currently being tried, show the lock
  if (!isTried && !isCurrent && count === 0) {
    return <LessonLockIcon />;
  }

  // If being tried or completed, show the official Typing Club 5-star arc
  const starSrc = count === 0 ? '/stars-0.png' : `/stars-${count}.png`;

  return (
    <div className="h-[38px] sm:h-[44px] mt-1.5 flex items-center justify-center select-none">
      <img
        src={starSrc}
        alt={`${count} star${count === 1 ? '' : 's'}`}
        className="w-[124px] sm:w-[144px] max-w-[92%] h-auto object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105 pointer-events-none"
        draggable={false}
      />
    </div>
  );
}

// Visual data resolver using Typing Club official SVGs
function getLessonVisualData(lesson) {
  const num = lesson.number;

  if (num % 10 === 3 || num % 20 === 13) {
    return { label: 'Practice R Hand', renderGraphic: () => <SpriteIcon id="Hand-r2" /> };
  }
  if (num % 10 === 9 || num % 20 === 19) {
    return { label: 'Practice L Hand', renderGraphic: () => <SpriteIcon id="Hand-l2" /> };
  }
  if (num === 102 || num % 30 === 14) {
    return { label: 'Good Posture', renderGraphic: () => <SpriteIcon id="sit-straight2" /> };
  }
  if (num === 96 || num % 30 === 20) {
    return { label: 'Take Breaks', renderGraphic: () => <SpriteIcon id="take-break" /> };
  }
  if (num === 94 || num % 15 === 4 || num % 10 === 4) {
    return { label: 'Play: Words', renderGraphic: () => <SpriteIcon id="game1" /> };
  }
  if (num === 100 || num % 15 === 10 || num % 20 === 0) {
    return { label: 'Play: Numbers', renderGraphic: () => <SpriteIcon id="game4" /> };
  }
  if (num === 1 || num === 86 || num === 176 || num === 261 || num === 351) {
    return { label: lesson.title, renderGraphic: () => <SpriteIcon id="intro" /> };
  }

  let speedSpriteId = 'speed1';
  switch (lesson.stageId) {
    case 1: speedSpriteId = 'speed1'; break;
    case 2: speedSpriteId = 'speed2'; break;
    case 3: speedSpriteId = 'speed3'; break;
    case 4: speedSpriteId = 'speed4'; break;
    case 5: speedSpriteId = 'speed5'; break;
    case 6: speedSpriteId = 'speed7'; break;
    case 7: speedSpriteId = 'speed8'; break;
    case 8:
    default: speedSpriteId = num === 685 ? 'speed14' : 'speed9'; break;
  }

  return {
    label: lesson.title.replace(/Lesson \d+:?/, '').trim() || `Lesson ${lesson.number}`,
    renderGraphic: () => <SpriteIcon id={speedSpriteId} />
  };
}

// Stage theme colors
const STAGE_THEMES = {
  1: { gradient: 'from-emerald-500/20 to-teal-500/20', accent: '#10b981', glow: 'shadow-emerald-500/20' },
  2: { gradient: 'from-blue-500/20 to-cyan-500/20', accent: '#3b82f6', glow: 'shadow-blue-500/20' },
  3: { gradient: 'from-violet-500/20 to-purple-500/20', accent: '#8b5cf6', glow: 'shadow-violet-500/20' },
  4: { gradient: 'from-amber-500/20 to-orange-500/20', accent: '#f59e0b', glow: 'shadow-amber-500/20' },
  5: { gradient: 'from-rose-500/20 to-pink-500/20', accent: '#f43f5e', glow: 'shadow-rose-500/20' },
  6: { gradient: 'from-indigo-500/20 to-blue-500/20', accent: '#6366f1', glow: 'shadow-indigo-500/20' },
  7: { gradient: 'from-teal-500/20 to-emerald-500/20', accent: '#14b8a6', glow: 'shadow-teal-500/20' },
  8: { gradient: 'from-yellow-500/20 to-amber-500/20', accent: '#eab308', glow: 'shadow-yellow-500/20' },
};

// Animated background particles
function BackgroundParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl animate-floatSlow" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-cyan-600/6 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-rose-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
    </div>
  );
}

export default function TypingClubLessonMap({
  currentLessonNumber,
  onSelectLesson,
  onBackToTyping,
  completedStars = {},
  isDark,
  onToggleTheme,
  showTierPhotos = true,
  onToggleTierPhotos,
  onShareLesson,
  language = 'en',
  onSelectLanguage,
  onStartWeaknessWorkout
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedStages, setCollapsedStages] = useState({});
  const mainRef = useRef(null);

  const activeLessons = useMemo(() => {
    return language === 'bn' ? ALL_BANGLA_LESSONS : ALL_685_LESSONS;
  }, [language]);

  const activeStages = useMemo(() => {
    return language === 'bn' ? BANGLA_STAGES : LESSON_STAGES;
  }, [language]);

  const totalLessonsCount = activeLessons.length;
  const totalCompleted = Object.keys(completedStars).length;
  const progressPercent = Math.min(100, Math.round((totalCompleted / Math.max(1, totalLessonsCount)) * 100));
  const totalStars = Object.values(completedStars).reduce((acc, s) => acc + s, 0);
  const totalPoints = totalStars * 400 + totalCompleted * 1000;

  const filteredLessons = useMemo(() => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      const qNum = parseInt(q, 10);
      if (!isNaN(qNum) && qNum.toString() === q) {
        const exact = activeLessons.filter((l) => l.number === qNum);
        if (exact.length > 0) return exact;
      }
      return activeLessons.filter(
        (l) =>
          l.number === qNum ||
          l.title.toLowerCase().includes(q) ||
          l.text.toLowerCase().includes(q) ||
          (l.phoneticHint && l.phoneticHint.toLowerCase().includes(q))
      );
    }
    return activeLessons;
  }, [searchQuery, activeLessons]);

  const stagesWithLessons = useMemo(() => {
    if (searchQuery.trim() !== '') {
      return [{ id: 0, name: 'Search Results', lessons: filteredLessons, icon: '🔍', description: `${filteredLessons.length} matches found` }];
    }
    return activeStages.map((stage) => ({
      ...stage,
      lessons: activeLessons.filter((l) => l.stageId === stage.id)
    }));
  }, [searchQuery, filteredLessons, activeStages, activeLessons]);

  const toggleStage = (stageId) => {
    setCollapsedStages(prev => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  const scrollToStage = (stageId) => {
    if (collapsedStages[stageId]) {
      setCollapsedStages(prev => ({ ...prev, [stageId]: false }));
    }
    setTimeout(() => {
      const el = document.getElementById(`stage-${stageId}`) || document.querySelector(`[data-stage="${stageId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 15);
  };

  return (
    <div className="min-h-screen font-['Inria_Sans',_'Roboto',_sans-serif] font-normal flex flex-col select-none relative overflow-x-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <BackgroundParticles />

      {/* ─── Premium Header ─── */}
      <header className="w-full glass-strong px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between z-20 sticky top-0">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-xl">⌨️</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight gradient-text">room-no-518</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold -mt-0.5">
              {language === 'weakness'
                ? 'Adaptive Weakness AI • Smart Paragraphs'
                : language === 'bn'
                ? 'অভ্র ফোনেটিক • ৮০ Lessons'
                : 'Typing Club • 685 Lessons'}
            </p>
          </div>
        </div>

        {/* Language Selector: English vs Bangla Avro (অভ্র) */}
        <div className="flex items-center p-1 rounded-2xl glass-strong border border-slate-300/50 dark:border-white/10 shadow-xs my-1 sm:my-0">
          <button
            type="button"
            tabIndex={-1}
            onClick={() => onSelectLanguage && onSelectLanguage('en')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="English Touch Typing (685 Lessons)"
          >
            <span>🇬🇧 English</span>
            <span className="text-[10px] opacity-80 font-normal hidden sm:inline">(685)</span>
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => onSelectLanguage && onSelectLanguage('bn')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              language === 'bn'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Bangla Avro Phonetic Typing (অভ্র)"
          >
            <span>🇧🇩 বাংলা অভ্র</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">New</span>
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => onSelectLanguage && onSelectLanguage('weakness')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              language === 'weakness'
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Weak Fingers & Words Adaptive AI Workout"
          >
            <span>🎯 Weakness AI</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold hidden sm:inline">Adaptive</span>
          </button>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-3 glass-light px-4 py-2 rounded-full text-sm font-bold">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-700 dark:text-slate-300">{progressPercent}%</span>
            </div>
            <div className="w-px h-4 bg-black/10 dark:bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-amber-600 dark:text-amber-300 font-extrabold">{totalStars.toLocaleString()}</span>
            </div>
            <div className="w-px h-4 bg-black/10 dark:bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-purple-600 dark:text-purple-300 font-extrabold">{totalPoints.toLocaleString()}</span>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-48 sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search lessons (e.g. 93)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filteredLessons.length > 0) {
                  e.preventDefault();
                  onSelectLesson(filteredLessons[0]);
                  onBackToTyping();
                }
              }}
              className="w-full pl-9 pr-3 py-2.5 glass-light rounded-xl text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>

          {/* Tier Photos Toggle Button */}
          {onToggleTierPhotos && (
            <button
              onClick={onToggleTierPhotos}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md active:scale-95 border ${
                showTierPhotos
                  ? 'bg-gradient-to-r from-purple-500/15 to-indigo-500/15 border-purple-500/35 text-purple-600 dark:text-purple-300 hover:bg-purple-500/25'
                  : 'glass-light border-slate-300/60 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title={
                showTierPhotos
                  ? 'Tier Photos are ON. Click to turn off tier photos everywhere.'
                  : 'Tier Photos are OFF. Click to turn on tier photos.'
              }
              aria-label="Toggle Tier Photos"
            >
              {showTierPhotos ? (
                <>
                  <ImageIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="hidden sm:inline">Photos: <span className="text-emerald-600 dark:text-emerald-400 font-black">ON</span></span>
                </>
              ) : (
                <>
                  <ImageOff className="w-4 h-4 text-slate-400" />
                  <span className="hidden sm:inline">Photos: <span className="text-rose-500 dark:text-rose-400 font-black">OFF</span></span>
                </>
              )}
            </button>
          )}

          {/* Share Current Lesson Link */}
          {onShareLesson && (
            <button
              onClick={() => onShareLesson({ number: currentLessonNumber, title: `Lesson ${currentLessonNumber}` })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold glass-light border border-slate-300/60 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 cursor-pointer shadow-xs active:scale-95"
              title={`Share direct link for Lesson ${currentLessonNumber}`}
              aria-label="Share Current Lesson"
            >
              <Share2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span className="hidden sm:inline">Share L{currentLessonNumber}</span>
            </button>
          )}

          {/* Day/Night Toggle */}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

          {/* Start Typing CTA */}
          <button
            onClick={() => {
              if (searchQuery.trim() !== '' && filteredLessons.length > 0) {
                onSelectLesson(filteredLessons[0]);
              }
              onBackToTyping();
            }}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>Start Typing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ─── Conditional View: Weakness AI Hub vs Curriculum Stages ─── */}
      {language === 'weakness' ? (
        <main className="flex-1 max-w-6xl w-full mx-auto px-2 sm:px-6 pb-12 relative z-10">
          <WeaknessHub
            onStartWorkout={(workout) => {
              if (onStartWeaknessWorkout) {
                onStartWeaknessWorkout(workout);
              } else {
                onBackToTyping();
              }
            }}
            isDark={isDark}
          />
        </main>
      ) : (
        <>
          {/* ─── Progress Overview Banner ─── */}
          <div className="w-full px-4 sm:px-8 py-4">
            <div className="max-w-6xl mx-auto glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-pink-600/5" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-2" style={{ color: 'var(--text-heading)' }}>
                    <Trophy className="w-6 h-6 text-amber-400" />
                    Your Journey
                  </h2>
                  <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    {totalCompleted === 0
                      ? 'Begin your typing adventure! Start with Lesson 1.'
                      : `${totalCompleted} of 685 lessons completed • Keep going!`}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Circular Progress */}
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(99, 102, 241, 0.15)"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#progressGrad)"
                        strokeWidth="3"
                        strokeDasharray={`${progressPercent}, 100`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#a78bfa" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-base sm:text-lg font-black" style={{ color: 'var(--text-heading)' }}>{progressPercent}%</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="hidden sm:block w-52">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-bold">
                      <span>{totalCompleted} lessons</span>
                      <span>685 total</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 relative"
                        style={{ width: `${progressPercent}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-shimmer rounded-full" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ─── Main Stages & Lesson Grid ─── */}
          <main ref={mainRef} className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 pb-12 relative z-10">
        {stagesWithLessons.map((stage, stageIdx) => {
          const theme = STAGE_THEMES[stage.id] || STAGE_THEMES[1];
          const stageCompleted = stage.lessons?.filter(l => completedStars[l.number]).length || 0;
          const stageTotal = stage.lessons?.length || 0;
          const stagePercent = stageTotal > 0 ? Math.round((stageCompleted / stageTotal) * 100) : 0;
          const isCollapsed = collapsedStages[stage.id];

          return (
            <section
              key={stage.id}
              id={`stage-${stage.id}`}
              data-stage={stage.id}
              className="scroll-mt-24 mb-10 animate-fadeInUp"
              style={{ animationDelay: `${stageIdx * 0.08}s` }}
            >
              {/* Stage Header */}
              <button
                onClick={() => toggleStage(stage.id)}
                className="w-full flex items-center justify-between gap-3 mb-4 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${theme.accent}30, ${theme.accent}10)`, boxShadow: `0 4px 15px ${theme.accent}20` }}
                  >
                    {stage.icon}
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2" style={{ color: 'var(--text-heading)' }}>
                      {stage.name}
                      {stagePercent === 100 && <Crown className="w-5 h-5 text-amber-400" />}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">{stage.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Stage progress mini-bar */}
                  <div className="hidden sm:flex items-center gap-2.5">
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${stagePercent}%`, background: theme.accent }}
                      />
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-300 font-mono font-bold w-10">{stagePercent}%</span>
                  </div>

                  <div className="w-8 h-8 rounded-lg glass-light flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-white transition">
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Cards Grid */}
              {!isCollapsed && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {stage.lessons.map((lesson, lessonIdx) => {
                    const isCurrent = currentLessonNumber === lesson.number;
                    const visual = getLessonVisualData(lesson);
                    const userEarnedStars = completedStars[lesson.number] || 0;
                    const isCompleted = userEarnedStars > 0;
                    const isTried = isCompleted || isCurrent;

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          onSelectLesson(lesson);
                          onBackToTyping();
                        }}
                        className={`relative glass-card lesson-card rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                          isCurrent
                            ? 'ring-2 ring-indigo-500 shadow-xl shadow-indigo-500/25 scale-[1.02]'
                            : isCompleted
                            ? 'hover:ring-1 hover:ring-indigo-500/30 dark:hover:ring-white/20'
                            : 'opacity-85 hover:opacity-100 hover:ring-1 hover:ring-amber-500/30'
                        }`}
                        style={{ animationDelay: `${lessonIdx * 0.02}s` }}
                      >
                        {/* Completed badge */}
                        {isCompleted && (
                          <div className="absolute top-2.5 right-2.5 z-10">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/40">
                              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}

                        {/* Current lesson badge */}
                        {isCurrent && !isCompleted && (
                          <div className="absolute top-2.5 right-2.5 z-10">
                            <div className="px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md shadow-indigo-500/40">
                              Current
                            </div>
                          </div>
                        )}

                        {/* Current lesson indicator */}
                        {isCurrent && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-shift" />
                        )}

                        {/* Lesson number and Quick Share */}
                        <div className="pt-3.5 pl-3.5 pr-3 pb-1 flex items-center justify-between">
                          <span className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: theme.accent }}>
                            {lesson.number}
                          </span>
                          {onShareLesson && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onShareLesson(lesson);
                              }}
                              className="w-7 h-7 rounded-lg glass-light bg-black/15 dark:bg-white/10 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-xs hover:scale-110 active:scale-95 z-20"
                              title={`Copy share link for Lesson ${lesson.number}`}
                              aria-label={`Share Lesson ${lesson.number}`}
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Center graphic (Bigger SVG) */}
                        <div className="flex flex-col items-center justify-center px-2 py-2">
                          <div className="h-[84px] sm:h-[98px] flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
                            {visual.renderGraphic()}
                          </div>
                          <StarsCluster earnedCount={userEarnedStars} isCurrent={isCurrent} isTried={isTried} />
                        </div>

                        {/* Bottom label (Bigger, Clear Text) */}
                        <div
                          className="w-full py-2.5 px-3 border-t text-center transition-colors"
                          style={{ backgroundColor: 'var(--bg-glass-light)', borderColor: 'var(--border-subtle)' }}
                        >
                          <p className="lesson-card-label text-xs sm:text-[13px] font-bold truncate">
                            {visual.label}
                          </p>
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/[0.03]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </main>

      {/* ─── Floating Navigation Pill ─── */}
      <aside className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center glass-strong rounded-2xl py-3 px-1.5 shadow-2xl gap-2 z-30">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-9 h-9 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
          title="Scroll to Top"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>

        {LESSON_STAGES.map((stage) => {
          const theme = STAGE_THEMES[stage.id];
          return (
            <button
              key={stage.id}
              onClick={() => scrollToStage(stage.id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-slate-700 dark:text-slate-200 transition-all duration-200 hover:scale-115 active:scale-95 cursor-pointer shadow-xs hover:shadow-md"
              style={{
                background: `${theme?.accent || '#6366f1'}30`,
                border: `1px solid ${theme?.accent || '#6366f1'}50`,
                color: theme?.accent || '#6366f1'
              }}
              title={`Jump to Stage ${stage.id}: ${stage.name}`}
            >
              {stage.id}
            </button>
          );
        })}

        <button
          onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
          className="w-9 h-9 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
          title="Scroll to Bottom"
        >
          <ChevronDown className="w-5 h-5 stroke-[2.5]" />
        </button>
      </aside>
    </>
  )}
    </div>
  );
}
