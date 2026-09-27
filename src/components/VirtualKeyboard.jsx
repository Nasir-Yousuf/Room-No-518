import React from 'react';
import { KEY_FINGER_MAP } from '../data/lessons';

const KEYBOARD_ROWS = [
  [
    { key: '`', shift: '~' },
    { key: '1', shift: '!' },
    { key: '2', shift: '@' },
    { key: '3', shift: '#' },
    { key: '4', shift: '$' },
    { key: '5', shift: '%' },
    { key: '6', shift: '^' },
    { key: '7', shift: '&' },
    { key: '8', shift: '*' },
    { key: '9', shift: '(' },
    { key: '0', shift: ')' },
    { key: '-', shift: '_' },
    { key: '=', shift: '+' },
    { key: 'Backspace', width: 'w-16 sm:w-20' }
  ],
  [
    { key: 'tab', width: 'w-12 sm:w-16' },
    { key: 'q', shift: 'Q' },
    { key: 'w', shift: 'W' },
    { key: 'e', shift: 'E' },
    { key: 'r', shift: 'R' },
    { key: 't', shift: 'T' },
    { key: 'y', shift: 'Y' },
    { key: 'u', shift: 'U' },
    { key: 'i', shift: 'I' },
    { key: 'o', shift: 'O' },
    { key: 'p', shift: 'P' },
    { key: '[', shift: '{' },
    { key: ']', shift: '}' },
    { key: '\\', shift: '|' }
  ],
  [
    { key: 'caps lock', width: 'w-14 sm:w-20' },
    { key: 'a', shift: 'A' },
    { key: 's', shift: 'S' },
    { key: 'd', shift: 'D' },
    { key: 'f', shift: 'F' },
    { key: 'g', shift: 'G' },
    { key: 'h', shift: 'H' },
    { key: 'j', shift: 'J' },
    { key: 'k', shift: 'K' },
    { key: 'l', shift: 'L' },
    { key: ';', shift: ':' },
    { key: "'", shift: '"' },
    { key: 'enter', width: 'w-14 sm:w-20' }
  ],
  [
    { key: 'shift', width: 'w-16 sm:w-24' },
    { key: 'z', shift: 'Z' },
    { key: 'x', shift: 'X' },
    { key: 'c', shift: 'C' },
    { key: 'v', shift: 'V' },
    { key: 'b', shift: 'B' },
    { key: 'n', shift: 'N' },
    { key: 'm', shift: 'M' },
    { key: ',', shift: '<' },
    { key: '.', shift: '>' },
    { key: '/', shift: '?' },
    { key: 'shift', width: 'w-16 sm:w-24' }
  ],
  [
    { key: 'control', width: 'w-12 sm:w-16' },
    { key: 'option', width: 'w-12 sm:w-16' },
    { key: 'space', width: 'w-56 sm:w-80' },
    { key: 'option', width: 'w-12 sm:w-16' }
  ]
];

// Get finger color for a key
function getFingerColor(keyChar) {
  const mapping = KEY_FINGER_MAP[keyChar.toLowerCase()];
  return mapping?.color || null;
}

export default function VirtualKeyboard({
  targetChar,
  activeKey,
  showGuide = true,
  showHands = true,
  language = 'en'
}) {
  const isSpaceTarget = targetChar === ' ';
  const isShiftTarget = targetChar && targetChar !== ' ' && targetChar === targetChar.toUpperCase() && targetChar.match(/[A-Z!@#$%^&*()_+{}|:"<>?~]/);
  const normalizedTarget = (targetChar || '').toLowerCase();

  const isTargetKey = (k) => {
    if (k.key === 'space' && isSpaceTarget) return true;
    if (k.key === 'shift' && isShiftTarget) return true;
    if (k.key.length === 1 && k.key.toLowerCase() === normalizedTarget) return true;
    if (k.shift && k.shift === targetChar) return true;
    return false;
  };

  const isActiveKey = (k) => {
    if (!activeKey) return false;
    if (k.key === 'space' && (activeKey === ' ' || activeKey === 'Space')) return true;
    if (k.key.toLowerCase() === activeKey.toLowerCase()) return true;
    return false;
  };

  if (!showGuide) return null;

  return (
    <div className="relative w-full overflow-hidden glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-6 flex flex-col items-center select-none mt-3">
      {/* Subtle finger guide indicator */}
      {targetChar && (
        <div className="w-full flex justify-center mb-2">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg glass-light text-xs font-bold text-slate-600 dark:text-slate-300">
            {language === 'bn' && (
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                অভ্র
              </span>
            )}
            <span>Next key:</span>
            <span
              className="font-mono text-xs px-2 py-0.5 rounded-md font-black shadow-sm"
              style={{
                backgroundColor: 'var(--bg-glass-strong)',
                color: 'var(--text-heading)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {targetChar === ' ' ? 'Space' : targetChar}
            </span>
            {KEY_FINGER_MAP[targetChar.toLowerCase()] && (
              <>
                <span className="text-slate-400">•</span>
                <span className="font-extrabold" style={{ color: KEY_FINGER_MAP[targetChar.toLowerCase()]?.color }}>
                  {KEY_FINGER_MAP[targetChar.toLowerCase()]?.finger}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Keyboard Layout */}
      <div className="w-full overflow-x-auto pb-1 flex justify-center no-scrollbar">
        <div className="relative flex flex-col gap-1 sm:gap-1.5 items-center min-w-[500px] sm:min-w-0 max-w-3xl mx-auto">
          {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-0.5 sm:gap-1 justify-center">
            {row.map((k, keyIdx) => {
              const isTarget = isTargetKey(k);
              const isActive = isActiveKey(k);
              const width = k.width || 'w-7 sm:w-10';
              const fingerColor = getFingerColor(k.key);

              return (
                <div
                  key={keyIdx}
                  className={`h-8 sm:h-11 ${width} rounded-lg sm:rounded-xl flex flex-col items-center justify-center text-[10px] sm:text-xs transition-all duration-100 relative ${
                    isActive
                      ? 'scale-90 shadow-lg z-10'
                      : isTarget
                      ? 'scale-105 shadow-xl z-10 animate-pulse-glow'
                      : 'hover:scale-[1.02]'
                  }`}
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                      : isTarget
                      ? `linear-gradient(135deg, ${fingerColor || '#6366f1'}, ${fingerColor || '#6366f1'}cc)`
                      : 'var(--bg-glass)',
                    color: isActive || isTarget ? '#fff' : 'var(--text-secondary)',
                    border: isTarget
                      ? `2px solid ${fingerColor || '#6366f1'}`
                      : isActive
                      ? '2px solid #818cf8'
                      : '1px solid var(--border-subtle)',
                    fontWeight: isTarget || isActive ? 800 : 600,
                    boxShadow: isTarget
                      ? `0 0 20px ${fingerColor || '#6366f1'}40, 0 4px 15px ${fingerColor || '#6366f1'}20`
                      : isActive
                      ? '0 0 20px rgba(99, 102, 241, 0.4)'
                      : '0 2px 4px var(--bg-glass-card-shadow)'
                  }}
                >
                  {k.shift && (
                    <span className={`text-[7px] sm:text-[8px] -mb-0.5 ${isTarget || isActive ? 'text-white/70' : 'text-slate-600'}`}>
                      {k.shift}
                    </span>
                  )}
                  <span className="capitalize text-[9px] sm:text-xs">{k.key}</span>

                  {/* Home row bumps on F and J */}
                  {(k.key === 'f' || k.key === 'j') && !isTarget && !isActive && (
                    <span className="w-1 h-0.5 bg-indigo-500/50 rounded-full absolute bottom-1.5" />
                  )}

                  {/* Finger color indicator dot */}
                  {fingerColor && k.key.length === 1 && !isTarget && !isActive && (
                    <span
                      className="w-1 h-1 rounded-full absolute top-1 right-1 opacity-30"
                      style={{ background: fingerColor }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
        </div>
      </div>

      {/* Hand SVG Overlays */}
      {showHands && (
        <div className="absolute inset-0 pointer-events-none flex justify-between items-center z-20 px-6 sm:px-16 opacity-40">
          {/* Left Hand */}
          <svg className="w-44 sm:w-56 h-32 sm:h-40 text-indigo-400/50" viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 30,140 C 25,90 20,60 35,40 C 40,35 48,40 45,65 L 45,95" />
            <path d="M 45,65 C 45,45 50,25 60,20 C 68,20 70,35 68,60 L 68,95" />
            <path d="M 68,60 C 70,35 75,15 88,10 C 98,10 98,30 95,60 L 95,95" />
            <path d="M 95,60 C 98,40 105,25 118,25 C 128,25 125,45 120,70 L 115,100" />
            <path d="M 120,90 C 135,95 155,100 160,115 C 165,125 150,135 135,130 L 100,145" />
            <path d="M 30,140 C 50,155 100,155 130,145" />
          </svg>

          {/* Right Hand */}
          <svg className="w-44 sm:w-56 h-32 sm:h-40 text-indigo-400/50 transform -scale-x-100" viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 30,140 C 25,90 20,60 35,40 C 40,35 48,40 45,65 L 45,95" />
            <path d="M 45,65 C 45,45 50,25 60,20 C 68,20 70,35 68,60 L 68,95" />
            <path d="M 68,60 C 70,35 75,15 88,10 C 98,10 98,30 95,60 L 95,95" />
            <path d="M 95,60 C 98,40 105,25 118,25 C 128,25 125,45 120,70 L 115,100" />
            <path d="M 120,90 C 135,95 155,100 160,115 C 165,125 150,135 135,130 L 100,145" />
            <path d="M 30,140 C 50,155 100,155 130,145" />
          </svg>
        </div>
      )}
    </div>
  );
}
