import React, { useState, useMemo, useRef } from 'react';
import { Search, ChevronUp, ChevronDown, Trophy, Zap, Star, ArrowRight, Crown, Image as ImageIcon, Sparkles, X } from 'lucide-react';
import { LESSON_STAGES, ALL_685_LESSONS, BEAUTY_TIERS } from '../data/lessons';
import ThemeToggle from './ThemeToggle';

// Helper component to render icons directly from Typing Club's official svgsprite-cmn.svg
function SpriteIcon({ id, className = "w-[80px] h-[80px] sm:w-[94px] sm:h-[94px]" }) {
  return (
    <svg className={`${className} transition-transform duration-500 ease-out group-hover:scale-105 select-none drop-shadow-md`} viewBox="0 0 100 100">
      <use href={`#${id}`} xlinkHref={`#${id}`} />
      <use href={`/svgsprite-cmn.svg#${id}`} xlinkHref={`/svgsprite-cmn.svg#${id}`} />
    </svg>
  );
}

// Realistic 3D Faceted Golden Star & Clear Embossed Socket
function GoldenStar({ size = 24, earned = false, delay = 0, className = "" }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const starId = `realStar-${uid}-${delay}`;
  const sizeClass = className || "w-[21px] h-[21px] sm:w-[24px] sm:h-[24px]";

  if (!earned) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={`${sizeClass} select-none transition-transform duration-300 hover:scale-110`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <defs>
          <linearGradient id={`emptySocket-${starId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(180, 83, 9, 0.08)" />
            <stop offset="100%" stopColor="rgba(180, 83, 9, 0.16)" />
          </linearGradient>
          <linearGradient id={`emptySocketDark-${starId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.04)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.09)" />
          </linearGradient>
        </defs>

        {/* Clear Embossed Socket Silhouette */}
        <path
          d="M12 1.5 L14.7 8.28 L22 8.76 L16.37 13.42 L18.17 20.49 L12 16.6 L5.83 20.49 L7.63 13.42 L2.01 8.76 L9.3 8.28 Z"
          className="fill-[url(#emptySocket-${starId})] dark:fill-[url(#emptySocketDark-${starId})] stroke-amber-900/40 dark:stroke-slate-500/60"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* 3D Ridges to make empty socket visibly sculpted */}
        <path
          d="M12 12 L12 1.5 M12 12 L22 8.76 M12 12 L18.17 20.49 M12 12 L5.83 20.49 M12 12 L2.01 8.76"
          className="stroke-amber-900/25 dark:stroke-slate-400/30"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M12 12 L14.7 8.28 M12 12 L16.37 13.42 M12 12 L12 16.6 M12 12 L7.63 13.42 M12 12 L9.3 8.28"
          className="stroke-amber-900/15 dark:stroke-slate-400/20"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={`${sizeClass} select-none filter drop-shadow-[0_2px_4px_rgba(217,119,6,0.5)] dark:drop-shadow-[0_2px_7px_rgba(250,204,21,0.45)] transition-transform duration-300 hover:scale-115 animate-scale-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        {/* Specular Highlight Gold */}
        <linearGradient id={`goldLit-${starId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="40%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#FACC15" />
        </linearGradient>

        {/* Midtone Radiant Gold */}
        <linearGradient id={`goldMid-${starId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Warm Ambient Shaded Gold */}
        <linearGradient id={`goldShade-${starId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* Deep Crevice Bronze Shade */}
        <linearGradient id={`goldDeep-${starId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>

      {/* Solid Base Silhouette with Polished Bronze Rim */}
      <path
        d="M12 1.5 L14.7 8.28 L22 8.76 L16.37 13.42 L18.17 20.49 L12 16.6 L5.83 20.49 L7.63 13.42 L2.01 8.76 L9.3 8.28 Z"
        fill={`url(#goldMid-${starId})`}
        stroke="#92400E"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />

      {/* ─── 10 Precision 3D Facets (Light & Shadow Reflections) ─── */}
      {/* Top Ray - Left Highlight */}
      <polygon points="12,12 12,1.5 9.3,8.28" fill={`url(#goldLit-${starId})`} />
      {/* Top Ray - Right Midtone */}
      <polygon points="12,12 12,1.5 14.7,8.28" fill={`url(#goldMid-${starId})`} />

      {/* Top-Right Ray - Upper Midtone */}
      <polygon points="12,12 14.7,8.28 22,8.76" fill={`url(#goldMid-${starId})`} />
      {/* Top-Right Ray - Lower Shaded */}
      <polygon points="12,12 22,8.76 16.37,13.42" fill={`url(#goldShade-${starId})`} />

      {/* Bottom-Right Ray - Upper Warm Shade */}
      <polygon points="12,12 16.37,13.42 18.17,20.49" fill={`url(#goldShade-${starId})`} />
      {/* Bottom-Right Ray - Lower Deep Bronze */}
      <polygon points="12,12 18.17,20.49 12,16.6" fill={`url(#goldDeep-${starId})`} />

      {/* Bottom-Left Ray - Lower Deep Shade */}
      <polygon points="12,12 12,16.6 5.83,20.49" fill={`url(#goldDeep-${starId})`} />
      {/* Bottom-Left Ray - Upper Midtone */}
      <polygon points="12,12 5.83,20.49 7.63,13.42" fill={`url(#goldMid-${starId})`} />

      {/* Top-Left Ray - Lower Midtone */}
      <polygon points="12,12 7.63,13.42 2.01,8.76" fill={`url(#goldMid-${starId})`} />
      {/* Top-Left Ray - Upper Specular Glow */}
      <polygon points="12,12 2.01,8.76 9.3,8.28" fill={`url(#goldLit-${starId})`} />

      {/* ─── Polished Bevel Ridges ─── */}
      <path
        d="M12 12 L12 1.5 M12 12 L2.01 8.76 M12 12 L9.3 8.28"
        stroke="#FFFDF0"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M12 12 L22 8.76 M12 12 L18.17 20.49 M12 12 L5.83 20.49"
        stroke="#78350F"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* ─── Real Diamond Glint / Specular Sparkle ─── */}
      <circle cx="12" cy="3.2" r="0.8" fill="#FFFFFF" opacity="0.95" />
      <path
        d="M12 1.6 L12.35 3.1 L13.8 3.5 L12.35 3.9 L12 5.4 L11.65 3.9 L10.2 3.5 L11.65 3.1 Z"
        fill="#FFFFFF"
        opacity="0.85"
      />
    </svg>
  );
}

// Mini star cluster with increased size and spacing
function StarsCluster({ earnedCount = 0 }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-2.5">
      {[0, 1, 2, 3, 4].map((idx) => (
        <GoldenStar key={idx} earned={idx < earnedCount} delay={idx * 60} />
      ))}
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
  onOpenCustomPhotos,
  customAvatars = {}
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedStages, setCollapsedStages] = useState({});
  const [lightboxTier, setLightboxTier] = useState(null);
  const mainRef = useRef(null);

  const totalCompleted = Object.keys(completedStars).length;
  const progressPercent = Math.min(100, Math.round((totalCompleted / 685) * 100));
  const totalStars = Object.values(completedStars).reduce((acc, s) => acc + s, 0);
  const totalPoints = totalStars * 400 + totalCompleted * 1000;

  const filteredLessons = useMemo(() => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      const qNum = parseInt(q, 10);
      return ALL_685_LESSONS.filter(
        (l) => l.number === qNum || l.title.toLowerCase().includes(q) || l.text.toLowerCase().includes(q)
      );
    }
    return ALL_685_LESSONS;
  }, [searchQuery]);

  const stagesWithLessons = useMemo(() => {
    if (searchQuery.trim() !== '') {
      return [{ id: 0, name: 'Search Results', lessons: filteredLessons, icon: '🔍', description: `${filteredLessons.length} matches found` }];
    }
    return LESSON_STAGES.map((stage) => ({
      ...stage,
      lessons: ALL_685_LESSONS.filter((l) => l.stageId === stage.id)
    }));
  }, [searchQuery, filteredLessons]);

  const toggleStage = (stageId) => {
    setCollapsedStages(prev => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  return (
    <div className="min-h-screen font-['Inter'] flex flex-col select-none relative overflow-x-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
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
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold -mt-0.5">Typing Club • 685 Lessons</p>
          </div>
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
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 glass-light rounded-xl text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>

          {/* Tier Photos Button */}
          {onOpenCustomPhotos && (
            <button
              onClick={onOpenCustomPhotos}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 glass-light rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition cursor-pointer"
              title="Customize Speed Tier Photos"
            >
              <ImageIcon className="w-3.5 h-3.5 text-purple-500" />
              <span>Tier Photos</span>
            </button>
          )}

          {/* Day/Night Toggle */}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

          {/* Start Typing CTA */}
          <button
            onClick={onBackToTyping}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>Start Typing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

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

      {/* ─── Speed Tiers & Character Photos Gallery ─── */}
      <div className="w-full px-4 sm:px-8 py-2 mb-3">
        <div className="max-w-6xl mx-auto glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-amber-600/5 pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black" style={{ color: 'var(--text-heading)' }}>
                  Speed Tiers & Photos
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Your typing speed dynamically unlocks tiers and companion photos in real-time. Click any photo to preview or customize.
              </p>
            </div>

            {onOpenCustomPhotos && (
              <button
                onClick={onOpenCustomPhotos}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition cursor-pointer self-start sm:self-auto"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Customize Photos</span>
              </button>
            )}
          </div>

          {/* 5 Tier Cards Grid */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {BEAUTY_TIERS.map((tier) => {
              const currentImg = customAvatars[tier.tier] || tier.avatar;
              const isCustom = Boolean(customAvatars[tier.tier]);

              return (
                <div
                  key={tier.tier}
                  onClick={() => setLightboxTier({ ...tier, avatar: currentImg, isCustom })}
                  className="group/tier relative glass-light rounded-2xl p-3 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl border"
                  style={{
                    borderColor: `${tier.themeColor}35`,
                    boxShadow: `0 4px 20px ${tier.themeColor}10`
                  }}
                >
                  {/* Photo Container */}
                  <div
                    className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-2.5 shadow-md border-2 transition-transform duration-500 group-hover/tier:scale-[1.02]"
                    style={{ borderColor: tier.themeColor }}
                  >
                    <img
                      src={currentImg}
                      alt={tier.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/tier:scale-110"
                    />

                    {/* Tier Number Pill */}
                    <div
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-black text-white shadow-md flex items-center gap-1"
                      style={{ backgroundColor: tier.themeColor }}
                    >
                      <span>Tier {tier.tier}</span>
                    </div>

                    {isCustom && (
                      <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center shadow" title="Custom Photo Uploaded">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}

                    {/* Quick view overlay icon on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/tier:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        View Photo 🔍
                      </span>
                    </div>
                  </div>

                  {/* Tier Info */}
                  <h3
                    className="text-xs sm:text-sm font-extrabold truncate w-full"
                    style={{ color: tier.themeColor }}
                  >
                    {tier.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md glass-card text-slate-700 dark:text-slate-300">
                      {tier.targetSpeed}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium italic mt-1.5 line-clamp-1">
                    "{tier.dialogues[0]}"
                  </p>
                </div>
              );
            })}
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
            <section key={stage.id} className="mb-10 animate-fadeInUp" style={{ animationDelay: `${stageIdx * 0.08}s` }}>
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

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          onSelectLesson(lesson);
                          onBackToTyping();
                        }}
                        className={`relative glass-card lesson-card rounded-2xl overflow-hidden cursor-pointer group ${
                          isCurrent
                            ? 'ring-2 ring-indigo-500 shadow-xl shadow-indigo-500/25 scale-[1.02]'
                            : 'hover:ring-1 hover:ring-indigo-500/30 dark:hover:ring-white/20'
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

                        {/* Current lesson indicator */}
                        {isCurrent && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-shift" />
                        )}

                        {/* Lesson number */}
                        <div className="pt-3.5 pl-3.5 pb-1">
                          <span className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: theme.accent }}>
                            {lesson.number}
                          </span>
                        </div>

                        {/* Center graphic (Bigger SVG) */}
                        <div className="flex flex-col items-center justify-center px-2 py-2">
                          <div className="h-[84px] sm:h-[98px] flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
                            {visual.renderGraphic()}
                          </div>
                          <StarsCluster earnedCount={userEarnedStars} />
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
          className="w-9 h-9 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition cursor-pointer"
          title="Scroll to Top"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>

        {LESSON_STAGES.map(stage => {
          const theme = STAGE_THEMES[stage.id];
          return (
            <button
              key={stage.id}
              onClick={() => {
                const el = document.querySelector(`[data-stage="${stage.id}"]`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-all hover:scale-110 cursor-pointer"
              style={{ background: `${theme?.accent || '#6366f1'}20` }}
              title={stage.name}
            >
              {stage.id}
            </button>
          );
        })}

        <button
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          className="w-9 h-9 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition cursor-pointer"
          title="Scroll to Bottom"
        >
          <ChevronDown className="w-5 h-5 stroke-[2.5]" />
        </button>
      </aside>

      {/* ─── Tier Photo Lightbox Modal ─── */}
      {lightboxTier && (
        <div
          onClick={() => setLightboxTier(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full glass-strong rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col items-center animate-scale-in border"
            style={{ borderColor: `${lightboxTier.themeColor}50` }}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxTier(null)}
              className="absolute top-4 right-4 p-2 rounded-xl glass-light text-slate-400 hover:text-white transition cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo */}
            <div
              className="w-full aspect-[4/5] max-h-[50vh] rounded-2xl overflow-hidden border-2 shadow-2xl mb-4"
              style={{ borderColor: lightboxTier.themeColor }}
            >
              <img
                src={lightboxTier.avatar}
                alt={lightboxTier.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="w-full text-center">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span
                  className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg text-white"
                  style={{ backgroundColor: lightboxTier.themeColor }}
                >
                  Tier {lightboxTier.tier}
                </span>
                <span className="text-sm font-mono font-bold text-slate-500 dark:text-slate-400">
                  {lightboxTier.targetSpeed}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black" style={{ color: lightboxTier.themeColor }}>
                {lightboxTier.name}
              </h3>

              <div className="mt-3 p-3 glass-card rounded-xl text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Typing Reactions
                </span>
                <p className="text-xs sm:text-sm font-medium italic text-slate-700 dark:text-slate-300">
                  "{lightboxTier.dialogues[0]}"
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 mt-4">
                {onOpenCustomPhotos && (
                  <button
                    onClick={() => {
                      setLightboxTier(null);
                      onOpenCustomPhotos();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-500/25 transition cursor-pointer"
                  >
                    Customize Photo
                  </button>
                )}
                <button
                  onClick={() => setLightboxTier(null)}
                  className="px-5 py-2.5 glass-light rounded-xl text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-indigo-600 dark:hover:text-white transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
