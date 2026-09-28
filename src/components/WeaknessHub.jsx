import React, { useState, useMemo, useEffect } from 'react';
import {
  Zap,
  Target,
  Flame,
  RotateCw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';
import {
  loadWeaknessProfile,
  getFingerSpeedReport,
  getWeakestFingers,
  getSlowestLetters,
  getChallengingWords,
  generateWeaknessWorkout,
  FINGER_META
} from '../utils/weaknessAnalyzer';

export default function WeaknessHub({
  onStartWorkout,
  isDark = false
}) {
  const [profile, setProfile] = useState(() => loadWeaknessProfile());
  const [workoutMode, setWorkoutMode] = useState('adaptive'); // 'adaptive' | 'pinky' | 'ring' | 'tricky' | 'speed'
  const [workoutLength, setWorkoutLength] = useState('medium'); // 'short' | 'medium' | 'long'
  const [selectedFinger, setSelectedFinger] = useState(null);

  // Reload profile when mounting
  useEffect(() => {
    setProfile(loadWeaknessProfile());
  }, []);

  const fingerReport = useMemo(() => getFingerSpeedReport(profile), [profile]);
  const weakestFingers = useMemo(() => getWeakestFingers(profile, 3), [profile]);
  const slowestLetters = useMemo(() => getSlowestLetters(profile, 6), [profile]);
  const trickyWords = useMemo(() => getChallengingWords(profile, 8), [profile]);

  // Preview generated workout
  const [previewWorkout, setPreviewWorkout] = useState(() => {
    return generateWeaknessWorkout({
      profile,
      length: 'medium',
      mode: 'adaptive'
    });
  });

  const handleGenerateNew = () => {
    const fresh = generateWeaknessWorkout({
      profile,
      length: workoutLength,
      mode: workoutMode,
      focusFinger: selectedFinger
    });
    setPreviewWorkout(fresh);
  };

  const handleModeChange = (mode) => {
    setWorkoutMode(mode);
    setSelectedFinger(null);
    const fresh = generateWeaknessWorkout({
      profile,
      length: workoutLength,
      mode,
      focusFinger: null
    });
    setPreviewWorkout(fresh);
  };

  const handleLengthChange = (len) => {
    setWorkoutLength(len);
    const fresh = generateWeaknessWorkout({
      profile,
      length: len,
      mode: workoutMode,
      focusFinger: selectedFinger
    });
    setPreviewWorkout(fresh);
  };

  const handleFingerClick = (fingerName) => {
    const next = selectedFinger === fingerName ? null : fingerName;
    setSelectedFinger(next);
    const fresh = generateWeaknessWorkout({
      profile,
      length: workoutLength,
      mode: workoutMode,
      focusFinger: next
    });
    setPreviewWorkout(fresh);
  };

  const handleLaunch = () => {
    if (onStartWorkout) {
      onStartWorkout(previewWorkout);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 animate-fadeIn">
      {/* ─── Hero Banner ─── */}
      <div className="relative rounded-3xl overflow-hidden glass-strong border border-amber-500/20 p-5 sm:p-8 mb-6 shadow-xl shadow-amber-500/5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" />
                Adaptive AI Weakness Engine
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Real Words • Paragraph Drills
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight" style={{ color: 'var(--text-heading)' }}>
              Weak Finger & Tricky Word Mastery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1.5 font-medium leading-relaxed">
              Analyzes your keystroke latencies to detect which fingers pause and which letters take time.
              Generates <strong className="text-amber-600 dark:text-amber-400 font-bold">natural sentences of new, real words</strong> tailored to conquer your exact challenges.
            </p>
          </div>

          <button
            onClick={handleLaunch}
            className="w-full md:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer group flex-shrink-0"
          >
            <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            <span>Start Adaptive Workout</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ─── 10-Finger Speed Analysis Bar ─── */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 mb-6 border border-slate-300/40 dark:border-white/10 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-black flex items-center gap-2" style={{ color: 'var(--text-heading)' }}>
              <span>🖐️</span>
              <span>10-Finger Latency & Speed Monitor</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any finger card to instantly build a custom workout targeted at that finger.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> &lt;220ms (Fast)
            </span>
            <span className="flex items-center gap-1.5 text-amber-500 dark:text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> 220-280ms
            </span>
            <span className="flex items-center gap-1.5 text-rose-500 dark:text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> &gt;280ms (Weak)
            </span>
          </div>
        </div>

        {/* Fingers Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {fingerReport.map((f) => {
            const isSelected = selectedFinger === f.fingerName;
            return (
              <button
                key={f.fingerName}
                onClick={() => handleFingerClick(f.fingerName)}
                className={`relative flex flex-col items-center justify-between p-2.5 rounded-2xl border transition-all text-center cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-amber-500 scale-105 shadow-lg'
                    : 'hover:scale-[1.02]'
                } ${f.bgBadge}`}
                style={{ borderColor: isSelected ? '#f59e0b' : `${f.color}40` }}
              >
                {/* Finger top dot */}
                <div
                  className="w-2.5 h-2.5 rounded-full mb-1 shadow-sm"
                  style={{ backgroundColor: f.color }}
                />

                <span className="text-[11px] font-black tracking-tight line-clamp-1" style={{ color: 'var(--text-heading)' }}>
                  {f.shortName}
                </span>

                {/* Avg Ms Latency */}
                <div className="my-1.5 font-mono font-black text-sm sm:text-base leading-none" style={{ color: 'var(--text-heading)' }}>
                  {f.avgMs}
                  <span className="text-[9px] font-sans font-normal opacity-70 ml-0.5">ms</span>
                </div>

                {/* Status pill */}
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${f.statusColor} bg-black/5 dark:bg-white/5`}>
                  {f.status === 'slow' ? 'Weak' : f.status === 'moderate' ? 'Average' : 'Fast'}
                </span>

                {/* Keys preview */}
                <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 mt-1 opacity-70">
                  {f.keys.slice(0, 3).join('')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Middle Section: Weakness Insights & Quick Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Card 1: Weakest Fingers */}
        <div className="glass-card rounded-2xl p-4 border border-rose-500/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Slowest Fingers
            </h4>
          </div>
          <div className="space-y-2 mt-2">
            {weakestFingers.map((wf, idx) => (
              <div key={wf.fingerName} className="flex items-center justify-between text-xs p-2 rounded-xl bg-black/5 dark:bg-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white" style={{ backgroundColor: wf.color }}>
                    #{idx + 1}
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{wf.fingerName}</span>
                </div>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{wf.avgMs} ms avg</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Slowest Letters */}
        <div className="glass-card rounded-2xl p-4 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Letters Taking Time
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {slowestLetters.map((l) => (
              <div
                key={l.char}
                className="px-2.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-amber-500/20 flex items-center gap-1.5"
              >
                <span className="font-mono font-black text-sm text-amber-600 dark:text-amber-300 uppercase">
                  {l.char}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold">
                  {l.avgMs}ms
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Tricky Words */}
        <div className="glass-card rounded-2xl p-4 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-500" />
            <h4 className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Tricky Words Identified
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {trickyWords.map((w) => (
              <span
                key={w}
                className="px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 font-mono text-xs font-bold"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Workout Generator & Paragraph Preview ─── */}
      <div className="glass-card rounded-3xl p-5 sm:p-7 border border-slate-300/40 dark:border-white/10 shadow-xl">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-black/5 dark:border-white/10">
          {/* Mode Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">Focus:</span>
            {[
              { id: 'adaptive', label: '🧠 AI Adaptive' },
              { id: 'pinky', label: '🔥 Pinky Power' },
              { id: 'ring', label: '⚡ Ring Fingers' },
              { id: 'tricky', label: '🎯 Tricky Words' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => handleModeChange(m.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  workoutMode === m.id
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'glass-light hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Length & Refresh */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 rounded-xl glass-light text-xs font-bold">
              {[
                { id: 'short', label: 'Short' },
                { id: 'medium', label: 'Medium' },
                { id: 'long', label: 'Full' }
              ].map((len) => (
                <button
                  key={len.id}
                  onClick={() => handleLengthChange(len.id)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    workoutLength === len.id
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {len.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerateNew}
              className="px-3 py-1.5 glass-light hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="Generate a fresh new paragraph"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Refresh Paragraph</span>
            </button>
          </div>
        </div>

        {/* Workout Details & Paragraph Preview */}
        <div className="pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-black text-slate-900 dark:text-white">
                {previewWorkout.title}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30">
                {previewWorkout.wordCount} Words
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold border border-purple-500/30">
                Theme: {previewWorkout.topic}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Targeting Fingers:</span>
              <span className="font-black text-rose-600 dark:text-rose-400">
                {previewWorkout.targetFingers.join(', ')}
              </span>
            </div>
          </div>

          {/* Target Words Badges ("based on the weakness of our word it will give new words not new letter please") */}
          <div className="mb-4 p-3 rounded-2xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/20">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Target Words In This Paragraph ({previewWorkout.targetWords.length}):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {previewWorkout.targetWords.map((tw) => (
                <span
                  key={tw}
                  className="px-2.5 py-1 rounded-lg bg-white/80 dark:bg-white/10 text-slate-800 dark:text-amber-200 border border-amber-500/30 font-mono text-xs font-bold shadow-xs"
                >
                  {tw}
                </span>
              ))}
            </div>
          </div>

          {/* Paragraph Box */}
          <div className="p-5 sm:p-6 rounded-2xl glass-strong border border-slate-300/40 dark:border-white/10 mb-5 relative group">
            <p className="font-['Gabriela',_'Kurale',_Georgia,_serif] text-base sm:text-xl md:text-2xl leading-relaxed sm:leading-loose text-slate-800 dark:text-slate-100 select-none">
              {previewWorkout.text}
            </p>
          </div>

          {/* Launch Action */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              💡 Tip: While typing in Weakness Mode, press <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono font-bold text-slate-700 dark:text-slate-200">Tab</kbd> anytime to instantly generate a new paragraph!
            </p>

            <button
              onClick={handleLaunch}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-rose-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Type This Paragraph Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
