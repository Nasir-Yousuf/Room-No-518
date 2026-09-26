import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, RotateCcw, ChevronDown, Star, Trophy, Zap, Target, Clock, Flame, Sparkles, X } from 'lucide-react';
import { BEAUTY_TIERS } from '../data/lessons';

// Animated circular gauge
function CircularGauge({ value, maxValue, label, unit, color, size = 140 }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = maxValue > 0 ? Math.min(animatedValue / maxValue, 1) : 0;
  const dashOffset = circumference * (1 - percent);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />
          {/* Animated progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-1500 ease-out"
            style={{ filter: `drop-shadow(0 0 8px ${color}50)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight" style={{ color: 'var(--text-heading)' }}>
            {animatedValue}{unit}
          </span>
        </div>
      </div>
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-2">{label}</span>
    </div>
  );
}

// Animated result star
function ResultStar({ earned = true, size = 40, delay = 0 }) {
  if (!earned) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="opacity-20"
        style={{ animationDelay: `${delay}ms` }}
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="#1e3a5f"
          stroke="#2d5a8a"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="animate-scale-in filter drop-shadow-[0_4px_12px_rgba(250,204,21,0.5)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <linearGradient id={`resultGold-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path
        d="M12 1.6l3.15 6.38 7.04 1.02-5.1 4.97 1.2 7.01L12 17.68l-6.29 3.3 1.2-7.01-5.1-4.97 7.04-1.02L12 1.6z"
        fill={`url(#resultGold-${delay})`}
        stroke="#ca8a04"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M12 1.6l1.6 6.38-4.7-0.3L12 1.6z" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}

export default function ResultsModal({
  isOpen,
  wpm,
  accuracy,
  glamourScore,
  peakCombo,
  totalErrors,
  elapsedTime = 0,
  onRestart,
  onNextLesson,
  hasNextLesson,
  currentLesson = { number: 1, title: 'Introduction to Typing', targetWpm: 15 },
  onClose,
  onBackToLessons,
  currentTier,
  customAvatars = {}
}) {
  if (!isOpen) return null;

  // Star calculation
  let stars = 1;
  if (accuracy >= 80 && wpm >= 3) stars = 2;
  if (accuracy >= 88 && wpm >= 5) stars = 3;
  if (accuracy >= 94 && wpm >= 7) stars = 4;
  if (accuracy >= 98 && wpm >= 9) stars = 5;

  // Speed Tier achieved based on wpm or active currentTier
  const tierObj = currentTier || BEAUTY_TIERS.find(t => wpm >= t.minWpm && wpm <= t.maxWpm) || BEAUTY_TIERS[Math.min(stars - 1, 4)];
  const activeAvatar = customAvatars[tierObj.tier] || tierObj.avatar;


  const targetWpm = currentLesson.targetWpm || 21;

  // Duration in mm:ss format
  const mins = Math.floor(elapsedTime / 60);
  const secs = elapsedTime % 60;
  const formattedDuration = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  // Points calculation
  const calculatedPoints = Math.round(wpm * 35 + accuracy * 20 + stars * 150);

  // Performance rating
  const getPerformanceLabel = () => {
    if (stars >= 5) return { label: 'PERFECT', color: '#facc15', icon: '👑' };
    if (stars >= 4) return { label: 'EXCELLENT', color: '#a78bfa', icon: '🌟' };
    if (stars >= 3) return { label: 'GREAT', color: '#34d399', icon: '✨' };
    if (stars >= 2) return { label: 'GOOD', color: '#60a5fa', icon: '👍' };
    return { label: 'KEEP GOING', color: '#f59e0b', icon: '💪' };
  };

  const perf = getPerformanceLabel();

  useEffect(() => {
    if (stars >= 4) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.4 } });
      if (stars >= 5) {
        setTimeout(() => {
          confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.5 } });
          confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.5 } });
        }, 300);
      }
    }
  }, [stars]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col text-white select-none animate-fadeIn overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl" />
      </div>

      {/* Top Header */}
      <header className="w-full glass-strong px-4 sm:px-8 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLessons || onClose}
            className="p-2 rounded-xl glass-light text-slate-400 hover:text-white transition cursor-pointer"
            title="Return to Curriculum"
          >
            <X className="w-4 h-4" />
          </button>
          <h1 className="text-sm sm:text-base font-bold" style={{ color: 'var(--text-heading)' }}>
            Lesson {currentLesson.number}: {currentLesson.title}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-4xl mx-auto w-full relative z-10">
        {/* Performance Badge */}
        <div className="flex items-center gap-2 mb-4 animate-fadeInUp">
          <span className="text-3xl">{perf.icon}</span>
          <span className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: perf.color }}>
            {perf.label}
          </span>
        </div>

        {/* Stars Arc */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              style={{
                transform: `translateY(${Math.abs(idx - 2) * 6}px) rotate(${(idx - 2) * 6}deg)`
              }}
            >
              <ResultStar
                size={idx === 2 ? 48 : 38}
                earned={idx < stars}
                delay={idx * 150}
              />
            </div>
          ))}
        </div>

        {/* Tier Photo Achievement Badge */}
        <div
          className="flex items-center gap-3.5 glass-card px-5 py-3 rounded-2xl mb-7 animate-fadeInUp border max-w-md w-full justify-between"
          style={{
            borderColor: `${tierObj.themeColor}50`,
            boxShadow: `0 8px 25px ${tierObj.themeColor}20`
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 flex-shrink-0 shadow-lg"
              style={{ borderColor: tierObj.themeColor }}
            >
              <img
                src={activeAvatar}
                alt={tierObj.name}
                className="w-full h-full object-cover"
              />
              <span
                className="absolute bottom-0 inset-x-0 text-center text-[10px] font-black text-white py-0.5"
                style={{ backgroundColor: tierObj.themeColor }}
              >
                Tier {tierObj.tier}
              </span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-black px-2 py-0.5 rounded-md" style={{ background: `${tierObj.themeColor}25`, color: tierObj.themeColor }}>
                  {tierObj.name}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {tierObj.targetSpeed}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium italic mt-1 line-clamp-2 max-w-[240px]">
                "{tierObj.dialogues[0]}"
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg border border-amber-400/20">
              Tier {tierObj.tier}
            </span>
          </div>
        </div>

        {/* Score */}
        <div className="text-center mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <span className="text-5xl sm:text-6xl font-black text-white font-mono gradient-text">
            {calculatedPoints}
          </span>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Points Earned</p>
        </div>

        {/* Circular Gauges */}
        <div className="grid grid-cols-3 gap-6 sm:gap-10 items-start w-full max-w-2xl mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <CircularGauge
            value={accuracy}
            maxValue={100}
            label="Accuracy"
            unit="%"
            color={accuracy >= 90 ? '#34d399' : accuracy >= 70 ? '#facc15' : '#f87171'}
          />
          <CircularGauge
            value={wpm}
            maxValue={Math.max(wpm, 20)}
            label="Speed"
            unit=""
            color="#818cf8"
          />
          <div className="flex flex-col items-center">
            <div className="relative" style={{ width: 140, height: 140 }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center glass-card rounded-full">
                <Clock className="w-5 h-5 text-slate-400 mb-1" />
                <span className="text-2xl sm:text-3xl font-black font-mono" style={{ color: 'var(--text-heading)' }}>{formattedDuration}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-2">Duration</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="glass-light rounded-xl px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Peak Combo</span>
            </div>
            <span className="text-xl font-black text-orange-600 dark:text-orange-300 font-mono">{peakCombo}x</span>
          </div>
          <div className="glass-light rounded-xl px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <X className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Errors</span>
            </div>
            <span className="text-xl font-black text-red-600 dark:text-red-300 font-mono">{totalErrors}</span>
          </div>
          <div className="glass-light rounded-xl px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Stars</span>
            </div>
            <span className="text-xl font-black text-amber-600 dark:text-amber-300 font-mono">{stars}/5</span>
          </div>
          <div className="glass-light rounded-xl px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Points</span>
            </div>
            <span className="text-xl font-black text-purple-600 dark:text-purple-300 font-mono">{calculatedPoints}</span>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="w-full glass-strong px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 z-20">
        {/* Left: Back to lessons */}
        <button
          onClick={onBackToLessons || onClose}
          className="px-4 py-2.5 glass-light text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
        >
          <ChevronDown className="w-3.5 h-3.5" />
          <span>Lessons</span>
        </button>

        {/* Center: Try Again + Feedback */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRestart}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <p className="hidden sm:block text-xs text-slate-400 max-w-xs">
            {stars >= 5
              ? 'Flawless! You mastered this lesson!'
              : accuracy >= 90
              ? 'Great accuracy! Push your speed now.'
              : 'Focus on accuracy for more stars.'}
          </p>
        </div>

        {/* Right: Next Lesson */}
        {hasNextLesson ? (
          <button
            onClick={onNextLesson}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>Next Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBackToLessons || onClose}
            className="px-6 py-2.5 glass-light text-slate-800 dark:text-white rounded-xl text-sm font-bold transition cursor-pointer"
          >
            Back to Map
          </button>
        )}
      </footer>
    </div>
  );
}
