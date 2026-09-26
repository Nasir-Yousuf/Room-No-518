import React, { useState, useEffect } from 'react';
import { Sparkles, Flame } from 'lucide-react';

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
  glamourScore
}) {
  const currentIdx = userInput.length;
  const targetChars = targetText.split('');
  const activeAvatar = customAvatars[currentTier.tier] || currentTier.avatar;

  const [dialogue, setDialogue] = useState(currentTier.dialogues[0]);
  const [shaking, setShaking] = useState(false);
  const [showBgImage, setShowBgImage] = useState(true);

  // Trigger shake on error
  useEffect(() => {
    if (lastErrorTrigger > 0) {
      setShaking(true);
      const timer = setTimeout(() => setShaking(false), 450);
      return () => clearTimeout(timer);
    }
  }, [lastErrorTrigger]);

  // Update dialogue
  useEffect(() => {
    if (lastErrorTrigger > 0) {
      if (currentTier.tier <= 2) {
        const d = currentTier.dialogues[Math.floor(Math.random() * currentTier.dialogues.length)];
        setDialogue(d);
      }
    } else if (combo > 0 && combo % 10 === 0) {
      const d = currentTier.dialogues[Math.floor(Math.random() * currentTier.dialogues.length)];
      setDialogue(d);
    }
  }, [combo, lastErrorTrigger, currentTier]);

  return (
    <div className={`relative w-full min-h-[300px] sm:min-h-[340px] bg-[#fbf7dc] rounded-2xl sm:rounded-3xl border border-amber-200/60 shadow-lg overflow-hidden flex flex-col justify-between p-6 sm:p-10 select-none transition-all duration-500 ${
      shaking ? 'animate-errorShake ring-4 ring-red-500/40' : ''
    }`}>
      {/* Background Avatar Character (The tier photo right where the user looks!) */}
      {showBgImage && (
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <img
            src={activeAvatar}
            alt={currentTier.name}
            className="w-full h-full object-contain sm:object-cover opacity-25 sm:opacity-30 filter contrast-125 transition-all duration-700 transform scale-105"
          />
          {/* Soft gradient wash overlay ensuring 100% text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbf7dc]/90 via-[#fbf7dc]/60 to-[#fbf7dc]/80" />
        </div>
      )}

      {/* Hanging Left Bookmark: START TYPING (Typing Club signature) */}
      <div className="absolute -top-1 left-6 sm:left-10 z-10">
        <div className="bg-[#f0c242] text-[#594200] font-black text-[11px] sm:text-xs uppercase tracking-wider py-4 px-3 rounded-b-xl shadow-md flex flex-col items-center justify-center text-center w-14 sm:w-16 border-b-2 border-[#d4a82b]">
          <span>START</span>
          <span>TYPING</span>
        </div>
      </div>

      {/* Top Right: Hide Background Toggle & Dialogue Bubble */}
      <div className="relative z-10 w-full flex items-center justify-between pl-18 sm:pl-24 pr-2">
        {/* Glamour / Dialogue Tag */}
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-black px-3 py-1 rounded-full shadow-xs border flex items-center gap-1.5"
            style={{
              backgroundColor: `${currentTier.themeColor}20`,
              color: currentTier.themeColor,
              borderColor: `${currentTier.themeColor}50`
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {currentTier.name} ({currentTier.targetSpeed})
          </span>
          <span className="text-xs text-slate-600 font-medium italic hidden sm:inline">
            "{dialogue}"
          </span>
        </div>

        {/* Hide Background toggle */}
        <button
          onClick={() => setShowBgImage(!showBgImage)}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 cursor-pointer bg-white/70 px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs"
        >
          {showBgImage ? 'Hide Photo ×' : 'Show Photo 🖼️'}
        </button>
      </div>

      {/* Main Text Lines Display with Underline Guides (Exact Typing Club typography) */}
      <div className="relative z-10 my-auto py-6 pl-2 sm:pl-6 pr-2">
        <div className="font-serif text-2xl sm:text-4xl text-[#2d2926] leading-relaxed sm:leading-loose tracking-wide break-words">
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
                  className={`inline transition-colors font-serif ${
                    isCorrect
                      ? 'text-[#2b8a3e] font-semibold'
                      : 'text-[#e03131] bg-red-200/60 rounded-xs px-0.5 font-bold line-through'
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
                  className="relative inline text-[#1971c2] font-bold"
                >
                  {/* Typing Club active character underline / cursor */}
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#1971c2] rounded-full animate-pulse shadow-sm shadow-blue-500/50" />
                  {isSpace ? '\u00A0' : char}
                </span>
              );
            }

            // Upcoming characters
            return (
              <span
                key={index}
                className="text-[#495057] opacity-85 inline font-normal"
              >
                {isSpace ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Bottom Underline Guide & Live Speed/Combo Status */}
      <div className="relative z-10 w-full pt-3 border-t border-amber-300/50 flex items-center justify-between text-xs text-slate-600 font-sans">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-700 font-mono">
            Speed: <strong className="text-blue-700">{wpm} WPM</strong>
          </span>
          <span className="text-slate-400">|</span>
          <span className="font-bold text-slate-700 font-mono">
            Accuracy: <strong className={accuracy >= 90 ? 'text-emerald-700' : 'text-amber-700'}>{accuracy}%</strong>
          </span>
          {combo >= 5 && (
            <>
              <span className="text-slate-400">|</span>
              <span className="font-bold text-amber-700 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-bounce" />
                {combo}x Streak
              </span>
            </>
          )}
        </div>

        <div className="text-[11px] text-slate-500 hidden sm:inline">
          {wpm >= 9 ? '👑 Max Level 5 Active!' : `Reach 9-10 WPM for Level 5`}
        </div>
      </div>
    </div>
  );
}
