import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ALL_685_LESSONS, ALL_500_LESSONS, BEAUTY_TIERS } from './data/lessons';
import { ALL_BANGLA_LESSONS, BANGLA_STAGES } from './data/banglaLessons';
import { transliterateAvro, checkAvroWordMatch } from './utils/avroPhonetic';
import TypingClubHeader from './components/TypingClubHeader';
import TypingArea from './components/TypingArea';
import VirtualKeyboard from './components/VirtualKeyboard';
import ResultsModal from './components/ResultsModal';
import TypingClubLessonMap from './components/TypingClubLessonMap';
import CustomAvatarModal from './components/CustomAvatarModal';
import ShareToast from './components/ShareToast';
import WeaknessWorkoutBar from './components/WeaknessWorkoutBar';
import { getLessonFromUrl, getShareUrl, shareLesson } from './utils/shareUtils';
import {
  loadWeaknessProfile,
  saveWeaknessProfile,
  recordKeystroke,
  recordWordCompleted,
  generateWeaknessWorkout
} from './utils/weaknessAnalyzer';
import {
  playKeyClick,
  playErrorSound,
  playStreakChime,
  playGlamourUp,
  playGlamourDrop,
  setSoundEnabled
} from './audio';

export function getLessonTargetText(lesson, lang, currentWorkout = null) {
  if (lang === 'weakness') {
    if (currentWorkout?.text) return currentWorkout.text;
    if (lesson?.text) return lesson.text;
  }
  if (!lesson) return ALL_685_LESSONS[0].text;
  if (lang === 'bn') {
    if (lesson.words && lesson.words.length > 0) {
      return lesson.words.map((w) => w.avro).join(' ');
    }
    return lesson.phoneticHint || lesson.text;
  }
  return lesson.text;
}

export default function App() {
  // Language mode: 'en' (English) | 'bn' (Bangla Avro) | 'weakness' (Weakness AI)
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('glowtype_language');
      if (saved === 'bn' || saved === 'en' || saved === 'weakness') return saved;
    } catch {}
    return 'en';
  });

  // Active curriculum based on chosen language
  const activeLessons = useMemo(() => {
    return language === 'bn' ? ALL_BANGLA_LESSONS : ALL_685_LESSONS;
  }, [language]);

  // Check URL on startup for deep links (e.g. ?lesson=183 or #lesson-183)
  const initialUrlLesson = useRef(getLessonFromUrl(ALL_685_LESSONS)).current;

  // Navigation View: 'lessons' (Typing Club curriculum page by default) | 'typing' (main typing arena)
  const [currentView, setCurrentView] = useState(() => {
    if (initialUrlLesson) return 'typing';
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('view') === 'typing') return 'typing';
    } catch {}
    return 'lessons';
  });

  // Initialize current lesson with URL deep link or persistence in localStorage
  const [currentLesson, setCurrentLesson] = useState(() => {
    if (initialUrlLesson) return initialUrlLesson;
    try {
      const savedLang = localStorage.getItem('glowtype_language');
      const list = savedLang === 'bn' ? ALL_BANGLA_LESSONS : ALL_685_LESSONS;
      const key = savedLang === 'bn' ? 'glowtype_current_lesson_bn' : 'glowtype_current_lesson';
      const savedNum = localStorage.getItem(key);
      if (savedNum) {
        const num = parseInt(savedNum, 10);
        const found = list.find((l) => l.number === num);
        if (found) return found;
      }
      return list[0];
    } catch {}
    return ALL_685_LESSONS[0];
  });

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // Weakness AI Profiler & Adaptive Paragraph Workout state
  const weaknessProfileRef = useRef(loadWeaknessProfile());
  const lastKeystrokeTimeRef = useRef(null);
  const currentWordBufferRef = useRef({ word: '', startTime: null, errors: 0 });
  const [workoutLength, setWorkoutLength] = useState('medium');
  const [weaknessWorkout, setWeaknessWorkout] = useState(() => {
    return generateWeaknessWorkout({
      profile: weaknessProfileRef.current,
      length: 'medium',
      mode: 'adaptive'
    });
  });

  const currentLessonRef = useRef(currentLesson);
  useEffect(() => {
    currentLessonRef.current = currentLesson;
  }, [currentLesson]);

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

  // Tier photos visibility state (persisted in localStorage)
  const [showTierPhotos, setShowTierPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('glowtype_show_tier_photos');
      if (saved !== null) return saved === 'true';
    } catch {}
    return true; // Default is ON
  });

  const toggleTierPhotos = useCallback(() => {
    setShowTierPhotos((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('glowtype_show_tier_photos', String(next));
      } catch {}
      return next;
    });
  }, []);

  // Typing States
  const [targetText, setTargetText] = useState(() => getLessonTargetText(currentLesson, language));
  const [userInput, setUserInput] = useState('');
  const [glamourScore, setGlamourScore] = useState(55);
  const [combo, setCombo] = useState(0);
  const [peakCombo, setPeakCombo] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [lastErrorTrigger, setLastErrorTrigger] = useState(0);

  // Sync targetText whenever currentLesson changes, language switches, or typing view opens
  useEffect(() => {
    if (currentLesson) {
      const nextTarget = getLessonTargetText(currentLesson, language, weaknessWorkout);
      setTargetText(nextTarget);
    }
  }, [currentLesson, language, weaknessWorkout]);

  useEffect(() => {
    if (currentView === 'typing') {
      if (document.activeElement && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      if (currentLesson) {
        const expected = getLessonTargetText(currentLesson, language, weaknessWorkout);
        if (targetText !== expected) {
          setTargetText(expected);
        }
      }
    }
  }, [currentView, currentLesson, language, targetText, weaknessWorkout]);

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

  // Share Toast notification state
  const [shareToast, setShareToast] = useState(null);

  // Synchronize URL query params (?lesson=183 or ?view=lessons) without reloading
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (currentView === 'typing' && currentLesson?.number) {
        url.searchParams.set('lesson', String(currentLesson.number));
        url.searchParams.delete('view');
      } else if (currentView === 'lessons') {
        url.searchParams.delete('lesson');
        url.searchParams.set('view', 'lessons');
      }
      window.history.replaceState({ lesson: currentLesson?.number, view: currentView }, '', url.toString());
    } catch {}
  }, [currentView, currentLesson]);

  // Support Browser Back/Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const lessonFromUrl = getLessonFromUrl(ALL_685_LESSONS);
      if (lessonFromUrl) {
        setCurrentLesson(lessonFromUrl);
        setTargetText(lessonFromUrl.text);
        const idx = ALL_685_LESSONS.findIndex((l) => l.number === lessonFromUrl.number);
        if (idx !== -1) setCurrentLessonIndex(idx);
        setCurrentView('typing');
      } else {
        try {
          const url = new URL(window.location.href);
          if (url.searchParams.get('view') === 'lessons') {
            setCurrentView('lessons');
          }
        } catch {}
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Share Lesson handler
  const handleShareLesson = useCallback((lessonToShare, stats) => {
    const target = lessonToShare || currentLesson;
    if (!target) return;
    shareLesson({
      lessonNumber: target.number,
      lessonTitle: target.title,
      wpm: stats?.wpm,
      accuracy: stats?.accuracy,
      onToast: (toastData) => setShareToast(toastData)
    });
  }, [currentLesson]);

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

  const resetGame = useCallback((lessonToUse = null, mode = gameMode, langToUse = language) => {
    const lesson = lessonToUse || currentLessonRef.current || currentLesson;
    let text = getLessonTargetText(lesson, langToUse);
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
    lastKeystrokeTimeRef.current = null;
    currentWordBufferRef.current = { word: '', startTime: null, errors: 0 };
  }, [currentLesson, gameMode, language]);

  // Generate a brand new paragraph targeting weak fingers/letters/words
  // "based on the weakness of our word it will give new words not new letter please"
  const handleGenerateWeaknessParagraph = useCallback((options = {}) => {
    const len = options.length || workoutLength;
    const fresh = generateWeaknessWorkout({
      profile: weaknessProfileRef.current,
      length: len,
      mode: options.mode || 'adaptive',
      focusFinger: options.focusFinger || null
    });
    setWeaknessWorkout(fresh);
    const adaptiveLesson = {
      id: fresh.id,
      number: '🎯',
      title: fresh.title,
      targetWpm: 35,
      difficulty: 'Adaptive',
      text: fresh.text,
      isWeaknessWorkout: true,
      targetFingers: fresh.targetFingers,
      targetWords: fresh.targetWords
    };
    setCurrentLesson(adaptiveLesson);
    currentLessonRef.current = adaptiveLesson;
    setTargetText(fresh.text);
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
    lastKeystrokeTimeRef.current = null;
    currentWordBufferRef.current = { word: '', startTime: null, errors: 0 };
  }, [workoutLength]);

  // Start a Weakness Workout from the Hub
  const handleStartWeaknessWorkout = useCallback((workout) => {
    const fresh = workout || generateWeaknessWorkout({
      profile: weaknessProfileRef.current,
      length: workoutLength,
      mode: 'adaptive'
    });
    setWeaknessWorkout(fresh);
    const adaptiveLesson = {
      id: fresh.id,
      number: '🎯',
      title: fresh.title,
      targetWpm: 35,
      difficulty: 'Adaptive',
      text: fresh.text,
      isWeaknessWorkout: true,
      targetFingers: fresh.targetFingers,
      targetWords: fresh.targetWords
    };
    setCurrentLesson(adaptiveLesson);
    currentLessonRef.current = adaptiveLesson;
    setLanguage('weakness');
    try {
      localStorage.setItem('glowtype_language', 'weakness');
    } catch {}
    resetGame(adaptiveLesson, gameMode, 'weakness');
    setCurrentView('typing');
  }, [workoutLength, gameMode, resetGame]);

  // Language switcher handler
  const handleSelectLanguage = (newLang) => {
    if (newLang === language) return;
    setLanguage(newLang);
    try {
      localStorage.setItem('glowtype_language', newLang);
      if (newLang !== 'weakness') {
        const starsKey = newLang === 'bn' ? 'glowtype_lesson_stars_bn' : 'glowtype_lesson_stars';
        const savedStars = localStorage.getItem(starsKey);
        setCompletedStars(savedStars ? JSON.parse(savedStars) : {});
      }
    } catch {}

    if (newLang === 'weakness') {
      const fresh = generateWeaknessWorkout({
        profile: weaknessProfileRef.current,
        length: workoutLength,
        mode: 'adaptive'
      });
      setWeaknessWorkout(fresh);
      const adaptiveLesson = {
        id: fresh.id,
        number: '🎯',
        title: fresh.title,
        targetWpm: 35,
        difficulty: 'Adaptive',
        text: fresh.text,
        isWeaknessWorkout: true,
        targetFingers: fresh.targetFingers,
        targetWords: fresh.targetWords
      };
      setCurrentLesson(adaptiveLesson);
      currentLessonRef.current = adaptiveLesson;
      resetGame(adaptiveLesson, gameMode, newLang);
      return;
    }

    const list = newLang === 'bn' ? ALL_BANGLA_LESSONS : ALL_685_LESSONS;
    const targetLesson = list[0];
    setCurrentLesson(targetLesson);
    currentLessonRef.current = targetLesson;
    setCurrentLessonIndex(0);
    resetGame(targetLesson, gameMode, newLang);
  };

  const toggleLanguage = () => {
    if (language === 'en') handleSelectLanguage('bn');
    else if (language === 'bn') handleSelectLanguage('weakness');
    else handleSelectLanguage('en');
  };

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
    if (!lesson) return;
    const list = language === 'bn' ? ALL_BANGLA_LESSONS : ALL_685_LESSONS;
    const fullLesson = list.find((l) => l.number === lesson.number) || lesson;
    setCurrentLesson(fullLesson);
    currentLessonRef.current = fullLesson;
    const idx = list.findIndex((l) => l.number === fullLesson.number);
    setCurrentLessonIndex(idx !== -1 ? idx : 0);
    resetGame(fullLesson, gameMode, language);
    setCurrentView('typing');
    try {
      const key = language === 'bn' ? 'glowtype_current_lesson_bn' : 'glowtype_current_lesson';
      localStorage.setItem(key, String(fullLesson.number));
    } catch {}
  };

  const handleNextLesson = () => {
    if (language === 'weakness') {
      handleGenerateWeaknessParagraph();
      return;
    }
    const list = language === 'bn' ? ALL_BANGLA_LESSONS : ALL_685_LESSONS;
    const currentNum = currentLessonRef.current?.number || currentLesson?.number || 1;
    const nextLesson = list.find((l) => l.number === currentNum + 1) || list[0];
    const nextIdx = list.findIndex((l) => l.number === nextLesson.number);
    setCurrentLesson(nextLesson);
    currentLessonRef.current = nextLesson;
    setCurrentLessonIndex(nextIdx !== -1 ? nextIdx : 0);
    resetGame(nextLesson, gameMode, language);
    try {
      const key = language === 'bn' ? 'glowtype_current_lesson_bn' : 'glowtype_current_lesson';
      localStorage.setItem(key, String(nextLesson.number));
    } catch {}
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

  const finishGame = (finalTypedLength) => {
    setIsFinished(true);
    setShowResults(true);

    const totalTyped = finalTypedLength ?? userInput.length;
    let finalAcc = accuracy;
    if (totalTyped > 0) {
      finalAcc = Math.max(0, Math.round(((totalTyped - totalErrors) / totalTyped) * 100));
      setAccuracy(finalAcc);
    }

    // Calculate & persist stars (1 to 5 stars)
    let stars = 1;
    if (finalAcc >= 80 && wpm >= 3) stars = 2;
    if (finalAcc >= 88 && wpm >= 5) stars = 3;
    if (finalAcc >= 94 && wpm >= 7) stars = 4;
    if (finalAcc >= 98 && wpm >= 9) stars = 5;

    const lessonNum = currentLessonRef.current?.number || currentLesson?.number || 1;
    const storageKey = language === 'bn' ? 'glowtype_lesson_stars_bn' : 'glowtype_lesson_stars';
    setCompletedStars((prev) => {
      const currentBest = prev[lessonNum] || 0;
      const updated = { ...prev, [lessonNum]: Math.max(currentBest, stars) };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (glamourScore >= 75) {
      playGlamourUp();
    }

    // Persist completed word & updated weakness profile
    if (currentWordBufferRef.current.word.trim()) {
      const now = Date.now();
      recordWordCompleted(
        weaknessProfileRef.current,
        currentWordBufferRef.current.word,
        now - (currentWordBufferRef.current.startTime || now),
        currentWordBufferRef.current.errors
      );
      currentWordBufferRef.current = { word: '', startTime: null, errors: 0 };
    }
    saveWeaknessProfile(weaknessProfileRef.current);
  };

  // Direct Window Keyboard Listener (Active when in typing view)
  // Central character typed handler (supports both physical and mobile keyboards)
  const handleCharTyped = useCallback((charTyped) => {
    if (isFinished || isPaused) return;

    setActiveKey(charTyped === ' ' ? 'Space' : charTyped);
    setTimeout(() => setActiveKey(''), 150);

    const now = Date.now();

    if (!hasStarted) {
      setHasStarted(true);
      setStartTime(now);
    }

    const expectedChar = targetText[userInput.length];
    if (expectedChar === undefined) return;

    // Keystroke latency tracking
    const latency = lastKeystrokeTimeRef.current ? Math.min(now - lastKeystrokeTimeRef.current, 2500) : 200;
    lastKeystrokeTimeRef.current = now;

    // In Bangla mode, accept case-insensitive match (e.g. mobile keyboards auto-capitalizing first letter)
    const isCorrect = (charTyped === expectedChar) ||
      (language === 'bn' && typeof expectedChar === 'string' && charTyped.toLowerCase() === expectedChar.toLowerCase());

    // Record into Weakness Profile
    recordKeystroke(weaknessProfileRef.current, expectedChar, charTyped, isCorrect, latency);

    // Track active word metrics
    if (!currentWordBufferRef.current.startTime) {
      currentWordBufferRef.current.startTime = now;
    }
    currentWordBufferRef.current.word += expectedChar;
    if (!isCorrect) {
      currentWordBufferRef.current.errors += 1;
    }

    if (expectedChar === ' ' || userInput.length + 1 >= targetText.length) {
      const wStats = currentWordBufferRef.current;
      if (wStats.word.trim()) {
        recordWordCompleted(weaknessProfileRef.current, wStats.word, now - (wStats.startTime || now), wStats.errors);
      }
      currentWordBufferRef.current = { word: '', startTime: null, errors: 0 };
    }

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

      const nextInput = userInput + (language === 'bn' ? expectedChar : charTyped);
      setUserInput(nextInput);

      if (nextInput.length >= targetText.length) {
        finishGame(nextInput.length);
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
        finishGame(nextInput.length);
      } else if (nextInput.length >= targetText.length) {
        finishGame(nextInput.length);
      }
    }
  }, [
    language,
    userInput,
    targetText,
    combo,
    peakCombo,
    totalErrors,
    isFinished,
    isPaused,
    hasStarted,
    gameMode,
    calculateGlamourFromSpeed
  ]);

  // Central backspace handler
  const handleBackspace = useCallback(() => {
    if (isFinished || isPaused) return;

    if (userInput.length > 0) {
      setUserInput((prev) => prev.slice(0, -1));
    }
  }, [isFinished, isPaused, userInput.length]);

  useEffect(() => {
    if (currentView !== 'typing') return;

    const handleKeyDown = (e) => {
      if (showAvatarModal || showResults || isFinished) return;

      // When focused on an input (such as the mobile hidden input), let its event handler handle typing
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }

      // Ignore browser shortcuts (e.g. Ctrl+R, Alt+Left, F5, etc.) so typing doesn't swallow or misfire
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
        return;
      }

      // Tab key shortcut in Weakness mode generates a brand new paragraph
      if (e.key === 'Tab') {
        if (language === 'weakness') {
          e.preventDefault();
          handleGenerateWeaknessParagraph();
          return;
        }
      }

      if (e.key.length === 1) {
        if (e.key === ' ') {
          e.preventDefault();
        }
        handleCharTyped(e.key);
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
  }, [currentView, showAvatarModal, showResults, isFinished, handleCharTyped, handleBackspace, language, handleGenerateWeaknessParagraph]);

  const currentTargetChar = useMemo(() => {
    return targetText[userInput.length] || '';
  }, [targetText, userInput.length]);

  const currentTier = BEAUTY_TIERS.find(
    (t) => glamourScore >= t.minScore && glamourScore <= t.maxScore
  ) || BEAUTY_TIERS[2];

  // If in Lessons Map View, render the full-screen Typing Club Curriculum Page
  if (currentView === 'lessons') {
    return (
      <>
        <TypingClubLessonMap
          currentLessonNumber={currentLesson.number}
          onSelectLesson={handleSelectLesson}
          onBackToTyping={() => {
            if (currentLesson) {
              setTargetText(getLessonTargetText(currentLesson, language));
            }
            setCurrentView('typing');
          }}
          completedStars={completedStars}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          showTierPhotos={showTierPhotos}
          onToggleTierPhotos={toggleTierPhotos}
          onShareLesson={handleShareLesson}
          language={language}
          onSelectLanguage={handleSelectLanguage}
          onStartWeaknessWorkout={handleStartWeaknessWorkout}
        />
        <ShareToast toast={shareToast} onClose={() => setShareToast(null)} />
      </>
    );
  }

  // Otherwise, render the Typing Arena View
  return (
    <div
      className="min-h-screen flex flex-col font-['Inria_Sans',_'Roboto',_sans-serif] font-normal select-none relative overflow-hidden"
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
        showTierPhotos={showTierPhotos}
        onToggleTierPhotos={toggleTierPhotos}
        onShareLesson={handleShareLesson}
        language={language}
        onToggleLanguage={toggleLanguage}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Main Typing Arena */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-between gap-3 relative z-10">
        {/* Weakness Workout Bar when in Weakness mode */}
        {language === 'weakness' && (
          <WeaknessWorkoutBar
            currentWorkout={weaknessWorkout}
            onGenerateNewParagraph={handleGenerateWeaknessParagraph}
            onOpenHub={() => setCurrentView('lessons')}
            workoutLength={workoutLength}
            onChangeLength={(len) => {
              setWorkoutLength(len);
              handleGenerateWeaknessParagraph({ length: len });
            }}
          />
        )}

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
          isDark={isDark}
          showTierPhotos={showTierPhotos}
          onToggleTierPhotos={toggleTierPhotos}
          onOpenCustomPhotos={() => setShowAvatarModal(true)}
          onRestart={() => resetGame()}
          onNextLesson={handleNextLesson}
          hasNextLesson={language === 'weakness' ? true : currentLesson.number < activeLessons.length}
          onShowResults={() => setShowResults(true)}
          onTypeChar={handleCharTyped}
          onBackspace={handleBackspace}
          onTab={language === 'weakness' ? handleGenerateWeaknessParagraph : undefined}
          language={language}
          currentLesson={currentLesson}
        />

        {/* Virtual Keyboard */}
        <VirtualKeyboard
          targetChar={currentTargetChar}
          activeKey={activeKey}
          showGuide={showKeyboard}
          showHands={showHands}
          language={language}
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
        hasNextLesson={currentLesson.number < activeLessons.length}
        currentLesson={currentLesson}
        onClose={() => {
          setShowResults(false);
          setIsFinished(false);
        }}
        onBackToLessons={() => {
          setShowResults(false);
          setIsFinished(false);
          setCurrentView('lessons');
        }}
        currentTier={currentTier}
        customAvatars={customAvatars}
        showTierPhotos={showTierPhotos}
        onShareLesson={handleShareLesson}
      />

      <CustomAvatarModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        customAvatars={customAvatars}
        onUpdateAvatar={handleUpdateAvatar}
        onResetAvatars={handleResetAvatars}
      />

      {/* Share Toast Notification */}
      <ShareToast toast={shareToast} onClose={() => setShareToast(null)} />
    </div>
  );
}
