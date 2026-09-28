import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Sparkles, Flame, Zap, Target, Image as ImageIcon, ImageOff, ArrowRight, RotateCcw, Smartphone } from 'lucide-react';

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
  onShowResults,
  onTypeChar,
  onBackspace,
  onTab,
  language = 'en',
  currentLesson = null
}) {
  const currentIdx = userInput.length;
  const activeAvatar = customAvatars[currentTier.tier] || currentTier.avatar;
  const textContainerRef = useRef(null);

  const progressPercent = useMemo(() => {
    return Math.min(100, Math.round((currentIdx / Math.max(1, targetText.length)) * 100));
  }, [currentIdx, targetText.length]);

  // For Bangla Avro phonetic mode: create word blocks with Bangla word and letter-by-letter phonetic characters
  const banglaWordBlocks = useMemo(() => {
    if (language !== 'bn') return [];

    const sourceWords = (currentLesson?.words && currentLesson.words.length > 0)
      ? currentLesson.words
      : targetText.split(' ').map((w) => ({ bangla: w, avro: w }));

    let charCursor = 0;
    return sourceWords.map((w, wIdx) => {
      const phonetic = w.avro || '';
      const letters = [];
      for (let i = 0; i < phonetic.length; i++) {
        letters.push({
          char: phonetic[i],
          index: charCursor++
        });
      }

      let hasTrailingSpace = false;
      let spaceIndex = null;
      if (charCursor < targetText.length && targetText[charCursor] === ' ') {
        hasTrailingSpace = true;
        spaceIndex = charCursor;
        charCursor++;
      }

      return {
        wordIndex: wIdx,
        bangla: w.bangla || '',
        phonetic,
        letters,
        hasTrailingSpace,
        spaceIndex
      };
    });
  }, [language, currentLesson, targetText]);

  // Group characters into whole words so words NEVER split across lines
  const words = useMemo(() => {
    const list = [];
    let currentWord = [];

    for (let i = 0; i < targetText.length; i++) {
      const char = targetText[i];
      currentWord.push({ char, index: i });

      // End of word when hitting space or end of drill text
      if (char === ' ' || i === targetText.length - 1) {
        list.push(currentWord);
        currentWord = [];
      }
    }

    return list;
  }, [targetText]);

  const [shaking, setShaking] = useState(false);
  const [showComboFlash, setShowComboFlash] = useState(false);

  // Mobile keyboard input handling
  const hiddenInputRef = useRef(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [dummyVal, setDummyVal] = useState(' ');
  const lastBackspaceRef = useRef(0);

  // Auto-focus hidden input on mount for immediate typing readiness
  useEffect(() => {
    const timer = setTimeout(() => {
      hiddenInputRef.current?.focus();
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const triggerBackspace = () => {
    const now = Date.now();
    if (now - lastBackspaceRef.current < 60) return;
    lastBackspaceRef.current = now;
    if (onBackspace) onBackspace();
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      triggerBackspace();
      setDummyVal(' ');
    } else if (val.length > 1) {
      const added = val.slice(1);
      if (onTypeChar) {
        for (const ch of added) {
          onTypeChar(ch);
        }
      }
      setDummyVal(' ');
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Backspace') {
      triggerBackspace();
    } else if (e.key === 'Tab') {
      if (onTab) {
        e.preventDefault();
        onTab();
      }
    }
  };

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

  return (
    <div
      onClick={() => hiddenInputRef.current?.focus()}
      className={`relative w-full min-h-[250px] sm:min-h-[320px] md:min-h-[350px] rounded-2xl sm:rounded-3xl border overflow-hidden flex flex-col justify-between select-none transition-all duration-500 cursor-text ${
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
      {/* Hidden Mobile Typing Input (Captures software keyboard on iOS & Android) */}
      <input
        ref={hiddenInputRef}
        type="text"
        value={dummyVal}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        inputMode="text"
        aria-label="Mobile typing input"
        className="opacity-0 absolute -top-96 left-0 w-1 h-1 pointer-events-none"
      />

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
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform scale-105 sm:scale-125 filter contrast-110 saturate-125"
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

      {/* Top Bar: Mobile Keyboard Status & Photo Toggle & Progress */}
      <div className="relative z-10 px-3 sm:px-8 pt-3 sm:pt-5 flex items-center justify-between gap-2">
        {/* Left: Mobile phone keyboard prompt & Avro mode indicator */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              hiddenInputRef.current?.focus();
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border cursor-pointer active:scale-95 ${
              isInputFocused
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                : 'bg-indigo-600 border-indigo-500 text-white shadow-indigo-500/30 animate-pulse'
            }`}
            title="Tap to Open Phone Keyboard"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px] sm:text-xs">
              {isInputFocused ? 'Keyboard Active' : 'Tap to Type'}
            </span>
          </button>

          {language === 'bn' && (
            <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
              <span className="text-xs">🇧🇩</span>
              <span className="font-mono">অভ্র</span>
              <span className="hidden sm:inline text-[10px] opacity-75 font-normal ml-0.5">En ➔ বাংলা</span>
            </div>
          )}
        </div>

        {/* Right side: Photo Toggle & Progress */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
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
          <div className="flex flex-col items-center gap-3 animate-breathe text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center shadow-lg shadow-indigo-500/10">
              <Zap className="w-7 h-7 text-indigo-400" />
            </div>
            <span className="text-sm font-bold text-slate-500 dark:text-slate-300">
              {language === 'bn' ? 'টাইপ শুরু করুন (Start Typing)' : 'Start Typing'}
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {language === 'bn' ? 'ইংরেজি বর্ণে ফোনেটিক টাইপ করুন (যেমন: ami ➔ আমি)' : 'Press any key to begin...'}
            </span>
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
      <div ref={textContainerRef} className={`relative z-10 flex-1 flex items-center px-3.5 sm:px-10 py-4 sm:py-8 transition-opacity duration-300 ${!hasStarted ? 'opacity-70' : 'opacity-100'}`}>
        {language === 'bn' ? (
          <div className="w-full flex flex-wrap items-end gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6 select-none font-['Inria_Sans',_sans-serif]">
            {banglaWordBlocks.map((block) => {
              const { wordIndex, bangla, letters, hasTrailingSpace, spaceIndex } = block;

              // Check if all letters of this word are typed and correct
              const isWordCompleted = letters.length > 0 && letters.every((l) => {
                if (l.index >= currentIdx) return false;
                const typedChar = userInput[l.index];
                return typedChar === l.char || (typedChar && typedChar.toLowerCase() === l.char.toLowerCase());
              });

              const isWordActive = letters.length > 0 && currentIdx >= letters[0].index && currentIdx <= (spaceIndex ?? letters[letters.length - 1].index);

              return (
                <span
                  key={wordIndex}
                  className={`inline-flex items-end whitespace-nowrap transition-all duration-200 ${
                    isWordActive ? 'scale-[1.02]' : ''
                  }`}
                >
                  {/* Word card: Bangla script on top, phonetic letters below */}
                  <span
                    className={`inline-flex flex-col items-center px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition-all duration-200 ${
                      isWordCompleted
                        ? 'bg-emerald-500/10 dark:bg-emerald-950/25 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 shadow-xs'
                        : isWordActive
                        ? 'bg-amber-500/10 dark:bg-amber-400/10 border-amber-400/50 shadow-sm'
                        : 'bg-black/[0.02] dark:bg-white/[0.02] border-transparent'
                    }`}
                  >
                    {/* Top: Bangla Word */}
                    <span
                      className={`font-['Hind_Siliguri',_sans-serif] text-2xl sm:text-3xl md:text-[34px] leading-tight font-extrabold transition-colors duration-200 ${
                        isWordCompleted
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : isWordActive
                          ? 'text-slate-900 dark:text-white drop-shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 opacity-75'
                      }`}
                    >
                      {bangla}
                      {isWordCompleted && (
                        <span className="ml-1 text-xs text-emerald-600 dark:text-emerald-400">✓</span>
                      )}
                    </span>

                    {/* Bottom: Individual Phonetic Letters */}
                    <span className="flex items-center gap-0.5 mt-1 sm:mt-1.5 font-mono text-base sm:text-lg md:text-xl font-bold tracking-wider">
                      {letters.map(({ char, index }) => {
                        const isCurrent = index === currentIdx;
                        const isTyped = index < currentIdx;

                        if (isTyped) {
                          const typedChar = userInput[index];
                          const isCorrect = typedChar === char || (typedChar && typedChar.toLowerCase() === char.toLowerCase());

                          return (
                            <span
                              key={index}
                              className={`relative inline-block transition-colors duration-75 ${
                                isCorrect
                                  ? 'text-[#15803D] dark:text-[#86EFAC]'
                                  : 'text-[#DC2626] dark:text-red-400 bg-[#DC2626]/20 underline decoration-[#DC2626] px-0.5 rounded'
                              }`}
                            >
                              {char}
                            </span>
                          );
                        }

                        if (isCurrent) {
                          return (
                            <span
                              key={index}
                              data-active="true"
                              className="relative inline-block bg-[#FDE047] dark:bg-amber-400 text-slate-950 font-black px-1 rounded-sm shadow-xs transition-none"
                            >
                              {char}
                              {/* Active Cursor Underline */}
                              <span className="absolute -bottom-[3px] left-0 right-0 h-[3.5px] bg-[#2563EB] dark:bg-[#1D4ED8] rounded-full shadow-sm animate-pulse" />
                            </span>
                          );
                        }

                        // Upcoming letter
                        return (
                          <span
                            key={index}
                            className="inline-block text-slate-500 dark:text-slate-400 opacity-60 font-semibold"
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                  </span>

                  {/* Space separator between words */}
                  {hasTrailingSpace && (
                    <span className="inline-block self-end mb-2 sm:mb-2.5 mx-1 sm:mx-1.5">
                      {spaceIndex === currentIdx ? (
                        <span
                          data-active="true"
                          className="relative inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-[#FDE047] dark:bg-amber-400 text-slate-950 text-xs font-mono font-black shadow-xs"
                        >
                          ␣
                          <span className="absolute -bottom-[3px] left-0 right-0 h-[3.5px] bg-[#2563EB] dark:bg-[#1D4ED8] rounded-full shadow-sm animate-pulse" />
                        </span>
                      ) : spaceIndex < currentIdx ? (
                        <span className="text-emerald-500/40 text-xs font-mono select-none opacity-40">·</span>
                      ) : (
                        <span className="text-slate-400/40 text-xs font-mono select-none opacity-30">·</span>
                      )}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        ) : (
          <div className="font-['Gabriela',_'Kurale',_Georgia,_serif] text-xl sm:text-2xl md:text-[34px] leading-[2.1] sm:leading-[2.4] tracking-wide w-full select-none">
            {words.map((word, wordIndex) => {
              const cleanWordText = word.map((w) => w.char).join('').trim().toLowerCase().replace(/[^a-z]/g, '');
              const isTargetWeakWord = language === 'weakness' && currentLesson?.targetWords && currentLesson.targetWords.includes(cleanWordText);

              return (
                <span
                  key={wordIndex}
                  className={`inline-block whitespace-nowrap transition-all duration-200 ${
                    isTargetWeakWord
                      ? 'border-b-2 border-dashed border-amber-500/50 dark:border-amber-400/50 rounded-xs'
                      : ''
                  }`}
                  title={isTargetWeakWord ? '🎯 Target Word to overcome weakness' : undefined}
                >
                {word.map(({ char, index }) => {
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
                        {/* Bright blue underline cursor */}
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
              </span>
            );
          })}
          </div>
        )}
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
