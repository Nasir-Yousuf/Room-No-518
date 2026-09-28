import React from 'react';
import { RotateCw, Brain, Sparkles, Zap, Target } from 'lucide-react';
import { FINGER_META } from '../utils/weaknessAnalyzer';

export default function WeaknessWorkoutBar({
  currentWorkout,
  onGenerateNewParagraph,
  onOpenHub,
  workoutLength = 'medium',
  onChangeLength
}) {
  if (!currentWorkout) return null;

  return (
    <div className="w-full glass-card rounded-2xl p-2.5 sm:p-3 mb-2 border border-amber-500/20 shadow-md flex flex-wrap items-center justify-between gap-2.5 z-20 animate-fadeIn">
      {/* Left: Target Fingers & Info */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onOpenHub}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Open Weakness Analysis Dashboard"
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Weakness Hub</span>
        </button>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Targeting:</span>
          {currentWorkout.targetFingers?.map((fName) => {
            const meta = FINGER_META[fName];
            return (
              <span
                key={fName}
                className="px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 border"
                style={{
                  backgroundColor: `${meta?.color || '#f59e0b'}15`,
                  borderColor: `${meta?.color || '#f59e0b'}35`,
                  color: meta?.color || '#f59e0b'
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta?.color || '#f59e0b' }} />
                <span>{fName}</span>
              </span>
            );
          })}
        </div>

        {/* Target Words Pill */}
        {currentWorkout.targetWords && currentWorkout.targetWords.length > 0 && (
          <div className="hidden md:flex items-center gap-1 text-xs">
            <span className="text-slate-400 font-semibold">• Words:</span>
            <div className="flex items-center gap-1 flex-wrap max-w-sm overflow-hidden">
              {currentWorkout.targetWords.slice(0, 5).map((w) => (
                <span
                  key={w}
                  className="px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/5 font-mono text-[11px] font-bold text-slate-700 dark:text-amber-200"
                >
                  {w}
                </span>
              ))}
              {currentWorkout.targetWords.length > 5 && (
                <span className="text-[10px] text-slate-400">+{currentWorkout.targetWords.length - 5} more</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right: Length selector & New Paragraph button */}
      <div className="flex items-center gap-2">
        {/* Length selector */}
        {onChangeLength && (
          <div className="flex items-center p-0.5 rounded-xl glass-light text-xs font-bold">
            {[
              { id: 'short', label: 'Short' },
              { id: 'medium', label: 'Med' },
              { id: 'long', label: 'Full' }
            ].map((len) => (
              <button
                key={len.id}
                onClick={() => onChangeLength(len.id)}
                className={`px-2 py-0.5 rounded-lg text-xs transition-all cursor-pointer ${
                  workoutLength === len.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {len.label}
              </button>
            ))}
          </div>
        )}

        {/* Generate New Paragraph CTA */}
        <button
          onClick={onGenerateNewParagraph}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-md shadow-rose-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          title="Generate a brand new paragraph targeting your weak fingers (Shortcut: Tab)"
        >
          <RotateCw className="w-3 h-3" />
          <span>New Paragraph</span>
          <span className="text-[10px] px-1 py-0.2 rounded bg-white/20 font-mono font-normal hidden sm:inline">Tab</span>
        </button>
      </div>
    </div>
  );
}
