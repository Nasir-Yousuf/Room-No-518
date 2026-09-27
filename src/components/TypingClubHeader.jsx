import React from 'react';
import { Menu, RotateCcw, Keyboard, Hand, Volume2, VolumeX, Image as ImageIcon, ImageOff, Zap, Target, Flame, ArrowLeft, Sparkles, Share2, Link2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function TypingClubHeader({
  lessonTitle,
  lessonNumber,
  onOpenLessons,
  onOpenCustomPhotos,
  onReset,
  showKeyboard,
  onToggleKeyboard,
  showHands,
  onToggleHands,
  soundOn,
  onToggleSound,
  wpm,
  accuracy,
  currentTier,
  glamourScore,
  isDark,
  onToggleTheme,
  customAvatars = {},
  showTierPhotos = true,
  onToggleTierPhotos,
  onShareLesson
}) {
  const activeAvatar = customAvatars[currentTier.tier] || currentTier.avatar;

  return (
    <header className="w-full glass-strong px-2 sm:px-6 py-1.5 sm:py-2.5 flex items-center justify-between select-none z-20 relative overflow-hidden" style={{ color: 'var(--text-primary)' }}>
      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-shift opacity-60" />

      {/* Left: Back + Lesson Info */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          tabIndex={-1}
          onFocus={(e) => e.currentTarget.blur()}
          onClick={onOpenLessons}
          className="p-2 rounded-xl glass-light hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer group"
          title="Back to Lessons"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <div
          onClick={onOpenLessons}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-xs font-black text-indigo-400 border border-indigo-500/25">
            {lessonNumber}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base text-inherit group-hover:text-indigo-400 transition-colors truncate max-w-[140px] sm:max-w-[280px] leading-tight">
              {lessonTitle}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold hidden sm:inline -mt-0.5">
              room-no-518
            </span>
          </div>
        </div>

        {/* Quick Share Lesson Button */}
        {onShareLesson && (
          <button
            type="button"
            tabIndex={-1}
            onFocus={(e) => e.currentTarget.blur()}
            onClick={() => onShareLesson()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass-light hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 border border-transparent hover:border-indigo-500/30 transition-all text-xs font-bold cursor-pointer"
            title={`Copy Shareable Link for Lesson ${lessonNumber}`}
            aria-label="Share Lesson Link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Share</span>
          </button>
        )}
      </div>

      {/* Center / Right: Live Performance & Tools */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Stats Pills */}
        <div className="flex items-center gap-2 text-sm font-bold">
          {/* WPM */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-light">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-amber-500 dark:text-amber-300 font-mono font-black text-sm">{wpm}</span>
            <span className="text-slate-500 text-xs font-bold">WPM</span>
          </div>

          {/* Accuracy */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-light">
            <Target className="w-4 h-4 text-emerald-500" />
            <span className={`font-mono font-black text-sm ${accuracy >= 90 ? 'text-emerald-500 dark:text-emerald-300' : 'text-amber-500 dark:text-amber-300'}`}>{accuracy}%</span>
          </div>

          {/* Tier Badge */}
          <button
            type="button"
            tabIndex={-1}
            onFocus={(e) => e.currentTarget.blur()}
            onClick={showTierPhotos ? onOpenCustomPhotos : undefined}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer group"
            style={{
              background: `${currentTier.themeColor}18`,
              color: currentTier.themeColor,
              border: `1px solid ${currentTier.themeColor}35`,
              boxShadow: `0 0 15px ${currentTier.themeColor}15`
            }}
            title={showTierPhotos ? `Tier ${currentTier.tier}: ${currentTier.name} (${currentTier.targetSpeed}) - Click to customize` : `Tier ${currentTier.tier}: ${currentTier.name} (${currentTier.targetSpeed})`}
          >
            {showTierPhotos ? (
              <img
                src={activeAvatar}
                alt={currentTier.name}
                className="w-5 h-5 rounded-full object-cover border"
                style={{ borderColor: currentTier.themeColor }}
              />
            ) : (
              <Sparkles className="w-4 h-4" style={{ color: currentTier.themeColor }} />
            )}
            <span className="font-mono">T{currentTier.tier}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10" />

        {/* Control Buttons */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {/* Restart */}
          <button
            type="button"
            tabIndex={-1}
            onFocus={(e) => e.currentTarget.blur()}
            onClick={onReset}
            className="p-1.5 sm:p-2 rounded-xl hover:bg-white/8 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer group"
            title="Restart Lesson"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-[-180deg] transition-transform duration-500" />
          </button>

          {/* Toggle Keyboard */}
          <button
            type="button"
            tabIndex={-1}
            onFocus={(e) => e.currentTarget.blur()}
            onClick={onToggleKeyboard}
            className={`p-1.5 sm:p-2 rounded-xl transition-all duration-200 cursor-pointer ${
              showKeyboard ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-white/8 text-slate-500 hover:text-white'
            }`}
            title={showKeyboard ? "Hide Keyboard" : "Show Keyboard"}
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Toggle Hands (hidden on mobile) */}
          <button
            type="button"
            tabIndex={-1}
            onFocus={(e) => e.currentTarget.blur()}
            onClick={onToggleHands}
            className={`hidden sm:block p-1.5 sm:p-2 rounded-xl transition-all duration-200 cursor-pointer ${
              showHands ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-white/8 text-slate-500 hover:text-white'
            }`}
            title={showHands ? "Hide Hands Guide" : "Show Hands Guide"}
          >
            <Hand className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            tabIndex={-1}
            onFocus={(e) => e.currentTarget.blur()}
            onClick={onToggleSound}
            className="p-1.5 sm:p-2 rounded-xl hover:bg-white/8 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer"
            title={soundOn ? "Mute Sound" : "Enable Sound"}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          </button>

          {/* Tier Photos Toggle */}
          {onToggleTierPhotos && (
            <button
              type="button"
              tabIndex={-1}
              onFocus={(e) => e.currentTarget.blur()}
              onClick={onToggleTierPhotos}
              className={`p-1.5 sm:p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                showTierPhotos
                  ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                  : 'hover:bg-white/8 text-slate-500 hover:text-white'
              }`}
              title={showTierPhotos ? "Tier Photos: ON (Click to turn off)" : "Tier Photos: OFF (Click to turn on)"}
            >
              {showTierPhotos ? <ImageIcon className="w-4 h-4" /> : <ImageOff className="w-4 h-4 text-rose-400" />}
            </button>
          )}

          {/* Custom Photos */}
          {showTierPhotos && (
            <button
              type="button"
              tabIndex={-1}
              onFocus={(e) => e.currentTarget.blur()}
              onClick={onOpenCustomPhotos}
              className="hidden sm:block p-1.5 sm:p-2 rounded-xl hover:bg-white/8 text-slate-400 hover:text-purple-400 transition-all duration-200 cursor-pointer"
              title="Customize Tier Photos"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}

          {/* Day/Night Toggle */}
          <div className="w-px h-5 bg-white/10" />
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
