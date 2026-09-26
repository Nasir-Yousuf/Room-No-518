import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, RotateCcw, ArrowRight, Zap, Target, Flame, HeartCrack, Sparkles } from 'lucide-react';
import { BEAUTY_TIERS } from '../data/lessons';

export default function ResultsModal({
  isOpen,
  wpm,
  accuracy,
  glamourScore,
  peakCombo,
  totalErrors,
  elapsedTime,
  onRestart,
  onNextLesson,
  hasNextLesson,
  customAvatars = {}
}) {
  if (!isOpen) return null;

  const finalTier = BEAUTY_TIERS.find(
    (t) => glamourScore >= t.minScore && glamourScore <= t.maxScore
  ) || BEAUTY_TIERS[2];

  const activeAvatar = customAvatars[finalTier.tier] || finalTier.avatar;

  let stars = 1;
  if (accuracy >= 92 && wpm >= 35) stars = 2;
  if (accuracy >= 96 && wpm >= 50) stars = 3;

  useEffect(() => {
    if (finalTier.tier >= 4) {
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.6 }
      });
    }
  }, [finalTier.tier]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow behind modal */}
        <div
          className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-35 pointer-events-none"
          style={{ backgroundColor: finalTier.themeColor }}
        />

        {/* Stars & Title */}
        <div className="text-center mb-5">
          <div className="flex justify-center gap-1.5 mb-2">
            {[1, 2, 3].map((starNum) => (
              <Star
                key={starNum}
                className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform ${
                  starNum <= stars
                    ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-[0_0_10px_#f59e0b]'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Lesson Complete!
          </h2>
          <p className="text-sm font-bold mt-1" style={{ color: finalTier.themeColor }}>
            Final Form: {finalTier.name} ({finalTier.title})
          </p>
        </div>

        {/* Character Visual Showcase */}
        <div className="flex items-center gap-4 bg-slate-950/70 border border-white/10 rounded-2xl p-3.5 mb-5">
          <div
            className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 shadow-lg"
            style={{ borderColor: finalTier.themeColor }}
          >
            <img
              src={activeAvatar}
              alt={finalTier.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase text-white"
              style={{ backgroundColor: `${finalTier.themeColor}dd` }}
            >
              Tier {finalTier.tier}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              Glamour Score: <span style={{ color: finalTier.themeColor }}>{glamourScore}%</span>
            </div>
            <p className="text-xs sm:text-sm italic text-slate-300 leading-relaxed">
              "{finalTier.dialogues[0]}"
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2.5 mb-6">
          <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-bold mb-0.5">
              <Zap className="w-3 h-3 text-pink-400" /> WPM
            </div>
            <div className="text-lg sm:text-xl font-black text-white font-mono">{wpm}</div>
          </div>

          <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-bold mb-0.5">
              <Target className="w-3 h-3 text-emerald-400" /> Acc
            </div>
            <div className="text-lg sm:text-xl font-black text-white font-mono">{accuracy}%</div>
          </div>

          <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-bold mb-0.5">
              <Flame className="w-3 h-3 text-amber-400" /> Combo
            </div>
            <div className="text-lg sm:text-xl font-black text-white font-mono">{peakCombo}x</div>
          </div>

          <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-bold mb-0.5">
              <HeartCrack className="w-3 h-3 text-rose-400" /> Errors
            </div>
            <div className="text-lg sm:text-xl font-black text-white font-mono">{totalErrors}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 border border-white/10 transition"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>

          {hasNextLesson && (
            <button
              onClick={onNextLesson}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30 transition"
            >
              Next Lesson <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
