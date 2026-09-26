import React, { useState, useMemo } from 'react';
import { Play, Check, Clock, Search, ChevronUp, ChevronDown, CheckCircle2, Menu, X, ArrowLeft, Star } from 'lucide-react';
import { LESSON_STAGES, ALL_500_LESSONS } from '../data/lessons';

export default function TypingClubLessonMap({
  currentLessonNumber,
  onSelectLesson,
  onBackToTyping,
  completedStars = {}
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageId, setSelectedStageId] = useState(1);

  // Calculate user progress metrics
  const totalCompleted = Object.keys(completedStars).length;
  const progressPercent = Math.min(100, Math.round((totalCompleted / 500) * 100));
  const totalStars = Object.values(completedStars).reduce((acc, s) => acc + s, 0);
  const totalPoints = totalStars * 420 + totalCompleted * 1500;

  // Filter lessons
  const filteredLessons = useMemo(() => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      const qNum = parseInt(q, 10);
      return ALL_500_LESSONS.filter(
        (l) => l.number === qNum || l.title.toLowerCase().includes(q) || l.text.toLowerCase().includes(q)
      );
    }
    return ALL_500_LESSONS;
  }, [searchQuery]);

  // Group lessons by stage
  const stagesWithLessons = useMemo(() => {
    if (searchQuery.trim() !== '') {
      return [{
        id: 0,
        name: 'Search Results',
        lessons: filteredLessons
      }];
    }

    return LESSON_STAGES.map((stage) => ({
      ...stage,
      lessons: ALL_500_LESSONS.filter((l) => l.stageId === stage.id)
    }));
  }, [searchQuery, filteredLessons]);

  // Helper to determine card visual type matching Typing Club screenshot
  const getCardVisual = (lesson) => {
    const num = lesson.number;
    const isCompleted = (completedStars[num] || 0) > 0;
    const starsCount = completedStars[num] || 0;

    // 1. Video / Intro Lesson
    if (num === 1 || num === 51 || num === 121 || num === 181 || num === 241) {
      return {
        type: 'intro',
        label: num === 1 ? 'Introduction to Typing' : `Introduction to Stage`,
        renderIcon: () => (
          <div className="relative flex flex-col items-center justify-center my-2">
            <div className="w-16 h-12 bg-slate-300 rounded-lg border-2 border-slate-400 flex items-center justify-center relative shadow-sm">
              <span className="font-mono text-xs font-bold text-slate-600">⌨️</span>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-white text-[10px] shadow">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
            </div>
            {isCompleted && (
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs shadow-md mt-1 border-2 border-white">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
          </div>
        )
      };
    }

    // 2. Game / Balloon Ninja (e.g. 8, 15, 25, 40, etc.)
    if (num % 7 === 1 || num === 8 || num === 15) {
      return {
        type: 'game',
        hasBadge: true,
        label: `Play: ${lesson.title.replace(/Lesson \d+:?/, '').slice(0, 15)}`,
        renderIcon: () => (
          <div className="flex flex-col items-center justify-center my-1.5">
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* Balloon */}
              <div className="w-9 h-11 bg-slate-400 rounded-full shadow-sm relative">
                {/* Ninja figure */}
                <div className="absolute -bottom-1 left-2 w-5 h-6 bg-slate-700 rounded-sm flex items-center justify-center text-[7px] text-white font-bold">
                  🐱
                </div>
              </div>
            </div>
            {/* 5 Stars bar */}
            <div className="flex items-center gap-0.5 mt-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${
                    starsCount > 0 && s <= starsCount
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_#f59e0b]'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )
      };
    }

    // 3. Stopwatch / Speed Test (e.g. 7, 11, 14, 21, etc.)
    if (num % 7 === 0 || num === 7 || num === 11 || num === 14) {
      return {
        type: 'test',
        hasBadge: num % 14 === 0,
        label: `Practice: ${lesson.title.replace(/Lesson \d+:?/, '').slice(0, 15)}`,
        renderIcon: () => (
          <div className="flex flex-col items-center justify-center my-1.5">
            <div className="w-12 h-12 rounded-full border-3 border-slate-500 bg-slate-50 flex items-center justify-center shadow-inner relative">
              {/* Clock hands */}
              <Clock className="w-6 h-6 text-slate-600" />
            </div>
            {/* 5 Stars bar */}
            <div className="flex items-center gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${
                    starsCount > 0 && s <= starsCount
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_#f59e0b]'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )
      };
    }

    // 4. Review / Magnifying Glass (e.g. 4, 6, 10, 13)
    if (num % 3 === 1 || num === 4 || num === 6 || num === 10 || num === 13) {
      const keysText = lesson.text.slice(0, 2) || 'fj';
      return {
        type: 'review',
        hasBadge: num === 13,
        label: `Review: ${keysText}`,
        renderIcon: () => (
          <div className="flex flex-col items-center justify-center my-1.5">
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-3 border-slate-500 bg-white flex items-center justify-center text-slate-700 font-mono font-bold text-sm shadow-inner">
                {keysText}
              </div>
              {/* Handle */}
              <div className="absolute -bottom-1 -left-1 w-4 h-1.5 bg-slate-600 rounded transform -rotate-45" />
            </div>
            {/* 5 Stars bar */}
            <div className="flex items-center gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${
                    starsCount > 0 && s <= starsCount
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_#f59e0b]'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )
      };
    }

    // 5. Default Card: Key Box with letters
    const keysText = num === 3 ? 'fj' : lesson.text.slice(0, 2) || 'fj';
    return {
      type: 'box',
      label: num === 3 ? 'Space Bar' : `Keys ${keysText}`,
      renderIcon: () => (
        <div className="flex flex-col items-center justify-center my-2">
          {/* Target keys letters */}
          <span className="font-mono text-base font-black text-slate-700 -mb-1">
            {keysText}
          </span>
          {/* Cardboard box */}
          <div className="w-12 h-7 bg-slate-400 rounded-b-md relative flex items-center justify-center border-t-2 border-slate-500 shadow-xs">
            {/* Open flaps */}
            <div className="absolute -top-2 left-0 w-5 h-2 bg-slate-300 rounded-t-xs transform -rotate-12 border border-slate-400" />
            <div className="absolute -top-2 right-0 w-5 h-2 bg-slate-300 rounded-t-xs transform rotate-12 border border-slate-400" />
          </div>
          {isCompleted && (
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs shadow-md -mt-2 z-10 border-2 border-white">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}
        </div>
      )
    };
  };

  return (
    <div className="min-h-screen bg-[#eaf6fa] text-slate-800 font-sans flex flex-col select-none">
      {/* Top Progress & Metrics Bar */}
      <div className="w-full bg-[#eaf6fa] px-6 sm:px-12 py-3 flex flex-wrap items-center justify-between border-b border-[#d6ecf3] z-10">
        {/* Left: Progress Stats Pill */}
        <div className="flex items-center gap-3 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-xs text-xs font-bold text-slate-700">
          <span><strong className="text-slate-900">{progressPercent}%</strong> progress</span>
          <span className="text-slate-300">|</span>
          <span><strong className="text-slate-900">{totalStars.toLocaleString()}</strong> stars</span>
          <span className="text-slate-300">|</span>
          <span><strong className="text-slate-900">{totalPoints.toLocaleString()}</strong> points</span>
        </div>

        {/* Right: Search & Back to Typing */}
        <div className="flex items-center gap-3">
          <div className="relative w-48 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search or jump (1–500)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-xs"
            />
          </div>

          <button
            onClick={onBackToTyping}
            className="flex items-center gap-1.5 px-4 py-1 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-full border border-slate-200 shadow-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Typing</span>
          </button>
        </div>
      </div>

      {/* Main Stages & Lesson Grid */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-12 py-6 relative">
        {stagesWithLessons.map((stage) => (
          <div key={stage.id} className="mb-12">
            {/* Stage Title Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                {stage.name}
              </h2>
              {stage.description && (
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  {stage.description}
                </span>
              )}
            </div>

            {/* 5-Column Grid of Typing Club Lesson Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
              {stage.lessons.map((lesson) => {
                const isCurrent = currentLessonNumber === lesson.number;
                const card = getCardVisual(lesson);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      onSelectLesson(lesson);
                      onBackToTyping();
                    }}
                    className={`relative bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden group ${
                      isCurrent
                        ? 'ring-4 ring-blue-400 border-blue-500 scale-102'
                        : 'hover:border-blue-300 hover:scale-102'
                    }`}
                  >
                    {/* Top Lesson Number & Wing Badge */}
                    <div className="flex items-start justify-between p-3 pb-0">
                      <span className="text-xl font-black text-slate-700 group-hover:text-blue-600 transition-colors">
                        {lesson.number}
                      </span>

                      {/* Milestone Wing Badge */}
                      {card.hasBadge && (
                        <div className="w-5 h-5 bg-sky-100 rounded-full border border-sky-300 flex items-center justify-center text-sky-600 shadow-xs">
                          <span className="text-[10px]">🪽</span>
                        </div>
                      )}
                    </div>

                    {/* Center Icon & Graphic */}
                    <div className="px-3 flex-1 flex items-center justify-center">
                      {card.renderIcon()}
                    </div>

                    {/* Bottom Label Bar */}
                    <div className="w-full py-1.5 px-2 bg-slate-50 border-t border-slate-100 text-center">
                      <p className="text-[11px] font-medium text-slate-600 truncate group-hover:text-slate-900">
                        {card.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Right Navigation Pill (Matching Typing Club Screenshot) */}
      <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center bg-white border border-slate-200 rounded-full p-1.5 shadow-lg gap-2 z-30">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition cursor-pointer"
          title="Scroll to Top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center border border-blue-200">
          {selectedStageId}
        </div>

        <button
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition cursor-pointer"
          title="Scroll to Bottom"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
