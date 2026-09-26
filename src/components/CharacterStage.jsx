import React, { useState, useEffect } from 'react';
import { Sparkles, AlertTriangle, Crown, Flame, Heart } from 'lucide-react';
import { BEAUTY_TIERS } from '../data/lessons';

export default function CharacterStage({
  glamourScore,
  wpm,
  accuracy,
  combo,
  lastErrorTrigger,
  customAvatars = {}
}) {
  const currentTier = BEAUTY_TIERS.find(
    (t) => glamourScore >= t.minScore && glamourScore <= t.maxScore
  ) || BEAUTY_TIERS[2];

  const activeAvatar = customAvatars[currentTier.tier] || currentTier.avatar;

  const [dialogue, setDialogue] = useState(currentTier.dialogues[0]);
  const [shaking, setShaking] = useState(false);
  const [auraGlow, setAuraGlow] = useState(false);

  useEffect(() => {
    if (lastErrorTrigger > 0) {
      setShaking(true);
      const timer = setTimeout(() => setShaking(false), 450);
      return () => clearTimeout(timer);
    }
  }, [lastErrorTrigger]);

  useEffect(() => {
    if (lastErrorTrigger > 0) {
      if (currentTier.tier <= 2) {
        const d = currentTier.dialogues[Math.floor(Math.random() * currentTier.dialogues.length)];
        setDialogue(d);
      }
    } else if (combo > 0 && combo % 15 === 0) {
      setAuraGlow(true);
      setTimeout(() => setAuraGlow(false), 1200);
      const d = currentTier.dialogues[Math.floor(Math.random() * currentTier.dialogues.length)];
      setDialogue(d);
    }
  }, [combo, lastErrorTrigger, currentTier]);

  useEffect(() => {
    const interval = setInterval(() => {
      const d = currentTier.dialogues[Math.floor(Math.random() * currentTier.dialogues.length)];
      setDialogue(d);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentTier]);

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 border backdrop-blur-xl shadow-2xl transition-all duration-500 overflow-hidden ${
        currentTier.tier === 5
          ? 'border-purple-500/60 bg-gradient-to-b from-purple-950/40 via-fuchsia-950/20 to-slate-950/90 shadow-purple-500/25'
          : currentTier.tier === 4
          ? 'border-pink-500/50 bg-gradient-to-b from-pink-950/40 via-fuchsia-950/20 to-slate-950/90 shadow-pink-500/20'
          : currentTier.tier === 3
          ? 'border-blue-500/40 bg-gradient-to-b from-blue-950/30 via-slate-900/40 to-slate-950/90 shadow-blue-500/15'
          : currentTier.tier === 2
          ? 'border-amber-500/50 bg-gradient-to-b from-amber-950/40 via-orange-950/20 to-slate-950/90 shadow-amber-500/20'
          : 'border-red-600/70 bg-gradient-to-b from-red-950/60 via-stone-950/40 to-slate-950/90 shadow-red-600/30'
      }`}
    >
      {/* Background Ambience Glow */}
      <div
        className="absolute -top-16 -left-16 w-44 h-44 rounded-full blur-3xl opacity-40 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentTier.themeColor }}
      />
      <div
        className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentTier.themeColor }}
      />

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <div>
          <h3 className="font-extrabold text-base flex items-center gap-1.5" style={{ color: currentTier.themeColor }}>
            {currentTier.tier === 5 && <Crown className="w-5 h-5 text-amber-300 animate-bounce" />}
            {currentTier.tier === 4 && <Sparkles className="w-5 h-5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />}
            {currentTier.tier === 3 && <Heart className="w-5 h-5 text-blue-400" />}
            {currentTier.tier === 2 && <AlertTriangle className="w-5 h-5 text-amber-400 animate-pulse" />}
            {currentTier.tier === 1 && <span className="text-xl">💀</span>}
            {currentTier.name}
          </h3>
          <p className="text-xs text-slate-400 font-medium">{currentTier.title}</p>
        </div>

        <div
          className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-white/10"
          style={{
            backgroundColor: `${currentTier.themeColor}22`,
            color: currentTier.themeColor
          }}
        >
          Tier {currentTier.tier}/5
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="relative z-10 mb-3">
        <div className="relative bg-slate-950/80 border border-white/15 rounded-2xl p-3 text-xs sm:text-sm text-slate-200 shadow-lg min-h-[50px] flex items-center justify-center text-center font-medium leading-relaxed">
          <span>"{dialogue}"</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-950/80" />
        </div>
      </div>

      {/* Dynamic Avatar Container */}
      <div className="relative z-10 my-2 mx-auto w-full max-w-[280px] aspect-square">
        <div
          className={`w-full h-full rounded-2xl overflow-hidden border-2 shadow-2xl transition-all duration-300 relative bg-slate-950 ${
            shaking ? 'animate-errorShake border-red-500 ring-4 ring-red-500/50' : 'border-white/20'
          } ${auraGlow ? 'scale-105 ring-4 ring-pink-400' : ''}`}
        >
          <img
            src={activeAvatar}
            alt={currentTier.name}
            className="w-full h-full object-cover transition-transform duration-500"
          />

          {/* Special Tier Overlays */}
          {currentTier.tier === 5 && (
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-pink-500/20 pointer-events-none flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-yellow-300/80 animate-ping absolute" />
            </div>
          )}

          {currentTier.tier === 1 && (
            <div className="absolute inset-0 bg-red-950/20 pointer-events-none flex items-center justify-center">
              <span className="text-3xl absolute top-2 right-2 animate-spin">🌀</span>
            </div>
          )}

          {/* Live Combo Badge Floating on Avatar */}
          {combo >= 10 && (
            <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 backdrop-blur-md border border-amber-400/50 rounded-xl px-2.5 py-1 flex items-center justify-between text-xs font-bold text-amber-300 shadow-xl">
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                {combo}x STREAK
              </span>
              <span className="text-[10px] text-amber-200 font-mono tracking-wider">
                {combo >= 30 ? 'DIVINE' : combo >= 20 ? 'ON FIRE' : 'HEATING UP'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Glamour & Beauty Gauge Meter */}
      <div className="relative z-10 mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Glamour / Beauty Meter
          </span>
          <span className="font-mono text-sm" style={{ color: currentTier.themeColor }}>
            {glamourScore}%
          </span>
        </div>

        {/* Track */}
        <div className="w-full h-3.5 bg-slate-950/90 rounded-full p-0.5 border border-white/10 overflow-hidden relative shadow-inner">
          <div
            className="h-full rounded-full transition-all duration-300 relative overflow-hidden"
            style={{
              width: `${Math.max(6, glamourScore)}%`,
              backgroundColor: currentTier.themeColor,
              boxShadow: `0 0 12px ${currentTier.themeColor}`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Telemetry info */}
        <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2 font-medium">
          <span>Speed: <strong className="text-white">{wpm} WPM</strong></span>
          <span>Tier Range: <strong className="text-emerald-300">{currentTier.targetSpeed}</strong></span>
          <span>Max Level: <strong className="text-pink-400">10 WPM 👑</strong></span>
        </div>
      </div>
    </div>
  );
}
