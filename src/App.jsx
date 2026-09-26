import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ALL_500_LESSONS, BEAUTY_TIERS } from './data/lessons';
import TypingClubHeader from './components/TypingClubHeader';
import TypingArea from './components/TypingArea';
import VirtualKeyboard from './components/VirtualKeyboard';
import ResultsModal from './components/ResultsModal';
import TypingClubLessonMap from './components/TypingClubLessonMap';
import CustomAvatarModal from './components/CustomAvatarModal';
import {
  playKeyClick,
  playErrorSound,
  playStreakChime,
  playGlamourUp,
  playGlamourDrop,
  setSoundEnabled
} from './audio';

export default function App() {
  // Navigation View: 'lessons' (Typing Club 500 curriculum page by default) | 'typing' (main typing arena)
  const [currentView, setCurrentView] = useState('lessons');

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(ALL_500_LESSONS[0]);
  const [gameMode] = useState('lesson');

  // Completed lesson stars map { [lessonNumber]: stars }
  const [completedStars, setCompletedStars] = useState(() => {
    try {
      const saved = localStorage.getItem('glowtype_lesson_stars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Theme state: Day (#F7F2CF Cream, Default) vs Night (Dark version)
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('glowtype_theme_mode');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return false; // Default is #F7F2CF Day mode
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('glowtype_theme_mode', isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light-theme');
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // Typing States
  const [targetText, setTargetText] = useState(ALL_500_LESSONS[0].text);
  const [userInput, setUserInput] = useState('');
  const [glamourScore, setGlamourScore] = useState(55);
  const [combo, setCombo] = useState(0);
  const [peakCombo, setPeakCombo] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [lastErrorTrigger, setLastErrorTrigger] = useState(0);

  // Time & Metrics
  const [_startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  // Rolling keystrokes for responsive live WPM calculation
  const recentKeystrokes = useRef([]);
  const errorPenaltyUntil = useRef(0);

  // Status flags
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showHands, setShowHands] = useState(true);
  const [activeKey, setActiveKey] = useState('');
  const [soundOn, setSoundOn] = useState(true);

  // Custom Avatars stored in localStorage
  const [customAvatars, setCustomAvatars] = useState(() => {
    try {
      const saved = localStorage.getItem('glowtype_custom_avatars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleUpdateAvatar = (tierNum, imageBase64) => {
    setCustomAvatars((prev) => {
      const updated = { ...prev };
      if (imageBase64) {
        updated[tierNum] = imageBase64;
      } else {
        delete updated[tierNum];
      }
      try {
        localStorage.setItem('glowtype_custom_avatars', JSON.stringify(updated));
      } catch (e) {
        console.error("Local storage error:", e);
      }
      return updated;
    });
  };

  const handleResetAvatars = () => {
    setCustomAvatars({});
    try {
      localStorage.removeItem('glowtype_custom_avatars');
    } catch {}
  };

  const prevTierRef = useRef(3);

  // 3, 5, 7, 9, 10 WPM tiers
  const calculateGlamourFromSpeed = useCallback((speedWpm) => {
    if (Date.now() < errorPenaltyUntil.current) {
      return 15; // Tier 1 (< 3 WPM error state)
    }

    if (speedWpm >= 10) return 100;
    if (speedWpm >= 9) return 92;
    if (speedWpm >= 8) return 82;
    if (speedWpm >= 7) return 72;
    if (speedWpm >= 6) return 62;
    if (speedWpm >= 5) return 52;
    if (speedWpm >= 4) return 42;
    if (speedWpm >= 3) return 32;
    return 15;
  }, []);

  const resetGame = useCallback((lessonToUse = currentLesson, mode = gameMode) => {
    let text = lessonToUse.text;
    if (mode === 'blitz30' || mode === 'blitz60') {
      text = "Freedom of speech is the belief that people have the right to express their opinions and ideas without fear that they will be in legal trouble. However, practice makes typing effortless.";
    }

    setTargetText(text);
    setUserInput('');
    setGlamourScore(55);
    setCombo(0);
    setPeakCombo(0);
    setTotalErrors(0);
    setStartTime(null);
    setElapsedTime(0);
    setWpm(0);
    setAccuracy(100);
    setHasStarted(false);
    setIsPaused(false);
    setIsFinished(false);
    setShowResults(false);
    recentKeystrokes.current = [];
    errorPenaltyUntil.current = 0;
    prevTierRef.current = 3;
  }, [currentLesson, gameMode]);

  // Inject Typing Club SVG Sprite on initial mount for instant zero-latency vector rendering
  useEffect(() => {
    fetch('/svgsprite-cmn.svg')
      .then((res) => res.text())
      .then((svgText) => {
        if (!document.getElementById('typingclub-svg-sprite')) {
          const div = document.createElement('div');
          div.id = 'typingclub-svg-sprite';
          div.style.display = 'none';
          div.innerHTML = svgText;
          document.body.appendChild(div);
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectLesson = (lesson) => {
    setCurrentLesson(lesson);
    const idx = ALL_500_LESSONS.findIndex((l) => l.number === lesson.number);
    if (idx !== -1) setCurrentLessonIndex(idx);
    resetGame(lesson, gameMode);
    setCurrentView('typing');
  };

  const handleNextLesson = () => {
    const nextIdx = (currentLessonIndex + 1) % ALL_500_LESSONS.length;
    setCurrentLessonIndex(nextIdx);
    const nextLesson = ALL_500_LESSONS[nextIdx];
    setCurrentLesson(nextLesson);
    resetGame(nextLesson, gameMode);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  // Timer & Periodic Rolling Speed Evaluator
  useEffect(() => {
    let interval = null;
    if (currentView === 'typing' && hasStarted && !isPaused && !isFinished) {
      interval = setInterval(() => {
        const now = Date.now();

        // 1. Advance elapsed time
        setElapsedTime((prev) => {
          const newTime = prev + 1;
          if (gameMode === 'blitz30' && newTime >= 30) finishGame();
          else if (gameMode === 'blitz60' && newTime >= 60) finishGame();
          return newTime;
        });

        // 2. Filter rolling keystrokes from last 5 seconds
        recentKeystrokes.current = recentKeystrokes.current.filter((t) => now - t <= 5000);
        const rollingChars = recentKeystrokes.current.length;
        const liveSpeed = Math.round(rollingChars * 2.4);

        setWpm(liveSpeed);

        const newGlamour = calculateGlamourFromSpeed(liveSpeed);
        setGlamourScore(newGlamour);

        const currentTierObj = BEAUTY_TIERS.find(
          (t) => newGlamour >= t.minScore && newGlamour <= t.maxScore
        ) || BEAUTY_TIERS[2];

        if (currentTierObj.tier > prevTierRef.current) {
          if (currentTierObj.tier >= 4) playGlamourUp();
        } else if (currentTierObj.tier < prevTierRef.current) {
          if (currentTierObj.tier <= 2) playGlamourDrop();
        }
        prevTierRef.current = currentTierObj.tier;
      }, 500);
    }
    return () => clearInterval(interval);
  }, [currentView, hasStarted, isPaused, isFinished, gameMode, calculateGlamourFromSpeed]);

  // Overall accuracy calculation
  useEffect(() => {
    if (!hasStarted) return;
    const totalTyped = userInput.length;
    if (totalTyped > 0) {
      const calculatedAcc = Math.max(0, Math.round(((totalTyped - totalErrors) / totalTyped) * 100));
      setAccuracy(calculatedAcc);
    }
  }, [userInput, totalErrors, hasStarted]);

  const finishGame = () => {
    setIsFinished(true);
    setShowResults(true);

    // Calculate & persist stars (1 to 5 stars)
    let stars = 1;
    if (accuracy >= 80 && wpm >= 3) stars = 2;
    if (accuracy >= 88 && wpm >= 5) stars = 3;
    if (accuracy >= 94 && wpm >= 7) stars = 4;
    if (accuracy >= 98 && wpm >= 9) stars = 5;

    setCompletedStars((prev) => {
      const currentBest = prev[currentLesson.number] || 0;
      const updated = { ...prev, [currentLesson.number]: Math.max(currentBest, stars) };
      try {
        localStorage.setItem('glowtype_lesson_stars', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (glamourScore >= 75) {
      playGlamourUp();
    }
  };

  // Direct Window Keyboard Listener (Active when in typing view)
  useEffect(() => {
    if (currentView !== 'typing') return;

    const handleKeyDown = (e) => {
      if (showAvatarModal) return;

      setActiveKey(e.key === ' ' ? 'Space' : e.key);

      if (isFinished || isPaused) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        if (userInput.length > 0) {
          setUserInput((prev) => prev.slice(0, -1));
        }
        return;
      }

      if (e.key.length === 1) {
        if (e.key === ' ') {
          e.preventDefault();
        }

        const charTyped = e.key;
        const now = Date.now();

        if (!hasStarted) {
          setHasStarted(true);
          setStartTime(now);
        }

        const expectedChar = targetText[userInput.length];
        const isCorrect = charTyped === expectedChar;

        if (isCorrect) {
          playKeyClick(charTyped === ' ');
          const newCombo = combo + 1;
          setCombo(newCombo);
          if (newCombo > peakCombo) setPeakCombo(newCombo);

          if (newCombo % 10 === 0) {
            playStreakChime(newCombo);
          }

          recentKeystrokes.current.push(now);
          recentKeystrokes.current = recentKeystrokes.current.filter((t) => now - t <= 5000);
          const rollingChars = recentKeystrokes.current.length;
          const liveSpeed = Math.round(rollingChars * 2.4);

          setWpm(liveSpeed);

          const newGlamour = calculateGlamourFromSpeed(liveSpeed);
          setGlamourScore(newGlamour);

          const nextInput = userInput + charTyped;
          setUserInput(nextInput);

          if (nextInput.length >= targetText.length) {
            finishGame();
          }
        } else {
          playErrorSound();
          setLastErrorTrigger(now);
          setCombo(0);
          setTotalErrors((prev) => prev + 1);

          errorPenaltyUntil.current = now + 1800;
          setGlamourScore(15);

          const nextInput = userInput + charTyped;
          setUserInput(nextInput);

          if (gameMode === 'survival' && totalErrors + 1 >= 3) {
            setGlamourScore(10);
            finishGame();
          }
        }
      }
    };

    const handleKeyUp = () => {
      setActiveKey('');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentView, userInput, targetText, combo, peakCombo, totalErrors, isFinished, isPaused, hasStarted, showAvatarModal, gameMode, calculateGlamourFromSpeed]);

  const currentTargetChar = targetText[userInput.length] || '';

  const currentTier = BEAUTY_TIERS.find(
    (t) => glamourScore >= t.minScore && glamourScore <= t.maxScore
  ) || BEAUTY_TIERS[2];

  // If in Lessons Map View, render the full-screen Typing Club Curriculum Page
  if (currentView === 'lessons') {
    return (
      <TypingClubLessonMap
        currentLessonNumber={currentLesson.number}
        onSelectLesson={handleSelectLesson}
        onBackToTyping={() => setCurrentView('typing')}
        completedStars={completedStars}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    );
  }

  // Otherwise, render the Typing Arena View
  return (
    <div
      className="min-h-screen flex flex-col font-['Inter'] select-none relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-2000 opacity-[0.04]"
          style={{ background: currentTier.themeColor }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl transition-all duration-2000 opacity-[0.03]"
          style={{ background: currentTier.themeColor }}
        />
      </div>

      {/* Typing Club Header */}
      <TypingClubHeader
        lessonTitle={currentLesson.title}
        lessonNumber={currentLesson.number}
        onOpenLessons={() => setCurrentView('lessons')}
        onOpenCustomPhotos={() => setShowAvatarModal(true)}
        onReset={() => resetGame()}
        showKeyboard={showKeyboard}
        onToggleKeyboard={() => setShowKeyboard(!showKeyboard)}
        showHands={showHands}
        onToggleHands={() => setShowHands(!showHands)}
        soundOn={soundOn}
        onToggleSound={toggleSound}
        wpm={wpm}
        accuracy={accuracy}
        currentTier={currentTier}
        glamourScore={glamourScore}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        customAvatars={customAvatars}
      />

      {/* Main Typing Arena */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-between gap-3 relative z-10">
        {/* Typing Area */}
        <TypingArea
          targetText={targetText}
          userInput={userInput}
          wpm={wpm}
          accuracy={accuracy}
          combo={combo}
          hasStarted={hasStarted}
          isFinished={isFinished}
          isPaused={isPaused}
          currentTier={currentTier}
          customAvatars={customAvatars}
          lastErrorTrigger={lastErrorTrigger}
          glamourScore={glamourScore}
          onOpenCustomPhotos={() => setShowAvatarModal(true)}
        />

        {/* Virtual Keyboard */}
        <VirtualKeyboard
          targetChar={currentTargetChar}
          activeKey={activeKey}
          showGuide={showKeyboard}
          showHands={showHands}
        />
      </main>

      {/* Modals */}
      <ResultsModal
        isOpen={showResults}
        wpm={wpm}
        accuracy={accuracy}
        glamourScore={glamourScore}
        peakCombo={peakCombo}
        totalErrors={totalErrors}
        elapsedTime={elapsedTime}
        onRestart={() => resetGame()}
        onNextLesson={handleNextLesson}
        hasNextLesson={currentLesson.number < 685}
        currentLesson={currentLesson}
        onClose={() => setShowResults(false)}
        onBackToLessons={() => {
          setShowResults(false);
          setCurrentView('lessons');
        }}
        currentTier={currentTier}
        customAvatars={customAvatars}
      />

      <CustomAvatarModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        customAvatars={customAvatars}
        onUpdateAvatar={handleUpdateAvatar}
        onResetAvatars={handleResetAvatars}
      />
    </div>
  );
}
