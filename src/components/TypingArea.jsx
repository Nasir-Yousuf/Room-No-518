import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Flame, Zap, Target, Image as ImageIcon, ImageOff, ArrowRight, RotateCcw } from 'lucide-react';

export default function TypingArea({
  targetText,
  userInput,
  wpm,
  accuracy,
  combo,
  hasStarted,
  isFinished,
  isPaused,
  currentTier,
  customAvatars = {},
  lastErrorTrigger,
  glamourScore,
  isDark = false,
  showTierPhotos = true,
  onToggleTierPhotos,
  onOpenCustomPhotos,
  onRestart,
  onNextLesson,
  hasNextLesson = true,
  onShowResults
}) {
  const currentIdx = userInput.length;
  const targetChars = targetText.split('');
  const activeAvatar = customAvatars[currentTier.tier] || currentTier.avatar;
  const textContainerRef = useRef(null);

  const [shaking, setShaking] = useState(false);
  const [showComboFlash, setShowComboFlash] = useState(false);

  // Trigger shake on error
  useEffect(() => {
    if (lastErrorTrigger > 0) {
      setShaking(true);
      const timer = setTimeout(() => setShaking(false), 500);
      return () => clearTimeout(timer);
    }
  }, [lastErrorTrigger]);

  // Combo milestone flash
  useEffect(() => {
    if (combo > 0 && combo % 10 === 0) {
      setShowComboFlash(true);
      const timer = setTimeout(() => setShowComboFlash(false), 800);
      return () => clearTimeout(timer);
    }
  }, [combo]);

  // Auto-scroll text into view
  useEffect(() => {
    if (textContainerRef.current) {
      const activeChar = textContainerRef.current.querySelector('[data-active="true"]');
      if (activeChar) {
        activeChar.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }
  }, [currentIdx]);

  // Progress percentage
  const progressPercent = targetText.length > 0 ? Math.round((currentIdx / targetText.length) * 100) : 0;

  return (
    <div
      className={`relative w-full min-h-[300px] sm:min-h-[350px] rounded-2xl sm:rounded-3xl border overflow-hidden flex flex-col justify-between select-none transition-all duration-500 ${
        shaking ? 'animate-errorShake ring-2 ring-red-500/50' : ''
      }`}
      style={{
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : '#fbf7dc',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(217, 191, 113, 0.55)',
        boxShadow: isDark
          ? '0 12px 40px rgba(0, 0, 0, 0.45)'
          : '0 10px 30px rgba(180, 150, 70, 0.15), 0 2px 8px rgba(180, 150, 70, 0.08)'
      }}
    >
      {/* Dynamic background glow based on tier */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 opacity-25"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${currentTier.themeColor}20 0%, transparent 60%)`
        }}
      />

      {/* Zoomed Full-Space Background Tier Photo with Rich Ambient Color Wash */}
      {showTierPhotos && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Base background color */}
          <div
            className="absolute inset-0 transition-colors duration-500"
            style={{
              backgroundColor: isDark ? '#080e1e' : '#fbf7dc'
            }}
          />

          {/* Tier theme color subtle glow */}
          <div
            className="absolute inset-0 transition-colors duration-700 pointer-events-none"
            style={{
              backgroundColor: currentTier.themeColor,
              opacity: isDark ? 0.16 : 0.12
            }}
          />

          {/* Full-space Zoomed Character Photo */}
          <img
            src={activeAvatar}
            alt={currentTier.name}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform scale-110 sm:scale-125 filter contrast-110 saturate-125"
            style={{
              opacity: isDark ? 0.45 : 0.52
            }}
          />

          {/* Rich Background Color Wash over photo */}
          <div
            className="absolute inset-0 transition-colors duration-500"
            style={{
              background: isDark
                ? 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.58) 50%, rgba(15, 23, 42, 0.88) 100%)'
                : 'linear-gradient(to top, rgba(251, 247, 220, 0.92) 0%, rgba(251, 247, 220, 0.55) 50%, rgba(251, 247, 220, 0.88) 100%)'
            }}
          />

          {/* Soft vignette radial focus */}
          <div
            className="absolute inset-0 transition-colors duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, transparent 40%, ${isDark ? 'rgba(8, 14, 30, 0.55)' : 'rgba(251, 247, 220, 0.55)'} 100%)`
            }}
          />
        </div>
      )}

      {/* Combo flash overlay */}
      {showComboFlash && (
        <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none z-0 animate-fadeIn" />
      )}

      {/* Top Bar: Photo Toggle & Progress */}
      <div className="relative z-10 px-4 sm:px-8 pt-4 sm:pt-5 flex items-center justify-end gap-2.5">

        {/* Right side: Photo Toggle & Progress */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Background Tier Photo Toggle Button */}
          {onToggleTierPhotos && (
            <button
              type="button"
              tabIndex={-1}
              onFocus={(e) => e.currentTarget.blur()}
              onClick={onToggleTierPhotos}
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs border ${
                showTierPhotos
                  ? 'bg-purple-500/15 border-purple-500/35 text-purple-600 dark:text-purple-300 hover:bg-purple-500/25'
                  : 'glass-light border-slate-300/60 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title={showTierPhotos ? "Tier Photos are ON. Click to turn off." : "Tier Photos are OFF. Click to turn on."}
            >
              {showTierPhotos ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                  <span className="hidden md:inline">Photos: <strong className="text-emerald-600 dark:text-emerald-400">ON</strong></span>
                </>
              ) : (
                <>
                  <ImageOff className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                  <span className="hidden md:inline">Photos: <strong className="text-rose-500 dark:text-rose-400">OFF</strong></span>
                </>
              )}
            </button>
          )}

          {/* Progress indicator */}
          {hasStarted && (
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">{progressPercent}%</span>
              <div className="w-16 sm:w-24 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── "Start Typing" Prompt ─── */}
      {!hasStarted && !isFinished && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-3 animate-breathe">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center shadow-lg shadow-indigo-500/10">
              <Zap className="w-7 h-7 text-indigo-400" />
            </div>
            <span className="text-sm font-bold text-slate-400">Start Typing</span>
            <span className="text-xs text-slate-600">Press any key to begin...</span>
          </div>
        </div>
      )}

      {/* ─── "Lesson Complete" Actions Overlay ─── */}
      {isFinished && (
        <div className="absolute inset-0 flex items-center justify-center z-25 bg-black/40 backdrop-blur-xs animate-fadeIn p-4">
          <div className="flex flex-col items-center gap-3 p-5 sm:p-6 glass-strong rounded-3xl border border-white/20 shadow-2xl max-w-sm w-full text-center animate-scale-in">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
              🎉
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black" style={{ color: 'var(--text-heading)' }}>
                Lesson Complete!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Speed: <strong className="text-amber-500 dark:text-amber-300 font-mono">{wpm} WPM</strong> • Accuracy: <strong className="text-emerald-500 dark:text-emerald-300 font-mono">{accuracy}%</strong>
              </p>
            </div>

            <div className="flex flex-col w-full gap-2 mt-1">
              {hasNextLesson && onNextLesson && (
                <button
                  onClick={onNextLesson}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-indigo-500/25 transition cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <div className="flex items-center gap-2 w-full">
                {onRestart && (
                  <button
                    onClick={onRestart}
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                )}

                {onShowResults && (
                  <button
                    onClick={onShowResults}
                    className="flex-1 py-2 px-3 glass-light hover:bg-white/10 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Results</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Main Text Display ─── */}
      <div ref={textContainerRef} className={`relative z-10 flex-1 flex items-center px-5 sm:px-10 py-5 sm:py-8 transition-opacity duration-300 ${!hasStarted ? 'opacity-70' : 'opacity-100'}`}>
        <div className="font-['Gabriela',_'Kurale',_Georgia,_serif] text-2xl sm:text-3xl md:text-[34px] leading-[2.2] sm:leading-[2.4] tracking-wide break-words w-full select-none">
          {targetChars.map((char, index) => {
            const isCurrent = index === currentIdx;
            const isTyped = index < currentIdx;
            const isSpace = char === ' ';

            if (isTyped) {
              const typedChar = userInput[index];
              const isCorrect = typedChar === char;

              return (
                <span
                  key={index}
                  className={`inline transition-all duration-100 ${
                    isCorrect
                      ? isSpace
                        ? 'bg-white/70 dark:bg-white/10 px-[1.5px] rounded-xs'
                        : 'bg-white/85 dark:bg-white/15 text-[#24201A] dark:text-slate-100 rounded-xs px-[1px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]'
                      : isSpace
                      ? 'bg-rose-200/80 dark:bg-rose-900/60 rounded-xs px-[1.5px]'
                      : 'bg-rose-200/90 dark:bg-rose-900/70 text-rose-800 dark:text-rose-200 font-bold rounded-xs px-[1px] shadow-[0_1px_1px_rgba(225,29,72,0.15)]'
                  }`}
                >
                  {isSpace ? '\u00A0' : char}
                </span>
              );
            }

            if (isCurrent) {
              return (
                <span
                  key={index}
                  data-active="true"
                  className={`relative inline font-medium rounded-xs transition-all ${
                    isSpace
                      ? 'bg-[#FDE047]/80 dark:bg-amber-400/80 px-[3px]'
                      : 'bg-[#FDE047] dark:bg-amber-400 text-slate-950 px-[1.5px]'
                  }`}
                  style={{
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {isSpace ? '\u00A0' : char}
                  {/* Authentic TypingClub bright blue underline cursor */}
                  <span
                    className="absolute -bottom-[3.5px] left-0 right-0 h-[3.5px] bg-[#2563EB] dark:bg-[#38BDF8] rounded-full shadow-[0_1px_3px_rgba(37,99,235,0.4)]"
                  />
                </span>
              );
            }

            // Upcoming characters
            return (
              <span
                key={index}
                className="inline transition-colors text-[#2C2720] dark:text-slate-200/85 px-[0.5px]"
              >
                {isSpace ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      </div>

      {/* ─── Bottom Status Bar ─── */}
      <div className={`relative z-10 w-full px-4 sm:px-8 py-3 border-t flex items-center justify-between text-xs ${
        isDark ? 'border-white/[0.06]' : 'border-amber-200/60'
      }`}>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono font-bold">
            <Zap className="w-3 h-3 text-amber-500 dark:text-amber-400" />
            <strong className="text-amber-600 dark:text-amber-300">{wpm}</strong>
            <span className="text-slate-500 dark:text-slate-600 text-[10px]">WPM</span>
          </span>

          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono font-bold">
            <Target className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            <strong className={accuracy >= 90 ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-300'}>{accuracy}%</strong>
          </span>

          {combo >= 5 && (
            <span className="flex items-center gap-1 font-bold text-orange-400 animate-scale-in">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
              <span className="font-mono">{combo}x</span>
              <span className="text-[10px] text-orange-300/80">Streak</span>
            </span>
          )}
        </div>

        <div className="text-[10px] text-slate-600 font-medium hidden sm:flex items-center gap-1.5">
          {isFinished ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Complete!
            </span>
          ) : (
            <span>{currentIdx} / {targetText.length} characters</span>
          )}
        </div>
      </div>
    </div>
  );
}
