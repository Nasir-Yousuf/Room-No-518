import React, { useState } from 'react';
import { X, Search, Star, BookOpen, Timer, ShieldAlert, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { LESSON_STAGES, ALL_500_LESSONS } from '../data/lessons';

export default function LessonSelector({
  isOpen,
  onClose,
  currentLessonNumber,
  onSelectLesson,
  gameMode,
  onChangeGameMode,
  completedStars = {}
}) {
  const [selectedStageId, setSelectedStageId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentStage = LESSON_STAGES.find((s) => s.id === selectedStageId) || LESSON_STAGES[0];

  // Filter lessons by search query or current stage
  let displayedLessons = ALL_500_LESSONS.filter((l) => l.stageId === selectedStageId);
  if (searchQuery.trim() !== '') {
    const query = searchQuery.trim().toLowerCase();
    const queryNum = parseInt(query, 10);
    displayedLessons = ALL_500_LESSONS.filter(
      (l) => l.number === queryNum || l.title.toLowerCase().includes(query) || l.text.toLowerCase().includes(query)
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#fbf8ea] border-2 border-[#e6dcaf] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-800">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg shadow-md shadow-blue-500/30">
              <span>🗺️</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                Typing Club Curriculum (Lessons 1 – 500)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                From beginner anchor keys to grandmaster speed typing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Mode Selector Bar */}
        <div className="px-6 pt-3 pb-2 bg-[#f4ecd2] border-b border-[#e5d9b5] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-1.5 bg-white/80 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => onChangeGameMode('lesson')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                gameMode === 'lesson'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Lessons (1–500)
            </button>

            <button
              onClick={() => onChangeGameMode('blitz30')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                gameMode === 'blitz30'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Timer className="w-3.5 h-3.5" /> 30s Blitz
            </button>

            <button
              onClick={() => onChangeGameMode('blitz60')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                gameMode === 'blitz60'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Timer className="w-3.5 h-3.5" /> 60s Sprint
            </button>

            <button
              onClick={() => onChangeGameMode('survival')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                gameMode === 'survival'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" /> 3-Strikes Survival
            </button>
          </div>

          {/* Quick Jump / Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Jump to Lesson (e.g. 50, 518)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            />
          </div>
        </div>

        {/* Stage Navigation Pills (When not searching) */}
        {searchQuery.trim() === '' && (
          <div className="px-6 py-2 bg-[#ebe1c0] border-b border-[#ded2a9] flex items-center gap-2 overflow-x-auto custom-scrollbar flex-shrink-0">
            {LESSON_STAGES.map((stage) => {
              const isSelected = selectedStageId === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-blue-700 shadow-xs border border-blue-300 ring-2 ring-blue-400/30'
                      : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-transparent'
                  }`}
                >
                  <span>{stage.icon}</span>
                  <span>{stage.name}</span>
                  <span className="text-[10px] opacity-70 font-mono">({stage.range[0]}–{stage.range[1]})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Stage Overview Banner */}
        {searchQuery.trim() === '' && (
          <div className="px-6 py-2.5 bg-[#fffef5] border-b border-[#e8dfbe] flex items-center justify-between text-xs text-slate-600 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-800">{currentStage.name}</span>
              <span>— {currentStage.description}</span>
            </div>
            <span className="font-mono text-slate-500 font-bold">
              {displayedLessons.length} Lessons Available
            </span>
          </div>
        )}

        {/* Grid of Numbered Milestone Lessons (Typing Club signature round tiles) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 sm:gap-4 custom-scrollbar">
          {displayedLessons.map((lesson) => {
            const isCurrent = currentLessonNumber === lesson.number;
            const stars = completedStars[lesson.number] || 0;

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson);
                  onClose();
                }}
                className={`relative group flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-blue-700 shadow-lg shadow-blue-500/40 ring-4 ring-blue-300 scale-105 z-10'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md hover:scale-105'
                }`}
                title={`${lesson.title}\n"${lesson.text}"`}
              >
                {/* Lesson Number Circle */}
                <span className={`text-base sm:text-lg font-black font-mono leading-none ${isCurrent ? 'text-white' : 'text-slate-800'}`}>
                  {lesson.number}
                </span>

                {/* Stars Indicator */}
                <div className="flex items-center gap-0.5 mt-1.5">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      className={`w-2.5 h-2.5 ${
                        s <= stars
                          ? 'text-amber-400 fill-amber-400'
                          : isCurrent
                          ? 'text-blue-300'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Small Difficulty badge for milestones */}
                {lesson.number % 25 === 0 && (
                  <span className={`absolute -top-1.5 -right-1.5 px-1 py-0.2 rounded-full text-[8px] font-black uppercase shadow-xs ${
                    isCurrent ? 'bg-amber-400 text-slate-950' : 'bg-blue-500 text-white'
                  }`}>
                    Milestone
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 flex-shrink-0">
          <span>Click any lesson number from <strong>1 to 500</strong> to start typing immediately.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition cursor-pointer shadow-sm"
          >
            Close Map
          </button>
        </div>
      </div>
    </div>
  );
}
