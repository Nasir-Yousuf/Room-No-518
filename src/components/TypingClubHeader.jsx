import React from 'react';
import { Menu, RotateCcw, Keyboard, Hand, Volume2, VolumeX, Image as ImageIcon, Settings, Zap, Target, Star } from 'lucide-react';

export default function TypingClubHeader({
  lessonTitle,
  lessonNumber,
  onOpenLessons,
  onOpenCustomPhotos,
  onReset,
  showKeyboard,
  onToggleKeyboard,
  showHands,
  onToggleHands,
  soundOn,
  onToggleSound,
  wpm,
  accuracy,
  currentTier,
  glamourScore
}) {
  return (
    <header className="w-full bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between text-slate-700 select-none shadow-xs z-20">
      {/* Left: Menu Hamburger + Lesson Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenLessons}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center justify-center cursor-pointer"
          title="Open Lesson List"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={onOpenLessons}
          className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
        >
          <span className="font-semibold text-sm sm:text-base text-slate-800">
            Lesson {lessonNumber}: {lessonTitle}
          </span>
        </div>
      </div>

      {/* Center / Right: Live Performance & Tools */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Live WPM & Accuracy Pills */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full flex items-center gap-1 font-mono">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>{wpm} WPM</span>
          </span>

          <span className="hidden sm:flex px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full items-center gap-1 font-mono">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>{accuracy}%</span>
          </span>

          <span
            className="px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border"
            style={{
              backgroundColor: `${currentTier.themeColor}15`,
              color: currentTier.themeColor,
              borderColor: `${currentTier.themeColor}40`
            }}
          >
            Tier {currentTier.tier} ({currentTier.targetSpeed})
          </span>
        </div>

        {/* Typing Club Icon Controls */}
        <div className="flex items-center gap-1 text-slate-500 border-l border-slate-200 pl-2 sm:pl-3">
          {/* Restart */}
          <button
            onClick={onReset}
            className="p-1.5 hover:bg-slate-100 rounded-lg hover:text-slate-900 transition cursor-pointer"
            title="Restart Lesson"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Toggle Keyboard */}
          <button
            onClick={onToggleKeyboard}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              showKeyboard ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
            title={showKeyboard ? "Hide Keyboard" : "Show Keyboard"}
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Toggle Hands */}
          <button
            onClick={onToggleHands}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              showHands ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
            title={showHands ? "Hide Hands Guide" : "Show Hands Guide"}
          >
            <Hand className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 hover:bg-slate-100 rounded-lg hover:text-slate-900 transition cursor-pointer"
            title={soundOn ? "Mute Sound" : "Enable Sound"}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
          </button>

          {/* Custom Photos */}
          <button
            onClick={onOpenCustomPhotos}
            className="p-1.5 hover:bg-slate-100 rounded-lg hover:text-purple-600 transition cursor-pointer"
            title="Customize Tier Photos"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Lessons / Settings Modal */}
          <button
            onClick={onOpenLessons}
            className="p-1.5 hover:bg-slate-100 rounded-lg hover:text-slate-900 transition cursor-pointer"
            title="Lessons & Game Modes"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
